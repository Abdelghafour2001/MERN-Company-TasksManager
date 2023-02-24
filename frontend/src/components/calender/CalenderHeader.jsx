import { useDispatch, useSelector } from "react-redux";
import { setDateControl, setStartDate } from '../../features/local/localSlice';
import { hours } from "../../constance/localData";

const CalenderHeader = () => {
    const dispatch = useDispatch();
    const fromDate = new Date (useSelector(state => state.local.time.fromDate));
    const dateControl = useSelector(state => state.local.time.dateControl);

    return (
        <div className="section-container calender-timestamp header-row">
            <div className="section-row flex">
                <div className="section-title flex">
                    <div className="section-content w-100 flex align-between">
                        <div>
                            EMPLOYEE
                        </div>
                    </div>
                </div>
                {[...Array(
                    dateControl === "week" ?
                        7 
                    : dateControl === "2week" ?
                        14
                    : dateControl === "4week" ?
                        28
                    : 24
                ).keys()].map((i) => {
                    return (
                    <div key={`header-row-${i}`} className="col section-holder">
                        <div className="flex align-between w-100 h-100">
                            <div 
                                className={`shift w-100 h-100${
                                    dateControl !== 'day' &&
                                    new Date().setHours(0,0,0,0) === new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()+i).setHours(0,0,0,0) ?
                                        ' today'
                                    : ''
                                }`}
                                onClick={() => {
                                    if(dateControl !== 'day') {
                                        dispatch(setStartDate(
                                            new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()+i).toLocaleString("en-US")
                                            ));
                                        dispatch(setDateControl('day'));
                                    }
                                }}
                            >
                                { dateControl === "day" ?
                                    <div className="hours flex align-center w-100 h-100">
                                        { hours[i] }
                                    </div>
                                :
                                    <div className="flex align-between w-100 h-100">
                                        <div>
                                            { new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()+i).toLocaleString('en-us', {  weekday: 'short' }) }
                                        </div>
                                        <div>
                                            { new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()+i).toLocaleString('en-us', {  month: 'short', day: 'numeric' })}
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CalenderHeader