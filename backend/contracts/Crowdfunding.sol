// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Импорт стандарта ERC-20
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RewardToken is ERC20 {
    address public minter;

    constructor() ERC20("Crowdfund Reward", "CFRE") {
        minter = msg.sender;
    }

    // Функция минтинга токенов за вклады [cite: 45, 49]
    function mint(address to, uint256 amount) external {
        require(msg.sender == minter, "Only contract can mint");
        _mint(to, amount);
    }
}

contract CrowdfundingApp {
    struct Campaign {
        string title;        // Название [cite: 39]
        uint256 goal;       // Цель в ETH [cite: 40]
        uint256 deadline;   // Дедлайн [cite: 41]
        uint256 totalRaised;
        bool finalized;     // Статус завершения [cite: 44]
    }

    RewardToken public token;
    uint256 public campaignCount;
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => uint256)) public contributions; // Учет вкладов 

    event CampaignCreated(uint256 id, string title, uint256 goal, uint256 deadline);
    event ContributionMade(uint256 id, address contributor, uint256 amount);

    constructor(address _tokenAddress) {
        token = RewardToken(_tokenAddress);
    }

    // 1. Создание кампании 
    function createCampaign(string memory _title, uint256 _goal, uint256 _durationSeconds) public {
        campaignCount++;
        campaigns[campaignCount] = Campaign({
            title: _title,
            goal: _goal,
            deadline: block.timestamp + _durationSeconds,
            totalRaised: 0,
            finalized: false
        });
        emit CampaignCreated(campaignCount, _title, _goal, block.timestamp + _durationSeconds);
    }

    // 2. Взнос в активную кампанию 
    function contribute(uint256 _campaignId) public payable {
        Campaign storage c = campaigns[_campaignId];
        require(block.timestamp < c.deadline, "Campaign ended"); // Проверка дедлайна [cite: 41]
        require(msg.value > 0, "Send ETH to contribute");

        c.totalRaised += msg.value;
        contributions[_campaignId][msg.sender] += msg.value;

        // 3. Выдача токенов пропорционально вкладу [cite: 25, 45]
        // 1 ETH = 100 Reward Tokens (для примера)
        token.mint(msg.sender, msg.value * 100);

        emit ContributionMade(_campaignId, msg.sender, msg.value);
    }

    // 4. Завершение кампании [cite: 44]
    function finalizeCampaign(uint256 _campaignId) public {
        Campaign storage c = campaigns[_campaignId];
        require(block.timestamp >= c.deadline, "Deadline not reached");
        c.finalized = true;
    }
}