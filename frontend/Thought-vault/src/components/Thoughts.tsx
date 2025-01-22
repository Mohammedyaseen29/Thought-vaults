
import Space from "./Subcomponents/Space";
import Sidebar from "./ui/sidebar";

    export default function Thoughts() {
    return (
        <div className="bg-[#0B0C12] min-h-screen flex text-white">
            <Sidebar/>
            <div className="ml-64 w-screen">
                <Space/>
            </div>
        </div>
    )
}
