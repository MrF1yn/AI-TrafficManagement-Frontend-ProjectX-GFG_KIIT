import {Goldman} from "next/font/google";
import AuthForms from "@/components/AuthForms";
import {Suspense} from "react";

const goldman = Goldman({
    weight: '400',
    subsets: ['latin']
})

export default function Login() {
    return (
        <Suspense>
            <main
                className={`p-5 w-full h-full gap-6 bg-black flex md:flex-row flex-col justify-center items-center text-white ${goldman.className}`}>
                <div className="h-full w-full flex flex-col items-center sm:gap-20 gap-2 justify-center">
                    <span className="sm:text-5xl text-3xl text-center">Revolutionize Your Traffic Management</span>
                    <span className="sm:text-xl text-lg text-center md:w-[80%] w-full">
                    Get access to our realtime traffic monitoring solutions leveraging cutting edge computer vision
                    technologies and witness the power of automated traffic management system.
                    <br/>
                    Login/Register Today!
                </span>
                </div>
                <div className="h-full md:w-[60%] w-full flex justify-center items-center">
                    <AuthForms/>
                </div>
            </main>
        </Suspense>
    );
}
