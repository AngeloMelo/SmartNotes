import {
    LOAD_REPORTS_SUCCESS, 
    CREATE_REPORT_SUCCESS,
    UPDATE_REPORT_SUCCESS,
    DELETE_REPORT_SUCCESS} from '../actions/types';

const initialState = [];

export default function(state = initialState, action){
	
    switch(action.type)
    {
		case LOAD_REPORTS_SUCCESS:
			return action.reports;

		case CREATE_REPORT_SUCCESS:
			return [
				...state,
				Object.assign({}, action.report)
			];

		case UPDATE_REPORT_SUCCESS:
			return [
				...state.filter(report => report._id !== action.report._id),
				Object.assign({}, action.report)
			];

		case DELETE_REPORT_SUCCESS:
			return [
                ...state.filter(report => report._id !== action.report._id)
			];	

		default:
			return state;
	}
}