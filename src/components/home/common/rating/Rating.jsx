import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './Rating.css'

function Rating(props) {
    const isModifyMode = useSelector(store => store.toggleStore.modifyToggle)
    const isModalShow = useSelector(store => store.toggleStore.modalToggle)
    const initStars = new Array(5).fill(false)
    const savedStars = initStars.fill(true, 0, props.stars)
    const [clicked, setClicked] = useState(props.book && props.stars!=undefined ? savedStars : initStars)

    const handleStarClick = (index) => {
        let update = [...clicked]
        for (let i = 0; i < 5; i++) {
            update[i] = i <= index ? true : false;
        }
        setClicked(update)
    }

    useEffect(()=>{
        if(!isModifyMode){
            setClicked(savedStars)
        }
    },[props.book])

    useEffect(() => {
        props.handleRate && props.handleRate(clicked.filter(item => item == true).length)
    }, [clicked])

    useEffect(() => {
        if (!isModifyMode) {
            props.handleRate && setClicked(new Array(5).fill(false))
        }
    }, [isModalShow])

    return (
        <ul className='rate'>
            {
                clicked.map((item, index) => {
                    return (
                        <li
                            key={index}
                            onClick={props.onClick ? props.onClick : () => handleStarClick(index)}
                            className={clicked[index] ? 'star yellowStar' : 'star normalStar'}>
                            <i id='rate-star' className="fas fa-star"></i>
                        </li>
                    )
                })
            }
            <p>
                {`(${clicked.filter(item => item == true).length}점/5점)`}
            </p>
        </ul>
    )
}

export default Rating