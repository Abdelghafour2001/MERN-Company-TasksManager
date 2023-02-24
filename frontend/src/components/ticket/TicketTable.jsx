import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTicket, deleteTicket } from "../../features/ticket/ticketSlice";


const TicketTable = ({isReceived}) => {
    const ticketsFrom = useSelector(state => state.ticket.from);
    const ticketsTo = useSelector(state => state.ticket.to);
    const location = useLocation().pathname.split('/')[1];
    const dispatch = useDispatch();

    const tickets = isReceived ? ticketsTo : ticketsFrom;

    return (
    <div className="table mt-1">
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    {isReceived ? (
                        <th>From</th>
                    ) : (
                        <th>To</th>
                    )}
                    <th className="w-100 text-start">Message</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tickets && tickets.length === 0 && (
                    <tr>
                        <td colSpan="7">
                            <p className="text-center">No tickets found</p>
                        </td>
                    </tr>
                )}
                {tickets?.map((ticket, index) => {
                    return (
                        <tr key={index}>
                            <td><b>{index+1}</b></td>
                            {isReceived ? (
                                <td>
                                    <b>
                                        {ticket.anonymous ? (
                                            <span>Anonymous</span>
                                        ) : (
                                            `${ticket.from.firstName} ${ticket.from.lastName}`
                                        )}
                                    </b>
                                </td>
                            ) : (
                                <td>
                                    <b>
                                    {ticket.to ? (
                                        `${ticket.to.firstName} ${ticket.to.lastName}`
                                    ) : (
                                        `${ticket.business.name}`
                                    )}
                                    </b>
                                </td>
                            )}
                            <td className="w-100 text-start text-transform-none">
                                {ticket.message}
                            </td>
                            <td className={`${
                                ticket.type === 'complaint' ||
                                ticket.type === 'issue' ?
                                'bg-danger' :
                                ticket.type === 'request' ||
                                ticket.type === 'time-off' ?
                                'bg-warning' :
                                ''
                                }`}>
                                {ticket?.type}
                            </td>
                            <td>
                                {ticket.date ? (
                                    ticket?.date?.split('T')[0]
                                ) : (
                                    '-'
                                )}
                            </td>
                            <td className={`${
                                ticket.status === 'pending' ? 'bg-warning' 
                            : ticket.status === 'accepted' || ticket.status === 'resolved' ? 'bg-success'
                            : ticket.status === 'rejected' ? 'bg-danger' : '' }`}>
                                {ticket.status}
                            </td>
                            {isReceived ? (
                                <td className="flex space-between">
                                    <button
                                        className="btn btn-outline-danger w-100 btn-sm mr-3"
                                        onClick={() => 
                                            {
                                                dispatch(updateTicket({
                                                    _id: ticket._id,
                                                    status: 'rejected'
                                                }))
                                            }
                                        }>
                                        Reject
                                    </button>
                                    <button
                                        className="btn btn-outline-success w-100 btn-sm"
                                        onClick={() => 
                                            {
                                                dispatch(updateTicket({
                                                    _id: ticket._id,
                                                    status: 'resolved'
                                                }))
                                            }
                                        }>
                                        Сonfirm
                                    </button>
                                </td>
                            ) : (
                            <td>
                                <button
                                    className="btn btn-outline-danger w-100 btn-sm"
                                    onClick={() => 
                                        {
                                            dispatch(deleteTicket(ticket._id));
                                        }
                                    }>
                                    Delete
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

export default TicketTable