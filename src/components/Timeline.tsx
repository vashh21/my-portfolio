import React from 'react';

interface TimelineItem {
  type: 'education' | 'experience';
  title: string;
  organization: string;
  date: string;
  location?: string;
  description?: string;
  skills?: string[];
}

const educationItems: TimelineItem[] = [
  {
    type: 'education',
    title: 'Master\'s in Computer Science',
    organization: 'Illinois Institute of Technology',
    date: 'Aug 2023 - May 2025',
    description: '',
    skills: ['Machine Learning', 'Big Data Technologies', 'Software Project Management', 'Data Preparation and Analysis', 'Science of Programming', 'Mobile Application Development']
  },
  {
    type: 'education',
    title: 'Bachelor of Engineering in Information Technology',
    organization: 'Shah & Anchor Kutchhi Engineering College, University of Mumbai',
    date: ' Jul 2020 – May 2023',
    description: '"As Technical Head, I turned a blind coding event into a campus sensation—marketing it so well that 100+ participants signed up to debug blind, all thanks to some strategic persuasion and hype!',
    skills: ['Artificial Intelligence & Data Science', 'Software Engineering', 'Database Management Systems (DBMS)', 'Internet Programming & Cloud Computing']
  },
  {
    type: 'education',
    title: 'Diploma in Computer Engineering',
    organization: 'Vidyalankar Polytechnic',
    date: ' Jul 2017 – May 2020',
    description: 'Headed Techshala, a student-led organization hosting state-level project exhibitions, robotics battles, blind coding, and more—managed 500+ participants while fueling innovation (and probably running on caffeine)!',
    skills: ['Python Programming', 'Data Structures & Algorithms', 'Object-Oriented Programming (OOP) Using C++', 'Operating Systems', 'SQL']
  }
];

const experienceItems: TimelineItem[] = [
  {
    type: 'experience',
    title: ' Software Web Developer Intern',
    organization: ' Skyline Innovation Inc',
    date: 'Jun 2024 - Aug 2024 · 3 months',
    location: 'Chicago, IL',
    description: 'Engineered an AI-driven speech therapy system using Whisper, Google Speech-to-Text, ChatGPT, and PRAAT, achieving 45% clarity improvement and preparing for large-scale validation with 10,000+ Parkinson’s UK participants.', 
    skills: ['Automatic Speech Recognition (ASR)', 'AI and NLP', 'Speech Analysis']
  },
  {
    type: 'experience',
    title: 'Full Stack Development Intern',
    organization: 'Mauli Tablet Tools LLP',
    date: 'Aug 2021 - Feb 2022 · 6 months',
    location: 'Mumbai, India',
    description: 'Developed full-stack web apps using React & Node.js, boosting user engagement by 40% with real-time chat, integrating an SMTP-based email system, and resolving 20+ critical bugs in Scrum-managed sprints to optimize performance.',
    skills: ['Chatbot', 'Email System Integration', 'Database Management']
  },
  {
    type: 'experience',
    title: 'Data Analyst Intern',
    organization: ' Digicable Network India Pvt Ltd',
    date: 'May 2019 - Jun 2019 · 3 months',
    location: 'Mumbai, India',
    description: 'Optimized content acquisition and viewership strategies using Python, SQL, and machine learning, improving deals by 15% and profit margins by 10% through predictive modeling and data-driven decision-making.',
    skills: ['Statistical Modeling', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Tableau', 'Market Research & Consumer Insights']
  }
];
const TimelineItem: React.FC<{ item: TimelineItem }> = ({ item }) => (
  <div className="mb-8 relative">
    <div className="absolute top-0 left-0 w-2 h-full bg-gray-200 dark:bg-gray-700" />
    <div className="ml-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="absolute left-0 top-4 w-6 h-6 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{item.organization}</p>
      <p className="text-sm text-gray-500 dark:text-gray-500">{item.date}</p>
      {item.location && (
        <p className="text-sm text-gray-500 dark:text-gray-500">{item.location}</p>
      )}
      {item.description && (
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{item.description}</p>
      )}
      {item.skills && (
        <div className="mt-2 flex flex-wrap gap-2">
          {item.skills.map((skill, index) => (
            <span key={index} className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  </div>
);

const Timeline: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Timeline</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Experience</h2>
          {experienceItems.map((item, index) => (
            <TimelineItem key={index} item={item} />
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Education</h2>
          {educationItems.map((item, index) => (
            <TimelineItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;