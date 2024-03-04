import { useLocation, useNavigate } from 'react-router-dom';
import Dexie from 'dexie';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../database/quizDataDB';

function Results() {
	//! Get quiz data from the location state
	const { state } = useLocation();

	//! Extract relevant data from the location state
	const { userName, score, timer, operations, problemCount, tables } = state.quizData;

	//! Function to add user to IndexedDB
	const addTestDataToDB = async () => {
		const newQuiz = {
			date: new Date(),
			userName: userName,
			score: score,
			time: timer,
			operations: operations,
			problemCount: problemCount,
			tables: tables,
		};
		await db.quiz.add(newQuiz);
	};

	useEffect(() => {
		// Check if data has already been inserted before inserting again
		addTestDataToDB();
	}, []);

	//! Calculate minutes and remaining seconds
	const minutes = Math.floor(timer / 60);
	const seconds = timer % 60;

	// Render the quiz page
	return (
		<main id='quiz' className='d-flex flex-column justify-content-center align-items-center gap-3'>
			<h2 className='display-4 text-center'>{userName}</h2>
			<p className='h4 text-center'>
				Tu as eu une note de :<br /> <span className={`display-1 ${score < 60 ? 'text-danger' : 'text-accent-30'}`}>{score}%</span>
			</p>
			<p className='h4 text-center'>
				Ton temps total est de : <br />
				<span className='h4'>
					{minutes > 0 ? `${minutes} minutes, ` : ''}
					{seconds} secondes
				</span>
			</p>
			<Link to='/' className='btn btn-lg btn-green'>
				RETOUR
			</Link>
		</main>
	);
}

export default Results;
