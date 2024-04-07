export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-[80%] ml-[50%] translate-x-[-50%] flex justify-center">
            <div className="w-[75%]">{children}</div>
            <div className="w-[300px] h-[300px] bg-[#000]"></div>
        </div>
    );
}
