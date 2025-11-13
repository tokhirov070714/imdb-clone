import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import { BookMarked } from "lucide-react";
import { Button } from "../ui/button";
import { useSaved } from "@/providers/SavedProvider";

import { useTheme } from "@/providers/ThemeProvider";

interface Movie {
	movie: {
		id: number;
		title: string;
		poster_path: string;
		vote_average: number;
		release_date: string;
	};
}

const MovieCard: React.FC<Movie> = ({ movie }) => {
	const { handleSave, isSaved } = useSaved();

	const { theme } = useTheme()

	return (
		<Card className={`
		
			${
				theme == "dark" ? "bg-neutral-900 border-neutral-800"
				: "bg-neutral-100 border-neutral-200"
			}

		hover:border-yellow-400 transition-all duration-200`}>
			<CardContent className="p-2">
				<Link to={`/movies/${movie.id}`}>
					<img
						src={`${import.meta.env.VITE_TMDB_IMAGES}${movie.poster_path
							}`}
						alt={movie.title}
						className="rounded-md mb-2"
					/>
				</Link>

				<h3 className={`text-sm font-medium line-clamp-1 
					
					${
						theme == "dark" ? "text-white"
						: "text-black"
					}

					`}>
					{movie.title}
				</h3>
				<div className="flex items-start justify-between w-full">
					<div className="flex flex-col items-start justify-between mt-1 gap-2">
						<Badge
							variant="secondary"
							className="bg-yellow-400/20 text-yellow-400 text-xs"
						>
							★ {movie.vote_average.toFixed(1)}
						</Badge>
						<span className="text-xs text-neutral-500">
							{movie.release_date.split("-")[0]}
						</span>
					</div>
					<Button
						onClick={() => handleSave(movie.id)}
						className={`${isSaved(movie.id) ? "bg-red-700" : "bg-amber-400"
							} cursor-pointer`}
					>
						<BookMarked />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default MovieCard;
