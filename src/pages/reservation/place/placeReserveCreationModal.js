import React, {Component} from 'react';
import axios from 'axios';
import {Form, Modal} from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const regionName = {
  'student-hall': "학생 회관",
  'jigok': "지곡 회관",
  'others': "생활관 외",
}

export default class PlaceReserveCreationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      place: this.props.placeInfo.placeName,
      user: this.props.userInfo.id,
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
      await axios.post(`${process.env.REACT_APP_API_URL}/reservation-place`, {
        'place': this.state.place,
        'user': this.state.user,
        'phone': this.state.phone,
        'title': this.state.title,
        'description': this.state.description,
        'date': date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate(),
        'startTime': startTime.getHours() * 100 + startTime.getMinutes(),
        'endTime': endTime.getHours() * 100 + endTime.getMinutes()
      }, {withCredentials: true});
      alert('예약을 생성했습니다!');
      this.setState({open: false});
      window.location.reload();
    } catch (error) {
      const response = error.response;
      alert(`예약 생성에 실패했습니다. 😢\n${response.data.message}`);
    }
  }

  dateComparison = (date1, date2) => {
    return (date1.getDate() === date2.getDate()) && (date1.getMonth() === date2.getMonth()) && (date1.getFullYear() === date2.getFullYear());
  }

  render() {
    return (
      <Modal
        onClose={() => this.setState({open: false})}
        onOpen={() => this.setState({open: true})}
        open={this.state.open} trigger={this.props.trigger}
        size='small'
      >
        <Modal.Header>장소 예약 생성</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Input required readOnly label={'지역'} name='region' value={regionName[this.props.placeInfo.region]}/>
              <Form.Input required readOnly label={'장소'} name='place' value={this.props.placeInfo.placeName}/>
            </Form.Group>
            <Form.Input required readOnly label={'사용자'} name='user' value={this.props.userInfo.name}/>
            <Form.Input required label={'전화번호'} name='phone' placeholder='010-xxxx-xxxx' onChange={this.handleChange}/>
            <Form.Input required label={'예약 제목'} name='title' placeholder='예약 제목을 작성해주세요.'
                        onChange={this.handleChange}/>
            <Form.TextArea required label={'설명'} name='description' placeholder={'사용 인원을 꼭 작성 해주세요.'}
                           onChange={this.handleChange}/>
            <Form.Group>
              <div className={"required field"}>
                <label>날짜</label>
                <DatePicker
                  name='date' dateFormat="yyyy-MM-dd"
                  selected={this.state.date} minDate={new Date()}
                  maxDate={(new Date()).setDate((new Date()).getDate() + 30)}
                  onChange={date => this.dateComparison(new Date(), date) ?
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
                />
              </div>
              <div className={"required field"}>
                <label>시작 시간</label>
                <DatePicker
                  showTimeSelect showTimeSelectOnly timeIntervals={30}
                  name='startTime' dateFormat="hh:mm aa"
                  selected={this.state.startTime}
                  minTime={this.dateComparison(new Date(), this.state.date) ? new Date() : (new Date().setHours(0, 0, 1))}
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
            <Modal.Actions>
              <Form.Button onClick={this.handleSubmit}>
                생성
              </Form.Button>
            </Modal.Actions>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}