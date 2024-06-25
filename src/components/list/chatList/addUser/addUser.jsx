import './addUser.css';
import { db } from "../../../../lib/firebase";
import { useUserStore } from "../../../../lib/userStore";

import {
    collection,
    query,
    where,
    getDocs,
    serverTimestamp,
    setDoc,
    doc,
    updateDoc,
    arrayUnion,
    getDoc
} from 'firebase/firestore';
import { useState, useEffect } from 'react';

const AddUser = () => {
    const [user, setUser] = useState(null);
    const currentUserData = useUserStore();

    useEffect(() => {
        // Example of logging currentUser to verify its structure
        console.log("currentUserData:", currentUserData);
    }, [currentUserData]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");

        try {
            const userRef = collection(db, "users");
            const q = query(userRef, where("username", "==", username));
            const querySnapShot = await getDocs(q);

            if (!querySnapShot.empty) {
                const userData = querySnapShot.docs[0].data();
                setUser({
                    id: querySnapShot.docs[0].id,
                    ...userData
                });
            } else {
                console.log("User not found");
                setUser(null); // Reset user state if not found
            }
        } catch (err) {
            console.error("Error searching for user:", err);
        }
    };

    const handleAdd = async () => {
        // Access the correct structure of currentUser
        const currentUser = currentUserData.currentUser;

        // Additional debugging logs to identify which value is undefined or invalid
        console.log("user:", user);
        console.log("currentUser:", currentUser);
        console.log("user.id:", user ? user.id : null);
        console.log("currentUser.id:", currentUser ? currentUser.id : null);

        if (!user || !currentUser || !user.id || !currentUser.id) {
            console.log("User or currentUser or their IDs are not defined or valid");
            return;
        }

        const chatRef = collection(db, "chats");
        const userChatsRef = collection(db, "userchats");

        try {
            const newChatRef = doc(chatRef);

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });

            const userChatData = {
                chatId: newChatRef.id,
                lastMessage: "",
                receiverId: currentUser.id,
                updatedAt: Date.now(),
            };

            const currentUserChatData = {
                chatId: newChatRef.id,
                lastMessage: "",
                receiverId: user.id,
                updatedAt: Date.now(),
            };

            // Log to identify any undefined fields
            console.log('User Chat Data:', userChatData);
            console.log('Current User Chat Data:', currentUserChatData);

            const userDocRef = doc(userChatsRef, user.id);
            const currentUserDocRef = doc(userChatsRef, currentUser.id);

            // Check if userChats documents exist
            const userDocSnap = await getDoc(userDocRef);
            const currentUserDocSnap = await getDoc(currentUserDocRef);

            if (!userDocSnap.exists()) {
                await setDoc(userDocRef, { chats: [] });
            }

            if (!currentUserDocSnap.exists()) {
                await setDoc(currentUserDocRef, { chats: [] });
            }

            await updateDoc(userDocRef, {
                chats: arrayUnion(userChatData),
            });

            await updateDoc(currentUserDocRef, {
                chats: arrayUnion(currentUserChatData),
            });

            console.log(newChatRef.id);
        } catch (err) {
            console.error("Error adding user:", err);
        }
    };

    return (
        <div className="addUser">
            <form onSubmit={handleSearch}>
                <input type="text" placeholder='Username' name='username' />
                <button>Search</button>
            </form>
            {user && (
                <div className="user">
                    <div className="detail">
                        <img src={user.avatar || "/avatar.png"} alt="" />
                        <span>{user.username}</span>
                    </div>
                    <button onClick={handleAdd}>Add user</button>
                </div>
            )}
        </div>
    );
};

export default AddUser;
