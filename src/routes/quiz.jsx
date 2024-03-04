import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import {
	getRandomInt,
	generateAdditionProblem,
	generateSubtractionProblem,
	generateMultiplicationProblem,
	generateDivisionProblem,
} from '../components/configurations/mathFunctions';
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';

function Quiz() {
	//! Get user data from the location state
	const { state } = useLocation();

	//! Extract relevant data from the location state
	const { userName, operations, problemCount, tables } = state.user;

	//! State to store quiz results
	const [results, setResults] = useState({
		goodAnswers: 0,
		badAnswers: 0,
		totalAnswered: 0,
		score: 0,
	});

	//! State to hold the validation results
	const [validationResults, setValidationResults] = useState(Array(problemCount).fill(null));

	//! State for the timer
	const [seconds, setSeconds] = useState(0);

	//! State to hold the finished quiz data
	const [quizData, setQuizData] = useState({
		userName: userName,
		operations: operations,
		problemCount: problemCount,
		tables: tables,
		goodAnswers: 0,
		badAnswers: 0,
		totalAnswered: 0,
		score: 0,
		timer: 0,
	});

	//! Constants for the minimum and maximum operands
	const MIN_OPERAND = 1;
	const MAX_OPERAND = 12;

	//! Function to filter problem generators
	function filterProblemGenerators() {
		const selectedProblemGenerators = [];
		operations.forEach((operation) => {
			if (operation === 'additions') {
				selectedProblemGenerators.push(generateAdditionProblem);
			} else if (operation === 'soustractions') {
				selectedProblemGenerators.push(generateSubtractionProblem);
			} else if (operation === 'multiplications') {
				selectedProblemGenerators.push(generateMultiplicationProblem);
			} else if (operation === 'divisions') {
				selectedProblemGenerators.push(generateDivisionProblem);
			}
		});
		return selectedProblemGenerators;
	}

	//! Function to generate math problems
	function generateMathProblems() {
		const selectedProblemGenerators = filterProblemGenerators();
		const generatedProblems = [];
		const selectedTables = tables;

		for (let i = 0; i < problemCount; i++) {
			let operand1 = getRandomInt(MIN_OPERAND, MAX_OPERAND);
			let operand2 = selectedTables[getRandomInt(0, selectedTables.length - 1)];
			let randomIndex = Math.floor(Math.random() * selectedProblemGenerators.length);

			generatedProblems.push(selectedProblemGenerators[randomIndex](operand1, operand2));
		}

		return generatedProblems.map((problem) => problem.split('='));
	}

	//! State to hold generated problems
	const [equations, setEquations] = useState(() => generateMathProblems());

	//! Ref to store references to input fields
	const inputRefs = useRef([]);

	//! Function to handle validation of user inputs
	function validateUserInput(index, userAnswer) {
		// Access the validation span
		const validationSpan = document.querySelector('.validation');

		// Disable the input field after Enter key is pressed
		const inputField = inputRefs.current[index];
		if (inputField) {
			// Check if the answer field is empty
			if (!userAnswer.trim()) {
				// If answer field is empty, focus stays on the input field
				inputField.focus();
				return;
			}
			// If answer field is not empty, disable the input field
			inputField.disabled = true;

			// Compare user's input with correct answer
			const correctAnswer = equations[index][1];
			if (parseInt(userAnswer) === parseInt(correctAnswer)) {
				// If answer is correct, increment goodAnswers in state
				setResults((prevState) => ({
					...prevState,
					goodAnswers: prevState.goodAnswers + 1,
				}));
				// Increment totlaAnswered in state
				setResults((prevState) => ({
					...prevState,
					totalAnswered: prevState.totalAnswered + 1,
				}));
				// Calculate the score
				setResults((prevState) => ({
					...prevState,
					score: Math.floor((prevState.goodAnswers / prevState.totalAnswered) * 100),
				}));
				// Set the validation result to true
				setValidationResults((prevState) => {
					const newValidationResults = [...prevState];
					newValidationResults[index] = true;
					return newValidationResults;
				});
			} else {
				// If answer is wrong, increment badAnswers in state
				setResults((prevState) => ({
					...prevState,
					badAnswers: prevState.badAnswers + 1,
				}));
				// Increment totlaAnswered in state
				setResults((prevState) => ({
					...prevState,
					totalAnswered: prevState.totalAnswered + 1,
				}));
				// Calculate the score
				setResults((prevState) => ({
					...prevState,
					score: Math.floor((prevState.goodAnswers / prevState.totalAnswered) * 100),
				}));
				// Set the validation result to false
				setValidationResults((prevState) => {
					const newValidationResults = [...prevState];
					newValidationResults[index] = false;
					return newValidationResults;
				});
			}

			// Move focus to the next input field
			const nextIndex = index + 1;
			if (nextIndex < equations.length) {
				inputRefs.current[nextIndex].focus();
			}
		}
	}

	//! Add a useEffect hook to update the timer every second
	useEffect(() => {
		// Set up the interval
		const intervalId = setInterval(() => {
			setSeconds((prevSeconds) => prevSeconds + 1);
		}, 1000);

		// Clear interval on component unmount
		return () => clearInterval(intervalId);
	}, []);

	// Add a useEffect hook to update the quizData state whenever results change
	useEffect(() => {
		// Update the quizData state whenever results change
		setQuizData((prevState) => ({
			...prevState,
			goodAnswers: results.goodAnswers,
			badAnswers: results.badAnswers,
			totalAnswered: results.totalAnswered,
			score: results.score,
			timer: seconds,
		}));
	}, [results, seconds]);

	const navigate = useNavigate();

	//! Function to handle the click event
	function handleClick() {
		// Update the quizData state
		setQuizData((prevState) => ({
			...prevState,
			goodAnswers: results.goodAnswers,
			badAnswers: results.badAnswers,
			totalAnswered: results.totalAnswered,
			score: results.score,
			timer: seconds,
		}));

		// Navigate to the results page
		navigate('/results', { state: { quizData } });
	}

	//! Render the quiz page
	return (
		<main id='quiz'>
			{/* Display userName as header */}
			<h2 className='text-center h1'>{userName}</h2>

			{/* Generated Math problems */}
			<section className='problems-element text-center'>
				{equations.map((equation, index) => {
					return (
						<div className='row justify-content-center math-problems' key={index}>
							<div className='col-4 equation'>
								<label className='fs-4' htmlFor={`equation-${index}`}>
									{equation[0]} ={' '}
								</label>
							</div>
							<div className='col-2'>
								<input
									className='answer-field fs-5'
									type='number'
									onKeyDown={(e) => e.key === 'Enter' && validateUserInput(index, e.target.value)}
									id={`equation-${index}`}
									ref={(el) => (inputRefs.current[index] = el)}
								/>
							</div>
							<div className='col-2'>
								{validationResults[index] === true && <FaCircleCheck style={{ color: 'green' }} />}
								{validationResults[index] === false && <FaCircleXmark style={{ color: 'red' }} />}
							</div>
						</div>
					);
				})}
			</section>

			<article id='score' className='text-center mt-5'>
				<p className='h2 timer'>
					{Math.floor(seconds / 60)
						.toString()
						.padStart(2, '0')}{' '}
					: {(seconds % 60).toString().padStart(2, '0')}
				</p>
				<p className='h6 letter-spacing-05' id='goodAnswers'>
					Bonnes réponses: {results.goodAnswers}
				</p>
				<p className='h6 letter-spacing-05' id='badAnswers'>
					Mauvaises réponses: {results.badAnswers}
				</p>
				<button className='btn btn-lg btn-primary mt-2' onClick={handleClick}>
					TERMINER
				</button>
				{/* <Footer /> */}
			</article>
		</main>
	);
}

export default Quiz;
