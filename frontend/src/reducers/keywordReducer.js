import { LOAD_KEYWORDS_SUCCESS, CREATE_KEYWORD_SUCCESS} from '../actions/types';

const initialState = {
    keywords:[]
}
export default function(state = initialState, action){
	
    switch(action.type)
    {
		case LOAD_KEYWORDS_SUCCESS:
			return action.keywords;

		case CREATE_KEYWORD_SUCCESS:
			return [
				...state,
				Object.assign({}, action.keyword)
			];

	
		default:
			return state;
	}
}