import { useSelector } from "react-redux";
import { countAsignedTotalHours } from '../../constance/helpers'; 
import { DayShift, WeekShift } from '../';
import { timeIcon } from '../../constance/icons';

const AcceptedShift = () => {
    const startDate = new Date (useSelector(state => state.local.time.startDate));
    const fromDate = new Date (useSelector(state => state.local.time.fromDate));
    const toDate = new Date (useSelector(state => state.local.time.toDate));
    const dateControl = useSelector(state => state.local.time.dateControl);

    const employeesUID = useSelector(state => state.shift.employees)?.map(e => e.user);
    const weekShifts = useSelector(state => state.shift.shifts)?.filter(shift =>
        shift.acceptedBy && !shift.employee &&
        !employeesUID.includes(shift.acceptedBy._id)
    );

    return (
        <>
        {weekShifts && weekShifts.length > 0 && (
        <div className="section-row flex accepted-shift user-row">
            <div className="section-title flex align-center">
                <div className="section-content flex align-between">
                    <div className="flex align-center">
                        <div className="section-img">
                        </div>
                        <div className="section-details">
                            <div className="section-name">
                                Picked Up Shift
                            </div>
                            <div className="section-hours">
                                <div className="flex align-center">
                                    {timeIcon}
                                    {countAsignedTotalHours(weekShifts, dateControl === 'day' ? startDate : null, fromDate, toDate)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                {dateControl !== "day" ?
                    <WeekShift
                        acceptedShifts={weekShifts}
                    />
                :
                    <DayShift
                        acceptedShifts={weekShifts}
                    />
                }
        </div>
        )}
        </>
    )
}

export default AcceptedShift