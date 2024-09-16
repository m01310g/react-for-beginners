import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "../../css/routes/Detail.module.css"

function Detail() {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState([]);

    const getMovie = async () => {
        const json = await(
            await fetch(
            `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setLoading(false);
        setDetail(json.data.movie);
    }

    useEffect(() => {
        getMovie();
    }, [])

    return (
        <div className={style.container}>
            {loading ? <h2>Loading...</h2> : 
                <div>
                    <h1 className={style.site_title}>Movie</h1>
                    <hr />
                    <div className={style.container_box}>
                        <img src={detail.large_cover_image} />
                        <div className={style.text_box}>
                            <h1 className={style.title}>{detail.title}</h1>
                            <div className={style.year}>{detail.year} &nbsp;|&nbsp; {detail.runtime}분</div>
                            <div className={style.rating}>Rating: {detail.rating}</div>
                            <div className={style.likes}>Likes: {detail.like_count}</div>
                            <div className={style.genre}>
                                <span>
                                    Genre: {detail.genres.map((genre, index) => (
                                        <span key={genre}>
                                            {index !== detail.genres.length - 1 ? <span>{genre}, </span> : <span>{genre}</span>}
                                        </span>
                                    ))}
                                </span>
                            </div>
                            <div className={style.description}>
                                <span>{detail.description_full}</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Detail;