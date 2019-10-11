import React, { Component } from 'react';
import { withHistory, Link, Redirect } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import {
    Menu,
    Container,
    Image,
    Button,
    Responsive,
    Segment,
    Card,
    Header
} from 'semantic-ui-react';

import { Campaigns } from '../../api/campaigns.js';

class Marketplace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            return: false
        };
    }

    handleReturn = () => {
        this.setState(() => ({
            return: true
        }))
    }

    render() {
        if (this.state.return === true) return <Redirect to='/'/>

        let items = [];
        this.props.campaigns.forEach(function(campaign) {
            items.push({
                header: campaign.name,
                description: campaign.description,
                meta: 'St. Judes Children Hospital',
                href: `/public/${campaign._id}`,
                link: true
            });
        });

        return (
            <div>
                <Menu fixed='top' inverted color='blue'>
                    <Container>
                        <Menu.Item onClick={this.handleReturn}>
                                <Image style={{ height: '1.5em', width: '1.5em' }} src='/images/logo.png'/>
                                 <p style={{
                                     fontFamily: 'Nunito',
                                     fontSize: '1.5em',
                                     marginLeft: '.5em',
                                     letterSpacing: '2px'}}>PHLY</p>
                        </Menu.Item>
                    </Container>
                </Menu>

                <Responsive>
                    <Segment style={{ padding: '8em', paddingTop: '9em', backgroundColor: '#F9FFFF'}} vertical>
                        <Header as='h1'
                                color='orange'
                                style={{
                                    fontSize: '2.5em',
                                    letterSpacing: '1.5px' }}>
                            Explore Current Campaigns
                        </Header>
                        <Card.Group itemsPerRow={3} items={items} />
                    </Segment>
                </Responsive>
            </div>
        )
    }
}

export default MarketplaceContainer = withTracker(() => {
    Meteor.subscribe('campaigns');
    let campaigns = Campaigns.find().fetch();
    return {
        campaigns: campaigns
    }
})(Marketplace);
