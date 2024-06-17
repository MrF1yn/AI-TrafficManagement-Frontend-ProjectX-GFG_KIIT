import Image from "next/image";
import TrafficLight from "@/components/TrafficLight";
import {LaneData} from "@/lib/utils";
import {Loader} from "@/components/Loader";

export default function LaneComponents({laneNumber, className, data}: {
    laneNumber: number,
    className?: string,
    data?: LaneData
}) {

    const currLaneData = data ? data[laneNumber - 1] : undefined;
    const time = new Date(1718557551.1424544 * 1000)
        .toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});

    return (<>
            {currLaneData ?
                <div
                    className={` h-full rounded-lg border-4 p-4 flex ${className} flex-auto flex-col justify-around`}>
                    <span className="w-full text-center text-3xl">Lane {laneNumber}</span>
                    <Image src={`data:image/jpeg;base64,${currLaneData.frame}`} alt="Image Here" width={1920} height={1080}
                           className="object-cover w-full aspect-video"/>
                    <TrafficLight on={currLaneData.stop?"red":"green"}/>
                    <span className="flex flex-col">
                        <span className="text-lg">Time: {time}</span>
                         <span className="text-lg">Fps: {currLaneData.fps}</span>
                        <span className="text-lg">Total Vehicles: <span className="text-green-500">{currLaneData.car_count}</span></span>
                    </span>
                </div>
                :
                <div
                    className={` h-full rounded-lg border-4 p-4 flex ${className} flex-auto flex-col justify-around`}>
                    <span className="w-full text-center text-3xl">Lane {laneNumber}</span>
                    <Image src="/placeholder.jpg" alt="Image Here" width={1920} height={1080}
                           className="object-cover w-full aspect-video"/>
                    <TrafficLight on=""/>
                    <span className="flex flex-col">
                        <span className="text-lg">Time: 00:00:00 AM</span>
                         <span className="text-lg">Fps: 0</span>
                        <span className="text-lg">Total Vehicles: <span className="text-green-500">0</span></span>
                    </span>
                </div>
            }
        </>

    )
}