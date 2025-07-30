import React, { useEffect, useState } from "react";

interface StatItemProps {
  title: string;
  value: number;
  duration?: number; // animasi berapa detik
  className?: string;
}

const StatItem: React.FC<StatItemProps> = ({
  title,
  value,
  duration = 2000,
  className = "",
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(progress * value);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <div
      className={`flex flex-col items-center transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <p className="text-5xl font-extrabold text-primary bg-clip-text">
        {count.toLocaleString('id-ID')}
      </p>
      <h3 className="text-lg font-medium text-gray-600 mt-2">{title}</h3>
    </div>
  );
};

// Data untuk statistik agar lebih mudah dikelola
const statsData = [
  { title: "Siswa Terdaftar", value: 4000, duration: 1500 },
  { title: "Guru Memakai", value: 500, duration: 2000 },
  { title: "Kantin Digital", value: 120, duration: 2500 },
];

export function StatsSection() {
  return (
    <section className="w-full relative z-10 -mt-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* FIX: Menggunakan grid untuk membuat 3 kartu terpisah */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          
          {statsData.map((stat, index) => (
            // Setiap item statistik sekarang dibungkus dalam div kartunya sendiri
            <div key={index} className="bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-10 text-center animate-fade-in">
              <StatItem
                title={stat.title}
                value={stat.value}
                duration={stat.duration}
              />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
