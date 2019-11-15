import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Mongo } from 'meteor/mongo';

import { withHistory, Link, Redirect } from 'react-router-dom';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { CopyToClipboard } from 'react-copy-to-clipboard';


import { Campaigns } from '../../api/campaigns.js';
import { Donations } from '../../api/donations.js';

import {
    Button,
    Responsive,
    Header,
    Segment,
    Grid,
    Icon,
    Form,
    TextArea,
    Modal,
    Progress
} from 'semantic-ui-react';

var options = [
  [ 'st_judes', 'St. Judes Children Hospital' ],
  [ 'miracle_network', 'Miracle Network' ],
  [ 'texas_food_bank', 'Texas Food Bank' ]
]
var np_translation = new Map(options);
var QRCode = require('qrcode.react');
//var ShortUrl = require('node-url-shortener');
//import GoogleUrlShortner from 'react-google-url-shortner';

export default class CampaignPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleted: false,
            editing: false,
            public: false,
            name: '',
            description: '',
            startDate: new Date(),
            endDate: new Date(),
            goalAmount: 0,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getQRCode = this.getQRCode.bind(this);
        //this.getShortLink = this.getShortLink.bind(this);
        this.getURL = this.getURL.bind(this);
    }
    // <Grid.Row style={{ margin: '2em' }}>
    //   <Header sub>Short Link</Header>
    //   <div>
    //     <GoogleUrlShortner
    //       url={this.getURL()}
    //       GOOGLE_API_KEY="AIzaSyADEsTbdBRbP-rPbxxDNXyuGvuU-4OZpEc"
    //     />
    //   </div>
    // </Grid.Row>
    getURL(){
      // var url = ''
      // var shorturl = ''
      // if (Meteor.settings.public.env === 'Production'){
      //   url = "https://www.phly.co/public/7cSJDwC9FZxTDjT9D"
      // }
      // else {
      //   url = `https://www.phly.co/public/${this.props.match.params.id}`;
      // }
      //
      // ShortUrl.short(url, function(err, returl){
      //       console.log(returl);
      //       shorturl = returl;
      // });
      return("https://www.phly.co/public/7cSJDwC9FZxTDjT9D");
    }

    getQRCode(){
      console.log(this.props)
      console.log(this.props.match.params.id) //how does this work ???
      var url = ''
      if (Meteor.settings.public.env === 'Production'){
        url = "https://www.phly.co/public/7cSJDwC9FZxTDjT9D"
      }
      else {
        url = `https://www.phly.co/public/${this.props.match.params.id}`;
      }
      return (<QRCode value={url}/>);
    }

    handleSubmit(event) {
        event.preventDefault();
        const date = new Date();
        var campaign = {
            name: this.state.name,
            owner: Meteor.userId(),
            username: Meteor.user().username,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            description: this.state.description,
            nonprofit: this.state.nonprofit,
            goalAmount: this.state.goalAmount
        }
        Meteor.call('campaigns.edit', campaign, this.props.match.params.id);
        this.setState({ editing: false });
    }


    handleDelete = () => {
        Meteor.call('campaigns.delete', this.props.match.params.id);
        this.setState({ deleted: true });
    }

    handlePublic = () => {
        this.setState({ public: true });
    }

