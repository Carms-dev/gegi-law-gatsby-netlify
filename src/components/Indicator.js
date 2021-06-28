import React from 'react'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export default function Indicator({step, setStep, count}) {
  const ids = [...Array(count).keys()].map(id => `#step-${id + 1}`)
  ids.unshift('#')

  return (
    <IndicatorStyles>
      {ids.map(id => (
        <IconButton
          aria-label="switch sections"
          href={id}
        >
          <FiberManualRecordIcon size='small' />
        </IconButton>
      ))}

    </IndicatorStyles>
  )
}

const IndicatorStyles = styled.div`
  display: none;
  z-index: 1;
  position: fixed;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  flex-direction: column;

  @media (min-width: 640px) {
    display: flex;
  }
`
