const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<footer className='d-flex flex-column justify-content-center align-items-center'>
			<small>
				Une création de{' '}
				<a className='link-accent' href='https://yvanblanchette.com' target='_blank' rel='noreferrer'>
					Yvan jr Blanchette
				</a>
			</small>
			<small>Copyright &copy; {year}</small>
		</footer>
	);
};

export default Footer;
