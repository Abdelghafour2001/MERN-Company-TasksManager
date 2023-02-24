import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGlobalMessage } from "../../features/globalMessage/globalMessageSlice";
import { toast } from "react-toastify";
import { customSelectModalStyles } from '../../constance/localData';
import Select from 'react-select';
import { Modal } from "../";

const CreateMessage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState({
        message: "",
        business: null,
        receiver: {value: "business", label: "Business"},
        shift: {value: null, label: "No Shift"},
    });
    const { company } = useSelector(state => state.company);
    const { user } = useSelector(state => state.auth);

    const employeeManager = 
    useSelector(state => state.employee.userEmployees)
    ?.filter(employee => employee.isManager === true);

    const reseiverSelect = company?.owners.includes(user._id) ?
    [{value: "business", label: "Business"}, {value: "company", label: "Company"}]
    : [{value: "business", label: "Business"}];

    const businessSelector = employeeManager?.map(employee => {
        return {
            value: employee.business._id,
            label: employee.business.name
        }
    })

    const openShiftSelector = useSelector(state => state.shift.userShifts)
    ?.map(shift => {
        return {
            value: shift._id,
            label: `${shift.business.name} | ${new Date(shift.date).toLocaleString("en-US", { month: 'short', weekday: 'short', day: 'numeric' })} | ${shift.startTime} - ${shift.endTime}`
        }
    })

    const dispatch = useDispatch();


    const onChange = (e) => {
        setMessage({ ...message, [e.target.name]: e.target.value });
    };

    const onSubmit = () => {
        if(message.message && (message.receiver.value === "company" || (message.receiver.value === "business" && message.business))) {
            const data = {
                message: message.message,
                company: company._id,
                receiver: message.receiver.value,
                shift: message.shift?.value ? message.shift.value : undefined,
            }
            data.business = message.receiver.value === 'company' ? undefined : message.business.value;
            return [
                dispatch(createGlobalMessage(data)),
                setIsOpen(false),
            ]
        }
        else {
            toast.error("Please fill all the fields");
            return;
        }
    }

    return (
        <>
            <Modal
                modalIsOpen={isOpen}
                setModalIsOpen={setIsOpen}
                contentLabel="Create Message"
                onSubmit={onSubmit}
                actionBtnText="Create"
            >
                <div className="form-group">
                    <label>Message *</label>
                    <textarea
                        name="message"
                        placeholder="Enter your message here"
                        maxLength={100}
                        rows={2}
                        className="form-control"
                        value={message.message}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group-row">
                    <div className="form-group">
                        <label>Receiver *</label>
                        <Select
                            value={message.receiver}
                            onChange={(e) => setMessage({...message, receiver: e})}
                            options={reseiverSelect}
                            styles={customSelectModalStyles}
                        />
                    </div>
                    {message.receiver.value === "business" && (
                        <div className="form-group">
                            <label>Business *</label>
                            <Select
                                value={message.business}
                                onChange={(e) => setMessage({...message, business: e})}
                                options={businessSelector}
                                styles={customSelectModalStyles}
                            />
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label>
                        Attach a shift
                    </label>
                    <Select
                        value={message.shift}
                        onChange={(e) => setMessage({...message, shift: e})}
                        options={[{value: null, label: 'No shift'}, ...openShiftSelector ? openShiftSelector : [] ]}
                        styles={customSelectModalStyles}
                    />
                </div>
            </Modal>
            <div className="btn btn-primary" onClick={() => setIsOpen(true)}>
                Create Message
            </div>
        </>
    )
}

export default CreateMessage