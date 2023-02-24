import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Modal, OwnerProtect, AdminProtect } from '../';
import Select from 'react-select';
import { changeRole, removeUser } from "../../features/company/companySlice";
import './styles/EmployeesModal.css';
import { customSelectModalStyles } from '../../constance/localData';
import { usersIcon } from "../../constance/icons";

const EmployeesModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({
        user: null
    });
    const company = useSelector(state => state.company.company);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const onSubmitRole = (user, role) => {
        const data = {
            id: company._id,
            userId: user,
            role: role
        }
        dispatch(changeRole(data));
        setIsModalOpen(false);
    }

    const onSubmitDelete = () => {
        const data = {
            id: company._id,
            userId: updatedUser._id
        }
        dispatch(removeUser(data));
        setIsDeleteModalOpen(false);
    }

    return (
        <>
            <Modal
                setModalIsOpen={setIsModalOpen}
                modalIsOpen={isModalOpen}
                bodyStyles={{
                    padding: '0px',
                    margin: '0px',
                }}
                contentLabel={`${company.name} Employees`}
            >
                <div className="users-modal">
                {company.employees.map(user => {
                    return (
                        <div className="user-card" key={`user-modal-${user._id}`}>
                            <div className="user-card-left">
                                <div className="user-card-image">
                                    { user.profilePicture ? 
                                        <img src={user.profilePicture} alt={user.name} /> 
                                    : 
                                        <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="user" />
                                    }
                                </div>
                                <div className="ml-1">
                                    <div>
                                        <div className="user-card-name">
                                            {user.firstName} {user.lastName}
                                        </div>
                                        <div className="user-card-email">
                                            {user.email}
                                        </div>
                                    </div>
                                    <div className="user-card-wage">
                                        {user.wage}
                                    </div>
                                </div>
                            </div>
                                <div className="user-card-right flex align-center">
                                    {company.user !== user._id ?
                                    <>
                                        <OwnerProtect>
                                            <div 
                                                className="btn btn-outline-danger mr-1"
                                                onClick={() => {setIsDeleteModalOpen(true); setUpdatedUser(user);}}
                                            >
                                                Remove
                                            </div>
                                        </OwnerProtect>
                                        <AdminProtect>
                                            <Select
                                                value={{
                                                    value: user._id,
                                                    label: company.owners.includes(user._id) ? 'Owner' : 'Employee'
                                                }}
                                                onChange={(e) => {onSubmitRole(user._id, e.value)}}
                                                options={[
                                                    { value: 'owner',
                                                    label: 'Owner' },
                                                    { value: 'employee',
                                                    label: 'Employee'}
                                                ]}
                                                isSearchable={false}
                                                styles={customSelectModalStyles}
                                            />
                                        </AdminProtect>
                                    </>
                                    :
                                        <p>
                                            Company's Owner
                                        </p>
                                    }
                                </div>
                        </div>
                    )
                })}
                </div>
            </Modal>
            <Modal
                setModalIsOpen={setIsDeleteModalOpen}
                modalIsOpen={isDeleteModalOpen}
                contentLabel={`Are you sure, you want to remove ${updatedUser?.firstName}?`}
            >
                <div className="form-group-row">
                    <div className="form-group">
                        <div
                            className="btn btn-outline"
                            onClick={() => setIsDeleteModalOpen(false)}
                        >Cancel</div>
                    </div>
                    <div className="form-group">
                        <div 
                            className="btn btn-danger"
                            onClick={onSubmitDelete}
                        >Remove</div>
                    </div>
                </div>
            </Modal>
            <div 
                className="company-card-detail employees-btn text-hover"
                onClick={() => setIsModalOpen(true)}
            >
                <div className="company-card-detail-icon">
                    {usersIcon}
                </div>
                <div className="company-card-detail-text">
                    <p className="text-secondary">Employees</p>
                    <p>{company.employees.length}</p>
                </div>
            </div>
        </>
    )
}

export default EmployeesModal