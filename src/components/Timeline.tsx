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
    description: 'Served as Editor at TechNews, the official student newspaper of Illinois Tech, where I edited articles, managed content workflows, and coordinated with writers to publish weekly issues. Nominated for Business Manager and PR Chair for taking initiative in team organization and publication planning.',
    skills: ['Machine Learning', 'Big Data Technologies', 'Software Project Management', 'Data Preparation and Analysis', 'Science of Programming', 'Mobile Application Development']
  },
  {
    type: 'education',
    title: 'Bachelor of Engineering in Information Technology',
    organization: 'Shah & Anchor Kutchhi Engineering College, University of Mumbai',
    date: ' Jul 2020 – May 2023',
    description: 'As Technical Head, I turned a blind coding event into a campus sensation—marketing it so well that 100+ participants signed up to debug blind, all thanks to some strategic persuasion and hype!',
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
    title: 'Full Stack Developer Intern',
    organization: 'Find Me LLC',
    date: 'Jun 2025 - Sep 2025 · 4 months',
    location: 'Chicago, IL',
    description: 'Built and deployed scalable full stack features including machine learning integration, backend APIs, and responsive UI, while optimizing database performance, implementing third-party services, and enhancing system reliability in a startup environment.', 
    skills: ['Machine Learning Integration', 'Backend API Development', 'Responsive Frontend Engineering', 'Database Design and Optimization', 'Third-Party API Integration']
  },
  {
    type: 'experience',
    title: 'Software Web Developer Intern',
    organization: 'Skyline Innovation Inc',
    date: 'Jun 2024 - Aug 2024 · 3 months',
    location: 'Chicago, IL',
    description: 'Engineered and deployed a real-time speech processing system using OpenAI Whisper, Google Speech-to-Text, and LLMs, improving transcription accuracy by 45% and reducing recognition errors by 50%, in preparation for large-scale validation with 10,000 Parkinson’s UK participants.', 
    skills: ['API Integration', 'Backend System Design', 'AI/ML Model Deployment', 'Scalable Feature Engineering', 'Chatbot System Development']
  },
  {
    type: 'experience',
    title: 'Full-Stack Developer Intern',
    organization: 'Mauli Tablet Tools LLP',
    date: 'Aug 2021 - May 2022 · 10 months',
    location: 'Mumbai, India',
    description: 'Built and deployed full-stack web features including chatbot support and dynamic client registration using modern frameworks, contributed to backend logic and integrations, and enforced testing and documentation standards to support scalable system design.',
    skills: ['Full-Stack Web Development', 'API & Feature Integration', 'Backend Engineering', 'Testing and Deployment', 'Cross-Functional Collaboration']
  },
  {
    type: 'experience',
    title: 'Software Developer Intern',
    organization: ' Digicable Network India Pvt Ltd',
    date: 'May 2019 - Apr 2020 · 1 year',
    location: 'Mumbai, India',
    description: 'Designed and implemented backend automation tools using Python and Node.js to validate metadata across 300+ satellite feeds and deploy configuration workflows for 500+ digital TV channels, improving system reliability and reducing deployment time by 40%.',
    skills: ['Backend Development', 'Script Optimization', 'Process Automation', 'System Integration', 'Deployment Engineering']
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
