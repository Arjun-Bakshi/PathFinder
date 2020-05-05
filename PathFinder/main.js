/* Grid */
    /* node.js */

    class Node {
        constructor(id, status) {
            this.id = id;
            this.status = status;
            this.previousNode = null;
            this.path = null;
            this.direction = null;
            this.storedDirection = null;
            this.distance = Infinity;
            this.totalDistance = Infinity;
            this.heuristicDistance = null;
            this.weight = 0;
            this.relatesToObject = false;
            this.overwriteObjectRelation = false;
            this.otherid = id;
            this.otherstatus = status;
            this.otherpreviousNode = null;
            this.otherpath = null;
            this.otherdirection = null;
            this.otherstoredDirection = null;
            this.otherdistance = Infinity;
            this.otherweight = 0;
            this.otherrelatesToObject = false;
            this.otheroverwriteObjectRelation = false;
        }
    }

    /* board.js */

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
        getNode() {
            let coordinates = id.split("-");
            let i = parseInt(coordinates[0]);
            let j = parseInt(coordinates[1]);
            return this.boardArray[i][j]; 
        }
    }

    let navbarHeight = $("#navbarDiv").height();
    let textHeight = $("#mainText").height() + $("#algorithmDescriptor").height();
    let height = Math.floor(($(document).height() - navbarHeight - textHeight) / 28);
    let width = Math.floor($(document).width() / 25);
    let newBoard = new Board(height, width)
    newBoard.initialise();

    /* getDistance.js */

    function getDistance(nodeOne, nodeTwo){
        let currentCoordinates = nodeOne.id.split("-");
        let targetCoordinates = nodeTwo.id.split("-");
        let x1 = parseInt(currentCoordinates[0]);
        let y1 = parseInt(currentCoordinates[1]);
        let x2 = parseInt(targetCoordinates[0]);
        let y2 = parseInt(targetCoordinates[1]);
        if (x2 < x1) {
            if (nodeOne.direction == "up") {
              return [1, ["f"], "up"];
            } else if (nodeOne.direction == "right") {
              return [2, ["l", "f"], "up"];
            } else if (nodeOne.direction == "left") {
              return [2, ["r", "f"], "up"];
            } else if (nodeOne.direction == "down") {
              return [3, ["r", "r", "f"], "up"];
            }
        } else if (x2 > x1) {
            if (nodeOne.direction == "up") {
              return [3, ["r", "r", "f"], "down"];
            } else if (nodeOne.direction == "right") {
              return [2, ["r", "f"], "down"];
            } else if (nodeOne.direction == "left") {
              return [2, ["l", "f"], "down"];
            } else if (nodeOne.direction == "down") {
              return [1, ["f"], "down"];
            }
        }
        if (y2 < y1) {
            if (nodeOne.direction == "up") {
              return [2, ["l", "f"], "left"];
            } else if (nodeOne.direction == "right") {
              return [3, ["l", "l", "f"], "left"];
            } else if (nodeOne.direction == "left") {
              return [1, ["f"], "left"];
            } else if (nodeOne.direction == "down") {
              return [2, ["r", "f"], "left"];
            }
        } else if (y2 > y1) {
            if (nodeOne.direction == "up") {
              return [2, ["r", "f"], "right"];
            } else if (nodeOne.direction == "right") {
              return [1, ["f"], "right"];
            } else if (nodeOne.direction == "left") {
              return [3, ["r", "r", "f"], "right"];
            } else if (nodeOne.direction == "down") {
              return [2, ["l", "f"], "right"];
            }
        }
    }
