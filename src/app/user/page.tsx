"use client";
import Image from "next/image";
import {Goldman} from "next/font/google";
import FeaturesCard from "@/components/FeaturesCard";
import {Button} from "@/components/ui/button"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ImageUpload from "@/components/image-upload";
import {TabsSelector} from "@/components/TabsSelector";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {Loader} from "@/components/Loader";
import {useRouter} from "next/navigation";


const goldman = Goldman({
    weight: '400',
    subsets: ['latin']
})

export default function UserPage() {
    const {data: token, status} = useSession();
    const router = useRouter();
    const [cleared, setCleared] = useState(false);
    return (
        <main
            className={`p-5 w-full h-full gap-6 flex flex-col justify-center items-center text-white ${goldman.className}`}>
            {status === "authenticated" && (
                <>
                    <ImageUpload token={token} key={cleared}/>
                    <span className="w-full flex justify-end gap-2 mb-[60px] md:mb-0">
                        <Button className=" text-xl p-6 hover:bg-red-500" onClick={() => {

                            axios.get(
                                `${process.env.NEXT_PUBLIC_BACKEND_URL}rest/clear/`,
                                {
                                    headers: {// @ts-ignore
                                        "Authorization": `Bearer ${token.access_token}`
                                    },
                                }
                            )
                            setCleared((prevState) => {
                                return !prevState;
                            });
                        }}>Clear</Button>
                        <Button className=" text-xl p-6 hover:bg-green-500 hover:text-white bg-white text-black"
                                onClick={() => {
                                    router.push('/user/results');
                                }
                            }>Start Analysis
                        </Button>
                    </span>
                </>
            )}
            {status === "loading" && (
                <>
                    <Loader text="Fetching Session"/>
                </>
            )}
        </main>
    );
}
