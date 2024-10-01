import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import { useState, useRef } from 'react';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

export const ArticleParamsForm = ({
	onDataReturn,
}: {
	onDataReturn: (articleState: ArticleStateType) => void;
}) => {
	const menuRef = useRef<HTMLDivElement>(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const className = clsx(styles.container, {
		[styles.container_open]: isMenuOpen,
	});

	const [articleState, setArticleState] = useState(defaultArticleState);

	const handleChange = (key: string, option: OptionType) => {
		setArticleState((prevState) => ({
			...prevState,
			[key]: option,
		}));
	};

	const handleClick = () => {
		setIsMenuOpen((isMenuOpen) => !isMenuOpen);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onDataReturn(articleState);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
		onDataReturn(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: menuRef,
		onChange: setIsMenuOpen,
	});

	return (
		<div ref={menuRef}>
			<ArrowButton isOpen={isMenuOpen} onClick={handleClick} />
			<aside className={className}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						onChange={(option) => handleChange('fontFamilyOption', option)}
						title={'Шрифт'}
						selected={articleState.fontFamilyOption}
						options={fontFamilyOptions}
					/>

					<RadioGroup
						onChange={(option) => handleChange('fontSizeOption', option)}
						name={'radio'}
						title={'рАЗМЕР шрифта'}
						selected={articleState.fontSizeOption}
						options={fontSizeOptions}
					/>
					<Select
						onChange={(option) => handleChange('fontColor', option)}
						title={'Цвет шрифта'}
						selected={articleState.fontColor}
						options={fontColors}
					/>

					<Separator />
					<Select
						onChange={(option) => handleChange('backgroundColor', option)}
						title={'Цвет фона'}
						selected={articleState.backgroundColor}
						options={backgroundColors}
					/>
					<Select
						onChange={(option) => handleChange('contentWidth', option)}
						title={'Ширина контента'}
						selected={articleState.contentWidth}
						options={contentWidthArr}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
