import { useSelector } from "react-redux";

const OwnerProtect = ({ children }) => {
    const company = useSelector(state => state.company.company);
    const auth = useSelector(state => state.auth);

    return (
        company?.owners.includes(auth.user._id) ? (
            children
        ) : (
            null
        )
    )
}

export default OwnerProtect