import React from 'react'
import styled from 'styled-components'

export default function Indicator({step, setStep, anchors}) {
  const handleClick = (event) => {
    event.preventDefault()
    const btn = event.currentTarget

    // Update step
    const updatedStep = parseInt(btn.dataset.index)
    setStep(updatedStep)

    // Scroll to the anchor
    document.getElementById(anchors[updatedStep]).scrollIntoView({
      behavior: 'smooth'
    })
  }

  return (
    <IndicatorStyles>
      {anchors.map((anchor, index) => (
        <a
          key={anchor}
          href={`#${anchor}`}
          data-index={index}
          onClick={handleClick}
          style={{ color: `${step === index ? 'var(--yellow)' : 'var(--darker)'}`}}
        >
          {step === index ? '●' : '○'}
        </a>
      ))}
    </IndicatorStyles>
  )
}

const IndicatorStyles = styled.div`
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
