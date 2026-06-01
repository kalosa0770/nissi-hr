import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { 
  Bell, ShieldAlert, UserCheck, Clock, Trash2, Loader2, X,
  AlertTriangle, Info, CalendarDays, CalendarRange, UserPlus
} from 'lucide-react';

const NotificationRow = ({ notification, onOpen, onDelete, isProcessing }) => {
  const { _id, type, title, message, createdAt, read, priority } = notification;

  const timeFormatted = new Date(createdAt).toLocaleTimeString('en-GB', {
    hour: '2-digit', minute: '2-digit'
  });

  const getIconConfig = () => {
    switch (type) {
      case 'Statutory':
        return { Icon: ShieldAlert, color: 'text-orange-400 bg-orange-500/5 border-orange-500/10' };
      case 'Audit':
        return { Icon: UserCheck, color: 'text-blue-400 bg-blue-500/5 border-blue-500/10' };
      case 'System':
        return { Icon: AlertTriangle, color: 'text-rose-400 bg-rose-500/5 border-rose-500/10' };
      case 'Employee Registration':
        return { Icon: UserPlus, color: 'text-emerald-400 bg-emerald-500/5 border-emerald-500/10' };
      default:
        return { Icon: Info, color: 'text-slate-400 bg-slate-500/5 border-slate-500/10' };
    }
  };

  const config = getIconConfig();

  return (
    <div 
      onClick={() => !isProcessing && onOpen(notification)}
      className={`group border-b border-slate-900/40 p-5 flex items-start justify-between gap-4 transition-all duration-300 relative rounded-2xl ${
        read 
          ? 'bg-transparent opacity-30 select-none' 
          : 'bg-slate-900/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.01)] hover:bg-slate-900/20 cursor-pointer'
      }`}
    >
      {!read && (
        <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 rounded-r-full ${
          priority === 'high' ? 'bg-rose-500' : priority === 'medium' ? 'bg-orange-500' : 'bg-blue-500'
        }`} />
      )}

      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${config.color}`}>
          <config.Icon size={16} />
        </div>

        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className={`text-sm font-bold tracking-wide font-litera transition-colors ${!read ? 'text-white' : 'text-slate-400'}`}>
              {title}
            </h4>
            {!read && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />}
          </div>
          <p className="text-xs text-slate-400 font-poppins leading-relaxed max-w-2xl">{message}</p>
          
          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono pt-1">
            <Clock size={10} />
            <span>{timeFormatted}</span>
            <span>•</span>
            <span className="uppercase tracking-widest font-black">{type}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
        {read && (
          <span className="text-[10px] text-slate-600 font-mono uppercase font-bold tracking-wider px-2 py-1">
            Read
          </span>
        )}
        <button 
          type="button"
          onClick={(e) => { e.stopPropagation(); !isProcessing && onDelete(_id); }}
          disabled={isProcessing}
          className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-900 transition-all border border-transparent hover:border-slate-800"
          title="Delete Notification"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

const NotificationModal = ({ notification, onClose }) => {
  const { type, title, message, createdAt, priority } = notification;

  const dateFormatted = new Date(createdAt).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const getIconConfig = () => {
    switch (type) {
      case 'Statutory':
        return { Icon: ShieldAlert, color: 'text-orange-400 bg-orange-500/5 border-orange-500/10' };
      case 'Audit':
        return { Icon: UserCheck, color: 'text-blue-400 bg-blue-500/5 border-blue-500/10' };
      case 'System':
        return { Icon: AlertTriangle, color: 'text-rose-400 bg-rose-500/5 border-rose-500/10' };
      case 'Employee Registration':
        return { Icon: UserPlus, color: 'text-emerald-400 bg-emerald-500/5 border-emerald-500/10' };
      default:
        return { Icon: Info, color: 'text-slate-400 bg-slate-500/5 border-slate-500/10' };
    }
  };

  const config = getIconConfig();
  const priorityColor = priority === 'high' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : priority === 'medium' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-slate-950 border-b border-slate-900 p-6 flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${config.color}`}>
              <config.Icon size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-black text-white font-litera">{title}</h3>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className={`text-[10px] font-mono font-black px-2 py-1 rounded-md border ${priorityColor}`}>
                  {priority.toUpperCase()} PRIORITY
                </span>
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                  {type}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-900 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="prose prose-invert max-w-none">
            <p className="text-sm text-slate-300 leading-relaxed font-poppins">{message}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/40 border border-slate-900 rounded-lg p-4">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-black mb-1">Type</p>
              <p className="text-sm font-bold text-white">{type}</p>
            </div>
            <div className="bg-slate-900/40 border border-slate-900 rounded-lg p-4">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-black mb-1">Priority</p>
              <p className="text-sm font-bold text-white capitalize">{priority}</p>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-900 rounded-lg p-4">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-black mb-1">Received</p>
            <p className="text-sm font-mono text-slate-300">{dateFormatted}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-950 border-t border-slate-900 p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const NotificationContent = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [timeGrouping, setTimeGrouping] = useState('day'); 
  const [processingIds, setProcessingIds] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const filters = ['All', 'Statutory', 'Audit', 'System', 'Employee Registration'];

  const fetchNotificationLogs = async (selectedMonthOrDate) => {
    try {
      setLoading(true);
      const response = await api.get(`/api/notifications`, { params: selectedMonthOrDate });
      setNotifications(response.data || []);
    } catch (err) {
      console.error("Critical error syncing dynamic notification stream context:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotificationLogs();
  }, []);

  // =========================================================
// MUTATION: Mark single tracking reference node as read
// =========================================================
const handleMarkAsRead = async (id) => {
  // Directly check against the functional state snapshot to block rapid double-clicks
  let alreadyProcessing = false;
  setProcessingIds(prev => {
    if (prev.includes(id)) {
      alreadyProcessing = true;
      return prev;
    }
    return [...prev, id];
  });

  if (alreadyProcessing) return;

  try {
    // 1. Fire network request first
    await api.patch(`/api/notifications/${id}/read`);
    
    // 2. On success, mutate local tracking nodes cleanly
    setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
  } catch (err) {
    console.error("Failed executing structural state mutation:", err);
  } finally {
    setProcessingIds(prev => prev.filter(x => x !== id));
  }
};

// =========================================================
// ACTION: Open Modal & Flag Read Registry State
// =========================================================
const handleOpenNotification = async (notification) => {
  setSelectedNotification(notification);
  
  // If it's unread and not currently tracking an active request, update it
  if (!notification.read && !processingIds.includes(notification._id)) {
    await handleMarkAsRead(notification._id);
  }
};
  const handleDelete = async (id) => {
    if (processingIds.includes(id)) return;
    setProcessingIds(prev => [...prev, id]);
    try {
      await api.delete(`/api/notifications/${id}`);
      setNotifications(prev => prev.filter(n => n._id !== id));
    } catch (err) {
      console.error("Failed executing deletion processing lifecycle:", err);
    } finally {
      setProcessingIds(prev => prev.filter(x => x !== id));
    }
  };

  const handleClearAllRead = async () => {
    setNotifications(prev => prev.filter(n => !n.read));
    try {
      await api.post('/api/notifications/clear-read');
    } catch (err) {
      console.error("Batch aggregation deletion loop exception caught:", err);
      fetchNotificationLogs();
    }
  };

  const handleCloseNotification = () => {
    setSelectedNotification(null);
  };

  const filteredLogs = notifications.filter(n => activeFilter === 'All' || n.type === activeFilter);
  const unreadCount = notifications.filter(n => !n.read).length;

  const groupNotifications = (logs) => {
    return logs.reduce((groups, log) => {
      const dateObj = new Date(log.createdAt);
      const groupKey = timeGrouping === 'day' 
        ? dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
        : dateObj.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(log);
      return groups;
    }, {});
  };

  const groupedLogs = groupNotifications(filteredLogs);

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-10">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <p className="text-slate-400 font-medium font-litera text-sm">Unread Notifications</p>
            {unreadCount > 0 && (
              <span className="text-[10px] font-black bg-blue-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-mono animate-pulse">
                {unreadCount}
              </span>
            )}
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight font-agenda mt-1">Notifications Hub</h2>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="bg-slate-950 border border-slate-900 rounded-xl p-1 flex items-center">
            <button
              onClick={() => setTimeGrouping('day')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                timeGrouping === 'day' ? 'bg-slate-900 text-white border border-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <CalendarDays size={14} /> By Day
            </button>
            <button
              onClick={() => setTimeGrouping('month')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                timeGrouping === 'month' ? 'bg-slate-900 text-white border border-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <CalendarRange size={14} /> By Month
            </button>
          </div>

          {notifications.some(n => n.read) && (
            <button 
              onClick={handleClearAllRead}
              className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-rose-400 transition-colors border border-slate-900 px-4 py-2.5 rounded-xl hover:border-rose-500/10 bg-slate-950"
            >
              Delete All Read
            </button>
          )}
        </div>
      </header>

      <div className="flex overflow-x-auto gap-2 pb-2 border-b border-slate-900 scrollbar-none">
        {filters.map((filter) => {
          const count = filter === 'All' ? notifications.length : notifications.filter(n => n.type === filter).length;
          const isActive = activeFilter === filter;
          
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border whitespace-nowrap flex items-center gap-2 ${
                isActive ? 'bg-blue-600 border-blue-500 text-white shadow-xl/10' : 'bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300'
              }`}
            >
              <span>{filter}</span>
              <span className={`text-[9px] font-mono font-black px-1.5 py-0.5 rounded-md ${isActive ? 'bg-blue-700 text-white' : 'bg-slate-900 text-slate-600'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <section className="space-y-8">
        {loading ? (
          <div className="bg-slate-950/40 rounded-[2.5rem] border border-slate-900/60 py-24 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="animate-spin text-blue-500" size={32} />
            <p className="text-xs uppercase tracking-widest font-black font-litera">Compiling Live Core Collections Feed...</p>
          </div>
        ) : Object.keys(groupedLogs).length === 0 ? (
          <div className="bg-slate-950/40 rounded-[2.5rem] border border-slate-900/60 py-20 text-center space-y-3">
            <div className="w-12 h-12 rounded-full border border-slate-900 flex items-center justify-center mx-auto text-slate-700">
              <Bell size={18} />
            </div>
            <p className="text-sm font-bold text-slate-500 font-poppins">
              Terminal stable. No system changes detected under "{activeFilter}".
            </p>
          </div>
        ) : (
          Object.entries(groupedLogs).map(([timeLabel, logsInGroup]) => (
            <div key={timeLabel} className="space-y-4">
              <div className="flex items-center gap-4 px-4">
                <span className="text-xs font-black text-blue-400 font-mono tracking-widest uppercase bg-blue-500/5 border border-blue-500/10 px-3 py-1 rounded-lg">
                  {timeLabel}
                </span>
                <div className="h-px bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent flex-1" />
              </div>

              <div className="bg-slate-950/30 rounded-[2rem] border border-slate-900/50 p-2 shadow-xl backdrop-blur-md divide-y divide-slate-900/30">
                {logsInGroup.map((notification) => (
                  <NotificationRow 
                    key={notification._id} 
                    notification={notification} 
                    onOpen={handleOpenNotification} 
                    onDelete={handleDelete}
                    isProcessing={processingIds.includes(notification._id)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {selectedNotification && (
        <NotificationModal 
          notification={selectedNotification} 
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
};

export default NotificationContent;