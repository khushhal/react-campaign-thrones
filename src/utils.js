// Method to get the next object id
export const getNextObjectId = (objectList) => {
  if(objectList.length) {
    return Math.max.apply(Math, objectList.map((o) => { return o.id; })) + 1;
  }
  return 1;
}

// Method to update the campaigns in redux store and localstorage
export const updateCampaigns = (campaign, props) => {
  let { campaigns } = JSON.parse(JSON.stringify(props));
  campaigns.push(campaign);
  props.updateCampaigns(campaigns);
  localStorage.setItem('engage_campaigns', JSON.stringify(campaigns));
}

// Method to update the activities in redux store and localstorage
export const updateActivities = (activity, props) => {
  let { activities } = JSON.parse(JSON.stringify(props));
  activities.push(activity);
  props.updateActivities(activities);
  localStorage.setItem('engage_activities', JSON.stringify(activities));
}

// Method to generate activity object
export const generateActivity = (type, campaignId, objectList, content) => {
  return {
    id: getNextObjectId(objectList),
    type,
    content,
    campaign_id: campaignId,
    created_at: new Date().toUTCString(),
    author: localStorage.getItem("engage_user")
  }
}