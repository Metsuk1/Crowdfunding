import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CrowdfundingModule = buildModule("CrowdfundingModule", (m) => {
  // 1. Deploy CrowdToken
  const crowdToken = m.contract("CrowdToken");

  // 2. Deploy Crowdfunding with token address
  const crowdfunding = m.contract("Crowdfunding", [crowdToken]);

  // 3. Transfer minter role to Crowdfunding contract so it can mint reward tokens
  m.call(crowdToken, "transferMinter", [crowdfunding], { id: "transferMinter" });

  return { crowdToken, crowdfunding };
});

export default CrowdfundingModule;
