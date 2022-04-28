//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Waver is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _waveIds;
    uint256 public bank = 0 ether;
    uint256 constant likePrice = 1 ether;
    address public tokenAddress;

    IERC20 token;

    struct Wave {
        uint256 id;
        uint256 likes;
        address author;
        string content;
    }

    mapping(uint256 => Wave) public idToWave;
    mapping(string => Wave) public hashToWave;

    // events
    event WaveCreated(uint256 id, address author, string content);
    event WaveLiked(uint256 id, uint256 likes, address author);
    event WaveUnliked(uint256 id, uint256 likes, address author);
    event TokenSet(address tokenAddress);

    constructor() {}

    function setToken(address _tokenAddress) public onlyOwner {
        tokenAddress = _tokenAddress;
        token = IERC20(tokenAddress);
        emit TokenSet(tokenAddress);
    }

    // create a new wave
    function createWave(string memory _contentHash) public {
        _waveIds.increment();
        uint256 waveId = _waveIds.current();
        Wave storage wave = idToWave[waveId];
        wave.id = waveId;
        wave.likes = 0;
        wave.author = msg.sender;
        wave.content = _contentHash;
        hashToWave[_contentHash] = wave;

        emit WaveCreated(waveId, wave.author, wave.content);
    }

    function fetchWaves() public view returns (Wave[] memory) {
        uint256 wavesAmount = _waveIds.current();

        Wave[] memory waves = new Wave[](wavesAmount);

        for (uint256 i = 0; i < wavesAmount; i++) {
            uint256 id = i + 1;
            Wave storage wave = idToWave[id];
            waves[i] = wave;
        }

        return waves;
    }

    function fetchWave(string memory _hash) public view returns (Wave memory) {
        Wave storage wave = hashToWave[_hash];
        return wave;
    }

    function checkBalance(address _address, uint256 _reqAmount)
        public
        view
        returns (bool)
    {
        return token.balanceOf(_address) >= _reqAmount;
    }

    function like(address _author, string memory _hash) public {
        // require(token.balanceOf(msg.sender) >= likePrice, "Not enough tokens");
        Wave storage wave = hashToWave[_hash];
        wave.likes++;
        token.transferFrom(msg.sender, _author, likePrice);
    }

    function deposit() external payable {
        bank += msg.value;
    }
}
