import React from 'react'
import './LoadingSpinner.css'

function LoadingSpinner() {
    return (
        <>
        <div className='back'></div>
        <div className='loading'>
            <div className="sk-chase">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
            </div>
            <p>Loading</p>
        </div>
        </>
    )
}

export default LoadingSpinner