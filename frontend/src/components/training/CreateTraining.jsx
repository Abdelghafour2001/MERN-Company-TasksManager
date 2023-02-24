import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "../";
import Select from 'react-select';
import { toast } from "react-toastify";
import { createTraining } from "../../features/training/trainingSlice";
import { customSelectModalStyles, weekDaySelectOptions } from '../../constance/localData';
import './styles/CreateTraining.css';
import { closeIcon } from "../../constance/icons";

const CreateTraining = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(true);
    const { company } = useSelector(state => state.company);
    const [training, setTraining] = useState({
        title: '',
        positions: [],
    });
    const [sections, setSections] = useState([{
        title: '',
        description: '',
        items: [{
            title: '',
            description: '',
            image: '',
            video: '',
        }],
    }]);

    const positionsSelect = []

    company
    ?.businesses
    ?.map(business => 
        business
        ?.positions
        ?.map((position, index) => {
            if(positionsSelect.find(item => item.value === position.title)) {
                return null;
            } else {
                positionsSelect.push({
                    value: position.title,
                    label: position.title
                })
            }
        }))


    const onSubmit = () => {
        if(training.title && training.positions.length) {
            const data = {
                title: training.title,
                positions: training.positions.map(position => position.value),
                sections,
                company: company._id,
            }

            dispatch(createTraining(data))
        }
    }

    return (
        <Card
            title={'Create Training'}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <div className="create-training">
                <h5 className="title-4 p-3 mb-1 border-bottom">
                    Training Info.
                </h5>
                <div className="form-group-row">
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            autoComplete="off"
                            placeholder="Training title"
                            onChange={e => setTraining({ ...training, title: e.target.value })}
                            value={training.title}
                        />
                    </div>
                    <div className="form-group">
                        <label>Positions</label>
                        <Select
                            isMulti
                            options={positionsSelect}
                            styles={customSelectModalStyles}
                            value={training.positions}
                            onChange={e => setTraining({ ...training, positions: e })}
                        />
                    </div>
                </div>
                <div className="flex align-between border-bottom p-3 mx-1">
                    <h5 className="title-4 p-3">
                        Sections
                    </h5>
                    <div 
                        className="btn btn-outline btn-sm"
                        onClick={() => setSections([...sections, {
                            title: '',
                            description: '',
                            items: [{
                                title: '',
                                description: '',
                                image: '',
                                video: '',
                            }],
                        }])}
                    >
                        Add Section
                    </div>
                </div>
                <div className="mt-1 text-box">
                {sections.length > 0 && (
                    sections.map((section, index) => (
                        <div key={`creata-section-${index}`}>
                            <div className="flex align-between border-bottom p-1">
                                <div className="title-3 text-headline">
                                    {section.title ? section.title : 'Section ' + (index + 1)}
                                </div>
                                <div className="btn btn-outline btn-sm" onClick={() => setSections([
                                    ...sections.slice(0, index),
                                    ...sections.slice(index + 1),
                                ])}>
                                    Remove Section
                                </div>
                            </div>
                            <div className="form-group-row">
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Section title"
                                        onChange={e => setSections([...sections.slice(0, index), { ...section, title: e.target.value }, ...sections.slice(index + 1)])}
                                        value={section.title}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Section description"
                                        onChange={e => setSections([...sections.slice(0, index), { ...section, description: e.target.value }, ...sections.slice(index + 1)])}
                                        value={section.description}
                                    />
                                </div>
                            </div>
                            <div className="flex align-between border-bottom p-3 mx-1">
                                <h5 className="title-4">
                                    Item
                                </h5>
                                <div 
                                    className="btn btn-outline btn-sm"
                                    onClick={() => setSections([
                                        ...sections.slice(0, index),
                                        {
                                            ...section,
                                            items: [
                                                ...section.items,
                                                {
                                                    title: '',
                                                    description: '',
                                                    image: '',
                                                    video: '',
                                                }
                                            ]
                                        },
                                    ])}
                                >
                                    Add Item
                                </div>
                            </div>
                            {section.items.map((item, index) => (
                                <div key={`create-section-item-${index}`} className="training-section-item">
                                    <div className="flex align-between px-1 border-bottom pb-1">
                                        <div className="title-4">
                                            {item.title ? item.title : 'Item ' + (index+1) }
                                        </div>
                                        <div className="btn btn-outline btn-sm" onClick={() => setSections([
                                            ...sections.slice(0, index),
                                            {
                                                ...section,
                                                items: [
                                                    ...section.items.slice(0, index),
                                                    ...section.items.slice(index + 1)
                                                ]
                                            },
                                            ...sections.slice(index + 1)
                                        ])}>
                                            Remove
                                        </div>
                                    </div>
                                    <div className="form-group-row">
                                        <div className="form-group">
                                            <label>Title</label>
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                placeholder="Item title"
                                                onChange={e => setSections([...sections.slice(0, index), { ...section, items: [...section.items.slice(0, index), { ...item, title: e.target.value }, ...section.items.slice(index + 1)] }, ...sections.slice(index + 1)])}
                                                value={item.title}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Description</label>
                                            <textarea
                                                type="text"
                                                autoComplete="off"
                                                placeholder="Item description"
                                                onChange={e => setSections([...sections.slice(0, index), { ...section, items: [...section.items.slice(0, index), { ...item, description: e.target.value }, ...section.items.slice(index + 1)] }, ...sections.slice(index + 1)])}
                                                value={item.description}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group-row">
                                        <div className="form-group">
                                            <label>Image</label>
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                placeholder="Place image url"
                                                onChange={e => setSections([...sections.slice(0, index), { ...section, items: [...section.items.slice(0, index), { ...item, image: e.target.value }, ...section.items.slice(index + 1)] }, ...sections.slice(index + 1)])}
                                                value={item.image}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Video</label>
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                placeholder="Place youtube video url"
                                                onChange={e => setSections([...sections.slice(0, index), { ...section, items: [...section.items.slice(0, index), { ...item, video: e.target.value }, ...section.items.slice(index + 1)] }, ...sections.slice(index + 1)])}
                                                value={item.video}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                )}
                </div>
                <div 
                    className="btn btn-primary mt-1"
                    onClick={onSubmit}
                >
                    Create
                </div>
            </div>
        </Card>
    )
}

export default CreateTraining