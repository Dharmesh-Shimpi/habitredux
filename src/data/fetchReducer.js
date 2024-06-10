// fetchReducer.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

const initialState = {
	habits: [],
	tracker: [],
	status: 'idle',
	error: null,
};

// Fetch habits thunk
export const fetchHabitsThunk = createAsyncThunk(
	'habits/fetchHabits',
	async () => {
		try {
			const habitsCollection = await getDocs(collection(db, 'Habits'));
			
			const habits = habitsCollection.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			return habits;
		} catch (error) {
			console.error('Error fetching habits: ', error);
			throw error;
		}
	},
);

// Fetch tracker by ID thunk
export const fetchTrackerByIdThunk = createAsyncThunk(
	'habits/fetchTrackerById',
	async (trackerId) => {
		try {
			const trackerDoc = await getDoc(doc(db, 'TrackerDates', trackerId));
			const trackerData = trackerDoc.data().tracker;
			console.log(trackerData);
			return trackerData;
		} catch (error) {
			console.error('Error fetching tracker: ', error);
			throw error;
		}
	},
);

const fetchSlice = createSlice({
	name: 'fetch',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchHabitsThunk.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchHabitsThunk.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.habits = action.payload;
			})
			.addCase(fetchHabitsThunk.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(fetchTrackerByIdThunk.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchTrackerByIdThunk.fulfilled, (state, action) => {
				state.status = 'succeeded';
				console.log(action.payload);
				state.tracker = action.payload;
			})
			.addCase(fetchTrackerByIdThunk.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const selectHabitById = (state, habitId) =>
	state.fetch.habits.find((habit) => habit.id === habitId);

export const selectHabits = (state) => state.fetch.habits;
export const selectFetchStatus = (state) => state.fetch.status;
export const selectFetchError = (state) => state.fetch.error;
export const fetchSelector = (state) => state.fetch.tracker;

export default fetchSlice.reducer;
