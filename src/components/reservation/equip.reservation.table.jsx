import { useEffect, useState } from 'react'
import { Label, Table } from 'semantic-ui-react'
import moment from 'moment'
import axios from 'axios'

import { convertStatus } from '../../utils'

const EquipReservationTable = (props) => {
  const selectedDate = props.selectedDate
  const owner = props.owner

  const [reservs, setReservs] = useState([])

  useEffect(async () => {
    const res1 = await axios.get(
      `${process.env.REACT_APP_API_URL}/reservation-equip/owner/${owner}?date=${selectedDate}`)
    setReservs(res1.data)
  }, [selectedDate, owner])

  return (
    <Table compact>
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell>사용자</Table.HeaderCell>
          <Table.HeaderCell>장비명</Table.HeaderCell>
          <Table.HeaderCell>예약 기간</Table.HeaderCell>
          <Table.HeaderCell>상태</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          reservs.length !== 0 ?
            reservs.map(reservation => {
              return (
                <Table.Row textAlign="center">
                  <Table.Cell>{reservation.user}</Table.Cell>
                  <Table.Cell>
                    {
                      reservation.equips.map(equip => {
                        return <span style={{
                          backgroundColor: 'lightgrey',
                          padding: '1px',
                          margin: '1px',
                        }}>{equip}</span>
                      })
                    }
                  </Table.Cell>
                  <Table.Cell>
                    {convertDate(reservation.date)}<br/>
                    {convertTime(reservation.startTime)} ~ {convertTime(
                    reservation.endTime)}
                  </Table.Cell>
                  <Table.Cell>
                    <Label circular empty
                           color={convertStatus(reservation.reserveStatus)}/>
                  </Table.Cell>
                </Table.Row>
              )
            })
            : (
              <Table.Row>
                <Table.Cell/>
                <Table.Cell>등록된 예약이 없습니다!</Table.Cell>
                <Table.Cell/>
                <Table.Cell/>
              </Table.Row>
            )
        }
      </Table.Body>
    </Table>
  )
}

export default EquipReservationTable

function convertDate (numberedDate) {
  const year = parseInt(numberedDate / 10000)
  const month = parseInt((numberedDate % 10000) / 100)
  const day = numberedDate % 100
  const date = new Date().setFullYear(year, month - 1, day)
  return moment(date).format('YYYY.MM.DD')
}

function convertTime (numberTime) {
  const hour = parseInt(numberTime / 100)
  const minute = numberTime % 100
  const time = new Date().setHours(hour, minute)
  return moment(time).format('HH:mm')
}