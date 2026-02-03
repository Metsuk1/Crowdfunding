import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers.js";
import { expect } from "chai";
import pkg from "hardhat";
const { ethers } = pkg;

describe("Crowdfunding", function () {
  async function deployCrowdfundingFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
    const crowdfunding = await Crowdfunding.deploy();
    return { crowdfunding, owner, otherAccount };
  }

  it("Should create a new campaign", async function () {
    const { crowdfunding, owner } = await loadFixture(deployCrowdfundingFixture);
    const deadline = Math.floor(Date.now() / 1000) + 3600; // +1 час

    await crowdfunding.createCampaign("Test Title", "Description", ethers.parseEther("1"), deadline);
    const campaign = await crowdfunding.campaigns(0);

    expect(campaign.title).to.equal("Test Title");
    expect(campaign.owner).to.equal(owner.address);
  });

  it("Should allow donations", async function () {
    const { crowdfunding, otherAccount } = await loadFixture(deployCrowdfundingFixture);
    const deadline = Math.floor(Date.now() / 1000) + 3600;

    await crowdfunding.createCampaign("Title", "Desc", ethers.parseEther("10"), deadline);
    
    // Donating of 1 ETH
    await crowdfunding.connect(otherAccount).donateToCampaign(0, { value: ethers.parseEther("1") });
    
    const campaign = await crowdfunding.campaigns(0);
    expect(campaign.amountCollected).to.equal(ethers.parseEther("1"));
  });
});