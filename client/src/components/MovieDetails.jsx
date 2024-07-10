import { useState } from "react";
import "../styles/moviedetails.css";
import { useLoaderData, Link } from "react-router-dom";
import ExpandableText from "./ExpandableText";

function MovieDetails() {
  const { moviePeople, movieDetails, movieCountries } = useLoaderData();
  const movieCasting = moviePeople.cast.slice(0, 4);

  function nativeName() {
    return movieDetails.origin_country
      .map((iso) => {
        const foundIndex = movieCountries.findIndex(
          (country) => country.iso_3166_1 === iso
        );
        return movieCountries[foundIndex].native_name;
      })
      .join(", ");
  }

  const filteredCrew = moviePeople.crew
    .filter((person) => person.department === "Directing")
    .slice(0, 3);

  const [isFavorite, setIsFavorite] = useState("");
  const handleClickFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const releaseYear = () => {
    const date = new Date(movieDetails.release_date);
    const year = date.getFullYear();
    return year;
  };

  const releaseDate = () => {
    const event = new Date(movieDetails.release_date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return event.toLocaleDateString("fr-FR", options);
  };

  const runTime = () => {
    const hours = Math.floor(movieDetails.runtime / 60);
    const minutes = movieDetails.runtime % 60;
    return `${hours}h ${minutes}min`;
  };

  const cleanString = (arrayOfString) => {
    let string = arrayOfString.join("");
    if (string.endsWith(", ")) {
      string = string.slice(0, -2);
    }
    return string;
  };

  const renderCrew = filteredCrew.map((director) => `${director.name}, `);
  const renderCasting = movieCasting.map((cast) => `${cast.name}, `);
  const renderGenres = movieDetails.genres.map((genre) => `${genre.name}, `);

  return (
    <>
      <div className="movieCard">
        <div
          className="film-background"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}&language=fr-FR)`,
          }}
        >
          <title>empty</title>
        </div>
        <h1>{movieDetails.title}</h1>
        <ul className="movieCardContent">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}&language=fr-FR`}
            alt=""
            className="frontImg"
          />
          <div className="movieCardList">
            <li className="title-movie">{movieDetails.original_title}</li>
            <li className="date-movie">
              {releaseYear()} | {runTime()}
            </li>
            <li className="genre-movie">
              <p>{cleanString(renderGenres)}</p>
            </li>
            <div className="ratingAndFavorite">
              <li>⭐{movieDetails.vote_average.toFixed(1)}</li>
              <button onClick={handleClickFavorite} type="button">
                {isFavorite ? "Remove ❤️" : "Add 🖤"}
              </button>
            </div>
          </div>
        </ul>
      </div>
      <div className="movieDescription">
        <ul>
          <li>
            <span className="blue-Font">Dirigés par : </span>
            <span>{cleanString(renderCrew)}</span>
          </li>
          <li>
            <span className="blue-Font">En salle depuis :</span>
            <span> {releaseDate()}</span>
          </li>

          <li>
            <span className="blue-Font">Casting principal : </span>
            <span className="casting">{cleanString(renderCasting)}</span>
          </li>
          <li>
            <span className="blue-Font">Pays d'origine : </span>
            <span>{nativeName()}</span>
          </li>
        </ul>
      </div>
      <div className="synopsis">
        <h3 className="blue-Font">Synopsis</h3>
        <ExpandableText text={movieDetails.overview} />
      </div>
      <button className="blue-Font fullDetails" type="button">
        <Link to={`/movies/${movieDetails.id}/sheet`}> Fiche technique</Link>
      </button>
    </>
  );
}

export default MovieDetails;
