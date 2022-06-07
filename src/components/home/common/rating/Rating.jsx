import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import './Rating.css'
const rateArray = [0,1,2,3,4]
function Rating(props) {
    const isModalShow = useSelector(store=>store.toggleStore.modalToggle)
    const [clicked, setClicked] = useState(new Array(5).fill(false))
    
    const handleStarClick = (index) =>{
        let update = [...clicked]
        for(let i=0; i<5; i++){
            update[i] = i<=index ? true : false;
        }
        setClicked(update)
    }

    useEffect(()=>{
        props.handleRate && props.handleRate(clicked.filter(item=>item==true).length)
    },[clicked])

    useEffect(()=>{
        props.handleRate && setClicked(new Array(5).fill(false))
    },[isModalShow])

    useEffect(()=>{
        props.stars && setClicked(clicked.fill(true, 0, props.stars-1))
    },[])

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