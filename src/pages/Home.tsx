import { useEffect, useState } from 'react'

import Categories from '@/components/Categories'
import PizzaBlock from '@/components/PizzaBlock'
import { Skeleton } from '@/components/PizzaBlock/Skeleton'
import Sort from '@/components/Sort'

interface IPizza {
	id: number
	title: string
	price: number
	imageUrl: string
	sizes: number[]
	types: number[]
}

const Home = () => {
	const [pizzas, setPizzas] = useState<IPizza[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetching = async () => {
			try {
				const response = await fetch(
					'https://636524e2f711cb49d1f662c6.mockapi.io/items',
				)
				const pizzas = await response.json()
				setPizzas(pizzas)
				setIsLoading(false)
			} catch (error) {
				console.log(error)
			}
		}
		fetching()
	}, [])

	return (
		<>
			<div className='content__top'>
				<Categories />
				<Sort />
			</div>
			{isLoading ? (
				<>
					<h2 className='content__title'>Загрузка пиццы</h2>
					{[...new Array(8).keys()].map(key => (
						<Skeleton key={key} />
					))}
				</>
			) : (
				<>
					<h2 className='content__title'>Все пиццы</h2>
					<div className='content__items'>
						{pizzas.map(obj => (
							<PizzaBlock key={obj.id} {...obj} />
						))}
					</div>
				</>
			)}
		</>
	)
}

export default Home
