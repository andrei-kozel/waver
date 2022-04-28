//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract WaverToken is ERC20 {
    mapping(address => uint) public lockTime;

    constructor() ERC20("Waves", "WVE") {
        _mint(msg.sender, 1000);
    }

    function requestTokens(address requestor, uint amount) external {
        require(
            block.timestamp > lockTime[msg.sender],
            "Lock time has not expired. Please try again later"
        );

        _mint(requestor, amount);
        lockTime[msg.sender] = block.timestamp + 1 days;
    }
}
