const TablesSelect = ({ selectedTables, handleTablesChange }) => (
	<>
		<label className='mt-3 mb-2'>Choisir les Tables :</label>
		<div className='row'>
			<div className='col'>
				<div className='form-check mb-2'>
					<input
						className='form-check-input'
						type='checkbox'
						id='table1Checkbox'
						checked={selectedTables.includes('1')}
						value='1'
						onChange={handleTablesChange}
					/>
					<label className='form-check-label small' htmlFor='table1Checkbox'>
						<span className='d-none d-md-inline'>Tables de </span>1
					</label>
				</div>
				<div className='form-check mb-2'>
					<input
						className='form-check-input'
						type='checkbox'
						id='table2Checkbox'
						checked={selectedTables.includes('2')}
						value='2'
						onChange={handleTablesChange}
					/>
					<label className='form-check-label small' htmlFor='table2Checkbox'>
						<span className='d-none d-md-inline'>Tables de </span>2
					</label>
				</div>
				<div className='form-check mb-2'>
					<input
						className='form-check-input'
						type='checkbox'
						id='table3Checkbox'
						checked={selectedTables.includes('3')}
						value='3'
						onChange={handleTablesChange}
					/>
					<label className='form-check-label small' htmlFor='table3Checkbox'>
						<span className='d-none d-md-inline'>Tables de </span>3
					</label>
				</div>
				<div className='form-check mb-2'>
					<input
						className='form-check-input'
						type='checkbox'
						id='table4Checkbox'
						checked={selectedTables.includes('4')}
						value='4'
						onChange={handleTablesChange}
					/>
					<label className='form-check-label small' htmlFor='table4Checkbox'>
						<span className='d-none d-md-inline'>Tables de </span>4
					</label>
				</div>
			</div>

			{/* Tables */}
			<div className='col'>
				<div className='form-check mb-2'>
					<input
						className='form-check-input'
						type='checkbox'
						id='table5Checkbox'
						checked={selectedTables.includes('5')}
						value='5'
						onChange={handleTablesChange}
					/>
					<label className='form-check-label small' htmlFor='table5Checkbox'>
						<span className='d-none d-md-inline'>Tables de </span>5
					</label>
				</div>
				<div className='form-check mb-2'>
					<input
						className='form-check-input'
						type='checkbox'
						id='table6Checkbox'
						checked={selectedTables.includes('6')}
						value='6'
						onChange={handleTablesChange}
					/>
					<label className='form-check-label small' htmlFor='table6Checkbox'>
						<span className='d-none d-md-inline'>Tables de </span>6
					</label>
				</div>
				<div className='form-check mb-2'>
					<input
						className='form-check-input'
						type='checkbox'
						id='table7Checkbox'
						checked={selectedTables.includes('7')}
						value='7'
						onChange={handleTablesChange}
					/>
					<label className='form-check-label small' htmlFor='table7Checkbox'>
						<span className='d-none d-md-inline'>Tables de </span>7
					</label>
				</div>
				<div className='form-check mb-2'>
					<input
						className='form-check-input'
						type='checkbox'
						id='table8Checkbox'
						checked={selectedTables.includes('8')}
						value='8'
						onChange={handleTablesChange}
					/>
					<label className='form-check-label small' htmlFor='table8Checkbox'>
						<span className='d-none d-md-inline'>Tables de </span>8
					</label>
				</div>
			</div>
			<div className='col'>
				<div className='form-check mb-2'>
					<input
						className='form-check-input'
						type='checkbox'
						id='table9Checkbox'
						checked={selectedTables.includes('9')}
						value='9'
						onChange={handleTablesChange}
					/>
					<label className='form-check-label small' htmlFor='table9Checkbox'>
						<span className='d-none d-md-inline'>Tables de </span>9
					</label>
				</div>
				<div className='form-check mb-2'>
					<input
						className='form-check-input'
						type='checkbox'
						id='table10Checkbox'
						checked={selectedTables.includes('10')}
						value='10'
						onChange={handleTablesChange}
					/>
					<label className='form-check-label small' htmlFor='table10Checkbox'>
						<span className='d-none d-md-inline'>Tables de </span>10
					</label>
				</div>
				<div className='form-check mb-2'>
					<input
						className='form-check-input'
						type='checkbox'
						id='table11Checkbox'
						checked={selectedTables.includes('11')}
						value='11'
						onChange={handleTablesChange}
					/>
					<label className='form-check-label small' htmlFor='table11Checkbox'>
						<span className='d-none d-md-inline'>Tables de </span>11
					</label>
				</div>
				<div className='form-check mb-2'>
					<input
						className='form-check-input'
						type='checkbox'
						id='table12Checkbox'
						checked={selectedTables.includes('12')}
						value='12'
						onChange={handleTablesChange}
					/>
					<label className='form-check-label small' htmlFor='table12Checkbox'>
						<span className='d-none d-md-inline'>Tables de </span>12
					</label>
				</div>
			</div>
		</div>
	</>
);

export default TablesSelect;
