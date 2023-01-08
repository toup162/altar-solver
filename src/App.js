
import _ from 'lodash';
import './App.css';
import {
    firstFitTopLeftToBottomRightRowByCol,
    firstFitTopLeftToBottomRightColByRow,
    optimizedFit,
    stringifyBoard,
    largestFirst,
    sortOptimized,
    smallestFirst,
    permutator
} from './utils';
import { useEffect } from 'react';
import AltarCanvas from './components/AltarCanvas';

let ba = [
    [' ',' ',' ',' ','/'],
    [' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' '],
    ['/',' ',' ',' ',' '],
];

let fittedRelics = [];

/*


All: 
    {width: 4, height: 1, identifier: 'a', type: 'papyrus'},
    {width: 3, height: 1, identifier: 'b', type: 'tome'},
    {width: 2, height: 1, identifier: 'c', type: 'urn'},
    {width: 2, height: 2, identifier: 'd', type: 'coffer'},
    {width: 1, height: 2, identifier: 'e', type: 'censer'},
    {width: 1, height: 3, identifier: 'f', type: 'processional'},
    {width: 1, height: 4, identifier: 'g', type: 'candlestick'},

Success #1
    {width: 3, height: 1, identifier: 'b', type: 'tome'},
    {width: 2, height: 2, identifier: 'd', type: 'coffer'},
    {width: 2, height: 2, identifier: 'h', type: 'coffer'},
    {width: 4, height: 1, identifier: 'a', type: 'papyrus'},
    {width: 1, height: 3, identifier: 'f', type: 'processional'},

Success #2
    {width: 1, height: 3, identifier: 'f', type: 'processional'},
    {width: 2, height: 1, identifier: 'c', type: 'urn'},
    {width: 3, height: 1, identifier: 'b', type: 'tome'},
    {width: 2, height: 2, identifier: 'd', type: 'coffer'},
    {width: 1, height: 4, identifier: 'g', type: 'candlestick'},
    {width: 1, height: 2, identifier: 'e', type: 'censer'},

Success #3
    {width: 1, height: 2, identifier: 'e', type: 'censer'},
    {width: 1, height: 2, identifier: 'e', type: 'censer'},
    {width: 1, height: 4, identifier: 'g', type: 'candlestick'},
    {width: 1, height: 4, identifier: 'g', type: 'candlestick'},
    {width: 1, height: 4, identifier: 'g', type: 'candlestick'},


*/
let relics = [
    {width: 3, height: 1, identifier: 'b', type: 'tome'},
    {width: 2, height: 2, identifier: 'd', type: 'coffer'},
    {width: 2, height: 2, identifier: 'h', type: 'coffer'},
    {width: 4, height: 1, identifier: 'a', type: 'papyrus'},
    {width: 1, height: 3, identifier: 'f', type: 'processional'},
];

/* Try to solve using an optimized sorting and fitting. */
sortOptimized(relics, largestFirst)
optimizedFit(ba, relics, firstFitTopLeftToBottomRightRowByCol, fittedRelics);

if (fittedRelics?.length === relics?.length) {
    console.log("Solved with optimized sorting")
} else {
    /* If optimized sort fails, iterate through the permutations of relic ordering */
    let permutations = permutator(relics);

    permutations.some((p, i) => {
        const newBoard = _.cloneDeep(ba);
        optimizedFit(newBoard, p, firstFitTopLeftToBottomRightRowByCol, fittedRelics);
        
        if (fittedRelics?.length === relics?.length) {
            console.log(`Solved after ${i + 1} permutation(s)`);
            return true;
        } else {
            fittedRelics = [];
            return false;
        }
    });

}

function App() {
    

    
    
    return (
        <div className="App">
            <div className="content-container">
                {fittedRelics && (
                    <AltarCanvas fittedRelics={fittedRelics}/>
                )}
                
            </div>
        </div>
    );
}

export default App;
