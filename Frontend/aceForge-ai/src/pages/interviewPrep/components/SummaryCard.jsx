import { FaUserTie, FaRegCalendarAlt, FaQuestionCircle, FaClock, FaTrash } from 'react-icons/fa';

const SummaryCard = ({ session, onClick, onDelete }) => {
  const {
    role = 'Interview',
    experience = 'Not specified',
    topicTofocus = 'General',
    description = 'Interview preparation session',
    questions = [],
    createdAt = new Date(),
    updatedAt = new Date(),
    title = '',
    date = new Date()
  } = session || {};

  const displayTitle = title || role;
  const displayDate = date || updatedAt || createdAt;

  // Safe date formatting
  const formatDate = (dateValue) => {
    try {
      const date = new Date(dateValue);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      });
    } catch (error) {
      return 'error';
    }
  };

  const handleClick = () => {
    if (onClick && session?._id) {
      onClick(session._id);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevents the main card click
    if (onDelete && session?._id) {
      onDelete(session._id);
    }
  };

  return (
    <div
      className="relative group cursor-pointer transition-all text-white duration-200 hover:shadow-lg border border-gray-700 rounded-2xl p-5 shadow flex flex-col gap-4 min-h-[220px] bg-transparent"
      onClick={handleClick}
    >
      {/* Delete Icon */}
      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-label="Delete session"
      >
        <FaTrash />
      </button>

      {/* Card Content */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br  from-yellow-300 to-pink-300 text-white font-bold text-xl flex items-center justify-center shadow">
          {displayTitle?.charAt(0)?.toUpperCase() || 'I'}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-white truncate leading-tight">
            {displayTitle}
          </h2>
          <p className="text-sm text-gray-500 font-medium mt-1">
            {topicTofocus}
          </p>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="flex-1">
          <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs font-medium border border-gray-200">
          <FaUserTie className="text-yellow-500 text-xs" />
          {experience}
        </span>
        <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs font-medium border border-gray-200">
          <FaQuestionCircle className="text-pink-400 text-xs" />
          {questions?.length || 0} Q&A
        </span>
      </div>

      {/* Dates */}
      <div className="space-y-1 pt-2 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <FaClock className="text-yellow-400 text-xs" />
          <span>Updated: {formatDate(displayDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <FaRegCalendarAlt className="text-gray-400 text-xs" />
          <span>Created: {formatDate(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;