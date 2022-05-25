import React from 'react'
import SubSidebar from '../../layout/sub_sidebar/SubSidebar'

function HistorySidebar(props) {
    const menu = {
        'calendar': '달력',
        'chart': '독서 차트',
    }
    return (
        <div>
            {
                Object.keys(menu).map((key, index) => {
                    return <SubSidebar
                    key={index}
                    index={index}
                    id={key}
                    value={menu[key]}
                    onClickCategory={props.onClickCategory}
                    />
                })
            }
        </div>
    )
}

export default HistorySidebar