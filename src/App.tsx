import { useEffect, useState } from 'react'
import Categories from './components/Categories'
import Header from './components/Header'
import PizzaBlock from './components/PizzaBlock'
import Sort from './components/Sort'
import './scss/app.scss'

interface IPizza {
	id: number
	title: string
	price: number
	imageUrl: string
	sizes: number[]
	types: number[]
}

function App() {
	const [pizzas, setPizzas] = useState<IPizza[]>([])

	useEffect(() => {
		const fetching = async () => {
			try {
				const response = await fetch(
					'https://636524e2f711cb49d1f662c6.mockapi.io/items',
				)
				const pizzas = await response.json()
				setPizzas(pizzas)
			} catch (error) {
				console.log(error)
			}
		}
		fetching()
	}, [])

	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<div className='content__top'>
						<Categories />
						<Sort />
					</div>
					<h2 className='content__title'>Все пиццы</h2>
					{pizzas.length ? (
						<div className='content__items'>
							{pizzas.map(obj => (
								<PizzaBlock key={obj.id} {...obj} />
							))}
						</div>
					) : (
						<div className='content__error-info'>Загрузка пиццы...</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default App
