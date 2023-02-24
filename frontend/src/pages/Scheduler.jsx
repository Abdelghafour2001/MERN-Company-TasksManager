import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Calender, Nav } from "../components";
import "react-datepicker/dist/react-datepicker.css";
import '../components/calender/styles/Calender.css';


const Scheduler = () => {
    const { company } = useSelector(state => state.company);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if((!id || id === 'undefined') && company) {
            navigate(`/scheduler/${company.businesses[0]._id}`);
        }
    }, [company, navigate]);

    return (
        <>
        <section>
            {id && company && company.businesses && (
                <div className="calender">
                    <Nav/>
                    <DndProvider backend={HTML5Backend}>
                        <Calender />
                    </DndProvider>
                </div>
            )}
        </section>
        </>
    )
}

export default Scheduler;