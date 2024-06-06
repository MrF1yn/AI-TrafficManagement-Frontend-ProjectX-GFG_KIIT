import Image from "next/image";
import {Goldman} from "next/font/google";
import FeaturesCard from "@/components/FeaturesCard";
import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {faGithub, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const goldman = Goldman({
    weight: '400',
    subsets: ['latin']
})

export default function Login() {
    return (
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
                <Tabs defaultValue="login" className="w-full">
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
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" placeholder="enter your email here"/>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" placeholder="enter your password here"/>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-2">
                                <Button className="w-full">Login</Button>
                                <span>OR</span>
                                <span className="flex gap-2 md:flex-row flex-col">
                                    <Button className="flex gap-2 items-center hover:bg-red-500">
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
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" placeholder="enter your email here"/>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" placeholder="enter your password here"/>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-2">
                                <Button className="w-full">Login</Button>
                                <span>OR</span>
                                <span className="flex gap-2 md:flex-row flex-col">
                                    <Button className="flex gap-2 items-center hover:bg-red-500">
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
            </div>
        </main>
    );
}
