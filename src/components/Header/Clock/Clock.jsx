import React from 'react'
import s from './Clock.module.css'

class Clock extends React.Component {
   constructor(props) {
      super(props)
      this.state = { date: new Date() }
   }
   componentDidMount() {
      this.timerID = setInterval(() => this.tick(), 1000)
   }
   componentWillUnmount() {
      clearInterval(this.timerID)
   }
   tick() {
      this.setState({ date: new Date() })
   }
   render() {
      return (
         <h2 className={s.clock}>Time {this.state.date.toLocaleTimeString()}</h2>
      )
   }
}

export default Clock