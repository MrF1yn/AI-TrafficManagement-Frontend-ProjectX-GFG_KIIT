import Image from "next/image";
import {Goldman} from "next/font/google";
import FeaturesCard from "@/components/FeaturesCard";

const goldman = Goldman({
    weight: '400',
    subsets: ['latin']
})

export default function Login() {
    return (
        <main
            className={`p-5 w-full h-full gap-2 bg-black flex flex-col justify-center items-center text-white ${goldman.className}`}>
            <div className="w-full h-[40%] flex flex-col justify-center items-center text-center">
                <span className="md:text-6xl text-3xl">LOGIN</span>
                <br/>
                <span className="md:text-4xl text-xl">Intelligent Solutions For Efficient Traffic Control</span>
            </div>
            <div className="w-full h-[60%] flex flex-col items-center">
                <span className="md:text-4xl text-xl text-red-600 text-center">Features</span>
                <div className="w-full h-full flex gap-2 p-2 md:flex-row flex-col">
                    <div className="w-full h-full flex flex-col gap-2">
                        <FeaturesCard
                            url = "https://camo.githubusercontent.com/6e8b34277986d6e2ce4ba1b13d92b36c4c46c0cbe9ed2053ff86089ebc87ec62/68747470733a2f2f696d616765732e73717561726573706163652d63646e2e636f6d2f636f6e74656e742f76312f3533663738643062653462303661613262666332643864612f313435303230343036363534342d4355524438513459394a35464e4748434d4342502f6b6531375a77644742546f6464493870446d34386b4438437541495a6b71394e38686230695f33584c765955717378525571716272316d4f4a594b66495052374c6f4451396d58504f6a6f4a6f71793831533249384e5f4e34563176556235416f494949624c5a68565978435257344250753130537433544241555159564b633839414a5577456a583844514c6949684f7356666b5057457049716e782d736b78335a563032555f6b44376f33303142422d68593365712d344c4134684f6a562f54565f5765625f323031355f486f6d655f706c616365686f6c64657234612e706e673f666f726d61743d3135303077"
                            title = "Real-time Traffic Monitoring"
                            description = "Monitor traffic conditions instantly to make informed decisions"
                        />
                        <FeaturesCard
                            url = "https://camo.githubusercontent.com/6e8b34277986d6e2ce4ba1b13d92b36c4c46c0cbe9ed2053ff86089ebc87ec62/68747470733a2f2f696d616765732e73717561726573706163652d63646e2e636f6d2f636f6e74656e742f76312f3533663738643062653462303661613262666332643864612f313435303230343036363534342d4355524438513459394a35464e4748434d4342502f6b6531375a77644742546f6464493870446d34386b4438437541495a6b71394e38686230695f33584c765955717378525571716272316d4f4a594b66495052374c6f4451396d58504f6a6f4a6f71793831533249384e5f4e34563176556235416f494949624c5a68565978435257344250753130537433544241555159564b633839414a5577456a583844514c6949684f7356666b5057457049716e782d736b78335a563032555f6b44376f33303142422d68593365712d344c4134684f6a562f54565f5765625f323031355f486f6d655f706c616365686f6c64657234612e706e673f666f726d61743d3135303077"
                            title = "Real-time Traffic Monitoring"
                            description = "Monitor traffic conditions instantly to make informed decisions"
                        />
                    </div>
                    <div className="w-full h-full flex flex-col gap-2">
                        <FeaturesCard
                            url = "https://camo.githubusercontent.com/6e8b34277986d6e2ce4ba1b13d92b36c4c46c0cbe9ed2053ff86089ebc87ec62/68747470733a2f2f696d616765732e73717561726573706163652d63646e2e636f6d2f636f6e74656e742f76312f3533663738643062653462303661613262666332643864612f313435303230343036363534342d4355524438513459394a35464e4748434d4342502f6b6531375a77644742546f6464493870446d34386b4438437541495a6b71394e38686230695f33584c765955717378525571716272316d4f4a594b66495052374c6f4451396d58504f6a6f4a6f71793831533249384e5f4e34563176556235416f494949624c5a68565978435257344250753130537433544241555159564b633839414a5577456a583844514c6949684f7356666b5057457049716e782d736b78335a563032555f6b44376f33303142422d68593365712d344c4134684f6a562f54565f5765625f323031355f486f6d655f706c616365686f6c64657234612e706e673f666f726d61743d3135303077"
                            title = "Real-time Traffic Monitoring"
                            description = "Monitor traffic conditions instantly to make informed decisions"
                        />
                        <FeaturesCard
                            url = "https://camo.githubusercontent.com/6e8b34277986d6e2ce4ba1b13d92b36c4c46c0cbe9ed2053ff86089ebc87ec62/68747470733a2f2f696d616765732e73717561726573706163652d63646e2e636f6d2f636f6e74656e742f76312f3533663738643062653462303661613262666332643864612f313435303230343036363534342d4355524438513459394a35464e4748434d4342502f6b6531375a77644742546f6464493870446d34386b4438437541495a6b71394e38686230695f33584c765955717378525571716272316d4f4a594b66495052374c6f4451396d58504f6a6f4a6f71793831533249384e5f4e34563176556235416f494949624c5a68565978435257344250753130537433544241555159564b633839414a5577456a583844514c6949684f7356666b5057457049716e782d736b78335a563032555f6b44376f33303142422d68593365712d344c4134684f6a562f54565f5765625f323031355f486f6d655f706c616365686f6c64657234612e706e673f666f726d61743d3135303077"
                            title = "Real-time Traffic Monitoring"
                            description = "Monitor traffic conditions instantly to make informed decisions"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
