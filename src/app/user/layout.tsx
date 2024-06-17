import "../globals.css";
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import SideBarResponsive from "@/components/SideBarResponsive";
import AuthContext from "@/components/AuthContext";

config.autoAddCss = false


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (

        <div className="w-full h-full flex md:flex-row flex-col-reverse gap-2">
            <div className="flex justify-center items-center md:w-[10%] md:h-full w-full h-[60px] md:static z-10 fixed bottom-0 ">
                <SideBarResponsive></SideBarResponsive>
            </div>

            {children}


        </div>
    );
}
