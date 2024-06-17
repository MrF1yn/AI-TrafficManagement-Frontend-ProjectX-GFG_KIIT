"use client";

import {Goldman} from "next/font/google";
import {TabsSelector} from "@/components/TabsSelector";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button} from "@/components/ui/button"
import {signIn, signOut, useSession} from "next-auth/react";
import {TabsSelectorSkeleton} from "@/components/TabsSelectorSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {useEffect} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {useRouter} from "next/navigation";

const goldman = Goldman({
    weight: '700',
    subsets: ['latin']
})


export default function NavBar() {

    const {data: session, status} = useSession();
    const router = useRouter();
    useEffect(() => {

        if(!session)return;
        //@ts-ignore
        if (session.hasOwnProperty("error") && session.error) {
            let signOutPromise =  signOut({redirect: false}).then((value)=>{
                router.push(`${process.env.NEXT_PUBLIC_URL}`);
            });
        }
    }, [session]);
    return (


        <div className={`w-full h-[60px] bg-white flex items-center text-4xl p-2 justify-between`}>
            <span className={goldman.className}>AITM</span>
            <div className="md:flex gap-2 h-full hidden">
                <TabsSelector
                    route="/"
                >
                    <span>Home</span>
                </TabsSelector>
                <TabsSelector>
                    <span>Features</span>
                </TabsSelector>
                <TabsSelector>
                    <span>How it works</span>
                </TabsSelector>

                {status === "loading" && (
                    <>
                        <TabsSelectorSkeleton route="/login">
                            <span className="invisible">Login</span>
                        </TabsSelectorSkeleton>
                        <TabsSelectorSkeleton route="/register" className="">
                            <span className="invisible">Register</span>
                        </TabsSelectorSkeleton>
                    </>
                )}
                {status === "unauthenticated" && (
                    <>
                        <TabsSelector route="/login">
                            <span>Login</span>
                        </TabsSelector>
                        <TabsSelector route="/register" className="border-4 border-black">
                            <span>Register</span>
                        </TabsSelector>

                    </>
                )}
                {status === "authenticated" && (
                    <div className="flex gap-4">
                        <TabsSelector onClick={async () => {
                            let signOutPromise = await signOut({redirect: false});
                                router.push(`${process.env.NEXT_PUBLIC_URL}`);

                        }} className="border-4 border-black">
                            <span>Logout</span>
                        </TabsSelector>
                        <Avatar className="">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                )}


            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" className="md:hidden h-full text-lg">
                        <FontAwesomeIcon icon={faBars}/>
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Edit profile</SheetTitle>
                        <SheetDescription>
                            Make changes to your profile here. Click save when you&apos;re done.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            {/*<Label htmlFor="name" className="text-right">*/}
                            {/*    Name*/}
                            {/*</Label>*/}
                            {/*<Input id="name" value="Pedro Duarte" className="col-span-3"/>*/}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            {/*<Label htmlFor="username" className="text-right">*/}
                            {/*    Username*/}
                            {/*</Label>*/}
                            {/*<Input id="username" value="@peduarte" className="col-span-3"/>*/}
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>

        </div>
    )
}