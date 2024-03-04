import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TypeSelect from '../components/configurations/TypesSelection';
import NumberSelect from '../components/configurations/NumbersSelection';
import TablesSelect from '../components/configurations/TablesSelection';
import { db } from '../database/userDataDB';

function CreateUser() {
	const [userName, setUserName] = useState('');
	const [profileImg, setProfileImg] = useState(null);
	const [selectedOperations, setSelectedOperations] = useState(['multiplications', 'divisions']);
	const [selectedProblemCount, setSelectedProblemCount] = useState('30');
	const [selectedTables, setSelectedTables] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);

	//! Function to add user to IndexedDB
	const addUserToDB = async () => {
		const newUser = {
			userName,
			profileImg,
			operations: selectedOperations,
			problemCount: selectedProblemCount,
			tables: selectedTables,
		};
		await db.users.add(newUser);
	};

	//! Get the navigate function from the useNavigate hook
	const navigate = useNavigate();

	//! Form submission handler
	const handleSubmit = (event) => {
		// Prevent default form submission
		event.preventDefault();
		// Add user to IndexedDB
		addUserToDB();
		// Reset form fields
		setUserName('');
		setProfileImg(null);
		setSelectedOperations([]);
		setSelectedProblemCount('');
		setSelectedTables([]);
		// Redirect to the home page
		navigate('/');
	};

	//! Function to handle operations change
	const handleOperationsChange = (event) => {
		// Extract value and checked properties from the event target
		const { value, checked } = event.target;
		// Update selectedOperations state
		setSelectedOperations((prevSelectedOperations) => {
			// If the checkbox is checked, add the value to the array
			if (checked) {
				return [...prevSelectedOperations, value];
				// If the checkbox is unchecked, remove the value from the array
			} else {
				return prevSelectedOperations.filter((op) => op !== value);
			}
		});
	};

	//! Function to handle problem count change
	const handleProblemCountChange = (event) => {
		// Update selectedProblemCount state
		setSelectedProblemCount(event.target.value);
	};

	//! Function to handle tables change
	const handleTablesChange = (event) => {
		// Extract value and checked properties from the event target
		const { value, checked } = event.target;
		// Update selectedTables state
		setSelectedTables((prevTables) => {
			// If the checkbox is checked, add the value to the array
			if (checked) {
				return [...prevTables, value];
				// If the checkbox is unchecked, remove the value from the array
			} else {
				return prevTables.filter((table) => table !== value);
			}
		});
	};

	return (
		<main id='createUser' className='pt-3 pb-5'>
			<form onSubmit={handleSubmit}>
				<div className='p-3'>
					<h3 className='text-center mb-3'>Nouvel utilisateur</h3>

					{/* Username Input */}
					<label htmlFor='userName' className='form-label'>
						Nom d'utilisateur <span className='text-danger'>*</span>
					</label>
					<input
						type='text'
						className='form-control mb-3'
						id='userName'
						name='userName'
						placeholder='Écris ton nom ici...'
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
						required
					/>

					{/* Profile picture input */}
					<div className='mb-3'>
						<label htmlFor='profileImg' className='form-label'>
							Photo de profile
						</label>
						<input className='form-control form-control-sm' id='profileImg' type='file' onChange={(e) => setProfileImg(e.target.files[0])} />
					</div>
				</div>

				<div className='p-3'>
					<h3 className='text-center mb-3 '>Configurations par défaut</h3>
					{/* Operations select */}
					<div className='row mt-4'>
						<div className='col'>
							{/* Operations Type select */}
							<TypeSelect selectedOperations={selectedOperations} handleOperationsChange={handleOperationsChange} />
						</div>
						<div className='col'>
							{/* Number select */}
							<NumberSelect selectedProblemCount={selectedProblemCount} handleProblemCountChange={handleProblemCountChange} />
						</div>
					</div>
					{/* Tables select */}
					<TablesSelect selectedTables={selectedTables} handleTablesChange={handleTablesChange} />
				</div>
				<div className='text-center mt-3'>
					<input className='btn btn-lg btn-green' type='submit' value="Créer l'utilisateur" />
				</div>
			</form>
		</main>
	);
}

export default CreateUser;
