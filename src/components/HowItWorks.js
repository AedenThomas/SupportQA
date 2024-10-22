// src/components/HowItWorks.js
import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    { title: "Seamless Integration", description: "Connect your help desk effortlessly" },
    { title: "Intelligent Customization", description: "Tailor evaluations to your needs" },
    { title: "Insightful Analysis", description: "Gain actionable performance insights" },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 dark:text-white">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between items-start space-y-12 md:space-y-0 md:space-x-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex-1 text-center"
            >
              <div className="bg-blue-500 dark:bg-blue-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold">{index + 1}</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 dark:text-white">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
