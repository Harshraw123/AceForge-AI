import { Plus } from 'lucide-react'

const FloatingActionButton = ({ onClick }) => (
  <div className="fixed bottom-8 right-8 z-50">
    <button
      onClick={onClick}
      className=" bg-gradient-to-r from-yellow-400 to-pink-400 text-black font-medium px-5 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105"
    >
      <Plus size={20} />
      Add New
    </button>
  </div>
)

export default FloatingActionButton
