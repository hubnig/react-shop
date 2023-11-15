import { useState } from 'react'

const Categories = () => {
	const [activeCategory, setActiveCategory] = useState(0)

	const categories = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые'
	]

	const onClickCategory = (index: number) => {
		setActiveCategory(index)
	}

	return (
		<div className='categories'>
			<ul>
				{categories.map((category, index) => (
					<li
						key={index}
						className={activeCategory === index ? 'active' : ''}
						onClick={() => onClickCategory(index)}
					>
						{category}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Categories
