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
      case "goods-services":
        return <Electricity category="Goods & Services" />;
      case "transportation":
        return <Electricity category="Transportation & Distribution" />;
      case "waste":
        return <Electricity category="Waste" />;
      case "Business Travel":
        return <Electricity category="Business Travel" />;
      case "Employee Commuting":
        return <Electricity category="Employee Commuting" />;
      case "Sold Products":
        return <Electricity category="Sold Products" />;
      case "Other Assets":
        return <Electricity category="Other Assets" />;
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
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Scope 3 Other Indirect Emissions Data</h2>
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
      <nav className="flex space-x-4 md:space-x-6 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 px-6 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
            activeTab === 'goods-services' 
              ? 'text-[#2c7873] font-semibold dark:text-[#2c7873]' 
              : 'border-transparent hover:text-[#2c7873] dark:hover:text-[#2c7873]'
          }`}
          style={{ borderBottomColor: activeTab === 'goods-services' ? '#2c7873' : 'transparent' }}
          onClick={() => handleTabClick('goods-services')}
        >
          <GoodsServicesIcon />
          <span>Goods & Services</span>
        </button>
        <button 
          className={`flex items-center space-x-2 pb-3 border-b-2 transition-all duration-300 ${
            activeTab === 'transportation' 
              ? 'text-[#2c7873] font-semibold dark:text-[#2c7873]' 
              : 'border-transparent hover:text-[#2c7873] dark:hover:text-[#2c7873]'
          }`}
          style={{ borderBottomColor: activeTab === 'transportation' ? '#2c7873' : 'transparent' }}
          onClick={() => handleTabClick('transportation')}
        >
          <TransportationIcon />
          <span>Transportation & Distribution</span>
        </button>
        <button 
          className={`flex items-center space-x-2 pb-3 border-b-2 transition-all duration-300 ${
            activeTab === 'waste' 
              ? 'text-[#2c7873] font-semibold dark:text-[#2c7873]' 
              : 'border-transparent hover:text-[#2c7873] dark:hover:text-[#2c7873]'
          }`}
          style={{ borderBottomColor: activeTab === 'waste' ? '#2c7873' : 'transparent' }}
          onClick={() => handleTabClick('waste')}
        >
          <WasteIcon />
          <span>Waste</span>
        </button>
        <button 
          className={`flex items-center space-x-2 pb-3 border-b-2 transition-all duration-300 ${
            activeTab === 'Business Travel' 
              ? 'text-[#2c7873] font-semibold dark:text-[#2c7873]' 
              : 'border-transparent hover:text-[#2c7873] dark:hover:text-[#2c7873]'
          }`}
          style={{ borderBottomColor: activeTab === 'Business Travel' ? '#2c7873' : 'transparent' }}
          onClick={() => handleTabClick('Business Travel')}
        >
          <BusinessTravelIcon />
          <span>Business Travel</span>
        </button>
        <button 
          className={`flex items-center space-x-2 pb-3 border-b-2 transition-all duration-300 ${
            activeTab === 'Employee Commuting' 
              ? 'text-[#2c7873] font-semibold dark:text-[#2c7873]' 
              : 'border-transparent hover:text-[#2c7873] dark:hover:text-[#2c7873]'
          }`}
          style={{ borderBottomColor: activeTab === 'Employee Commuting' ? '#2c7873' : 'transparent' }}
          onClick={() => handleTabClick('Employee Commuting')}
        >
          <EmployeeCommutingIcon />
          <span>Employee Commuting</span>
        </button>
        <button 
          className={`flex items-center space-x-2 pb-3 border-b-2 transition-all duration-300 ${
            activeTab === 'Sold Products' 
              ? 'text-[#2c7873] font-semibold dark:text-[#2c7873]' 
              : 'border-transparent hover:text-[#2c7873] dark:hover:text-[#2c7873]'
          }`}
          style={{ borderBottomColor: activeTab === 'Sold Products' ? '#2c7873' : 'transparent' }}
          onClick={() => handleTabClick('Sold Products')}
        >
          <SoldProductsIcon />
          <span>Sold Products</span>
        </button>
        <button 
          className={`flex items-center space-x-2 pb-3 border-b-2 transition-all duration-300 ${
            activeTab === 'Other Assets' 
              ? 'text-[#2c7873] font-semibold dark:text-[#2c7873]' 
              : 'border-transparent hover:text-[#2c7873] dark:hover:text-[#2c7873]'
          }`}
          style={{ borderBottomColor: activeTab === 'Other Assets' ? '#2c7873' : 'transparent' }}
          onClick={() => handleTabClick('Other Assets')}
        >
          <OtherAssetsIcon />
          <span>Other Assets</span>
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

const TransportationIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clipRule="evenodd" />
    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
  </svg>
);

const WasteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-recycle">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M12 17l-2 2l2 2" />
    <path d="M10 19h9a2 2 0 0 0 1.75 -2.75l-.55 -1" />
    <path d="M8.536 11l-.732 -2.732l-2.732 .732" />
    <path d="M7.804 8.268l-4.5 7.794a2 2 0 0 0 1.506 2.89l1.141 .024" />
    <path d="M15.464 11l2.732 .732l.732 -2.732" />
    <path d="M18.196 11.732l-4.5 -7.794a2 2 0 0 0 -3.256 -.14l-.591 .976" />
  </svg>
);

const GoodsServicesIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
  </svg>
);

const BusinessTravelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-briefcase">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
    <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
    <path d="M12 12l0 6" />
    <path d="M3 13l18 0" />
  </svg>
);

const EmployeeCommutingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-users">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
  </svg>
);

const SoldProductsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M17 17h-11v-14h-2" />
    <path d="M6 5l14 1l-1 7h-13" />
  </svg>
);

const OtherAssetsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-building-skyscraper">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M3 21l18 0" />
    <path d="M5 21v-14a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v14" />
    <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
    <path d="M10 9l0 .01" />
    <path d="M14 9l0 .01" />
    <path d="M10 12l0 .01" />
    <path d="M14 12l0 .01" />
    <path d="M10 15l0 .01" />
    <path d="M14 15l0 .01" />
  </svg>
);

export default BasicTableOne;