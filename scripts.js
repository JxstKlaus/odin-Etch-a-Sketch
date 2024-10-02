const DEFAULT_COLOR = 'black'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 16

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

const gridContainer = document.querySelector(".grid-container");
const squares = document.querySelectorAll('.item')
const colorBtn = document.querySelector('.color')
const rainbowBtn = document.querySelector('.rainbow')
const eraserBtn = document.querySelector('.eraser')
const clearBtn = document.querySelector('.clear')
const slider = document.querySelector('.slider')
const sliderOutput = document.querySelector('.output')

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

colorBtn.onclick = ()=> setCurrentMode('color')
rainbowBtn.onclick = ()=> setCurrentMode('rainbow')
eraserBtn.onclick = ()=> setCurrentMode('eraser')
clearBtn.onclick = reloadGrid
slider.oninput = setGridSizeWithSlider

function drawGrid(size){
    gridItemSize = gridContainer.getBoundingClientRect().width / currentSize;
    console.log("width "+gridContainer.getBoundingClientRect().width)
    console.log("size "+currentSize)
    console.log('grid size ' +gridContainer.getBoundingClientRect().width / currentSize)
    for (let row=0; row<size; row++){
        let row = document.createElement("div");
        row.className = 'row'
        for (let col=0; col<size; col++){
            let item = document.createElement("div");
            item.style.width = `${gridItemSize}px`;
            item.style.height = `${gridItemSize}px`;
            item.className = 'item'
            item.addEventListener('mouseover', draw)
            item.addEventListener('mousedown', draw)
            row.appendChild(item)
        }

        gridContainer.appendChild(row)
        
    }
}

function changeSize(newSize){
    currentSize = newSize
    reloadGrid()
}

function reloadGrid(){
    clearGrid()
    drawGrid(currentSize)
}

function clearGrid(){
    gridContainer.textContent = ''
}

function setCurrentMode(newMode){
    activateButton(newMode)
    currentMode = newMode
}
function draw(event){
    if (event.type === "mouseover" && !mouseDown) return
    if (currentMode === 'color') event.target.style.backgroundColor = currentColor
    else if (currentMode === 'eraser') event.target.style.backgroundColor = 'white'
    else if(currentMode === 'rainbow'){
        event.target.style.backgroundColor = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`
    }
    
}

function activateButton(newMode){
    if (newMode === 'color') colorBtn.classList.add('active')
    else if (newMode === 'rainbow') rainbowBtn.classList.add('active')
    else if (newMode === 'eraser') eraserBtn.classList.add('active')

    if (currentMode === 'color') colorBtn.classList.remove('active')
    else if (currentMode === 'rainbow') rainbowBtn.classList.remove('active')
    else if (currentMode === 'eraser') eraserBtn.classList.remove('active')
}

function setGridSizeWithSlider(){
    sliderOutput.textContent = `${this.value}x${this.value}`;
    changeSize(this.value)
}




window.onload = ()=>{
    drawGrid(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
    sliderOutput.textContent = `${slider.value}x${slider.value}`;
}