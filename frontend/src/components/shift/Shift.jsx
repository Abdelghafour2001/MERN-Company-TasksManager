import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { toast } from 'react-toastify';
import { EditShift, ManagerProtect } from '../';
import { editIcon, noteIcon } from '../../constance/icons';

const Shift = ({ shift, employee, index, endTimeOnResize, onMouseDownResize, acceptedShifts }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [width, setWidth] = useState(0);
    const [totalHours, setTotalHours] = useState(0);

    // Temporary fix for the isManager bug
    const { company } = useSelector(state => state.company);
    const { user } = useSelector(state => state.auth);
    const { employees } = useSelector(state => state.shift);
    
    const color = shift.position ? 
        company?.businesses?.find(business => business._id === shift.business)?.positions
        .find(position => position.title === shift.position)?.color
    : employee ? 
        company?.businesses?.find(business => business._id === employee.business)?.positions
        .find(position => position.title === employee.position)?.color
    : '#2a74d3';

    const [{ isDragging, opacity }, drag] = useDrag({
        type: 'shift',
        item: {
            shift,
            // index,
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const newCalcTotalHours = ( a, b ) => {
        let start = new Date().setHours(a.slice(0, 2), a.slice(3, 5), 0, 0);
        let end = new Date().setHours(b.slice(0, 2), b.slice(3, 5), 0, 0);
        return setTotalHours(Math.trunc((end - start) / 3600000) + 'h' + (Math.floor(((end - start) / 60000) % 60) !== 0 ? Math.floor(((end - start) / 60000) % 60) + "m" : ""));
    }

    useEffect(() => {
        let time = (+shift.endTime.slice(0, 2) + (+shift.endTime.slice(3, 5)/60) - +shift.startTime.slice(0, 2) + (+shift.startTime.slice(3, 5)/60))
        let hours = ((+shift.endTime.slice(0, 2))  - (+shift.startTime.slice(0, 2)))
        let minutes = ((+shift.endTime.slice(3, 5)) - (+shift.startTime.slice(3, 5)))/60
        setWidth(((hours+minutes) * 100));
    }, [shift.endTime, shift.startTime]);

    useMemo(() => {
        newCalcTotalHours(shift.startTime, endTimeOnResize && endTimeOnResize[index] ? endTimeOnResize[index] : shift.endTime);
    }, [endTimeOnResize && endTimeOnResize[index], shift.endTime, shift.startTime]);

    return (
        <>
        <div 
            className="shift-parent flex align-between"
            id={`${shift._id}`}
            ref={ 
                (employees && employees.filter(employee => employee.user === user._id)[0]?.isManager) || company.owners.includes(user._id) 
                ? drag 
                : null 
            }
            style={{
                marginLeft: 
                    `${
                        endTimeOnResize ?
                            (+shift.startTime.slice(3, 5) / 60) * 100
                        : 
                            0
                    }%`
                ,
                width: `${
                    endTimeOnResize ?
                    (
                        width
                    ) : 100}%`
                ,
                background: `${
                    isDragging ? 'var(--color-main)' : ''
                }`,
            }}
        >
            <div 
                className={`shift w-100 h-100 ${ shift.color }`}
                style={{
                    backgroundColor: color,
                }}
            >
                {shift.note && (
                    <div className="note-badge"/>
                )}
                <ManagerProtect>
                    {
                        onMouseDownResize ? 
                        <div 
                            onMouseDown={(e) => {onMouseDownResize(e, index, shift.startTime, shift._id)}}
                            className="stretch"
                        ></div>
                        : null
                    }
                </ManagerProtect>
                <div className="time flex align-between w-100 h-100">
                    <div className="clock-time">
                        { shift.startTime }
                        <hr />
                        { 
                            endTimeOnResize && endTimeOnResize[index] ?
                            endTimeOnResize[index]
                            :
                                shift.endTime 
                        }
                    </div>
                    <div className="flex align-center">
                        <div className="total-hours">
                        {   
                            shift && (
                                totalHours
                            )
                        }
                        </div>
                        {acceptedShifts && shift.acceptedBy && 
                            <div className="position">
                                { shift.acceptedBy.lastName }
                            </div>
                        }
                    </div>
                </div>
                <div className="edit btn-group flex align-between w-100 h-100">
                    <div className="btn w-100" onClick={() => setModalIsOpen(true)}>
                        {editIcon}
                    </div>
                    {shift.note && (
                        <div className="btn btn-shift-note" onClick={() => { toast.info(shift.note) }}>
                            {noteIcon}
                        </div>
                    )}
                </div>
            </div>
        </div>
        {shift  && (
            <EditShift
                shift={shift}
                employee={employee}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
            />
        )}
        </>
    )
}

export default Shift