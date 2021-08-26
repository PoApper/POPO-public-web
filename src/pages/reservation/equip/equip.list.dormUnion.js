import React, {Component} from 'react';
import {Button} from "semantic-ui-react";
import axios from "axios";

import Timeline from "react-calendar-timeline";
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

import {convertDateTime} from "../../../utils";
import EquipReservationCreateDormUnion from "./equip.reservation.create.dormUnion";

// URL: /reservation/equip/dormUnion

export default class EquipListDormUnion extends Component {
  constructor(props) {
    super(props);
    this.equipValue = this.props.equipValue;
    this.params = this.props.match.params;
    const visibleTimeStart = moment()
      .startOf("day")
      .valueOf();
    const visibleTimeEnd = moment()
      .startOf("day")
      .add(1, "day")
      .valueOf();
    this.state = {
      isLoaded: false,
      visibleTimeStart,
      visibleTimeEnd
    }
  }

  async componentDidMount() {
    try {
      const existEquips = await axios.get(`${process.env.REACT_APP_API_URL}/equip/owner/dormUnion`);
      this.setState({
        equips: existEquips.data
      })
    } catch (err) {
      alert("장비 목록을 불러오는데 실패했습니다 😱");
    }
    try {
      const existReserves = await axios.get(`${process.env.REACT_APP_API_URL}/reservation-equip?owner=dormUnion`);
      console.log(existReserves.data)
      this.setState({
        reserves: existReserves.data
      })
    } catch (error) {
      alert("장비 예약 목록을 불러오는데 실패했습니다 😱");
    }
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/verifyToken`, {withCredentials: true});
      this.setState({
        userInfo: response.data
      })
    } catch (error) {
    }
    this.setState({
      isLoaded: true,
    })
  }

  onPrevClick = () => {
    const zoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
    this.setState(state => ({
      visibleTimeStart: state.visibleTimeStart - zoom,
      visibleTimeEnd: state.visibleTimeEnd - zoom
    }));
  };

  onNextClick = () => {
    const zoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
    this.setState(state => ({
      visibleTimeStart: state.visibleTimeStart + zoom,
      visibleTimeEnd: state.visibleTimeEnd + zoom
    }));
  };

  render() {
    return (
      <section style={{padding: "0 6vw", marginBottom: "4em"}}>
        <h1>생활관 자치회 - 카트 예약하기</h1>
        <h2>서비스 개선 중입니다 😥<br/>빠른 시일 내에 개발하도록 하겠습니다 👨‍💻</h2>
        {/*{this.state.isLoaded ?*/}
        {/*  <div>*/}
        {/*    {this.state.userInfo ? <EquipReservationCreateDormUnion*/}
        {/*      userInfo={this.state.userInfo}*/}
        {/*      owner='dormUnion'*/}
        {/*      equips={this.state.equips}*/}
        {/*      trigger={*/}
        {/*        <Button primary>예약 신청하기</Button>*/}
        {/*      }*/}
        {/*    /> : <Button primary onClick={() => alert("POPO 로그인 후 이용 가능합니다.")}>예약 신청하기</Button>}*/}
        {/*    <p style={{margin: "10px"}}>*/}
        {/*      카트 예약은 오전 9시부터 오후 9시까지 운영됩니다. (최소 30분, 최대 60분간 대여 가능)<br/>*/}
        {/*      예약한 카트는 생활관자치회 사무실에서 수령할 수 있습니다.<br/>*/}
        {/*      (생활관자치회 사무실: 기숙사 4동)*/}
        {/*  </p>*/}
        {/*    <div style={{margin: "10px 0"}}>*/}
        {/*      <div style={{margin: "10px 0"}}>*/}
        {/*        <Button compact onClick={this.onPrevClick}>{"< Prev"}</Button>*/}
        {/*        <Button compact onClick={this.onNextClick}>{"Next >"}</Button>*/}
        {/*      </div>*/}
        {/*      <Timeline*/}
        {/*        groups={*/}
        {/*          this.state.equips.map((equip, idx) => {*/}
        {/*            return {id: idx, title: equip.name}*/}
        {/*          })*/}
        {/*        }*/}
        {/*        items={this.state.reserves.map((reserve, idx) => {*/}
        {/*          let group = 0*/}
        {/*          for (let i = 0; i < this.state.equips.length; i++) {*/}
        {/*            if (this.state.equips[i].uuid === reserve.equips[0]) {*/}
        {/*              group = i;*/}
        {/*              break;*/}
        {/*            }*/}
        {/*          }*/}
        {/*          return {*/}
        {/*            id: idx, group: group, title: "",*/}
        {/*            start_time: convertDateTime(reserve.date, reserve.startTime),*/}
        {/*            end_time: convertDateTime(reserve.date, reserve.endTime)*/}
        {/*          }*/}
        {/*        })}*/}
        {/*        visibleTimeStart={moment(this.state.visibleTimeStart).add(9, 'hour')}*/}
        {/*        visibleTimeEnd={moment(this.state.visibleTimeEnd).add(-2, 'hour')}*/}
        {/*        canResize={false}*/}
        {/*        canMove={false}*/}
        {/*        itemTouchSendsClick={false}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  : null*/}
        {/*}*/}
      </section>
    )
  }

}