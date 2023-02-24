import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Modal } from '../';
import { updateTaskList } from '../../features/task/taskSlice';
import { customSelectModalStyles, weekDaySelectOptions } from '../../constance/localData';

const EditTaskList = ({taskList}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { company } = useSelector(state => state.company);
    const [editedTaskList, setEditedTaskList] = useState({
        title: taskList.title,
        frequency: { value: taskList.frequency, label: taskList.frequency },
        repeat: taskList?.repeat?.map(item => ({value: item, label: item})),
        businesses: taskList.businesses.map(business => ({value: business._id, label: business.name})),
        positions: taskList?.positions?.map(position => ({value: position, label: position})),
        color: taskList.color,
    });

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
        setEditedTaskList({
            ...editedTaskList,
            [e.target.name]: e.target.value
        });
    }


    const onSubmit = () => {
        if(editedTaskList.title && editedTaskList.frequency && editedTaskList.businesses.length > 0 && editedTaskList.positions.length > 0) {
            const data = {
                _id: taskList._id,
                title: editedTaskList.title,
                frequency: editedTaskList.frequency.value,
                repeat: editedTaskList.repeat.map(item => item.value),
                businesses: editedTaskList.businesses.map(business => business.value),
                positions: editedTaskList.positions.map(position => position.value),
                color: editedTaskList.color,
            }
            dispatch(updateTaskList(data))
            setIsOpen(false);
        } else {
            toast.error('Please fill all fields');
        }
    }

    const onSubmitDanger = () => {
        console.log('delete');
        setIsOpen(false);
    }

    return (
        <>
        <Modal
            modalIsOpen={isOpen}
            setModalIsOpen={setIsOpen}
            contentLabel={`Edit ${taskList.title} Task List`}
            onSubmit={onSubmit}
            actionBtnText="Update"
            onSubmitDanger={onSubmitDanger}
            actionDangerBtnText="Delete"
        >
            <div className="form-group-row">
                <div className="form-group">
                    <label>Title *</label>
                    <input 
                        type="text" 
                        name="title"
                        placeholder="Task List Title"
                        value={editedTaskList.title}
                        onChange={onChange}
                        autoComplete="off"
                    />
                </div>
                <div className="form-group">
                    <label>Frequency *</label>
                    <Select
                        styles={customSelectModalStyles}
                        options={frequencySelect}
                        value={editedTaskList.frequency}
                        onChange={e => setEditedTaskList({ ...editedTaskList, repeat: [], frequency: e })}
                    />
                </div>
            </div>
            {(editedTaskList.frequency.value === 'weekly' || editedTaskList.frequency.value === 'monthly') && (
                <div className="form-group">
                    <label>Repeat On *</label>
                    <Select
                        styles={customSelectModalStyles}
                        isMulti={true}
                        options={
                            editedTaskList.frequency.value === 'weekly' ?
                            weekDaySelectOptions :
                            [...Array(31).keys()].map(day => ({
                                value: day + 1,
                                label: day + 1
                            }))
                        }
                        value={editedTaskList.repeat}
                        onChange={e => setEditedTaskList({ ...editedTaskList, repeat: e })}
                    />
                </div>
            )}
            <div className="form-group-row">
                <div className="form-group">
                    <label>Businesses *</label>
                    <Select
                        styles={customSelectModalStyles}
                        options={businessSelect}
                        value={editedTaskList.businesses}
                        onChange={e => setEditedTaskList({ ...editedTaskList, businesses: e })}
                        isMulti={true}
                    />
                </div>
                <div className="form-group">
                    <label>Positions *</label>
                    <Select
                        styles={customSelectModalStyles}
                        options={positionsSelect}
                        value={editedTaskList.positions}
                        onChange={e => setEditedTaskList({ ...editedTaskList, positions: e })}
                        isMulti={true}
                    />
                </div>
            </div>
            <div className="form-group-row">
            <div className="form-group flex">
                <label>Color</label>
                <div className="flex">
                <input
                    type="color"
                    className="w-100"
                    name="color"
                    value={editedTaskList.color}
                    onChange={(e) => {
                        setEditedTaskList({ ...editedTaskList, color: e.target.value })
                    }}
                />
                </div>
            </div>
            </div>
        </Modal>
            <div 
                className="btn btn-outline"
                onClick={() => setIsOpen(true)}
            >
                Edit List
            </div>
        </>
    )
}

export default EditTaskList