import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("CrowdToken", function () {
  async function deployTokenFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const token = await ethers.deployContract("CrowdToken");
    return { token, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      const { token } = await deployTokenFixture();
      expect(await token.name()).to.equal("Crowdfund Reward");
      expect(await token.symbol()).to.equal("CFRE");
    });

    it("Should set deployer as minter", async function () {
      const { token, owner } = await deployTokenFixture();
      expect(await token.minter()).to.equal(owner.address);
    });

    it("Should have 0 initial supply", async function () {
      const { token } = await deployTokenFixture();
      expect(await token.totalSupply()).to.equal(0n);
    });
  });

  describe("Minting", function () {
    it("Should allow minter to mint tokens", async function () {
      const { token, addr1 } = await deployTokenFixture();
      await token.mint(addr1.address, 1000n);
      expect(await token.balanceOf(addr1.address)).to.equal(1000n);
    });

    it("Should reject mint from non-minter", async function () {
      const { token, addr1 } = await deployTokenFixture();
      await expect(
        token.connect(addr1).mint(addr1.address, 1000n)
      ).to.be.revertedWith("Only contract can mint");
    });
  });

  describe("Transfer Minter", function () {
    it("Should allow minter to transfer minter role", async function () {
      const { token, addr1 } = await deployTokenFixture();
      await token.transferMinter(addr1.address);
      expect(await token.minter()).to.equal(addr1.address);
    });

    it("Should reject transferMinter from non-minter", async function () {
      const { token, addr1 } = await deployTokenFixture();
      await expect(
        token.connect(addr1).transferMinter(addr1.address)
      ).to.be.revertedWith("Only minter can transfer");
    });

    it("New minter should be able to mint", async function () {
      const { token, addr1, addr2 } = await deployTokenFixture();
      await token.transferMinter(addr1.address);
      await token.connect(addr1).mint(addr2.address, 500n);
      expect(await token.balanceOf(addr2.address)).to.equal(500n);
    });

    it("Old minter should not be able to mint after transfer", async function () {
      const { token, addr1, addr2 } = await deployTokenFixture();
      await token.transferMinter(addr1.address);
      await expect(
        token.mint(addr2.address, 500n)
      ).to.be.revertedWith("Only contract can mint");
    });
  });
});

