import React, {Component} from 'react';
import {Button, Table} from "semantic-ui-react";
import axios from "axios";
import EquipReservationCreate from "./equip.reservation.create";

const ownerName = {
  'dongyeon': "동아리연합회",
  'dormUnion': "생활관자치회",
  'saengna': "생각나눔",
}

// URL: /reservation/equip/:owner

export default class EquipList extends Component {
  constructor(props) {
    super(props);
    this.equipValue = this.props.equipValue;
    this.params = this.props.match.params;
    this.state = {
      isLoaded: false,
      equips: []
    }
  }

  async componentDidMount() {
    try {
      const existEquips = await axios.get(`${process.env.REACT_APP_API_URL}/equip/owner/${this.params.owner}`);
      this.setState({
        equips: existEquips.data
      })
    } catch (err) {
      alert("Server Communication Fail!! 😱");
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

  render() {
    const {params} = this.props.match;
    return (
      <section style={{padding: "0 6vw", marginBottom: "4em"}}>
        <h1>{ownerName[params.owner]} - 장비 예약하기</h1>
        {this.state.isLoaded ?
          <div>
            {this.state.userInfo ? <EquipReservationCreate
              userInfo={this.state.userInfo}
              owner='dormUnion'
              equips={this.state.equips}
              trigger={
                <Button primary>예약 신청하기</Button>
              }
            /> : <Button primary onClick={() => alert("POPO 로그인 후 이용 가능합니다.")}>예약 신청하기</Button>}
            <Table celled selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={1}>#</Table.HeaderCell>
                  <Table.HeaderCell width={8}>장비 이름</Table.HeaderCell>
                  <Table.HeaderCell width={2}>예약비</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {
                  this.state.equips.map((equip, idx) =>
                    <Table.Row key={idx}>
                      <Table.Cell>{idx + 1}</Table.Cell>
                      <Table.Cell>{equip.name}</Table.Cell>
                      <Table.Cell>{equip.fee}</Table.Cell>
                    </Table.Row>)
                }
              </Table.Body>
            </Table>
          </div>
          : null
        }
      </section>
    )
  }
}