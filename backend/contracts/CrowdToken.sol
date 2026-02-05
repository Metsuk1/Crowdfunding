// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Импорт стандарта ERC-20
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CrowdToken is ERC20 {
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
