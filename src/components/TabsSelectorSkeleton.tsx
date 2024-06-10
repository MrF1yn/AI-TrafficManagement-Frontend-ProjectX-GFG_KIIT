"use client"

import {useRouter} from 'next/navigation'
import {Button} from "@/components/ui/button"
import {Goldman} from "next/font/google";
import {Skeleton} from "@/components/ui/skeleton";

const goldman = Goldman({
    weight: "400",
    subsets: ['latin']
})


export function TabsSelectorSkeleton({children, className, route, onClick}: any) {
    const router = useRouter();


    return (
        <Skeleton>

            <Button variant="ghost" onClick={() => {
                if (onClick) {
                    onClick();
                    return;
                }

                if (route)
                    router.push(route)
            }}
                    className={"flex items-center gap-1.5 h-full text-lg transition-colors duration-300 ease-in-out " + className + " " + goldman.className}>
                {children}
            </Button>
        </Skeleton>
    )
}
