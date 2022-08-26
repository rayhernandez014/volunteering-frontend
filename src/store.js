import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import eventReducer from './reducers/eventReducer'
import mobileReducer from './reducers/mobileReducer'
import confirmationReducer from './reducers/confirmationReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    login: loginReducer,
    user: userReducer,
    event: eventReducer,
    mobile: mobileReducer,
    confirmation: confirmationReducer
  }
})

export default store