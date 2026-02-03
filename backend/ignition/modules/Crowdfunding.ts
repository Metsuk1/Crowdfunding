import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CrowdfundingModule = buildModule("CrowdfundingModule", (m) => {
  const crowdfunding = m.contract("Crowdfunding");
  return { crowdfunding };
});

export default CrowdfundingModule;