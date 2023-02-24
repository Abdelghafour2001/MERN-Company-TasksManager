import { useState } from'react';

const Zoom = () => {
    const [zoom, setZoom] = useState('1');

    const onChangeZoom = (e) => {
        const calenderBody = document.querySelector('.calender-body');
        calenderBody.style.zoom = e.target.value;
        setZoom(e.target.value);
    }
    return (
        <div className="zoom-calender">
            <div className="zoom-calender-handler" title="Zoom in/out">
                <input type="range" min="0.25" max="1" step="0.05" value={zoom} onChange={onChangeZoom}/>
            </div>
        </div>
    )
}

export default Zoom