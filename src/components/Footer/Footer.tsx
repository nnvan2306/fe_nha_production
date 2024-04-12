import React from "react";

export default function Footer() {
    return (
        <div className="w-[100%] bg-[#424242] p-[50px]">
            <div className="w-[80%] ml-[50%] translate-x-[-50%] flex justify-around ">
                <ul className="text-[#fff]">
                    <li className="text-[20px] font-[700] text-[#fff]">
                        Language
                    </li>
                    <li className="mt-[10px] text-[#fff]">JavaScript</li>
                    <li>TypeScript</li>
                    <li>Java</li>
                    <li>C++</li>
                    <li>Html</li>
                    <li>Css</li>
                </ul>

                <ul className="text-[#fff]">
                    <li className="text-[20px] font-[700] text-[#fff]">
                        Framework
                    </li>
                    <li className="mt-[10px] text-[#fff]">ReactJs</li>
                    <li>NextJs</li>
                    <li>NodeJs</li>
                    <li>ExpressJs</li>
                </ul>

                <ul className="text-[#fff]">
                    <li className="text-[20px] font-[700] text-[#fff]">More</li>
                    <li className="mt-[10px] text-[#fff]">Ant Design</li>
                    <li>TailwindCss</li>
                    <li>Bootstrap 5</li>
                    <li>Redux</li>
                </ul>
            </div>
        </div>
    );
}
