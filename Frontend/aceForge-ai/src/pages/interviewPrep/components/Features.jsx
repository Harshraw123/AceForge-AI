import React from 'react';
import { FaCode, FaQuestion } from 'react-icons/fa'; // New icons
import { features as originalFeatures } from '../../../utils/data';
import { HelpCircle } from 'lucide-react';

const Features = () => {
  // Remove any two old features and add two new ones
  const updatedFeatures = [
    ...originalFeatures.slice(0, originalFeatures.length - 2), // remove last 2
    {
      id: 'ai-code-editor',
      title: 'AI Code Editor',
      description: 'Write, compile, and get real-time AI feedback to improve your code and logic instantly.',
      icon: FaCode,
    },
    {
      id: 'ai-quiz',
      title: 'AI Quiz System',
      description: 'Test your knowledge with AI-generated quizzes tailored to your interview domain.',
      icon: HelpCircle,
    },
  ];

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute via-transparent to-feature-purple/10 pointer-events-none"></div>

      {/* Blurred gradient spots */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-feature-purple/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            <span className="bg-gradient-to-r from-gray-100 via-white to-gray-300 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Designed to enhance your interview preparation experience and maximize your success rate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {updatedFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative transition-all duration-300 ease-in-out h-full"
              >
                <div className="h-full relative backdrop-blur-lg border border-white/10 rounded-xl p-6 overflow-hidden transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="mb-4 relative">
                    <div className="absolute -inset-1 bg-feature-purple/20 rounded-full blur-md group-hover:animate-pulse-glow"></div>
                    <div className="relative w-12 h-12 rounded-full flex items-center justify-center">
                      <Icon className="h-6 w-6 text-yellow-500" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 transition-transform group-hover:-translate-y-1 duration-300">{feature.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed transition-transform group-hover:-translate-y-1 duration-300">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
