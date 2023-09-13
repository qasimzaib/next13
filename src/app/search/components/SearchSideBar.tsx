import { Cuisine, Location, PRICING } from "@prisma/client";
import Link from "next/link";
import { SearchParams } from "../page";

export default function SearchSideBar({
	locations,
	cuisines,
	searchParams,
}: {
	locations: Location[];
	cuisines: Cuisine[];
	searchParams: SearchParams;
}) {
	const prices = [
		{
			price: PRICING.CHEAP,
			label: "$",
			className: "border w-full text-reg text-center font-light rounded-l p-2",
		},
		{
			price: PRICING.REGULAR,
			label: "$$",
			className: "border w-full text-reg text-center font-light p-2",
		},
		{
			price: PRICING.EXPENSIVE,
			label: "$$$",
			className: "border w-full text-reg text-center font-light rounded-r p-2",
		},
	];
	return (
		<div className="w-1/5">
			<div className="border-b pb-4 flex flex-col">
				<h1 className="mb-2">Location</h1>
				{locations.map((location) => (
					<Link
						href={{
							pathname: "/search",
							query: {
								...searchParams,
								location: location.name,
							},
						}}
						className="font-light text-reg capitalize"
						key={location.id}
					>
						{location.name}
					</Link>
				))}
			</div>
			<div className="border-b pb-4 mt-3 flex flex-col">
				<h1 className="mb-2">Cuisine</h1>
				{cuisines.map((cuisine) => (
					<Link
						href={{
							pathname: "/search",
							query: {
								...searchParams,
								cuisine: cuisine.name,
							},
						}}
						className="font-light text-reg capitalize"
						key={cuisine.id}
					>
						{cuisine.name}
					</Link>
				))}
			</div>
			<div className="mt-3 pb-4">
				<h1 className="mb-2">Price</h1>
				<div className="flex">
					{prices.map((price) => (
						<Link
							href={{
								pathname: "/search",
								query: {
									...searchParams,
									pricing: price.price,
								},
							}}
							className={price.className}
						>
							{price.label}
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
