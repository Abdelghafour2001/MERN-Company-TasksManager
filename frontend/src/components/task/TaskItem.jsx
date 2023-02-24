import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskList, createTask, deleteTask } from '../../features/task/taskSlice';
import { closeIcon, checkMarkIcon } from '../../constance/icons';
import { useEffect, useState } from 'react';

const TaskItem = ({ taskList, taskItem, date }) => {
    const dispatch = useDispatch();
    const location = useLocation().pathname.split('/')[1];
    const completedTasks = useSelector(state => state.task.completedTasks);
    const [completesTask, setCompletesTask] = useState(null);

    useEffect(() => {
        const task = completedTasks.filter(task => 
            ((task.business === taskList.businesses[0]._id) &&
            (task.taskList === taskList._id )&&
            (task.completedDate.split('T')[0] === date.toISOString().split('T')[0]) &&
            (task.taskItem === taskItem._id))
        )[0] || null;
        setCompletesTask(task);
    }, [completedTasks])

    return (
        <div className={`task-item${
            completesTask ? ' completed' : ''
        }`}>
            <div className="flex align-between">
                <div className="task-info mr-1">
                    <h3 className="title-4">{taskItem.title}</h3>
                    {taskItem.description && (
                        <p>{taskItem.description}</p>
                    )}
                    {completesTask && (
                        <small>
                            Completed by {completesTask.completedBy.firstName} {completesTask.completedBy.lastName}
                        </small>
                    )}
                </div>
                {location === 'dashboard' ? (
                    <button 
                        className="btn-icon btn-icon-danger"
                        title="Delete Task Item from Task List"
                        onClick={() => 
                            dispatch(updateTaskList({
                                _id: taskList._id,
                                taskItemId: taskItem._id,
                                action: 'removeTaskItem',
                            }))
                        }
                    >
                        {closeIcon}
                    </button>
                ) : location === 'user' && (
                    completesTask ? (
                        <button 
                            className="btn-icon btn-icon-danger"
                            title="Delete Completed Task"
                            onClick={() =>{
                                    dispatch(deleteTask(
                                        completesTask._id
                                    ))
                                }
                            }
                        >
                            {closeIcon}
                        </button>
                    ) : (
                        <button 
                            className="btn-icon btn-icon-primary"
                            title="Mark Task as Completed"
                            onClick={() => 
                                dispatch(createTask({
                                    taskListId: taskList._id,
                                    taskItem: taskItem._id,
                                    completedDate: date.toISOString().split('T')[0],
                                    business: taskList.businesses[0]._id,
                                }))}
                        >
                            {checkMarkIcon}
                        </button>
                    )
                )}
            </div>
        </div>
    )
}

export default TaskItem