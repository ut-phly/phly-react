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
    Icon,
    Card
} from 'semantic-ui-react';

import Campaign from '../../Campaign.jsx';
import { Campaigns } from '../../../api/campaigns.js';

var options = [
  [ 'st_judes', 'St. Judes Children Hospital' ],
  [ 'miracle_network', 'Miracle Network' ],
  [ 'texas_food_bank', 'Texas Food Bank' ]
]
var np_translation = new Map(options);

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

        let items = [];
        this.props.campaigns.forEach(function(campaign) {
            if (campaign.description.length > 100) {
                campaign.description = campaign.description.substring(0, 99);
                campaign.description += " ...";
            }
            items.push({
                header: campaign.name,
                meta: np_translation.get(campaign.nonprofit),
                description: campaign.description,
                href: `/home/${campaign._id}`,
                link: true
            });
        });

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
                    <Segment style={{ backgroundColor: '#F9FFFF', margin: 0 }} basic>
                        <Card.Group itemsPerRow={3} items={items} />
                    </Segment>
                </Responsive>
          </div>
        );
    }
}

CampaignList.propTypes = {
  campaigns: PropTypes.array.isRequired,
};
