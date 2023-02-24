import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { copyPreviousWeekShifts } from '../../features/shift/shiftSlice';
import { Modal } from '../';

const CopyShifts = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();

    const startDate = new Date (useSelector(state => state.local.time.startDate));
    const fromDate = new Date (useSelector(state => state.local.time.fromDate));
    const toDate = new Date (useSelector(state => state.local.time.toDate));
    const dateControl = useSelector(state => state.local.time.dateControl);

    const onSubmit = () => {
        const data = {
            business: id,
            fromDate: dateControl === 'day' 
                ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0)
                    : new Date(fromDate.setHours(0,0,0,0)),
            toDate: dateControl === 'day' 
                ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+1, 0, 0, 0)
                    : new Date(toDate.setHours(0,0,0,0)),
            dateControl: dateControl
        }
        dispatch(copyPreviousWeekShifts(data));
        setModalIsOpen(false);
    };

    return (
        <>
            <Modal
                contentLabel={`Are you sure you want to copy ${dateControl} shifts?`}
                setModalIsOpen={setModalIsOpen}
                modalIsOpen={modalIsOpen}
            >
                {dateControl === 'day' ? (
                    <>
                        <p>From <b>{startDate.toLocaleString("en-US", { month: 'short', day: 'numeric' })}</b></p>
                        <p>To <b>{new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+1).toLocaleString("en-US", { month: 'short', day: 'numeric' })}</b></p>
                    </>
                ):(
                    <>
                        <p>
                            From <b>{fromDate.toLocaleString("en-US", { month: 'short', day: 'numeric' })}</b> - <b>{toDate.toLocaleString("en-US", { month: 'short', day: 'numeric' })}</b>
                        </p>
                        <p>
                            To <b>{new Date(fromDate.setHours(0, 0, 0, 0) + 
                                ((dateControl === 'week' ?
                                    7
                                : dateControl === '2week' ?
                                    14
                                : dateControl === '4week' ?
                                    28
                                : 1)
                                * 24 * 60 * 60 * 1000)) .toLocaleString("en-US", { month: 'short', day: 'numeric' })}</b> - <b>{new Date(toDate.setHours(0, 0, 0, 0) + 
                                ((dateControl === 'week' ?
                                    7
                                : dateControl === '2week' ?
                                    14
                                : dateControl === '4week' ?
                                    28
                                : 1)
                                * 24 * 60 * 60 * 1000)) .toLocaleString("en-US", { month: 'short', day: 'numeric' })} </b>
                        </p>
                    </>
                )}
                <div className="form-group-row">
                    <div className="form-group">
                        <div
                            className="btn btn-outline"
                            onClick={() => setModalIsOpen(false)}
                        >Cancel</div>
                    </div>
                    <div className="form-group">
                        <div 
                            className="btn btn-primary"
                            onClick={onSubmit}
                        >Copy</div>
                    </div>
                </div>
            </Modal>
            <div className="calender-header-right">
                <div className="btn btn-outline"
                onClick={() => setModalIsOpen(true)}>
                    Copy {dateControl} Schedule 
                </div>
            </div>
        </>
    )
}

export default CopyShifts