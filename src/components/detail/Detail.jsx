import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useChatStore } from '../../lib/chatStore';
import { auth, db } from '../../lib/firebase'
import { useUserStore } from '../../lib/userStore';
import './detail.css'

const Detail=()=>{
    const { chatId, user ,isCurrentUserBlocked ,isReceiverBlocked,changeBlock} = useChatStore();
    const { currentUser } = useUserStore();

    const handleBlock=async()=>{
        if(!user) return;
            const userDocRef =doc(db,"users",currentUser.id)
        try {
            await updateDoc(userDocRef,{
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
            });
            changeBlock()
        } catch (err) {
            console.log(err);
        }
    };
    return(
        <div className="detail">
            <div className="user">
                <img src={user?.avatar || "/avatar.png"} alt="" />
                <h2>{user?.username}</h2>
                <p>About {user?.username} </p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="/arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy & help</span>
                        <img src="/arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared photos</span>
                        <img src="/arrowUp.png" alt="" />
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://i.pinimg.com/originals/1a/b0/89/1ab089aaf438547bc56b14d3e597807d.jpg" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="/download.png" alt="" className='icon'/>
                        </div>
                        {/* <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://i.pinimg.com/originals/1a/b0/89/1ab089aaf438547bc56b14d3e597807d.jpg" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="/download.png" alt="" className='icon'/>
                        </div> */}
                        {/* <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://i.pinimg.com/originals/1a/b0/89/1ab089aaf438547bc56b14d3e597807d.jpg" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="/download.png" alt="" className='icon'/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://i.pinimg.com/originals/1a/b0/89/1ab089aaf438547bc56b14d3e597807d.jpg" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="/download.png" alt="" className='icon'/>
                        </div> */}
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="/arrowUp.png" alt="" />
                    </div>
                </div>
                <button onClick={handleBlock}>{
                    isCurrentUserBlocked ? "You are Blocked" : isReceiverBlocked
                    ? "User blocked" : "Blocked User"
                    }</button>
                <button className="logout" onClick={()=>auth.signOut()}>Logout</button>
            </div>
        </div>
    )
}

export default Detail