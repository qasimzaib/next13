import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import { Cuisine, Location, PRICING, PrismaClient } from "@prisma/client";

export interface RestaurantCardType {
	id: number;
	name: string;
	image: string;
	cuisine: Cuisine;
	location: Location;
	pricing: PRICING;
}

const prisma = new PrismaClient();

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
	const restaurants = await prisma.restaurant.findMany(
		{select: {
			id: true,
			name: true,
			image: true,
			pricing: true,
			location: true,
			cuisine: true,
		}}
	);
	return restaurants;
}

export default async function Home() {
	const restaurants = await fetchRestaurants();

	return (
		<main>
			<Header />
			<div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
				{restaurants.map((restaurant) => (
					<RestaurantCard restaurant={restaurant} />
				))}
			</div>
		</main>
	);
}
