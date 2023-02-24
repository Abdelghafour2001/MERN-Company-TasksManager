import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Alerts = () => {
    const auth = useSelector(state => state.auth);
    const company = useSelector(state => state.company);
    const business = useSelector(state => state.business);
    const employee = useSelector(state => state.employee);
    const shift = useSelector(state => state.shift);
    const invite = useSelector(state => state.invite);
    const globalMessage = useSelector(state => state.globalMessage);
    const ticket = useSelector(state => state.ticket);
    const task = useSelector(state => state.task);

    useEffect(() => {
        // if(auth.isError) {
        //     return toast.error(auth.msg);
        // }
        // if(company.isError) {
        //     return toast.error(company.msg);
        // }
        if(business.isError) {
            return toast.error(business.msg);
        }
        if(employee.isError) {
            return toast.error(employee.msg);
        }
        if(shift.isError) {
            return toast.error(shift.msg);
        }
        if(invite.isError) {
            return toast.error(invite.msg);
        }
        if(globalMessage.isError) {
            return toast.error(globalMessage.msg);
        }
        if(ticket.isError) {
            return toast.error(ticket.msg);
        }
        if(task.isError) {
            return toast.error(task.msg);
        }
    }, [
        // auth.isError, 
        // company.isError, 
        business.isError, 
        employee.isError, 
        shift.isError, 
        invite.isError, 
        globalMessage.isError,
        ticket.isError,
        task.isError,
    ]);

    return null;
}

export default Alerts