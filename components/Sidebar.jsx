import React, {useState} from "react";
import Chats from "./Chats";
import Navbar from "./Navbar";
import Search from "./Search";
import {TbLayoutSidebarLeftCollapse} from "react-icons/tb";
function Sidebar() {
	const [open, setOpen] = useState(true);
	const handleOpen = () => {
		setOpen((prevOpen) => !prevOpen);
	};
	return (
		<div>
			{open ? (
				<div className="sidebar">
					<Navbar />
					<Search />
					<Chats handleOpen={handleOpen} />
				</div>
			) : (
				<div className="sidetoggle">
					<TbLayoutSidebarLeftCollapse size={30} onClick={handleOpen} />
				</div>
			)}
		</div>
	);
}

export default Sidebar;
