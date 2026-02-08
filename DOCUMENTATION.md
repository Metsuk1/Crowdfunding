# ChainFund - Decentralized Crowdfunding Platform

## Technical Documentation
---

## 1. Executive Summary

### Project Vision

**ChainFund** is a decentralized crowdfunding platform built on the Ethereum blockchain that eliminates intermediaries between project creators and investors. The platform leverages smart contracts to provide transparent, trustless, and automated fund management for crowdfunding campaigns.

The core idea is simple: anyone can create a funding campaign with a defined goal and deadline, and anyone can contribute ETH to campaigns they believe in. In return for their contributions, investors receive **CFRE (Crowdfund Reward)** ERC-20 tokens at a fixed rate of 100 CFRE per 1 ETH, creating a tokenized incentive layer on top of traditional crowdfunding mechanics.


### Architecture Overview

```
+-------------------+       +---------------------+       +------------------+
|   Next.js         | <---> |   ethers.js v6      | <---> |  Ethereum Node   |
|   Frontend        |       |   (BrowserProvider)  |       |  (Hardhat/Sepolia)|
+-------------------+       +---------------------+       +------------------+
                                                                   |
                                                          +--------+--------+
                                                          |                 |
                                                   +------+------+  +------+------+
                                                   | CrowdToken  |  | Crowdfunding |
                                                   | (ERC-20)    |  | (Main Logic) |
                                                   +-------------+  +--------------+
```

---

## 2. Problem Statement

### How ChainFund Solves These Problems

| Problem | ChainFund Solution |
|---------|-------------------|
| Centralized trust | Smart contracts enforce all rules autonomously |
| High fees | Zero platform fees; only Ethereum gas costs |
| Lack of transparency | All transactions verifiable on-chain |
| Geographic barriers | Anyone with a wallet and ETH can participate |
| No investor incentives | CFRE token rewards at 1 ETH = 100 CFRE |
| Fund misuse risk | Goal-based withdrawal: creator can only withdraw if goal is met |

---

## 3. Smart Contract Architecture

The platform consists of two interconnected smart contracts deployed on the Ethereum blockchain:

### 3.1 CrowdToken (ERC-20 Reward Token)

**File:** `backend/contracts/CrowdToken.sol`
**License:** MIT
**Solidity Version:** ^0.8.20
**Inherits:** OpenZeppelin `ERC20`

#### Purpose

CrowdToken is a standard ERC-20 token with controlled minting capabilities. It serves as the reward token distributed to campaign contributors. The token symbol is **CFRE** ("Crowdfund Reward") and it has 18 decimal places (standard ERC-20).

---

### 3.2 Crowdfunding (Main Contract)

**File:** `backend/contracts/Crowdfunding.sol`
**License:** MIT
**Solidity Version:** ^0.8.20

#### Purpose

The Crowdfunding contract is the core logic layer of the platform. It manages the full lifecycle of crowdfunding campaigns: creation, contributions, finalization, and fund withdrawal.

#### Data Structures

**Campaign Struct:**
```solidity
struct Campaign {
    string title;         // Campaign name
    uint256 goal;         // Funding goal in wei
    uint256 deadline;     // Unix timestamp when campaign ends
    uint256 totalRaised;  // Total ETH contributed (in wei)
    bool finalized;       // Whether campaign has been finalized
    address creator;      // Address of campaign creator
    bool withdrawn;       // Whether funds have been withdrawn
}
```


#### Contract Interaction Diagram

```
Creator                    Crowdfunding                  CrowdToken
  |                             |                            |
  |--- createCampaign() ------>|                            |
  |<--- CampaignCreated event --|                            |
  |                             |                            |
Investor                        |                            |
  |--- contribute() + ETH ---->|                            |
  |                             |--- mint(investor, amt) -->|
  |                             |<--- tokens minted --------|
  |<--- ContributionMade event -|                            |
  |                             |                            |
Creator                         |                            |
  |--- withdrawFunds() ------->|                            |
  |<--- ETH transferred -------|                            |
  |<--- FundsWithdrawn event ---|                            |
```

#### Campaign Lifecycle State Machine

```
                    createCampaign()
                          |
                          v
                    +-----------+
                    |  ACTIVE   |  <-- contributions accepted
                    +-----------+
                          |
                  deadline reached
                          |
                          v
                    +-----------+
                    |  ENDED    |  <-- finalizeCampaign() can be called
                    +-----------+
                       /     \
            goal met /       \ goal NOT met
                    /         \
                   v           v
          +-----------+   +-----------+
          | FUNDED    |   |  FAILED   |  <-- no refund mechanism
          +-----------+   +-----------+
                |
       withdrawFunds()
                |
                v
          +-----------+
          | WITHDRAWN |  <-- funds sent to creator
          +-----------+
```

---

## 5. Deployment Guide (Sepolia Testnet)

### Prerequisites

- **Node.js** v18+ installed
- **MetaMask** browser extension installed
- **Sepolia ETH** (testnet ETH from a faucet)
- **Sepolia RPC URL** (from Alchemy, Infura, or similar provider)

### Step 1: Clone and Install Dependencies

```bash
git clone <repository-url>
cd blokchain_final/backend
npm install
```

### Step 2: Obtain Sepolia Testnet ETH

Visit one of the following faucets to get free Sepolia ETH:

- Alchemy Sepolia Faucet: https://sepoliafaucet.com
- Infura Sepolia Faucet: https://www.infura.io/faucet/sepolia
- Google Cloud Sepolia Faucet: https://cloud.google.com/application/web3/faucet/ethereum/sepolia

You need at least 0.1 Sepolia ETH to cover deployment gas costs.

### Step 3: Get Sepolia RPC URL

Sign up for a free account at one of these providers:

