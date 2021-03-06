import { usersReducer } from '../usersReducer'
import { userActionTypes as A, logoutUser } from '../actions/userActions'

const fakeUser = { name:"Mike", password:"1234", username:"m22" }
describe('AUTH_USER', ()=>{
	const fakeTrueAuthState = { authenticating:true }

	it('should set authenticating to true and error to empty string', ()=>{
		const fakeState = { authenticating:false }
		const action = {type:A.AUTH_USER_PENDING}
		
		expect(usersReducer(fakeState, action)).toHaveProperty('authenticating', true)
		expect(usersReducer(fakeState, action)).toHaveProperty('error', "")
	})
	
	it('should set authenticating to false', ()=>{
		
		const action = { type:A.AUTH_USER_REJECTED, payload:{} }
		
		expect(usersReducer(fakeTrueAuthState, action)).toHaveProperty('authenticating', false)
	})
	
	it('should set authenticating to false', ()=>{
		
		const action = { type:A.AUTH_USER_FULFILLED, payload:{} }
		
		expect(usersReducer(fakeTrueAuthState, action)).toHaveProperty('authenticating', false)
	})


	it('should set user to fakeUser', ()=>{
		
		const action = { type:A.AUTH_USER_FULFILLED, payload:{user:fakeUser} }
		
		expect(usersReducer(fakeTrueAuthState, action)).toHaveProperty('user', fakeUser)
	})

	it('should set loggedIn to true', ()=>{
		
		const action = { type:A.AUTH_USER_FULFILLED, payload:{ user:fakeUser } }
		
		expect(usersReducer(fakeTrueAuthState, action)).toHaveProperty('loggedIn', true)
	})

	it('should set user to fakeUser, set authenticating to false, & set loggedIn to true', ()=>{
		
		const action = { type:A.AUTH_USER_FULFILLED, payload:{ user:fakeUser } }
		const newState = { user:fakeUser, authenticating:false, loggedIn:true }
		
		expect(usersReducer(fakeTrueAuthState, action)).toEqual(newState)

	})

	it('should set authenticating to false and set error', ()=>{
		const fakeError = "Bad"
		const action = { type:A.AUTH_USER_REJECTED, payload:{ error:fakeError } }
		
		expect(usersReducer(fakeTrueAuthState, action)).toHaveProperty('error', fakeError)
	})
})


describe('LOGOUT', ()=>{
	
	const fakeLoggedInUser = { user: fakeUser, loggedIn:true }

	it('should set loggedIn to false', ()=>{
		expect(usersReducer(fakeLoggedInUser, logoutUser())).toHaveProperty('loggedIn', false)
	})

	it('should set user to null',()=>{
		expect(usersReducer(fakeLoggedInUser, logoutUser())).toHaveProperty('user', null)
	})

	it('should set user to null and loggedIn to false',()=>{
		expect(usersReducer(fakeLoggedInUser, logoutUser())).toEqual({user:null, loggedIn:false})
	})

	it('should set user to null and loggedIn to false but not change state',()=>{
		expect(usersReducer({authenticating:false, ...fakeLoggedInUser}, logoutUser())).toEqual({user:null, loggedIn:false, authenticating:false})
	})

})





