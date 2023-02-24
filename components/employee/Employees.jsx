import { useSelector } from 'react-redux';
import { EmployeeCard } from '../';

const EmployeeList = ({businesses, positions, business}) => {
    const { employees, isLoading } = useSelector(state => state.employee);

    return (
        <>
            {employees && [...employees].sort((a, b) => Number(b.isManager) - Number(a.isManager)).map(employee => (
                (business._id === employee.business || business._id === employee.business._id ) && (
                    <EmployeeCard 
                        key={employee._id} 
                        positions={positions}
                        businesses={businesses}
                        business={business}
                        employee={employee} 
                    />
                )
            ))}
        </>
    )
}

export default EmployeeList