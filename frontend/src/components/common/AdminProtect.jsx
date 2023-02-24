import { useSelector } from "react-redux";

const AdminProtect = ({ children }) => {
    const company = useSelector(state => state.company.company);
    const auth = useSelector(state => state.auth);

    return (
        company.user === auth.user._id && (
            children
        )
    )
}

export default AdminProtect