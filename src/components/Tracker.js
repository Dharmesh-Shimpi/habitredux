import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchTrackerByIdThunk,
	selectHabitById,
	fetchSelector,
} from '../data/fetchReducer';
import { updateHabitThunk } from '../data/updateReducer';
import { Nav } from './Nav';
import { useEffect, useState } from 'react';
import './Tracker.css';

export function Tracker() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const habit = useSelector((state) => selectHabitById(state, id));
	const [visibleButtonIndex, setVisibleButtonIndex] = useState(null);

	useEffect(() => {
		if (habit && habit.tracker) {
			dispatch(fetchTrackerByIdThunk(habit.tracker));
		}
	}, [dispatch, habit]);

	const tracker = useSelector((state) => fetchSelector(state));

	if (!habit) {
		return <div>Habit not found</div>;
	}

	if (tracker.length === 0) {
		return <div>Loading...</div>;
	}

	const monthYear = tracker[0].date.split(' ');
	const month = monthYear[1];
	const year = monthYear[3];

	function handleUpdate(date, value) {
		dispatch(updateHabitThunk({ habitId: id, date, value }))
			.then(() => {
				setVisibleButtonIndex(null);
			})
			.then(() => {
				if (habit && habit.tracker) {
					dispatch(fetchTrackerByIdThunk(habit.tracker));
				}
			});
	}

	function handleDiv(index) {
		setVisibleButtonIndex(visibleButtonIndex === index ? null : index);
	}

	return (
		<>
			<Nav />
			<div className='body'>
				<div className='main'>
					<h3>{habit.habit}</h3>
					{monthYear && (
						<div className='month-year'>
							{month} {year}
						</div>
					)}
					<div className='calendar'>
						{tracker.map((entry, i) => {
							const [day, , date] = entry.date.split(' ');

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
													handleUpdate(entry.date, 1);
												}}></i>
											<i
												className='fa-solid fa-xmark'
												onClick={(e) => {
													e.stopPropagation();
													handleUpdate(entry.date, -1);
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
