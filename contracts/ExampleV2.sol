// SPDX-License-Identifier: MIT
//pragma solidity 0.8.4;
pragma solidity 0.8.17;

import "./ExampleV1.sol";

contract ExampleV2 is ExampleV1 {

   function decrease() external {
       number -= 1;
   }   
}