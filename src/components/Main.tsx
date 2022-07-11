import React, { useEffect, useRef, useState } from 'react'
import { Post } from './Card';

export const Main=()=> {
    const [data,setData] = useState<Object[]>([]);
    let page = 0;
    const ref = useRef< undefined | number>(undefined);
    

    useEffect(()=>{
        Start();
    },[])

    useEffect(()=>{
        // console.log(data);
    },[data])
    
    
    let id:any;
    const Start = ()=>{
        clearInterval(id);
        id = window.setInterval(()=>{
            page = page+1;
            getData(page);
        },2000);
    }
   
    
    
    const getData = (page:number)=>{
        fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`)
        .then((res)=>{
            res.json().
            then((res)=>{

                // console.log(res);
                let arr = [...data, ...res.hits]
              
                console.log([...data, ...res.hits]);
                setData(arr);
                // setData(data.concat(res.hits));
            });
        })
        .catch((res)=>{
            console.log(res);
        })
    }

    

  return (
    <>
    {page}
       <h1 className='headd' >News-Stand </h1>
    <div className='main'>
      {data && data.map((el:any,i:number)=>{
        return <Post key={i} title={el?.title} url= {el?.url} author= {el?.author} tags= {el?._tags} date={el?.created_at}/>
      })}
    </div>
    </>
  )
}