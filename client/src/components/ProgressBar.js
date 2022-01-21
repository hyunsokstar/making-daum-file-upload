import React from 'react'
import './ProgressBar.css'


function ProgressBar({ percent }) {
    return (
        <div className="progress-bar-container" >
            <div className='progress-bar' style={{width: percent+"%"}}>
               {percent}
            </div>
        </div>
    )
}

export default ProgressBar

