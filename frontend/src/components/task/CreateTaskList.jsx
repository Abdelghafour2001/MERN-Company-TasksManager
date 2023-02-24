import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "../";
import Select from 'react-select';
import { toast } from "react-toastify";
import { createTaskList } from "../../features/task/taskSlice";
import { customSelectModalStyles, weekDaySelectOptions } from '../../constance/localData';
import './styles/CreateTaskList.css';
import { closeIcon } from "../../constance/icons";

const CreateTaskList = () => {
    const dispatch = useDispatch();
    const { company } = useSelector(state => state.company);
    const [isOpen, setIsOpen] = useState(false);
    const [taskItemCount, setTaskItemCount] = useState(1);
    const [taskList, setTaskList] = useState({
        title: '',
        frequency: '',
        repeat: [],
        businesses: [],
        positions: [],
    });
    const [taskItems, setTaskItems] = useState([{
        title: '',
        description: '',
    }]);

    const businessSelect = company?.businesses.map(business => ({
        value: business._id,
        label: business.name
    }));

    const frequencySelect = [
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' },
    ];

    const positionsSelect = []
    const positionsFilter = company
    ?.businesses?.map(business => business?.positions
        ?.map((position, index) => {
            if(positionsSelect.find(item => item.value === position.title)) {
                return null;
            } else {
                positionsSelect.push({
                    value: position.title,
                    label: position.title
                })
            }
        }))

    const onChange = e => {
        setTaskList({
            ...taskList,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = () => {
        if(
            taskList.title !== '' && 
            taskList.frequency !== '' &&
            taskList.businesses.length > 0 &&
            taskList.positions.length > 0 &&
            (
                ((taskList.frequency.value === 'weekly' || taskList.frequency.value === 'weekly') && taskList.repeat.length > 0 ) ||
                taskList.frequency.value === 'daily'
            )
        ) {
            const taskListData = {
                title: taskList.title,
                frequency: taskList.frequency.value,
                company: company._id,
                repeat: taskList.repeat.map(item => item.value),
                businesses: taskList.businesses.map(item => item.value),
                positions: taskList.positions.map(item => item.value),
                taskItems: taskItems
            }

            dispatch(createTaskList(taskListData));
        } else {
            toast.error('Please fill all fields');
        }
    }

    return (
        <Card
            title={'Create Task List'}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <div className="create-task-list-container">
                <div className="create-task-list-title">
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Title *</label>
                            <input 
                                type="text" 
                                name="title"
                                placeholder="Task List Title"
                                value={taskList.title}
                                onChange={onChange}
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group">
                            <label>Frequency *</label>
                            <Select
                                styles={customSelectModalStyles}
                                options={frequencySelect}
                                value={taskList.frequency}
                                onChange={e => setTaskList({ ...taskList, repeat: [], frequency: e })}
                            />
                        </div>
                    </div>
                    {(taskList.frequency.value === 'weekly' || taskList.frequency.value === 'monthly') && (
                        <div className="form-group">
                            <label>Repeat On *</label>
                            <Select
                                styles={customSelectModalStyles}
                                isMulti={true}
                                options={
                                    taskList.frequency.value === 'weekly' ?
                                    weekDaySelectOptions :
                                    [...Array(31).keys()].map(day => ({
                                        value: day + 1,
                                        label: day + 1
                                    }))
                                }
                                value={taskList.repeat}
                                onChange={e => setTaskList({ ...taskList, repeat: e })}
                            />
                        </div>
                    )}
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Businesses *</label>
                            <Select
                                styles={customSelectModalStyles}
                                options={businessSelect}
                                value={taskList.businesses}
                                onChange={e => setTaskList({ ...taskList, businesses: e })}
                                isMulti={true}
                            />
                        </div>
                        <div className="form-group">
                            <label>Positions *</label>
                            <Select
                                styles={customSelectModalStyles}
                                options={positionsSelect}
                                value={taskList.positions}
                                onChange={e => setTaskList({ ...taskList, positions: e })}
                                isMulti={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="create-task-items">
                    <div className="title-4 mb-1 ml-1">
                        Tasks
                    </div>
                    {[...Array(taskItemCount)].map((_, index) => (
                        <div key={`task-item-${index}`} className="create-task-item">
                            <div className="form-group">
                                {index + 1 === taskItemCount && index !== 0 ? (
                                    <div className="flex align-between">
                                        <label>Task #{index + 1} *</label>
                                        <button 
                                            class="btn-icon btn-icon-danger"
                                            onClick={() => setTaskItemCount(taskItemCount - 1)}
                                            >
                                            {closeIcon}
                                        </button>
                                    </div>
                                ) : (
                                    <label>Task #{index + 1} *</label>
                                )}
                                <input
                                    type="text"
                                    name="taskItem"
                                    placeholder="Task Title"
                                    onChange={(e) => {setTaskItems([...taskItems.slice(0, index), { ...taskItems[index], title: e.target.value }, ...taskItems.slice(index + 1)])}}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Task Description"
                                    onChange={(e) => {setTaskItems([...taskItems.slice(0, index), { ...taskItems[index], description: e.target.value }, ...taskItems.slice(index + 1)])}}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    ))}
                    <div className="flex align-between mb-1">
                        <div className="btn btn-outline"
                            onClick={() => setTaskItemCount(taskItemCount + 1)}
                        >
                            Add Task
                        </div>
                        <div className="btn btn-primary"
                            onClick={onSubmit}
                        >
                            Create Task List
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default CreateTaskList