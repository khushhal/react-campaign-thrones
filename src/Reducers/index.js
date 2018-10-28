import { combineReducers } from 'redux';
import { 
    UPDATE_ACTIVITY_LIST, 
    UPDATE_CAMPAIGN_LIST,
    CAMPAIGN_SELECTED_FOR_ACTIVITY
} from './../constants';

let campaignReducer =  (state = [], action) => {
    switch (action.type) {
        case UPDATE_CAMPAIGN_LIST:
            return {
                result: action.payload
            }
        default:
            return state
    }
}

let activityReducer =  (state = [], action) => {
    switch (action.type) {
        case UPDATE_ACTIVITY_LIST:
            return {
                result: action.payload
            }
        default:
            return state
    }
}

let selectedCampaignReducer =  (state = [], action) => {
    switch (action.type) {
        case CAMPAIGN_SELECTED_FOR_ACTIVITY:
            return {
                result: action.payload
            }
        default:
            return state
    }
}

export default combineReducers({
    campaignReducer, 
    activityReducer, 
    selectedCampaignReducer
});