import urnSmall from '../images/relic_small/urn_small.png';
import candlestickSmall from '../images/relic_small/candlestick_small.png';
import censerSmall from '../images/relic_small/censer_small.png';
import cofferSmall from '../images/relic_small/coffer_small.png';
import papyrusSmall from '../images/relic_small/papyrus_small.png';
import processionalSmall from '../images/relic_small/processional_small.png';
import tomeSmall from '../images/relic_small/tome_small.png';
import { totalFittedArea } from '../utils';


const RelicSelector = props => {
    const {
        addRelic,
        solvedAltar,
        unsuccessfulFitting,
    } = props;

    const disallowAdd = totalFittedArea(solvedAltar) > 16;

    return (
        <>
        <div className="help-text mt-5 mb-3">
            Click a Relic to attempt to add it to the altar.
        </div>
        <div className="d-flex justify-content-center">
        <div className="relic-selector-container mb-4">
            
            <div className="relic-button-container d-flex flex-column">
                <div className="d-flex">
                    
                    <div>
                        <button
                            disabled={disallowAdd}
                            className="relic-button"
                            onClick={() => addRelic('tome')}
                        >
                            <img src={tomeSmall} height={50} width={152} alt="tome Small"/>
                        </button>

                        <div className="d-flex">
                            <div className="d-flex flex-column">
                                <button
                                    disabled={disallowAdd}
                                    className="relic-button"
                                    onClick={() => addRelic('coffer')}
                                >
                                    <img src={cofferSmall} height={100} width={100}  alt="coffer Small"/>
                                </button>
                                <button
                                    disabled={disallowAdd}
                                    className="relic-button"
                                    onClick={() => addRelic('urn')}
                                >
                                    <img src={urnSmall} height={50} width={100}  alt="urn Small"/>
                                </button>
                            </div>
                            <button
                                disabled={disallowAdd}
                                    className="relic-button"
                                onClick={() => addRelic('processional')}
                            >
                                <img src={processionalSmall} height={150} width={50} alt="processional Small"/>
                            </button>
                        </div>

                    </div>
                    
                    <button
                        disabled={disallowAdd}
                        className="relic-button"
                        onClick={() => addRelic('candlestick')}
                    >
                        <img src={candlestickSmall} height={200} width={50} alt="candlestick Small"/>
                    </button>
                    <div className="d-flex align-items-end">
                        <button
                            disabled={disallowAdd}
                            className="relic-button"
                            onClick={() => addRelic('censer')}
                        >
                            <img src={censerSmall} height={100} width={50} alt="censer Small"/>
                        </button>
                    </div>
                
                </div>


                <div className="d-flex">
                    <button
                        disabled={disallowAdd}
                        className="relic-button"
                        onClick={() => addRelic('papyrus')}
                    >
                        <img src={papyrusSmall} height={50} width={204}  alt="papyrus Small"/>
                    </button>
                </div>

            </div>
            
            {/* if error show error*/}
            
                <div className="error-container">
                    {unsuccessfulFitting && 
                        <div className="pt-2 text-danger text-center">Could not find fitting for that Relic.</div>
                    }
                    {disallowAdd && 
                        <div className="pt-2 help-text text-info-custom">Altar cannot fit any more Relics.</div>
                    }
                </div>
            
        </div>
        </div>
        </>
        
    );
}

export default RelicSelector;