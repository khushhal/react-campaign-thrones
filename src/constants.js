export const UPDATE_CAMPAIGN_LIST = 'UPDATE_CAMPAIGN_LIST';
export const UPDATE_ACTIVITY_LIST = 'UPDATE_ACTIVITY_LIST';
export const CAMPAIGN_SELECTED_FOR_ACTIVITY = 'CAMPAIGN_SELECTED_FOR_ACTIVITY';

export const ACTIVITY_TYPE = {
    'ADD': 'ADD',
    'PAUSE': 'PAUSE',
    'COMMENT': 'COMMENT',
    'RENAME': 'RENAME',
    'RESUME': 'RESUME',
    'DELETE': 'DELETE',
}

export const ACTIVITY_TYPE_DISPLAY_STRING = {
    [ACTIVITY_TYPE.ADD]: 'Campaign Created',
    [ACTIVITY_TYPE.PAUSE]: 'Campaign Paused',
    [ACTIVITY_TYPE.COMMENT]: 'Comment Added',
    [ACTIVITY_TYPE.RENAME]: 'Campaign Renamed',
    [ACTIVITY_TYPE.RESUME]: 'Campaign Resumed',
    [ACTIVITY_TYPE.DELETE]: 'Campaign Deleted',
}