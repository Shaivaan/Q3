import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Json } from '../components/Json'
import { Main } from '../components/Main'

export const Routers=()=> {
  return (
    <div>
        <Routes>
            <Route path='/' element= {<Main/>}></Route>
            <Route path='/json' element= {<Json/>}></Route>
        </Routes>
    </div>
  )
}

