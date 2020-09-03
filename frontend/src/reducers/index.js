import {combineReducers} from 'redux';
import reportReducer from './reportReducer';
import keywordReducer from './keywordReducer';

export default combineReducers({
    reports : reportReducer,
    keywords: keywordReducer
});