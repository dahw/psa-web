'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, Button, Badge } from '@/components/UI';
import { Calendar, Clock, User, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock data
const trainers = [
  { id: 1, name: 'Cameron Bankhead', specialty: 'Lead Trainer', rating: 4.9, image: '/Bankhead_AI.png' },
];

const classSchedule = [
  { id: 1, name: 'Morning Bootcamp', time: '6:00 AM', trainer: 'Cameron Bankhead', capacity: 20, booked: 18, date: '2025-02-10' },
  { id: 2, name: 'HIIT Cardio', time: '12:00 PM', trainer: 'Cameron Bankhead', capacity: 15, booked: 12, date: '2025-02-10' },
  { id: 4, name: 'Strength Training', time: '6:30 PM', trainer: 'Cameron Bankhead', capacity: 20, booked: 15, date: '2025-02-10' },
  { id: 6, name: 'Morning Bootcamp', time: '6:00 AM', trainer: 'Cameron Bankhead', capacity: 20, booked: 18, date: '2025-02-11' },
];

function DaysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function FirstDayOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

export default function BookingPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 1, 10)); // Feb 10, 2025
  const [selectedDate, setSelectedDate] = useState('2025-02-10');
  const [bookedClasses, setBookedClasses] = useState<number[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<number | null>(null);

  const daysInMonth = DaysInMonth(currentDate);
  const firstDay = FirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const previousMonthDays = Array.from(
    { length: firstDay },
    (_, i) => DaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)) - firstDay + i + 1
  );

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleSelectDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
  };

  const handleBookClass = (classId: number) => {
    if (bookedClasses.includes(classId)) {
      setBookedClasses(bookedClasses.filter((id) => id !== classId));
    } else {
      setBookedClasses([...bookedClasses, classId]);
    }
  };

  const selectedClasses = classSchedule.filter((c) => c.date === selectedDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
      {/* Header */}
      <div className="mb-8 md:mb-10">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
          Book a Class<span className="text-[#6B8E23]">.</span>
        </h1>
        <p className="text-[#9CA3AF] text-lg md:text-xl">Schedule your training with our expert trainers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
        {/* Calendar Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">{monthName}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevMonth}
                    className="p-1 hover:bg-[#2A2A2A] rounded transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="p-1 hover:bg-[#2A2A2A] rounded transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-xs text-[#9CA3AF] font-semibold">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {previousMonthDays.map((day) => (
                  <button
                    key={`prev-${day}`}
                    className="aspect-square text-xs p-1 rounded text-[#4A5D23] bg-transparent"
                    disabled
                  >
                    {day}
                  </button>
                ))}
                {days.map((day) => {
                  const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const isSelected = selectedDate === dateStr;
                  const hasClasses = classSchedule.some((c) => c.date === dateStr);

                  return (
                    <button
                      key={day}
                      onClick={() => handleSelectDate(day)}
                      className={`aspect-square text-xs p-1 rounded font-semibold transition-colors ${
                        isSelected
                          ? 'bg-[#6B8E23] text-white'
                          : 'bg-[#0A0A0A] text-white hover:bg-[#2A2A2A]'
                      } ${hasClasses && !isSelected ? 'border border-[#6B8E23]' : ''}`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trainer Filter */}
            <div className="pt-6 border-t border-[#2A2A2A]">
              <h4 className="font-bold text-sm uppercase text-[#9CA3AF] tracking-wide mb-3">
                Filter by Trainer
              </h4>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedTrainer(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                    selectedTrainer === null
                      ? 'bg-[#6B8E23] text-white'
                      : 'bg-[#0A0A0A] text-[#9CA3AF] hover:text-white'
                  }`}
                >
                  All Trainers
                </button>
                {trainers.map((trainer) => (
                  <button
                    key={trainer.id}
                    onClick={() => setSelectedTrainer(trainer.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                      selectedTrainer === trainer.id
                        ? 'bg-[#6B8E23] text-white'
                        : 'bg-[#0A0A0A] text-[#9CA3AF] hover:text-white'
                    }`}
                  >
                    {trainer.name}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Classes Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Classes on {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </h2>

            <div className="space-y-4">
              {selectedClasses
                .filter((c) => !selectedTrainer || trainers.find((t) => t.id === selectedTrainer && t.name === c.trainer))
                .map((classItem) => {
                  const isBooked = bookedClasses.includes(classItem.id);
                  const trainer = trainers.find((t) => t.name === classItem.trainer);

                  return (
                    <Card key={classItem.id}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{classItem.name}</h3>
                          <div className="space-y-2 text-sm text-[#9CA3AF] mb-4">
                            <p className="flex items-center gap-2">
                              <Clock size={16} className="text-[#6B8E23]" />
                              {classItem.time}
                            </p>
                            {trainer && (
                              <p className="flex items-center gap-2">
                                <User size={16} className="text-[#6B8E23]" />
                                {trainer.image} {trainer.name} • {trainer.specialty}
                              </p>
                            )}
                            <p className="flex items-center gap-2">
                              <MapPin size={16} className="text-[#6B8E23]" />
                              Main Studio
                            </p>
                          </div>

                          {/* Capacity Bar */}
                          <div className="mb-4">
                            <div className="flex justify-between text-xs text-[#9CA3AF] mb-1">
                              <span>Spots Available</span>
                              <span>{classItem.capacity - classItem.booked} / {classItem.capacity}</span>
                            </div>
                            <div className="w-full bg-[#2A2A2A] rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-[#6B8E23] to-[#4A5D23] h-2 rounded-full"
                                style={{ width: `${(classItem.booked / classItem.capacity) * 100}%` }}
                              ></div>
                            </div>
                          </div>

                          {classItem.booked >= classItem.capacity && (
                            <Badge variant="warning">Waitlist Available</Badge>
                          )}
                        </div>

                        <Button
                          variant={isBooked ? 'outline' : 'primary'}
                          onClick={() => handleBookClass(classItem.id)}
                          className="flex-shrink-0"
                        >
                          {isBooked ? 'Booked ✓' : 'Book Now'}
                        </Button>
                      </div>
                    </Card>
                  );
                })}

              {selectedClasses.length === 0 && (
                <Card className="text-center py-12">
                  <p className="text-[#9CA3AF]">No classes scheduled for this date.</p>
                </Card>
              )}
            </div>
          </div>

          {/* Trainers Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Personal Trainers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trainers.map((trainer) => (
                <Card key={trainer.id} className="text-center">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    loading="lazy"
                    className="mx-auto mb-3 w-20 h-20 rounded-full"
                  />
                  <h4 className="font-bold text-lg mb-1">{trainer.name}</h4>
                  <p className="text-sm text-[#9CA3AF] mb-4">{trainer.specialty}</p>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-[#9CA3AF]">{trainer.rating}</span>
                  </div>
                  <Button variant="secondary" fullWidth size="sm">
                    Book Session
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
