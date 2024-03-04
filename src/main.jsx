import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './error-page';
import Login from './routes/login';
import CreateUser from './routes/createUser';
import Start from './routes/start';
import Quiz from './routes/quiz';
import Results from './routes/results';
import 'bootstrap/dist/css/bootstrap.min.css';

import './css/index.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <Login />,
			},
			{
				path: 'create-user/',
				element: <CreateUser />,
			},
			{
				path: 'start/',
				element: <Start />,
			},
			{
				path: 'quiz/',
				element: <Quiz />,
			},
			{
				path: 'results/',
				element: <Results />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
