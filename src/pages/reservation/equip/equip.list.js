import React, {Component} from 'react';
import {Button, Table} from "semantic-ui-react";
import axios from "axios";
import {Link} from "react-router-dom";

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
        isLoaded: true,
        equips: existEquips.data
      })
    } catch (err) {
      alert("Server Communication Fail!! 😱");
    }
  }

  render() {
    const {params} = this.props.match;
    return (
      <section style={{padding: "0 6vw", marginBottom: "4em"}}>
        <h1>{ownerName[params.owner]} - 장비 예약하기</h1>
        {/*<Link to={`/reservation/equip/${this.params.owner}/submit`}>*/}
          <Button primary onClick={() => alert("기능 준비중입니다!")}>예약 신청하기</Button>
        {/*</Link>*/}
        {this.state.isLoaded ?
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
          : null
        }
      </section>
    )
  }
}