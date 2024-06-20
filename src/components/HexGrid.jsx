/* 
Component responsible for rendering a hex grid of clickable divs 
sending their respective coordinates as props to parent 
*/

const HexGrid = ({
    imageWidth,
    imageHeight,
    numRows,
    numCols,
    onCellClick,
}) => {
    // calculate width and height of each grid cell
    const cellWidth = imageWidth / numCols;
    const cellHeight = imageHeight / numRows;

    // click event handler for cells
    const handleClick = (row, col) => {
        onCellClick({ row, col });
    };

    return (
        /* Container of the grid */
        /* generate an array of rows with corresponding array of columns,
            map with coordinates data */
        <div
            className='absolute top-0 left-0'
            style={{ zIndex: 10 }}
        >
            {[...Array(numRows)].map((_, row) =>
                [...Array(numCols)].map((_, col) => (
                    /* 
            each cell holds their row and col as their key, styled absolutely within the container 
            and placed based on their number placement in the grid
            */
                    <div
                        key={`${row}-${col}`}
                        className='absolute cursor-pointer border border-gray-600 opacity-35'
                        style={{
                            width: `${cellWidth}px`,
                            height: `${cellHeight}px`,
                            top: `${row * cellHeight}px`,
                            left: `${col * cellWidth}px`,
                        }}
                        /* click handler sending the corresponding coordinates */
                        onClick={() => handleClick(row, col)}
                    />
                ))
            )}
        </div>
    );
};

export default HexGrid;
