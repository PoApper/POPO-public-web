import React, {Component} from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Form, Divider} from "semantic-ui-react";
import axios from "axios";

export default class EquipReservationCreate extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.match.params;
    this.state = {
      isLoaded: false,
      date: new Date(),
      startTime: new Date().setHours(new Date().getHours() + (new Date().getMinutes() > 30), 30 * (new Date().getMinutes() <= 30)),
      endTime: new Date().setHours(new Date().getHours() + 1, 30 * (new Date().getMinutes() > 30)),
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/verifyToken`, {withCredentials: true});
      this.setState({
        userInfo: response.data
      })
    } catch (error) {
      alert("POPO 회원만 예약을 신청할 수 있습니다.");
    }
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/equip/owner/${this.params.owner}`);
      console.log(response.data);
      this.setState({
        equips: response.data
      })
    } catch (err) {
      alert("장비 목록을 불러오는데 실패했습니다.");

    }
    this.setState({
      isLoaded: true
    })
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
        'equip': this.state.equip,
        'user': this.state.user,
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
      alert(`예약 생성에 실패했습니다. 😢\n${response.data.message}`)
    }
  }

  render() {
    return (
      <div>
        <h2>예약 신청서 작성</h2>
        {
          this.state.isLoaded ?
            <Form>
              <Form.Input required readOnly label={'사용자'} name='user' value={this.state.userInfo.name}/>
              <Form.Input required label={'전화번호'} name='phone' placeholder='010-xxxx-xxxx'
                          onChange={this.handleChange}/>
              <Form.Input required label={'예약 제목'} name='title' placeholder='예약 제목을 작성해주세요.'
                          onChange={this.handleChange}/>
              <Form.TextArea required label={'설명'} name='description' placeholder={'사용처를 반드시 작성 해주세요.'}
                             onChange={this.handleChange}/>
              <Divider/>
              <Form.Dropdown placeholder="예약할 장비들을 선택해주세요." label="장비 선택"
                             fluid multiple search selection required
                             options={this.state.equips.map((equip, idx) => ({
                               key: idx,
                               text: equip.name,
                               value: equip.uuid,
                             }))}
              />
              <Form.Group>
                <div className={"required field"}>
                  <label>날짜</label>
                  <DatePicker
                    name='date' dateFormat="yyyy-MM-dd"
                    selected={this.state.date} minDate={new Date()}
                    maxDate={(new Date()).setDate((new Date()).getDate() + 30)}
                    onChange={date => {
                      dateComparison(new Date(), date) ?
                        this.setState({
                          date: date,
                          startTime: new Date().setHours(new Date().getHours() + (new Date().getMinutes() > 30), 30 * (new Date().getMinutes() <= 30)),
                          endTime: new Date().setHours(new Date().getHours() + 1, 30 * (new Date().getMinutes() > 30)),
                        }) :
                        this.setState({
                          date: date,
                          startTime: new Date(date).setHours(0, 0),
                          endTime: new Date(date).setHours(0, 30)
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
                    minTime={dateComparison(new Date(), this.state.date) ? new Date() : (new Date().setHours(0, 0, 1))}
                    maxTime={new Date().setHours(23, 59, 0)}
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
                    maxTime={new Date().setHours(23, 59, 0)}
                    injectTimes={[new Date().setHours(23, 59, 0)]}
                    onChange={endTime => this.setState({endTime: endTime})}
                  />
                </div>
              </Form.Group>
              <Form.Button onClick={this.handleSubmit}>
                생성
              </Form.Button>
            </Form> : null
        }
      </div>
    )
  }
}


function dateComparison(date1, date2) {
  return (date1.getDate() === date2.getDate()) && (date1.getMonth() === date2.getMonth()) && (date1.getFullYear() === date2.getFullYear());
}