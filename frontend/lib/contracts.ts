import { BrowserProvider, Contract, formatEther, parseEther } from "ethers";

// Deployed contract addresses (Hardhat localhost)
export const CROWDTOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const CROWDFUNDING_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const CROWDFUNDING_ABI = [
  "function campaignCount() view returns (uint256)",
  "function campaigns(uint256) view returns (string title, uint256 goal, uint256 deadline, uint256 totalRaised, bool finalized, address creator, bool withdrawn)",
  "function contributions(uint256, address) view returns (uint256)",
  "function createCampaign(string _title, uint256 _goal, uint256 _durationSeconds)",
  "function contribute(uint256 _campaignId) payable",
  "function finalizeCampaign(uint256 _campaignId)",
  "function withdrawFunds(uint256 _campaignId)",
  "function token() view returns (address)",
  "event CampaignCreated(uint256 id, string title, uint256 goal, uint256 deadline, address creator)",
  "event ContributionMade(uint256 id, address contributor, uint256 amount)",
  "event FundsWithdrawn(uint256 id, address creator, uint256 amount)",
];

export const CROWDTOKEN_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function minter() view returns (address)",
];

export interface Campaign {
  id: number;
  title: string;
  goal: string;       // ETH string
  deadline: number;    // unix timestamp
  totalRaised: string; // ETH string
  finalized: boolean;
  creator: string;     // address
  withdrawn: boolean;
  daysLeft: number;
  progress: number;
}

function getProvider(): BrowserProvider | null {
  if (typeof window !== "undefined" && (window as any).ethereum) {
    return new BrowserProvider((window as any).ethereum);
  }
  return null;
}

function getCrowdfundingContract(providerOrSigner: any) {
  return new Contract(CROWDFUNDING_ADDRESS, CROWDFUNDING_ABI, providerOrSigner);
}

function getCrowdTokenContract(providerOrSigner: any) {
  return new Contract(CROWDTOKEN_ADDRESS, CROWDTOKEN_ABI, providerOrSigner);
}

export async function fetchCampaigns(): Promise<Campaign[]> {
  const provider = getProvider();
  if (!provider) return [];

  const contract = getCrowdfundingContract(provider);
  const count = await contract.campaignCount();
  const campaigns: Campaign[] = [];
  const now = Math.floor(Date.now() / 1000);

  for (let i = 1; i <= Number(count); i++) {
    const c = await contract.campaigns(i);
    const deadline = Number(c.deadline);
    const daysLeft = Math.max(0, Math.ceil((deadline - now) / 86400));
    const goalEth = formatEther(c.goal);
    const raisedEth = formatEther(c.totalRaised);
    const progress = Number(c.goal) > 0 ? (Number(c.totalRaised) / Number(c.goal)) * 100 : 0;

    campaigns.push({
      id: i,
      title: c.title,
      goal: goalEth,
      deadline,
      totalRaised: raisedEth,
      finalized: c.finalized,
      creator: c.creator,
      withdrawn: c.withdrawn,
      daysLeft,
      progress,
    });
  }

  return campaigns;
}

export async function createCampaignTx(
  title: string,
  goalEth: string,
  durationDays: number
): Promise<string> {
  const provider = getProvider();
  if (!provider) throw new Error("No wallet connected");

  const signer = await provider.getSigner();
  const contract = getCrowdfundingContract(signer);

  const goalWei = parseEther(goalEth);
  const durationSeconds = durationDays * 86400;

  const tx = await contract.createCampaign(title, goalWei, durationSeconds);
  await tx.wait();
  return tx.hash;
}

export async function contributeTx(
  campaignId: number,
  amountEth: string
): Promise<string> {
  const provider = getProvider();
  if (!provider) throw new Error("No wallet connected");

  const signer = await provider.getSigner();
  const contract = getCrowdfundingContract(signer);

  const tx = await contract.contribute(campaignId, {
    value: parseEther(amountEth),
  });
  await tx.wait();
  return tx.hash;
}

export async function withdrawFundsTx(campaignId: number): Promise<string> {
  const provider = getProvider();
  if (!provider) throw new Error("No wallet connected");

  const signer = await provider.getSigner();
  const contract = getCrowdfundingContract(signer);

  const tx = await contract.withdrawFunds(campaignId);
  await tx.wait();
  return tx.hash;
}

export async function getTokenBalance(address: string): Promise<string> {
  const provider = getProvider();
  if (!provider) return "0";

  const contract = getCrowdTokenContract(provider);
  const balance = await contract.balanceOf(address);
  return formatEther(balance);
}

export async function getContribution(campaignId: number, address: string): Promise<string> {
  const provider = getProvider();
  if (!provider) return "0";

  const contract = getCrowdfundingContract(provider);
  const amount = await contract.contributions(campaignId, address);
  return formatEther(amount);
}
