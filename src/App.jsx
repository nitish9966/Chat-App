import Detail from "./components/detail/Detail"
import List from "./components/list/List"
import Chart from "./components/chat/Chart"
import Login from "./components/login/Login"
import Notification from "./components/notification/Notification"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./lib/firebase"


const App = () => {

  const user=false

  useEffect(()=>{
    const unSub= onAuthStateChanged(auth,(user)=>{
      console.log(user);
    });

    return () =>{
      unSub();
    }

  },[]);

  return (
    <div className='container'>
      {
        user ? (
          <>
        <List/>
        <Chart/>
        <Detail/>
        </>
      ) : (<Login/>

      )}
      <Notification/>
    </div>
  )
}

export default App