import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ACTIVITY_TYPE } from '../../constants';
import { 
  updateCampaignList, 
  updateActivityList
} from '../../Actions/index';
import { 
  getNextObjectId,
  generateActivity,
  updateCampaigns,
  updateActivities
} from './../../utils';

import './style.scss';

class CampaignModal extends Component {
 
  handleAdd() {
    let campaignName = document.getElementsByName('campaign-name')[0].value;
    if(campaignName.trim()) {
      let dateTimeNow = new Date().toUTCString();
      // Adding campaign
      let campaign = this.generateCampaign(campaignName, dateTimeNow);
      updateCampaigns(campaign, this.props);

      // Adding activity
      let activity = generateActivity(ACTIVITY_TYPE.ADD, campaign.id, this.props.activities);
      updateActivities(activity, this.props);

      this.handleClose();
    }
  }

  generateCampaign(name, dateTimeNow) {
    return {
      name,
      active: true,
      created_at: new Date().toUTCString(),
      id: getNextObjectId(this.props.campaigns),
      author: localStorage.getItem("engage_user")
    }
  }

  handleClose() {
    this.props.handleCloseModal();  
  }  

  render() {
    return (
        <div id="campaign-add-modal" className="modal">
          <div className="modal-overlay" />
          <div className="modal-wrapper">
              <p className="modal-header">Add Campaign</p>
              <div id="modal-body" className="modal-body">
              <div className="form-element">
                  <input placeholder="Enter campaign name" name="campaign-name"/>
              </div>
              <button className="btn" onClick={() => this.handleAdd()}>Add</button>
              <button className="btn secondary" onClick={() => this.handleClose()}>Close</button>
              </div>
          </div>
        </div>
    );
  }
}


const mapStateToProps = state => ({
  campaigns: state.campaignReducer.result || [],
  activities: state.activityReducer.result || [],
})

const mapDispatchToProps = dispatch => ({
  updateCampaigns: (campaigns) => dispatch(updateCampaignList(campaigns)),
  updateActivities: (activities) => dispatch(updateActivityList(activities))
})

export default connect(mapStateToProps, mapDispatchToProps)(CampaignModal);
