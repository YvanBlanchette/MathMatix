import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Modal from 'react-bootstrap/Modal';
import TypeSelect from '../components/configurations/UserTypesSelection';
import NumberSelect from '../components/configurations/UserNumbersSelection';
import TablesSelect from '../components/configurations/UserTablesSelection';
import { db } from '../database/quizDataDB';

function Start() {
	//! Get user data from the location state
	const { state } = useLocation();

	//! State to store the user data
	const [user, setUser] = useState(state.user);

	//! Destructure user data
	const { userName, email, profileImg, operations, problemCount, tables } = state.user;

	//! State to store the quiz data
	const [quizData, setQuizData] = useState([]);

	//! State variables for modal
	const [showModal, setShowModal] = useState(false);
	const [selectedEntry, setSelectedEntry] = useState(null);

	//!Creating a string of the operations to be used in the welcome message
	let mathOperations = user.operations.slice(0, -1).join(', ');
	if (user.operations.length > 1) {
		mathOperations += ' et des ' + user.operations[user.operations.length - 1];
	}

	//! Fetch users data from IndexedDB
	useEffect(() => {
		// Fetch quiz data
		fetchData();
	});

	//! Function to fetch users data from IndexedDB
	const fetchData = async () => {
		// Get all the quiz data from the IndexedDB
		const quizData = await db.quiz.toArray();
		setQuizData(quizData);
	};

	//! Update user state when the location state changes
	useEffect(() => {
		setUser(state.user);
	}, [state.user]);

	//! Function to handle operations change
	function handleOperationsChange(e) {
		// Get the selected operation from the event target
		const selectedOperation = e.target.value;
		// Update operations in the state.user
		setUser((prevUser) => ({
			...prevUser,
			operations: prevUser.operations.includes(selectedOperation)
				? // Remove the operation if it's already selected
				  prevUser.operations.filter((op) => op !== selectedOperation)
				: // Add the operation if it's not selected
				  [...prevUser.operations, selectedOperation],
		}));
	}

	//! Function to handle problem count change
	const handleProblemCountChange = (event) => {
		// Update problemCount in the state.user
		setUser((prevUser) => ({ ...prevUser, problemCount: event.target.value }));
	};

	//! Function to handle tables change
	const handleTablesChange = (event) => {
		// Extract value and checked properties from the event target
		const { value, checked } = event.target;

		// Update tables in the state.user
		setUser((prevUser) => ({
			...prevUser,
			tables: checked
				? // Add the value to the array if it's checked
				  [...prevUser.tables, value]
				: // Remove the value from the array if it's unchecked
				  prevUser.tables.filter((table) => table !== value),
		}));
	};

	//! Navigate to the start page
	const navigate = useNavigate();
	const handleClick = () => {
		navigate('/quiz/', { state: { user } });
	};

	//! Function to handle opening the modal and setting the selected entry
	const handleEntryClick = (entry) => {
		setSelectedEntry(entry);
		setShowModal(true);
	};

	//! Function to handle closing the modal
	const handleCloseModal = () => {
		setShowModal(false);
	};

	//! Function to handle deleting the selected entry
	const handleDeleteEntry = async () => {
		if (confirm('Êtes-vous certain de vouloir supprimer ce résultat?')) {
			// Delete the selected entry from the IndexedDB
			await db.quiz.delete(selectedEntry.id);
			// Close the modal
			handleCloseModal();
			// Fetch quiz data
			fetchData();
		}
	};

	function formatTime(time) {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes > 0 ? `${minutes} minutes, ` : ''}${seconds} secondes`;
	}

	//! Render the start page
	return (
		<main id='start'>
			<Tabs defaultActiveKey='start' id='main' className='mb-3' justify>
				{/* !---> Welcome Tab <---! */}
				<Tab eventKey='start' title='Démarrer'>
					<div className='content text-center'>
						<h2 className='text-center mt-1'>
							Bonjour <b>{user.userName}</b>{' '}
						</h2>
						<p className='my-3'>
							Tu dois compléter <b>{user.problemCount}</b> problèmes mathématiques contenant des <b>{mathOperations}</b>.
						</p>

						<p className='mb-3'>
							Les tables suivantes seront utilisées: <br /> <b>{user.tables.join(', ')}</b>
						</p>

						<p className='mb-3'>
							<em>
								Si tu désires modifier la configuration de l'exercice ou consulter tes exercices précédents, clique sur les onglets dans la barre en haut.
							</em>
							&#9757;
						</p>

						<p>
							Ton temps sera chronométré,
							<br /> <b>On commence l'exercice? </b>
						</p>

						<button onClick={handleClick} className='btn btn-lg btn-green mt-3 mx-auto py-2 fs-5'>
							COMMENCER
						</button>
					</div>
				</Tab>

				{/* !---> Configuration tab <---! */}
				<Tab eventKey='setup' title='Configuration'>
					<div className='content'>
						<h2 className='mt-1 text-center'>Configuration</h2>

						<form>
							<div className='my-3'>
								{/* Operations select */}
								<div className='row mt-4'>
									<div className='col'>
										{/* Operations Type select */}
										<TypeSelect selectedOperations={user.operations} handleOperationsChange={handleOperationsChange} />
									</div>
									<div className='col'>
										{/* Number select */}
										<NumberSelect selectedProblemCount={user.problemCount} handleProblemCountChange={handleProblemCountChange} />
									</div>
								</div>
								{/* Tables select */}
								<TablesSelect selectedTables={user.tables} handleTablesChange={handleTablesChange} />
							</div>
						</form>
						<div className='text-center'>
							<button onClick={handleClick} className='btn btn-lg btn-green mt-2 fs-5'>
								COMMENCER
							</button>
						</div>
					</div>
				</Tab>

				{/* !---> History tab <---! */}
				<Tab eventKey='history' title='Historique'>
					<div className='content text-center p-1'>
						<h2 className='mt-1'>Historique</h2>
						<table className='table mt-2'>
							<thead className='fs-xsmall'>
								<tr>
									<th scope='col'>Date</th>
									<th scope='col'>Note</th>
									<th scope='col'>Temps</th>
								</tr>
							</thead>
							<tbody className='fs-xsmall'>
								{quizData
									// Filter data for the current user
									.filter((entry) => entry.userName === user.userName)
									// Sort data by date
									.map((entry, index) => {
										// Render the quiz page
										return (
											<tr key={index} onClick={() => handleEntryClick(entry)} style={{ cursor: 'pointer' }}>
												<td>{entry.date.toLocaleDateString()}</td>
												<td>{entry.score}%</td>
												<td>{formatTime(entry.time)}</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
				</Tab>
			</Tabs>

			{/* Modal for displaying entry details */}
			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title>{userName}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{/* Render details of selected entry */}
					{selectedEntry && (
						<>
							<p>Date: {selectedEntry.date.toLocaleDateString()}</p>
							<p>Note: {selectedEntry.score}%</p>
							<p>Temps: {formatTime(selectedEntry.time)}</p>
							<p>Questions: {selectedEntry.problemCount}</p>
							<p>Opérations: {selectedEntry.operations.join(', ')}</p>
							<p>Tables: {selectedEntry.tables.join(', ')}</p>
						</>
					)}
				</Modal.Body>
				<Modal.Footer>
					<button className='btn btn-danger' onClick={handleDeleteEntry}>
						Delete
					</button>
					<button className='btn btn-green' onClick={handleCloseModal}>
						Close
					</button>
				</Modal.Footer>
			</Modal>
		</main>
	);
}

export default Start;
