import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from './firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const initialState = {
	status: 'idle',
	error: null,
};


export const updateHabitThunk = createAsyncThunk(
	'habits/updateHabit',
	async ({ habitId, tracker }) => {
		try {
			const habitDocRef = doc(db, 'Habits', habitId);
			await setDoc(habitDocRef, { tracker }, { merge: true });
			return { habitId, tracker };
		} catch (error) {
			console.error('Error updating habit: ', error);
			throw error;
		}
	},
);


const updateSlice = createSlice({
	name: 'update',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(updateHabitThunk.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(updateHabitThunk.fulfilled, (state) => {
				state.status = 'succeeded';
			})
			.addCase(updateHabitThunk.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const selectUpdateStatus = (state) => state.update.status;
export const selectUpdateError = (state) => state.update.error;

export default updateSlice.reducer;
