import NavBar from "@/app/components/NavBar";
import Link from "next/link";
import Form from "./components/Form";
import Header from "./components/Header";

export default function Reserve() {
	return (
		<main className="bg-gray-100 min-h-screen w-screen text-gray-500">
			<main className="max-w-screen-2xl m-auto bg-white">
				<NavBar />
				<div className="border-t h-screen">
					<div className="py-9 w-3/5 m-auto">
						<Header />
						<Form />
					</div>
				</div>
			</main>
		</main>
	);
}
