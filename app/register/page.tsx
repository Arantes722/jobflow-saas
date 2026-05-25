"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleRegister() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Conta criada! Confirma o email se necessário.")
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-3 w-80">
        <h1 className="text-xl font-bold">Register</h1>

        <input
          className="border p-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-black text-white p-2" onClick={handleRegister}>
          Create account
        </button>
      </div>
    </main>
  )
}