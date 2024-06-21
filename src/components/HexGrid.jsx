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
    hitCharacters,
}) => {
    // calculate width and height of each grid cell
    const cellWidth = imageWidth / numCols;
    const cellHeight = imageHeight / numRows;

    // Function determining the border class for a cell based on hit status
    const getCellStatus = (row, col) => {
        // Check if coordinates match any hit character, if so mark as hit on local.
        const isPartOfHit = hitCharacters.some((character) =>
            character.coordinates.some(
                (coord) => coord.row === row && coord.col === col
            )
        );

        // Below is an algorithmn that checks which border of a given 6 cell collection and colores
        // the outermost borders green.

        /* Cases to check
        
        Is top?     => !row - 1
        is Right?   => !col + 1
        Is Bottom?  => !row + 1
        is Left?    => !col - 1

        Can then check for corner cases, by checking existing cases.

        is Top Left?      =>  Is Top && is Left      => !row - 1 && !col - 1
        is Top Right?     =>  Is Top && is Right     => !row -1 && !col + 1
        is Bottom Left?   =>  Is Bottm && is Left    => !row + 1 && !col - 1
        is Bottom Right?  =>  Is Bottom && is Right  => !row + 1 && !col + 1 
        is Middle?        =>  Is NOTHING             => !row +/- 1 && !col +/- 1
        
        */

        // if not marked as hit, skip.
        if (!isPartOfHit) return '';

        // check if the cell coordinates above the current one (row - 1) is hit, if not, is top.
        const isTopBorder = !hitCharacters.some((character) =>
            character.coordinates.some(
                (coord) => coord.row === row - 1 && coord.col === col
            )
        );

        const isRightBorder = !hitCharacters.some((character) =>
            character.coordinates.some(
                (coord) => coord.row === row && coord.col === col + 1
            )
        );

        const isBottomBorder = !hitCharacters.some((character) =>
            character.coordinates.some(
                (coord) => coord.row === row + 1 && coord.col === col
            )
        );

        const isLeftBorder = !hitCharacters.some((character) =>
            character.coordinates.some(
                (coord) => coord.row === row && coord.col === col - 1
            )
        );

        // Check for corner cases
        const isTopLeftCorner = isTopBorder && isLeftBorder;
        const isTopRightCorner = isTopBorder && isRightBorder;
        const isBottomLeftCorner = isBottomBorder && isLeftBorder;
        const isBottomRightCorner = isBottomBorder && isRightBorder;

        const isMiddle =
            !isTopBorder && !isRightBorder && !isBottomBorder && !isLeftBorder;

        // Based on these checks, one or more class rules will be applied, as seen in index.css (tailwind)
        return `
            ${isTopLeftCorner ? 'hitTopLeft isHit' : ''}
            ${isTopRightCorner ? 'hitTopRight isHit' : ''}
            ${isBottomLeftCorner ? 'hitBottomLeft isHit' : ''}
            ${isBottomRightCorner ? 'hitBottomRight isHit' : ''}
            ${isTopBorder ? 'hitTop isHit' : ''}
            ${isRightBorder ? 'hitRight isHit' : ''}
            ${isBottomBorder ? 'hitBottom isHit' : ''}
            ${isLeftBorder ? 'hitLeft isHit' : ''}
            ${isMiddle ? 'hitMiddle isHit' : ''}
          `;
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
                        className={`absolute cursor-pointer border border-gray-600 opacity-50 ${getCellStatus(
                            row,
                            col
                        )}`}
                        style={{
                            width: `${cellWidth}px`,
                            height: `${cellHeight}px`,
                            top: `${row * cellHeight}px`,
                            left: `${col * cellWidth}px`,
                        }}
                        /* click handler sending the corresponding coordinates */
                        onClick={() => onCellClick(row, col)}
                    />
                ))
            )}
        </div>
    );
};

export default HexGrid;
