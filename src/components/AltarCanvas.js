import { useEffect, useState } from "react";
import urnSmall from '../images/relic_small/urn_small.png';
import candlestickSmall from '../images/relic_small/candlestick_small.png';
import censerSmall from '../images/relic_small/censer_small.png';
import cofferSmall from '../images/relic_small/coffer_small.png';
import papyrusSmall from '../images/relic_small/papyrus_small.png';
import processionalSmall from '../images/relic_small/processional_small.png';
import tomeSmall from '../images/relic_small/tome_small.png';
import { dimsMap } from "../utils";
import _ from 'lodash';

export const imageMap = {
    candlestick: candlestickSmall, 
    censer: censerSmall, 
    coffer: cofferSmall, 
    papyrus: papyrusSmall, 
    processional: processionalSmall, 
    tome: tomeSmall,
    urn: urnSmall, 
};

const AltarCanvas = props => {
    const {fittedRelics, removeRelic, clearInventory} = props;

    useEffect(() => {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

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
        const canvasElements = [];
        fittedRelics.forEach(r => {
            
            const x = Number(r.row) * 50;
            const y = Number(r.col) * 50;
            const img = new Image();
            canvasElements.push({
                width: dimsMap[r.type].width*50,
                height: dimsMap[r.type].height*50,
                top: x+p,
                left: y+p+1,
                identifier: r.identifier,
                clickHandler: () => removeRelic(r.identifier)
            });
            
            img.onload = function() {
                ctx.drawImage(img, y+p+1, x+p, (dimsMap[r.type].width*50)-(p*2), (dimsMap[r.type].height*50)-(p*2));
            };

            img.src = imageMap[r.type];
            
        })

        canvas.onclick = event => {
            
            const canvasLeft = canvas.offsetLeft + canvas.clientLeft;
            const canvasTop = canvas.offsetTop + canvas.clientTop;

            const clickX = event.pageX - canvasLeft;
            const clickY = event.pageY - canvasTop;
            
            // Collision detection between clicked offset and element.
            canvasElements.forEach((element) => {
                if (clickY > element.top && clickY < element.top + element.height 
                    && clickX > element.left && clickX < element.left + element.width
                ) {
                    element.clickHandler();
                }
            });
        }

        /*
        canvas.onmousemove = event => {
            const canvasLeft = canvas.offsetLeft + canvas.clientLeft;
            const canvasTop = canvas.offsetTop + canvas.clientTop;

            const mousePosX = event.pageX - canvasLeft;
            const mousePosY = event.pageY - canvasTop;

            canvasElements.forEach((element) => {
                if (mousePosY > element.top && mousePosY < element.top + element.height 
                    && event.clientX > element.left && mousePosX < element.left + element.width
                ) {
                    element.isHovering = true;
                } else {
                    element.isHovering = false;
                }
            });
        }
        */

    }, [fittedRelics]);
    
    return (
        <div className="altar-canvas-container">
            <div className="help-text mb-3 pt-1">
                {fittedRelics?.length > 0 && 
                    <span>Click a Relic to remove it from the altar.</span>
                }
            </div>
            <div className="d-flex justify-content-center">
                <canvas id="canvas" width="250" height="200"></canvas>
            </div>

            <div className="d-flex mt-3 justify-content-center">
                <button
                    className="btn btn-danger me"
                    onClick={clearInventory}
                    disabled={fittedRelics.length === 0}
                >
                    Clear All
                </button>
            </div>
        </div>
    );
}

export default AltarCanvas;