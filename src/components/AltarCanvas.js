import { useEffect } from "react";
import urnSmall from '../images/relic_small/urn_small.png';
import candlestickSmall from '../images/relic_small/candlestick_small.png';
import censerSmall from '../images/relic_small/censer_small.png';
import cofferSmall from '../images/relic_small/coffer_small.png';
import papyrusSmall from '../images/relic_small/papyrus_small.png';
import processionalSmall from '../images/relic_small/processional_small.png';
import tomeSmall from '../images/relic_small/tome_small.png';

const imageMap = {
    candlestick: candlestickSmall, 
    censer: censerSmall, 
    coffer: cofferSmall, 
    papyrus: papyrusSmall, 
    processional: processionalSmall, 
    tome: tomeSmall,
    urn: urnSmall, 
};

const dimsMap = {
    candlestick: {width: 1, height: 4},
    censer: {width: 1, height: 2}, 
    coffer: {width: 2, height: 2}, 
    papyrus: {width: 4, height: 1}, 
    processional: {width: 1, height: 3}, 
    tome: {width: 3, height: 1},
    urn: {width: 2, height: 1}, 
};


const AltarCanvas = props => {
    const {fittedRelics} = props;
    useEffect(() => {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        // Border around canvas
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.rect(0, 0, 250, 200);
        ctx.stroke();
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 1;


        // Dead slots in relic altar
        ctx.fillStyle = "#333";
        ctx.fillRect(201, 1, 48, 48);
        ctx.fillRect(1, 151, 48, 48);
      
        // Grid lines
        for (let i = 1; i <= 4; i++) {
            const x = i*50;
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let i = 1; i <= 3; i++) {            
            const y = i*50;
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        const p = 1;

        fittedRelics.forEach(r => {
            
            const x = Number(r.row) * 50;
            const y = Number(r.col) * 50;
            const img = new Image();
            
            img.onload = function() {
                ctx.drawImage(img, y+p+1, x+p, (dimsMap[r.type].width*50)-(p*2), (dimsMap[r.type].height*50)-(p*2));
            };
        
            img.src = imageMap[r.type];
            
        })

    }, []);
    
    return (
        <canvas id="canvas" width="250" height="200"></canvas>
    );
}

export default AltarCanvas;