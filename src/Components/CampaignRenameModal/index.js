import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ACTIVITY_TYPE } from '../../constants';
import {
  updateActivityList, 
  updateCampaignList 
} from '../../Actions/index';
import {
  generateActivity,
  updateActivities,
} from './../../utils';
import './style.scss';

class CampaignRenameModal extends Component {

  handleUpdate() {
    let campaignName = document.getElementsByName('campaign_name')[0].value;
    let index = this.props.campaigns.findIndex(c => c.id === this.props.campaign.id);

    if(index > -1 && campaignName.trim()) {
      // Updating campaign name
      let { campaigns } = this.props;
      let content = 'Changed from '.concat(this.props.campaign.name, ' to ', campaignName);
      campaigns[index].name = campaignName;
      this.props.updateCampaigns(campaigns);
      localStorage.setItem('engage_campaigns', JSON.stringify(campaigns));

      // Adding rename activity
      let activity = generateActivity(ACTIVITY_TYPE.RENAME, this.props.campaign.id, this.props.activities, content);
      updateActivities(activity, this.props);
      this.handleClose();
    }
  }

  handleClose() {
    this.props.handleCloseModal();  
  }

  render() {
    return (
        <div id="campaign-rename-modal" className="modal">
          <div className="modal-overlay" />
          <div className="modal-wrapper">
              <p className="modal-header">Rename Campaign</p>
              <div id="modal-body" className="modal-body">
              <div className="form-element">
                  <input placeholder="Enter Campaign name" 
                    name="campaign_name" 
                    defaultValue={this.props.campaign.name}/>
              </div>
              <button className="btn" onClick={() => this.handleUpdate()}>Update</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CampaignRenameModal);
