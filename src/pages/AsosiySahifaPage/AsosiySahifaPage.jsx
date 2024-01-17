import React from 'react'
import ImgAsosiy from './Group 72.jpg'
import "./style.scss"
export default function AsosiySahifaPage() {
  return (
    <div className="asosiysahifa">
      <div className='asosiysahifa_title'>
        «IT sohasi bu – bugun va kelajak. Uni yaxshi o‘rgangan odam juda yaxshi yashaydi» - Komil Allamjonov
      </div>
      <div className='asosiysahifa_img'>
        <img src={ImgAsosiy} alt="jpg" />
      </div>
    </div>
  )
}
