import React, {useState} from 'react'
import { option } from '../../../../common/utils/common_var'
import SubSidebar from '../../common/sub_sidebar/SubSidebar'


function LibrarySidebar(props) {
  return (
    <section className='sub-sidebar-container'>
    <ul>
        {
          Object.keys(option).map((key, index) => {
            return (
              <SubSidebar
              key={key}
              id={key}
              index={index}
              onClickCategory={props.onClickCategory}
              value={option[key]}/>
            )
          })
        }
    </ul>
    </section>
  )
}

export default LibrarySidebar