'use client';

import { useState } from 'react';
import { Card, Button, Badge } from '@/components/UI';
import { User, Mail, Phone, MapPin, Trophy, Settings, Zap, Bell, LogOut } from 'lucide-react';

// Mock user data
const userProfile = {
  name: 'Jordan Hayes',
  email: 'jordan.hayes@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  joinDate: 'January 2024',
  avatar: '👤',
  stats: {
    totalWorkouts: 127,
    currentStreak: 12,
    achievements: 8,
    level: 'Gold Member',
  },
};

const preferences = {
  notifications: {
    workoutReminders: true,
    classAvailable: true,
    friendActivity: false,
    weeklyDigest: true,
  },
  fitnessGoals: ['Muscle Gain', 'Increase Strength', 'Improve Endurance'],
  equipment: ['Dumbbells', 'Barbell', 'Pull-up Bar', 'Cardio'],
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState(preferences.notifications);

  const handleToggleNotification = (key: keyof typeof preferences.notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tight mb-2">
          Profile<span className="text-[#6B8E23]">.</span>
        </h1>
        <p className="text-[#9CA3AF] text-lg">Manage your account and preferences</p>
      </div>

      {/* Profile Card */}
      <Card className="mb-8 bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F]">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-6">
            <div className="text-7xl">{userProfile.avatar}</div>
            <div>
              <h2 className="text-3xl font-bold mb-2">{userProfile.name}</h2>
              <Badge variant="primary">{userProfile.stats.level}</Badge>
              <p className="text-[#9CA3AF] text-sm mt-2">
                Member since {userProfile.joinDate}
              </p>
            </div>
          </div>
          {!isEditing && (
            <Button
              variant="secondary"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <Settings size={18} /> Edit
            </Button>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#2A2A2A]">
          <div>
            <p className="text-[#9CA3AF] text-sm mb-1">Total Workouts</p>
            <p className="text-2xl font-bold">{userProfile.stats.totalWorkouts}</p>
          </div>
          <div>
            <p className="text-[#9CA3AF] text-sm mb-1">Current Streak</p>
            <p className="text-2xl font-bold text-[#6B8E23]">
              {userProfile.stats.currentStreak} days
            </p>
          </div>
          <div>
            <p className="text-[#9CA3AF] text-sm mb-1">Achievements</p>
            <p className="text-2xl font-bold">{userProfile.stats.achievements}</p>
          </div>
          <div>
            <p className="text-[#9CA3AF] text-sm mb-1">Rank</p>
            <p className="text-2xl font-bold">🏆 Gold</p>
          </div>
        </div>
      </Card>

      {/* Contact Information */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold mb-6">Contact Information</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Mail size={20} className="text-[#6B8E23]" />
            <div>
              <p className="text-[#9CA3AF] text-sm">Email</p>
              <p className="text-white">{userProfile.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Phone size={20} className="text-[#6B8E23]" />
            <div>
              <p className="text-[#9CA3AF] text-sm">Phone</p>
              <p className="text-white">{userProfile.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <MapPin size={20} className="text-[#6B8E23]" />
            <div>
              <p className="text-[#9CA3AF] text-sm">Location</p>
              <p className="text-white">{userProfile.location}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Fitness Preferences */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold mb-6">Fitness Profile</h3>
        
        <div className="mb-6">
          <h4 className="font-semibold text-white mb-3">Goals</h4>
          <div className="flex flex-wrap gap-2">
            {preferences.fitnessGoals.map((goal) => (
              <Badge key={goal} variant="primary">
                {goal}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Preferred Equipment</h4>
          <div className="flex flex-wrap gap-2">
            {preferences.equipment.map((item) => (
              <Badge key={item} variant="secondary">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      {/* Notification Preferences */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Bell size={20} className="text-[#6B8E23]" />
          Notification Preferences
        </h3>
        
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => {
            const label = {
              workoutReminders: 'Workout Reminders',
              classAvailable: 'Class Available',
              friendActivity: 'Friend Activity',
              weeklyDigest: 'Weekly Digest',
            }[key as keyof typeof preferences.notifications];

            return (
              <div key={key} className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-lg">
                <span className="text-white font-medium">{label}</span>
                <button
                  onClick={() =>
                    handleToggleNotification(
                      key as keyof typeof preferences.notifications
                    )
                  }
                  className={`w-12 h-6 rounded-full transition-colors ${
                    value ? 'bg-[#6B8E23]' : 'bg-[#2A2A2A]'
                  } flex items-center ${value ? 'justify-end' : 'justify-start'} px-1`}
                >
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </button>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="mb-8">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Trophy size={20} className="text-[#6B8E23]" />
          Achievements
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🔥', name: '7-Day Streak', description: 'Complete workouts for 7 days' },
            { icon: '💪', name: 'Strong Start', description: 'Complete first 10 workouts' },
            { icon: '🎯', name: 'Goal Getter', description: 'Set a fitness goal' },
            { icon: '⭐', name: 'Rising Star', description: 'Reach Gold Member' },
            { icon: '🏆', name: 'Legend', description: 'Complete 100 workouts' },
            { icon: '🤝', name: 'Social Butterfly', description: 'Invite 3 friends' },
            { icon: '📈', name: 'Progress', description: 'Log 20 workouts' },
            { icon: '🎖️', name: 'Master', description: 'Complete all classes' },
          ].map((achievement, idx) => (
            <div key={idx} className="text-center p-4 bg-[#0A0A0A] rounded-lg hover:bg-[#1A1A1A] transition-colors">
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <h4 className="font-semibold text-sm">{achievement.name}</h4>
              <p className="text-xs text-[#9CA3AF]">{achievement.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-500/30 bg-red-500/5">
        <h3 className="text-xl font-bold mb-4 text-red-400">Danger Zone</h3>
        <p className="text-[#9CA3AF] text-sm mb-4">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <Button
          variant="outline"
          className="border-red-500/50 text-red-400 hover:bg-red-500/10"
        >
          Delete Account
        </Button>
      </Card>

      {/* Logout */}
      <div className="mt-8 flex gap-4">
        <Button variant="secondary" fullWidth className="flex items-center justify-center gap-2">
          <LogOut size={18} /> Log Out
        </Button>
      </div>
    </div>
  );
}
