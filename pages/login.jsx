import { signInWithEmailAndPassword } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { AiOutlineWechat } from "react-icons/ai"
import { auth } from "../firebase"
import Head from "next/head"
function Login() {
  const router = useRouter()
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const email = e.target[0].value
    const password = e.target[1].value
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return router.push("/")
    } catch (err) {
      setErr(true)
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <div className="formContainer">
      <Head>
        <title>Chatty Friends</title>
        <link
          rel="icon"
          href="./speech-bubbles-couple-of-smiling-circular-faces.png"
        />
      </Head>
      <div className="formWrapper">
        <span className="logo">
          Chatty
          <AiOutlineWechat size={60} />
          Friends
        </span>
        <span className="title">Log in</span>
        <form onSubmit={e => handleSubmit(e)}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button disabled={loading}>Log in</button>
        </form>
        {err && <span>Something went wrong..</span>}
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Register
          </Link>
        </p>
      </div>
      <p className="credit">
        <a href="https://savcodes.dev">Sav Costabile</a>&nbsp;Ⓒ 2022
      </p>
    </div>
  )
}

export default Login
