import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "../../css/routes/Detail.module.css"
import { BeatLoader } from "react-spinners";

function Detail() {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState([]);
    const [showFullDescription, setShowFullDescription] = useState(false);

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

    const toggleDescription = () => {
        setShowFullDescription((prev) => !prev);
    };

    return (
        <div className={style.container}>
            {loading ? 
                <div className={style.loading_container}>
                    <BeatLoader />
                    <h2 className={style.loading_text}>Loading...</h2>
                </div> : 
                <div>
                    <h1 className={style.site_title}>Movie</h1>
                    <hr className={style.hr_detail} />
                    <div className={style.container_box}>
                        <img className={style.cover_img} src={detail.medium_cover_image} />
                        <div className={style.text_box}>
                            <h1 className={style.title}>{detail.title}</h1>
                            <div className={style.year}>{detail.year} &nbsp;|&nbsp; {detail.runtime}분</div>
                            <div className={style.rating}>Rating: {detail.rating} / 5.0</div>
                            <div className={style.likes}>Likes: {detail.like_count}</div>
                            <div className={style.genre}>
                                <span>
                                    Genre: {detail.genres.map((genre, index) => (
                                        <span key={genre}>
                                            {index !== detail.genres.length - 1 ? <span>{genre}, </span> : <span>{genre}</span>}
                                        </span>
                                    ))}
                                </span>
                                <hr className={style.hr_detail} />
                            </div>
                            <div className={style.description_container}>
                                <h3 className={style.description_text}>Description</h3>
                                <div className={`${style.description_content} ${showFullDescription ? style.expanded : ''}`}>
                                    {detail.description_full}
                                </div>
                                <button className={style.view_detail} onClick={toggleDescription}>
                                    {showFullDescription ? 'Show Less' : 'Show Detail'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Detail;