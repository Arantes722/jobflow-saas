"use client"

import { ApplicationCard } from "./ApplicationCard"

type Application = {
  id: string
  company: string
  role: string
  job_url: string
  status: string
}

type ApplicationListProps = {
  applications: Application[]
  onEdit: (app: Application, data: {
    company: string
    role: string
    jobUrl: string
    status: string
  }) => void
  onDelete: (id: string) => void
  isLoading?: boolean
}

export function ApplicationList({
  applications,
  onEdit,
  onDelete,
  isLoading = false,
}: ApplicationListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-gray-500">Carregando...</p>
      </div>
    )
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Nenhuma candidatura encontrada.</p>
        <p className="text-gray-400 text-sm">Comece por adicionar uma nova candidatura!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500 mb-4">
        {applications.length} candidatura{applications.length !== 1 ? "s" : ""}
      </p>
      {applications.map((app) => (
        <ApplicationCard
          key={app.id}
          app={app}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
