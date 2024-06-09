import { useDispatch, useSelector } from 'react-redux';
import { addHabitsThunk, selectStatus, selectError } from '../data/addReducer';
import { fetchHabitsThunk, selectHabits } from '../data/fetchReducer';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from './Nav';
import './Home.css';

export function Home() {
	const ref = useRef();
	const dispatch = useDispatch();
	const habits = useSelector(selectHabits);
	const status = useSelector(selectStatus);
	const error = useSelector(selectError);

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
					{status === 'loading' && <p>Loading...</p>}
					{status === 'failed' && <p>Error: {error}</p>}
					{habits.map((data) => (
						<Link
							to={`/${data.id}`}
							key={data.id}>
							<div className='habits'>{data.habit}</div>
						</Link>
					))}
				</div>
			</div>
		</>
	);
}
