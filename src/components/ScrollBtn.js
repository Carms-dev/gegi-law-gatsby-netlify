import React from 'react'
import styled from 'styled-components'
import { IconButton } from '@material-ui/core'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

export default function ScrollBtn({ index, sectionRefs }) {
  const handleClick = (event) => {
    event.preventDefault()

    const updatedStep = parseInt(event.currentTarget.dataset.index)

    // Scroll to the anchor
    sectionRefs.current[updatedStep].scrollIntoView({
      behavior: 'smooth'
    })
  }

  return (
    <ScrollBtnStyles>
      <IconButton
        data-index={index + 1}
        aria-label="scroll to next section"
        className="scroll-to"
        onClick={handleClick}
      >
        <ArrowDownwardIcon size='medium' />
      </IconButton>
    </ScrollBtnStyles>
  )
}


const ScrollBtnStyles = styled.div`
  position: absolute;
  left: 50%;
  bottom: 3vmax;
  transform: translateX(-50%);
  margin: 1rem 0;
`
