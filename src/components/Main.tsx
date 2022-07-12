import { useEffect,useState } from "react";
import { Post } from "./Card";
import InfiniteScroll from "react-infinite-scroll-component";

export const Main = () => {
  const [data, setData] = useState<Object[]>([]);
  let [page, setPage] = useState(0);
  let interval: (NodeJS.Timeout);
  const [isError, SetisError] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    interval = setInterval(() => {
      setPage((page) => page + 1);
      getData();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [page]);

  const getData = () => {
    console.log();
    fetch(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
    )
      .then((res) => {
        res.json().then((res) => {
          if (res.hits.length == 0) {
            clearInterval(interval);
            SetisError(false);
            return;
          }
          setData([...data, ...res.hits]);
        });
      })
      .catch((res) => {
        SetisError(false);
        clearInterval(interval);
        return;
      });
    // .finally(()=>{
    //     if(!isError){
    //         clearInterval(interval);
    //     }
    // })
  };

  return (
    <>
      <h1 className="headd">News-Stand </h1>

      <InfiniteScroll
        dataLength={data.length}
        next={() => {
          clearInterval(interval);
          setPage(page + 1);
          getData();
        }}
        hasMore={isError}
        loader={<h2 style={{ textAlign: "center" }}>Loading...</h2>}
      >
        <div className="main">
          {data &&
            data.map((el: any, i) => {
              return (
                <div>
                  <Post
                    key={i}
                    title={el?.title}
                    url={el?.url}
                    author={el?.author}
                    tags={el?._tags}
                    date={el?.created_at}
                  />
                </div>
              );
            })}
        </div>
      </InfiniteScroll>
      {!isError && <h2 style={{ textAlign: "center" }}>No Data to show</h2>}
    </>
  );
};
