import ChartList from './chatList/ChatList'
import './list.css'
import Userinfo from './userInfo/Userinfo'

const List=()=>{
    return(
        <div className="list">
            <Userinfo/>
            <ChartList/>
        </div>
    )
}

export default List