import { useState, useEffect } from 'react';
import { 
  Gavel, 
  Edit, 
  Trash2, 
  TrendingUp,
  Target,
  
} from 'lucide-react';

const BidManagement = () => {
  
  const [activeSubTab, setActiveSubTab] = useState('active-bids');
  const [isMobile, setIsMobile] = useState(false);
  const [bids, setBids] = useState([
    { 
      id: '1', 
      auctionName: 'Royal Pashmina Collection',
      bidder: 'Alexander Wright',
      bidAmount: 275000,
      timestamp: '2024-03-15 14:32:45',
      status: 'Highest Bid',
      lotNumber: 'RPC-2024-001'
    },
    { 
      id: '2', 
      auctionName: 'Antique Walnut Wood Masterpiece',
      bidder: 'Elena Rodriguez',
      bidAmount: 195000,
      timestamp: '2024-03-15 15:45:22',
      status: 'Outbid',
      lotNumber: 'AWM-2024-002'
    },
    { 
      id: '3', 
      auctionName: 'Sozni Embroidery Masterpiece',
      bidder: 'Rajesh Kumar',
      bidAmount: 220000,
      timestamp: '2024-03-15 16:10:11',
      status: 'Active',
      lotNumber: 'SEM-2024-003'
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

  // Delete bid
  const deleteBid = (id: string) => {
    setBids(bids.filter(bid => bid.id !== id));
  };

  const renderTabs = () => (
    <div className={`${isMobile ? 'overflow-x-auto pb-2' : ''}`}>
      <div className={`flex border-b border-gray-700 mb-6 ${isMobile ? 'w-max' : ''}`}>
        <button 
          className={`px-4 py-2 font-medium ${activeSubTab === 'active-bids' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'} transition-colors duration-200`}
          onClick={() => setActiveSubTab('active-bids')}
        >
          Active Bids
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeSubTab === 'bid-analytics' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'} transition-colors duration-200`}
          onClick={() => setActiveSubTab('bid-analytics')}
        >
          Bid Analytics
        </button>
      </div>
    </div>
  );

  const renderActiveBids = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bids.map(bid => (
        <div 
          key={bid.id} 
          className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-300 shadow-lg transform hover:-translate-y-1"
        >
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium text-white">{bid.auctionName}</h3>
              <div className={`px-2 py-1 rounded-full text-xs ${
                bid.status === 'Highest Bid' 
                  ? 'bg-green-900 text-green-300' 
                  : bid.status === 'Outbid'
                  ? 'bg-red-900 text-red-300'
                  : 'bg-indigo-900 text-indigo-300'
              }`}>
                {bid.status}
              </div>
            </div>
            
            <div className="flex flex-col mb-3">
              <div className="text-sm text-gray-400">
                <p className="mb-1">Lot Number: <span className="text-gray-300">{bid.lotNumber}</span></p>
                <p className="mb-1">Bidder: <span className="text-gray-300">{bid.bidder}</span></p>
                <p>Timestamp: <span className="text-gray-300">{bid.timestamp}</span></p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <span className="text-white font-semibold">Bid Amount: <span className="text-indigo-300">₹{bid.bidAmount.toLocaleString()}</span></span>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  className="p-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200 shadow-md"
                >
                  <Edit size={16} />
                </button>
                <button 
                  className="p-2 bg-red-900 text-red-300 rounded-lg hover:bg-red-800 transition-colors duration-200 shadow-md"
                  onClick={() => deleteBid(bid.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderBidAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg hover:border-indigo-600 transition-all duration-300">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h3 className="text-lg font-medium text-white">Bid Performance Analytics</h3>
          <div className="flex items-center">
            <select className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 rounded-lg p-4 shadow-inner">
            <div className="flex items-center mb-3">
              <Gavel size={24} className="text-indigo-400 mr-3" />
              <h4 className="text-white">Total Bids</h4>
            </div>
            <p className="text-2xl font-bold text-white">124</p>
            <p className="text-sm text-green-400">+15% from last month</p>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4 shadow-inner">
            <div className="flex items-center mb-3">
              <TrendingUp size={24} className="text-green-400 mr-3" />
              <h4 className="text-white">Average Bid</h4>
            </div>
            <p className="text-2xl font-bold text-white">₹187,500</p>
            <p className="text-sm text-green-400">Stable</p>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4 shadow-inner">
            <div className="flex items-center mb-3">
              <Target size={24} className="text-purple-400 mr-3" />
              <h4 className="text-white">Winning Bids</h4>
            </div>
            <p className="text-2xl font-bold text-white">42</p>
            <p className="text-sm text-gray-400">Across all auctions</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-white mb-4">Bid Type Distribution</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 rounded-lg p-3 shadow-inner">
              <p className="text-white mb-1">Live Auction Bids</p>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: "58%" }}></div>
              </div>
              <p className="text-indigo-300 mt-1">58%</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-3 shadow-inner">
              <p className="text-white mb-1">Timed Auction Bids</p>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "35%" }}></div>
              </div>
              <p className="text-green-300 mt-1">35%</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-3 shadow-inner">
              <p className="text-white mb-1">Private Auction Bids</p>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: "7%" }}></div>
              </div>
              <p className="text-red-300 mt-1">7%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
        <h3 className="text-lg font-medium mb-4 text-white">Highest Bid Trends</h3>
        <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-400">Bid trend chart will be displayed here</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
        <h3 className="text-lg font-medium mb-4 text-white">Recent Bid Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Auction</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Bidder</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Time</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {bids.map(bid => (
                <tr key={bid.id} className="border-b border-gray-700">
                  <td className="py-3 px-4">{bid.auctionName}</td>
                  <td className="py-3 px-4">{bid.bidder}</td>
                  <td className="py-3 px-4">₹{bid.bidAmount.toLocaleString()}</td>
                  <td className="py-3 px-4">{bid.timestamp}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      bid.status === 'Highest Bid' 
                        ? 'bg-green-900 text-green-300' 
                        : bid.status === 'Outbid'
                        ? 'bg-red-900 text-red-300'
                        : 'bg-indigo-900 text-indigo-300'
                    }`}>
                      {bid.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 relative overflow-hidden">
      
      
      
      
      <div className="flex-1">
       
        
        {/* Dashboard Content */}
        <main className="p-4 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-serif font-light text-gray-100">Bid Management</h2>
            <p className="text-gray-400 mt-1 text-sm md:text-base">Track and analyze bidding activities</p>
          </div>
          
          {/* Tab Navigation */}
          {renderTabs()}
          
          {/* Tab Content */}
          {activeSubTab === 'active-bids' ? renderActiveBids() : renderBidAnalytics()}
        </main>
      </div>
    </div>
  );
};

export default BidManagement;