'use client';

import { useState } from 'react';
import { Card, Button, Badge } from '@/components/UI';
import { Clock, Zap, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

// Mock data - in real app would come from params and API
const mockWorkout = {
  id: 1,
  name: 'Upper Body Strength',
  duration: 60,
  difficulty: 'intermediate',
  goal: 'Muscle Gain',
  description: 'Build powerful shoulders, chest, and arms with compound movements.',
  exercises: [
    {
      id: 1,
      name: 'Bench Press',
      sets: 4,
      reps: 8,
      weight: '185 lbs',
      description: 'Lie flat on the bench and push the barbell straight up.',
      tips: ['Keep your feet planted', 'Chest up', 'Full range of motion'],
    },
    {
      id: 2,
      name: 'Incline Dumbbell Press',
      sets: 3,
      reps: 10,
      weight: '75 lbs each',
      description: 'Press dumbbells on an inclined bench targeting upper chest.',
      tips: ['Incline at 45 degrees', 'Controlled movements', 'Squeeze at top'],
    },
    {
      id: 3,
      name: 'Barbell Rows',
      sets: 4,
      reps: 8,
      weight: '205 lbs',
      description: 'Rowing motion to build back thickness and strength.',
      tips: ['Bend knees slightly', 'Pull to chest', 'Squeeze shoulder blades'],
    },
    {
      id: 4,
      name: 'Pull-ups',
      sets: 3,
      reps: 12,
      weight: 'Bodyweight',
      description: 'Upper body pulling motion for lat and back development.',
      tips: ['Full extension', 'Chin over bar', 'Controlled descent'],
    },
    {
      id: 5,
      name: 'Overhead Press',
      sets: 3,
      reps: 10,
      weight: '135 lbs',
      description: 'Standing shoulder press for explosive strength.',
      tips: ['Tight core', 'Lock out completely', 'Control the descent'],
    },
    {
      id: 6,
      name: 'Lateral Raises',
      sets: 3,
      reps: 12,
      weight: '35 lbs each',
      description: 'Isolation exercise for shoulder width.',
      tips: ['Slight bend in elbows', 'Raise to shoulder height', 'Control descent'],
    },
    {
      id: 7,
      name: 'Barbell Curls',
      sets: 3,
      reps: 10,
      weight: '95 lbs',
      description: 'Classic bicep building exercise.',
      tips: ['No swing', 'Full range', 'Squeeze at peak'],
    },
    {
      id: 8,
      name: 'Tricep Rope Pushdowns',
      sets: 3,
      reps: 12,
      weight: '80 lbs',
      description: 'Isolation work for tricep definition.',
      tips: ['Press with elbows fixed', 'Full extension', 'Control the weight'],
    },
  ],
};

export default function WorkoutDetail() {
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [expandedExercises, setExpandedExercises] = useState<number[]>([]);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);

  const toggleExercise = (id: number) => {
    setCompletedExercises((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleExpand = (id: number) => {
    setExpandedExercises((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const progress = (completedExercises.length / mockWorkout.exercises.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <Link href="/workouts" className="inline-flex items-center gap-2 text-[#6B8E23] mb-6 hover:text-[#4A5D23]">
        ← Back to Workouts
      </Link>

      {/* Workout Info Card */}
      <Card className="mb-8 bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F]">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-black mb-2">{mockWorkout.name}</h1>
            <p className="text-[#9CA3AF] text-lg">{mockWorkout.description}</p>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap mb-6">
          <Badge variant="primary">{mockWorkout.difficulty}</Badge>
          <Badge variant="secondary">{mockWorkout.goal}</Badge>
          <span className="text-[#9CA3AF] text-sm flex items-center gap-1">
            <Clock size={16} /> {mockWorkout.duration} minutes
          </span>
          <span className="text-[#9CA3AF] text-sm flex items-center gap-1">
            <Zap size={16} /> {mockWorkout.exercises.length} exercises
          </span>
        </div>

        {/* Progress Bar */}
        <div className="bg-[#0A0A0A]/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[#9CA3AF] font-medium">Workout Progress</p>
            <p className="text-[#6B8E23] font-bold">
              {completedExercises.length} / {mockWorkout.exercises.length}
            </p>
          </div>
          <div className="w-full bg-[#2A2A2A] rounded-full h-3">
            <div
              className="bg-gradient-to-r from-[#6B8E23] to-[#4A5D23] h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </Card>

      {/* Workout Controls */}
      {!workoutStarted ? (
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => setWorkoutStarted(true)}
          className="mb-8"
        >
          Start Workout
        </Button>
      ) : !workoutCompleted ? (
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          onClick={() => setWorkoutCompleted(true)}
          disabled={completedExercises.length !== mockWorkout.exercises.length}
          className="mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {completedExercises.length === mockWorkout.exercises.length
            ? 'Complete Workout'
            : 'Complete all exercises to finish'}
        </Button>
      ) : (
        <Card className="mb-8 bg-gradient-to-br from-green-500/10 to-[#6B8E23]/10 border-green-500/30">
          <div className="flex items-center gap-4">
            <CheckCircle2 size={32} className="text-green-500" />
            <div>
              <h3 className="font-bold text-green-400">Workout Completed!</h3>
              <p className="text-[#9CA3AF] text-sm">Great work! You earned +50 XP</p>
            </div>
          </div>
        </Card>
      )}

      {/* Exercises List */}
      <div className="space-y-3">
        {mockWorkout.exercises.map((exercise) => (
          <Card
            key={exercise.id}
            className={`${
              completedExercises.includes(exercise.id)
                ? 'border-green-500/30 bg-green-500/5'
                : ''
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Checkbox */}
              {workoutStarted && (
                <button
                  onClick={() => toggleExercise(exercise.id)}
                  className="mt-1 flex-shrink-0"
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      completedExercises.includes(exercise.id)
                        ? 'border-green-500 bg-green-500'
                        : 'border-[#2A2A2A] hover:border-[#6B8E23]'
                    }`}
                  >
                    {completedExercises.includes(exercise.id) && (
                      <CheckCircle2 size={16} className="text-white" />
                    )}
                  </div>
                </button>
              )}

              {/* Exercise Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3
                      className={`text-lg font-bold ${
                        completedExercises.includes(exercise.id)
                          ? 'text-green-400'
                          : 'text-white'
                      }`}
                    >
                      {exercise.name}
                    </h3>
                    <p className="text-[#9CA3AF] text-sm">{exercise.description}</p>
                  </div>
                  <button
                    onClick={() => toggleExpand(exercise.id)}
                    className="text-[#6B8E23] hover:text-[#4A5D23] flex-shrink-0"
                  >
                    {expandedExercises.includes(exercise.id) ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                </div>

                {/* Exercise Specs */}
                <div className="flex gap-4 text-sm text-[#9CA3AF] mb-3">
                  <span>
                    <strong className="text-white">{exercise.sets}x{exercise.reps}</strong> reps
                  </span>
                  <span>
                    Weight: <strong className="text-white">{exercise.weight}</strong>
                  </span>
                </div>

                {/* Expanded Info */}
                {expandedExercises.includes(exercise.id) && (
                  <div className="bg-[#0A0A0A]/50 rounded-lg p-4 mt-3">
                    <h4 className="font-semibold text-white mb-2">Tips:</h4>
                    <ul className="space-y-1">
                      {exercise.tips.map((tip, idx) => (
                        <li key={idx} className="text-[#9CA3AF] text-sm">
                          • {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Footer */}
      {workoutCompleted && (
        <div className="mt-8 text-center space-y-4">
          <Link href="/dashboard">
            <Button variant="primary" size="lg" fullWidth>
              Back to Dashboard
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
