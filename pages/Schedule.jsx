import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserShifts } from '../features/shift/shiftSlice';
import { ShiftsTable, UserOpenShifts, Card } from '../components';

const Schedule = () => {
    const [ isCardOpen, setIsCardOpen] = useState(false);
    const [ isCard2Open, setIsCard2Open] = useState(true);
    const { userShifts, isLoading } = useSelector(state => state.shift);
    const { company } = useSelector(state => state.company);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const userShiftsFiltred = 
        useSelector(state => state.shift.userShifts)
            ?.filter(shift => (shift.employee != null || shift.acceptedBy))
            ?.filter(shift => (
                shift?.employee?.user === user._id ||
                shift?.acceptedBy === user._id
                ));
    const userOpenShifts = 
        useSelector(state => state.shift.userShifts)
            ?.filter(shift => (shift.employee === null && (!shift.acceptedBy || shift.acceptedBy === null)));

    useEffect(() => {
        dispatch(getUserShifts());
    }, []);

    return (
        <section>
            {!isLoading && userShifts && company && (
                <>
                    <Card 
                        title={`Open Shifts ${userOpenShifts.length}`}
                        isOpen={isCardOpen}
                        setIsOpen={setIsCardOpen}
                    >
                        <ShiftsTable shifts={userOpenShifts} isOpenShift={true}/>
                    </Card>
                    <Card 
                        title={`Your Shifts ${userShiftsFiltred.length}`}
                        isOpen={isCard2Open}
                        setIsOpen={setIsCard2Open}
                    >
                        <ShiftsTable shifts={userShiftsFiltred} isOpenShift={false}/>
                    </Card>
                </>
            )}
            {isLoading && (
                <Card title={'Loading Shedule ...'} isOpen={false} className={'blink'}/>
            )}
        </section>
    )
}

export default Schedule