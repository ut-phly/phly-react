import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';

import { withHistory, Link, Redirect } from 'react-router-dom';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import { Campaigns } from '../../api/campaigns.js';
import {
    Button,
    Responsive,
    Header,
    Segment,
    Grid,
    Icon,
    Form,
    TextArea
} from 'semantic-ui-react';

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

    handleEdit = () => {
        this.setState({ editing: true });
    }

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
        if (obj != null) {
            var campName = obj.name;
            var campDes = obj.description;
            var campStartDate = obj.startDate;
            var startString = campStartDate.toLocaleDateString();
            var campEndDate = obj.endDate;
            var endString = campEndDate.toLocaleDateString();
            var nonprofit = obj.nonprofit;
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
                        <Button floated='right' color='orange' onClick={this.handleDelete}>Delete</Button>
                        <Button floated='right' icon='external' color='blue' onClick={this.handlePublic}/>
                        <Button floated='right' icon='edit outline' color='blue' onClick={this.handleEdit}/>
                    </Segment>
                    <Segment style={{ backgroundColor: '#F9FFFF', margin: 0 }} basic>
                        <Grid columns={2}>
                            <Grid.Column>
                                <Grid.Row>{nonprofit}</Grid.Row>
                                <Grid.Row>{goalAmount}</Grid.Row>
                                <Grid.Row>{campDes}</Grid.Row>
                            </Grid.Column>
                            <Grid.Column>
                                <Grid.Row>{startString}</Grid.Row>
                                <Grid.Row>{endString}</Grid.Row>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Responsive>
            </div>
        );
    }
}
