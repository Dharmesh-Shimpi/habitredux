import { useDispatch, useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from './Nav';
import {
	addHabitsThunk,
	selectStatus as selectAddStatus,
	selectError as selectAddError,
} from '../data/addReducer';
import {
	fetchHabitsThunk,
	selectHabits,
	selectFetchStatus,
	selectFetchError,
} from '../data/fetchReducer';
import './Home.css';

export function Home() {
	const ref = useRef();
	const dispatch = useDispatch();
	const habits = useSelector(selectHabits);
	const addStatus = useSelector(selectAddStatus);
	const addError = useSelector(selectAddError);
	const fetchStatus = useSelector(selectFetchStatus);
	const fetchError = useSelector(selectFetchError);

	useEffect(() => {
		dispatch(fetchHabitsThunk());
	}, [dispatch]);

	function handleClick() {
		const habit = ref.current.value;
		if (habit) {
			dispatch(addHabitsThunk({ habit })).then(() => {
				dispatch(fetchHabitsThunk()); // Refresh the habits list after adding a new habit
			});
			ref.current.value = '';
		}
	}

	return (
		<>
			<Nav />
			<div className='body'>
				<div className='main'>
					<div className='input'>
						<input
							ref={ref}
							type='text'
							placeholder='Enter habit here...'
						/>
						<button onClick={handleClick}>Add Habit</button>
					</div>
					{fetchStatus === 'loading' && <p>Loading...</p>}
					{fetchStatus === 'failed' && <p>Error: {fetchError}</p>}
					{addStatus === 'failed' && <p>Error: {addError}</p>}
					{habits.map((data) => (
						<Link
							to={`/habitredux/${data.id}`}
							key={data.id}>
							<div className='habits'>{data.habit}</div>
						</Link>
					))}
				</div>
			</div>
		</>
	);
}
