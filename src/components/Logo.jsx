import React from 'react'
import {logo} from '../assets/index.js'

function Logo({ side = '50px' }) {
  return (
    <div style={{width: side, height: side}}>
      <img src={logo} alt="" className='rounded-xl'/>
    </div>
  );
}

export default Logo