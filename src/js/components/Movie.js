import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import style from "../../css/components/Movie.module.css";

// title을 클릭하면 Detail 페이지로 이동
function Movie({id, coverImg, title, year, runtime, genres}) {
    return (
        <div className={style.container}>
            <Link to={`/movie/${id}`} style={{textDecoration: "none"}}>
                <img className={style.poster} src={coverImg} alt={title} />
                <div>    
                    <h2 className={style.title}>{title}</h2>
                </div>
                <div className={style.year}>
                    <span>{year} &nbsp;|&nbsp; {runtime}분</span>
                </div>
                <div className={style.genres}>
                    <span>
                        장르: {genres.map((genre, index) => (
                            <span key={genre}>{index !== genres.length - 1 ? <span>{genre}, </span> : <span>{genre}</span>}</span>
                        ))}
                    </span>
                </div>
            </Link>
        </div>
    );
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    coverImg: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year:PropTypes.number.isRequired,
    runtime:PropTypes.number.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Movie;