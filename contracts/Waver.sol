//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Waver is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _waveIds;
    uint256 public bank = 0 ether;

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

    constructor() {}

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

    // TODO
    function like() public {}

    // TODO
    function unlike() public {}

    function deposit() external payable {
        bank += msg.value;
    }
}
