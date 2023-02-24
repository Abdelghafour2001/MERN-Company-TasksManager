import { arrowTopIcon } from '../../constance/icons'
import './styles/Card.css'

const Card = ({children, title, className, titleStyle, isOpen, setIsOpen}) => {
    return (
        <div className={`card ${className ? className : ''}`}>
            <div 
                style={titleStyle}
                className="card-title flex align-between"
                onClick={() => setIsOpen ? setIsOpen(!isOpen) : null}
            >
                <h3 className="title-2">
                    {title}
                </h3>
                <div className={`open-icon${isOpen ? ' open' : ''}`}>
                    {arrowTopIcon}
                </div>
            </div>
            <div className={`card-body${isOpen ? ' open' : ''}`}>
                {children}
            </div>
        </div>
    )
}

export default Card