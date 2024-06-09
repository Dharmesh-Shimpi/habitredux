import { configureStore } from '@reduxjs/toolkit';
import addReducer from './addReducer';
import fetchReducer from './fetchReducer';
import updateReducer from './updateReducer';

export const store = configureStore({
	reducer: {
		add: addReducer,
		fetch: fetchReducer,
		update: updateReducer,
	},
});
