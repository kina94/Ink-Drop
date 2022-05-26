import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

function ChartView(props) {
  //데이터 관련 정의

  const [countBook, setCountBook] = useState()

  const endDate = props.completeBooks.map(item => {
    return item.endDate
  })
  const year = endDate.map(item => item.split('-')[0])
  const uniqueYear = [...new Set(year)]

  // 차트에 삽입할 월별 권수 배열 만들기
  const getCountBooks = (year) => {
    const month = endDate.filter(item => item.includes(year))
      .map(item => item.split('-').splice(1, 1).join())
    const data = new Array(11).fill(0)
    month.map(item => {
      data[Number(item) - 1]++
    })
    return data
  }

  //select 박스 변화 감지
  const onChangeYear = (e) => {
    const data = getCountBooks(e.target.value)
    setCountBook(data)
  }

  //react-chartjs-2 관련 정의
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
  );


  const labels = ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'];

  const chartData = {
    labels,
    datasets: [
      {
        label: '읽은 책(권)',
        data: countBook ? countBook : getCountBooks(new Date().getFullYear()),
        backgroundColor: 'rgba(79, 60, 204, 0.9)',
      },
    ],
  };

  const options = {
    reponsive: true,
    scales: {
      y: {
        suggestedMax: Math.max(...chartData.datasets[0].data) + 1,
        ticks: {
          stepSize: 1,
        }
      }
    }
  }


  return (
    <section className='chart-view'>
      <div className='title'>
        <i id='icon' className="fas fa-chart-bar"></i>
        {props.userInfo.userName}님의 독서 차트
          <select name='year' onChange={onChangeYear}>
            {
              uniqueYear.map(year => {
                return <option key={year} value={year}>{year}</option>
              })
            }
          </select>
      </div>
      <Bar options={options} data={chartData} />
    </section>
  )
}

export default ChartView
