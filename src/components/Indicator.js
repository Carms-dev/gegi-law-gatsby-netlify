import React from 'react'
import styled from 'styled-components'

export default function Indicator({ step, count, sectionRefs, pausedRef }) {

  const handleClick = (ev) => {
    ev.preventDefault()
    // Pause Observer Scroll Effect
    pausedRef.current = true

    // Update step
    const updatedStep = parseInt(ev.currentTarget.dataset.index)

    // Scroll to the anchor
    sectionRefs.current[updatedStep].scrollIntoView({
      behavior: 'smooth'
    })
    // Un-pause Observer Scroll Effect
    setTimeout(() => {
      pausedRef.current = false
    }, 1000);
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
