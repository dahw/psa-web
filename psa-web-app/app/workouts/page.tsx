'use client';

import { useState } from 'react';
import { Card, Button, Badge } from '@/components/UI';
import { Clock, Zap, Filter } from 'lucide-react';
import Link from 'next/link';

// Mock data
const allWorkouts = [
  {
    id: 1,
    name: 'Upper Body Strength',
    goal: 'muscle-gain',
    difficulty: 'intermediate',
    duration: 60,
    exercises: 8,
    description: 'Build powerful shoulders, chest, and arms with compound movements.',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'HIIT Cardio Blast',
    goal: 'weight-loss',
    difficulty: 'advanced',
    duration: 30,
    exercises: 12,
    description: 'High-intensity intervals to torch calories and boost metabolism.',
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Core & Abs',
    goal: 'shredding',
    difficulty: 'beginner',
    duration: 20,
    exercises: 6,
    description: 'Develop a strong core and visible abs with targeted exercises.',
    rating: 4.6,
  },
  {
    id: 4,
    name: 'Leg Day Supreme',
    goal: 'muscle-gain',
    difficulty: 'advanced',
    duration: 75,
    exercises: 10,
    description: 'Build massive, powerful legs with squats, deadlifts, and more.',
    rating: 4.7,
  },
  {
    id: 5,
    name: 'Steady State Cardio',
    goal: 'weight-loss',
    difficulty: 'beginner',
    duration: 45,
    exercises: 1,
    description: 'Burn calories with continuous moderate-intensity training.',
    rating: 4.4,
  },
  {
    id: 6,
    name: 'Full Body Shred',
    goal: 'shredding',
    difficulty: 'intermediate',
    duration: 50,
    exercises: 9,
    description: 'Complete body workout combining strength and cardio for maximum definition.',
    rating: 4.8,
  },
  {
    id: 7,
    name: 'Back & Biceps',
    goal: 'muscle-gain',
    difficulty: 'intermediate',
    duration: 55,
    exercises: 7,
    description: 'Develop a strong back and powerful biceps with targeted isolation work.',
    rating: 4.7,
  },
  {
    id: 8,
    name: 'Boxing Conditioning',
    goal: 'weight-loss',
    difficulty: 'advanced',
    duration: 40,
    exercises: 8,
    description: 'Boxing-inspired workout for cardiovascular fitness and coordination.',
    rating: 4.9,
  },
];

const goals = [
  { id: 'muscle-gain', label: 'Muscle Gain' },
  { id: 'shredding', label: 'Shredding' },
  { id: 'weight-loss', label: 'Weight Loss' },
];

const difficulties = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const colors = {
    beginner: 'success',
    intermediate: 'primary',
    advanced: 'warning',
  } as const;

  return <Badge variant={colors[difficulty as keyof typeof colors]}>{difficulty}</Badge>;
}

export default function WorkoutsPage() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = allWorkouts.filter((workout) => {
    if (selectedGoal && workout.goal !== selectedGoal) return false;
    if (selectedDifficulty && workout.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const hasActiveFilters = selectedGoal || selectedDifficulty;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
      {/* Header */}
      <div className="mb-8 md:mb-10">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
          Workout Library<span className="text-[#6B8E23]">.</span>
        </h1>
        <p className="text-[#9CA3AF] text-lg md:text-xl">
          {filtered.length} of {allWorkouts.length} workouts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
        {/* Sidebar Filters */}
        <div className="lg:block">
          <Card className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h3 className="font-bold">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-[#9CA3AF] hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Goal Filter */}
            <div className="mb-8">
              <h4 className="font-bold text-sm uppercase text-[#9CA3AF] tracking-wide mb-3">
                Training Goal
              </h4>
              <div className="space-y-2">
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() =>
                      setSelectedGoal(selectedGoal === goal.id ? null : goal.id)
                    }
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedGoal === goal.id
                        ? 'bg-[#6B8E23] text-white'
                        : 'bg-[#0A0A0A] text-[#9CA3AF] hover:text-white'
                    }`}
                  >
                    {goal.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <h4 className="font-bold text-sm uppercase text-[#9CA3AF] tracking-wide mb-3">
                Difficulty
              </h4>
              <div className="space-y-2">
                {difficulties.map((diff) => (
                  <button
                    key={diff.id}
                    onClick={() =>
                      setSelectedDifficulty(
                        selectedDifficulty === diff.id ? null : diff.id
                      )
                    }
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedDifficulty === diff.id
                        ? 'bg-[#6B8E23] text-white'
                        : 'bg-[#0A0A0A] text-[#9CA3AF] hover:text-white'
                    }`}
                  >
                    {diff.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSelectedGoal(null);
                  setSelectedDifficulty(null);
                }}
                className="w-full mt-6 px-4 py-2 rounded-lg bg-[#0A0A0A] text-[#6B8E23] hover:bg-[#6B8E23]/10 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </Card>
        </div>

        {/* Workouts Grid */}
        <div className="lg:col-span-3">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden mb-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1A1A1A] text-white border border-[#2A2A2A] hover:border-[#6B8E23]"
          >
            <Filter size={18} />
            Filters
          </button>

          {/* Workouts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.length > 0 ? (
              filtered.map((workout) => (
                <Link
                  key={workout.id}
                  href={`/workouts/${workout.id}`}
                  className="group"
                >
                  <Card>
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold mb-2 group-hover:text-[#6B8E23] transition-colors">
                          {workout.name}
                        </h3>
                        <p className="text-sm text-[#9CA3AF] mb-3">
                          {workout.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      <DifficultyBadge difficulty={workout.difficulty} />
                      <Badge variant="secondary" className="bg-[#0A0A0A]">
                        {goals.find((g) => g.id === workout.goal)?.label}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-[#9CA3AF] mb-4">
                      <span className="flex items-center gap-1">
                        <Clock size={16} /> {workout.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap size={16} /> {workout.exercises} exercises
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#2A2A2A]">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-sm text-[#9CA3AF]">
                          {workout.rating}
                        </span>
                      </div>
                      <span className="text-[#6B8E23] font-semibold text-sm">
                        View →
                      </span>
                    </div>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-[#9CA3AF] text-lg">
                  No workouts match your filters. Try adjusting your selection.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
