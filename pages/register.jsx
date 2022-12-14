import React, { useState } from "react"
import { AiOutlineWechat } from "react-icons/ai"
import { BsImage } from "react-icons/bs"
import { auth, db, storage } from "../firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { doc, setDoc } from "firebase/firestore"
import { useRouter } from "next/router"
import Link from "next/link"
import Head from "next/head"

function Register() {
  const router = useRouter()

  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleSubmit = async e => {
    e.preventDefault()
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      setLoading(true)
      const date = new Date().getTime()
      const storageRef = ref(storage, `${displayName + date}`)

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async downloadURL => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            })
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            })

            await setDoc(doc(db, "userChats", res.user.uid), {})
            return router.push("/")
          } catch (err) {
            console.log(err)
            setErr(true)
            setLoading(false)
          }
        })
      })
    } catch (error) {
      setErr(true)
      console.log(error)
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
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Display Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="file" id="file" style={{ display: "none" }} />
          <label htmlFor="file" className="fileLabel">
            <BsImage size={40} />
            Add Profile Picture
          </label>
          <button disabled={loading}>Sign up</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          Already have an account?{" "}
          <Link
            href="/login"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Login
          </Link>
        </p>
      </div>
      <p className="credit">
        <a href="https://savcodes.dev">Sav Costabile</a>&nbsp;??? 2022
      </p>
    </div>
  )
}

export default Register
