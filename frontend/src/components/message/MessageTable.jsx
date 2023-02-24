import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteGlobalMessage } from '../../features/globalMessage/globalMessageSlice';

const MessageTable = ({}) => {
    const { globalMessagesSender } = useSelector(state => state.globalMessage);
    const { company } = useSelector(state => state.company);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    return (
        <div className="table mt-1">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Business</th>
                        <th>Date</th>
                        <th className="w-100 text-start">Message</th>
                        <th>Target</th>
                        <th>Shift</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {globalMessagesSender?.map((message, index) => {
                        return (
                            <tr key={index}>
                                <td><b>{index+1}</b></td>
                                <td>
                                    {message.business ? (
                                        company?.businesses?.filter(business => business._id === message.business)?.map(business => {
                                            return (
                                                <b key={business._id}>
                                                    <Link to={`/scheduler/${business._id}`} className="text-hover">
                                                        {business.name}
                                                    </Link>
                                                </b>
                                            )
                                        })
                                    ) : (
                                        '-'
                                    )}
                                </td>
                                <td className="text-center">
                                    <b>
                                        {new Date(message.createdAt).toLocaleString("en-US", { month: 'short'})}
                                        <br />
                                        {new Date(message.createdAt).toLocaleString("en-US", { weekday: 'short', day: 'numeric' })}
                                    </b>
                                </td>
                                <td className="w-100 text-start">{message.message}</td>
                                <td>{message.receiver}</td>
                                {message.shift? 
                                <td>
                                    <button className="btn btn-outline-info btn-sm" onClick={() => {setSearchParams({id: message.shift})}}>Highlight</button>
                                </td> : <td>-</td>}
                                <td>
                                    <button
                                        className="btn btn-outline-danger w-100 btn-sm"
                                        onClick={() => 
                                            {
                                                dispatch(deleteGlobalMessage(message._id));
                                            }
                                        }>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default MessageTable