import React from 'react'

// Utility: Get initials from a role name
const getInitials = (role = '') =>
  role
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)

// Utility: Generate color class based on role hash
const getColorClass = (role = '') => {
  const colors = ['yellow', 'green', 'blue', 'amber', 'cyan', 'violet', 'purple', 'indigo', 'orange']
  const sum = role.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[sum % colors.length]
}

// Utility: Format date to "12th May 2025"
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const suffix = ['th', 'st', 'nd', 'rd'][day % 10 > 3 || ~~((day % 100) / 10) === 1 ? 0 : day % 10]
  const month = date.toLocaleString('default', { month: 'short' })
  const year = date.getFullYear()
  return `${day}${suffix} ${month} ${year}`
}

const RoleCard = ({ session, onClick }) => {
  const role = session.role || 'Interview'
  const initials = getInitials(role)
  const colorClass = getColorClass(role)
  const questionsCount = session.questions?.length || 0

  return (
    <div
      onClick={onClick}
      className="bg-gray-900 rounded-xl border border-gray-800 shadow-md hover:shadow-amber-900/10 hover:border-amber-900/30 transition-all cursor-pointer p-5 flex flex-col justify-between h-full"
    >
      <div className="flex items-center gap-4 mb-3">
        <div
          className={`h-12 w-12 rounded-lg bg-${colorClass}-900/30 text-${colorClass}-400 font-bold flex items-center justify-center`}
        >
          {initials}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{role}</h3>
          <p className="text-sm text-gray-400">{session.topicToFocus || 'General topics'}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 text-xs text-gray-300">
        <span className="bg-gray-800 px-3 py-1 rounded-full">
          Experience: {session.experience || 'N/A'} Years
        </span>
        <span className="bg-gray-800 px-3 py-1 rounded-full">{questionsCount} Q&A</span>
        <span className="bg-gray-800 px-3 py-1 rounded-full">
          Updated: {formatDate(session.updatedAt)}
        </span>
      </div>

      <p className="text-sm text-gray-400 line-clamp-3">
        {session.description || 'No description provided.'}
      </p>
    </div>
  )
}

export default RoleCard
