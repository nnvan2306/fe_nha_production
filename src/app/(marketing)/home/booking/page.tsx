import { getNearestCalendarAction } from "@/action/calendarAction";
import { getAllTeamAction } from "@/action/teamAction";
import PageListCalendar from "@/components/Booking/PageListCalendar";
import { Suspense } from "react";

export async function HandleData() {
    const res = await getAllTeamAction();
    const resDefaultCalendar = await getNearestCalendarAction();

    if (res.errorCode === 0 && resDefaultCalendar.errorCode === 0) {
        return (
            <PageListCalendar
                listTeam={res.data}
                listCalendarDefault={resDefaultCalendar.data}
            />
        );
    }
}

export default async function PageCalendar() {
    return (
        <div>
            <Suspense fallback={<div>Loading.....</div>}>
                <div>
                    <HandleData />
                </div>
            </Suspense>
        </div>
    );
}
