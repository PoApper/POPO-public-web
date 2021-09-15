import { Button, Grid } from 'semantic-ui-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

import EquipReservationCreateModal
  from '../../../components/reservation/equip.reservation.createModal'
import EquipListTable from '../../../components/reservation/equip.list.table'
import EquipReservationCalendar
  from '../../../components/reservation/equip.reservation.calendar'
import EquipReservationTable
  from '../../../components/reservation/equip.reservation.table'

/**
 * @url: /reservation/equip/:association
 */

const ownerName = {
  'dongyeon': '동아리연합회',
  'dormUnion': '생활관자치회',
  'saengna': '생각나눔',
}

const EquipReservation = (props) => {
  const owner = props.match.params.owner

  const [selectedDate, setDate] = useState(moment(
    new Date()).format('YYYYMMDD'))
  const [userInfo, setUserInfo] = useState()
  const [equips, setEquips] = useState([])

  useEffect(async () => {
    await axios.get(
      `${process.env.REACT_APP_API_URL}/auth/verifyToken`,
      { withCredentials: true }).
      then(res => setUserInfo(res.data)).
      catch(() => {})

    const res2 = await axios.get(
      `${process.env.REACT_APP_API_URL}/equip/owner/${owner}`)
    setEquips(res2.data)
  }, [selectedDate, owner])

  return (
    <section>
      <h1>{ownerName[owner]} - 장비 예약하기</h1>

      <Grid columns={2} divided stackable>
        <Grid.Row>
          <Grid.Column width={6}>
            <EquipListTable equips={equips}/>
            <p style={{ marginTop: '10px' }}>
              장비를 클릭하면, 장비 사진을 볼 수 있습니다!
            </p>
            {
              userInfo ? (
                <EquipReservationCreateModal
                  userInfo={userInfo}
                  owner={owner}
                  equips={equips}
                  trigger={
                    <Button primary>예약 신청하기</Button>
                  }/>
              ) : (
                <Button primary
                        onClick={() => alert('POPO 로그인 후 이용 가능합니다.')}>
                  예약 신청하기
                </Button>
              )
            }
          </Grid.Column>
          <Grid.Column>
            <Grid rows={2} divided stackable>
              <Grid.Column>
                <Grid.Row centered style={{ marginBottom: '1em' }}>
                  <EquipReservationCalendar
                    selectedDate={selectedDate}
                    setDate={setDate}
                    owner={owner}/>
                </Grid.Row>
                <Grid.Row>
                  <EquipReservationTable owner={owner}
                                         selectedDate={selectedDate}/>
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </section>
  )
}

export default EquipReservation