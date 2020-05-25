import Node from "./node.js";
import getDistance from "./getDistance.js";

class Board {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.start = null;
        this.target = null;
        this.object = null;
        this.boardArray = [];
        this.nodes = {};
        this.nodesToAnimate = [];
        this.objectNodesToAnimate = [];
        this.shortestPathNodesToAnimate = [];
        this.objectShortestPathNodesToAnimate = [];
        this.wallsToAnimate = [];
        this.mouseDown = false;
        this.pressedNodeStatus = "normal";
        this.previouslyPressedNodeStatus = null;
        this.previouslySwitchedNode = null;
        this.previouslySwitchedNodeWeight = 0;
        this.keyDown = false;
        this.algoDone = false;
        this.currentAlgorithm = null;
        this.currentHeuristic = null;
        this.numberOfObjects = 0;
        this.isObject = false;
        this.buttonsOn = false;
        this.speed = "fast";
    }
    initialise() {
        this.createGrid();
        this.addEventListeners();
    }
    createGrid() {
        let tableHTML = "";
        for (let i = 0; i < this.height; i++) {
            let currentArrayRow = [];
            let currentHTMLRow = `<tr id="row ${i}">`;
            for (let j = 0; j < this.width; j++) {
                let newNodeId = `${i}-${j}`, newNodeClass, newNode;
                if (i == Math.floor(this.height / 2) && j == Math.floor(this.width / 4)) {
                    newNodeClass = "start";
                    this.start = `${newNodeId}`;
                }
                else if (i == Math.floor(this.height / 2) && j == Math.floor(3 * this.width / 4)) {
                    newNodeClass = "target";
                    this.target = `${newNodeId}`;
                }
                else {
                    newNodeClass = "unvisited";
                }
                newNode = new Node(newNodeId, newNodeClass);
                currentArrayRow.push(newNode);
                currentHTMLRow += `<td id="${newNodeId}" class="${newNodeClass}"></td>`;
                this.nodes[`${newNodeId}`] = newNode;
            }
            this.boardArray.push(currentArrayRow);
            tableHTML += `${currentHTMLRow}</tr>`;
        }
        let board = document.getElementById("board");
        board.innerHTML = tableHTML;
    }
    addEventListeners(){
        let board = this;
        for (let i = 0; i < board.height; i++){
            for (let j = 0; j < board.width; j++){
                let currentId = `${i}-${j}`;
                let currentNode = board.getNode(currentId);
                let currentElement = $(currentId);
                currentElement.onmousedown = (e) => {
                    e.preventDefault();
                    if (this.buttonsOn) {
                      board.mouseDown = true;
                        if (currentNode.status == "start" || currentNode.status == "target" || currentNode.status == "object") {
                            board.pressedNodeStatus = currentNode.status;
                        } else {
                            board.pressedNodeStatus = "normal";
                            board.changeNormalNode(currentNode);
                        }
                    }
                  }
                  currentElement.onmouseup = () => {
                    if (this.buttonsOn) {
                      board.mouseDown = false;
                        if (board.pressedNodeStatus == "target") {
                            board.target = currentId;
                        } else if (board.pressedNodeStatus == "start") {
                            board.start = currentId;
                        } else if (board.pressedNodeStatus == "object") {
                            board.object = currentId;
                        }
                      board.pressedNodeStatus = "normal";
                    }
                  }
                  currentElement.onmouseenter = () => {
                    if (this.buttonsOn) {
                        if (board.mouseDown && board.pressedNodeStatus !== "normal") {
                            board.changeSpecialNode(currentNode);
                            if (board.pressedNodeStatus == "target") {
                            board.target = currentId;
                                if (board.algoDone) {
                                    board.redoAlgorithm();
                                }
                            } else if (board.pressedNodeStatus == "start") {
                            board.start = currentId;
                                if (board.algoDone) {
                                    board.redoAlgorithm();
                                }
                            } else if (board.pressedNodeStatus == "object") {
                            board.object = currentId;
                                if (board.algoDone) {
                                    board.redoAlgorithm();
                                }
                            }
                        } else if (board.mouseDown) {
                            board.changeNormalNode(currentNode);
                        }
                    }
                  }
                  currentElement.onmouseleave = () => {
                    if (this.buttonsOn) {
                        if (board.mouseDown && board.pressedNodeStatus !== "normal") {
                            board.changeSpecialNode(currentNode);
                        }
                    }
                  }
            }
        } 
    }
    getNode(id) {
        let coordinates = id.split("-");
        let i = parseInt(coordinates[0]);
        let j = parseInt(coordinates[1]);
        return this.boardArray[i][j]; 
    }
    clearPath(){

    }
    clearWall(){

    }
    redoAlgorithm(){
        this.clearPath();
        /* this.instantAlgorithm(); */
    }
}

let navbarHeight = $("#navbarDiv").height();
let textHeight = $("#mainText").height() + $("#algorithmDescriptor").height();
let height = Math.floor(($(document).height() - navbarHeight - textHeight) / 28);
let width = Math.floor($(document).width() / 25);
let newBoard = new Board(height, width)
newBoard.initialise();
