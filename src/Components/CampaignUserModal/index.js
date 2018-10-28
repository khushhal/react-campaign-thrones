import React, { Component } from 'react';
import './style.scss';

function convertToSlug(text) {
  return text.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
}

class CampaignUserModal extends Component {

  createUser() {
    let userName = document.getElementsByName('user-name')[0].value;
    if(userName.trim()) {
      localStorage.setItem('engage_user', convertToSlug(userName));
      this.props.handleCloseModal();
    }
  }

  render() {
    return (
        <div id="campaign-user-modal" className="modal">
          <div className="modal-overlay" />
          <div className="modal-wrapper">
              <p className="modal-header">Add User</p>
              <div id="modal-body" className="modal-body">
              <div className="form-element">
                  <input placeholder="Enter Your name" name="user-name"/>
              </div>
              <button className="btn" onClick={() => this.createUser()}>Add</button>
              </div>
          </div>
        </div>
    );
  }
}

export default CampaignUserModal;
