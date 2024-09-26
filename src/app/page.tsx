"use client"

import { useState } from "react"
import { account, ID } from "./appwrite"
import { Models } from "appwrite"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const LoginPage: React.FC = () => {
  const [loggedInUser, setLoggedInUser] =
    useState<Models.User<Models.Preferences> | null>(null)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [name, setName] = useState<string>("")

  const login = async (email: string, password: string) => {
    console.log("Check", process.env.NEXT_PUBLIC_APP_WRITE_ENDPOINT)
    await account.createEmailPasswordSession(email, password)
    const user = await account.get()
    setLoggedInUser(user)
  }

  const register = async () => {
    await account.create(ID.unique(), email, password, name)
    login(email, password)
  }

  const logout = async () => {
    await account.deleteSession("current")
    setLoggedInUser(null)
  }

  if (loggedInUser) {
    return (
      <div>
        <p>Logged in as {loggedInUser.name}</p>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-row min-h-screen justify-center items-center">
      <div className="w-2/5 border-2 solid rounded-lg p-4">
        <p>SignIn/SignUp</p>
        <form className="flex flex-col space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex gap-2 justify-end p-2">
            <Button type="button" onClick={() => login(email, password)}>
              Login
            </Button>
            <Button type="button" onClick={register}>
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
