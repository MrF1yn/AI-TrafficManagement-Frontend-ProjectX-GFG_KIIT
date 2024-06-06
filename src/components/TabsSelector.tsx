"use client"

import {useRouter} from 'next/navigation'
import {Button} from "@/components/ui/button"
import {Goldman} from "next/font/google";

const goldman = Goldman({
    weight: "400",
    subsets: ['latin']
})


export function TabsSelector({children, className, route}: any) {
    const router = useRouter();


    return (
        <Button variant="ghost" onClick={() => {
            if (route)
             router.push(route)
        }}
                className={"flex items-center gap-1.5 h-full text-lg hover:bg-black hover:text-white transition-colors duration-300 ease-in-out " + className + " " + goldman.className}>
            {children}
        </Button>
    )
}
