import React from 'react';

import 'components/Button.scss';

import classNames from 'classnames';

export default function Button(props) {
	let btn = classNames({
		button: true,
		' button--confirm': props.confirm,
		' button--danger': props.danger,
	});

	return (
		<button className={btn} onClick={props.onClick} disabled={props.disabled}>
			{props.children}
		</button>
	);
}
