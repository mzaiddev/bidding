import { useState, useEffect } from 'react';
import { Search,} from 'lucide-react';

const BiddingManagementDashboard = () => {
  const [activeSubTab, setActiveSubTab] = useState('current');
  const [isMobile, setIsMobile] = useState(false);
  
  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Sample data
  const currentBids = [
    { id: 1, title: "18th Century Sozni Shawl", yourBid: 24500, currentBid: 24500, status: "Highest Bidder", endTime: "1h 24m", image: "/api/placeholder/400/250" },
    { id: 2, title: "Antique Walnut Wood Samovar", yourBid: 15500, currentBid: 18750, status: "Outbid", endTime: "2h 45m", image: "/api/placeholder/400/250" }
  ];
  
  const bidHistory = [
    { id: 1, title: "18th Century Sozni Shawl", bidAmount: 24500, bidDate: "Feb 24, 2025", status: "Active" },
    { id: 2, title: "Antique Walnut Wood Samovar", bidAmount: 15500, bidDate: "Feb 23, 2025", status: "Outbid" }
  ];
  
  const wonAuctions = [
    { id: 3, title: "Handcrafted Pashmina Stole", finalBid: 18200, wonDate: "Feb 20, 2025", status: "Payment Pending", image: "/api/placeholder/400/250" }
  ];
  
  const lostAuctions = [
    { id: 5, title: "Rare Kashmir Valley Carpet", yourBid: 82000, finalBid: 95000, lostDate: "Feb 18, 2025", image: "/api/placeholder/400/250" }
  ];
  
  const buyNowItems = [
    { id: 10, title: "Contemporary Walnut Wood Box", price: 8500, discount: 15, image: "/api/placeholder/400/250" }
  ];

  // Helper functions
  const placeBid = (item: { id: number; title: string; yourBid: number; currentBid: number; status: string; endTime: string; image: string }) => {
    alert(`Placing bid on ${item.title}`);
  };
  
  const buyNow = (item: { id: number; title: string; price: number; discount: number; image: string }) => {
    alert(`Buying ${item.title}`);
  };

  // Tab navigation
  const renderTabs = () => (
    <div className={`${isMobile ? 'overflow-x-auto pb-2' : ''}`}>
      <div className={`flex border-b border-gray-700 mb-6 ${isMobile ? 'w-max' : ''}`}>
        <button
          className={`px-4 py-2 font-medium ${activeSubTab === 'current' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'} transition-colors duration-200`}
          onClick={() => setActiveSubTab('current')}
        >
          Current Bids
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeSubTab === 'history' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'} transition-colors duration-200`}
          onClick={() => setActiveSubTab('history')}
        >
          Bid History
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeSubTab === 'won' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'} transition-colors duration-200`}
          onClick={() => setActiveSubTab('won')}
        >
          Won Auctions
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeSubTab === 'lost' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'} transition-colors duration-200`}
          onClick={() => setActiveSubTab('lost')}
        >
          Lost Auctions
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeSubTab === 'buynow' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'} transition-colors duration-200`}
          onClick={() => setActiveSubTab('buynow')}
        >
          Buy It Now
        </button>
      </div>
    </div>
      
    
  );

  // Content rendering
  const renderCurrentBids = () => (
    <div>
      <div className={`${isMobile ? 'flex flex-col gap-3' : 'flex justify-between items-center'} mb-6`}>
        <h2 className="text-2xl font-serif">Current Bids</h2>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search bids..."
            className="pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {currentBids.map(bid => (
          <div key={bid.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-indigo-600 transition-all duration-300 transform hover:-translate-y-1">
            <div className={`${isMobile ? 'flex flex-col' : 'flex'}`}>
              <img src={bid.image} alt={bid.title} className={`${isMobile ? 'w-full h-48 object-cover' : 'w-1/5 object-cover'}`} />
              <div className="p-5 flex-1">
                <div className={`${isMobile ? 'flex flex-col gap-2' : 'flex justify-between'} mb-3`}>
                  <h3 className="text-xl font-serif font-medium">{bid.title}</h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    bid.status === 'Highest Bidder' 
                      ? 'bg-green-900/50 text-green-300' 
                      : 'bg-red-900/50 text-red-300'
                  } ${isMobile ? 'self-start' : ''}`}>
                    {bid.status}
                  </div>
                </div>

                <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} gap-4 md:gap-6 mb-4`}>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Your Bid</p>
                    <p className="text-lg font-medium">₹{bid.yourBid.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Current Bid</p>
                    <p className={`text-lg font-medium ${bid.status === 'Outbid' ? 'text-red-300' : 'text-white'}`}>
                      ₹{bid.currentBid.toLocaleString()}
                    </p>
                  </div>
                  <div className={isMobile ? 'col-span-2' : ''}>
                    <p className="text-gray-400 text-sm mb-1">Time Remaining</p>
                    <p className="text-lg font-medium text-red-400">{bid.endTime}</p>
                  </div>
                </div>

                <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-3`}>
                  <button 
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors duration-200 shadow-md"
                    onClick={() => placeBid(bid)}
                  >
                    {bid.status === 'Highest Bidder' ? 'Increase Bid' : 'Place New Bid'}
                  </button>
                  
                  <button className="px-4 py-2 border border-indigo-500 text-indigo-300 hover:bg-indigo-900/50 rounded-lg font-medium transition-colors duration-200">
                    Set Auto-bid
                  </button>
                  
                  <button className="px-4 py-2 border border-gray-600 hover:bg-gray-700 rounded-lg text-gray-300 transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBidHistory = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif">Bid History</h2>
      </div>

      {isMobile ? (
        <div className="space-y-4">
          {bidHistory.map(bid => (
            <div key={bid.id} className="bg-gray-800 rounded-xl border border-gray-700 p-4 hover:border-indigo-600 transition-all duration-300 shadow-lg">
              <h3 className="font-medium text-lg mb-2">{bid.title}</h3>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <p className="text-gray-400 text-sm">Bid Amount</p>
                  <p className="font-medium">₹{bid.bidAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Date</p>
                  <p className="font-medium">{bid.bidDate}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  bid.status === 'Active' ? 'bg-blue-900/50 text-blue-300' :
                  bid.status === 'Won' ? 'bg-green-900/50 text-green-300' :
                  bid.status === 'Lost' ? 'bg-red-900/50 text-red-300' :
                  'bg-yellow-900/50 text-yellow-300'
                }`}>
                  {bid.status}
                </div>
                <button className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200">View Details</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Item</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Bid Amount</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Date</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bidHistory.map((bid, index) => (
                <tr key={bid.id} className={index !== bidHistory.length - 1 ? "border-b border-gray-700" : ""}>
                  <td className="py-4 px-6">
                    <div className="font-medium">{bid.title}</div>
                  </td>
                  <td className="py-4 px-6">₹{bid.bidAmount.toLocaleString()}</td>
                  <td className="py-4 px-6">{bid.bidDate}</td>
                  <td className="py-4 px-6">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      bid.status === 'Active' ? 'bg-blue-900/50 text-blue-300' :
                      bid.status === 'Won' ? 'bg-green-900/50 text-green-300' :
                      bid.status === 'Lost' ? 'bg-red-900/50 text-red-300' :
                      'bg-yellow-900/50 text-yellow-300'
                    }`}>
                      {bid.status}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderWonAuctions = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif">Won Auctions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {wonAuctions.map(auction => (
          <div key={auction.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-indigo-600 transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative">
              <img src={auction.image} alt={auction.title} className="w-full h-48 object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium font-serif mb-3">{auction.title}</h3>
              
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-400">Final Bid</p>
                  <p className="text-xl font-medium text-indigo-300">₹{auction.finalBid.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <p className="text-md font-medium text-yellow-300">
                    {auction.status}
                  </p>
                </div>
              </div>
              
              <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2`}>
                <button className="flex-1 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md">
                  Complete Payment
                </button>
                <button className="py-2 px-4 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLostAuctions = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif">Lost Auctions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {lostAuctions.map(auction => (
          <div key={auction.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-indigo-600 transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative">
              <img src={auction.image} alt={auction.title} className="w-full h-48 object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium font-serif mb-3">{auction.title}</h3>
              
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-400">Your Bid</p>
                  <p className="text-xl font-medium">₹{auction.yourBid.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Final Bid</p>
                  <p className="text-xl font-medium text-red-300">₹{auction.finalBid.toLocaleString()}</p>
                </div>
              </div>
              
              <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2`}>
                <button className="flex-1 py-2 border border-indigo-500 text-indigo-300 rounded-lg font-medium hover:bg-indigo-900/50 transition-colors duration-200">
                  Similar Items
                </button>
                <button className="py-2 px-4 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBuyNow = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif">Buy It Now</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {buyNowItems.map(item => (
          <div key={item.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-indigo-600 transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              {item.discount > 0 && (
                <div className="absolute top-3 right-3 bg-indigo-900 text-indigo-200 px-2 py-1 rounded-md text-sm font-medium">
                  {item.discount}% OFF
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium font-serif mb-3">{item.title}</h3>
              
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-sm text-gray-400">Price</p>
                  <p className="text-xl font-medium text-indigo-300">₹{item.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-300">In Stock</p>
                </div>
              </div>
              
              <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2`}>
                <button 
                  className="flex-1 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md"
                  onClick={() => buyNow(item)}
                >
                  Buy Now
                </button>
                <button className="py-2 px-4 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Main content based on active tab
  const renderContent = () => {
    switch(activeSubTab) {
      case 'current':
        return renderCurrentBids();
      case 'history':
        return renderBidHistory();
      case 'won':
        return renderWonAuctions();
      case 'lost':
        return renderLostAuctions();
      case 'buynow':
        return renderBuyNow();
      default:
        return renderCurrentBids();
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 relative overflow-hidden">
    
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
      
        
        {/* Dashboard Content */}
        <main className="p-4 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-serif font-light text-gray-100">Bidding Management</h2>
            <p className="text-gray-400 mt-1 text-sm md:text-base">Manage your bids, track your auction history, and purchase items instantly</p>
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

export default BiddingManagementDashboard;