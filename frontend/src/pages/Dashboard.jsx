import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalMessage, Card, ShiftsTable } from '../components';
import { getSenderGlobalMessage } from '../features/globalMessage/globalMessageSlice';
import { getManagerOpenShifts } from '../features/shift/shiftSlice';

const Dashboard = () => {
    const [ isCardOpen, setIsCardOpen] = useState(true);
    const globalMessage = useSelector(state => state.globalMessage);
    const { userShifts, isLoading } = useSelector(state => state.shift);
    const { company } = useSelector(state => state.company);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSenderGlobalMessage());
        dispatch(getManagerOpenShifts());
    }, []);

    return (
        <section className="dashboard">
            {!isLoading ? (
                <GlobalMessage />
            ) : (
                <Card title={'Loading Messages ...'} isOpen={false} className={'blink'}/>
            )}
            
            {!isLoading && userShifts && company && (
                <>
                <Card 
                    title={`Open Shifts (${userShifts?.length})`}
                    isOpen={isCardOpen}
                    setIsOpen={setIsCardOpen}
                >
                    <ShiftsTable shifts={userShifts ? userShifts : null} isOpenShift={false}/>
                </Card>
                </>
            )}
            {isLoading && (
                <Card title={'Loading Open Shifts ...'} isOpen={false} className={'blink'}/>
            )}
        </section>
    )
}

export default Dashboard;