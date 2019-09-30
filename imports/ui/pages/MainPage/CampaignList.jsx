import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withHistory, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    List,
    Header,
    Responsive,
    Grid,
    Segment,
    Button,
    Icon
} from 'semantic-ui-react';

import Campaign from '../../Campaign.jsx';
import { Campaigns } from '../../../api/campaigns.js';

export default class CampaignList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            new: false
        };
    }

    handleNew = () => {
        this.setState(() => ({
            new: true
        }))
    }

    renderCampaigns() {
        return this.props.campaigns.map((campaign) => (
            <Campaign
                key={campaign._id}
                campaign={campaign}/>
        ));
    }

    render() {

        if (this.state.new === true) return <Redirect to='/home/new'/>

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
                                      margin: 0 }}>
                          Campaigns
                        </Header>
                        <Button onClick={this.handleNew} color='orange' floated='right'>
                            <Icon name='plus'/>
                            New
                        </Button>
                    </Segment>
                    <Segment basic style={{ margin: 0 }}>
                        <Grid padded color='white' style={{ boxShadow: '3px 3px 8px #C0D3DE' }}>
                            {this.renderCampaigns()}
                        </Grid>
                    </Segment>
                </Responsive>
          </div>
        );
    }
}

CampaignList.propTypes = {
  campaigns: PropTypes.array.isRequired,
};
