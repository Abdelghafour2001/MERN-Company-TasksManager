import { useSelector } from 'react-redux';
import {ShiftsList} from '../';

const WeekShift = ({employee, acceptedShifts}) => {
    const dateControl = useSelector(state => state.local.time.dateControl);

    return (
        <div className="flex">
            {[...Array(
                dateControl === "week" ?
                    7 
                : dateControl === "2week" ?
                    14
                :
                    28
            ).keys()].map((i) => { // loop for each day
                return (
                    <ShiftsList
                        employee={employee}
                        key={`open-shift-day-${i}`}
                        acceptedShifts={acceptedShifts}
                        i={i}
                    />
                )
            })}
        </div>
    )
}


export default WeekShift