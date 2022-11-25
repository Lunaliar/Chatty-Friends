import React, {useContext, useState} from "react";
import {
	collection,
	query,
	where,
	getDocs,
	setDoc,
	doc,
	updateDoc,
	serverTimestamp,
	getDoc,
} from "firebase/firestore";
import {db} from "../firebase";
import {AuthContext} from "../context/AuthContext";

function Search() {
	const {currentUser} = useContext(AuthContext);
	const [username, setUsername] = useState("");
	const [user, setUser] = useState("");
	const [err, setErr] = useState(false);

	const handleSearch = async () => {
		setErr(false);

		const q = query(
			collection(db, "users"),
			where("displayName", "==", username)
		);

		try {
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				setUser(doc.data());
			});
		} catch (err) {
			setErr(true);
			console.log(err);
		}
	};
	const handleKey = (e) => {
		e.code === "Enter" && handleSearch();
	};

	const handleSelect = async () => {
		setErr(false);
		//make unique id for each pair of users
		const combinedId =
			currentUser.uid > user.uid
				? currentUser.uid + user.uid
				: user.uid + currentUser.uid;

		//check if users have interacted before
		try {
			const res = await getDoc(doc(db, "chats", combinedId));
			if (!res.exists()) {
				//Create individual chat with messages
				await setDoc(doc(db, "chats", combinedId), {messages: []});
				// create current user sidebar chat
				await updateDoc(doc(db, "userChats", user.uid), {
					[combinedId + ".userInfo"]: {
						uid: currentUser.uid,
						displayName: currentUser.displayName,
						photoURL: currentUser.photoURL,
					},
					[combinedId + ".date"]: serverTimestamp(),
				});
				//create searched user sidebar chat
				await updateDoc(doc(db, "userChats", currentUser.uid), {
					[combinedId + ".userInfo"]: {
						uid: user.uid,
						displayName: user.displayName,
						photoURL: user.photoURL,
					},
					[combinedId + ".date"]: serverTimestamp(),
				});
			}
		} catch (err) {
			setErr(true);
			console.log("ERROR:", err);
		}
		setUser(null);
		setUsername("");
	};
	return (
		<div className="search">
			<div className="searchForm">
				<input
					type="text"
					onKeyDown={(e) => handleKey(e)}
					placeholder="Search..."
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			{err && <span>User not found!</span>}
			{user && (
				<div className="userChat" onClick={handleSelect}>
					<img src={user.photoURL} alt="userphoto" />
					<div className="userChatInfo">
						<span>{user.displayName}</span>
					</div>
				</div>
			)}
		</div>
	);
}

export default Search;
