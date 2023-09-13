import { PrismaClient } from "@prisma/client";
import { RestaurantCardType } from "../page";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";

export interface SearchParams {
	location?: string;
	cuisine?: string;
	pricing?: string;
}

const prisma = new PrismaClient();

const fetchRestaurants = async (
	searchParams: SearchParams
): Promise<RestaurantCardType[]> => {
	const select = {
		id: true,
		name: true,
		image: true,
		pricing: true,
		cuisine: true,
		location: true,
		slug: true,
		reviews: true,
	};

	const where: any = {};

	if (searchParams.location) {
		const location = {
			name: {
				equals: searchParams.location.toLowerCase(),
			},
		};
		where.location = location;
	}

	if (searchParams.cuisine) {
		const cuisine = {
			name: {
				equals: searchParams.cuisine.toLowerCase(),
			},
		};
		where.cuisine = cuisine;
	}

	if (searchParams.pricing) {
		const pricing = {
			equals: searchParams.pricing,
		};
		where.pricing = pricing;
	}

	return prisma.restaurant.findMany({
		where,
		select,
	});
};

const fetchCuisines = async () => {
	return prisma.cuisine.findMany();
};

const fetchLocations = async () => {
	return prisma.location.findMany();
};

export default async function Search({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const restaurants = await fetchRestaurants(searchParams);
	const locations = await fetchLocations();
	const cuisines = await fetchCuisines();

	return (
		<>
			<Header />
			<div className="flex py-4 m-auto w-2/3 justify-between items-start">
				<SearchSideBar
					locations={locations}
					cuisines={cuisines}
					searchParams={searchParams}
				/>
				<div className="w-5/6">
					{restaurants.length ? (
						<>
							{restaurants.map((restaurant) => (
								<RestaurantCard restaurant={restaurant} key={restaurant.id} />
							))}
						</>
					) : (
						<p>Sorry, no restaurants found in this area</p>
					)}
				</div>
			</div>
		</>
	);
}
