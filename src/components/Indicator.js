import React from 'react'
import styled from 'styled-components'

export default function Indicator({ step, count }) {

  const handleClick = (event) => {
    event.preventDefault()
    const btn = event.currentTarget

    // // Update step
    const updatedStep = btn.dataset.index

    // Scroll to the anchor
    document.querySelector(`[data-step="${updatedStep}"]`).scrollIntoView({
      behavior: 'smooth'
    })
  }

  return (
    <IndicatorStyles>
      {[...Array(count).keys()].map(index => {
        return (
          <div
            key={`indicator-${index}`}
            role="button"
            tabIndex={index}
            data-index={index}
            onClick={handleClick}
            onKeyDown={handleClick}
            style={{ color: `${step === index ? 'var(--yellow)' : 'var(--darker)'}` }}
          >
            {step === index ? '●' : '○'}
          </div>
        )
      })}
    </IndicatorStyles>
  )
}

const IndicatorStyles = styled.div`
  cursor: pointer;
  z-index: 1;
  display: none;
  position: fixed;
  top: 50%;
  right: 5vw;
  transform: translateY(-50%);
  flex-direction: column;
  font-size: 1.5rem;

  @media (min-width: 1280px) {
    display: flex;
  }
`
