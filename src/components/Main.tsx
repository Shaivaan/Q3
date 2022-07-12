import  { useEffect, useRef, useState } from 'react'
import { Post } from './Card';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Main=()=> {
    const [data,setData] = useState<Object[]>([]);
    let [page,setPage] = useState(0);
    const ref = useRef< undefined | number>(undefined);
    let interval:any;


    // useEffect(()=>{
       
    // },[])

    useEffect(()=>{
        // getPollingData();

        interval = setInterval(()=>{
           setPage((page)=>page+1);
           getData()
       },5000);

        return ()=>{
            clearInterval(interval);
        }
    },[page]);

   


//    const getPollingData = ()=>{
    // }
  
   
    const getData = ()=>{
        console.log()
        fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`)
        .then((res)=>{
            res.json().
            then((res)=>{
                setData([...data,...res.hits]);
            });
        })
        .catch((res)=>{
            console.log(res);
        })
    }

   


  return (
    <>

       <h1 className='headd' >News-Stand </h1>

       <InfiniteScroll 
       dataLength={data.length} 
       next = {()=>{
        clearInterval(interval);
        setPage((page)=>page+1);
        getData();
       }}
       hasMore= {true}
       loader= { <h2 style={{textAlign:"center"}}>Loading...</h2> }
       >
    <div className='main'>
      {data && data.map((el:any,i)=>{
          return <div><Post key={i} title={el?.title} url= {el?.url} author= {el?.author} tags= {el?._tags} date={el?.created_at}/></div>
        })}
    </div>
        </InfiniteScroll>
    </>
  )
}