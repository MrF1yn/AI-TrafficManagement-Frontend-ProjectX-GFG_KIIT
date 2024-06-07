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
import ImageUpload from "@/components/image-upload";
import {TabsSelector} from "@/components/TabsSelector";


const goldman = Goldman({
    weight: '400',
    subsets: ['latin']
})

export default function Login() {
    return (
        <main
            className={`p-5 w-full h-full gap-6 flex flex-col justify-center items-center text-white ${goldman.className}`}>
            <ImageUpload/>
            <Button className="ml-auto text-xl p-6 hover:bg-blue-500" >Start Analysis</Button>
        </main>
    );
}
