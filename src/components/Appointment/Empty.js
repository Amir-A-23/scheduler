import React from 'react';

function Empty(props) {
	console.log('The PROPS', props);
	return (
		<main className='appointment__add'>
			<img
				className='appointment__add-button'
				src='images/add.png'
				alt='Add'
				onClick={props.onAdd}
			/>
		</main>
	);
}
export default Empty;
