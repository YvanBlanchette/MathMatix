import Logo from '../assets/images/mathmatix.svg';

const Header = () => {
	return (
		<header>
			<a href='/' className='d-flex justify-content-center align-items-center'>
				<img src={Logo} height='70px' width='80px' alt='Logo de MathMatix' className='logo me-2' />

				<h1 className='ff-montserrat display-3 display-md-1 fw-600'>
					Math<span className='fw-300'>Matix</span>
				</h1>
			</a>
		</header>
	);
};

export default Header;
