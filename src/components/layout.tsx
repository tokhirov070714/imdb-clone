import { Link, Outlet } from "react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { useSaved } from "@/providers/SavedProvider";
import { Badge } from "./ui/badge";

import { useTheme } from "@/providers/ThemeProvider";
import { useUser } from "@/providers/UserProvider";
import { useSettings } from "@/providers/SettingsProvider";
import { useTrailer } from "@/providers/TrailerProvider";

import { Player } from "./custom/Player";

function Layout() {
	const { saved } = useSaved();
	const { theme, setTheme } = useTheme()
	const { user } = useUser()
	const { lang, region, setLang, setRegion } = useSettings()

	const { trailerKey } = useTrailer()
	console.log(trailerKey);


	const handleLang = (e: any) => {
		setLang(e.target.value);
	};

	const handleRegion = (e: any) => {
		setRegion(e.target.value);
	};


	return (
		<div className=

			{

				theme == "dark" ? "min-h-screen flex flex-col bg-neutral-950 text-neutral-100"
					: "min-h-screen flex flex-col bg-neutral-100 text-neutral-950"

			}

		>
			<header className=

				{

					theme == "dark" ? "flex items-center justify-between px-6 py-4 bg-neutral-900 border-b border-neutral-800"
						: "flex items-center justify-between px-6 py-4 bg-neutral-100 border-b border-neutral-200"

				}

			>
				<div className="flex items-center space-x-6">
					<Link to="/" className="text-2xl font-bold text-yellow-400">
						IMDb
					</Link>

					<nav className="hidden md:flex items-center space-x-4 text-sm">
						<Link to="/movies" className="hover:text-yellow-400">
							Movies
						</Link>
						<Link to="/tv" className="hover:text-yellow-400">
							TV Shows
						</Link>
						<Link to="/news" className="hover:text-yellow-400">
							News
						</Link>
						<Link to="/saved" className="hover:text-yellow-400">
							Хочу посмотреть
							<Badge className="bg-red-600">{saved.length}</Badge>
						</Link>
					</nav>
				</div>

				<div className="flex items-center gap-5 space-x-3">

					<div className="flex items-center space-x-2">
						<label htmlFor="language" className="text-sm text-neutral-300">
							Language:
						</label>
						<select
							id="language"
							value={lang}
							onChange={handleLang}
							className="bg-neutral-800 text-neutral-100 border border-neutral-700 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
						>
							<option value="en">🇬🇧 English</option>
							<option value="ru">🇷🇺 Русский</option>
						</select>
					</div>

					<div className="flex items-center space-x-2">
						<label htmlFor="region" className="text-sm text-neutral-300">
							Region:
						</label>
						<select
							id="region"
							value={region}
							onChange={handleRegion}
							className="bg-neutral-800 text-neutral-100 border border-neutral-700 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
						>
							<option value="us">🇺🇸 United States</option>
							<option value="ru">🇷🇺 Russia</option>
							<option value="uk">🇬🇧 United Kingdom</option>
							<option value="fr">🇫🇷 France</option>
							<option value="de">🇩🇪 Germany</option>
						</select>
					</div>

					<div
						className="flex flex-col items-center justify-center cursor-pointer select-none"
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
					>

						<p className="mt-2 text-sm font-medium">
							{theme === "dark" ? "Dark" : "Light"}
						</p>

						<div
							className={`relative w-16 h-8 rounded-full transition-all duration-500 ${theme === "dark" ? "bg-neutral-700" : "bg-neutral-300"
								}`}
						>
							<div
								className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-500 ${theme === "dark" ? "right-1 bg-neutral-900" : "left-1"
									}`}
							></div>
						</div>


					</div>

					<div className=

						{

							theme == "dark" ? "flex items-center bg-neutral-800 rounded-md" :
								"flex items-center bg-neutral-200 rounded-md"

						}

					>
						<Input
							type="text"
							placeholder="Search IMDb"
							className="bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-48 md:w-64 text-sm"
						/>

						<Button
							variant="ghost"
							size="icon"
							className="text-yellow-400 hover:text-yellow-300"
						>
							🔍
						</Button>

					</div>

					<Link to="/profile">

						<div className="flex items-center justify-center cursor-pointer w-10 h-10 rounded-full bg-yellow-500 text-white text-base font-bold">
							{

								user.username && <p>{user.username[0]}</p>

							}
						</div>

					</Link>
				</div>
			</header>

			<Separator />

			<main className="flex-1 container mx-auto px-6 py-6">
				<Outlet />
			</main>

			<footer className="py-6 text-center text-sm text-neutral-500 border-t border-neutral-800">
				© {new Date().getFullYear()} IMDb Clone — Created with ❤️ by
				Dotlabs
			</footer>

			{

				trailerKey && (

					<Player>
						<iframe
							className="w-[300px] h-[180px] fixed right-10 bottom-10"
							src={`https://www.youtube.com/embed/${trailerKey}`}
							title="Trailer Player"
							allowFullScreen
						/>
					</Player>

				)

			}

		</div >
	);
}

export default Layout;
