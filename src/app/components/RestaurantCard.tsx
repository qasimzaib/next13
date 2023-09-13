import Link from "next/link";
import { RestaurantCardType } from "../page";
import Pricing from "./Pricing";

interface RestaurantCardProps {
	restaurant: RestaurantCardType;
}

export default function RestaurantCard({restaurant} : RestaurantCardProps) {
	return (
		<div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
			<Link href={`/restaurant/${restaurant.slug}`}>
				<img
					src={restaurant.image}
					alt=""
					className="w-full h-36"
				/>
				<div className="p-1">
					<h3 className="font-bold text-2xl mb-2 text-black">
						{restaurant.name}
					</h3>
					<div className="flex items-start text-gray-700">
						<div className="flex mb-2">*****</div>
						<p className="ml-2">{restaurant.reviews.length} review{restaurant.reviews.length === 1 ? "" : "s"}</p>
					</div>
					<div className="flex text-reg font-light capitalize text-gray-500">
						<p className=" mr-3">{restaurant.cuisine.name}</p>
						<Pricing pricing={restaurant.pricing} />
						<p>{restaurant.location.name}</p>
					</div>
					<p className="text-sm mt-1 font-bold text-gray-500">
						Booked 3 times today
					</p>
				</div>
			</Link>
		</div>
	);
}
