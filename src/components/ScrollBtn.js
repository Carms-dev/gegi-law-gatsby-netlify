import React from 'react'
import styled from 'styled-components'
import { IconButton } from '@material-ui/core'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

export default function ScrollBtn({ index, anchors, setStep }) {
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
    <ScrollBtnStyles>
      <IconButton
        data-index={index}
        aria-label="scroll to next section"
        className="scroll-to"
        onClick={handleClick}
      >
        <ArrowDownwardIcon size='medium'/>
      </IconButton>
    </ScrollBtnStyles>
  )
}


const ScrollBtnStyles = styled.div`
  position: absolute;
  left: 50%;
  bottom: 3vmax;
  transform: translateX(-50%);

`
