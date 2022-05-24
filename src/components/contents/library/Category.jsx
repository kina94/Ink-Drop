import React, {useState} from 'react'
import { option } from '../../../common/utils/common_var'


function Category(props) {
  return (
    <section className='button-container'>
        {
          Object.keys(option).map((key, index) => {
            return (
              <button className="category"
                key={index}
                id={key}
                onClick={props.onClickCategory}>
                {option[key]}
                <i id='icon' className="fa-solid fa-angle-right"></i>
              </button>
            )
          })
        }
    </section>
  )
}

export default Category