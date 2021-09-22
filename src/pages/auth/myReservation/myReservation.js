import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import axios from 'axios'

import MyPlaceReservationTable
  from '../../../components/auth/MyPlaceReservationTable'
import MyEquipReservationTable
  from '../../../components/auth/MyEquipReservationTable'

export default class MyReservation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false,
    }
  }

  async componentDidMount () {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/reservation-place/user`,
        { withCredentials: true })
      this.setState({
        isLoaded: true,
        reservations: response.data,
      })
    } catch (err) {
      console.log('내 예약을 불러오는데 실패했습니다 😥')
    }
  }

  render () {
    return (
      <Container style={{
        padding: '3vh 3vw',
        margin: '2em 0 2em',
        backgroundColor: '#eeeeee',
      }}>
        <h2>내 예약</h2>
        <h3>장소 예약</h3>
        <MyPlaceReservationTable/>
        <h3>장비 예약</h3>
        <MyEquipReservationTable/>
      </Container>
    )
  }

}