import { DateInput } from 'semantic-ui-calendar-react'
import { Label } from 'semantic-ui-react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const EquipReservationCalendar = (props) => {
  const selectedDate = props.selectedDate
  const owner = props.owner
  const [reservs, setReservs] = useState([])

  useEffect(async () => {
    const res3 = await axios.get(
      `${process.env.REACT_APP_API_URL}/reservation-equip?owner=${owner}`)
    setReservs(res3.data)
  }, [selectedDate, owner])

  const markedDates = []
  for (const reservation of reservs) {
    const date = reservation.date
    const tmp = new Date(
      new Date().setFullYear(date / 10000, (date % 10000) / 100 - 1,
        date % 100))
    markedDates.push(tmp)
  }

  return (
    <>
      <DateInput
        inline
        name="date"
        markColor={'orange'}
        value={selectedDate}
        marked={markedDates}
        dateFormat={'YYYYMMDD'}
        onChange={(e, data) => {
          e.preventDefault()
          props.setDate(data.value) // YYYYMMDD
        }}
      />
      <p>날짜를 고르면, 예약 현황을 확인할 수 있습니다! 😎</p>
      <p>해당 날짜에 예약이 하나라도 존재하면, 달력에 <Label circular color="orange"
                                          empty/>로 표시됩니다.</p>
      <p>
        <b>심사중</b>은 <Label circular color="black" empty/> 로, &nbsp;
        <b>통과</b>는 <Label circular color="green" empty/> 로, &nbsp;
        <b>거절</b>은 <Label circular color="red" empty/> 로 표시됩니다.
      </p>
    </>
  )
}

export default EquipReservationCalendar