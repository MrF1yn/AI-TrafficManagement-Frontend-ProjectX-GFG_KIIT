import Image from "next/image";
import {Goldman} from "next/font/google";
const goldman = Goldman({
    weight: '400',
    subsets: ['latin']
})

export default function FeaturesCard({url, title, description}: any){
    return (
        <div className="bg-card_background w-full h-full rounded-2xl flex items-center p-4 gap-4">
            <Image
                src={url}
                width={500}
                height={500}
                className="md:h-full md:w-[150px] h-full w-[80px] object-cover"
                alt="Picture of the author"
            />
            <span className={`w-full h-full ${goldman.className} flex flex-col justify-center gap-2`}>
                                <span className="w-full text-left md:text-4xl text-lg">
                                    {title}
                                </span>
                                <span className="w-full text-left md:text-sm text-xs">
                                   {description}
                                </span>
                            </span>
        </div>
    )
}