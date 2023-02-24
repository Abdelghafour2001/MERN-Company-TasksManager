import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllBusinessShifts } from '../../features/shift/shiftSlice';
import { searchTaskLists } from '../../features/task/taskSlice';
import { CalenderHeader, OpenShift, UserShift, CalenderFooter, AcceptedShift, TaskList } from '../';
import './styles/Scheduler.css';

const Scheduler = () => {
    const [taskLists, setTaskLists] = useState({
        index: null,
        items: []
    });
    const calenderRef = useRef(null);
    const dispatch = useDispatch();
    const { id } = useParams();
    const { isLoading } = useSelector(state => state.shift);
    
    const startDate = new Date(useSelector(state => state.local.time.startDate));
    const fromDate = useSelector(state => state.local.time.fromDate);
    const toDate = useSelector(state => state.local.time.toDate);
    const dateControl = useSelector(state => state.local.time.dateControl);

    useEffect(() => {
        const data = `?business=${id}`;
        dispatch(searchTaskLists(data));
    }, []);

    useEffect(() => {
        if (id && fromDate && toDate) {
            const  data = {
                business: id,
                fromDate: dateControl === 'day' 
                    ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
                        : fromDate,
                toDate: dateControl === 'day' 
                    ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+1)
                        : toDate,
            }
            dispatch(getAllBusinessShifts(data));
        }
    }, [toDate])

    return (
        <>
        {!isLoading && fromDate && toDate && id ? (
        <>
            <div className={`calender-body${
                dateControl === 'day' ? 
                    ' calender-body-day'
                : ''}`}>
                <div
                    ref={calenderRef}
                    className="scheduler-wrapper"
                >
                    {fromDate && (
                        <CalenderHeader />
                    )}
                    <div className="section-container">
                        <OpenShift />
                        <AcceptedShift />
                        <UserShift />
                        <CalenderFooter taskList={taskLists} setTaskLists={setTaskLists} />
                    </div>
                </div>
            </div>

            { taskLists.items.length > 0 && (
                <div className="py-1">
                    {taskLists.items.map(taskList => (
                        <TaskList key={`tasklists-footer-${taskList._id}`} taskList={taskList} />
                    ))}
                </div>
            )}
        </>
        ) : (
            <div className="calender-body blink">
            </div>
        )}
        </>
    )
}

export default Scheduler;