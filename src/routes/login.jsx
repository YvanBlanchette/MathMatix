import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dexie from 'dexie';
import ProfilePicture from '../components/ProfilePicture';

//! Initialize Dexie database
const db = new Dexie('UserData');
db.version(1).stores({
	users: '++id, userName, email, profileImg, operations, problemCount, tables',
});

function Login() {
	// State to store the users data
	const [userData, setUserData] = useState([]);
	// State to store selected user data
	const [selectedUser, setSelectedUser] = useState(null);

	//! Fetch users data from IndexedDB
	useEffect(() => {
		// Fetch users data
		fetchUsers();
	});

	//! Function to fetch users data from IndexedDB
	const fetchUsers = async () => {
		// Get all the users data from the IndexedDB
		const usersData = await db.users.toArray();
		setUserData(usersData);
	};

	//! Function to handle user selection
	const handleUserSelect = (userId) => {
		// Find the selected user data
		const selectedUserData = userData.find((user) => user.id === parseInt(userId));
		// Set the selected user state
		setSelectedUser(selectedUserData);
	};

	//! Navigate to the start page
	const navigate = useNavigate();
	const handleClick = () => {
		navigate('/start/', { state: { user: selectedUser } });
	};

	//! Render the login page
	return (
		<main id='login' className='d-flex flex-column justify-content-evenly flex-grow align-items-center gap-3 pt-4'>
			{selectedUser ? (
				<>
					<ProfilePicture profileImg={selectedUser.profileImg || '/src/assets/images/profile-default.svg'} />
				</>
			) : (
				<>
					<ProfilePicture />
				</>
			)}
			<select className='form-select my-3' disabled={!userData} aria-label='Large select example' onChange={(e) => handleUserSelect(e.target.value)}>
				<option defaultValue>Utilisateur</option>
				{userData.map((user) => (
					<option key={user.id} value={user.id}>
						{user.userName}
					</option>
				))}
			</select>
			<div className='d-flex flex-column justify-content-end align-items-center gap-3'>
				<button onClick={handleClick} className='btn btn-lg btn-green' disabled={!selectedUser}>
					Suivant
				</button>
				<Link to={'create-user/'}>
					<span className='link-accent'>Créer un nouvel utilisateur</span>
				</Link>
			</div>
		</main>
	);
}

export default Login;
