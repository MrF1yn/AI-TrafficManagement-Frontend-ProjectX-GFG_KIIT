import SideBarButton from "@/components/SideBarButton";
import {faCompass, faGauge, faLifeRing, faSignal} from "@fortawesome/free-solid-svg-icons";

export default function SideBarResponsive(){
    return (
        <div className=" md:h-[90%] md:w-[80px] w-full h-full bg-white rounded-2xl flex md:flex-col flex-row justify-around">
            <SideBarButton icon={faGauge} tooltip="Dashboard" route="/user" />
            <SideBarButton icon={faSignal} tooltip="Results" route="/user/results" />
            <SideBarButton icon={faCompass} tooltip="Navigation" route="/navigation" />
            <SideBarButton icon={faLifeRing} tooltip="Support" route="/support" />
        </div>
    )
}