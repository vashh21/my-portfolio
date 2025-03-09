import React from 'react';
import Image from 'next/image';
import heroImage from "@/assets/Vaishnavi.jpg";
import { Twitter, GithubIcon, Linkedin } from 'lucide-react';

const AboutMe: React.FC = () => {
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Vaishnavi Kadam</h1>
            <p className="text-blue-600 dark:text-blue-400 mb-4">@vashh21</p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Hey there, I&apos;m Vaishnavi! I&apos;m a Software Developer who writes clean code, squashes bugs, and occasionally throws in a little chaos—just for fun. With a keen eye for detail and a desire to learn, I&apos;m all about providing high-quality solutions that fulfill both user needs and business objectives.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            AI? Oh, that&apos;s my jam. I geek out on building software that taps into AI magic.
            </p>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="https://github.com/vashh21" target='_blank' className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                <GithubIcon className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/vaishnavi-kadam/" target='_blank' className="text-blue-700 hover:text-blue-800 transition-colors duration-300">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;