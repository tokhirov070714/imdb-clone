import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "@/lib/axios";
import MovieCard from "../custom/MovieCard";
import { Badge } from "@/components/ui/badge";
import { useSettings } from "@/providers/SettingsProvider";
import { useTrailer } from "@/providers/TrailerProvider";

interface MovieDetails {
	id: number;
	title: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	release_date: string;
	vote_average: number;
	genres: { id: number; name: string }[];
}


const Movie: React.FC = () => {
	const { id } = useParams();
	const { lang } = useSettings()
	const [movie, setMovie] = useState<MovieDetails | null>(null);
	const [related, setRelated] = useState<MovieDetails[]>([]);
	const [posters, setPosters] = useState<any>([]);
	const [videos, setVideos] = useState<any>([]);

	const { trailerKey, setTrailerKey } = useTrailer()


	useEffect(() => {
		if (!id) return;
		const fetchData = async () => {
			try {
				const [movieRes, relatedRes, posters, videos] = await Promise.all([
					axiosInstance.get(`/movie/${id}?language=${lang}&adult=false`),
					axiosInstance.get(`/movie/${id}/similar?language=${lang}&adult=false`),
					axiosInstance.get(`/movie/${id}/images?language=${lang}&adult=false`),
					axiosInstance.get(`/movie/${id}/videos?language=${lang}&adult=false`),
				]);
				setMovie(movieRes.data);
				setRelated(relatedRes.data.results);
				setPosters(posters.data.posters);
				setVideos(videos.data.results)

				// console.log(videos.data.results)

			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, [id, lang]);

	const memoTrailer = useMemo(() => {
		const trailer = videos.find((video: any) => video.type === "Trailer")

		return trailer
	}, [videos])

	useEffect(() => {

		if (memoTrailer?.key) {

			setTrailerKey(memoTrailer.key);

		}
	}, [memoTrailer, setTrailerKey]);


	if (!movie) {
		return (
			<div className="text-center py-10 text-neutral-400">
				Загрузка...
			</div>
		);
	}

	function logKey() {

		console.log(trailerKey);


	}



	return (
		<div className="px-4 md:px-8 py-6">
			<div className="flex flex-col md:flex-row gap-6 mb-10">
				<img
					src={`${import.meta.env.VITE_TMDB_IMAGES}${movie.poster_path
						}`}
					alt={movie.title}
					className="rounded-md w-full md:w-64"
				/>
				<div>
					<h1 className="text-3xl font-semibold mb-2">
						{movie.title}
					</h1>
					<div className="flex items-center gap-3 mb-4 text-sm text-neutral-400">
						<span>{movie.release_date}</span>
						<span>•</span>
						<span>★ {movie.vote_average.toFixed(1)}</span>
					</div>
					<div className="flex flex-wrap gap-2 mb-4">
						{movie.genres.map((genre) => (
							<Badge
								key={genre.id}
								variant="secondary"
								className="bg-yellow-400/20 text-yellow-400 text-xs"
							>
								{genre.name}
							</Badge>
						))}
					</div>
					<p className="text-neutral-300 max-w-2xl leading-relaxed">
						{movie.overview}
					</p>
					<div className="flex items-center justify-start gap-4 w-full overflow-x-scroll mt-4">
						{posters.map((poster: any) => (
							<img
								src={`${import.meta.env.VITE_TMDB_IMAGES}${poster.file_path
									}`}
								alt="tmdb"
								className="w-[200px] h-[200px] object-cover"
							/>
						))}
					</div>
				</div>
			</div>


			<h1 className="text-3xl">Трейлеры</h1>

			{memoTrailer ?

				<div className="mb-8">



					<h1 className="text-3xl mb-4">Главный трейлер</h1>

					<iframe
						className="w-full h-[400px]"
						src={`https://www.youtube.com/embed/${memoTrailer.key}`}
						referrerPolicy="strict-origin-when-cross-origin"
						title={`Трейлер: ${movie.title}`}
					/>
				</div> : ""
			}

			{/* <div>
        {videos.map((video) => (<div>
            <iframe
              className="w-full h-[300px]"
              src={`https://www.youtube.com/embed/${video.key}`}
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        ))}
      </div> */}


			<h2 className="text-xl font-semibold mb-4">Похожие фильмы</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
				{related.map((rel) => (
					<MovieCard key={rel.id} movie={rel} />
				))}
			</div>
		</div>
	);
};

// function VodeoPlayer({ urlKey }: { urlKey: string }) {
//   return (

//     <iframe
//       className="w-full h-[300px]"
//       src={`https://www.youtube.com/embed/${urlKey}`}
//       referrerPolicy="strict-origin-when-cross-origin"
//     ></iframe>
//   );
// // }

export default Movie;