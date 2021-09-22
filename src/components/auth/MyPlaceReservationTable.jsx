import { Label, Table } from 'semantic-ui-react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { convertDate, convertStatus, convertTime } from '../../utils'

const MyPlaceReservationTable = () => {
  const [reserve_list, setReserveList] = useState([])

  useEffect(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/reservation-place/user`,
        { withCredentials: true })
      setReserveList(res.data)
    } catch (err) {
      alert('내 장소 예약 목록을 불러오는데 실패했습니다.')
      console.log(err)
    }
  })

  return (
    <Table compact>
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell width={1}>idx.</Table.HeaderCell>
          <Table.HeaderCell>예약 제목</Table.HeaderCell>
          <Table.HeaderCell>예약 장소</Table.HeaderCell>
          <Table.HeaderCell width={3}>예약 기간</Table.HeaderCell>
          <Table.HeaderCell width={1}>상태</Table.HeaderCell>
          <Table.HeaderCell width={3}>생성일</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          reserve_list.map((reservation, idx) => {
            return (
              <Table.Row textAlign="center">
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{reservation.title}</Table.Cell>
                <Table.Cell>{reservation.place}</Table.Cell>
                <Table.Cell>
                  {convertDate(reservation.date)}<br/>
                  {convertTime(reservation.startTime)} ~ {convertTime(
                  reservation.endTime)}
                </Table.Cell>
                <Table.Cell>
                  <Label circular empty
                         color={convertStatus(reservation.reserveStatus)}/>
                </Table.Cell>
                <Table.Cell>{moment(new Date(reservation.createdAt)).
                  format('YYYY.MM.DD')}</Table.Cell>
              </Table.Row>
            )
          })
        }
      </Table.Body>
    </Table>
  )
}

export default MyPlaceReservationTable