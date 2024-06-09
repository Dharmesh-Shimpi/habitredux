// addReducer.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from './firebaseConfig';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

const initialState = {
	habits: [],
	status: 'idle',
	error: null,
};

export const addHabitsThunk = createAsyncThunk(
	'habits/addHabit',
	async (habitData) => {
		try {
			const tracker = [];
			const today = new Date();
			for (let i = 0; i < 7; i++) {
				const days = new Date(today);
				days.setDate(today.getDate() + i);
				tracker.push({ date: Timestamp.fromDate(days), value: 0 });
			}

			const habitRef = await addDoc(collection(db, 'Habits'), {
				habit: habitData.habit,
				tracker: tracker,
			});

			return { id: habitRef.id, habit: habitData.habit, tracker: tracker };
		} catch (error) {
			console.error('Error adding habit: ', error);
			throw error;
		}
	},
);

const habitsSlice = createSlice({
	name: 'habits',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addHabitsThunk.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(addHabitsThunk.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.habits.push(action.payload);
			})
			.addCase(addHabitsThunk.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const selectHabits = (state) => state.add.habits;
export const selectStatus = (state) => state.add.status;
export const selectError = (state) => state.add.error;

export default habitsSlice.reducer;
