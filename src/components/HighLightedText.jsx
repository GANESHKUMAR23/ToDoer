import React from 'react'

export const HighLightedText = ({text,search}) => {

    
    let highlightedText = text.split(new RegExp(`(${search})`,"gi"));
    

  return (
    <>
        <span>
          { highlightedText.map((text) => text.toLowerCase() === search.toLowerCase() ? 
          <b>{text.toLowerCase()}</b> : text.toLowerCase()
          )}
        </span>
    </>
  )
}
