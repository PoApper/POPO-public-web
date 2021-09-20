import React, {Component} from 'react';
import {Button, Card, Icon} from "semantic-ui-react";
import axios from "axios";

const regionName = {
  'student-hall': "학생 회관",
  'jigok': "지곡 회관",
  'others': "생활관 외",
}

const regionOptions = {
  'student-hall': "STUDENT_HALL",
  'jigok': "JIGOK_CENTER",
  'others': "OTHERS",
}

/**
 * @url: /reservation/place/:region
 */

export default class PlaceList extends Component {
  constructor(props) {
    super(props);
    this.placeValue = this.props.placeValue;
    this.parms = this.props.match.params;
    this.state = {
      places: []
    }
  }

  async componentDidMount() {
    try {
      const existPlaces = await axios.get(`${process.env.REACT_APP_API_URL}/place/region/${regionOptions[this.parms.region]}`);
      this.setState({
        places: existPlaces.data
      })
    } catch (err) {
      alert("Server Communication Fail!! 😱");
    }
  }

  render() {
    const {params} = this.props.match;
    return (
      <div>
        <h1>{regionName[params.region]} - 장소 예약하기</h1>
        {this.state.places ?
          <Card.Group>
            {this.state.places.map(place => {
              return <Card fluid>
                <Card.Content>
                  <Card.Header>{place.name}</Card.Header>
                  <Card.Meta>
                    {place.location}
                  </Card.Meta>
                  <Card.Description>
                    {place.description}
                  </Card.Description>
                  <Card.Description style={{marginTop: "0.8em"}}>
                    <Button href={`/reservation/place/${params.region}/${place.name}`} basic compact>
                      <Icon name={'calendar plus outline'}/> 예약하기
                    </Button>
                  </Card.Description>
                </Card.Content>
              </Card>
            })}
          </Card.Group> : <p>empty...</p>}
      </div>
    )
  }
}