import { useEffect } from 'react'
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';




export const Json=()=> {

    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as object;

    useEffect(()=>{
        if(!state){
            navigate("/");
        }
    })

  return (
    <Box>
        <pre>
        {JSON.stringify(state,null,2)}
        </pre>
    </Box>
  )
}


