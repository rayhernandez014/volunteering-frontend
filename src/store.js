import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import eventReducer from './reducers/eventReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    login: loginReducer,
    user: userReducer,
    event: eventReducer
  }
})

export default store