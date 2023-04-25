import {configureStore} from '@reduxjs/toolkit'
import { profileReducer, subscriptionReducer, userReducer } from './reducers/userReducer'
import { courseReducer } from './reducers/courseReducer'
import { adminReducer } from './reducers/AdminReducer'
import { otherReducer } from './reducers/otherReducer'
export const server='http://localhost:4000/api/v1'
 const store=configureStore({
    reducer:{
        user:userReducer,
        profile:profileReducer,
        courses:courseReducer,
        subscription:subscriptionReducer,
        admin:adminReducer,
        other:otherReducer
    }
})
export default store