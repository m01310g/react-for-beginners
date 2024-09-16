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
        <div>
            {loading ? <h2>Loading...</h2> : 
                <div>
                    <img src={detail.medium_cover_image} />
                    <h2>{detail.title}</h2>
                    <span>Rating: {detail.rating}</span>
                    <div className={style.genres}>
                        {detail.genres.map((genre) => <span>{genre}</span>)}
                    </div>
                </div>
            }
        </div>
    );
}

export default Detail;