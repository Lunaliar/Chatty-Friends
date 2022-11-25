import React, {useContext, useEffect, useRef} from "react";
import {ChatContext} from "../context/ChatContext";
import {AuthContext} from "../context/AuthContext";

function Message({message}) {
	const {currentUser} = useContext(AuthContext);
	const {data} = useContext(ChatContext);
	const ref = useRef();

	useEffect(() => {
		ref.current?.scrollIntoView({behavior: "smooth"});
	}, [message]);

	const handleTime = (newDate) => {
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
		const messageDate = new Date(newDate.date.seconds * 1000);
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
	const messageTime = handleTime(message);
	return (
		<div
			className={`message ${message.senderId === currentUser.uid && "owner"}`}
			ref={ref}
		>
			<div
				className={`messageInfo ${
					message.senderId === currentUser.uid && "owner"
				}`}
			>
				<img
					src={
						message.senderId === currentUser.uid
							? currentUser.photoURL
							: data.user.photoURL
					}
					alt="profilepic"
				/>
				<span>{messageTime}</span>
			</div>
			<div className="messageContent">
				<p>{message.text}</p>
				{message.img && <img src={message.img} alt="message img" />}
			</div>
		</div>
	);
}

export default Message;
