import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
const api={
  key:"53cf7ae96c4004ef94b4969455a184c5",
  base:"https://api.openweathermap.org/data/2.5/"
}

function App() {
  const[query,setQuery]= useState('')
  const[weather,setWeather]=useState({})
  const search = evt =>{
    if(evt.key==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=>res.json())
      .then(result=>{
        console.log(result)
        setWeather(result);
        setQuery('')
        console.log(result);
      })
    }
  }
  const dateBuilder =(d)=>{
    let months =["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
    let days =["sun","mon","tue","wed","th","fri","sat","sun"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className="App">
      <main>
        <div className='search-box'>
          <input type='text'className='search-bar' placeholder='search'
          value={query}
          onChange={e=>setQuery(e.target.value)}
          onKeyPress={search}
          />
        </div>

        {
        Object.keys(weather).length>0?
        
          <>
 <div className='locaton-box'>
          <div className='location'>{weather.name!==undefined?weather.name:""},{weather.sys.country!==undefined?weather.sys.country:""}</div>
          <div className='date'>{dateBuilder(new Date())}</div>
        </div>
        <div className='weather-box'>
          <div className='temp'>{Math.round(weather.main.temp)} ^c</div>
        <div className='weather'>{weather.weather[0].main}</div>

        </div>
          </>
          :""
        
        }
       

      </main>

    </div>
  );
}

export default App;
