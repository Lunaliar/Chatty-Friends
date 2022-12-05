import React, {useContext, useEffect, useState} from "react";
import {doc, onSnapshot} from "firebase/firestore";
import {AuthContext} from "../context/AuthContext";
import {ChatContext} from "../context/ChatContext";
import {db} from "../firebase";
import Image from "next/image";

const handleTime = (lastMessageDate) => {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	const messageDate = new Date(lastMessageDate?.seconds * 1000);
	const currentDate = new Date();
	const messageAge = Math.floor(
		(currentDate.getTime() - messageDate.getTime()) / (1000 * 3600 * 24)
	);

	function formatAMPM(date) {
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let ampm = hours >= 12 ? "pm" : "am";
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? "0" + minutes : minutes;
		const strTime = hours + ":" + minutes + " " + ampm;
		return strTime;
	}

	if (messageAge === 0) {
		return formatAMPM(messageDate);
	}
	if (messageAge > 0 && messageAge <= 7) {
		return days[messageDate.getDay()];
	}
	if (messageAge > 7 && messageAge <= 30) {
		return months[messageDate.getMonth()] + " " + messageDate.getDate();
	} else {
		return months[messageDate.getMonth()] + " " + messageDate.getFullYear();
	}
};

function Chats({handleOpen}) {
	const {currentUser} = useContext(AuthContext);
	const {dispatch} = useContext(ChatContext);
	const [chats, setChats] = useState([]);
	useEffect(() => {
		const getChats = () => {
			const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
				setChats(doc.data());
			});
			return () => {
				unsub();
			};
		};

		currentUser.uid && getChats();
	}, [currentUser.uid]);

	const handleSelect = (u) => {
		handleOpen();
		dispatch({type: "CHANGE_USER", payload: u});
	};
	return (
		<div className="chats">
			{Object.entries(chats)
				?.sort((a, b) => b[1].date - a[1].date)
				.map((chat) => {
					return (
						<div
							className="userChat"
							key={chat[0]}
							onClick={() => handleSelect(chat[1].userInfo)}
						>
							<Image
								width={50}
								height={50}
								src={chat[1].userInfo.photoURL}
								alt=""
							/>
							<div className="userChatInfo">
								<div className="infoTitle">
									<span>{chat[1].userInfo.displayName}</span>
									<p>{handleTime(chat[1].date)}</p>
								</div>
								<p>{chat[1].lastMessage?.text}</p>
							</div>
						</div>
					);
				})}
		</div>
	);
}

export default Chats;
