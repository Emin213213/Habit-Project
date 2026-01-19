import {DotWave} from "@uiball/loaders";
import React from "react";


function  Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <DotWave size={40} speed={1.75} color="black"/>
        </div>
    )
}
export  default Loading