import React, {createContext, useContext} from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import {AuthContext} from "../context/AuthContext";
import {useRouter} from "next/router";
function home() {
	const router = useRouter();
	const {currentUser} = useContext(AuthContext);
	if (!currentUser) {
		router.push("/login");
	} else {
		return (
			<div className="home">
				<div className="container">
					<Sidebar />
					<Chat />
				</div>
			</div>
		);
	}
}

export default home;
