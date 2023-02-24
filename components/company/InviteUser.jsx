import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../';
import { toast } from 'react-toastify';
import { customSelectModalStyles } from '../../constance/localData';
import { createInvite } from '../../features/invite/inviteSlice';
import { userIcon } from '../../constance/icons';

const InviteUser = ({company}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const onSubmit = () => {
        if(email && company) {
            dispatch(createInvite({
                receiver: email,
                company: company._id,
                to: 'user'
            }));
            setIsModalOpen(false);
        } else {
            toast.error('Please fill all fields');
        }
    };

    return (
        <>
        <Modal
            setModalIsOpen={setIsModalOpen}
            modalIsOpen={isModalOpen}
            actionBtnText="Invite"
            contentLabel={`Invite to ${company.name}`}
            onSubmit={onSubmit}
        >
            <div className="employee-form">
                <div className="form-group-row">
                    <div className="form-group">
                        <label>Email *</label>
                        <input 
                            type="email" 
                            name="email"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Enter user's email" />
                    </div>
                </div>
            </div>
        </Modal>
        <section className="btn btn-primary ml-1 flex-grow-1" onClick={() => { setIsModalOpen(true) }}>
            {userIcon}
            <p>Invite User</p>
        </section>
        </>
    )
}

export default InviteUser