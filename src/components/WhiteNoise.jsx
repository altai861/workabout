import React from 'react'
import whiteNoise from "../assets/white-noise-3hours.mp3"

const WhiteNoise = () => {
  return (
    <div className='white-noise'>
      <h2>White Noise</h2>
        <audio controls loop>
           <source src={whiteNoise} type="audio/mpeg"></source>
        </audio>
    </div>
  )
}

export default WhiteNoise