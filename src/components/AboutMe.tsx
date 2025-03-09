"use client"; // ✅ Added this to make it a Client Component

import React, { useState } from "react";
import Image from "next/image";
import heroImage from "@/assets/Vaishnavi.jpg";
import { GithubIcon, Linkedin } from "lucide-react";
import { FaFilePdf, FaTimes } from "react-icons/fa";

const AboutMe: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl md:col-span-3 lg:col-span-4">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <Image
            src={heroImage}
            alt="Vaishnavi's profile picture"
            className="rounded-full shadow-md h-32 w-32 object-cover object-center ring-4 ring-blue-500 dark:ring-blue-400"
          />
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Vaishnavi Kadam
            </h1>
            <p className="text-blue-600 dark:text-blue-400 mb-4">@vashh21</p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Hey there, I&apos;m Vaishnavi! I&apos;m a Software Developer who writes clean code, 
              squashes bugs, and occasionally throws in a little chaos—just for fun. 
              With a keen eye for detail and a desire to learn, I&apos;m all about providing 
              high-quality solutions that fulfill both user needs and business objectives.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              AI? Oh, that&apos;s my jam. I geek out on building software that taps into AI magic.
            </p>

            {/* Social Icons & Resume Button */}
            <div className="flex justify-center sm:justify-start space-x-4">
              <a
                href="https://github.com/vashh21"
                target="_blank"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
              >
                <GithubIcon className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/vaishnavi-kadam/"
                target="_blank"
                className="text-blue-700 hover:text-blue-800 transition-colors duration-300"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              {/* Resume Button - Opens Modal */}
              <button onClick={() => setIsResumeOpen(true)} title="View Resume">
                <FaFilePdf className="w-6 h-6 text-red-600 hover:text-red-800 transition duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Modal */}
      {isResumeOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-lg w-4/5 h-4/5 relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-700 dark:text-gray-300 hover:text-red-500 transition"
              onClick={() => setIsResumeOpen(false)}
            >
              <FaTimes size={24} />
            </button>

            {/* Resume Viewer */}
            <iframe
              src="/resume.pdf" // 🔹 Ensure your resume is placed in the `public/` directory
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutMe;
