'use client';

import { useState } from 'react';
import { Card, Button, Badge } from '@/components/UI';
import { Bell, X, Check, AlertCircle, Clock, Zap } from 'lucide-react';

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: 'workout',
    title: 'Workout Completed!',
    message: 'Great job completing Upper Body Strength! +50 XP earned.',
    timestamp: '2 hours ago',
    icon: '🏋️',
    read: false,
  },
  {
    id: 2,
    type: 'streak',
    title: '12-Day Streak!',
    message: 'Amazing! You\'ve maintained a 12-day workout streak. Keep it up!',
    timestamp: '1 day ago',
    icon: '🔥',
    read: false,
  },
  {
    id: 3,
    type: 'class',
    title: 'Class Available',
    message: 'Morning Bootcamp with Alex Johnson is now available. 18/20 spots filled.',
    timestamp: '2 days ago',
    icon: '📅',
    read: true,
  },
  {
    id: 4,
    type: 'trainer',
    title: 'Session Reminder',
    message: 'Your personal training session with Sarah Williams is in 2 hours.',
    timestamp: '3 days ago',
    icon: '👤',
    read: true,
  },
  {
    id: 5,
    type: 'achievement',
    title: 'New Achievement Unlocked',
    message: 'You\'ve unlocked the "Strong Start" achievement for completing 10 workouts!',
    timestamp: '1 week ago',
    icon: '🏆',
    read: true,
  },
  {
    id: 6,
    type: 'weekly',
    title: 'Weekly Digest',
    message: 'You completed 5 workouts this week and burned 2,840 calories. Great work!',
    timestamp: '1 week ago',
    icon: '📊',
    read: true,
  },
  {
    id: 7,
    type: 'friend',
    title: 'Friend Activity',
    message: 'Your friend Mike just completed Leg Day Supreme. Send encouragement!',
    timestamp: '1 week ago',
    icon: '🤝',
    read: true,
  },
  {
    id: 8,
    type: 'system',
    title: 'App Update Available',
    message: 'A new version of PSA is available with improved performance and features.',
    timestamp: '2 weeks ago',
    icon: '⚙️',
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filteredNotifications =
    filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleDeleteAll = () => {
    setNotifications([]);
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      workout: 'bg-blue-500/20 text-blue-400',
      streak: 'bg-orange-500/20 text-orange-400',
      class: 'bg-purple-500/20 text-purple-400',
      trainer: 'bg-green-500/20 text-green-400',
      achievement: 'bg-yellow-500/20 text-yellow-400',
      weekly: 'bg-cyan-500/20 text-cyan-400',
      friend: 'bg-pink-500/20 text-pink-400',
      system: 'bg-gray-500/20 text-gray-400',
    };
    return colors[type] || 'bg-[#6B8E23]/20 text-[#6B8E23]';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">
              Notifications<span className="text-[#6B8E23]">.</span>
            </h1>
            <p className="text-[#9CA3AF] text-lg">
              {unreadCount > 0 ? `${unreadCount} new notification` + (unreadCount !== 1 ? 's' : '') : 'All caught up!'}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="secondary" size="sm" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-colors font-medium ${
            filter === 'all'
              ? 'bg-[#6B8E23] text-white'
              : 'bg-[#1A1A1A] text-[#9CA3AF] border border-[#2A2A2A] hover:text-white'
          }`}
        >
          All Notifications
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg transition-colors font-medium ${
            filter === 'unread'
              ? 'bg-[#6B8E23] text-white'
              : 'bg-[#1A1A1A] text-[#9CA3AF] border border-[#2A2A2A] hover:text-white'
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length > 0 ? (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`flex items-start gap-4 ${
                !notification.read ? 'bg-[#6B8E23]/10 border-[#6B8E23]/50' : ''
              }`}
            >
              {/* Icon */}
              <div className={`text-2xl flex-shrink-0 rounded-lg w-10 h-10 flex items-center justify-center ${getTypeColor(notification.type)}`}>
                {notification.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className={`font-bold ${!notification.read ? 'text-white' : 'text-[#9CA3AF]'}`}>
                    {notification.title}
                  </h3>
                  {!notification.read && (
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#6B8E23]"></div>
                  )}
                </div>
                <p className="text-sm text-[#9CA3AF] mb-2">{notification.message}</p>
                <p className="text-xs text-[#4A5D23]">{notification.timestamp}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {!notification.read && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="p-2 hover:bg-[#2A2A2A] rounded transition-colors text-[#9CA3AF] hover:text-[#6B8E23]"
                    title="Mark as read"
                  >
                    <Check size={18} />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(notification.id)}
                  className="p-2 hover:bg-[#2A2A2A] rounded transition-colors text-[#9CA3AF] hover:text-red-400"
                  title="Delete"
                >
                  <X size={18} />
                </button>
              </div>
            </Card>
          ))}

          {/* Clear all button */}
          {filteredNotifications.length > 0 && (
            <div className="pt-4 border-t border-[#2A2A2A]">
              <button
                onClick={handleDeleteAll}
                className="text-sm text-[#9CA3AF] hover:text-red-400 transition-colors"
              >
                Clear all notifications
              </button>
            </div>
          )}
        </div>
      ) : (
        <Card className="text-center py-12">
          <Bell size={48} className="mx-auto mb-4 text-[#4A5D23]" />
          <h3 className="text-xl font-bold mb-2">No notifications</h3>
          <p className="text-[#9CA3AF]">
            {filter === 'unread'
              ? 'You\'re all caught up! Check back soon for updates.'
              : 'You haven\'t received any notifications yet.'}
          </p>
        </Card>
      )}

      {/* Notification Examples Info */}
      <Card className="mt-8 bg-[#6B8E23]/5 border-[#6B8E23]/30">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <AlertCircle size={20} className="text-[#6B8E23]" />
          Notification Types
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold text-white mb-1">🏋️ Workouts</p>
            <p className="text-[#9CA3AF]">Alerts when you complete workouts and new recommended routines</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-1">🔥 Streaks</p>
            <p className="text-[#9CA3AF]">Celebration alerts for maintaining workout streaks</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-1">📅 Classes</p>
            <p className="text-[#9CA3AF]">New class availability and booking confirmation</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-1">👤 Training</p>
            <p className="text-[#9CA3AF]">Session reminders and trainer messages</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-1">🏆 Achievements</p>
            <p className="text-[#9CA3AF]">Unlocked badges and milestone celebrations</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-1">📊 Weekly Digest</p>
            <p className="text-[#9CA3AF]">Summary of your weekly fitness performance</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
