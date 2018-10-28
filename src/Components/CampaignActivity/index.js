import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  ACTIVITY_TYPE,
  ACTIVITY_TYPE_DISPLAY_STRING
} from '../../constants';
import './style.scss';

function getActivityIcon(type) {
  switch (type) {
    case ACTIVITY_TYPE.ADD:
      return '<i class="material-icons add-icon">add_circle</i>'
    case ACTIVITY_TYPE.COMMENT:
      return '<i class="material-icons comment-icon">comment</i>'
    case ACTIVITY_TYPE.PAUSE:
      return '<i class="material-icons pause-icon">pause_circle_filled</i>'
    case ACTIVITY_TYPE.RENAME:
      return '<i class="material-icons edit-icon">edit</i>'
    case ACTIVITY_TYPE.RESUME:
      return '<i class="material-icons play-icon">play_circle_filled</i>'
    case ACTIVITY_TYPE.DELETE:
      return '<i class="material-icons delete-icon">delete</i>'  
    default:
      return ''
  }
}

class CampaignActivity extends Component {

  getActivities(campaignId) {
    let activities = this.props.activities.filter((o) => { return o.campaign_id === campaignId });
    return activities.sort((a, b) => { return b.id - a.id});
  }

  render() {
    let campaign = this.props.selectedCampaign;
    return (
        <div id="campaign-activity-wrapper">
          <div>
            <div id="campaign-activity-header">
                <i className="material-icons">history</i>
                <div id="campaign-activity-header-title">
                  <p className="title">History</p>
                  <p className="title">{campaign.name}</p>
                </div>
            </div>
              <ul id="campaign-activity-body">
                {Object.keys(campaign).length ? (
                  this.getActivities(campaign.id).map(activity => {
                    return (
                      <li key={activity.id}>
                        <div className="action-icon-block">
                          <span dangerouslySetInnerHTML={{__html: getActivityIcon(activity.type)}}/>
                        </div>
                        <div className="action-content">
                          <p className="action-text">
                            {ACTIVITY_TYPE_DISPLAY_STRING[activity.type]}
                          </p>
                          <p className="action-user">by {activity.author}</p>
                          <p className="action-comment">{activity.content}</p>
                        </div>
                      </li>
                    )
                  })
                ) : ''}
              </ul>
            </div>
          </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedCampaign: state.selectedCampaignReducer.result || {},
  activities: state.activityReducer.result || [],
})

export default connect(mapStateToProps, {})(CampaignActivity);
