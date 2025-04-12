// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    uint256 public immutable finalTotalSupply;
    uint256 public immutable presaleMaxSupply;

    uint256 public presaleCounter;
    uint256 public presaleCost1 = 0.05 ether;
    uint256 public presaleCost2 = 0.1 ether;

    uint8 public stage; // 0 - nothing, 1 - first presale, 2 - second presale, 3 - launched

    constructor(address initialOwner) ERC20("Plexus", "PLX") Ownable(initialOwner) {
        uint256 decimalsFactor = 10 ** decimals();
        finalTotalSupply = 10000 * decimalsFactor;
        presaleMaxSupply = 1000 * decimalsFactor;
    }

    function buyOnPresale() external payable {
        require(stage == 1 || stage == 2, "Presale is not active");

        uint256 cost = stage == 2 ? presaleCost2 : presaleCost1;
        uint256 amount = (msg.value * 10 ** decimals()) / cost;

        require(amount > 0, "Insufficient ETH sent");
        require(totalSupply() + amount <= finalTotalSupply, "Exceeds final supply");
        require(presaleCounter + amount <= presaleMaxSupply, "Exceeds presale supply");

        presaleCounter += amount;
        _mint(msg.sender, amount);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        uint256 mintAmount = amount * 10 ** decimals();
        require(totalSupply() + mintAmount <= finalTotalSupply, "Exceeds final supply");
        _mint(to, mintAmount);
    }

    function setStage(uint8 _stage) external onlyOwner {
        require(_stage <= 3, "Invalid stage");
        stage = _stage;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdraw failed");
    }
}
