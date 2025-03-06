import  { useState, useEffect } from 'react';
import {  
  CreditCard, 
  Download, 
  Upload, 
  TrendingUp,
  DollarSign,
} from 'lucide-react';

const WalletComponent = () => {
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [isMobile, setIsMobile] = useState(false);
  const [transactions,] = useState([
    { 
      id: '1', 
      type: 'Auction Sale',
      description: 'Royal Pashmina Collection',
      amount: 275000,
      date: '2024-03-15',
      status: 'Completed'
    },
    { 
      id: '2', 
      type: 'Withdrawal',
      description: 'Bank Transfer',
      amount: -50000,
      date: '2024-03-10',
      status: 'Processed'
    },
    { 
      id: '3', 
      type: 'Auction Sale',
      description: 'Walnut Wood Masterpiece',
      amount: 195000,
      date: '2024-03-05',
      status: 'Completed'
    },
    { 
      id: '4', 
      type: 'Commission Fee',
      description: 'Platform Commission',
      amount: -12500,
      date: '2024-03-05',
      status: 'Processed'
    }
  ]);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderTabs = () => (
    <div className={`${isMobile ? 'overflow-x-auto pb-2' : ''}`}>
      <div className={`flex border-b border-gray-700 mb-6 ${isMobile ? 'w-max' : ''}`}>
        <button 
          className={`px-4 py-2 font-medium ${activeSubTab === 'overview' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'} transition-colors duration-200`}
          onClick={() => setActiveSubTab('overview')}
        >
          Wallet Overview
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeSubTab === 'transactions' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'} transition-colors duration-200`}
          onClick={() => setActiveSubTab('transactions')}
        >
          Transaction History
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeSubTab === 'payment-methods' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'} transition-colors duration-200`}
          onClick={() => setActiveSubTab('payment-methods')}
        >
          Payment Methods
        </button>
      </div>
    </div>
  );

  const renderWalletOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg hover:border-indigo-600 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <DollarSign size={24} className="text-green-400 mr-3" />
              <h3 className="text-white text-lg font-medium">Total Balance</h3>
            </div>
            <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded-full">Active</span>
          </div>
          <div className="text-3xl font-bold text-white mb-2">₹4,250,000</div>
          <p className="text-green-400">+18% from last month</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg hover:border-indigo-600 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Upload size={24} className="text-indigo-400 mr-3" />
              <h3 className="text-white text-lg font-medium">Total Withdrawn</h3>
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">₹850,000</div>
          <p className="text-gray-400">Last withdrawal: ₹50,000</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg hover:border-indigo-600 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <TrendingUp size={24} className="text-purple-400 mr-3" />
              <h3 className="text-white text-lg font-medium">Pending Earnings</h3>
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-2">₹620,000</div>
          <p className="text-yellow-400">From ongoing auctions</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
        <h3 className="text-lg font-medium text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-lg flex items-center justify-center transition-colors duration-200 shadow-md">
            <Upload size={20} className="mr-2" />
            Withdraw Funds
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-lg flex items-center justify-center transition-colors duration-200">
            <Download size={20} className="mr-2" />
            Download Statement
          </button>
        </div>
      </div>

      {/* Monthly Earnings Chart */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-white">Monthly Earnings</h3>
          <div className="flex items-center">
            <select className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
              <option>All Time</option>
            </select>
          </div>
        </div>
        <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-400">Monthly earnings chart will be displayed here</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">Recent Transactions</h3>
          <button 
            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors duration-200"
            onClick={() => setActiveSubTab('transactions')}
          >
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="p-3 text-left text-gray-400 font-medium">Date</th>
                <th className="p-3 text-left text-gray-400 font-medium">Type</th>
                <th className="p-3 text-right text-gray-400 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 3).map(transaction => (
                <tr key={transaction.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-200">
                  <td className="p-3 text-gray-300">{transaction.date}</td>
                  <td className="p-3 text-white">{transaction.description}</td>
                  <td className={`p-3 text-right font-medium ${
                    transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''} ₹{Math.abs(transaction.amount).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTransactionHistory = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <h3 className="text-lg font-medium text-white">Transaction History</h3>
          <div className="flex flex-col md:flex-row gap-2">
            <input 
              type="text" 
              placeholder="Search transactions..." 
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="p-3 text-left text-gray-400 font-medium">Date</th>
                <th className="p-3 text-left text-gray-400 font-medium">Type</th>
                <th className="p-3 text-left text-gray-400 font-medium">Description</th>
                <th className="p-3 text-right text-gray-400 font-medium">Amount</th>
                <th className="p-3 text-left text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-200">
                  <td className="p-3 text-gray-300">{transaction.date}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      transaction.type === 'Auction Sale' 
                        ? 'bg-green-900 text-green-300' 
                        : transaction.type === 'Withdrawal'
                        ? 'bg-indigo-900 text-indigo-300'
                        : 'bg-red-900 text-red-300'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="p-3 text-white">{transaction.description}</td>
                  <td className={`p-3 text-right font-medium ${
                    transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''} ₹{Math.abs(transaction.amount).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      transaction.status === 'Completed' 
                        ? 'bg-green-900 text-green-300' 
                        : 'bg-yellow-900 text-yellow-300'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-400">
            Showing 4 of 28 transactions
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-200">1</button>
            <button className="px-3 py-1 rounded-lg hover:bg-gray-700 transition-colors duration-200">2</button>
            <button className="px-3 py-1 rounded-lg hover:bg-gray-700 transition-colors duration-200">3</button>
            <button className="px-3 py-1 rounded-lg hover:bg-gray-700 transition-colors duration-200">...</button>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
        <h3 className="text-lg font-medium text-white mb-4">Transaction Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 rounded-lg p-4 shadow-inner">
            <h4 className="text-gray-300 mb-2">Total Income</h4>
            <p className="text-2xl font-semibold text-green-400">₹5,120,000</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4 shadow-inner">
            <h4 className="text-gray-300 mb-2">Total Expenses</h4>
            <p className="text-2xl font-semibold text-red-400">₹870,000</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4 shadow-inner">
            <h4 className="text-gray-300 mb-2">Net Profit</h4>
            <p className="text-2xl font-semibold text-white">₹4,250,000</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentMethods = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-white">Payment Methods</h3>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-md">
            Add Payment Method
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl p-4 shadow-lg">
            <div className="flex justify-between items-start mb-6">
              <CreditCard size={32} className="text-indigo-300" />
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-white text-xs">Default</span>
            </div>
            <p className="text-gray-300 mb-1">HDFC Bank</p>
            <p className="text-white text-lg mb-4">•••• •••• •••• 4242</p>
            <div className="flex justify-between">
              <p className="text-gray-300 text-sm">Exp: 05/27</p>
              <button className="text-indigo-300 hover:text-indigo-200 text-sm transition-colors duration-200">
                Edit
              </button>
            </div>
          </div>

          <div className="bg-gray-700 rounded-xl p-4 border border-dashed border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors duration-200">
            <CreditCard size={32} className="text-gray-500 mb-3" />
            <p className="text-gray-300">Add New Payment Method</p>
            <p className="text-gray-500 text-sm mt-1">Bank Account or Credit Card</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
        <h3 className="text-lg font-medium text-white mb-4">Withdrawal Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Default Withdrawal Method</label>
            <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
              <option>HDFC Bank (•••• 4242)</option>
              <option>Add new method</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Automatic Withdrawal</label>
            <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
              <option>Manual</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Minimum Withdrawal Amount</label>
            <input 
              type="text" 
              value="₹10,000" 
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Withdraw Earnings After</label>
            <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
              <option>Auction Completion</option>
              <option>Product Delivery</option>
              <option>Customer Confirmation</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 shadow-md">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeSubTab) {
      case 'overview':
        return renderWalletOverview();
      case 'transactions':
        return renderTransactionHistory();
      case 'payment-methods':
        return renderPaymentMethods();
      default:
        return renderWalletOverview();
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 relative overflow-hidden">
     
      {/* Main Content */}
      <div className="flex-1">
        
        {/* Dashboard Content */}
        <main className="p-4 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-serif font-light text-gray-100">Wallet Management</h2>
            <p className="text-gray-400 mt-1 text-sm md:text-base">Track your earnings and financial activities</p>
          </div>
          
          {/* Tab Navigation */}
          {renderTabs()}
          
          {/* Tab Content */}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default WalletComponent;