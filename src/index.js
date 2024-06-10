import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './data/store';
import { Home } from './components/Home';
import { Tracker } from './components/Tracker';
import './index.css';
import { Provider } from 'react-redux';

const container = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter([
	{
		path: '/habitredux',
		element: <Home />,
	},
	{
		path: '/habitredux/:id',
		element: <Tracker />,
	},
]);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>,
);
