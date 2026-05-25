"use client"

type FilterBarProps = {
  onFilterChange: (filters: { status?: string; company?: string }) => void
  statusOptions: string[]
}

export function FilterBar({ onFilterChange, statusOptions }: FilterBarProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Filtros</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => onFilterChange({ status: e.target.value })}
          >
            <option value="">Todos os status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Empresa
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Pesquisar empresa..."
            onChange={(e) => onFilterChange({ company: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}
