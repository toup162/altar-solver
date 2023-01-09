
import _ from 'lodash';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {
    firstFitTopLeftToBottomRightRowByCol,
    optimizedFit,
    largestFirst,
    sortOptimized,
    smallestFirst,
    permutator,
    dimsMap,
    ascendingId,
    totalFittedArea
} from './utils';
import { useEffect, useState } from 'react';
import AltarCanvas from './components/AltarCanvas';
import RelicSelector from './components/RelicSelector';

function App() {

    const [relicInventory, setRelicInventory] = useState([]);
    const [solvedAltar, setSolvedAltar] = useState([]);
    const [unsuccessfulFitting, setUnsuccessfulFitting] = useState(false);

    const addRelic = type => {
        const newRelic = {
            type,
            width: dimsMap[type].width,
            height: dimsMap[type].height,
            identifier: relicInventory.length.toString()
        };

        setRelicInventory([...relicInventory, newRelic]);
    }

    const removeRelic = id => {
        const newInventory = _.cloneDeep(relicInventory).filter(r => r.identifier !== id);
        setRelicInventory(newInventory);
    }

    const removeLastRelic = () => {
        let invCopy = _.cloneDeep(relicInventory);
        invCopy.sort(ascendingId);
        invCopy.pop();
        setRelicInventory(invCopy);
    }

    const clearInventory = () => {
        setRelicInventory([]);
        setSolvedAltar([]);
    }

    useEffect(() => {
        
        let ba = [
            [' ',' ',' ',' ','/'],
            [' ',' ',' ',' ',' '],
            [' ',' ',' ',' ',' '],
            ['/',' ',' ',' ',' '],
        ];
        
        let fittedRelics = [];
        
        let relics = _.cloneDeep(relicInventory);
        
        if (totalFittedArea(relics) > 18) {
            relicInventory.sort(ascendingId);
            relicInventory.pop();
            setRelicInventory(relicInventory);
            setUnsuccessfulFitting(true);
            return;
        }
        
        /* Try to solve using an optimized sorting and fitting. */
        sortOptimized(relics, largestFirst);
        optimizedFit(ba, relics, firstFitTopLeftToBottomRightRowByCol, fittedRelics);

        if (fittedRelics?.length === relics?.length) {
            fittedRelics = [];
            sortOptimized(relics, smallestFirst)
            optimizedFit(ba, relics, firstFitTopLeftToBottomRightRowByCol, fittedRelics);
        }
        
        if (fittedRelics?.length === relics?.length) {
            setUnsuccessfulFitting(false);
            setSolvedAltar(fittedRelics);
        } else {
            /* If optimized sort fails, iterate through the permutations of relic ordering */
            fittedRelics = [];
            let permutations = permutator(relics);
            permutations.some((p, i) => {
                const newBoard = _.cloneDeep(ba);
                optimizedFit(newBoard, p, firstFitTopLeftToBottomRightRowByCol, fittedRelics);
                
                if (fittedRelics?.length === relics?.length) {
                    setSolvedAltar(fittedRelics);
                    return true;
                } else {
                    fittedRelics = [];
                    return false;
                }
            });

            if (fittedRelics?.length !== relics?.length) {
                relicInventory.sort(ascendingId);
                relicInventory.pop();
                setRelicInventory(relicInventory);
                setUnsuccessfulFitting(true);
            } else {
                setUnsuccessfulFitting(false);
            }

            fittedRelics = [];
        }
    }, [relicInventory]);

    return (
        <div className="App">
            <div className="container">
                <div>
                    <RelicSelector
                        addRelic={addRelic}
                        solvedAltar={solvedAltar}
                        unsuccessfulFitting={unsuccessfulFitting}
                    />
                </div>
                
                {solvedAltar && (
                    <div>
                        <AltarCanvas
                            fittedRelics={solvedAltar}
                            removeRelic={removeRelic}
                            clearInventory={clearInventory}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
