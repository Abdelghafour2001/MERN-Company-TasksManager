import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Modal, ManagerProtect } from '../';
import { deleteShift, editShift } from '../../features/shift/shiftSlice';

import { customSelectModalStyles, hoursArray, positions } from '../../constance/localData';


const EditShift = ({ employee, shift, modalIsOpen, setModalIsOpen }) => {
    const dispatch = useDispatch();
    const business = useSelector(state => state.company.company.businesses).filter(business => business._id === shift.business)[0];

    const positionsSelect = shift.business.positions 
    ? shift.business.positions.map(position => {
        return {
            value: position.title,
            label: position.title
        }
    } )
    : business?.positions.map(position => {
        return {
            value: position.title,
            label: position.title
        }
    } );

    const [newShift, setNewShift] = useState({
        startTime: {value: shift.startTime, label: shift.startTime},
        endTime: {value: shift.endTime, label: shift.endTime},
        position: null,
        note: shift.note ? shift.note : ''
    });

    const hoursSelectStart = hoursArray
        .filter((hour, index) => {
            return newShift.endTime ? index < hoursArray.indexOf(newShift.endTime.value) : true;
        })
        .map(hour => {
            return {
                value: hour,
                label: hour
            }
        })

    const hoursSelectEnd = hoursArray
        .filter((hour, index) => {
            return newShift.startTime ? index > hoursArray.indexOf(newShift.startTime.value) : true;
        })
        .map(hour => {
            return {
                value: hour,
                label: hour
            }
        })


    const onSubmit = () => {
        if(newShift.startTime && newShift.endTime) {
            dispatch(editShift({
                id: shift._id,
                startTime: newShift.startTime.value,
                endTime: newShift.endTime.value,
                position: newShift.position ? newShift.position.value : shift.position,
                note: newShift.note
            }))
            setModalIsOpen(false);
        } else {
            toast.error("Please select start and end time");
        }
    }

    const onSubmitDanger = () => {
        dispatch(deleteShift(shift._id, newShift));
        setModalIsOpen(false);
    }


    return (
    <>
    {document.querySelector('.calender-body') && (
        <>
        <Modal
            style={{
                zoom: `${!document.querySelector('.calender-body').style.zoom 
                ? '1' 
                : ((1/+document.querySelector('.calender-body').style.zoom)*100) + '%'}`
            }}
            setModalIsOpen={setModalIsOpen}
            modalIsOpen={modalIsOpen}
            actionBtnText="Save"
            onSubmit={onSubmit}
            onSubmitDanger={onSubmitDanger}
            actionDangerBtnText="Delete"
            contentLabel={
                    `Edit ${shift.acceptedBy ?
                        `${shift.acceptedBy === 'undefined'}` ?
                            'shift' :
                        `${shift.acceptedBy.firstName}`
                        : employee ? 
                    'Shift for ' + employee.firstName 
                    : 'Open Shift'} on ${new Date(shift.date).toLocaleString('en-us', {  weekday: 'short', month: 'short', day: 'numeric' })}`
                }
        >
            <div className="create-shift-form">
                <ManagerProtect>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Start *</label>
                            <Select
                            value={newShift.startTime}
                            onChange={(e) => {setNewShift({...newShift, startTime: e})}}
                            options={hoursSelectStart}
                            styles={customSelectModalStyles}
                            />
                        </div>
                        <div className="form-group">
                            <label>End *</label>
                            <Select
                            value={newShift.endTime}
                            onChange={(e) => {setNewShift({...newShift, endTime: e});}}
                            options={hoursSelectEnd}
                            styles={customSelectModalStyles}
                            />
                        </div>
                    </div>
                </ManagerProtect>
                <div className="form-group-row">
                    <div className="form-group">
                        <label>Note</label>
                        <input
                            placeholder="Enter any notes"
                            value={newShift.note}
                            onChange={(e) => {setNewShift({...newShift, note: e.target.value})}}
                        />
                    </div>
                <ManagerProtect>
                    {(!shift.employee) && (
                        <div className="form-group">
                            <label>Position</label>
                            <Select
                                value={newShift.position}
                                onChange={(e) => { setNewShift({ ...newShift, position: e })} }
                                options={positionsSelect}
                                styles={customSelectModalStyles}
                            />
                        </div>
                    )}
                </ManagerProtect>
                </div>
            </div>
        </Modal>
        </>
    )}
    </>
    )
}

export default EditShift