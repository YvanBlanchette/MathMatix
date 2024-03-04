import { useState, useEffect } from 'react';

function ProfilePicture({ profileImg }) {
	// State to store the image URL
	const [imageUrl, setImageUrl] = useState(null);

	// Use effect to update the image URL when the profileImg prop changes
	useEffect(() => {
		// If profileImg is a File object, read it as a data URL
		if (profileImg instanceof File) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImageUrl(reader.result);
			};
			reader.readAsDataURL(profileImg);
		} else {
			// If profileImg is not a File object, use it directly as a URL
			setImageUrl(profileImg);
		}
	}, [profileImg]);

	// Render the image element
	return (
		<img
			src={imageUrl || '/src/assets/images/profile-default.svg'}
			alt='Photo de Profil'
			style={{
				width: '250px',
				height: '250px',
				borderRadius: '500px',
				objectFit: 'cover',
			}}
		/>
	);
}

export default ProfilePicture;
