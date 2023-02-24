import { useSelector } from 'react-redux';
import { countTotalHours } from '../../constance/helpers';
import { DayShift, WeekShift } from '../';
import { timeIcon } from '../../constance/icons';

const UserShift = () => {
    const { shifts, employees } = useSelector(state => state.shift);
    const startDate = new Date (useSelector(state => state.local.time.startDate));
    const fromDate = new Date (useSelector(state => state.local.time.fromDate));
    const toDate = new Date (useSelector(state => state.local.time.toDate));
    const dateControl = useSelector(state => state.local.time.dateControl);

    return (
        <>
        {employees && employees.filter(a => !a.isOwner).map((employee, i) => {
            return (
            <div key={`uid-${employee._id}`} id={`uid-${employee._id}`} className="section-row user-row flex">
                <div className="section-title flex align-center">
                    <div className="section-content w-100 flex align-between">
                        <div className="flex align-center h-100">
                            <div className="section-img flex align-center">
                                    { employee.profilePicture ? 
                                        <img src={employee.profilePicture} alt={employee.firstName} /> 
                                    : 
                                        <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="user" />
                                    }
                            </div>
                            <div className="section-details">
                                <div className="section-name">
                                    {employee.lastName}
                                </div>
                                <div className="section-hours">
                                    <div>
                                        {employee.position}
                                    </div>
                                    <div className="flex align-center">
                                        {timeIcon}
                                        {countTotalHours(employee, shifts, dateControl === 'day' ? startDate : null, fromDate, toDate)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {shifts && (
                    dateControl != "day" ?
                        <WeekShift
                            employee={employee}
                        />
                    :
                        <DayShift
                            employee={employee}
                        />
                )}
            </div>
            )
        })}
        </>
    )
}

export default UserShift