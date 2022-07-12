import { useEffect,useState,useRef } from "react";
import { Post } from "./Card";
import InfiniteScroll from "react-infinite-scroll-component";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

export const Main = () => {
  const [data, setData] = useState<Object[]>([]);
  let [page, setPage] = useState(46);
  const [isError, SetisError] = useState(true);
  const [searchedData,setSearchData] = useState<Object[]>([]);
  let searchTimeoutref = useRef<any>();
  const [isLoading,setIsLoading] = useState(false);

  
  const getSearchData =(e:any)=>{
     let searchValue = e.target.value; 

     if(searchValue.trim().length !== 0){
       setIsLoading(true);
     if(searchTimeoutref.current){
       clearTimeout(searchTimeoutref.current);
     } 
 
     searchTimeoutref.current = setTimeout(()=>{
        
         if(searchValue.length !== 0){
           let arr = data.filter((el:any)=> el.author.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) || el.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) );
 
           setSearchData(arr);
           setIsLoading(false);
         }else if(searchValue.trim().length == 0){ 
           setSearchData([]);
           setIsLoading(false);
         }
         
     },1000)
     }
  }  


// useEffect(()=>{
//   getData();
// },[])



  useEffect(() => {

      
    if(isError){
      const interval = setInterval(() => {
         setPage((page) => page + 1);
         getData();
       }, 3000);
   
     
       return () => {
         clearInterval(interval);
       };
      }
  }, [page]);


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

      <InfiniteScroll
        dataLength={data.length}
        next={() => {
          setPage(page + 1);
          getData();
        }}
        hasMore={isError}
        loader={<h2 style={{ textAlign: "center" }}>Loading...</h2>}
      >
        <Box className="input">
        <TextField fullWidth label="Search by Author and Title" id="fullWidth" onChange={getSearchData} />
        </Box>

          {isLoading && <Box style= {{width:"90%",margin:"auto",marginTop:""}}><LinearProgress /></Box>}
          

        {searchedData.length > 0  && <Box className="searchContentBox">
          { searchedData.map((el: any, i) => {
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
        </Box>}
        

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
