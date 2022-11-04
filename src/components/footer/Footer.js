import React from 'react'
import style from "./Footer.module.scss";
const date = new Date();
const year = date.getFullYear();
function Footer() {
  return (
    <div className={style.footer}>&copy; {year} All Right Reserved</div>
  )
}

export default Footer
