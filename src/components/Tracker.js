import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectHabitById } from '../data/fetchReducer';
import { updateHabitThunk } from '../data/updateReducer';
import { Nav } from './Nav';
import './Tracker.css';
import { useState } from 'react';

export function Tracker() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const habit = useSelector((state) => selectHabitById(state, id));
	const [visibleButtonIndex, setVisibleButtonIndex] = useState(null);

	if (!habit) {
		return <div>Habit not found</div>;
	}

	function handleUpdate(date, value) {
		dispatch(updateHabitThunk({ habitId: id, date, value })).then(() => {
			// Update the local state to reflect the changes
			const updatedTracker = habit.tracker.map((entry) =>
				entry.date.toDate().getTime() === date.getTime()
					? { ...entry, value }
					: entry,
			);
			const updatedHabit = { ...habit, tracker: updatedTracker };
			setVisibleButtonIndex(null);
		});
	}

	// Extract month and year from the first tracker's date
	const monthYear =
		habit.tracker.length > 0
			? habit.tracker[0].date
					.toDate()
					.toLocaleString('default', { month: 'long', year: 'numeric' })
			: '';

	function handleDiv(index) {
		setVisibleButtonIndex(visibleButtonIndex === index ? null : index);
	}

	return (
		<>
			<Nav />
			<div className='body'>
				<div className='main'>
					<h3>{habit.habit}</h3>
					{monthYear && <div className='month-year'>{monthYear}</div>}
					<div className='calendar'>
						{habit.tracker.map((entry, i) => {
							const [day, , date] = entry.date.toDate().toDateString().split(' ');
							return (
								<div
									className='dates-div'
									key={i}
									onClick={() => handleDiv(i)}>
									<span className='date'>
										{day}, {date}
									</span>
									<span className='value'>
										{entry.value === 1 && <i className='fa-solid fa-check'></i>}
										{entry.value === -1 && <i className='fa-solid fa-xmark'></i>}
									</span>
									{visibleButtonIndex === i && (
										<div className='button'>
											<i
												className='fa-solid fa-check'
												onClick={(e) => {
													e.stopPropagation();
													handleUpdate(entry.date.toDate(), 1);
												}}></i>
											<i
												className='fa-solid fa-xmark'
												onClick={(e) => {
													e.stopPropagation();
													handleUpdate(entry.date.toDate(), -1);
												}}></i>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}
