import { 
    UPDATE_ACTIVITY_LIST, 
    UPDATE_CAMPAIGN_LIST,
    CAMPAIGN_SELECTED_FOR_ACTIVITY
} from './../constants';

export const updateCampaignList = (campaigns) => {
    return{
        type: UPDATE_CAMPAIGN_LIST,
        payload: campaigns
    }
}

export const updateActivityList = (activities) => {
    return{
        type: UPDATE_ACTIVITY_LIST,
        payload: activities
    }
}

export const selectCampaignForActivity = (campaign) => {
    return{
        type: CAMPAIGN_SELECTED_FOR_ACTIVITY,
        payload: campaign
    }
}