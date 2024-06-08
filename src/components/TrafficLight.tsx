
"use client";

import "./TrafficLight.css";
export default function TrafficLight( {on}: {on: boolean} ) {



    return (
        <div className="main bg-gray-900 rounded-lg border-2 p-1">
            <label className="switch">
                <input type="radio" name="value-radio"/>
                <div className="button">
                    <div className="light" id={on?"on":""}></div>
                    <div className="dots"></div>
                </div>
            </label>
            <label className="switch2">
                <input type="radio" name="value-radio"/>
                <div className="button">
                    <div className="light" id={on?"":"on"} ></div>
                    <div className="dots"></div>
                </div>
            </label>
        </div>
    )
}