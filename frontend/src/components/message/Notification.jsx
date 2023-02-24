import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MessageCard, Sidenav } from '../';
import { bellIcon } from '../../constance/icons';

const Notification = () => {
    const [isSidenavOpen, setIsSidenavOpen] = useState(false);
    const { globalMessages } = useSelector(state => state.globalMessage);

    return (
        <>
            <Sidenav
                setIsSidenavOpen={setIsSidenavOpen}
                isSidenavOpen={isSidenavOpen}
                title={`Notifications`}
            >
                <div>
                    {globalMessages && (globalMessages.companyGlobalMessage.length === 0 && globalMessages.businessGlobalMessage.length === 0) ? (
                        <p>
                            You have no notifications
                        </p>
                    ) : globalMessages && (
                        <div>
                            {globalMessages.companyGlobalMessage?.map(message => (
                                <MessageCard key={message._id} message={message}/>
                            ))}
                            {globalMessages.businessGlobalMessage?.map(message => (
                                <MessageCard key={message._id} message={message}/>
                            ))}
                        </div>
                    )}
                </div>
            </Sidenav>
            <li className="notification" onClick={() => setIsSidenavOpen(true)}>
                <a className="flex align-center">
                    {bellIcon}
                    {globalMessages && (globalMessages.companyGlobalMessage.length !== 0 || globalMessages.businessGlobalMessage.length !== 0) && (
                        <div className="count">
                            {+globalMessages?.companyGlobalMessage?.length + +globalMessages?.businessGlobalMessage?.length}
                        </div>
                    )}
                </a>
            </li>
        </>
    )
}

export default Notification