import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withHistory, Link } from 'react-router-dom';
import Campaign from '../Campaign.jsx';
import { createContainer } from 'meteor/react-meteor-data';
//wasn't working when overrode original Campaign, so made Campaigns1, probabaly easy fix
import { Campaigns1 } from '../../api/campaigns1.js';
import PropTypes from 'prop-types';
// import ListOfCampaigns from '..ListOfCampaigns.jsx';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';

export class CampaignList extends Component {
    constructor(props){
      super(props);

      //setting up state
      this.state = { campaigns: [] };
    }


    //problem might be with 'Campaign' here, because this part was
    //different from the tutorial, but this code chunk was
    //already written(i think by Grace)
    renderCampaigns() {
        let myCampaigns = this.props.campaigns;
        return myCampaigns.map((campaign) => {
                <Campaign
                    key={campaign._id}
                    campaign={campaign}
                />
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        Meteor.call('campaigns.insert', name);
        ReactDOM.findDOMNode(this.refs.nameInput).value = '';
    }


    render() {
        let currentUser = this.props.currentUser;
        let userDataAvailable = (currentUser !== undefined);



        return(
          // we need to figure out how to display the campaign name from
          // the renderCampaigns method. It might just be an easy html thing
          // but I couldn't get it to show up. Maybe Grace knows
            <div className="card-body">
                <form className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        ref="nameInput"
                        placeholder=" Add new campaign"
                    />
                </form>
                <ul className="list-group">
                    {this.renderCampaigns()}
                </ul>
                <div className="form-group">
                  <small className="form-text text-muted">
                      <Link to="/addCampaign" className="waves-effect waves-light btn">Create New Campaign</Link>
                  </small>
                </div>
            </div>

        )
    }
}

//saying that the prop types must be an array, or else dont accept it
CampaignList.propTypes = {
  campaigns: PropTypes.array.isRequired,
};

//subscribing to campaigns db
export default createContainer(() => {
  Meteor.subscribe('campaigns');
  //sorts by name
  return{
    campaigns: Campaigns1.find({}, {sort: {name: 1}}).fetch(),

  };
}, CampaignList);
