import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const ClockContainer = styled.div`
  color: #fff;
  margin: 0 10px;
  & span {
    letter-spacing: 2px;
  }
`

const Clock: React.FC = () => {
   const [time, setTime] = useState<{date: Date}>({ date: new Date() })
   useEffect(() => {
      let timerID = setInterval(() => tick(), 1000)
      return () => {
         clearInterval(timerID)
      }
   }, [])
   const tick = () => {
      setTime({ date: new Date() })
   }
   return (
      <ClockContainer>
         <span>{time.date.toLocaleTimeString()}</span>
      </ClockContainer>
   )
}
export default Clock