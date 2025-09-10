import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-hot-toast';
import { FaRobot } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '@/utils/apiPath';
import axiosInstance from '@/utils/axiosInstance';





const interviewers = [
  { id: 'Hmz0MdhDqv9vPpSMfDkh', name: 'Rakesh Thakur', specialty: 'System Design & Algorithms' },
  { id: 'rKEZ4zwQvgkCKHp8yR8n', name: 'Jessica', specialty: 'Senior Full Stack Developer' },
  { id: 'TzH1pxB1AEqPI2KZJ5MT', name: 'Daniel', specialty: 'Senior Data Scientist' }
];

const experienceLevels = [
  'Entry Level (0-2 years)',
  'Mid Level (3-5 years)', 
  'Senior Level (6-10 years)',
  'Lead/Principal (10+ years)'
];

const InterviewForm = () => {
  const [formData, setFormData] = useState({
    topic: '',
    experience: '',
    interviewer: ''
  });
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
    if (!formData.topic || !formData.experience || !formData.interviewer) {
      toast.error("Please fill in all required fields");
      return;
    }

    const selectedInterviewer = interviewers.find(int => int.id === formData.interviewer);
    
    try{
      const response = await axiosInstance.post(API_PATHS.VAPI.MOCK_INTERVIEW,{
        topic: formData.topic,
        experience: formData.experience,
        agentID: formData.interviewer,
        agentName: selectedInterviewer?.name,
      });

      if (response.data.success && response.data.assistantId) {
        toast.success(`Your ${formData.topic} interview with ${selectedInterviewer?.name || 'AI Interviewer'} has been set up.`);
        navigate(`/mock-interview/${response.data.assistantId}`);
      } else {
        toast.error('Failed to create interview session');
      }
    }catch(err){
      toast.error(err?.response?.data?.error || 'Failed to start mock interview');
      return;
    }
    



  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Side - Professional Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img 
          src="/form.avif" 
          alt="Professional Interview Setting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-zinc-900 border-zinc-800 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-black text-2xl font-bold"><FaRobot/></span>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
              AI Interview Preparation
            </CardTitle>
            <CardDescription className="text-zinc-400 text-lg">
              Set up your personalized mock interview session with our AI experts
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-6">
              {/* Topic Field */}
              <div className="space-y-2">
                <Label htmlFor="topic" className="text-white font-semibold text-base">
                  Interview Topic *
                </Label>
                <Input
                  id="topic"
                  type="text"
                  placeholder="e.g., React Development, System Design, Product Management..."
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-yellow-400 focus:ring-yellow-400 h-12 text-base"
                />
              </div>

              {/* Experience Level */}
              <div className="space-y-2">
                <Label htmlFor="experience" className="text-white font-semibold text-base">
                  Experience Level *
                </Label>
                <Select value={formData.experience} onValueChange={(value) => setFormData({ ...formData, experience: value })}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white focus:border-yellow-400 focus:ring-yellow-400 h-12 text-base">
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    {experienceLevels.map((level) => (
                      <SelectItem 
                        key={level} 
                        value={level}
                        className="text-white focus:bg-zinc-700 focus:text-yellow-400"
                      >
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Interviewer Selection */}
              <div className="space-y-2">
                <Label htmlFor="interviewer" className="text-white font-semibold text-base">
                  Choose Your AI Interviewer *
                </Label>
                <Select value={formData.interviewer} onValueChange={(value) => setFormData({ ...formData, interviewer: value })}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white focus:border-yellow-400 focus:ring-yellow-400 h-12 text-base">
                    <SelectValue placeholder="Select an AI interviewer" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    {interviewers.map((interviewer) => (
                      <SelectItem 
                        key={interviewer.id} 
                        value={interviewer.id}
                        className="text-white focus:bg-zinc-700 focus:text-yellow-400"
                      >
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{interviewer.name}</span>
                          <span className="text-sm text-zinc-400">{interviewer.specialty}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold h-12 text-base transition-all duration-200 shadow-lg hover:shadow-yellow-500/25"
              >
                Start AI Interview Session
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-zinc-800 rounded-lg border border-zinc-700">
              <h3 className="text-yellow-400 font-semibold mb-2">What to expect:</h3>
              <ul className="text-zinc-300 text-sm space-y-1">
                <li>• Personalized questions based on your topic and experience</li>
                <li>• Real-time feedback and suggestions</li>
                <li>• Detailed performance report after completion</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InterviewForm;