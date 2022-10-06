// import { compose } from 'redux'
// import { configureStore } from '@reduxjs/toolkit'
// import reducer from './reducer.js'
// import ThunkMiddleware from 'redux-thunk'

// const storeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose
// const store = configureStore({
//   reducer,
//   middleware: [ThunkMiddleware],
//   enhancers: storeEnhancer,
// })

// export default store

import { applyMiddleware, createStore, compose } from 'redux'
import reducer from './reducer.js'
import thunkMiddleware from 'redux-thunk'

const storeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose
const storeMiddleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, storeEnhancer(storeMiddleware))

export default store
