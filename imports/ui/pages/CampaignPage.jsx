import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { withHistory, Link, Redirect } from 'react-router-dom';

import { Campaigns } from '../../api/campaigns.js';
import {
    Button
} from 'semantic-ui-react';

export default class CampaignPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleted: false
        }
    }

    handleDelete = () => {
        Meteor.call('campaigns.delete', this.props.match.params.id);
        this.setState({ deleted: true });
    }

  //function to find specific campaign

// add link to public campaign page here
//figure out how to pass props for specific campaign to Campaign Page
    render() {

        if (this.state.deleted === true) return <Redirect to='/home'/>

        console.log(this.props);
        console.log(this.props.match.params.id);
        var campaign = Campaigns.findOne({ _id: this.props.match.params.id });
        var name = campaign ? campaign.name : '';
        console.log(campaign);

        return (
            <div>
                <div className="card mb-3">
                    <h2 className="card-header">{name}</h2>
                    <Link to={{
                        pathname: `/public/${this.props.match.params.id}`,
                        state: {
                            campaignID: this.props.match.params.id
                        }
                    }}>Public Campaign Link</Link>
                    <Button floated='right' color='orange' onClick={this.handleDelete}>Delete</Button>
                </div>
            </div>
        );
    }
}
