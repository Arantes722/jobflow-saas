"use client"

import { useState } from "react"

type Application = {
  id: string
  company: string
  role: string
  job_url: string
  status: string
}

type ApplicationCardProps = {
  app: Application
  onEdit: (app: Application, data: {
    company: string
    role: string
    jobUrl: string
    status: string
  }) => void
  onDelete: (id: string) => void
}

const STATUSES = ["applied", "interview", "rejected", "offer"]

const STATUS_COLORS: Record<string, string> = {
  applied: "bg-blue-100 text-blue-800",
  interview: "bg-yellow-100 text-yellow-800",
  rejected: "bg-red-100 text-red-800",
  offer: "bg-green-100 text-green-800",
}

export function ApplicationCard({ app, onEdit, onDelete }: ApplicationCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editCompany, setEditCompany] = useState(app.company)
  const [editRole, setEditRole] = useState(app.role)
  const [editJobUrl, setEditJobUrl] = useState(app.job_url)
  const [editStatus, setEditStatus] = useState(app.status)

  function handleSave() {
    onEdit(app, {
      company: editCompany,
      role: editRole,
      jobUrl: editJobUrl,
      status: editStatus,
    })
    setIsEditing(false)
  }

  function handleCancel() {
    setEditCompany(app.company)
    setEditRole(app.role)
    setEditJobUrl(app.job_url)
    setEditStatus(app.status)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 space-y-3">
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={editCompany}
          onChange={(e) => setEditCompany(e.target.value)}
        />

        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={editRole}
          onChange={(e) => setEditRole(e.target.value)}
        />

        <input
          type="url"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={editJobUrl}
          onChange={(e) => setEditJobUrl(e.target.value)}
        />

        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={editStatus}
          onChange={(e) => setEditStatus(e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        <div className="flex gap-2 pt-2">
          <button
            className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-green-700 transition"
            onClick={handleSave}
          >
            Salvar
          </button>
          <button
            className="flex-1 bg-gray-400 text-white px-3 py-2 rounded-lg font-medium hover:bg-gray-500 transition"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg">{app.company}</h3>
          <p className="text-gray-600 text-sm">{app.role}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[app.status]}`}>
          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
        </span>
      </div>

      <a
        href={app.job_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 text-sm hover:underline mb-3 inline-block"
      >
        Ver vaga →
      </a>

      <div className="flex gap-2 pt-2">
        <button
          className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          onClick={() => setIsEditing(true)}
        >
          Editar
        </button>
        <button
          className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition"
          onClick={() => {
            if (confirm("Tem certeza?")) {
              onDelete(app.id)
            }
          }}
        >
          Deletar
        </button>
      </div>
    </div>
  )
}
