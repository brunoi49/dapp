//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Greeter {
    string private greeting;
    string private version;

    constructor(string memory _greeting, string memory _version) {
        greeting = _greeting;
        version = _version;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function getVersion() public view returns (string memory) {
        return version;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
}
