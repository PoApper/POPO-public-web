import React, {Component} from 'react';
import {Button, Card, Grid, Icon, Image, Label, Loader} from "semantic-ui-react";
import {DateInput} from 'semantic-ui-calendar-react';
import axios from "axios";
import PlaceReservationTable from "../../../components/reservation/placeReservationTable";
import PlaceReserveCreationModal from "./placeReserveCreationModal";

/**
 * @url: /reservation/place/:region/:placeName
 */

export default class PlaceReservation extends Component {
  constructor(props) {
    super(props);
    this.placeValue = this.props.placeValue;
    this.parms = this.props.match.params;
    this.state = {
      placeInfo: null, // Place Information stored in DB
      date: new Date(),
      reservations: [],
      markedDates: []
    }
  }

  async componentDidMount() {
    try {
      const existPlace = await axios.get(`${process.env.REACT_APP_API_URL}/place/name/${this.parms.placeName}`);
      this.setState({
        placeInfo: existPlace.data
      })
      let currentDate = new Date();
      currentDate = currentDate.getFullYear() * 10000 + (currentDate.getMonth() + 1) * 100 + currentDate.getDate();
      const currentReservations = await axios.get(`${process.env.REACT_APP_API_URL}/reservation-place/placeName/${this.parms.placeName}/${currentDate}`);
      this.setState({
        reservations: currentReservations.data
      })
      const existReservations = await axios.get(`${process.env.REACT_APP_API_URL}/reservation-place/placeName/${this.parms.placeName}`);
      const markedDates = []
      for (const reservation of existReservations.data) {
        const date = reservation.date;
        const tmp = new Date(new Date().setFullYear(date / 10000, (date % 10000) / 100 - 1, date % 100));
        markedDates.push(tmp);
      }
      this.setState({
        markedDates: markedDates
      })
    } catch (err) {
      alert("Server Communication Fail!! 😱");
    }

    try {
      const userInfo = await axios.get(`${process.env.REACT_APP_API_URL}/auth/verifyToken`, {withCredentials: true});
      this.setState({
        userInfo: userInfo.data
      })
    } catch (error) {
      // to nothing
    }
  }

  handleDateChange = async (e, data) => {
    try {
      const date = data.value; // DD-MM-YYYY
      const formedDate = date.substring(6, 10) + date.substring(3, 5) + date.substring(0, 2);
      const existReservations = await axios.get(`${process.env.REACT_APP_API_URL}/reservation-place/placeName/${this.parms.placeName}/${formedDate}`);
      this.setState({
        date: data.value,
        reservations: existReservations.data
      })
    } catch (error) {
      alert("조회 실패...");
    }
  }

  render() {
    const {params} = this.props.match;
    return (
      <section style={{padding: "0 1vw", margin: "0 2vw 4em"}}>
        <Grid columns={2} divided stackable>
          <Grid.Row>
            <Grid.Column width={6}>
              {this.state.placeInfo ?
                <Card fluid>
                  {
                    (this.state.placeInfo && this.state.placeInfo.imageName) ?
                      <Image src={`${process.env.REACT_APP_API_URL}/place/image/${this.state.placeInfo.imageName}`}
                             wrapped ui={false}/>
                      : <Image src='https://react.semantic-ui.com/images/wireframe/image.png' wrapped ui={false}/>
                  }
                  <Card.Content>
                    <Card.Header>{this.state.placeInfo.name}</Card.Header>
                    <Card.Meta>
                      {this.state.placeInfo.location}
                    </Card.Meta>
                    <Card.Description>
                      {this.state.placeInfo.description}
                    </Card.Description>
                    <Card.Description style={{marginTop: "0.8em"}}>
                      {
                        this.state.userInfo ?
                          <PlaceReserveCreationModal userInfo={this.state.userInfo} placeInfo={params}
                                                     trigger={
                                                       <Button basic compact>
                                                         <Icon name={'calendar plus outline'}/> 예약하기
                                                       </Button>}/>
                          : <Button basic compact onClick={(e) => {
                            alert("로그인 후 이용 가능합니다!");
                            this.props.history.push('/login');
                          }}>
                            <Icon name={'calendar plus outline'}/> 예약하기
                          </Button>
                      }
                    </Card.Description>
                  </Card.Content>
                </Card> : <Loader active/>}
            </Grid.Column>
            <Grid.Column>
              <Grid rows={2} divided stackable>
                <Grid.Column>
                  <Grid.Row centered style={{marginBottom: "1em"}}>
                    <DateInput inline name='date' value={this.state.date} marked={this.state.markedDates}
                               markColor={'orange'}
                               onChange={this.handleDateChange}/>
                    <p>날짜를 고르면, 예약 현황을 확인할 수 있습니다! 😎</p>
                    <p>해당 날짜에 예약이 하나라도 존재하면, 달력에 <Label circular color='orange' empty/>로 표시됩니다.</p>
                    <p>
                      <b>심사중</b>은 <Label circular color='black' empty/> 로, &nbsp;
                      <b>통과</b>는 <Label circular color='green' empty/> 로, &nbsp;
                      <b>거절</b>은 <Label circular color='red' empty/> 로 표시됩니다.
                    </p>
                  </Grid.Row>
                  <Grid.Row>
                    <PlaceReservationTable reservations={this.state.reservations}/>
                  </Grid.Row>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </section>
    )
  }
}