import _ from 'lodash';

export const stringifyBoard = board => {
    console.log("\n");
    console.log("     0   1   2   3   4");
    console.log("   +-------------------+");

    for (let row = 0; row < 4; row++) {
        let rowString = " | "
        for (let col = 0; col < 5; col++) {
            rowString += (`${board[row][col]} | `);
            
        }
        console.log(`${row} ${rowString}`);
        
    }

    console.log("   +-------------------+");
    console.log("\n");
}

export const largestFirst = (a,b) => {

    if (Math.max(a.width, a.height) < Math.max(b.width, b.height)) {
        return 1;
    } else if (Math.max(a.width, a.height) > Math.max(b.width, b.height)) {
        return -1;
    } else if (
        (Math.max(a.width, a.height) === Math.max(b.width, b.height)) 
            && Math.max(a.width, a.height) === 2
    ) {
        if (a.width === 2 && a.height === 2) {
            return -1;
        } else if (b.width === 2 && b.height === 2) {
            return 1;
        } else {
            return 0;
        }
    } else {
        return 0;
    }    
}

export const smallestFirst = (a, b) => {
    if (Math.max(a.width, a.height) < Math.max(b.width, b.height)) {
        return -1;
    } else if (Math.max(a.width, a.height) > Math.max(b.width, b.height)) {
        return 1;
    } else if (
        (Math.max(a.width, a.height) === Math.max(b.width, b.height)) 
         && Math.max(a.width, a.height) === 2
    ) {
        if (a.width === 2 && a.height === 2) {
            return 1;
        } else if (b.width === 2 && b.height === 2) {
            return -1;
        } else {
            return 0;
        }
    } else {
        return 0;
    }
}

export const sortOptimized = (relics, fallback) => {
    const optimized = (a,b) => {
        if (a.width === 1 && a.height === 4) {
            return -1;
        } else if (b.width === 1 && b.height === 4) {
            return 1;
        } else if (a.width === 1 && a.height === 3) {
            return -1;
        } else if (b.width === 1 && b.height === 3) {
            return 1;
        } else if (a.width === 3 && a.height === 1) {
            return -1;
        } else if (b.width === 3 && b.height === 1) {
            return 1;
        } else {
            return fallback(a,b);
        }
    }

    relics.sort(optimized)
}

export const firstFitTopLeftToBottomRightRowByCol = (board_source, relic, fittedRelics) => {

    let board = _.cloneDeep(board_source);

    for (let row = 0; (row + relic.height) < 5; row++) {
        for (let col = 0; (col + relic.width) < 6; col++) {
            
            let fitsWidth = true;
            let fitsHeight = true;
            
            for (let widthUnit = 0; widthUnit < relic.width; widthUnit++) {
                if (board[row][col + widthUnit] !== ' ') {
                    fitsWidth = false;
                    widthUnit = Number.MAX_VALUE;
                }
            }
            
            if (fitsWidth) {
                for (let heightUnit = 0; heightUnit < relic.height; heightUnit++) {
                    if (board[row + heightUnit][col] !== ' ') {
                        fitsHeight = false;
                        heightUnit = Number.MAX_VALUE;
                    }
                }
            }
            
            if (fitsWidth && fitsHeight && relic.width === 2 && relic.height === 2) {
                if (board[row + 1][col + 1] !== ' ') {
                    fitsWidth = false;
                    fitsHeight = false;
                }
            }
            
            if (fitsWidth && fitsHeight) {
                //(`\nfound fit for '${relic.identifier}' at (${row},${col})\n`)
                fittedRelics.push({row: row, col: col, type: relic.type});
                for (let row_x = row; row_x < (row + relic.height); row_x++) {
                    for (let col_x = col; col_x < (col + relic.width); col_x++) {
                        board[row_x][col_x] = relic.identifier;
                    }
                }

                //console.log(board)
                return board;
                
            } else {
                // console.log(`\ndidn't fit at (${row},${col})\n`);
            }
        }
    }

    // No fit found
    //console.log(`\ncould not find fit for '${relic.identifier}'`);
    return board_source;
}

export const firstFitTopLeftToBottomRightColByRow = (board_source, relic, fittedRelics) => {

    let board = _.cloneDeep(board_source);

    for (let col = 0; (col + relic.width) < 6; col++) {
        for (let row = 0; (row + relic.height) < 5; row++) {
            
            let fitsWidth = true;
            let fitsHeight = true;
            
            for (let widthUnit = 0; widthUnit < relic.width; widthUnit++) {
                if (board[row][col + widthUnit] !== ' ') {
                    fitsWidth = false;
                    widthUnit = Number.MAX_VALUE;
                }
            }
            
            if (fitsWidth) {
                for (let heightUnit = 0; heightUnit < relic.height; heightUnit++) {
                    if (board[row + heightUnit][col] !== ' ') {
                        fitsHeight = false;
                        heightUnit = Number.MAX_VALUE;
                    }
                }
            }
            
            if (fitsWidth && fitsHeight && relic.width === 2 && relic.height === 2) {
                if (board[row + 1][col + 1] !== ' ') {
                    fitsWidth = false;
                    fitsHeight = false;
                }
            }
            
            if (fitsWidth && fitsHeight) {
                //console.log(`\nfound fit for '${relic.identifier}' at (${row},${col})\n`)
                fittedRelics.push({row: row, col: col, type: relic.type});
                for (let row_x = row; row_x < (row + relic.height); row_x++) {
                    for (let col_x = col; col_x < (col + relic.width); col_x++) {
                        board[row_x][col_x] = relic.identifier;
                    }
                }

                //console.log(board)
                return board;
                
            } else {
                // console.log(`\ndidn't fit at (${row},${col})\n`);
            }
        }
    }

    // No fit found
    //console.log(`\ncould not find fit for '${relic.identifier}'`);
    return board_source;
}

