import {Button} from "@/components/ui/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMaximize} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import TrafficLight from "@/components/TrafficLight";

export default function LaneComponents({laneNumber, className, click, trafficLightOnOff}: {
    laneNumber: string,
    className?: string,
    click?: any,
    trafficLightOnOff: boolean
}) {
    return (
        <div
            className={` h-full rounded-lg border-4 p-4 flex ${className} flex-auto flex-col justify-around`}>
            <span className="w-full text-center text-3xl">Lane {laneNumber}</span>
            <Image src={"/placeholder.jpg"} alt="Image Here" width={1920} height={1080}
                   className="object-cover w-full aspect-video"/>
            <TrafficLight on={trafficLightOnOff}/>
            <span className="flex flex-col">
                <span className="text-lg">Time: 12:10pm</span>
                <span className="text-lg">Fps: 5</span>
                <span className="text-lg">Total Vehicles: 16</span>
            </span>
        </div>
    )
}