"use client";
import { Goldman } from "next/font/google";
import LaneComponents from "@/components/LaneComponents";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Loader } from "@/components/Loader";
import { LaneData } from "@/lib/utils";
import { useRouter } from "next/navigation";
import axios from "axios";

const goldman = Goldman({
  weight: "400",
  subsets: ["latin"],
});

export default function ResultsPage() {
  const { data: token, status } = useSession();
  const [connected, setConnected] = useState(false);
  const [started, setStarted] = useState(false);
  const [data, setData] = useState<LaneData>();
  let socket = useRef<WebSocket>();

  useEffect(() => {
    console.log("STARTSTOP");
    if (!token) return;
    //@ts-ignore
    if (!token.access_token) return;
    if (status !== "authenticated") return;
    initSocket();
    // socket.current?.send("start");
    return () => {
      // @ts-ignore
      socket.current.close();
    };
  }, [token]);

  function initSocket() {
    //@ts-ignore
    socket.current = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL ?? "", ["chat", token.access_token],
    );

    socket.current?.addEventListener("open", (event) => {
      setConnected(true);
      setStarted(false);
      // socket.send("start");
    });

    socket.current?.addEventListener("error", (event) => {
      setConnected(false);
    });
    socket.current?.addEventListener("close", (event) => {
      setConnected(false);
    });

    socket.current?.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      setData(data);
    });
  }

  function toggle() {
    setStarted((prevState) => {
      if (prevState) {
        console.log("Stop");
        socket.current?.send("stop");
        return false;
      }
      socket.current?.send("start");
      return true;
    });
  }

  return (
    <main
      className={`p-5 w-full h-full gap-6 bg-black flex flex-col justify-start items-center text-white ${goldman.className}`}
    >
      <div className="w-full flex justify-between items-center">
        <span className="text-xl md:text-5xl ">Realtime Analysis</span>
        <span className="flex gap-2 md:gap-6 items-center">
          <span className="text-lg md:text-2xl">
            <span className="md:inline hidden">Status:</span>{" "}
            {connected ? (
              <span className="text-green-500">Connected</span>
            ) : (
              <span className="text-red-600">Disconnected</span>
            )}
          </span>
          <Button
            variant="secondary"
            className={`text-lg md:text-xl p-6 hover:bg-red-500 ${started ? "bg-red-600" : "bg-white"}`}
            onClick={toggle}
          >
            <span>{started ? "Stop" : "Start"}&nbsp;</span>
            <span className="md:block hidden">Analysis</span>
          </Button>
        </span>
      </div>
      {status === "authenticated" && connected ? (
        <div className="flex h-full w-full gap-2 flex-col lg:flex-row overflow-y-scroll hide_scrollbar md:mb-0 mb-[60px]">
          <LaneComponents laneNumber={1} data={data} />
          <LaneComponents laneNumber={2} data={data} />
          <LaneComponents laneNumber={3} data={data} />
          <LaneComponents laneNumber={4} data={data} />
        </div>
      ) : (
        <Loader text="Fetching Session" />
      )}
    </main>
  );
}
