import React, {useContext} from "react";
import Input from "./Input";
import {ChatContext} from "../context/ChatContext";
import {
	AiFillVideoCamera,
	AiOutlineEllipsis,
	AiOutlineUserAdd,
} from "react-icons/ai";
import Messages from "./Messages";
import {AuthContext} from "../context/AuthContext";
function Chat() {
	const {currentUser} = useContext(AuthContext);
	const {data} = useContext(ChatContext);
	return (
		<div className="chat">
			<div className="chatInfo">
				<span>{data.user?.displayName}</span>
				<div className="chatIcons">
					{/* <AiFillVideoCamera />
					<AiOutlineUserAdd />
					<AiOutlineEllipsis /> */}
				</div>
			</div>
			{data.user && currentUser && <Messages />}
			<Input />
		</div>
	);
}

export default Chat;
