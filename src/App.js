import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import Axios from 'axios';

function App() {
  const [user,setUser] = useState([])
  const [name,setName] = useState("")
  const [userName,setUserName] = useState("")
  const [gainId,setGainId] = useState(0)
  const idref = useRef("")

  function controlInput(e){    //post onchange
    let state = e.target.value
    setName(state)
    // setNameUpdate(e.target.value)
    // console.log(name)
  }

  function controlInputUser(e){
    const userState = e.target.value
    setUserName(userState)
  }

  function controlUpdateInput(value,id,name){  //put onchange
    // console.log(nameUpdate)
    setUser(users => users.map((v,i)=> {
      return v.id === id ? {...v,[name]:value} : v
    }))
    // let state = e.target.value
    // setNameUpdate(state)
  }

  function postUser(nms){
    Axios.post("https://jsonplaceholder.typicode.com/users",{name:name,username:userName})
    .then(res => { 
      if(name && userName){
        console.log(res.data)
        let id = 11
        for(let i = 0 ;i<user.length -1;i++){
          let isBooleans = user.some((v,i)=> id === v.id)
          if(isBooleans){
            id+=1
          }
          else if(id>=11){
            let data = {...res.data,id:id}
            setUser([...user,data])
            setName("")
            setUserName("")
            break
          }
        }
      }
    })
  }


  useEffect(()=>{
   async function getData(){
    try {
      let response = await Axios.get('https://jsonplaceholder.typicode.com/users')
      // console.log(response.data)
      if(response.status !== 200){
        throw new Error("a error occured")
      }
      setUser(response.data)
    } catch (error) {
      console.log("erroe is",error)
    }

      // Axios.get("https://jsonplaceholder.typicode.com/posts/1")
      // .then(response => setUser([response.data]))
    }
    getData()
  },[])

  function updateUser(id){
    setGainId(id)
    let users = user.find((v,i)=> v.id === id)
    Axios.put(`https://jsonplaceholder.typicode.com/users/${id}`
      ,{name:users.name})
    .then(res => {
      console.log(res.data)
    })
  }

  function deleteUser(id){
    Axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(res => setUser(user.filter((v,i)=>{
        return v.id !== id
      }))
    )
  }

  return (
    <div className="App">
      api - axios
      {user.map((v,i)=>(
        <ul key={i}>
          <div>id : {v.id}</div>
          <div>name :{v.name}</div>
          <div>user name : {v.username}</div>
          <button onClick={() => deleteUser(v.id)}>delete</button>

                {/* update */}
        <input  type="text" value={v.name}  name='name'
                onChange={(e) => controlUpdateInput(e.target.value,v.id,e.target.name)}/>
        <button onClick={() => updateUser(v.id)}>update</button>
        </ul>
      ))}

      {/* post */}
      <div style={{display  :"flex",justifyContent : "center",gap : "10px"}}>
        <section>
        <input type="text" value={name} 
              onChange={controlInput} placeholder='name'/>
        <button onClick={() => postUser(gainId)}>post</button>
        </section>

        <section>
        <input type="text" value={userName} 
              onChange={controlInputUser} placeholder='userName'/>
        <button onClick={() => postUser(gainId)}>post</button>
        </section>
      </div>
    
    </div>
    );
}

export default App;
