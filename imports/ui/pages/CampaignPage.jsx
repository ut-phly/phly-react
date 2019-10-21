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
    Form
} from 'semantic-ui-react';

export default class CampaignPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleted: false,
            editing: false,
            public: false
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
        }

        if (this.state.editing === true) {
            return (
                <Responsive>
                    <Segment style={{ backgroundColor: '#F9FFFF', margin: 0 }} basic clearing>
                        <Form noValidate onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <input type="text" defaultValue = {campName} onChange={this.handleChange('name')}/>
                            </Form.Field>
                            <Form.Field>
                                <input type="text" defaultValue = {campDes} onChange={this.handleChange('description')}/>
                            </Form.Field>
                            <Form.Field>
                                <DayPickerInput value={campStartDate} onDayChange={this.handleStartDayChange.bind(this)}/>
                            </Form.Field>
                            <Form.Field>
                                <DayPickerInput value={campEndDate} onDayChange={this.handleEndDayChange.bind(this)}/>
                            </Form.Field>
                            <Button color='orange' type='submit'>Submit</Button>
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
                        <Button floated='right' icon='edit' color='blue' onClick={this.handleEdit}/>
                    </Segment>
                    <Segment style={{ backgroundColor: '#F9FFFF', margin: 0 }} basic>
                        <Grid columns={2}>
                            <Grid.Column>
                                {campDes}
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
