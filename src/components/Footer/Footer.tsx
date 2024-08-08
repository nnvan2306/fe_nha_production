import React from "react";

export default function Footer() {
    return (
        <div className="w-[100%] bg-[#424242] md:p-[50px] pt-[20px]">
            <div className="md:w-[80%] w-[100%] md:ml-[50%] md:translate-x-[-50%] flex justify-around">
                <ul className="text-[#fff] px-[5px]">
                    <li className="md:text-[20px] text-[18px] font-[700] text-[#fff] text-center">
                        Language
                    </li>
                    <li className="mt-[10px] text-[#fff]">JavaScript</li>
                    <li>TypeScript</li>
                    <li>SQL</li>
                    <li>C++</li>
                </ul>

                <ul className="text-[#fff] px-[5px]">
                    <li className="md:text-[20px] text-[18px] font-[700] text-[#fff]">
                        Technology
                    </li>
                    <li className="mt-[10px] text-[#fff]">React</li>
                    <li>NextJs</li>
                    <li>NodeJs</li>
                    <li>Express</li>
                    <li>NestJs</li>
                </ul>

                <ul className="text-[#fff] px-[5px]">
                    <li className="md:text-[20px] text-[18px] font-[700] text-[#fff]">
                        Other
                    </li>
                    <li className="mt-[10px] text-[#fff]">Html</li>
                    <li>Css</li>
                    <li>Sass</li>
                    <li>Redux</li>
                    <li>Ant Design</li>
                    <li>TailwindCss</li>
                    <li>Bootstrap</li>
                    <li>Git</li>
                </ul>
            </div>
        </div>
    );
}
