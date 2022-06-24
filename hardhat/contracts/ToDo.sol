// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract ToDo{

    struct List{
        uint id;
        address myAddr;
        string title;
        string description;
    }

    List[] public lists;

    function addTask(uint id, string memory _title, string memory _description) public{
        lists.push(List(id, msg.sender, _title, _description));
    }

    function getTask() public view returns(List[] memory){
        return lists;
    }

    function deleteTask(uint _id) public{
        for(uint i =0; i<lists.length; i++){
            if(lists[i].id == _id){
                require(msg.sender == lists[i].myAddr, "Not your task");
                delete lists[i];
            }
        }
    }
}