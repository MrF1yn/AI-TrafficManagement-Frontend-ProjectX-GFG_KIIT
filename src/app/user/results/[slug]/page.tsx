"use client";
import {Goldman} from "next/font/google";
import LaneComponents from "@/components/LaneComponents";
import {useState} from "react";
import {Button} from "@/components/ui/button";

const goldman = Goldman({
    weight: '400',
    subsets: ['latin']
})


export default function ResultsPage({params}: {params: {slug: string}}) {


    console.log(params.slug)
    return (
        <main
            className={`p-5 w-full h-full gap-6 bg-black flex flex-col justify-center items-center text-white ${goldman.className}`}>
            <div className="w-full flex">
                <span className="text-2xl md:text-5xl ">Realtime Analysis</span>
                <Button variant="secondary" className="ml-auto text-xl p-6 hover:bg-red-500" >Stop Analysis</Button>
            </div>
            <div className="flex h-full w-full gap-2 flex-col md:flex-row">
                <LaneComponents laneNumber="1" trafficLightOnOff={true}/>
                <LaneComponents laneNumber="2" trafficLightOnOff={false} />
                <LaneComponents laneNumber="3" trafficLightOnOff={true}/>
                <LaneComponents laneNumber="4" trafficLightOnOff={false}/>
            </div>
        </main>
    );
}
