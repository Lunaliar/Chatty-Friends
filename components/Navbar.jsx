import React, {useContext} from "react";
import {AiOutlineWechat} from "react-icons/ai";
import {auth} from "../firebase";
import {signOut} from "firebase/auth";
import {useRouter} from "next/router";
import {BiLogOut} from "react-icons/bi";
import {AuthContext} from "../context/AuthContext";
function Navbar() {
	const router = useRouter();
	const {currentUser} = useContext(AuthContext);
	const handleClick = () => {
		router.push("/login").then(() => {
			signOut(auth);
		});
	};
	return (
		<div className="navbar">
			<span className="logo">
				<AiOutlineWechat size={30} />
			</span>
			<div className="user">
				<img src={currentUser?.photoURL} alt="/" />
				<span>{currentUser?.displayName}</span>
				<BiLogOut
					onClick={handleClick}
					title="logout"
					className="logout"
					size={30}
				/>
			</div>
		</div>
	);
}

export default Navbar;
