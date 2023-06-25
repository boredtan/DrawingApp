const container = document.querySelector("#grid");
const dropdown = document.querySelector("#gridSize");
const sizeSlider = document.querySelector("#sizeSlider");
const sliderLabel = document.querySelector("#sliderLabel");
const colorPalette = document.querySelector("#colorPalette");
const reset = document.querySelector("#reset");
const palette = document.querySelector("#palette");
const rainbow = document.querySelector("#rainbow");
const eraser = document.querySelector("#eraser");
let selectedColor = "black";
let colorMode = "manual";
let clicked = false;

// Function to create grid
const createGrid = (num) => {
    // Create grid
    for(var i = 0; i <num; i++) {
        for(var j = 0; j <num; j++) {
            // Create grid blocks
            let div = document.createElement('div');
            div.classList.add("gridBox");
            // Click event to change colour of grid block
            div.addEventListener('mousemove', changeColor);
            div.addEventListener('mousedown', clickedTrue);
            div.addEventListener('mouseup', clickedFalse);
            div.addEventListener('click', () => div.style.backgroundColor = selectedColor);
            // Add grid blocks to grid container
            container.appendChild(div);
            // Set number of rows, column and size
            container.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
            container.style.gridTemplateRows = `repeat(${num}, 1fr)`;
        }
    }
}

// Function to change color of div
const changeColor = (e) => {
    if(clicked) {
        if(colorMode == 'manual') {
            e.target.style.backgroundColor = selectedColor;
        }
        else if(colorMode == 'rainbow') {
            randomColor();
            e.target.style.backgroundColor = selectedColor;
        }
        else if(colorMode == 'eraser') {
            selectedColor = 'white';
            e.target.style.backgroundColor = selectedColor;
        }
    }
}

// Set clicked to true if mousedown
const clickedTrue = (e) => {
        clicked = true;
}

// Set clicked to false if mouseup
const clickedFalse = () => {
    clicked = false;
}

// Function to delete existing grid
const deleteGrid = () => {
    const boxes = document.querySelectorAll('.gridBox');
    boxes.forEach((box) => box.remove());
    // container.classList = "";
}

const randomColor = () => {
    const r = randomNum();
    const g = randomNum();
    const b = randomNum();
    selectedColor = `rgb(${r},${g},${b})`;
}

// Change grid size depending on value of dropdown
dropdown.addEventListener('change', () => {
    deleteGrid();
    createGrid(dropdown.value);
})

// Change grid size depending on value of slider
sizeSlider.addEventListener('input', () => {
    deleteGrid();
    createGrid(sizeSlider.value);
    sliderLabel.innerHTML = sizeSlider.value;
})

// Change selected color depending on palette choice
colorPalette.addEventListener('change', () => {
    selectedColor = colorPalette.value;
})

// Changes gridbox color to white
reset.addEventListener('click', () => {
    let gridBoxes = document.getElementsByClassName('gridBox');
    Array.from(gridBoxes).forEach((gridBox) => gridBox.style.backgroundColor = 'white');

})

// Set clicked to false if mouse goes out of grid
container.addEventListener('mouseleave', (e) => {
    clicked = false;
})

// Set colorMode to manual when rainbow button clicked
palette.addEventListener('click', () => {
    colorMode = 'manual';
    resetButton();
    palette.style.backgroundColor = 'blue';
    selectedColor = colorPalette.value;
})

// Set colorMode to rainbow when rainbow button clicked
rainbow.addEventListener('click', () => {
    colorMode = 'rainbow';
    resetButton();
    rainbow.style.backgroundColor = 'blue';
})

// Set colorMode to eraser when eraser button clicked
eraser.addEventListener('click', () => {
    colorMode = 'eraser';
    resetButton();
    eraser.style.backgroundColor = 'blue';
})

// Reset background colors of buttons
const resetButton = () => {
    palette.style.backgroundColor = 'transparent';
    rainbow.style.backgroundColor = 'transparent';
    eraser.style.backgroundColor = 'transparent';
}

// Get random number between 0 and 255
const randomNum = () => Math.floor(Math.random() * 256);

// Onload
window.addEventListener('load', function() {
    // Create default grid
    createGrid(10);
    // Refresh dropdown value
    dropdown.value = 10;
    sizeSlider.value = 10;
    sliderLabel.innerHTML = sizeSlider.value;
    colorPalette.value = 'black'
})