export const optimizedFit = (board_source, relics, fallback, fittedRelics) => {
    let board = _.cloneDeep(board_source);
    relics.forEach(relic => {
        if (relic.width === 4 && relic.height === 1) {
            if (board[0][0] === ' ' && board[0][1] === ' ' && board[0][2] === ' ' && board[0][3] === ' ') {
                //console.log(`\nfound optimized fit for '${relic.identifier}' at (0,0)\n`);
                fittedRelics.push({row: 0, col: 0, type: relic.type});
                board[0][0] = board[0][1] = board[0][2] = board[0][3] = relic.identifier;
                //console.log(board)
                return board;
            } else if (board[3][1] === ' ' && board[3][2] === ' ' && board[3][3] === ' ' && board[3][4] === ' ') {
                //console.log(`\nfound optimized fit for '${relic.identifier}' at (3,1)\n`);
                fittedRelics.push({row: 3, col: 1, type: relic.type});
                board[3][1] = board[3][2] = board[3][3] = board[3][4] = relic.identifier;
                //console.log(board)
                return board;
            }
        } else if (relic.width === 1 && relic.height === 3) {
            if (board[0][0] === ' ' && board[1][0] === ' ' && board[2][0] === ' ') {
                //console.log(`\nfound optimized fit for '${relic.identifier}' at (0,0)\n`);
                fittedRelics.push({row: 0, col: 0, type: relic.type});
                board[0][0] = board[1][0] = board[2][0] = relic.identifier;
                //console.log(board)
                return board;
            } else if (board[1][4] === ' ' && board[2][4] === ' ' && board[3][4] === ' ') {
                //console.log(`\nfound optimized fit for '${relic.identifier}' at (1,4)\n`);
                fittedRelics.push({row: 1, col: 4, type: relic.type});
                board[1][4] = board[2][4] = board[3][4] = relic.identifier;
                //console.log(board)
                return board;
            }
        } else if (relic.width === 3 && relic.height === 1 && relics.filter(r => (r.height === 4)).length === 0) {            
            if (board[0][0] !== ' ' && board[0][1] === ' ' && board[0][2] === ' ' && board[0][3] === ' ') {
                //console.log(`\nfound optimized fit for '${relic.identifier}' at (0,1)\n`);
                fittedRelics.push({row: 0, col: 1, type: relic.type});
                board[0][1] = board[0][2] = board[0][3] = relic.identifier;
                //console.log(board)
                return board;
            } else if (board[3][4] !== ' ' && board[3][1] === ' ' && board[3][2] === ' ' && board[3][3] === ' ') {
                //console.log(`\nfound optimized fit for '${relic.identifier}' at (3,1)\n`);
                fittedRelics.push({row: 3, col: 1, type: relic.type});
                board[3][1] = board[3][2] = board[3][3] = relic.identifier;
                //console.log(board)
                return board;
            }
        } else if (relic.width === 1 && relic.height === 4 ) {            
            if (board[0][1] === ' ' && board[1][1] === ' ' && board[2][1] === ' ' && board[3][1] === ' ') {
                //console.log(`\nfound optimized fit for '${relic.identifier}' at (0,1)\n`);
                fittedRelics.push({row: 0, col: 1, type: relic.type});
                board[0][1] = board[1][1] = board[2][1] = board[3][1] = relic.identifier;
                //console.log(board)
                return board;
            } else if (board[0][2] === ' ' && board[1][2] === ' ' && board[2][2] === ' ' && board[3][2] === ' ') {
                //console.log(`\nfound optimized fit for '${relic.identifier}' at (0,2)\n`);
                fittedRelics.push({row: 0, col: 2, type: relic.type});
                board[0][2] = board[1][2] = board[2][2] = board[3][2] = relic.identifier;
                //console.log(board)
            } else if (board[0][3] === ' ' && board[1][3] === ' ' && board[2][3] === ' ' && board[3][3] === ' ') {
                //console.log(`\nfound optimized fit for '${relic.identifier}' at (0,3)\n`);
                fittedRelics.push({row: 0, col: 3, type: relic.type});
                board[0][3] = board[1][3] = board[2][3] = board[3][3] = relic.identifier;
                //console.log(board)
            }
        }
        
        board = fallback(board, relic, fittedRelics);
    })
    
    // stringifyBoard(board);

}

export const permutator = (inputArr) => {
    let result = [];
  
    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }

    permute(inputArr);
    return result;
}