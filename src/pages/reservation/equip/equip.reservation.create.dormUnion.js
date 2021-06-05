import React, {Component} from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Form, Divider, Modal} from "semantic-ui-react";
import axios from "axios";

export default class EquipReservationCreateDormUnion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      startTime: new Date().setHours(new Date().getHours() + (new Date().getMinutes() > 30), 30 * (new Date().getMinutes() <= 30)),
      endTime: new Date().setHours(new Date().getHours() + 1, 30 * (new Date().getMinutes() > 30)),
    }
  }

  handleChange = (e, data) => {
    this.setState({
      [data.name]: data.value
    })
  }

  handleSubmit = async (e) => {
    try {
      const date = this.state.date;
      const startTime = new Date(this.state.startTime);
      const endTime = new Date(this.state.endTime);
      await axios.post(`${process.env.REACT_APP_API_URL}/reservation-equip`, {
        'equips': this.state.equips,
        'user': this.props.userInfo.id,
        'owner': this.props.owner,
        'phone': this.state.phone,
        'title': this.state.title,
        'description': this.state.description,
        'date': date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate(),
        'startTime': startTime.getHours() * 100 + startTime.getMinutes(),
        'endTime': endTime.getHours() * 100 + endTime.getMinutes()
      }, {withCredentials: true});
      alert('예약을 생성했습니다!');
      this.setState({open: false})
      window.location.reload();
    } catch (error) {
      const response = error.response;
      console.log(error)
      alert(`예약 생성에 실패했습니다. 😢\n${response.data.message}`)
    }
  }

  render() {
    return (
      <Modal
        onClose={() => this.setState({open: false})}
        onOpen={() => this.setState({open: true})}
        open={this.state.open} trigger={this.props.trigger}
        size='small'
      >
        <Modal.Header>예약 신청서 작성</Modal.Header>
        <Modal.Content>
          <h3 style={{color: "red"}}>
            ※ 카트가 분실 되거나 예약한 시간을 초과하여 사용한 경우, 차후 예약에 제한을 둘 수 있습니다. 카트 사용 시간을 반드시 지켜주세요. ※
          </h3>
          <Form>
            <Form.Input required readOnly label='사용자' name='user' value={this.props.userInfo.name}/>
            <Form.Input required label='전화번호' name='phone' placeholder='010-xxxx-xxxx'
                        onChange={this.handleChange}/>
            <Form.Input required label='예약 제목' name='title' placeholder='예약 제목을 작성해주세요.'
                        onChange={this.handleChange}/>
            <Form.TextArea required label='설명' name='description' placeholder={'출발지와 도착지를 반드시 명시해주세요! (ex: 7동 301호 -> 4동 101호)'}
                           onChange={this.handleChange}/>
            <Divider/>
            <Form.Dropdown placeholder="예약할 장비들을 선택해주세요." label="장비 선택" name='equips'
                           fluid search selection required
                           options={this.props.equips.map((equip, idx) => ({
                             key: idx,
                             text: equip.name,
                             value: equip.uuid,
                           }))}
                           onKeyDown={e => e.preventDefault()}
                           onChange={this.handleChange}
            />
            <Form.Group>
              <div className={"required field"}>
                <label>날짜</label>
                <DatePicker
                  name='date' dateFormat="yyyy-MM-dd"
                  selected={this.state.date} minDate={new Date()}
                  maxDate={(new Date()).setDate((new Date()).getDate() + 30)}
                  onKeyDown={e => e.preventDefault()}
                  onChange={date => {
                    dateComparison(new Date(), date) ?
                      this.setState({
                        date: date,
                        startTime: new Date().setHours(new Date().getHours() + (new Date().getMinutes() > 30), 30 * (new Date().getMinutes() <= 30)),
                        endTime: new Date().setHours(new Date().getHours() + 1, 30 * (new Date().getMinutes() > 30)),
                      }) :
                      this.setState({
                        date: date,
                        startTime: new Date(date).setHours(9, 0),
                        endTime: new Date(date).setHours(9, 30)
                      })
                  }
                  }
                />
              </div>
              <div className={"required field"}>
                <label>시작 시간</label>
                <DatePicker
                  showTimeSelect showTimeSelectOnly timeIntervals={30}
                  name='startTime' dateFormat="hh:mm aa"
                  selected={this.state.startTime}
                  minTime={dateComparison(new Date(), this.state.date) ? new Date() : (new Date().setHours(9, 0))}
                  maxTime={new Date().setHours(20, 30, 0)}
                  onKeyDown={e => e.preventDefault()}
                  onChange={startTime => this.setState({
                    startTime: startTime,
                    endTime: new Date(startTime).setMinutes(startTime.getMinutes() + 30)
                  })}
                />
              </div>
              <div className={"required field"}>
                <label>종료 시간</label>
                <DatePicker
                  showTimeSelect showTimeSelectOnly timeIntervals={30}
                  name='endTime' dateFormat="hh:mm aa"
                  selected={this.state.endTime}
                  minTime={new Date(this.state.startTime).setMinutes(new Date(this.state.startTime).getMinutes() + 30)}
                  maxTime={
                    new Date(this.state.startTime).setMinutes(new Date(this.state.startTime).getMinutes() + 60) > new Date(this.state.startTime).setHours(20, 59, 0)
                    ? new Date(this.state.startTime).setHours(21, 0, 0) : new Date(this.state.startTime).setMinutes(new Date(this.state.startTime).getMinutes() + 60)
                  }
                  onKeyDown={e => e.preventDefault()}
                  onChange={endTime => this.setState({endTime: endTime})}
                />
              </div>
            </Form.Group>
            <Form.Button onClick={this.handleSubmit}>
              생성
            </Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}


function dateComparison(date1, date2) {
  return (date1.getDate() === date2.getDate()) && (date1.getMonth() === date2.getMonth()) && (date1.getFullYear() === date2.getFullYear());
}