"use client"

type Application = {
  id: string
  company: string
  role: string
  job_url: string
  status: string
}

type DashboardHeaderProps = {
  applications: Application[]
  userName?: string
}

export function DashboardHeader({ applications, userName = "User" }: DashboardHeaderProps) {
  const stats = {
    total: applications.length,
    applied: applications.filter((a) => a.status === "applied").length,
    interview: applications.filter((a) => a.status === "interview").length,
    offer: applications.filter((a) => a.status === "offer").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  }

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Applytic</h1>
      <p className="text-gray-600 mb-6">Bem-vindo, {userName}</p>

      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <p className="text-gray-600 text-sm font-medium">Total</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <p className="text-gray-600 text-sm font-medium">Candidaturas</p>
          <p className="text-2xl font-bold text-blue-600">{stats.applied}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <p className="text-gray-600 text-sm font-medium">Entrevistas</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.interview}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <p className="text-gray-600 text-sm font-medium">Ofertas</p>
          <p className="text-2xl font-bold text-green-600">{stats.offer}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <p className="text-gray-600 text-sm font-medium">Rejeitadas</p>
          <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
        </div>
      </div>
    </div>
  )
}
