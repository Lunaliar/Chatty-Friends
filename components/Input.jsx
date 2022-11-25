import React, {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {ChatContext} from "../context/ChatContext";
import {v4 as uuidv4} from "uuid";
import {
	arrayUnion,
	doc,
	serverTimestamp,
	Timestamp,
	updateDoc,
} from "firebase/firestore";
import {db, storage} from "../firebase";
import {
	getDownload,
	getDownloadURL,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import {AiOutlinePaperClip, AiOutlineSend} from "react-icons/ai";
function Input() {
	const [text, setText] = useState("");
	const [img, setImg] = useState(null);

	const {currentUser} = useContext(AuthContext);
	const {data} = useContext(ChatContext);

	const handleSend = async () => {
		if (img) {
			const storageRef = ref(storage, uuidv4());
			await uploadBytesResumable(storageRef, img);
			await getDownloadURL(storageRef).then(async (downloadURL) => {
				try {
					await updateDoc(doc(db, "chats", data.chatId), {
						messages: arrayUnion({
							id: uuidv4(),
							text,
							senderId: currentUser.uid,
							date: Timestamp.now(),
							img: downloadURL,
						}),
					});
				} catch (err) {
					console.log(err);
				}
			});
		} else {
			await updateDoc(doc(db, "chats", data.chatId), {
				messages: arrayUnion({
					id: uuidv4(),
					text,
					senderId: currentUser.uid,
					date: Timestamp.now(),
				}),
			});
		}
		await updateDoc(doc(db, "userChats", currentUser.uid), {
			[data.chatId + ".lastMessage"]: {text},
			[data.chatId + ".date"]: serverTimestamp(),
		});
		await updateDoc(doc(db, "userChats", data.user.uid), {
			[data.chatId + ".lastMessage"]: {text},
			[data.chatId + ".date"]: serverTimestamp(),
		});
		setText("");
		setImg(null);
	};

	const handleKey = (e) => {
		e.code === "Enter" && handleSend();
	};
	return (
		<div className="input">
			<input
				type="text"
				placeholder="Type Something..."
				onChange={(e) => setText(e.target.value)}
				onKeyDown={handleKey}
				value={text}
			/>
			<div className="send">
				<input
					type="file"
					id="file"
					style={{display: "none"}}
					onChange={(e) => setImg(e.target.files[0])}
				/>
				<label htmlFor="file">
					<AiOutlinePaperClip className="img" />
				</label>

				<AiOutlineSend className="button" onClick={handleSend} />
			</div>
		</div>
	);
}

export default Input;
