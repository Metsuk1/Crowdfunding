// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CrowdToken.sol";

contract Crowdfunding {
    struct Campaign {
        string title;
        uint256 goal;
        uint256 deadline;
        uint256 totalRaised;
        bool finalized;
        address creator;
        bool withdrawn;
    }

    CrowdToken public token;
    uint256 public campaignCount;
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => uint256)) public contributions;

    event CampaignCreated(uint256 id, string title, uint256 goal, uint256 deadline, address creator);
    event ContributionMade(uint256 id, address contributor, uint256 amount);
    event FundsWithdrawn(uint256 id, address creator, uint256 amount);

    constructor(address _tokenAddress) {
        token = CrowdToken(_tokenAddress);
    }

    function createCampaign(string memory _title, uint256 _goal, uint256 _durationSeconds) public {
        campaignCount++;
        campaigns[campaignCount] = Campaign({
            title: _title,
            goal: _goal,
            deadline: block.timestamp + _durationSeconds,
            totalRaised: 0,
            finalized: false,
            creator: msg.sender,
            withdrawn: false
        });
        emit CampaignCreated(campaignCount, _title, _goal, block.timestamp + _durationSeconds, msg.sender);
    }

    function contribute(uint256 _campaignId) public payable {
        Campaign storage c = campaigns[_campaignId];
        require(block.timestamp < c.deadline, "Campaign ended");
        require(msg.value > 0, "Send ETH to contribute");

        c.totalRaised += msg.value;
        contributions[_campaignId][msg.sender] += msg.value;

        // 1 ETH = 100 Reward Tokens
        token.mint(msg.sender, msg.value * 100);

        emit ContributionMade(_campaignId, msg.sender, msg.value);
    }

    function finalizeCampaign(uint256 _campaignId) public {
        Campaign storage c = campaigns[_campaignId];
        require(block.timestamp >= c.deadline, "Deadline not reached");
        c.finalized = true;
    }

    function withdrawFunds(uint256 _campaignId) public {
        Campaign storage c = campaigns[_campaignId];
        require(msg.sender == c.creator, "Only creator can withdraw");
        require(c.totalRaised >= c.goal, "Funding goal not reached");
        require(!c.withdrawn, "Funds already withdrawn");

        c.withdrawn = true;
        uint256 amount = c.totalRaised;
        payable(msg.sender).transfer(amount);

        emit FundsWithdrawn(_campaignId, msg.sender, amount);
    }
}
