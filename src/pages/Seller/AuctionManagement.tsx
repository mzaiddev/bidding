import  { useState, useEffect } from 'react';
import { 
  Gavel, 
  Wallet, 
  
  Edit, 
  Trash2, 
  BarChart,
  
  PlusCircle,
  Calendar
} from 'lucide-react';

const AuctionManagement = () => {
  const [activeSubTab, setActiveSubTab] = useState('active-auctions');
  const [isMobile, setIsMobile] = useState(false);
  const [auctions, setAuctions] = useState([
    { 
      id: '1', 
      name: 'Royal Pashmina Collection', 
      type: 'Live',
      startDate: '2024-03-15',
      endDate: '2024-03-22',
      currentBid: 250000,
      status: 'In Progress',
      totalBids: 24
    },
    { 
      id: '2', 
      name: 'Antique Walnut Wood Masterpiece', 
      type: 'Timed',
      startDate: '2024-03-20',
      endDate: '2024-04-05',
      currentBid: 180000,
      status: 'Upcoming',
      totalBids: 12
    },
    { 
      id: '3', 
      name: 'Kashmir Valley Carpet Collection', 
      type: 'Live',
      startDate: '2024-03-25',
      endDate: '2024-04-01',
      currentBid: 320000,
      status: 'Upcoming',
      totalBids: 0
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

  // Delete auction
  const deleteAuction = (id: string) => {
    setAuctions(auctions.filter(auction => auction.id !== id));
  };

  const renderTabs = () => (
    <div className={`${isMobile ? 'overflow-x-auto pb-2' : ''}`}>
      <div className={`flex border-b border-gray-700 mb-6 ${isMobile ? 'w-max' : ''}`}>
        <button 
          className={`px-4 py-2 font-medium ${activeSubTab === 'active-auctions' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveSubTab('active-auctions')}
        >
          Active Auctions
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeSubTab === 'create-auction' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveSubTab('create-auction')}
        >
          Create New Auction
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeSubTab === 'auction-analytics' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveSubTab('auction-analytics')}
        >
          Auction Analytics
        </button>
      </div>
    </div>
  );

  const renderActiveAuctions = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {auctions.map(auction => (
        <div 
          key={auction.id} 
          className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-300 shadow-lg transform hover:-translate-y-1"
        >
          <div className="h-48 bg-gray-700 flex items-center justify-center">
            <Gavel size={64} className="text-gray-500" />
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium text-white">{auction.name}</h3>
              <div className={`px-2 py-1 rounded-full text-xs ${
                auction.status === 'In Progress' 
                  ? 'bg-green-900 text-green-300' 
                  : auction.status === 'Upcoming'
                  ? 'bg-indigo-900 text-indigo-300'
                  : 'bg-gray-900 text-gray-300'
              }`}>
                {auction.status}
              </div>
            </div>
            
            <div className="text-sm text-gray-400 mb-3">
              <p>Auction Type: {auction.type}</p>
              <div className="flex items-center mt-1">
                <Calendar size={14} className="mr-1" />
                <span>Start: {auction.startDate}</span>
              </div>
              <div className="flex items-center mt-1">
                <Calendar size={14} className="mr-1" />
                <span>End: {auction.endDate}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <span className="text-white font-semibold">Current Bid: ₹{auction.currentBid.toLocaleString()}</span>
                <p className="text-gray-400 text-sm">Total Bids: {auction.totalBids}</p>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  className="p-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200 shadow-md"
                >
                  <Edit size={16} />
                </button>
                <button 
                  className="p-2 bg-red-900 text-red-300 rounded-lg hover:bg-red-800 transition-colors duration-200 shadow-md"
                  onClick={() => deleteAuction(auction.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Add Auction Card */}
      <div 
        className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-300 shadow-lg transform hover:-translate-y-1 flex items-center justify-center cursor-pointer"
        onClick={() => setActiveSubTab('create-auction')}
      >
        <div className="text-center p-8">
          <div className="flex justify-center mb-4">
            <PlusCircle size={48} className="text-indigo-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">Create New Auction</h3>
          <p className="text-gray-400 text-sm">Set up a new auction for your luxury items</p>
        </div>
      </div>
    </div>
  );

  const renderCreateAuctionForm = () => (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg hover:border-indigo-600 transition-all duration-300">
      <h3 className="text-lg font-medium mb-6 text-white">Create New Auction</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Auction Name</label>
          <input 
            type="text" 
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter auction name"
          />
        </div>
        
        <div>
          <label className="block text-gray-400 text-sm mb-2">Auction Type</label>
          <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
            <option>Live</option>
            <option>Timed</option>
          </select>
        </div>
        
        <div>
          <label className="block text-gray-400 text-sm mb-2">Description</label>
          <textarea 
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Describe your auction in detail..."
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Start Date</label>
            <input 
              type="date" 
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-400 text-sm mb-2">End Date</label>
            <input 
              type="date" 
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Starting Bid (₹)</label>
            <input 
              type="number" 
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter starting bid amount"
            />
          </div>
          
          <div>
            <label className="block text-gray-400 text-sm mb-2">Reserve Price (₹)</label>
            <input 
              type="number" 
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter reserve price (optional)"
            />
          </div>
        </div>
        
        <div className="mt-6 p-4 border border-dashed border-gray-600 rounded-lg text-center hover:border-indigo-500 transition-colors duration-200 cursor-pointer">
          <div className="flex flex-col items-center">
            <BarChart size={36} className="text-gray-500 mb-2" />
            <p className="text-gray-300 text-sm">Click to add items to this auction</p>
            <p className="text-gray-500 text-xs mt-1">You can select multiple items from your inventory</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4 mt-6">
          <button 
            className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            onClick={() => setActiveSubTab('active-auctions')}
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md">
            Create Auction
          </button>
        </div>
      </div>
    </div>
  );

  const renderAuctionAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg hover:border-indigo-600 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Total Live Auctions</h3>
            <div className="p-2 bg-indigo-900/50 rounded-full">
              <Gavel size={20} className="text-indigo-300" />
            </div>
          </div>
          <p className="text-3xl font-semibold text-white">2</p>
          <p className="text-green-400 text-sm mt-2">↑ 25% from last month</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg hover:border-indigo-600 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Total Bids</h3>
            <div className="p-2 bg-indigo-900/50 rounded-full">
              <BarChart size={20} className="text-indigo-300" />
            </div>
          </div>
          <p className="text-3xl font-semibold text-white">36</p>
          <p className="text-green-400 text-sm mt-2">↑ 12% from last month</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg hover:border-indigo-600 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Avg. Final Price</h3>
            <div className="p-2 bg-indigo-900/50 rounded-full">
              <Wallet size={20} className="text-indigo-300" />
            </div>
          </div>
          <p className="text-3xl font-semibold text-white">₹215,000</p>
          <p className="text-green-400 text-sm mt-2">↑ 18% from last month</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
        <h3 className="text-lg font-medium mb-6 text-white">Auction Performance</h3>
        <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-400">Auction performance chart will be displayed here</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
        <h3 className="text-lg font-medium mb-6 text-white">Recent Completed Auctions</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Auction</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Final Price</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Total Bids</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-700">
              <td className="py-3 px-4">Antique Silver Tea Set</td>
              <td className="py-3 px-4">Live</td>
              <td className="py-3 px-4">Feb 28, 2024</td>
              <td className="py-3 px-4">₹225,000</td>
              <td className="py-3 px-4">32</td>
            </tr>
            <tr>
              <td className="py-3 px-4">Kashmir Paisley Collection</td>
              <td className="py-3 px-4">Timed</td>
              <td className="py-3 px-4">Feb 15, 2024</td>
              <td className="py-3 px-4">₹205,000</td>
              <td className="py-3 px-4">28</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeSubTab) {
      case 'active-auctions':
        return renderActiveAuctions();
      case 'create-auction':
        return renderCreateAuctionForm();
      case 'auction-analytics':
        return renderAuctionAnalytics();
      default:
        return renderActiveAuctions();
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 relative overflow-hidden">
      
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        
        
        {/* Dashboard Content */}
        <main className="p-4 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-serif font-light text-gray-100">Auction Management</h2>
            <p className="text-gray-400 mt-1 text-sm md:text-base">Manage and track your luxury craft auctions</p>
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

export default AuctionManagement;