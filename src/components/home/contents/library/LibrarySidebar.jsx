import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'
import { option } from '../../../../common/utils/common_var'
import SubSidebar from '../../common/sub_sidebar/SubSidebar'


function LibrarySidebar(props) {
  const location = useLocation()
  return (
    <section className={`sub-sidebar-container ${location.pathname!='/home/library' ? 'hide' : ''}`}>
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