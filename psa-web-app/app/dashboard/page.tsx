'use client';

import { Card, StatBox, Button, Badge } from '@/components/UI';
import { Flame, TrendingUp, Zap, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Mock data
const workoutStreak = 12;
const weeklySessions = 5;
const totalCalories = 3240;

const todayWorkout = {
  id: 1,
  name: 'Upper Body Strength',
  duration: 60,
  exercises: 8,
  level: 'Intermediate',
  scheduledTime: '18:00',
};

const upcomingSessions = [
  { id: 1, name: 'Chest & Triceps', time: '18:00', trainer: 'Alex' },
  { id: 2, name: 'Cardio Blast', time: '19:30', trainer: 'Self' },
  { id: 3, name: 'Leg Day', time: '17:00 (Tomorrow)', trainer: 'Coach Mike' },
];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
      {/* Welcome Header */}
      <div className="mb-8 md:mb-10">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
          Welcome back<span className="text-[#6B8E23]">.</span>
        </h1>
        <p className="text-[#9CA3AF] text-lg md:text-xl">Ready to push, sweat, and achieve?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
        <StatBox
          label="Workout Streak"
          value={workoutStreak}
          unit="days"
          icon={<Flame size={24} />}
        />
        <StatBox
          label="Weekly Sessions"
          value={weeklySessions}
          unit="/ 7"
          icon={<Clock size={24} />}
        />
        <StatBox
          label="Calories Burned"
          value="3.2K"
          unit="kcal"
          icon={<Zap size={24} />}
        />
        <StatBox
          label="Monthly Progress"
          value="+18%"
          unit="improvement"
          icon={<TrendingUp size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Today's Workout */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Today's Workout</h2>
            <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F]">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{todayWorkout.name}</h3>
                  <div className="flex gap-3 flex-wrap">
                    <Badge variant="primary">{todayWorkout.level}</Badge>
                    <span className="text-[#9CA3AF] text-sm flex items-center gap-1">
                      <Clock size={16} /> {todayWorkout.duration} min
                    </span>
                    <span className="text-[#9CA3AF] text-sm">
                      {todayWorkout.exercises} exercises
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[#9CA3AF] text-sm">Scheduled at</p>
                  <p className="text-2xl font-bold text-[#6B8E23]">
                    {todayWorkout.scheduledTime}
                  </p>
                </div>
              </div>

              <div className="bg-[#0A0A0A]/50 rounded-xl p-4 mb-6">
                <p className="text-[#9CA3AF] mb-3 font-medium">
                  Estimated difficulty: Moderate
                </p>
                <div className="w-full bg-[#2A2A2A] rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#6B8E23] to-[#4A5D23] h-2 rounded-full"
                    style={{ width: '65%' }}
                  ></div>
                </div>
              </div>

              <Link href={`/workouts/1`}>
                <Button variant="primary" fullWidth>
                  Start Workout <ChevronRight size={20} />
                </Button>
              </Link>
            </Card>
          </div>

          {/* Quick Stats */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Weekly Overview</h2>
            <Card>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#9CA3AF]">Monday</span>
                    <Badge variant="success">Completed</Badge>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 h-2 rounded-full bg-green-500/30"
                      ></div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#9CA3AF]">Tuesday</span>
                    <Badge variant="success">Completed</Badge>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 h-2 rounded-full bg-green-500/30"
                      ></div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#9CA3AF]">Wednesday</span>
                    <Badge variant="warning">In Progress</Badge>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 h-2 rounded-full bg-[#6B8E23]/30"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Upcoming Sessions Sidebar */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Upcoming Sessions</h2>
          <div className="space-y-3">
            {upcomingSessions.map((session) => (
              <Card key={session.id} className="hover:translate-x-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-white mb-1">{session.name}</h4>
                    <p className="text-xs text-[#9CA3AF] mb-2">{session.time}</p>
                    <Badge variant="primary" className="text-xs">
                      {session.trainer}
                    </Badge>
                  </div>
                  <ChevronRight size={20} className="text-[#6B8E23]" />
                </div>
              </Card>
            ))}
          </div>

          {/* CTA Card */}
          <Card className="mt-6 bg-gradient-to-br from-[#6B8E23]/20 to-[#4A5D23]/10 border-[#6B8E23]/30">
            <div className="text-center">
              <h4 className="font-bold text-white mb-2">Ready to get started?</h4>
              <p className="text-sm text-[#9CA3AF] mb-4">
                Browse our full workout library and start training today.
              </p>
              <Link href="/workouts" className="w-full">
                <Button variant="primary" fullWidth>
                  View Workouts
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
