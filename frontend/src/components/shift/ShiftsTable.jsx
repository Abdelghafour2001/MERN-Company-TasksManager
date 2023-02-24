import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import { pickUpShift } from '../../features/shift/shiftSlice';
import { AddNote } from '../';
import { countTotalShiftHours } from '../../constance/helpers';

const ShiftTable = ({shifts, isOpenShift}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Business</th>
                        <th>Date</th>
                        <th>Shift</th>
                        <th>Total Hours</th>
                        <th className="address">Address</th>
                        <th>Note</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {shifts.map((shift, index) => {
                        return (
                            <tr 
                                key={index} 
                                className={`${searchParams.get('id') && searchParams.get('id') === shift._id ? 'highlight' : ''}`}
                            >
                                <td><b>{index+1}</b></td>
                                <td>
                                    <b>
                                        <Link to={`/scheduler/${shift.business._id}`} className="text-hover">
                                            {shift.business.name}
                                        </Link>
                                    </b>
                                </td>
                                <td className="text-center">
                                    <b>
                                        {new Date(shift.date).toLocaleString("en-US", { month: 'short'})}
                                        <br />
                                        {new Date(shift.date).toLocaleString("en-US", { weekday: 'short', day: 'numeric' })}
                                    </b>
                                </td>
                                <td>
                                    <b>{shift.startTime} - {shift.endTime}</b>
                                </td>
                                <td>{countTotalShiftHours(shift.startTime, shift.endTime)}</td>
                                <td className="address">{shift.business.address}, {shift.business.city}, {shift.business.state}, {shift.business.zip}</td>
                                <td>
                                    {shift.note ? (
                                        <div className="btn btn-outline-info btn-sm" onClick={() => toast.info(shift.note)}>
                                            Note
                                        </div>
                                    ) : (
                                        '-'
                                    )}
                                </td>
                                {!isOpenShift ? (
                                    <td className="table-note"><AddNote shift={shift}/></td>
                                ) : (
                                    <td>
                                        <button
                                            className="btn btn-outline-primary w-100 btn-sm"
                                            onClick={() => dispatch(pickUpShift(shift._id))}>
                                            Accept
                                        </button>
                                    </td>
                                )}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ShiftTable