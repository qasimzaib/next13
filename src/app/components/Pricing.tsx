import { PRICING } from "@prisma/client";

export default function Pricing({ pricing }: { pricing: PRICING }) {
	const renderPricing = () => {
		if (pricing === PRICING.CHEAP) {
			return (
				<>
					<span>$</span>
					<span className="text-gray-400">$$</span>
				</>
			);
		} else if (pricing === PRICING.REGULAR) {
			return (
				<>
					<span>$$</span>
					<span className="text-gray-400">$</span>
				</>
			);
		} else {
			return (
				<>
					<span>$$$</span>
				</>
			);
		}
	};

	return <p className="flex mr-3">{renderPricing()}</p>;
}
