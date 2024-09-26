"use client"

import { useState } from "react"
import { account, ID } from "../../appwrite"
import { Models } from "appwrite"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/Auth"

const LoginPage: React.FC = () => {
  const {login, createAccount} = useAuthStore()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [name, setName] = useState<string>("")

  const register = async () => {
    createAccount(email, password, name)
    login(email, password)
  }

  return (
    <div className="flex flex-row min-h-screen justify-center items-center">
      <div className="w-2/5 border-2 solid rounded-lg p-4">
        <p>SignUp</p>
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
          <div className="flex gap-2 justify-centre p-2">
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
