import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Modal } from '../';
import { createShift } from '../../features/shift/shiftSlice';
import { customSelectModalStyles, hoursArray } from '../../constance/localData';
import { plusIcon } from '../../constance/icons';


const CreateShift = ({ date, employee, startTime }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();
    const positionsSelect = useSelector(state => state.company.company.businesses)
        .filter(business => business._id === id)[0].positions?.map(position => {
            return {
                value: position.title,
                label: position.title
                }
            });

    const [shiftPreset, setShiftPreset] = useState(null);

    const shiftPresetsSelect = useSelector(state => state.company.company.businesses)
    .filter(business => business._id === id)[0].shiftPresets?.map(shiftPreset => {
        return {
            value: shiftPreset,
            label: shiftPreset.label + ' | ' + shiftPreset.startTime + ' - ' + shiftPreset.endTime
            }
        });

    const [shift, setShift] = useState({
        startTime: startTime ? {value: startTime, label: startTime} : null,
        endTime: null,
        position: null,
    });


    const hoursSelectStart = hoursArray
    .filter((hour, index) => {
        return shift.endTime ? index < hoursArray.indexOf(shift.endTime.value) : true;
    })
    .map(hour => {
        return {
            value: hour,
            label: hour
        }
    })

    const hoursSelectEnd = hoursArray
    .filter((hour, index) => {
        return shift.startTime ? index > hoursArray.indexOf(shift.startTime.value) : true;
    })
    .map(hour => {
        return {
            value: hour,
            label: hour
        }
    })

    const onSubmit = () => {
        if(shiftPreset || (shift.startTime && shift.endTime)) {
            const data = {
                employee: employee ? employee._id : null,
                business: id,
                date: date,
                position: shift.position ? shift.position.value : null,
                startTime: shiftPreset ? shiftPreset.value.startTime : shift.startTime.value,
                endTime: shiftPreset ? shiftPreset.value.endTime : shift.endTime.value
            }
            dispatch(createShift(data));
            setModalIsOpen(false);
        } else {
            toast.error("Please select start and end time");
        }
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
        contentLabel={
            `Create ${employee ? 
            'Shift for ' + employee.firstName 
            : 'Open Shift'} on ${date.toLocaleString('en-us', {  weekday: 'short', month: 'short', day: 'numeric' })}`
            }
        >
            <div className="create-shift-form">
                {shiftPresetsSelect.length > 0 && (
                    <div className="form-group">
                        <label>Shift Presets</label>
                        <Select
                            styles={customSelectModalStyles}
                            options={shiftPresetsSelect}
                            value={shiftPreset}
                            onChange={(shiftPreset) => setShiftPreset(shiftPreset)}
                            isClearable={true}
                        />
                    </div>
                )}
                {!shiftPreset && (
                <>
                <div className="form-group-row">
                    <div className="form-group">
                        <label>Start *</label>
                        <Select
                        value={shift.startTime}
                        onChange={(e) => {setShift({...shift, startTime: e})}}
                        options={hoursSelectStart}
                        styles={customSelectModalStyles}
                        />
                    </div>
                    <div className="form-group">
                        <label>End *</label>
                        <Select
                        value={shift.endTime}
                        onChange={(e) => {setShift({...shift, endTime: e});}}
                        options={hoursSelectEnd}
                        styles={customSelectModalStyles}
                        />
                    </div>
                </div>
                {(!employee || !employee.position) && (
                    <div className="form-group">
                        <label>Position</label>
                        <Select
                            value={shift.position}
                            onChange={(e) => { setShift({ ...shift, position: e })} }
                            options={positionsSelect}
                            styles={customSelectModalStyles}
                        />
                    </div>
                )}
                </>
                )}
            </div>
        </Modal>
        <div className="create-shift flex align-end" title="Create Shift">
            <div className="flex align-center w-100 h-100" onClick={() => setModalIsOpen(true)}>
                {plusIcon}
            </div>
        </div>
        </>
        )}
    </>
    )
}

export default CreateShift