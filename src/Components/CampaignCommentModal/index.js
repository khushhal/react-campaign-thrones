import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ACTIVITY_TYPE } from '../../constants';
import { updateActivityList } from '../../Actions/index';
import { 
  generateActivity,
  updateActivities
} from './../../utils';
import './style.scss';

class CampaignCommentModal extends Component {

  handleAdd() {
    let comment = document.getElementsByName('comment')[0].value;
    if(comment.trim()) {
      let activity = generateActivity(ACTIVITY_TYPE.COMMENT, this.props.campaignId, this.props.activities, comment);
      updateActivities(activity, this.props);
      this.handleClose();
    }
  }

  handleClose() {
    this.props.handleCloseModal();  
  }

  render() {
    return (
        <div id="campaign-comment-modal" className="modal">
          <div className="modal-overlay" />
          <div className="modal-wrapper">
              <p className="modal-header">Add Comment</p>
              <div id="modal-body" className="modal-body">
              <div className="form-element">
                  <textarea placeholder="Enter comment" name="comment"/>
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
    activities: state.activityReducer.result || [],
})
  
const mapDispatchToProps = dispatch => ({
    updateActivities: (activities) => dispatch(updateActivityList(activities))
})

export default connect(mapStateToProps, mapDispatchToProps)(CampaignCommentModal);
