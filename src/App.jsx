import Detail from "./components/detail/Detail"
import List from "./components/list/List"
import Chart from "./components/chat/Chart"
import Login from "./components/login/Login"
import Notification from "./components/notification/Notification"


const App = () => {

  const user=true

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