import { useEffect, useRef, useState } from 'react'
import './chart.css'
import EmojiPicker from 'emoji-picker-react'

const Chart=()=>{
const [open,setOpen]=useState(false)
const [text,setText]=useState("")

const endRef=useRef(null)

useEffect(()=>{
    endRef.current?.scrollIntoView({behaviour:"smooth"});
},[])

const handleEmoji=(e)=>{
    setText((prev)=>prev+e.emoji);
    setOpen(false)
}
console.log(text)

    return(
        <div className="chart">
            <div className="top">
                <div className="user">
                    <img src="/avatar.png" alt="" />
                    <div className="texts">
                        <span>Jane Doe</span>
                        <p>Lorem ipsum dolor sit amet,!</p>
                    </div>
                    <div className="icons">
                        <img src="/phone.png" alt="" />
                        <img src="/video.png" alt="" />
                        <img src="/info.png" alt="" />
                    </div>
                </div>
            </div>
            <div className="center">
            <div className="message">
                    <img src="/avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <img src="https://i.pinimg.com/originals/1a/b0/89/1ab089aaf438547bc56b14d3e597807d.jpg" alt="" />
                        <p>Lorem ipsum dolor sit amet.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="/avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src="/img.png" alt="" />
                    <img src="/camera.png" alt="" />
                    <img src="/mic.png" alt="" />
                </div>
                <input type="text"
                value={text}
                placeholder='Type a message...' 
                onChange={e=>setText(e.target.value)}/>
                <div className="emoji">
                    <img src="/emoji.png" alt="" onClick={()=>setOpen((prev)=>!prev)}/>
                    <div className="picker">
                    <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
                    </div>
                </div>
                <button className="sendButton">Send</button>
            </div>
        </div>
    )
}

export default Chart