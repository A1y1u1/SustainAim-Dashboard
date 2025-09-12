'use client';


const PricingPage = () => {
  return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center mb-8">
        <h2 className="text-gray-500 text-sm uppercase tracking-wide">Our Pricing Plans</h2>
        <h1 className="text-3xl font-bold mt-2">Check Our Pricing Plans</h1>
        <div className="mt-4">
          <span className="text-gray-600 mr-2">Monthly</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
          <span className="text-green-600 ml-2">Yearly <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Save 20%</span></span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
          <h3 className="text-xl font-semibold text-center">Basic Plan</h3>
          <p className="text-3xl text-green-600 font-bold text-center mt-2">$1,499/mo</p>
          <p className="text-center text-gray-600 mt-2">Perfect for small businesses</p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Business Analysis</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Strategic Planning</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> 10 Consulting Hours</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Monthly Report</li>
            <li className="flex items-center"><span className="text-red-500 mr-2">✘</span> Market Research</li>
            <li className="flex items-center"><span className="text-red-500 mr-2">✘</span> Implementation Support</li>
            <li className="flex items-center"><span className="text-red-500 mr-2">✘</span> Dedicated Consultant</li>
          </ul>
          <button className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">Get Started</button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
          <span className="absolute top-0 right-0 bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-tl-lg rotate-45 transform translate-x-4 -translate-y-2">Popular</span>
          <h3 className="text-xl font-semibold text-center">Professional Plan</h3>
          <p className="text-3xl text-green-600 font-bold text-center mt-2">$2,999/mo</p>
          <p className="text-center text-gray-600 mt-2">Ideal for growing companies</p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Business Analysis</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Strategic Planning</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> 25 Consulting Hours</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Weekly Reports</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Market Research</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Implementation Support</li>
            <li className="flex items-center"><span className="text-red-500 mr-2">✘</span> Dedicated Consultant</li>
          </ul>
          <button className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">Get Started</button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
          <h3 className="text-xl font-semibold text-center">Enterprise Plan</h3>
          <p className="text-3xl text-green-600 font-bold text-center mt-2">$4,999/mo</p>
          <p className="text-center text-gray-600 mt-2">For established enterprises</p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Business Analysis</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Strategic Planning</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> 50 Consulting Hours</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Weekly Reports</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Market Research</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Implementation Support</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Dedicated Consultant</li>
          </ul>
          <button className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
