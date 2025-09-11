"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import Electricity from './components/Electricity';

const BasicTableOne: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "all":
        return <Electricity category="all" />;
      case "fossil-fuel":
        return <Electricity category="Fossil Fuel" />;
      case "fugitives":
        return <Electricity category="Fugitives" />;
      case "process":
        return <Electricity category="Process" />;
      default:
        return <Electricity category="all" />;
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      {/* Header */}
      <header className="flex items-center justify-between p-6" style={{ borderBottomColor: "#2c7873" }}>
        <div className="flex items-center space-x-4">
          <Image
            alt="Company logo, square with text 'Logo' placeholder" 
            className="w-12 h-12 object-contain rounded-lg border border-gray-200 dark:border-gray-600 transition-transform hover:scale-105" 
            height={48}
            src="https://storage.googleapis.com/a1aa/image/ba27555c-cef3-4940-540a-d8814276f2f8.jpg" 
            width={48}
          />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Scope 1 Emissions Data</h2>
        </div>
        <div className="flex items-center space-x-4">
          <Image
            alt="User profile logo, circular placeholder with text 'User'" 
            className="w-12 h-12 rounded-full object-cover border-2 border-[#2c7873] transition-transform hover:scale-105" 
            height={48}
            src="https://storage.googleapis.com/a1aa/image/766fb262-57f9-4a4a-2fbf-f5aa194ba043.jpg" 
            width={48}
          />
        </div>
      </header>
      
      {/* Navigation Tabs */}
      <nav className="flex space-x-8 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 px-6">
        <button 
          className={`flex items-center space-x-2 pb-3 border-b-2 transition-all duration-300 ${
            activeTab === 'all' 
              ? 'text-[#2c7873] font-semibold dark:text-[#2c7873]' 
              : 'border-transparent hover:text-[#2c7873] dark:hover:text-[#2c7873]'
          }`}
          style={{ borderBottomColor: activeTab === 'all' ? '#2c7873' : 'transparent' }}
          onClick={() => handleTabClick('all')}
        >
          <AllIcon />
          <span>All</span>
        </button>
        <button 
          className={`flex items-center space-x-2 pb-3 border-b-2 transition-all duration-300 ${
            activeTab === 'fossil-fuel' 
              ? 'text-[#2c7873] font-semibold dark:text-[#2c7873]' 
              : 'border-transparent hover:text-[#2c7873] dark:hover:text-[#2c7873]'
          }`}
          style={{ borderBottomColor: activeTab === 'fossil-fuel' ? '#2c7873' : 'transparent' }}
          onClick={() => handleTabClick('fossil-fuel')}
        >
          <FossilFuelIcon /> 
          <span>Fossil Fuel</span>
        </button>
        <button 
          className={`flex items-center space-x-2 pb-3 border-b-2 transition-all duration-300 ${
            activeTab === 'fugitives' 
              ? 'text-[#2c7873] font-semibold dark:text-[#2c7873]' 
              : 'border-transparent hover:text-[#2c7873] dark:hover:text-[#2c7873]'
          }`}
          style={{ borderBottomColor: activeTab === 'fugitives' ? '#2c7873' : 'transparent' }}
          onClick={() => handleTabClick('fugitives')}
        >
          <FugitivesIcon />
          <span>Fugitives</span>
        </button>
        <button 
          className={`flex items-center space-x-2 pb-3 border-b-2 transition-all duration-300 ${
            activeTab === 'process' 
              ? 'text-[#2c7873] font-semibold dark:text-[#2c7873]' 
              : 'border-transparent hover:text-[#2c7873] dark:hover:text-[#2c7873]'
          }`}
          style={{ borderBottomColor: activeTab === 'process' ? '#2c7873' : 'transparent' }}
          onClick={() => handleTabClick('process')}
        >
          <FugitivesIcon />
          <span>Process Emission</span>
        </button>
      </nav>

      {/* Tab Content */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

// Icon Components (replacing Font Awesome icons with SVG)
const AllIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-grid-3x2-gap-fill" viewBox="0 0 16 16">
  <path d="M1 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"/>
 </svg>
);


const FossilFuelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-gas-station">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M3 21a1 1 0 0 1 0 -2v-13a3 3 0 0 1 3 -3h6a3 3 0 0 1 3 3v4a3 3 0 0 1 3 3v3a.5 .5 0 1 0 1 0v-6a2 2 0 0 1 -2 -2v-.585l-.707 -.708a1 1 0 0 1 -.083 -1.32l.083 -.094a1 1 0 0 1 1.414 0l3.003 3.002l.095 .112l.028 .04l.044 .073l.052 .11l.031 .09l.02 .076l.012 .078l.008 .126v7a2.5 2.5 0 1 1 -5 0v-3a1 1 0 0 0 -1 -1v7a1 1 0 0 1 0 2zm9 -16h-6a1 1 0 0 0 -1 1v4h8v-4a1 1 0 0 0 -1 -1" />
  </svg>
);

const FugitivesIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414L15 8.414V14a1 1 0 11-2 0v-2H9a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8.414l1.293 1.293a1 1 0 001.414-1.414L13.414 6H8z" />
  </svg>
);


export default BasicTableOne;