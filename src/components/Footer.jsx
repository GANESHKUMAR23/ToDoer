import React from 'react'

export const Footer = (props) => {
  return (
    <div className='footer'>
        <p>created by <span>@{props.name}</span></p>
    </div>
  )
}
