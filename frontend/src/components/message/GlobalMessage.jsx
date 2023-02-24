import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '../';
import { MessageTable, CreateMessage } from '../';
import "./styles/GlobalMessage.css";

const GlobalMessage = () => {
    const [ isCardOpen, setIsCardOpen] = useState(false);
    const { globalMessagesSender } = useSelector(state => state.globalMessage);

    return (
        <>
        <Card 
            title={`Global Messages (${globalMessagesSender?.length})`}
            isOpen={isCardOpen}
            setIsOpen={setIsCardOpen}
        >
            <div className="flex align-between px-1">
                <p className="title-3">
                    Your Active Messages
                </p>
                <CreateMessage/>
            </div>
            <MessageTable />
        </Card>
        </>
    )
}

export default GlobalMessage