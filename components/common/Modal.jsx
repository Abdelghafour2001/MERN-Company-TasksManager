import { useEffect } from 'react';
import { closeIcon } from '../../constance/icons';
import './styles/Modal.css';

const Modal = ({children, bodyStyles, style, modalIsOpen, contentLabel, setModalIsOpen, actionBtnText, onSubmit, actionDangerBtnText, onSubmitDanger, disableClose}) => {

    const onClickOutside = (e) => {
        if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('modal-wrapper')) {
            if(!disableClose || disableClose === false) {
                setModalIsOpen(false);
            } else {
                console.log('modal is disabled');
            }
        }
    }

    return (
        <>
        {modalIsOpen ? (
        <div className="modal-overlay" onClick={onClickOutside} style={style}>
            <div className="modal-wrapper">
                <div className="modal-body">
                    <div className="modal-header">
                        <h3>{contentLabel}</h3>
                        {disableClose ? null : (
                            <button className="btn-icon btn-icon-danger" onClick={() => {setModalIsOpen(false)} }>
                                {closeIcon}
                            </button>
                        )}
                    </div>
                    <div className="modal-content" style={bodyStyles}>
                        {children}
                    </div>
                    <div className="modal-footer">
                        {actionDangerBtnText && (
                            <button className="btn btn-outline-danger" onClick={onSubmitDanger}>
                                {actionDangerBtnText}
                            </button>
                        )}
                        {actionBtnText && (
                            <button className="btn btn-primary" onClick={onSubmit}>
                                {actionBtnText}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
        ) : null}
        </>
    )
}

export default Modal