import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editUser } from '../features/auth/authSlice';
import './styles/Profile.css';

const Profile = () => {
    const { company } = useSelector(state => state.company);
    const { userEmployees } = useSelector(state => state.employee);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber ? user.phoneNumber : '');
    const [showNameInput, setShowNameInput] = useState(false);
    const [showLastNameInput, setShowLastNameInput] = useState(false);
    const [showPhoneNumberInput, setShowPhoneNumberInput] = useState(false);

    return (
        <section className="profile-page">
            {user && company && (
            <div className="profile-container flex">
                <div className="profile-img">
                    <img src={user.profilePicture ? user.profilePicture : '	https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} alt="profile" />
                </div>
                <div className="profile-info w-100">
                    <div className="mb-1">
                        <div className="profile-name flex">
                            {!showNameInput ? (
                                <h1 className="title-2 mr-1" onClick={() => setShowNameInput(true)}>{user.firstName}</h1>
                            ) : (
                                <>
                                    <input 
                                        type="text"
                                        value={firstName}
                                        name="firstName"
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="Enter your first name"
                                    />
                                </>
                            )}
                            {!showLastNameInput ? (
                                <h1 className="title-2" onClick={() => setShowLastNameInput(true)}>{user.lastName}</h1>
                            ) : (
                                <>
                                    <input 
                                        type="text"
                                        value={lastName}
                                        name="lastName"
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Enter your first name"
                                    />
                                </>
                            )}
                        </div>
                        <h3 className="title-3 text-secondary">{user.email}</h3>
                        {!showPhoneNumberInput ? (
                            <p className="mt-1" onClick={() => setShowPhoneNumberInput(true)}>{user.phoneNumber ? `Phone: ${user.phoneNumber}` : 'Add phone number'}</p>
                        ) : (
                            <>
                                <input 
                                    type="tel"
                                    value={phoneNumber}
                                    className="mt-1"
                                    name="phoneNumber"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Enter your phone number"
                                />
                            </>
                        )}
                        {(showNameInput || showLastNameInput || showPhoneNumberInput) && (
                        <div className="flex flex-end">
                            <div
                            className="btn btn-outline mr-1"
                            onClick={() => {
                                setFirstName(user.firstName);
                                setLastName(user.lastName);
                                setPhoneNumber(user.phoneNumber);
                                setShowNameInput(false);
                                setShowLastNameInput(false);
                                setShowPhoneNumberInput(false);
                            }}>
                                Cancel
                            </div>
                            <div 
                                className="btn btn-primary"
                                onClick={() => {
                                    dispatch(editUser({
                                        firstName,
                                        lastName,
                                        phoneNumber
                                    }));
                                    setShowNameInput(false);
                                    setShowLastNameInput(false);
                                    setShowPhoneNumberInput(false);
                                }}
                            >
                                Save
                            </div>
                        </div>
                        )}
                    </div>
                    <div className="user-info">
                        <div className="user-info-item py-1 border-bottom">
                            <div>
                                <span className="text-secondary text-headline">
                                    Company
                                </span>
                                <div className="title-3 mt-4 ml-1">
                                    {company.name}
                                </div>
                                <div className="title-4 ml-1 text-secondary">
                                    {company.email}
                                </div>
                            </div>
                        </div>
                        <div className="user-info-item py-1 border-bottom">
                            <div>
                                <span className="text-secondary text-headline">
                                    Works at
                                </span>
                                {userEmployees?.length > 0 ? (
                                    <div className="title-4 mt-4 ml-1">
                                        {userEmployees.map((employee, index) => (
                                            <p key={index}>{employee.business?.name}</p>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No businesses</p>
                                )}
                            </div>
                        </div>
                        <div className="user-info-item">
                            <div>
                                <span className="text-secondary text-headline">
                                    Manager of
                                </span>
                                {userEmployees?.length > 0 ? (
                                    <div className="title-4 mt-4 ml-1">
                                        {userEmployees.map((employee, index) => (
                                            employee.isManager && 
                                            <p key={index}>{employee.business.name}</p>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No businesses</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </section>
    )
}

export default Profile