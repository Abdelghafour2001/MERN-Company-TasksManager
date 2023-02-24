import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import { editShift } from '../../features/shift/shiftSlice';
import { Shift, CreateShift, ManagerProtect } from '../';

const ShiftsList = ({i, employee, acceptedShifts}) => {
    const fromDate = new Date (useSelector(state => state.local.time.fromDate));
    const shiftsSelector = useSelector(state => state.shift.shifts).filter(shift => 
        ((employee && (
            employee._id === shift.employee || 
            employee._id === shift?.employee?._id ||
            (employee.user && (employee.user === shift?.acceptedBy?._id))
            )) || // for employee from thee loop
        (!employee && shift.employee === null && !shift.acceptedBy)) // for open shift from the loop
    );

    const shifts = acceptedShifts ? acceptedShifts : shiftsSelector;

    const dispatch = useDispatch();

    const [{ isOver }, drop] = useDrop({
        accept: 'shift',
        drop: (item) => {
            // get element of box where shift is dropped
            const element = document.getElementsByClassName('over')[0];
            moveShift(item, element)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver()
        }),
    });

    const moveShift = (item, element) => {
        const newDate = element.id.split('-id-')[0];
        const id = element.id.split('-id-')[1];
        const data = {
            id: item.shift._id,
            date: new Date (newDate),
            employee: id === 'openShift' ? null : id,
        }
        // if(new Date(newDate).setHours(0,0,0,0) !== new Date(item.shift.date).setHours(0,0,0,0)){
            dispatch(editShift(data))
        // }
    }

    return (
        <div 
            key={`open-shift-day-${i}`}
            id={ 
                `${new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()+i).getFullYear()}-${new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()+i).getMonth()+1}-${new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()+i).getDate()}-id-${employee ? employee._id : 'openShift'}`
                }
            className={`col section-holder ${isOver ? 'over' : ''}`}
            ref={!acceptedShifts ? drop : null}
            style={{
                opacity: isOver ? 0.5 : 1,
                background: isOver ? 'var(--color-secondary)' : '',
            }}>
            { shifts && shifts.map((shift, e) => {
                return (
                    (new Date(shift.date).toLocaleString('en-us', { year: 'numeric', day: 'numeric', month: 'numeric' })) === 
                    (new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()+i)).toLocaleString('en-us', { year: 'numeric', day: 'numeric', month: 'numeric' }) &&
                    <Shift
                        key={`shift-row-${e}`}
                        shift={shift}
                        employee={employee}
                        acceptedShifts={acceptedShifts}
                    />
                )
            })}
            {!acceptedShifts && (
                <ManagerProtect>
                    <CreateShift 
                        date={new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()+i)}
                        employee={employee}
                    />
                </ManagerProtect>
            )}
        </div>
    )
}

export default ShiftsList;