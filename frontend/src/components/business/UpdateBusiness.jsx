import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateBusiness, deleteBusiness } from '../../features/business/businessSlice';
import { closeIcon, editIcon } from '../../constance/icons';
import { Modal } from '../';


const UpdateBusiness = ({ business }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [updatedBusiness, setUpdatedBusiness] = useState(business);
    const dispatch = useDispatch();

    const businessPositions = business.positions;
    const businessShiftPresets = business.shiftPresets;

    const [positions, setPositions] = useState(businessPositions ? businessPositions : [
        {
            title: '',
            color: '#2a74d3',
        }
    ]);

    const [shiftPresets, setShiftPresets] = useState(businessShiftPresets ? [
        ...businessShiftPresets,
        {
            label: '',
            startTime: '',
            endTime: '',
        }
    ] : [
        {
            label: '',
            startTime: '',
            endTime: '',
        }
    ]);

    const onChange = (e) => {
        setUpdatedBusiness({
            ...updatedBusiness,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = () => {
        if(updatedBusiness.name && updatedBusiness.address && updatedBusiness.city && updatedBusiness.state && updatedBusiness.zip && updatedBusiness.type) {
            const data = {
                ...updatedBusiness,
                positions: positions.filter(position => position.title.length > 0),
                shiftPresets: shiftPresets.filter(shiftPreset => shiftPreset.startTime.length > 0 && shiftPreset.endTime.length > 0)
            }
            dispatch(updateBusiness(data));
            setIsModalOpen(false);
        } else {
            toast.error('Please fill out all fields');
        }
    }

    const onSubmitDelete = () => {
        dispatch(deleteBusiness(updatedBusiness._id));
        setIsModalOpen(false);
        setIsDeleteModalOpen(false);
    }

    return (
        <>
        <Modal
            setModalIsOpen={setIsModalOpen}
            modalIsOpen={isModalOpen}
            actionBtnText="Update"
            contentLabel={`Update ${business.name}`}
            onSubmit={onSubmit}
            actionDangerBtnText="Delete"
            onSubmitDanger={() => setIsDeleteModalOpen(true)}
        > 
            <div className="flex align-between py-1 border-bottom">
                <h5 className="title-3 text-headline">Business Info</h5>
            </div>
            <div className="form-group-row">
                <div className="form-group">
                    <label>Name *</label>
                    <input
                        type="text"
                        placeholder="Name of business"
                        name="name"
                        value={updatedBusiness.name}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Type *</label>
                    <input
                        type="text"
                        placeholder="Type of business"
                        name="type"
                        value={updatedBusiness.type}
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
                        value={updatedBusiness.address}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>City *</label>
                    <input
                        type="text"
                        placeholder="City"
                        name="city"
                        value={updatedBusiness.city}
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
                        value={updatedBusiness.state}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Zip *</label>
                    <input
                        type="text"
                        placeholder="Zip code"
                        name="zip"
                        value={updatedBusiness.zip}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className="form-group-row">
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        placeholder="Phone number"
                        name="phoneNumber"
                        value={updatedBusiness.phoneNumber}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Work Hours</label>
                    <input
                        type="text"
                        placeholder="07:00 - 17:00"
                        name="workHours"
                        value={updatedBusiness.workHours}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className="flex align-between py-1 border-bottom">
                <h5 className="title-3 text-headline">Positions</h5>
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
                            value={position.title}
                            onChange={(e) => {
                                setPositions([
                                        ...positions.slice(0, index),
                                        {
                                            ...position,
                                            title: e.target.value
                                        },
                                        ...positions.slice(index + 1)
                                ]);
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
                                    setPositions([
                                        ...positions.slice(0, index),
                                        {
                                            ...position,
                                            color: e.target.value
                                        },
                                        ...positions.slice(index + 1)
                                    ]);
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
            <div className="flex align-between py-1 border-bottom">
                <h5 className="title-3 text-headline">Shift Presets</h5>
                <div 
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                        setShiftPresets([
                            ...shiftPresets,
                            {
                                startTime: '',
                                endTime: '',
                            }
                        ]);
                    }}
                >
                    Add More
                </div>
            </div>
            {shiftPresets.map((shiftPreset, index) => (
                <div key={`position-count-${index}`} className="form-group-row">
                    <div className="form-group">
                        <label>Label</label>
                        <input
                            type="text"
                            name="label"
                            placeholder="Opening shift"
                            value={shiftPreset.label}
                            onChange={(e) => {
                                setShiftPresets([
                                        ...shiftPresets.slice(0, index),
                                        {
                                            ...shiftPreset,
                                            label: e.target.value
                                        },
                                        ...shiftPresets.slice(index + 1)
                                ]);
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Start</label>
                        <input
                            type="time"
                            name="startTime"
                            value={shiftPreset.startTime}
                            onChange={(e) => {
                                setShiftPresets([
                                        ...shiftPresets.slice(0, index),
                                        {
                                            ...shiftPreset,
                                            startTime: e.target.value
                                        },
                                        ...shiftPresets.slice(index + 1)
                                ]);
                            }}
                        />
                    </div>
                    <div className="flex">
                        <div className="form-group w-100">
                                <label>End</label>
                                <input
                                    type="time"
                                    name="endTime"
                                    value={shiftPreset.endTime}
                                    onChange={(e) => {
                                        setShiftPresets([
                                            ...shiftPresets.slice(0, index),
                                            {
                                                ...shiftPreset,
                                                endTime: e.target.value
                                            },
                                            ...shiftPresets.slice(index + 1)
                                        ]);
                                    }}
                                />
                        </div>
                        <div className="flex align-center">
                            <div 
                                className="btn-icon btn-icon-danger" 
                                title={`Remove preset`}
                                onClick={() => {
                                    setShiftPresets([
                                        ...shiftPresets.slice(0, index),
                                        ...shiftPresets.slice(index + 1)
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
        <Modal
            setModalIsOpen={setIsDeleteModalOpen}
            modalIsOpen={isDeleteModalOpen}
            contentLabel={`Are you sure, you want to delete ${business.name}?`}
        >
            <div className="form-group-row">
                <div className="form-group">
                    <div
                        className="btn btn-primary"
                        onClick={() => setIsDeleteModalOpen(false)}
                    >Cancel</div>
                </div>
                <div className="form-group">
                    <div 
                        className="btn btn-danger"
                        onClick={onSubmitDelete}
                    >Delete</div>
                </div>
            </div>
        </Modal>
        <div 
            className="btn-icon"
            onClick={() => setIsModalOpen(true)}
        >
            {editIcon}
        </div>
        </>
    )
}

export default UpdateBusiness