describe("Crowdfunding", function () {
  async function deployCrowdfundingFixture() {
    const [owner, creator, investor1, investor2] = await ethers.getSigners();

    const token = await ethers.deployContract("CrowdToken");
    const tokenAddress = await token.getAddress();

    const crowdfunding = await ethers.deployContract("Crowdfunding", [tokenAddress]);

    // Transfer minter role to Crowdfunding contract
    await token.transferMinter(await crowdfunding.getAddress());

    return { token, crowdfunding, owner, creator, investor1, investor2 };
  }

  describe("Deployment", function () {
    it("Should set the correct token address", async function () {
      const { token, crowdfunding } = await deployCrowdfundingFixture();
      expect(await crowdfunding.token()).to.equal(await token.getAddress());
    });

    it("Should start with 0 campaigns", async function () {
      const { crowdfunding } = await deployCrowdfundingFixture();
      expect(await crowdfunding.campaignCount()).to.equal(0n);
    });
  });

  describe("Create Campaign", function () {
    it("Should create a campaign with correct parameters", async function () {
      const { crowdfunding, creator } = await deployCrowdfundingFixture();
      const goal = ethers.parseEther("10");
      const duration = 86400; // 1 day

      await crowdfunding.connect(creator).createCampaign("Test Campaign", goal, duration);

      expect(await crowdfunding.campaignCount()).to.equal(1n);

      const campaign = await crowdfunding.campaigns(1);
      expect(campaign.title).to.equal("Test Campaign");
      expect(campaign.goal).to.equal(goal);
      expect(campaign.totalRaised).to.equal(0n);
      expect(campaign.finalized).to.equal(false);
      expect(campaign.creator).to.equal(creator.address);
      expect(campaign.withdrawn).to.equal(false);
    });

    it("Should emit CampaignCreated event", async function () {
      const { crowdfunding, creator } = await deployCrowdfundingFixture();
      const goal = ethers.parseEther("5");
      const duration = 3600;

      await expect(
        crowdfunding.connect(creator).createCampaign("Event Test", goal, duration)
      ).to.emit(crowdfunding, "CampaignCreated");
    });

    it("Should create multiple campaigns", async function () {
      const { crowdfunding, creator } = await deployCrowdfundingFixture();
      const goal = ethers.parseEther("1");

      await crowdfunding.connect(creator).createCampaign("Campaign 1", goal, 3600);
      await crowdfunding.connect(creator).createCampaign("Campaign 2", goal, 7200);
      await crowdfunding.connect(creator).createCampaign("Campaign 3", goal, 10800);

      expect(await crowdfunding.campaignCount()).to.equal(3n);
    });
  });

  describe("Contribute", function () {
    it("Should accept contributions and update totalRaised", async function () {
      const { crowdfunding, creator, investor1 } = await deployCrowdfundingFixture();
      const goal = ethers.parseEther("10");
      await crowdfunding.connect(creator).createCampaign("Donate Test", goal, 86400);

      const contribution = ethers.parseEther("2");
      await crowdfunding.connect(investor1).contribute(1, { value: contribution });

      const campaign = await crowdfunding.campaigns(1);
      expect(campaign.totalRaised).to.equal(contribution);
    });

    it("Should track individual contributions", async function () {
      const { crowdfunding, creator, investor1 } = await deployCrowdfundingFixture();
      const goal = ethers.parseEther("10");
      await crowdfunding.connect(creator).createCampaign("Track Test", goal, 86400);

      const contribution = ethers.parseEther("3");
      await crowdfunding.connect(investor1).contribute(1, { value: contribution });

      const tracked = await crowdfunding.contributions(1, investor1.address);
      expect(tracked).to.equal(contribution);
    });

    it("Should mint reward tokens (1 ETH = 100 tokens)", async function () {
      const { token, crowdfunding, creator, investor1 } = await deployCrowdfundingFixture();
      const goal = ethers.parseEther("10");
      await crowdfunding.connect(creator).createCampaign("Token Test", goal, 86400);

      const contribution = ethers.parseEther("1");
      await crowdfunding.connect(investor1).contribute(1, { value: contribution });

      // msg.value * 100 = 1e18 * 100 = 100e18
      const expectedTokens = contribution * 100n;
      expect(await token.balanceOf(investor1.address)).to.equal(expectedTokens);
    });

    it("Should emit ContributionMade event", async function () {
      const { crowdfunding, creator, investor1 } = await deployCrowdfundingFixture();
      const goal = ethers.parseEther("10");
      await crowdfunding.connect(creator).createCampaign("Event Test", goal, 86400);

      const contribution = ethers.parseEther("1");
      await expect(
        crowdfunding.connect(investor1).contribute(1, { value: contribution })
      )
        .to.emit(crowdfunding, "ContributionMade")
        .withArgs(1, investor1.address, contribution);
    });

    it("Should allow multiple investors to contribute", async function () {
      const { crowdfunding, creator, investor1, investor2 } = await deployCrowdfundingFixture();
      const goal = ethers.parseEther("10");
      await crowdfunding.connect(creator).createCampaign("Multi Test", goal, 86400);

      await crowdfunding.connect(investor1).contribute(1, { value: ethers.parseEther("2") });
      await crowdfunding.connect(investor2).contribute(1, { value: ethers.parseEther("3") });

      const campaign = await crowdfunding.campaigns(1);
      expect(campaign.totalRaised).to.equal(ethers.parseEther("5"));
    });

    it("Should reject contribution with 0 ETH", async function () {
      const { crowdfunding, creator, investor1 } = await deployCrowdfundingFixture();
      const goal = ethers.parseEther("10");
      await crowdfunding.connect(creator).createCampaign("Zero Test", goal, 86400);

      await expect(
        crowdfunding.connect(investor1).contribute(1, { value: 0 })
      ).to.be.revertedWith("Send ETH to contribute");
    });

    it("Should reject contribution after deadline", async function () {
      const { crowdfunding, creator, investor1 } = await deployCrowdfundingFixture();
      const goal = ethers.parseEther("10");
      await crowdfunding.connect(creator).createCampaign("Deadline Test", goal, 60);

      // Advance time past deadline
      await ethers.provider.send("evm_increaseTime", [120]);
      await ethers.provider.send("evm_mine", []);

      await expect(
        crowdfunding.connect(investor1).contribute(1, { value: ethers.parseEther("1") })
      ).to.be.revertedWith("Campaign ended");
    });

    it("Should accumulate contributions from same investor", async function () {
      const { crowdfunding, creator, investor1 } = await deployCrowdfundingFixture();
      const goal = ethers.parseEther("10");
      await crowdfunding.connect(creator).createCampaign("Accumulate Test", goal, 86400);

      await crowdfunding.connect(investor1).contribute(1, { value: ethers.parseEther("1") });
      await crowdfunding.connect(investor1).contribute(1, { value: ethers.parseEther("2") });

      const tracked = await crowdfunding.contributions(1, investor1.address);
      expect(tracked).to.equal(ethers.parseEther("3"));
    });
  });

  describe("Finalize Campaign", function () {
    it("Should finalize campaign after deadline", async function () {
      const { crowdfunding, creator } = await deployCrowdfundingFixture();
      const goal = ethers.parseEther("10");
      await crowdfunding.connect(creator).createCampaign("Finalize Test", goal, 60);

      // Advance time past deadline
      await ethers.provider.send("evm_increaseTime", [120]);
      await ethers.provider.send("evm_mine", []);

      await crowdfunding.finalizeCampaign(1);

      const campaign = await crowdfunding.campaigns(1);
      expect(campaign.finalized).to.equal(true);
    });

    it("Should reject finalization before deadline", async function () {
      const { crowdfunding, creator } = await deployCrowdfundingFixture();
      const goal = ethers.parseEther("10");
      await crowdfunding.connect(creator).createCampaign("Early Finalize", goal, 86400);

      await expect(
        crowdfunding.finalizeCampaign(1)
      ).to.be.revertedWith("Deadline not reached");
    });
  });

  describe("Withdraw Funds", function () {
    it("Should allow creator to withdraw when goal is reached", async function () {
      const { crowdfunding, creator, investor1 } = await deployCrowdfundingFixture();
      const goal = ethers.parseEther("5");
      await crowdfunding.connect(creator).createCampaign("Withdraw Test", goal, 86400);

      // Fund the campaign to reach goal
      await crowdfunding.connect(investor1).contribute(1, { value: ethers.parseEther("5") });

      const balanceBefore = await ethers.provider.getBalance(creator.address);

      const tx = await crowdfunding.connect(creator).withdrawFunds(1);
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed * receipt.gasPrice;

      const balanceAfter = await ethers.provider.getBalance(creator.address);

      // Creator should receive 5 ETH minus gas
      expect(balanceAfter - balanceBefore + gasUsed).to.equal(ethers.parseEther("5"));

      const campaign = await crowdfunding.campaigns(1);
      expect(campaign.withdrawn).to.equal(true);
    });

    it("Should emit FundsWithdrawn event", async function () {
      const { crowdfunding, creator, investor1 } = await deployCrowdfundingFixture();
      const goal = ethers.parseEther("5");
      await crowdfunding.connect(creator).createCampaign("Event Test", goal, 86400);

      await crowdfunding.connect(investor1).contribute(1, { value: ethers.parseEther("5") });

      await expect(
        crowdfunding.connect(creator).withdrawFunds(1)
      )
        .to.emit(crowdfunding, "FundsWithdrawn")
        .withArgs(1, creator.address, ethers.parseEther("5"));
    });

    it("Should reject withdrawal by non-creator", async function () {
      const { crowdfunding, creator, investor1 } = await deployCrowdfundingFixture();
      const goal = ethers.parseEther("5");
      await crowdfunding.connect(creator).createCampaign("Auth Test", goal, 86400);

      await crowdfunding.connect(investor1).contribute(1, { value: ethers.parseEther("5") });

      await expect(
        crowdfunding.connect(investor1).withdrawFunds(1)
      ).to.be.revertedWith("Only creator can withdraw");
    });

    it("Should reject withdrawal when goal not reached", async function () {
      const { crowdfunding, creator, investor1 } = await deployCrowdfundingFixture();
      const goal = ethers.parseEther("10");
      await crowdfunding.connect(creator).createCampaign("Under Goal Test", goal, 86400);

      await crowdfunding.connect(investor1).contribute(1, { value: ethers.parseEther("5") });

      await expect(
        crowdfunding.connect(creator).withdrawFunds(1)
      ).to.be.revertedWith("Funding goal not reached");
    });

    it("Should reject double withdrawal", async function () {
      const { crowdfunding, creator, investor1 } = await deployCrowdfundingFixture();
      const goal = ethers.parseEther("5");
      await crowdfunding.connect(creator).createCampaign("Double Test", goal, 86400);

      await crowdfunding.connect(investor1).contribute(1, { value: ethers.parseEther("5") });

      await crowdfunding.connect(creator).withdrawFunds(1);

      await expect(
        crowdfunding.connect(creator).withdrawFunds(1)
      ).to.be.revertedWith("Funds already withdrawn");
    });

    it("Should allow withdrawal when overfunded", async function () {
      const { crowdfunding, creator, investor1 } = await deployCrowdfundingFixture();
      const goal = ethers.parseEther("5");
      await crowdfunding.connect(creator).createCampaign("Overfund Test", goal, 86400);

      await crowdfunding.connect(investor1).contribute(1, { value: ethers.parseEther("8") });

      await expect(
        crowdfunding.connect(creator).withdrawFunds(1)
      )
        .to.emit(crowdfunding, "FundsWithdrawn")
        .withArgs(1, creator.address, ethers.parseEther("8"));
    });
  });
});
