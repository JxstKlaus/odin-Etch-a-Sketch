const gridContainer = document.querySelector(".grid-container");
const positionInfo = gridContainer.getBoundingClientRect();
const gridLength = positionInfo.height;


//function to draw the grid
const drawGrid = (width, height)=>{
    itemLength = gridLength / height;
    for (let row=0; row<height; row++){
        let row = document.createElement("div");
        row.className = 'row'
        for (let col=0; col<width; col++){
            let col = document.createElement("div");
            col.style.width = `${itemLength}px`;
            col.style.height = `${itemLength}px`;
            col.className = 'item'
            row.appendChild(col)
        }

        gridContainer.appendChild(row)
        
    }

    console.log(itemLength)
}

drawGrid(16,16);