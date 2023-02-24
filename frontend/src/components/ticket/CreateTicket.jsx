import { useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Select from 'react-select';
import { customSelectModalStyles } from '../../constance/localData';
import { toast } from "react-toastify";
import { createTicket } from "../../features/ticket/ticketSlice";
import { Modal } from "../";


const CreateTicket = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation().pathname.split('/')[1];
    const businesses = useSelector(state => state.employee.userEmployees)?.map(e => e.business);
    const employees = useSelector(state => state.company.company?.employees);
    const company = useSelector(state => state.company);
    const user = useSelector(state => state.auth.user);
    const businessManager = useSelector(state => state.employee.userEmployees)?.filter(a => a.isManager)?.map(e => e.business);
    const businessManagerOrOwner = company?.owners?.includes(user._id) ?
        company.businesses
    : businessManager;

    const [ticket, setTicket] = useState({
        message: "",
        business: null,
        to: null,
        type: null,
        date: '',
        message: '',
        anonymous: {value: false, label: 'No'}
    });

    const typeSelect = [
        {value: 'time-off', label: 'Time-off'},
        {value: 'issue', label: 'Issue'},
        {value: 'request', label: 'Request'},
        {value: 'complaint', label: 'Complaint'},
        {value: 'other', label: 'Other'}
    ]
    const businessSelect = businesses?.map(b => ({value: b, label: b?.name}));
    const businessManagerSelect = businessManagerOrOwner?.map(b => ({value: b, label: b.name}));
    const employeeSelect = employees?.map(b => ({value: b, label: `${b.firstName} ${b.lastName}`}));

    const onSubmit = () => {
        if(location === 'user' && ticket.message.length > 1 && ticket.business && ticket.type
        ) {
            const data = {
                message: ticket.message,
                business: ticket.business.value,
                type: ticket.type.value,
                date: ticket.date,
                anonymous: ticket.anonymous.value
            }
            dispatch(createTicket(data));
            setIsModalOpen(false);
        } else if (location === 'dashboard' && ticket.business && ticket.message.length > 1 && ticket.to && ticket.type) {
            const data = {
                message: ticket.message,
                date: ticket.date,
                business: ticket.business.value,
                type: ticket.type.value,
                to: ticket.to.value,
            }
            dispatch(createTicket(data));
            setIsModalOpen(false);
        } else {
            toast.error('Please fill out all fields!');
        }
    }

    const onChange = (e) => {
        setTicket({
            ...ticket,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <Modal
                contentLabel={'Create Ticket'}
                modalIsOpen={isModalOpen}
                setModalIsOpen={setIsModalOpen}
                actionBtnText={'Create'}
                onSubmit={onSubmit}
            >
                <div className="form-group-row">
                    <div className="form-group">
                        <label>Type *</label>
                        <Select
                            styles={customSelectModalStyles}
                            options={typeSelect}
                            onChange={(e) => setTicket({...ticket, type: e})}
                            value={ticket.type}
                        />
                    </div>
                    <div className="form-group">
                        {location === 'dashboard' ? (
                            <>
                                <label>Employee *</label>
                                <Select
                                    styles={customSelectModalStyles}
                                    options={employeeSelect}
                                    onChange={(e) => setTicket({...ticket, to: e})}
                                    value={ticket.to}
                                />
                            </>
                        ) : (
                            <div className="form-group">
                            <label>Business *</label>
                            <Select
                                styles={customSelectModalStyles}
                                options={businessSelect}
                                onChange={(e) => setTicket({...ticket, business: e})}
                                value={ticket.business}
                            />
                            </div>
                        )}
                    </div>
                </div>
                <div className="form-group-row">
                    <div className="form-group">
                        <label>Date</label>
                        <input type="date" name="date" value={ticket.date} onChange={onChange} />
                    </div>
                    {location !== 'dashboard' ? (
                        <div className="form-group">
                            <label>Anonymous</label>
                            <Select
                                styles={customSelectModalStyles}
                                options={[{value: true, label: 'Yes'}, {value: false, label: 'No'}]}
                                onChange={(e) => setTicket({...ticket, anonymous: e})}
                                value={ticket.anonymous}
                            />
                        </div>
                    ) : (
                        <div className="form-group">
                        <label>Business *</label>
                        <Select
                            styles={customSelectModalStyles}
                            options={businessManagerSelect}
                            onChange={(e) => setTicket({...ticket, business: e})}
                            value={ticket.business}
                        />
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label>Message *</label>
                    <textarea 
                        name="message" 
                        value={ticket.message}
                        onChange={onChange} 
                        placeholder="Enter your message here" 
                        maxLength="100"
                        rows="2"/>
                </div>
            </Modal>
            <div 
                className="btn btn-primary"
                onClick={() => setIsModalOpen(true)}
            >
                Create Ticket
            </div>
        </>
    )
}

export default CreateTicket