// Create a grid of nxn squares

function colorSquare() {
 //   this.setAttribute('style', 'transition: background-color 2s');
    // Want random bright colors. Tried setting random RGB values but the colors
    // were quite dull.
    let hue = Math.floor(Math.random() * 360);
    let sat = '100%';
    let light = Math.floor(Math.random() * 30) + 45 + '%';
    this.style.backgroundColor = `hsl(${hue}, ${sat}, ${light})`;
}

function createGrid(gridSize) {
    let gap = "0px";
    let containerSize = "50vw";

    // Math was derived from assuming constant container width of 50% of viewport
    // width filled with n x n squares on each side. One side therefore contains n
    // squares which comprise n square side lengths + n+1 square borders
    let temp = .5 / (gridSize + .01*gridSize + .01);
    let squareSize = temp * 100 + "vw";
    let squareBorder = temp + "vw";

    // Setting this to be the square height causes extra whitespace to be left
    // because then the border size is not accounted for. The trivial solution
    // of equally diving the height for each row works much better
    let rowHeight = .5 / gridSize * 100 + "vw";

    let containerBorder = temp * 5 + "vw";
    // We want the container border to pop out
    if (temp * 5 < 2) {
        containerBorder = "2px";
    }
    
    const squares = document.querySelector(".squares");
    squares.style.display = "flex";
    squares.style.flexDirection = "column";
    squares.style.justifyContent = "center";
    squares.style.gap = gap;
    squares.setAttribute("style", `border: solid ${containerBorder}`);
    squares.style.width = containerSize;
    squares.style.height = containerSize;
    squares.style.marginLeft = "auto";
    squares.style.marginRight = "auto";
    
    for (let i = 0; i < gridSize; i++) {
    
        let row = document.createElement("div");
        row.classList.add("row");
        row.style.display = "flex";
        row.style.gap = gap;
        row.style.justifyContent = "center";
        row.style.margin = "0px";
        row.style.padding = "0px";
        row.style.width = containerSize;
        row.style.height = rowHeight;
    
        for (let j = 0; j < gridSize; j++) {
            let square = document.createElement("div");
            square.setAttribute("style", `border: solid ${squareBorder}`);
            square.style.width = squareSize;
            square.style.height = squareSize;
            square.classList.add("square");
            square.addEventListener('mouseover', colorSquare);
            row.appendChild(square);
        }
    
        squares.appendChild(row);
    }
}

const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener('click', () => {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach(square => square.style.backgroundColor = "white");
});

const resetBtn = document.querySelector("#new");
resetBtn.addEventListener('click', () => {
    let size = +prompt("Enter new N for NxN grid of squares (Max 100)");
    if (!size) {size = 16;}
    let squares = document.querySelector(".squares");
    while (squares.firstChild) {
        squares.removeChild(squares.firstChild);
    }
    createGrid(size);
});

let size = +prompt("Enter N for NxN grid of squares (Max 100)");
if (!size) {size = 16;} // Set default in case user cancels
createGrid(size);