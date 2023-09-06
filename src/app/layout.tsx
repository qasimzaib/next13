import "./globals.css";
import type { Metadata } from "next";
import NavBar from "./components/NavBar";

export const metadata: Metadata = {
	title: "Next Starter App",
	description: "Basic starter application for learning NextJs",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<main className="bg-gray-100 min-h-screen w-screen">
					<main className="max-w-screen-2xl m-auto bg-white">
						<NavBar />
						{children}
					</main>
				</main>
			</body>
		</html>
	);
}
