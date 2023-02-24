import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, EditTaskList, AddTask, TaskItem } from '../';
import { getAllTasksForList } from '../../features/task/taskSlice';
import './styles/TaskList.css';

const TaskList = ({taskList}) => {
    const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
    const [isOpenn, setIsOpen] = useState(false);
    const location = useLocation().pathname.split('/')[1];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTasksForList({
            date: date.toISOString().split('T')[0],
            business: taskList.businesses[0]._id,
            taskList: taskList._id
        }));
    }, [dispatch, taskList._id, date]);



    return (
        <div className="task-list">
            <Card
                title={taskList.title}
                isOpen={isOpenn}
                setIsOpen={setIsOpen}
                titleStyle={{
                    borderLeft: `5px solid ${taskList.color}`,
                }}
            >
                {location === 'dashboard' ? (
                    <div className="flex align-between mx-1">
                        <EditTaskList taskList={taskList} />
                        <AddTask taskList={taskList}/>
                    </div>
                ) : location === 'user' && (
                    <div className="flex align-between mx-1">
                        <div className="title-3">
                            {date.toUTCString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).split('00:00:00')[0].split('04:00:00')[0]}
                        </div>
                        <div className="form-groud">
                            <input 
                                type="date"
                                value={date.toISOString().split('T')[0]}
                                onChange={(e) => {e.target.value.length > 0 && setDate(new Date(e.target.value));}}
                            />
                        </div>
                    </div>
                )}
                <div className="task-list-content mt-1">
                    <div className="task-list-description">
                        <div className="task-list-description-top flex align-between">
                            <div className="task-list-detail title-3 flex flex-column text-headline">
                                {taskList.businesses.map(business => (
                                    <span key={business._id}>{business.name} </span>
                                ))}
                            </div>
                            <div className="task-list-detail title-2">
                                {taskList.frequency}
                            </div>
                        </div>
                        <div className="task-list-description-bottom flex align-between">
                            <div className="task-list-detail mr-1">
                                <small className="text-secondary">
                                    {taskList.positions.join(', ')}
                                </small>
                            </div>
                            <div className="task-list-detail ml-1 text-end">
                            {taskList.repeat && taskList.repeat.length > 0 && (
                                <small className="text-secondary">
                                    ({taskList.repeat.join(', ')})
                                </small>
                            )}
                            </div>
                        </div>
                    </div>
                    <div className="task-items px-1">
                        {taskList.taskItems.map((task, index) => (
                            <TaskItem 
                                key={task._id} 
                                taskList={taskList} 
                                taskItem={task} 
                                date={date}
                            />
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default TaskList