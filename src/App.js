import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';

import { 
  updateCampaignList,
  updateActivityList
} from './Actions/';

import CampaignUserModal from './Components/CampaignUserModal/';
import CampaignModal from './Components/CampaignModal/';
import CampaignList from './Components/CampaignList/';
import CampaignActivity from './Components/CampaignActivity/';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      authenticationModalVisible: false
    }
  }

  componentWillMount() {
    let user = localStorage.getItem("engage_user");
    if(user) {
      this.setActivitiesAndCampaigns();
    } else {
      this.setState({ authenticationModalVisible: true });
      localStorage.removeItem('engage_campaigns')
      localStorage.removeItem('engage_activities')
    }
  }

  toggleCampaignModal() {
    this.setState({
      visible: !this.state.visible
    })
  }

  setActivitiesAndCampaigns() {
    let campaigns = [];
    let activities = [];

    if(localStorage.getItem("engage_campaigns")) {
      campaigns = JSON.parse(localStorage.getItem("engage_campaigns"));
    }
    if(localStorage.getItem("engage_activities")) {
      activities = JSON.parse(localStorage.getItem("engage_activities"));
    }

    this.props.initializeCampaigns(campaigns);
    this.props.initializeActivities(activities);
  }

  render() {
    return (
      <div id="app-container">
        <div id="title-bar">
          <i className="material-icons">mail</i>
          <span className="title">All Campaigns</span>
        </div>
        <div id="header">
          <i className="material-icons" id="sort-icon">sort</i>
          <span className="title">Campaign List</span>
          <button className="btn" onClick={() => this.toggleCampaignModal()}>Create new</button>
        </div>
        <div id="app-body-wrapper">
          <CampaignList />
          <CampaignActivity />
        </div>
        {this.state.authenticationModalVisible ? <CampaignUserModal handleCloseModal={() => this.setState({authenticationModalVisible: false})} /> : ''}
        {this.state.visible ? <CampaignModal handleCloseModal={() => this.toggleCampaignModal()} /> : ''}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  initializeCampaigns: (campaigns) => dispatch(updateCampaignList(campaigns)),
  initializeActivities: (activities) => dispatch(updateActivityList(activities))
})

export default connect(null, mapDispatchToProps)(App);
