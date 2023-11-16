import { useEffect, useState } from 'react'
import Categories from './components/Categories'
import Header from './components/Header'
import PizzaBlock from './components/PizzaBlock'
import Sort from './components/Sort'
import './scss/app.scss'
import { Skeleton } from './components/PizzaBlock/Skeleton'

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
					{pizzas.length ? (
						<>
							<h2 className='content__title'>Все пиццы</h2>
							<div className='content__items'>
							{pizzas.map(obj => (
								<PizzaBlock key={obj.id} {...obj} />
							))}
						</div>
						</>
					) : (
						<>
						<h2 className='content__title'>Загрузка пиццы</h2>
						<Skeleton />
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default App
