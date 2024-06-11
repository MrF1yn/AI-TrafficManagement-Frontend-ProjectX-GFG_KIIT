"use client";
import Image from "next/image";
import {Goldman} from "next/font/google";
import FeaturesCard from "@/components/FeaturesCard";
import {Button} from "@/components/ui/button"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ImageUpload from "@/components/image-upload";
import {TabsSelector} from "@/components/TabsSelector";
import {useSession} from "next-auth/react";


const goldman = Goldman({
    weight: '400',
    subsets: ['latin']
})

export default function UserPage() {
    const {data: token, status} = useSession();
    return (
        <main
            className={`p-5 w-full h-full gap-6 flex flex-col justify-center items-center text-white ${goldman.className}`}>
            {status === "authenticated" && (
                <>
                    <ImageUpload token={token}/>
                    <Button className="ml-auto text-xl p-6 hover:bg-blue-500">Start Analysis</Button>
                </>
            )}
        </main>
    );
}
