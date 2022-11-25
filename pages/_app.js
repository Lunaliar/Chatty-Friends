import {useContext} from "react";
import {AuthContext, AuthContextProvider} from "../context/AuthContext";
import {ChatContextProvider} from "../context/ChatContext";
import "../styles/globals.scss";

function MyApp({Component, pageProps}) {
	return (
		<AuthContextProvider>
			<ChatContextProvider>
				<Component {...pageProps} />
			</ChatContextProvider>
		</AuthContextProvider>
	);
}

export default MyApp;
