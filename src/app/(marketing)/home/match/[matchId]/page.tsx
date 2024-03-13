import { memo } from "react";

const PageMatchDetail = ({
    params: matchId,
}: {
    params: { matchId: number };
}) => {
    return <div className="">match detail</div>;
};

export default memo(PageMatchDetail);
