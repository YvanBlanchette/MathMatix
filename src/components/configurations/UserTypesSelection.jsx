const TypeSelect = ({ selectedOperations, handleOperationsChange }) => {
	// Operations select
	return (
		<>
			<label className='mb-1'>
				<span className='d-none d-md-inline'>Choisir les </span>Opérations :
			</label>
			<div className='form-check'>
				<input
					className='form-check-input'
					type='checkbox'
					id='additionCheckbox'
					value='additions'
					onChange={handleOperationsChange}
					checked={selectedOperations.includes('additions')}
				/>
				<label className='form-check-label small' htmlFor='additionCheckbox'>
					{' '}
					Addition
				</label>
			</div>
			<div className='form-check'>
				<input
					className='form-check-input'
					type='checkbox'
					id='subtractionCheckbox'
					value='soustractions'
					onChange={handleOperationsChange}
					checked={selectedOperations.includes('soustractions')}
				/>
				<label className='form-check-label small' htmlFor='subtractionCheckbox'>
					{' '}
					Soustraction
				</label>
			</div>
			<div className='form-check'>
				<input
					className='form-check-input'
					type='checkbox'
					id='multiplicationCheckbox'
					value='multiplications'
					onChange={handleOperationsChange}
					checked={selectedOperations.includes('multiplications')}
				/>
				<label className='form-check-label small' htmlFor='multiplicationCheckbox'>
					{' '}
					Multiplication
				</label>
			</div>
			<div className='form-check'>
				<input
					className='form-check-input'
					type='checkbox'
					id='divisionCheckbox'
					value='divisions'
					onChange={handleOperationsChange}
					checked={selectedOperations.includes('divisions')}
				/>
				<label className='form-check-label small' htmlFor='divisionCheckbox'>
					Division
				</label>
			</div>
		</>
	);
};

export default TypeSelect;
