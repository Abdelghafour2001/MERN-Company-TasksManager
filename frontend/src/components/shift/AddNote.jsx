import { useState } from 'react';
import { EditShift } from '../';
import { countTotalShiftHours } from '../../constance/helpers';

const AddNote = ({ shift }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    return (
        <>
            <div onClick={() => setModalIsOpen(true)} className="btn btn-outline btn-sm">
                Edit
            </div>
            <EditShift
                shift={shift}
                employee={shift.employee}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
            />
        </>
    )
}

export default AddNote