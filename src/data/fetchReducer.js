import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const initialState = {
	habits: [],
	status: 'idle',
	error: null,
};

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
			});
	},
});

export const selectHabitById = (state, habitId) =>
	state.fetch.habits.find((habit) => habit.id === habitId);

export const selectHabits = (state) => state.fetch.habits;
export const selectFetchStatus = (state) => state.fetch.status;
export const selectFetchError = (state) => state.fetch.error;

export default fetchSlice.reducer;
