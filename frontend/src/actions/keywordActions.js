import {LOAD_KEYWORDS_SUCCESS, 
    CREATE_KEYWORD_SUCCESS} from './types';

import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import axios from 'axios';

export function loadKeywordsSuccess(keywords)
{
	return {type: LOAD_KEYWORDS_SUCCESS, keywords};
}

export function createKeywordSuccess(keyword)
{
	return {type: CREATE_KEYWORD_SUCCESS, keyword};
}

export const loadKeywords = () => dispatch => 
{
    dispatch(beginAjaxCall());
    axios
        .get('/api/keywords')   
        .then(res => {
            dispatch(loadKeywordsSuccess(res.data));
        })
        .catch(error => {
            throw(error);
        });
};


export const saveKeyword = (keyword) => {

    // if (report._id !=="") {
    //     return updateReport(report);
    // }

    return createKeyword(keyword);
}

// const updateReport = (report) => dispatch => {

//     dispatch(beginAjaxCall());
//     axios
//         .put('/api/reports/'+ report._id, report)   
//         .then(res => {
//             dispatch(updateReportSuccess(report));
//         })
//         .catch(error => {
//             dispatch(ajaxCallError(error));
//             throw(error);
//         });
// }


const createKeyword = (keyword) => dispatch => {

    dispatch(beginAjaxCall());
    return axios
        .post('/api/keywords', keyword)   
        .then(res => {
            dispatch(createKeywordSuccess(res.data));
        })
        .catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
}