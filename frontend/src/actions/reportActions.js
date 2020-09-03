import {LOAD_REPORTS_SUCCESS, 
    LOAD_REPORT_SUCCESS, 
    CREATE_REPORT_SUCCESS,
    UPDATE_REPORT_SUCCESS,
    DELETE_REPORT_SUCCESS} from './types';

import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import axios from 'axios';

export function loadReportsSuccess(reports)
{
	return {type: LOAD_REPORTS_SUCCESS, reports};
}

export function loadReportSuccess(report) 
{
    return { type: LOAD_REPORT_SUCCESS, report };
}

export function createReportSuccess(report)
{
	return {type: CREATE_REPORT_SUCCESS, report};
}

export function updateReportSuccess(report)
{
	return {type: UPDATE_REPORT_SUCCESS, report};
}

export function deleteReportSuccess(report)
{
	return {type: DELETE_REPORT_SUCCESS, report};
}



export const loadReports = (keywords, iniDate, finDate, title) => dispatch => 
{
    dispatch(beginAjaxCall());
    axios
        .get('/api/reports',{
            params: {
                keywords,
                iniDate,
                finDate,
                title
            }
          })   
        .then(res => {
            dispatch(loadReportsSuccess(res.data));
        })
        .catch(error => {
            throw(error);
        });
};


export const saveReport = (report) => {

    if (report._id !=="") {
        return updateReport(report);
    }

    return createReport(report);
}

const updateReport = (report) => dispatch => {

    dispatch(beginAjaxCall());
    axios
        .put('/api/reports/'+ report._id, report)   
        .then(res => {
            dispatch(updateReportSuccess(report));
        })
        .catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
}


const createReport = (report) => dispatch => {

    dispatch(beginAjaxCall());
    axios
        .post('/api/reports', report)   
        .then(res => {
            console.log('res');
            dispatch(createReportSuccess(res.data));
        })
        .catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
}

export const deleteReport = (report) => dispatch => {

    dispatch(beginAjaxCall());
    axios
        .delete('/api/reports/'+ report._id)   
        .then(res => {
            dispatch(deleteReportSuccess(report));
        })
        .catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
}