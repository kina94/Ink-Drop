import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { option } from '../../../../common/utils/common_var'
import SubSidebar from '../../common/sub_sidebar/SubSidebar'


function LibrarySidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  // 전체, 읽은책, 읽고 있는 책, 읽고 싶은 책 카테고리 선택
  const onClickCategory = (e) => {
    const id = e.target.closest('li').id
    navigate(`/home/library/${id}`)
    return id
  }
  
  return (
    <section className={`sub-sidebar-container ${location.pathname != '/home/library' ? 'hide' : ''}`}>
      <ul>
        {
          Object.keys(option).map((key, index) => {
            return (
              <SubSidebar
                key={key}
                id={key}
                index={index}
                onClickCategory={onClickCategory}
                value={option[key]} />
            )
          })
        }
      </ul>
    </section>
  )
}

export default LibrarySidebar