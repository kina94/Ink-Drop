import React, {useState} from 'react'
import { option } from '../../../common/utils/common_var'
import SubSidebar from '../../home/layout/sub_sidebar/SubSidebar'


function LibrarySidebar(props) {
  return (
    <>
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
    </>
  )
}

export default LibrarySidebar