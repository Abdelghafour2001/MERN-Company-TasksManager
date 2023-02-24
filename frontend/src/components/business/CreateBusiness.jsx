import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createBusiness } from '../../features/business/businessSlice';
import { Modal } from '../';
import { briefcaseIcon, closeIcon, plusIcon } from '../../constance/icons';

const CreateBusiness = ({ company }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [business, setBusiness] = useState({
        name: '',
        type: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phoneNumber: '',
        workHours: '',
        companyId: company._id
    });

    const [positions, setPositions] = useState([
        {
            title: '',
            color: '#2a74d3',
        },
        {
            title: '',
            color: '#2a74d3',
        },
        {
            title: '',
            color: '#2a74d3',
        },
    ]);

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const onSubmit = () => {
        if(business.name && business.type && business.address && business.city && business.state && business.zip) {
            if (user) {
                const data = {
                    ...business,
                    positions: positions.filter(position => position.title.length > 0)
                }

                dispatch(createBusiness(data));
                setBusiness({
                    name: '',
                    type: '',
                    address: '',
                    city: '',
                    state: '',
                    zip: '',
                    phoneNumber: '',
                    workHours: '',
                    positions: [],
                    companyId: company._id
                });
                setIsModalOpen(false);
            }
        } else {
            toast.error('Please fill out all fields');
        }
    }

    const onChange = (e) => {
        setBusiness({
            ...business,
            [e.target.name]: e.target.value
        });
    }

    return (
        <>
        <Modal
            setModalIsOpen={setIsModalOpen}
            modalIsOpen={isModalOpen}
            actionBtnText="Create"
            contentLabel={'Add Business to ' + company.name}
            onSubmit={onSubmit}
        > 
            <div className="form-group-row">
                <div className="form-group">
                    <label>Name *</label>
                    <input
                        type="text"
                        placeholder="Name of business"
                        name="name"
                        value={business.name}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Type *</label>
                    <input
                        type="text"
                        placeholder="Type of business"
                        name="type"
                        value={business.type}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className="form-group-row">
                <div className="form-group">
                    <label>Address *</label>
                    <input
                        type="text"
                        placeholder="Address"
                        name="address"
                        value={business.address}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>City *</label>
                    <input
                        type="text"
                        placeholder="City"
                        name="city"
                        value={business.city}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className="form-group-row">
                <div className="form-group">
                    <label>State *</label>
                    <input
                        type="text"
                        placeholder="State"
                        name="state"
                        value={business.state}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Zip *</label>
                    <input
                        type="text"
                        placeholder="Zip code"
                        name="zip"
                        value={business.zip}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className="form-group-row">
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        placeholder="Phone number"
                        name="phoneNumber"
                        value={business.phoneNumber}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Work Hours</label>
                    <input
                        type="text"
                        placeholder="07:00 - 17:00"
                        name="workHours"
                        value={business.workHours}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className="flex align-between p-1 border-bottom">
                <p className="title-4">Positions</p>
                <div 
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                        setPositions([
                            ...positions,
                            {
                                title: '',
                                color: '#2a74d3',
                            }
                        ]);
                    }}
                >
                    Add More
                </div>
            </div>
            {positions.map((position, index) => (
                <div key={`position-count-${index}`} className="form-group-row">
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="Position title"
                            name="position"
                            value={position.title ? position.title : ''}
                            onChange={(e) => {
                                positions[index].title = e.target.value;
                                setPositions([...positions]);
                            }}
                        />
                    </div>
                    <div className="flex">
                        <div className="form-group w-100">
                            <div className="flex align-between">
                                <label>Color</label>
                            </div>
                            <input
                            className="w-100"
                                type="color"
                                name="color"
                                value={position.color}
                                onChange={(e) => {
                                    positions[index].color = e.target.value;
                                    setPositions([...positions]);
                                }}
                            />
                        </div>
                        <div className="flex align-center">
                            <div 
                                className="btn-icon btn-icon-danger" 
                                title={`Remove ${position.title} position`}
                                onClick={() => {
                                    setPositions([
                                        ...positions.slice(0, index),
                                        ...positions.slice(index + 1)
                                    ]);
                                }}
                            >
                                {closeIcon}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Modal>
        <section className="btn btn-outline" onClick={() => { setIsModalOpen(true) }}>
            {briefcaseIcon}
            <span>Add Business</span>
        </section>
        </>
    )
}

export default CreateBusiness