/*
    handleEdit = () => {
        this.setState({ editing: true });
    }
*/

    handleChange(key){
        return function(e){
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }.bind(this);
    }

    handleStartDayChange(day){
        this.setState({startDate: day});
    }

    handleEndDayChange(day){
        this.setState({endDate: day});
    }

    render() {
        if (this.state.deleted === true) return <Redirect to='/home'/>
        if (this.state.public === true) return <Redirect to={`/public/${this.props.match.params.id}`}/>
        var obj = Campaigns.findOne({ _id: this.props.match.params.id });
        var donations = Donations.find({campaign: this.props.match.params.id}).fetch();
        console.log(donations);
        var totalRaised = 0;
        if (donations) {
          donations.forEach(calculateTotal);
          function calculateTotal(donation, index){
            totalRaised += donation.amount;
          }
        }
        if (obj != null) {
            var campName = obj.name;
            var campDes = obj.description;
            var campStartDate = obj.startDate;
            var startString = campStartDate.toLocaleDateString();
            var campEndDate = obj.endDate;
            var endString = campEndDate.toLocaleDateString();
            var nonprofit = np_translation.get(obj.nonprofit);
            var goalAmount = obj.goalAmount;
        }

        if (this.state.editing === true) {
            return (
                <Responsive>
                    <Segment style={{ backgroundColor: '#F9FFFF', margin: 0 }} basic clearing>
                        <Form noValidate onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>Campaign Name</label>
                                <input type="text" defaultValue = {campName} onChange={this.handleChange('name')}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Goal</label>
                                <input type="number" defaultValue = {goalAmount} onChange={this.handleChange('goalAmount')}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Description</label>
                                <TextArea type="text" defaultValue = {campDes} onChange={this.handleChange('description')}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Start Date</label>
                                <DayPickerInput value={campStartDate} onDayChange={this.handleStartDayChange.bind(this)}/>
                            </Form.Field>
                            <Form.Field>
                                <label>End Date</label>
                                <DayPickerInput value={campEndDate} onDayChange={this.handleEndDayChange.bind(this)}/>
                            </Form.Field>
                            <Button color='orange' type='submit'>Save</Button>
                        </Form>
                    </Segment>
                </Responsive>
            )
        }

        return (
            <div>
                <Responsive>
                    <Segment style={{ backgroundColor: '#F9FFFF', margin: 0 }} basic clearing>
                        <Header as='h1'
                                floated='left'
                                color='orange'
                                style={{
                                      fontSize: '2em',
                                      letterSpacing: '1.5px',
                                      margin: 0,
                                      paddingRight: '.5em' }}>
                          {campName}
                        </Header>
                        <Modal trigger={<Button floated='right'><Icon name='external'/>Share</Button>} size='small'>
                          <Header icon='plus' content='Share your campaign'/>
                          <Modal.Content>
                            <p>
                              Your external link is: <Link to={`/public/${this.props.match.params.id}`}>phly.co/public/{this.props.match.params.id}</Link>
                            </p>
                          </Modal.Content>
                          <Modal.Actions>
                            <CopyToClipboard text={`phly.co/public/${this.props.match.params.id}`}>
                              <Button color='green' inverted>
                                <Icon name='copy'/> Copy
                              </Button>
                            </CopyToClipboard>
                          </Modal.Actions>
                        </Modal>
                    </Segment>
                    <Segment style={{ backgroundColor: '#F9FFFF', margin: 0 }} basic>
                        <Grid columns={2}>
                            <Grid.Column>
                                <Grid.Row style={{ margin: '2em' }}>
                                  <Header sub>Non-Profit</Header>
                                  <p>{nonprofit}</p>
                                </Grid.Row>
                                <Grid.Row style={{ margin: '2em' }}>
                                  <Header sub>Goal</Header>
                                  <p>{'$'}{goalAmount}</p>
                                </Grid.Row>
                                <Grid.Row style={{ margin: '2em' }}>
                                  <Header sub>Description</Header>
                                  <p>{campDes}</p>
                                </Grid.Row>
                                <Grid.Row style={{ margin: '2em' }}>
                                  <Header sub>Donations</Header>
                                  <p>Total: ${totalRaised}</p>
                                  <Progress percent={totalRaised * 100 / goalAmount} progress color='orange'/>
                                </Grid.Row>
                            </Grid.Column>
                            <Grid.Column>
                                <Grid.Row style={{ margin: '2em' }}>
                                  <Header sub>Start Date</Header>
                                  <p>{startString}</p>
                                </Grid.Row>
                                <Grid.Row style={{ margin: '2em' }}>
                                  <Header sub>End Date</Header>
                                  <p>{endString}</p>
                                </Grid.Row>
                                <Grid.Row style={{ margin: '2em' }}>
                                  <Header sub>QR Code</Header>
                                  <div>{this.getQRCode()}</div>
                                </Grid.Row>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Responsive>
            </div>
        );
    }
}
