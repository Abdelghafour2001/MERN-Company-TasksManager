import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getTrainings } from "../features/training/trainingSlice";
import { CreateTraining, TrainingCard, Card } from "../components";


const Training = () => {
    const dispatch = useDispatch();
    const location = useLocation().pathname.split("/")[1];
    const { company } = useSelector(state => state.company);
    const { userEmployees } = useSelector(state => state.employee);
    const { trainings, isLoading } = useSelector(state => state.training); 


    useEffect(() => {
        if(location === 'dashboard' && company) {
            const query = `?company=${company._id}`;
            dispatch(getTrainings(query));
        } else if (location === 'user' && company) {
            const query = `?company=${company._id}?position=${userEmployees.map(employee => employee.position).join(',')}`;
            dispatch(getTrainings(query));
        }
    }, [company]);


    return (
        <section className="training-page">
            {location === 'dashboard' && company && (
                <CreateTraining />
            )}
            {!isLoading ?
                trainings && trainings.map((training, index) => (
                    <TrainingCard key={`${training._id}-${index}`} training={training} />
                ))
            : 
                <Card title={'Loading Training...'} isOpen={false} className={'blink'} />
            }
        </section>
    )
}

export default Training