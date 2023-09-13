import { PrismaClient } from "@prisma/client";
import { RestaurantCardType } from "../page";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";

const prisma = new PrismaClient();

const fetchRestaurantsByCity = async (
	location: string | undefined
): Promise<RestaurantCardType[]> => {
	const select = {
		id: true,
		name: true,
		image: true,
		pricing: true,
		cuisine: true,
		location: true,
		slug: true,
	};

	if (!location) {
		return prisma.restaurant.findMany({ select });
	}

	return prisma.restaurant.findMany({
		where: {
			location: {
				name: {
					equals: location.toLowerCase(),
				},
			},
		},
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
	searchParams: { location?: string; cuisine?: string; pricing?: string };
}) {
	const restaurants = await fetchRestaurantsByCity(searchParams.location);
	const locations = await fetchLocations();
	const cuisines = await fetchCuisines();

	return (
		<>
			<Header />
			<div className="flex py-4 m-auto w-2/3 justify-between items-start">
				<SearchSideBar locations={locations} cuisines={cuisines} searchParams={searchParams} />
				<div className="w-5/6">
					{restaurants.length ? (
						<>
							{restaurants.map((restaurant) => (
								<RestaurantCard restaurant={restaurant} />
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
