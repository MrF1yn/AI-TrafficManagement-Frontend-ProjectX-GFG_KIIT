"use client";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {usePathname} from "next/navigation";
import {useRef, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function AuthForms() {
    const [unAuthorized, setUnAuthorized] = useState("invisible");
    const pathName = usePathname();
    const router = useRouter();
    const defaultRoute = pathName?.substring(1) ?? "login";
    let email = useRef("");
    let password = useRef("");
    let username = useRef("");
    let {data: session, status} = useSession();
    if(status === "authenticated"){
        router.push('/user');
    }


    async function submit(provider: string = "credentials") {
        let signInPromise;
        if(provider === "credentials") {
            signInPromise = await signIn("credentials", {
                username: username.current,
                password: password.current,
                redirect: false,
            });
            if (signInPromise?.ok) {
                setUnAuthorized("invisible");
                router.push(`${process.env.NEXT_PUBLIC_URL}user`);
            } else {
                setUnAuthorized("visible");
            }
            return;
        }
        if(provider === "google"){
            signIn("google", {
                callbackUrl: '/user'
            });
        }

    }

    async function registerSubmit() {
        let signInPromise = await signIn("credentials", {
            new: true,
            username: username.current,
            email: email.current,
            password: password.current,
            redirect: false
        });

        if (signInPromise?.ok) {
            router.push(`${process.env.NEXT_PUBLIC_URL}user`);
        } else {

        }

    }

    return (


        <Tabs defaultValue={defaultRoute} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                            Login to your AITM account here.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" onChange={(e) => {
                                username.current = e.target.value;
                            }} placeholder="enter your email here"/>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" onChange={(e) => {
                                password.current = e.target.value;
                            }} type="password" placeholder="enter your password here"/>
                            <span
                                className={`text-sm text-red-600 ${unAuthorized}`}>Authentication Error</span>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                        <Button className="w-full" onClick={()=>{submit()}}>Login</Button>
                        <span>OR</span>
                        <span className="flex gap-2 md:flex-row flex-col">
                                    <Button onClick={()=>{submit("google")}} className="flex gap-2 items-center hover:bg-red-500">
                                        <FontAwesomeIcon icon={faGoogle}/>
                                        <span>Login with Google</span>
                                    </Button>
                                    <Button className="flex gap-2 items-center hover:bg-gray-600">
                                        <FontAwesomeIcon icon={faGithub}/>
                                        <span>Login with GitHub</span>
                                    </Button>
                                </span>

                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="register">
                <Card>
                    <CardHeader>
                        <CardTitle>Register</CardTitle>
                        <CardDescription>
                            Create your AITM account here.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" onChange={(e) => {
                                username.current = e.target.value;
                            }} placeholder="enter your username here"/>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" onChange={(e) => {
                                email.current = e.target.value;
                            }} placeholder="enter your email here"/>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" onChange={(e) => {
                                password.current = e.target.value;
                            }} type="password" placeholder="enter your password here"/>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                        <Button onClick={registerSubmit} className="w-full">Register</Button>
                        <span>OR</span>
                        <span className="flex gap-2 md:flex-row flex-col">
                                    <Button onClick={()=>{submit("google")}} className="flex gap-2 items-center hover:bg-red-500">
                                        <FontAwesomeIcon icon={faGoogle}/>
                                        <span>Register with Google</span>
                                    </Button>
                                    <Button className="flex gap-2 items-center hover:bg-gray-600">
                                        <FontAwesomeIcon icon={faGithub}/>
                                        <span>Register with GitHub</span>
                                    </Button>
                                </span>

                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    );
}