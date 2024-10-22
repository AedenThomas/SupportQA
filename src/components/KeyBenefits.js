import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaChartLine, FaClipboardCheck, FaBalanceScale, FaLightbulb } from 'react-icons/fa';

const benefits = [
  { title: "Cut Costs and Scale Your Support QA Coverage With AI", description: "Reduce expenses while expanding your quality assurance capabilities.", icon: FaRobot },
  { title: "Analyse Targeted Samples Based on Custom Rules", description: "Intelligent sampling for more effective quality control.", icon: FaChartLine },
  { title: "Create Tailored Scorecard Based on Your Internal Playbooks", description: "Customize evaluation criteria to match your specific needs.", icon: FaClipboardCheck },
  { title: "Score up to 100% of Your Tickets, Try AI vs Human A/B Testing", description: "Comprehensive evaluation and comparative analysis.", icon: FaBalanceScale },
  { title: "AI-Generated Insights Based on Key Topics, Product Areas, or Customer Service", description: "Gain valuable insights to improve your support processes.", icon: FaLightbulb },
];

const KeyBenefits = () => {
  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">Key Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <benefit.icon className="text-3xl text-blue-500 dark:text-blue-400 mr-4" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{benefit.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyBenefits;