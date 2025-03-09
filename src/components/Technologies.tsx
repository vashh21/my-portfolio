import React from 'react';
import { 
  Code, 
  FileJson, 
  Atom, 
  Zap, 
  Palette, 
  Globe, 
  BarChart, 
  Server, 
  FileCode, 
  Database, 
  Table, 
  GitBranch, 
  Github, 
  GitCommit, 
  Container, 
  Terminal, 
  Rocket, 
  Bot, 
  Cloud,
  Lock,
  BarChart2,
  Brain,
  Search,
  Link
} from 'lucide-react';

const skills = [
  { icon: <Code />, name: "Python" },
  { icon: <Database />, name: "SQL" },
  { icon: <FileJson />, name: "JavaScript" },
  { icon: <Table />, name: "MongoDB" },
  { icon: <Table />, name: "MySQL" },
  { icon: <Atom />, name: "React.js" },
  { icon: <Zap />, name: "Node.js" },
  { icon: <FileJson />, name: "TypeScript" },
  { icon: <Zap />, name: "Next.js" },
  { icon: <Cloud />, name: "Google Cloud (Cloud Run, GKE, GCS)" },
  { icon: <Server />, name: "AWS" },
  { icon: <Search />, name: "ElasticSearch" },
  { icon: <Container />, name: "Docker" },
  { icon: <Server />, name: "Firebase" },
  { icon: <Lock />, name: "Google OAuth" },
  { icon: <BarChart />, name: "Pandas" },
  { icon: <BarChart2 />, name: "NumPy" }, 
  { icon: <Brain />, name: "Scikit-learn" },
  { icon: <Brain />, name: "TensorFlow" },
  { icon: <Search />, name: "Predictive Modeling" },
  { icon: <Search />, name: "Exploratory Data Analysis (EDA)" },
  { icon: <Cloud />, name: "Statistical Analysis" },
  { icon: <FileCode />, name: "Google Speech-to-Text" },
  { icon: <FileCode />, name: "OpenAI Whisper" },
  { icon: <Bot />, name: "OpenAI API" },
  { icon: <Link />, name: "Langchain" },
  { icon: <GitBranch />, name: "Git" },
  { icon: <Github />, name: "GitHub" },
  { icon: <Terminal />, name: "VS Code" },
  { icon: <Cloud />, name: "Figma" },
  { icon: <Palette />, name: "CSS" },
  { icon: <Palette />, name: "Tailwind CSS" },
  { icon: <FileCode />, name: "Java" },
  { icon: <FileCode />, name: "PHP" }
];


const Technologies: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg md:col-span-2 lg:col-span-3 transition-all duration-300 hover:shadow-xl flex-grow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">Technologies</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {skills.map((skill, index) => (
          <li 
            key={index}
            className="flex flex-col items-center p-4 rounded-lg bg-gray-100 dark:bg-gray-700 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105 transform"
          >
            <div className="text-gray-600 dark:text-gray-300 mb-2">
              {React.cloneElement(skill.icon, { size: 24 })}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">{skill.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Technologies;