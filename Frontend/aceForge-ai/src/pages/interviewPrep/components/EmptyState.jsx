import { Plus } from 'lucide-react'

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 px-4 border border-gray-700/40 rounded-xl bg-transparent">
    <Plus size={32} className="text-gray-400 mb-4" />
    <h2 className="text-xl font-semibold text-gray-100 mb-1">No AceForge AI Sessions</h2>
    <p className="text-gray-400 text-sm mb-1 text-center max-w-xs">
      You haven't created any AceForge AI sessions yet.
    </p>
    <p className="text-gray-600 text-xs text-center">
      Click the <span className="text-amber-400 font-semibold">Add New</span> button below to get started.
    </p>
  </div>
)

export default EmptyState
