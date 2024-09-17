import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import style from "../../css/routes/Home.module.css";
import { BeatLoader } from "react-spinners";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  // then보다 더 자주 사용하는 것은 async-await
  const getMoives = async() => {
    // response 변수는 fetch한 api 저장
    // json 변수는 저장한 api를 json으로 변환 -> 하나로 묶을 수 있음
    /*
    const response = await fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_ratings=8.5&sort_by=year`
    );
    
    const json = await response.json();
    */
    // 위의 방식을 await 내부에 await를 사용하여 표현 가능
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_ratings=8.5&sort_by=year`
      )
    ).json()

    setMovies(json.data.movies);
    setLoading(false);
  }

  useEffect(() => {
    getMoives();
  }, []);
  
  return (
    <div className={style.container}>
      {loading ? 
        <div className={style.loading_container}>
          <BeatLoader />
          <h2 className={style.loading_text}>Loading...</h2>
        </div> : 
        <div>
          <h1 className={style.title}>Movie</h1>
          <hr className={style.hr} />
          <div className={style.box}>
            {movies.map((movie) => (
              <Movie 
                key={movie.id}
                id={movie.id}
                coverImg={movie.medium_cover_image}
                title={movie.title}
                year={movie.year}
                runtime={movie.runtime}
                genres={movie.genres}
              />
            ))}
          </div>
        </div>
        }
    </div>
  );
}

export default Home;