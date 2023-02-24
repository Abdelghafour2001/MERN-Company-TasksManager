import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompanyTaskLists, getAllUserTaskLists } from '../features/task/taskSlice';
import { TaskList, CreateTaskList, Card } from "../components";
import './styles/TaskPage.css'

const Task = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isOpen2, setIsOpen2] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation().pathname.split('/')[1];
    const { taskLists, isLoading } = useSelector(state => state.task);
    const todayLists = taskLists && taskLists.filter(taskList => (
        taskList.frequency === "weekly" && taskList.repeat.includes(new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()) ||
        taskList.frequency === "monthly" && taskList.repeat.includes((new Date().toLocaleDateString('en-US', { day: 'numeric' }))) ||
        taskList.frequency === "daily"
    ))


    useEffect(() => {
        if(location === 'dashboard') {
            dispatch(getAllCompanyTaskLists());
        } else if (location === 'user') {
            dispatch(getAllUserTaskLists());
        }
    }, [dispatch]);

    return (
        <section className="task-page">
            {location === 'dashboard' && (
                <CreateTaskList />
            )}
            {!isLoading ?
                <>
                {location === 'user' &&
                <>
                    <div className="p-1 mb-1 border-bottom">
                        <h5 className="title-2 text-headline">
                            Today's Task Lists
                        </h5>
                    </div>
                    {todayLists?.length > 0 ? (
                        todayLists?.map((taskList, index) => (
                            <TaskList key={`${taskList._id}-${index}`} taskList={taskList} />
                        ))
                    ) : 
                        <p className="px-1 mb-1 pb-1">No task lists for today.</p>
                    }
                </>
                }
                <>
                    <div className="p-1 mb-1 border-bottom">
                    </div>
                    {taskLists && taskLists
                    ?.map((taskList, index) => (
                        <TaskList key={`${taskList._id}-${index}`} taskList={taskList} />
                    ))}
                    {!isLoading && taskLists?.length === 0 && (
                        <p className="px-1 mb-1 pb-1">No task lists were found</p>
                    )}
                </>
                </>
                : <Card title={'Loading Task Lists...'} isOpen={false} className={'blink'} />
            }
        </section>
    )
}

export default Task