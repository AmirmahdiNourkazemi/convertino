import React from 'react'
import '../css/loading.css'
function Loading() {
  return (
   /* From Uiverse.io by jeremyssocial */ 
<div class="hacker-loader">
  <div class="loader-text">
    <span data-text="در حال اماده سازی" class="text-glitch" >در حال آماده سازی</span>
  </div>
  <div class="loader-bar">
    <div class="bar-fill"></div>
    <div class="bar-glitch"></div>
  </div>
  <div class="particles">
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
  </div>
</div>

  )
}

export default Loading