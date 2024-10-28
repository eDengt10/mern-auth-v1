import { configureStore } from "@reduxjs/toolkit";
import {persistReducer, persistStore} from 'redux-persist'
import localStorage from "redux-persist/lib/storage";
import userReducer from './slices/userSlice'
import adminReducer from './slices/adminSlice'

const persistConfig =  {
	key: 'root',
	storage: localStorage,
}
const persistedReducer = persistReducer(persistConfig, userReducer)

const store = configureStore({
	reducer: {
		user:  persistedReducer,

	},
});

const persistor = persistStore(store)


export {store, persistor};
