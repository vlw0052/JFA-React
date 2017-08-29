import { userActionTypes as A } from './actions/userActions'
const initialState = { loggedIn:false, authenticating:false, error:"", user:{} }

export const usersReducer = (state = initialState, action) => {
	switch(action.type){
		case A.AUTH_USER_PENDING:
			return {
				...state,
				authenticating:true
			}
		case A.AUTH_USER_FULFILLED:
			return {
				...state,
				user:action.payload.user,
				authenticating:false,
				loggedIn:true
			}
		case A.AUTH_USER_REJECTED:
			return {
				...state,
				error:action.payload.error,
				authenticating:false
			}
		default: 
	}
	console.log(state, action);
	return state
}