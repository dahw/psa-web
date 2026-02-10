import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Flame, 
  Target, 
  Calendar,
  TrendingUp,
  ChevronRight,
  Dumbbell,
  Clock,
  Zap,
  Trophy
} from "lucide-react";
import StatsCard from "@/components/ui/StatsCard";
import { format, isToday, isTomorrow, startOfWeek, endOfWeek } from "date-fns";

export default function Dashboard() {
  const { data: user } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => base44.auth.me(),
  });

  const { data: workouts } = useQuery({
    queryKey: ['workouts'],
    queryFn: () => base44.entities.Workout.list(),
    initialData: []
  });

  const { data: workoutLogs } = useQuery({
    queryKey: ['workout-logs'],
    queryFn: () => base44.entities.WorkoutLog.filter({}, '-completed_at', 50),
    initialData: []
  });

  const { data: bookings } = useQuery({
    queryKey: ['bookings'],
    queryFn: () => base44.entities.Booking.filter({ status: 'confirmed' }, 'date', 10),
    initialData: []
  });

  const { data: progressEntries } = useQuery({
    queryKey: ['progress'],
    queryFn: () => base44.entities.ProgressEntry.filter({}, '-date', 10),
    initialData: []
  });

  // Calculate streak
  const calculateStreak = () => {
    if (!workoutLogs.length) return 0;
    let streak = 0;
    const sortedLogs = [...workoutLogs].sort((a, b) => 
      new Date(b.completed_at) - new Date(a.completed_at)
    );
    
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    for (const log of sortedLogs) {
      const logDate = new Date(log.completed_at);
      logDate.setHours(0, 0, 0, 0);
      
      const diffDays = Math.floor((currentDate - logDate) / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 1) {
        streak++;
        currentDate = logDate;
      } else {
        break;
      }
    }
    return streak;
  };

  // This week's workouts
  const thisWeekWorkouts = workoutLogs.filter(log => {
    const logDate = new Date(log.completed_at);
    return logDate >= startOfWeek(new Date()) && logDate <= endOfWeek(new Date());
  });

  const todayWorkout = workouts[0];
  const upcomingBookings = bookings.slice(0, 3);
  const streak = calculateStreak();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="px-4 py-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <p className="text-gray-500 text-sm">{getGreeting()}</p>
        <h1 className="text-3xl font-bold tracking-tight">
          {user?.full_name?.split(' ')[0] || 'Athlete'}
        </h1>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          icon={Flame}
          label="Current Streak"
          value={`${streak} days`}
          color="olive"
        />
        <StatsCard 
          icon={Target}
          label="This Week"
          value={thisWeekWorkouts.length}
          subtext="workouts completed"
          color="grey"
        />
        <StatsCard 
          icon={Trophy}
          label="Total Workouts"
          value={workoutLogs.length}
          color="dark"
        />
        <StatsCard 
          icon={TrendingUp}
          label="Progress"
          value={progressEntries.length > 1 
            ? `${((progressEntries[0]?.weight_kg - progressEntries[progressEntries.length-1]?.weight_kg) || 0).toFixed(1)} kg`
            : "—"
          }
          color="olive"
        />
      </div>

      {/* Today's Workout */}
      {todayWorkout && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Today's Workout</h2>
            <Link 
              to={createPageUrl("Workouts")}
              className="text-[#6B8E23] text-sm font-medium flex items-center gap-1 hover:underline"
            >
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <Link
            to={createPageUrl(`WorkoutDetail?id=${todayWorkout.id}`)}
            className="block bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-3xl overflow-hidden border border-white/5 hover:border-[#4A5D23]/50 transition-all group"
          >
            <div className="relative h-48 overflow-hidden">
              {todayWorkout.image_url ? (
                <img 
                  src={todayWorkout.image_url} 
                  alt={todayWorkout.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#4A5D23]/20 to-transparent flex items-center justify-center">
                  <Dumbbell className="w-16 h-16 text-[#4A5D23]" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-[#4A5D23] rounded-full text-xs font-semibold">
                    {todayWorkout.category?.replace('_', ' ')}
                  </span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium">
                    {todayWorkout.difficulty}
                  </span>
                </div>
                <h3 className="text-2xl font-bold">{todayWorkout.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-gray-400 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{todayWorkout.duration_minutes} min</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    <span>{todayWorkout.exercises?.length || 0} exercises</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Upcoming Sessions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Upcoming Sessions</h2>
          <Link 
            to={createPageUrl("Booking")}
            className="text-[#6B8E23] text-sm font-medium flex items-center gap-1 hover:underline"
          >
            Book more <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {upcomingBookings.length > 0 ? (
          <div className="space-y-3">
            {upcomingBookings.map((booking, i) => (
              <div
                key={booking.id}
                className="bg-[#1A1A1A] rounded-2xl p-4 border border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#4A5D23]/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#6B8E23]" />
                  </div>
                  <div>
                    <p className="font-semibold">
                      {booking.booking_type === 'personal' ? 'Personal Training' : 'Group Class'}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {isToday(new Date(booking.date)) 
                        ? 'Today' 
                        : isTomorrow(new Date(booking.date))
                          ? 'Tomorrow'
                          : format(new Date(booking.date), 'EEE, MMM d')
                      } at {booking.time}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'confirmed' 
                    ? 'bg-[#4A5D23]/20 text-[#6B8E23]' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-white/5 text-center">
            <Calendar className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 mb-4">No upcoming sessions</p>
            <Link
              to={createPageUrl("Booking")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#4A5D23] hover:bg-[#6B8E23] rounded-xl text-sm font-medium transition-colors"
            >
              Book a session
            </Link>
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 gap-4"
      >
        <Link
          to={createPageUrl("Progress")}
          className="bg-gradient-to-br from-[#4A5D23] to-[#6B8E23] rounded-2xl p-5 hover:opacity-90 transition-opacity"
        >
          <TrendingUp className="w-8 h-8 mb-3" />
          <p className="font-bold">Track Progress</p>
          <p className="text-white/70 text-sm mt-1">Log measurements</p>
        </Link>
        <Link
          to={createPageUrl("QRCode")}
          className="bg-[#1A1A1A] rounded-2xl p-5 border border-white/5 hover:border-[#4A5D23]/30 transition-colors"
        >
          <Zap className="w-8 h-8 mb-3 text-[#6B8E23]" />
          <p className="font-bold">Check In</p>
          <p className="text-gray-500 text-sm mt-1">Scan QR code</p>
        </Link>
      </motion.div>
    </div>
  );
}