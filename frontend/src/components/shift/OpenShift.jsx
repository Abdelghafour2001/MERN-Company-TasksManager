import { useSelector } from 'react-redux';
import { countTotalHours } from '../../constance/helpers'; 
import { DayShift, WeekShift } from '../';
import { timeIcon } from '../../constance/icons';

const OpenShift = () => {
    const shifts = useSelector(state => state.shift.shifts);
    const startDate = new Date (useSelector(state => state.local.time.startDate));
    const fromDate = new Date (useSelector(state => state.local.time.fromDate));
    const toDate = new Date (useSelector(state => state.local.time.toDate));
    const dateControl = useSelector(state => state.local.time.dateControl);

    return (
        <div className="section-row flex open-shift user-row">
            <div className="section-title flex align-center">
                <div className="section-content flex align-between">
                    <div className="flex align-center">
                        <div className="section-img">
                        </div>
                        <div className="section-details">
                            <div className="section-name">
                                Open Shift
                            </div>
                            <div className="section-hours">
                                <div className="flex align-center">
                                    {timeIcon}
                                    {shifts && (
                                        countTotalHours(null, shifts, dateControl === 'day' ? startDate : null, fromDate, toDate)
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {shifts && (
                dateControl != "day" ?
                    <WeekShift/>
                :
                    <DayShift/>
            )}
        </div>
    )
}

export default OpenShift