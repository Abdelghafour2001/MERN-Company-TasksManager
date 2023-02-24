import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getBusinesses } from '../features/business/businessSlice';
import { getEmployees } from '../features/employee/employeeSlice';
import { BusinessCard } from '../components';

const Businesses = () => {
    const dispatch = useDispatch();
    const { company } = useSelector(state => state.company);
    const { user } = useSelector(state => state.auth);
    const userEmployees = useSelector(state => state.employee.userEmployees);
    const { businesses, isLoading } = useSelector(state => state.business);

    useEffect(() => {
        if (company) {
            dispatch(getBusinesses(company._id));
            dispatch(getEmployees(company._id));
        }
    }, [company]);

    return (
        company &&  (
            <BusinessCard
                businesses={
                    user?._id === company?.user ||
                    company?.owners.includes(user?._id) ?
                        businesses :
                    businesses?.filter(business => 
                        userEmployees.filter(employee => employee.business._id === business._id && employee.isManager).length > 0
                    )
                }
                isLoading={isLoading}
            />
        )
    )
}

export default Businesses