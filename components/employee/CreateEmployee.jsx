import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../';
import { customSelectModalStyles } from '../../constance/localData';
import { toast } from 'react-toastify';
import { createEmployee } from '../../features/employee/employeeSlice';
import { createInvite } from '../../features/invite/inviteSlice';

const CreateEmployee = ({positions, business}) => {
    const [isNew, setIsNew] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addUser, setAddUser] = useState(null);
    const { company } = useSelector(state => state.company);
    const dispatch = useDispatch();

    const positionsSelect = positions.length > 0 ? positions.map(position => {
        return {
            value: position.title,
            label: position.title
        }
    }) : [];
    const userSelect = company && company.employees.map(employee => {
        return {
            value: employee,
            label: employee.firstName + ' ' + employee.lastName
        }
    }) || [];

    const [newEmployee, setNewEmployee] = useState({
        firstName: '',
        lastName: '',
        position: positions.length > 0 ? positionsSelect[0] : '',
        wage: 0,
        business: business._id
    });

    const onChange = (e) => {
        setNewEmployee({
            ...newEmployee,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = () => {
        if(isNew) {
            if(!newEmployee.firstName || !newEmployee.lastName) {
                toast.error('Please fill all fields');
                return;
            } else {
                const employee = {
                    ...newEmployee,
                    position: newEmployee.position?.value,
                }
                dispatch(createEmployee(employee));
                setIsModalOpen(false);
                setNewEmployee({
                    firstName: '',
                    lastName: '',
                    position: positions.length > 0 ? positionsSelect[0] : '',
                    wage: 0,
                    business: business._id
                });
            }
        }

        if(!isNew) {
            if(!addUser) {
                toast.error('Please fill all fields');
                return;
            } else {
                dispatch(createEmployee({
                    user: addUser.value._id,
                    firstName: addUser.value.firstName,
                    lastName: addUser.value.lastName,
                    business: business._id
                }));
                setIsModalOpen(false);
            }
        }
    };


    return (
        <>
        <Modal
            setModalIsOpen={setIsModalOpen}
            modalIsOpen={isModalOpen}
            actionBtnText="Add"
            contentLabel={`New Employee for ${business.name}`}
            onSubmit={onSubmit}
        >
            <div className="nav-tab-select">
                <p className={`${!isNew ? 'selected' : ''}`} onClick={() => setIsNew(false)}>Company's Employee</p>
                <p className={`${isNew ? 'selected' : ''}`} onClick={() => setIsNew(true)}>Create New</p>
            </div>
            <div className="employee-form">
                {isNew ? (
                <>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>First Name *</label>
                            <input 
                                type="text" 
                                name="firstName"
                                value={newEmployee.firstName} 
                                placeholder="Enter first name" 
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name *</label>
                            <input 
                                type="text" 
                                name="lastName"
                                value={newEmployee.lastName} 
                                placeholder="Enter last name" 
                                onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Position</label>
                            <Select
                                value={newEmployee.position}
                                onChange={(e) => setNewEmployee({...newEmployee, position: e})}
                                options={positionsSelect}
                                styles={customSelectModalStyles}
                            />
                        </div>
                        <div className="form-group">
                            <label>Wage</label>
                            <input 
                                type="number" 
                                name="wage"
                                value={newEmployee.wage} 
                                onChange={onChange} 
                                min={0} 
                            />
                        </div>
                    </div>
                </>
                ) : (
                <>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>User *</label>
                            <Select
                                value={addUser}
                                onChange={(e) => setAddUser(e)}
                                options={userSelect}
                                styles={customSelectModalStyles}
                            />
                        </div>
                    </div>
                </>
                )}
            </div>
        </Modal>
        <div onClick={() => setIsModalOpen(true)} className="btn btn-primary">
            Add Employee
        </div>
        </>
    )
}

export default CreateEmployee