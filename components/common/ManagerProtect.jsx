import { useSelector } from "react-redux";

const ManagerProtect = ({children, business}) => {
    const { company } = useSelector(state => state.company);
    const { user } = useSelector(state => state.auth);
    const { employees } = useSelector(state => state.shift);
    const employee = useSelector(state => state.employee);

    return (
        (business && employee && employee.employees && (employee.employees.filter(employee => (business._id === employee.business && employee.user === user._id))[0]?.isManager)) ||
        (employees && employees.filter(employee => employee.user === user._id)[0]?.isManager) || 
        company.owners.includes(user._id) ? (
            children
        ) : null
    )
}

export default ManagerProtect
