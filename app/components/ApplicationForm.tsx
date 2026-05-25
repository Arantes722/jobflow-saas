"use client"

import { useState } from "react"

type ApplicationFormProps = {
  onSubmit: (data: {
    company: string
    role: string
    jobUrl: string
    status: string
  }) => void
  isLoading?: boolean
}

const STATUSES = ["applied", "interview", "rejected", "offer"]

export function ApplicationForm({ onSubmit, isLoading = false }: ApplicationFormProps) {
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [jobUrl, setJobUrl] = useState("")
  const [status, setStatus] = useState("applied")

  function handleSubmit() {
    if (!company || !role || !jobUrl) {
      alert("Preencha todos os campos")
      return
    }

    onSubmit({
      company,
      role,
      jobUrl,
      status,
    })

    setCompany("")
    setRole("")
    setJobUrl("")
    setStatus("applied")
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Nova Candidatura</h2>

      <div className="space-y-3">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nome da empresa"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Cargo/Posição"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <input
          type="url"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Link da vaga"
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
        />

        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        <button
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Adicionar Candidatura
        </button>
      </div>
    </div>
  )
}
