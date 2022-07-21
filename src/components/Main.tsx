import { useEffect, useState, useRef } from "react";
import { Post } from "./Card";
import InfiniteScroll from "react-infinite-scroll-component";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

type PostProp = {
  title: string;
  url: string;
  _tags: string[];
  author: string;
  created_at: string;
};

export const Main = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Object[]>([]);
  let [page, setPage] = useState(0);
  const [isError, SetisError] = useState(true);
  const [counter, setCounter] = useState(false);
  const [searchedData, setSearchData] = useState<Object[]>([]);
  let searchTimeoutref = useRef<NodeJS.Timeout>();
  const [isLoading, setIsLoading] = useState(false);

  const redirectToJson = (json: object) => {
    navigate("/json", { state: json });
  };

  useEffect(() => {
    if (isError) {
      getData();
      const interval = setInterval(() => {
        setPage((page) => page + 1);
      }, 10000);

      return () => {
        clearInterval(interval);
      };
    }
    setCounter(false)
  }, [page]);

  const getSearchData = (e: React.ChangeEvent<HTMLInputElement>) => {
    let searchValue = e.target.value;

    if (searchValue.trim().length !== 0) {
      setIsLoading(true);
      if (searchTimeoutref.current) {
        clearTimeout(searchTimeoutref.current);
      }

      searchTimeoutref.current = setTimeout(() => {
        if (searchValue.trim().length !== 0) {
          let arr = data.filter(
            (el: any) =>
              el.author
                .toLocaleLowerCase()
                .includes(searchValue.toLocaleLowerCase()) ||
              el.title
                .toLocaleLowerCase()
                .includes(searchValue.toLocaleLowerCase())
          );
          setSearchData(arr);
          setIsLoading(false);
        }
      }, 1000);
    } else if (searchValue.trim().length == 0) {
      setSearchData([]);
      setIsLoading(false);
      clearTimeout(searchTimeoutref.current);
    }
  };

  const getData = () => {
    console.log();
    fetch(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
    )
      .then((res) => {
        res.json().then((res) => {
          if (res.hits.length == 0) {
            SetisError(false);
            return;
          }
          setData([...data, ...res.hits]);
        });
      })
      .catch((res) => {
        SetisError(false);
        return;
      });
  };

  return (
    <>
      <h1 className="headd">News-Stand </h1>

      {data.length !== 0 && (
        <Box className="input">
          <TextField
            autoComplete="off"
            fullWidth
            label="Search by Author and Title"
            id="fullWidth"
            onChange={getSearchData}
          />
        </Box>
      )}

      {isLoading && (
        <Box
          data-testid = "loader"
          style={{
            width: "90%",
            margin: "auto",
            marginTop: "5vh",
            marginBottom: "5vh",
          }}
        >
          <LinearProgress />
        </Box>
      )}

      {searchedData.length > 0 && !isLoading && (
        <Box className="searchContentBox1" >
          <Typography style={{ textAlign: "center", fontSize: "5vh" }}>
            Results
          </Typography>
          <Box className="searchContentBox2" >
            {searchedData.map((el: PostProp | any, i) => {
              return (
                <div>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      redirectToJson(el);
                    }}
                  >
                    See Raw JSON
                  </Button>
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
          </Box>
        </Box>
      )}

      <InfiniteScroll
        dataLength={data.length}
        next={() => {
          setPage(page + 1);
        }}
        hasMore={isError}
        loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
      >
        <div className="main" data-testid="alldata">
          {data &&
            data.map((el: PostProp | any, i) => {
              return (
                <div>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      redirectToJson(el);
                    }}
                  >
                    See Raw JSON
                  </Button>
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
