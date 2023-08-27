import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';

import appReducer from './features/appSlice';
import authReducer from './features/auth/authSlice';
import { bitcoinApi } from './services/app';
// import middleware from './middleware';
import { apiSlice } from './features/api/apiSlice';

const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: ['auth'],
};

export const rootReducer = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
	[bitcoinApi.reducerPath]: bitcoinApi.reducer,
	app: appReducer,
	auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(apiSlice.middleware, bitcoinApi.middleware);
	},
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
