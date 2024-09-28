import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import { useState } from 'react';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [isOpened, setIsOpened] = useState(false);
	// const isOpened = false;
	const className = clsx(styles.container, {
		[styles.container_open]: isOpened,
	});

	const handleClick = () => {
		setIsOpened((isOpened) => !isOpened);
	};
	return (
		<>
			<ArrowButton isOpen={isOpened} onClick={handleClick} />
			<aside className={className}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
