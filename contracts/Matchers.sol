// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

contract Matchers {
    function doRevert() public pure {
        revert("Revert cause");
    }
}
