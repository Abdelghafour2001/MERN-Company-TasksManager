import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../';
import { createCompany } from '../../features/company/companySlice';
import { createInvite } from '../../features/invite/inviteSlice';
import './styles/CreateCompany.css';

const CreateCompany = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isNew, setIsNew] = useState(false);
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState({
        name: '',
        email: '',
        website: '',
    });

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const onChange = (e) => {
        const { name, value } = e.target;
        setCompany({ ...company, [name]: value });
    };

    const onSubmit = (e) => {
        if(user && isNew) {
            dispatch(createCompany(company));
            // setIsModalOpen(false);
        } else if ( user && !isNew ) {
            dispatch(createInvite({
                receiver: email,
                to: 'company',
            }));
            // setIsModalOpen(false);
        }
    };

    return (
        <>
        <Modal
            setModalIsOpen={setIsModalOpen}
            modalIsOpen={isModalOpen}
            actionBtnText={`${!isNew ? 'Apply' : 'Create'}`}
            contentLabel={'Apply to Company or Create One'}
            onSubmit={onSubmit}
            disableClose={true}
            style={{
                zIndex: '1',
            }}
        >
            <div className="nav-tab-select">
                <p className={`${!isNew ? 'selected' : ''}`} onClick={() => setIsNew(false)}>Apply By Email</p>
                <p className={`${isNew ? 'selected' : ''}`} onClick={() => setIsNew(true)}>Create New</p>
            </div>
            {!isNew ? (
                <div className="form-group">
                    <label>Email *</label>
                    <input 
                        type="email" 
                        placeholder="Company's email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
            ) : (
                <>
                <div className="form-group-row">
                    <div className="form-group">
                        <label>Name *</label>
                        <input 
                            type="text" 
                            placeholder="Company's name" 
                            value={company.name} 
                            name="name"
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label>Email *</label>
                        <input 
                            type="text" 
                            placeholder="Company's email" 
                            value={company.email}
                            name="email"
                            onChange={onChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label>Website</label>
                    <input 
                        type="url"
                        placeholder="Company's website" 
                        value={company.website}
                        name="website"
                        onChange={onChange} />
                </div>
                </>
            )}
        </Modal>
        </>
    )
}

export default CreateCompany