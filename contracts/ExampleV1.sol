// SPDX-License-Identifier: MIT
//pragma solidity 0.8.4;
pragma solidity 0.8.17;

contract ExampleV1 {
    uint public number;

    function initialValue(uint _num) external {
        number=_num;
    }

    function increase() external {
        number += 1;
    }

    // Reads the last stored value
    function retrieve() public view returns (uint) {
        return number;
    }
}