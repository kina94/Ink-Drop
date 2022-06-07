import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import './Rating.css'
const rateArray = [0,1,2,3,4]

function Rating(props) {
    const isModifyMode = useSelector(store=>store.toggleStore.modifyToggle)
    const isModalShow = useSelector(store=>store.toggleStore.modalToggle)
    const selectedBook = useSelector(store => store.bookStore.selectedBook)
    const initStars = new Array(5).fill(false)
    const [clicked, setClicked] = useState(initStars)

    const handleStarClick = (index) =>{
        let update = [...clicked]
        for(let i=0; i<5; i++){
            update[i] = i<=index ? true : false;
        }
        setClicked(update)
    }

    useEffect(()=>{
        if(props.stars){
            const savedStars = initStars.fill(true, 0, props.stars)
            setClicked(savedStars)
        }
    },[selectedBook])

    useEffect(()=>{
        props.handleRate && props.handleRate(clicked.filter(item=>item==true).length)
    },[clicked])

    useEffect(()=>{
        if(!isModifyMode){
            props.handleRate && setClicked(new Array(5).fill(false))
        }
    },[isModalShow])

  return (
    <ul className='rate'>
        {
            rateArray.map((rate, index)=>{
                return(
                    <li
                    key={index}
                    onClick={props.onClick ? props.onClick : ()=>handleStarClick(rate)}
                    className={clicked[rate] ? 'star yellowStar' : 'star normalStar'}>
                    <i id='rate-star' className="fas fa-star"></i>
                    </li>
                )
            })
        }
        <p>
        {`(${clicked.filter(item=>item==true).length}점/5점)`}
        </p>
    </ul>
  )
}

export default Rating