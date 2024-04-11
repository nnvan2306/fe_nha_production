"use client";

import { getAllSeasonAction } from "@/action/seasonAction";
import NoteRating from "@/components/NoteRating/NoteRating";
import { IList } from "@/utils/interface";
import { Col, Row } from "antd";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PageTableRating = ({ children }: { children: React.ReactNode }) => {
    const [listSeason, setListSeason] = useState<IList[]>([]);
    const [seasonId, setSeasonId] = useState<number>(0);

    const router: AppRouterInstance = useRouter();

    useEffect(() => {
        const fetch = async () => {
            const res = await getAllSeasonAction();
            if (res.errorCode === 0) {
                setListSeason(
                    res?.data.map((item) => {
                        return {
                            value: item?.id,
                            label: item?.name,
                        };
                    })
                );
                setSeasonId(res?.data[0]?.id);
                handleChangeSeason(res?.data[0]?.id);
            }
        };
        fetch();
    }, []);

    const handleChangeSeason = (id: number) => {
        setSeasonId(id);
        router.push(`/home/rating/${id}`);
    };

    return (
        <div className="w-[70%] ml-[50%] translate-x-[-50%]">
            <div className="w-[100%] mt-[20px]">
                <select
                    className="w-[20%] py-[10px] px-[15px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-md"
                    value={seasonId}
                    onChange={(e) => handleChangeSeason(+e.target.value)}
                >
                    <option value={0}>Choose season</option>
                    {listSeason &&
                        listSeason.length > 0 &&
                        listSeason.map((item: IList, index: number) => {
                            return (
                                <option key={index} value={item.value}>
                                    {item.label}
                                </option>
                            );
                        })}
                </select>
            </div>

            <div className="">{children}</div>

            <NoteRating />
        </div>
    );
};

export default PageTableRating;
