import React, {useState, useContext} from "react";
import {AiOutlineWechat} from "react-icons/ai";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
import {useRouter} from "next/router";
import {AuthContext} from "../context/AuthContext";
import Link from "next/link";
function login() {
	const router = useRouter();
	const {currentUser} = useContext(AuthContext);
	const [err, setErr] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e) => {
		console.log("we submittin");
		e.preventDefault();
		setLoading(true);
		const email = e.target[0].value;
		const password = e.target[1].value;
		try {
			signInWithEmailAndPassword(auth, email, password).then(() => {
				console.log(currentUser);
				router.push("/home");
			});
		} catch (err) {
			setErr(true);
			console.log(err);
			setLoading(false);
		}
	};

	return (
		<div className="formContainer">
			<div className="formWrapper">
				<span className="logo">
					Chatty
					<AiOutlineWechat size={60} />
					Friends
				</span>
				<span className="title">Log in</span>
				<form onSubmit={(e) => handleSubmit(e)}>
					<input type="email" placeholder="Email" />
					<input type="password" placeholder="Password" />
					<button disabled={loading}>Log in</button>
				</form>
				{err && <span>Something went wrong..</span>}
				<p>
					Don't have an account?{" "}
					<Link
						href="/register"
						style={{color: "blue", textDecoration: "underline"}}
					>
						Register
					</Link>
				</p>
			</div>
		</div>
	);
}

export default login;
