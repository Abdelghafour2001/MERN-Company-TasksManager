import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getBusinesses } from '../features/business/businessSlice';
import { getEmployees } from '../features/employee/employeeSlice';
import { BusinessCard, CompanyCard, CreateCompany, Invites, OwnerProtect } from '../components';

const Businesses = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const employee = useSelector(state => state.employee);
    const { company, isLoading } = useSelector(state => state.company);
    const invite = useSelector(state => state.invite);
    const business = useSelector(state => state.business);

    useEffect(() => {
        if (company) {
            dispatch(getBusinesses(company._id));
            dispatch(getEmployees(company._id));
        }
    }, [company]);

    return (
        <>
            <Invites />
            {company && (
                <>
                <CompanyCard />
                <BusinessCard
                    businesses={business.businesses}
                    isLoading={business.isLoading}
                />
                </>
            )}
            {!isLoading && !company && invite && invite?.invites?.length === 0 && (
                <CreateCompany />
            )}
        </>
    )
}

export default Businesses