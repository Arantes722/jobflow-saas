"use client"

import { useEffect, useState, useMemo } from "react"
import { supabase } from "@/lib/supabase"
import { ApplicationForm } from "@/app/components/ApplicationForm"
import { ApplicationList } from "@/app/components/ApplicationList"
import { FilterBar } from "@/app/components/FilterBar"
import { DashboardHeader } from "@/app/components/DashboardHeader"

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
  const [isLoading, setIsLoading] = useState(true)

  // Filter state
  const [filters, setFilters] = useState({ status: "", company: "" })

  const handleFilterChange = (newFilters: { status?: string; company?: string }) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

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
      setIsLoading(true)
      const { data } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      setApplications(data || [])
      setIsLoading(false)
    }

    loadApps()
  }, [user])

  // Filter applications based on status and company
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesStatus = !filters.status || app.status === filters.status
      const matchesCompany =
        !filters.company || app.company.toLowerCase().includes(filters.company.toLowerCase())
      return matchesStatus && matchesCompany
    })
  }, [applications, filters])

  async function handleAddApplication(data: {
    company: string
    role: string
    jobUrl: string
    status: string
  }) {
    if (!user) return

    const { data: newApp, error } = await supabase
      .from("applications")
      .insert({
        user_id: user.id,
        company: data.company,
        role: data.role,
        job_url: data.jobUrl,
        status: data.status,
      })
      .select()

    if (error) {
      alert(error.message)
      return
    }

    if (newApp) {
      setApplications([newApp[0], ...applications])
    }
  }

  async function handleEditApplication(
    app: Application,
    data: {
      company: string
      role: string
      jobUrl: string
      status: string
    }
  ) {
    const { error } = await supabase
      .from("applications")
      .update({
        company: data.company,
        role: data.role,
        job_url: data.jobUrl,
        status: data.status,
      })
      .eq("id", app.id)

    if (error) {
      alert(error.message)
      return
    }

    setApplications(
      applications.map((a) =>
        a.id === app.id
          ? {
              ...a,
              company: data.company,
              role: data.role,
              job_url: data.jobUrl,
              status: data.status,
            }
          : a
      )
    )
  }

  async function handleDeleteApplication(id: string) {
    const { error } = await supabase
      .from("applications")
      .delete()
      .eq("id", id)

    if (error) {
      alert(error.message)
      return
    }

    setApplications(applications.filter((app) => app.id !== id))
  }

  const userName = user?.email?.split("@")[0] || "User"

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header with stats */}
        <DashboardHeader applications={applications} userName={userName} />

        {/* Create form */}
        <ApplicationForm onSubmit={handleAddApplication} />

        {/* Filters */}
        <FilterBar
          onFilterChange={handleFilterChange}
          statusOptions={["applied", "interview", "rejected", "offer"]}
        />

        {/* Applications list */}
        <ApplicationList
          applications={filteredApplications}
          onEdit={handleEditApplication}
          onDelete={handleDeleteApplication}
          isLoading={isLoading}
        />
      </div>
    </main>
  )
}