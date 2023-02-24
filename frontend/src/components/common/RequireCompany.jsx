import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCompany, reset } from "../../features/company/companySlice";
import { getUserEmployees } from '../../features/employee/employeeSlice';
import { getAllGlobalMessages } from '../../features/globalMessage/globalMessageSlice';

const RequireCompany = ({children}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { company, isLoading, isError, isSuccess, msg } = useSelector((state) => state.company);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {

        if(auth.user && !company) {
            dispatch(getCompany());
            dispatch(getUserEmployees());
        }
        
        if(company) {
            dispatch(getAllGlobalMessages());
        }

        if(auth.user && !company && !isLoading && (isSuccess)) {
            navigate("/company");
        }

    }, [company]);

    useEffect(() => {
        if(msg === "Company not found") {
            navigate("/company");
        }
    }, [msg]);

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    return children;

}

export default RequireCompany