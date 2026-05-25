"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Application = {
  id: string
  company: string
  role: string
  job_url: string
  status: string
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [applications, setApplications] = useState<Application[]>([])

  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [jobUrl, setJobUrl] = useState("")

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    loadUser()
  }, [])

  useEffect(() => {
    if (!user) return

    const loadApps = async () => {
      const { data } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      setApplications(data || [])
    }

    loadApps()
  }, [user])

  async function addApplication() {
    if (!user) return

    const { data, error } = await supabase
      .from("applications")
      .insert({
        user_id: user.id,
        company,
        role,
        job_url: jobUrl,
        status: "applied",
      })
      .select()

    if (error) {
      alert(error.message)
      return
    }

    if (data) {
      setApplications([data[0], ...applications])
    }

    setCompany("")
    setRole("")
    setJobUrl("")
  }

  return (
    <main className="p-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Dashboard
      </h1>

      {/* FORM */}
      <div className="flex flex-col gap-2 mb-10">
        <input
          className="border p-2"
          placeholder="Empresa"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Cargo"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Link da vaga"
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
        />

        <button
          className="bg-black text-white p-2"
          onClick={addApplication}
        >
          Adicionar candidatura
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {applications.map((app) => (
          <div key={app.id} className="border p-3">
            <h3 className="font-bold">{app.company}</h3>
            <p>{app.role}</p>
            <p className="text-sm text-gray-500">
              {app.status}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}