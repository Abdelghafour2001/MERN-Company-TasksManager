import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { OwnerProtect } from '../';
import { getInvites, deleteInvite, updateInvite } from '../../features/invite/inviteSlice';
import './styles/Invite.css';

const Invites = () => {
    const dispatch = useDispatch();
    const {invites, invitesSent, invitesCompany, isLoading, isError, isSuccess, msg} = useSelector(state => state.invite);
    const navigate = useNavigate();

    useEffect(() => {
        if(isSuccess && msg !== '') {
            toast.success(msg);
        }
        if(msg === 'Invite accepted successfully') {
            navigate(0);
        }
    }, [isSuccess]);

    useEffect(() => {
        dispatch(getInvites());
    }, []);

    return (
        <>
        {(invites.length !== 0 || invitesSent.length !== 0 || invitesCompany.length !== 0 ) && (
        <section className="invites">
            <h2 className="title-2 px-1">Invites</h2>
            <div className="invites-container">
                {isLoading && <p>Loading...</p>}
                { invites.map(invite => 
                    <div key={`invites-${invite._id}`} className="invite">
                        <div className="invite-left">
                            <p>From {invite.company.email}</p>
                            <p className="title-3">{invite.company.name}</p>
                        </div>
                        <div className="invite-right">
                            <div 
                                className="btn btn-outline-danger"
                                onClick={() => dispatch(updateInvite({_id: invite._id, status: 'rejected'}))}
                            >Reject</div>
                            <div 
                                className="btn btn-outline-primary"
                                onClick={() => dispatch(updateInvite({_id: invite._id, status: 'accepted'}))}
                            >Accept</div>
                        </div>
                    </div>
                )}
                { invitesCompany.map(invite => 
                    <div key={`invites-${invite._id}`} className="invite">
                        <div className="invite-left">
                            <p>From {invite.sender.email}</p>
                            <p>{invite.sender.firstName} {invite.sender.lastName}</p>
                        </div>
                        <div className="invite-right">
                            <div 
                                className="btn btn-outline-danger"
                                onClick={() => dispatch(updateInvite({_id: invite._id, status: 'rejected'}))}
                            >Reject</div>
                            <div 
                                className="btn btn-outline-primary"
                                onClick={() => dispatch(updateInvite({_id: invite._id, status: 'accepted'}))}
                            >Accept</div>
                        </div>
                    </div>
                )}
                <OwnerProtect>
                    { invitesSent.map(invite => 
                        <div key={`invites-${invite._id}`} className="invite">
                            <div className="invite-left">
                                <p>To {invite.receiver}</p>
                            </div>
                            <div className="invite-right">
                                <div
                                    className="btn btn-outline-danger"
                                    onClick={() => {dispatch(deleteInvite(invite._id))}}>Cancel</div>
                            </div>
                        </div>
                    )}
                </OwnerProtect>
            </div>
        </section>
        )}
        </>
    )
}

export default Invites