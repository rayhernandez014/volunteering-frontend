import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import mobileReducer from './reducers/mobileReducer'
import confirmationReducer from './reducers/confirmationReducer'
import eventFormReducer from './reducers/eventFormReducer'
import eventReducer from './reducers/eventReducer'

const store = configureStore({
  reducer: {
    event: eventReducer,
    notification: notificationReducer,
    login: loginReducer,
    user: userReducer,
    mobile: mobileReducer,
    confirmation: confirmationReducer,
    eventForm: eventFormReducer
  }
})

export default store