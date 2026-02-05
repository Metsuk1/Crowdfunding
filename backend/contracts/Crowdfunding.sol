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
    }

    CrowdToken public token;
    uint256 public campaignCount;
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => uint256)) public contributions;

    event CampaignCreated(uint256 id, string title, uint256 goal, uint256 deadline);
    event ContributionMade(uint256 id, address contributor, uint256 amount);

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
            finalized: false
        });
        emit CampaignCreated(campaignCount, _title, _goal, block.timestamp + _durationSeconds);
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
}
