import {useRouter} from "next/router";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import React from "react";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

export default function Home() {
	const {currentUser} = useContext(AuthContext);
	const router = useRouter();

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