- **Alchemy**: https://www.alchemy.com - Create an app, select Sepolia network, copy the HTTPS URL
- **Infura**: https://www.infura.io - Create a project, copy the Sepolia endpoint

Your RPC URL will look like:
```
https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
```

### Step 4: Configure Environment Variables

Create a `vars.json` file or use Hardhat's configuration variables system:

```bash
npx hardhat vars set SEPOLIA_RPC_URL "https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY"
npx hardhat vars set SEPOLIA_PRIVATE_KEY "your_wallet_private_key"
```

> **WARNING:** Never commit your private key to version control. Never use a private key associated with real funds for testnet deployment.

### Step 5: Compile the Contracts

```bash
npx hardhat compile
```

Expected output:
```
Compiling 1 Solidity file
Compiled 2 Solidity files successfully
```

### Step 6: Run Tests (Verify Everything Works)

```bash
npx hardhat test
```

Ensure all tests pass before deploying to a live network.

### Step 7: Deploy to Sepolia

```bash
npx hardhat ignition deploy ignition/modules/Crowdfunding.ts --network sepolia
```

The Hardhat Ignition module will execute the following steps automatically:
1. Deploy `CrowdToken` contract
2. Deploy `Crowdfunding` contract with the CrowdToken address
3. Call `transferMinter()` to give the Crowdfunding contract minting authority

Expected output:
```
Deploying CrowdfundingModule...

CrowdfundingModule#CrowdToken - deployed at 0x...
CrowdfundingModule#Crowdfunding - deployed at 0x...
CrowdfundingModule#transferMinter - executed

Successfully deployed CrowdfundingModule
```

### Step 8: Save Deployed Addresses

After deployment, note the contract addresses from the output. Update the frontend configuration:

Edit `frontend/lib/contracts.ts`:
```typescript
const CROWDTOKEN_ADDRESS = "0x...";     // CrowdToken address from deployment
const CROWDFUNDING_ADDRESS = "0x...";   // Crowdfunding address from deployment
```

### Step 9: Configure Frontend for Sepolia

Update the wallet context (`frontend/lib/wallet-context.tsx`) to use the Sepolia chain ID instead of Hardhat's local chain ID:

- Sepolia chain ID: `0xaa36a7` (11155111 in decimal)
- Replace references to Hardhat chain ID `0x7A69` (31337)

### Step 10: Verify Contracts on Etherscan (Optional)

```bash
npx hardhat verify --network sepolia <CrowdToken_ADDRESS>
npx hardhat verify --network sepolia <Crowdfunding_ADDRESS> <CrowdToken_ADDRESS>
```

This makes your contract source code publicly viewable and verifiable on Sepolia Etherscan.

### Step 11: Launch Frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

### 7.5 Supported Networks

| Network | Chain ID | Type | Purpose |
|---------|----------|------|---------|
| Hardhat (in-process) | 31337 | EDR-simulated | Testing |
| Localhost | 31337 | HTTP (127.0.0.1:8545) | Local development |
| Sepolia | 11155111 | HTTP (RPC provider) | Testnet deployment |

### 7.6 Frontend Pages

| Route | Purpose | Key Features |
|-------|---------|-------------|
| `/` | Landing page | Hero, stats, featured projects, how-it-works |
| `/select-role` | Role selection | Choose between Creator and Investor |
| `/creator` | Creator dashboard | Create campaigns, monitor progress, withdraw funds |
| `/investor` | Investor portal | Browse campaigns, contribute ETH, view CFRE balance |
| `/projects` | Project browser | Browse all campaigns |
| `/my-projects` | My projects | View own campaigns |
| `/login` | Authentication | Wallet connection |
| `/register` | Registration | New user onboarding |
| `/dashboard` | User dashboard | Overview and navigation |

### 7.7 Contract Function Reference

#### CrowdToken

| Function | Access | Mutability | Parameters | Returns |
|----------|--------|-----------|------------|---------|
| `constructor` | - | - | - | - |
| `transferMinter` | minter only | state-changing | `_newMinter: address` | - |
| `mint` | minter only | state-changing | `to: address, amount: uint256` | - |
| `name` | public | view | - | `string` |
| `symbol` | public | view | - | `string` |
| `decimals` | public | view | - | `uint8` |
| `totalSupply` | public | view | - | `uint256` |
| `balanceOf` | public | view | `account: address` | `uint256` |
| `transfer` | public | state-changing | `to: address, value: uint256` | `bool` |
| `approve` | public | state-changing | `spender: address, value: uint256` | `bool` |
| `transferFrom` | public | state-changing | `from: address, to: address, value: uint256` | `bool` |
| `allowance` | public | view | `owner: address, spender: address` | `uint256` |

#### Crowdfunding

| Function | Access | Mutability | Parameters | Returns |
|----------|--------|-----------|------------|---------|
| `constructor` | - | - | `_tokenAddress: address` | - |
| `createCampaign` | public | state-changing | `_title: string, _goal: uint256, _durationSeconds: uint256` | - |
| `contribute` | public | payable | `_campaignId: uint256` | - |
| `finalizeCampaign` | public | state-changing | `_campaignId: uint256` | - |
| `withdrawFunds` | public | state-changing | `_campaignId: uint256` | - |
| `campaigns` | public | view | `uint256` | `Campaign` |
| `contributions` | public | view | `uint256, address` | `uint256` |
| `campaignCount` | public | view | - | `uint256` |
| `token` | public | view | - | `address` |

### 7.8 Deployment Module (Hardhat Ignition)

```
CrowdfundingModule
  ├── Step 1: Deploy CrowdToken
  ├── Step 2: Deploy Crowdfunding(CrowdToken.address)
  └── Step 3: CrowdToken.transferMinter(Crowdfunding.address)
```

