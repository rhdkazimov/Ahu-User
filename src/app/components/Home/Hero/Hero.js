import React from 'react'
import "../Hero/hero.scss"

export function Hero() {
    return (
        <div className='hero'>
            <div className='hero-text'>
                <h1 className='hero-text-header'>AHU BOUTIQUE</h1>
                <p className='hero-text-title'>Shop the world’s best boutiques !</p>
            </div>
            <img className='hero-image' />
        </div>
    )
}

export default Hero