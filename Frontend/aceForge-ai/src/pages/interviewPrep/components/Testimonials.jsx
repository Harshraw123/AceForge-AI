import React from "react";
import { cn } from "../../../lib/utils";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer at Google",
    image: "https://i.pravatar.cc/150?img=32",
    quote:
      "AceForge AI helped me land my dream job at Google. The AI-generated questions were spot-on and the feedback was incredibly helpful for improving my responses.",
  },
  {
    name: "Michael Chen",
    role: "Product Manager at Amazon",
    image: "https://i.pravatar.cc/150?img=11",
    quote:
      "After using AceForge AI for just two weeks, I felt much more confident in my interviews. The role-specific questions really prepared me for what was asked.",
  },
  {
    name: "Priya Patel",
    role: "Data Scientist at Microsoft",
    image: "https://i.pravatar.cc/150?img=25",
    quote:
      "The technical interview preparation was exceptional. I was able to practice complex problems and receive detailed explanations that helped me understand the concepts better.",
  },
  {
    name: "James Wilson",
    role: "Marketing Director at Salesforce",
    image: "https://i.pravatar.cc/150?img=53",
    quote:
      "As someone who gets nervous during interviews, the realistic practice sessions with AceForge AI made a huge difference. I felt prepared and confident.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 px-4 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Success Stories from <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Our Users</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Hear from professionals who landed their dream jobs with the help of InterviewPrep.ai
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                "bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl transition-all duration-300 shadow-sm",
                index % 2 === 0 ? "hover:shadow-primary/10" : "hover:shadow-accent/10"
              )}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-3 text-xl text-gray-100">"{testimonial.quote}"</div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/20 rounded-full blur-3xl"></div>

          <div className="relative text-center max-w-4xl mx-auto py-8">
            <div className="flex justify-center mb-8">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map((img) => (
                  <div
                    key={img}
                    className="w-12 h-12 rounded-full overflow-hidden border-2 border-background"
                  >
                    <img
                      src={`https://i.pravatar.cc/100?img=${20 + img}`}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-sm font-medium text-white">
                  +1.2k
                </div>
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Join over 1,200+ professionals who improved their interview skills
            </h3>
            <p className="text-gray-400 mb-8">
              Our users report a 72% increase in interview confidence and 3x higher success rate in landing job offers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { color: "bg-green-400", label: "72% Improved Confidence" },
                { color: "bg-primary", label: "3x Higher Success Rate" },
                { color: "bg-accent", label: "89% User Satisfaction" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 px-6 py-3 rounded-full flex items-center gap-2 text-white text-sm font-medium"
                >
                  <div className={`h-2.5 w-2.5 rounded-full ${stat.color}`}></div>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
