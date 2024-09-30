import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import { useState } from 'react';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = ({ onDataReturn }: any) => {
	const [isOpened, setIsOpened] = useState(false);
	const className = clsx(styles.container, {
		[styles.container_open]: isOpened,
	});

	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const handleClick = () => {
		setIsOpened((isOpened) => !isOpened);
	};

	const handleSubmit = () => {
		const newArticleState = {
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		};
		onDataReturn(newArticleState);
		setIsOpened(false);
	};

	const handleReset = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		onDataReturn(defaultArticleState);
		setIsOpened(false);
	};
	return (
		<>
			<ArrowButton isOpen={isOpened} onClick={handleClick} />
			<aside className={className}>
				<form className={styles.form} style={{ gap: 50 }}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						onChange={(option) => setFontFamily(option)}
						title={'Шрифт'}
						selected={fontFamily}
						options={fontFamilyOptions}
					/>

					<RadioGroup
						onChange={(option) => setFontSize(option)}
						name={'radio'}
						title={'рАЗМЕР шрифта'}
						selected={fontSize}
						options={fontSizeOptions}
					/>
					<Select
						onChange={(option) => setFontColor(option)}
						title={'Цвет шрифта'}
						selected={fontColor}
						options={fontColors}
					/>

					<Separator />
					<Select
						onChange={(option) => setBackgroundColor(option)}
						title={'Цвет фона'}
						selected={backgroundColor}
						options={backgroundColors}
					/>
					<Select
						onChange={(option) => setContentWidth(option)}
						title={'Ширина контента'}
						selected={contentWidth}
						options={contentWidthArr}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={handleSubmit}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
