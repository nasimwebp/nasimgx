import React, { useState, useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';

// A self-contained animated counter component that starts when it becomes visible.
const AnimatedCounter: React.FC<{ targetValue: number; duration?: number }> = ({ targetValue, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInViewRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Start animation only once when it comes into view
        if (entry.isIntersecting && !isInViewRef.current) {
          isInViewRef.current = true; // Mark as started
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Use an easing function for a more professional feel (ease-out-cubic)
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easedProgress * targetValue);
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(targetValue); // Ensure it ends exactly on the target value
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [targetValue, duration]);

  return <span ref={ref}>{count}</span>;
};

const SectionTitle: React.FC<{children: React.ReactNode; subtitle: string}> = ({ children, subtitle }) => (
    <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold font-montserrat">{children}</h2>
        <p className="mt-4 text-lg text-dark-text-secondary max-w-2xl mx-auto">{subtitle}</p>
    </div>
);

const AchievementCard: React.FC<{ value: string; label: string; index: number }> = ({ value, label, index }) => {
  const numericValue = parseInt(value, 10);
  const isNumeric = !isNaN(numericValue);
  
  return (
    <div 
      className="animated-card bg-dark-bg-secondary p-8 rounded-xl text-center shadow-lg opacity-0 transform translate-y-5 transition-all duration-700 ease-out hover:scale-105 hover:shadow-brand-green/10"
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <h3 className="text-5xl font-bold text-brand-green mb-2">
        {isNumeric ? <><AnimatedCounter targetValue={numericValue} />+</> : value}
      </h3>
      <p className="text-lg text-dark-text">{label}</p>
    </div>
  );
};

const TestimonialCard: React.FC<{ quote: string; author: string; company: string; index: number }> = ({ quote, author, company, index }) => (
  <div 
    className="animated-card bg-dark-bg-secondary p-8 rounded-xl shadow-lg flex flex-col opacity-0 transform translate-y-5 transition-all duration-700 ease-out hover:scale-105 hover:shadow-brand-green/10"
    style={{ transitionDelay: `${index * 150}ms` }}
  >
    <Quote className="w-12 h-12 text-brand-green mb-4" />
    <blockquote className="text-dark-text-secondary italic text-lg leading-relaxed mb-6 flex-grow">
      “{quote}”
    </blockquote>
    <div className="text-right mt-auto">
      <p className="font-bold text-dark-text text-lg">{author}</p>
      <p className="text-sm text-dark-text-secondary">{company}</p>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  const achievements = [
    { value: "100+", label: "T-Shirt Designs" },
    { value: "50+", label: "Logos Delivered" },
    { value: "Worldwide", label: "Client Base" },
  ];
  
  const testimonials = [
    {
      quote: "Nasim's creativity and attention to detail are unmatched. He brought our brand vision to life perfectly!",
      author: "Jane Doe",
      company: "Creative Startup",
    },
    {
      quote: "The t-shirt designs were a huge hit! Excellent communication and fast turnaround. Highly recommended.",
      author: "John Smith",
      company: "Streetwear Co.",
    },
  ];
  
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-dark-bg fade-in-section">
      {/* This style block targets the animated cards once the parent section is visible */}
      <style>{`
        .fade-in-section.is-visible .animated-card {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="My work speaks for itself, but so do my clients.">
          Achievements & <span className="text-brand-green">Testimonials</span>
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {achievements.map((item, index) => (
            <AchievementCard key={item.label} value={item.value} label={item.label} index={index} />
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((item, index) => (
            <TestimonialCard
              key={item.author}
              quote={item.quote}
              author={item.author}
              company={item.company}
              index={index + achievements.length} // Continue the stagger delay from the achievements
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;