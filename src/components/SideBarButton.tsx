"use client";
import { Button } from "@/components/ui/button"
import {usePathname, useRouter} from "next/navigation";
import {useState, useEffect} from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function SideBarButton({icon, tooltip, route}: any) {
    const pathname = usePathname();
    const [style, setStyle] = useState("")
    const router = useRouter();
    useEffect(() => {
        if(pathname === route)
            setStyle("md:border-r-4 md:border-b-0 border-b-4 text-blue-500")
        else
            setStyle("")
    }, [pathname, route]);

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button onClick={()=>{router.push(route)}} className={"hover:text-blue-500 transition  md:w-full md:h-[10%] h-full w-[10%] flex justify-center items-center text-3xl border-blue-500 "+ style} >
                        <FontAwesomeIcon icon={icon}/>
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
