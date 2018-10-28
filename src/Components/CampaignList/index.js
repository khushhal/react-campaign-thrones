import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ACTIVITY_TYPE } from '../../constants';
import { 
  updateActivityList, 
  updateCampaignList,
  selectCampaignForActivity
} from '../../Actions/index';
import { 
  generateActivity,
  updateActivities
} from './../../utils';

import CampaignCommentModal from './../CampaignCommentModal';
import CampaignRenameModal from './../CampaignRenameModal';

import './style.scss';

class CampaignList extends Component { 

  constructor(props) {
    super(props);
    this.state = {
      commentModalVisible: false,
      renameModalVisible: false,
      selectedCampaign: {}
    }
  }

  isCampaignSelected(campaignId) {
    return this.props.selectedCampaign && this.props.selectedCampaign.id === campaignId;
  }

  toggleModal(modalState, selectedCampaign = {}) {
    this.setState({
      [modalState]: !this.state[modalState],
      selectedCampaign
    })
  }

  handleCampaignState(campaign) {
    let index = this.props.campaigns.findIndex(c => c.id === campaign.id);
    if(index > -1) {
      let { campaigns } = this.props;
      let campaignState = campaigns[index].active ? ACTIVITY_TYPE.PAUSE : ACTIVITY_TYPE.RESUME;
      campaigns[index].active = !campaigns[index].active;
      this.props.updateCampaigns(campaigns);
      localStorage.setItem('engage_campaigns', JSON.stringify(campaigns));

      // Adding activity
      let activity = generateActivity(campaignState, campaign.id, this.props.activities);
      updateActivities(activity, this.props);
    }
  }

  handleCampaignDeletion(campaignId) {
    let index = this.props.campaigns.findIndex(c => c.id === campaignId);
    if(index > -1) {
      let { campaigns } = this.props;
      campaigns[index].type = ACTIVITY_TYPE.DELETE;
      this.props.updateCampaigns(campaigns);
      localStorage.setItem('engage_campaigns', JSON.stringify(campaigns));
      // 
      let activity = generateActivity(ACTIVITY_TYPE.DELETE, campaignId, this.props.activities);
      updateActivities(activity, this.props);
    }
  }

  render() {
    return (
        <div id="campaign-list-wrapper">
            <ul id="campaign-list">
              {this.props.campaigns.map(campaign => {
                  return (
                    <li 
                      className={"campaign-list-item " + (this.isCampaignSelected(campaign['id']) ? 'active' : '')} 
                      key={campaign['id']}>
                      <div className="campaign-number" 
                        onClick={() => this.props.updateSelectedCampaign(campaign)}>{campaign['id']}</div>
                      <div className="campaign-detail">
                        <p className="campaign-name title">{campaign['name']}</p>
                        <p className="campaign-created">Created at {campaign['created_at']}</p>
                      </div>
                      {campaign['type'] !== ACTIVITY_TYPE.DELETE ? (
                        <ul className="campaign-actions-list">
                          <li className="campaign-action-list-item" 
                            onClick={() => this.handleCampaignState(campaign)}>
                            {campaign['active'] ? (
                              <span>
                                <i className="material-icons pause-icon">pause_circle_filled</i>
                                <span>Pause</span>
                              </span>
                            ) : (
                              <span>
                                <i className="material-icons play-icon">play_arrow</i>
                                <span>Resume</span>
                              </span>
                            )}
                          </li>
                          <li className="campaign-action-list-item" 
                            onClick={() => this.toggleModal('commentModalVisible', campaign)}>
                            <i className="material-icons comment-icon">comment</i>
                            <span>Comment</span>
                          </li>
                          <li className="campaign-action-list-item"
                          onClick={() => this.toggleModal('renameModalVisible', campaign)}>
                            <i className="material-icons edit-icon">edit</i>
                            <span>Rename</span>
                          </li>
                          <li className="campaign-action-list-item"
                          onClick={() => this.handleCampaignDeletion(campaign.id)}>
                            <i className="material-icons delete-icon">delete</i>
                            <span>Delete</span>
                          </li>
                        </ul>
                       ) : ''}  
                    </li>
                  )
              })}
            </ul>
            {this.state.commentModalVisible ? <CampaignCommentModal 
              handleCloseModal={() => this.toggleModal('commentModalVisible')} 
              campaignId={this.state.selectedCampaign.id}
              /> : ''}

            {this.state.renameModalVisible ? <CampaignRenameModal 
              handleCloseModal={() => this.toggleModal('renameModalVisible')} 
              campaign={this.state.selectedCampaign}
              /> : ''}  
          </div>
    );
  }
}

const mapStateToProps = state => ({
  campaigns: state.campaignReducer.result || [],
  activities: state.activityReducer.result || [],
  selectedCampaign: state.selectedCampaignReducer.result || {}
})

const mapDispatchToProps = dispatch => ({
  updateCampaigns: (campaigns) => dispatch(updateCampaignList(campaigns)),
  updateActivities: (activities) => dispatch(updateActivityList(activities)),
  updateSelectedCampaign: (campaign) => dispatch(selectCampaignForActivity(campaign))
})

export default connect(mapStateToProps, mapDispatchToProps)(CampaignList);
