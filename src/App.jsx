import axios from 'axios'
import React, { useEffect, useState } from 'react'

function App() {
  const[form , setform] = useState({
country : "",
rank : 0
  })
  const[data , setdata] = useState([])
  useEffect(()=>{
    async function searchdata(){
      try {

        for(let i = 1 ; i<=20 ; i++){
              let res = await axios.get("https://jsonmock.hackerrank.com/api/universities" ,{
        params : {
          page : i
        }
      })
      setdata((prev)=>[...prev ,...res.data.data])
    }  
      } catch (error) {
        console.error(error)
      }

    }
    
      searchdata()
  },[])

  function handlechange(e){
    const { name , value} = e.target
setform(prev=>({...prev , [name] : value }))
  }
  
  const filter = data.filter((item)=>item.location.country.toLowerCase().includes(form.country.toLowerCase())&&item.score>form.rank)
  return (
    <div>
      
      <div>
        <input type="text" placeholder='location' name='country' value={form.country} onChange={handlechange}/>
        <input type="number" placeholder='name' name='rank' value={form.rank} onChange={handlechange}/>p
      </div>
      <ol>
      {filter.map((data,index)=>(
        <li key={`${index}-${data.university}`}>
          <div>
            <h1>{data.university}</h1>
            <h3>{data.score}</h3>
            <h3>{data.location.country}</h3>
            <h6>{data.rank_display}</h6>

          </div>
        </li>
      ))}
      </ol></div>
  )
}

export default App