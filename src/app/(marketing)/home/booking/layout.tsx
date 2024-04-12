import AboutTicket from "@/components/AboutTicket/AboutTicket";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-[100%] pb-[50px] bg-[#fff]">
            <div className="w-[100%]">{children}</div>
            <br />
            <AboutTicket />
        </div>
    );
}
