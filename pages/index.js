import { useRouter } from "next/router"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import React from "react"
import Chat from "../components/Chat"
import Sidebar from "../components/Sidebar"
import Head from "next/head"

export default function Home() {
  const { currentUser } = useContext(AuthContext)
  const router = useRouter()

  if (!currentUser) {
    router.push("/login")
  } else {
    return (
      <div className="home">
        <Head>
          <title>Chatty Friends</title>
          <link
            rel="icon"
            href="./speech-bubbles-couple-of-smiling-circular-faces.png"
          />
        </Head>
        <div className="container">
          <Sidebar />
          <Chat />
        </div>
        <p className="credit">
          <a href="https://savcodes.dev">Sav Costabile</a>&nbsp;Ⓒ 2022
        </p>
      </div>
    )
  }
}
