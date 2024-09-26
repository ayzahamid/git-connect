"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/Auth"


const LoginPage: React.FC = () => {
  const {login} = useAuthStore()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

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
          <div className="flex gap-2 justify-centre p-2">
            <Button type="button" onClick={() => login(email, password)}>
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
