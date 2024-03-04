const NumberSelect = ({ selectedProblemCount, handleProblemCountChange }) => {
	return (
		<>
			<label className='mb-1' htmlFor='problemCount'>
				<span className='d-none d-md-inline'>Choisir le </span>Nombre :
			</label>
			<select className='form-select' id='problemCount' value={selectedProblemCount} onChange={handleProblemCountChange}>
				<option value='10'>10 opérations</option>
				<option value='20'>20 opérations</option>
				<option value='30'>30 opérations</option>
				<option value='50'>50 opérations</option>
			</select>
		</>
	);
};

export default NumberSelect;
