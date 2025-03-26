import  { useState, useEffect } from 'react';
import { Calendar, Clock, Heart, Award, } from 'lucide-react';

const LuxuryBuyerDashboard = () => {
  const [favorites, setFavorites] = useState([1]);
  const [isMobile, setIsMobile] = useState(false);
  const [checkpassBids, setCheckpassBids] = useState<Record<string, boolean>>({});

  
  // Sample auction data
  const liveAuctions = [
    { id: 1, title: "18th Century Sozni Shawl", currentBid: 24500, endTime: "1h 24m", image: "/api/placeholder/400/250", authenticated: true, reserve: 22000 },
    { id: 2, title: "Antique Walnut Wood Samovar", currentBid: 18750, endTime: "2h 45m", image: "/api/placeholder/400/250", authenticated: true, reserve: 15000 },
    { id: 3, title: "Royal Pashmina Jamawar", currentBid: 32000, endTime: "4h 10m", image: "/api/placeholder/400/250", authenticated: true, reserve: 30000 }
  ];
  
  const upcomingAuctions = [
    { id: 4, title: "Archival Kani Shawl Collection", startDate: "Tomorrow, 8:00 PM IST", estimate: "₹40,000 - ₹65,000", image: "/api/placeholder/400/250" },
    { id: 5, title: "Museum-Grade Paper Mâché Art Set", startDate: "Feb 28, 7:00 PM IST", estimate: "₹28,000 - ₹45,000", image: "/api/placeholder/400/250" }
  ];
  
  const privateInvitations = [
    { id: 6, title: "Rare Mughal-Era Carpet Fragment", startDate: "Mar 3, Private View", rsvpDeadline: "Feb 27", image: "/api/placeholder/400/250" }
  ];
  
  const activeBids = [
    { id: 1, title: "18th Century Sozni Shawl", yourBid: 24500, currentBid: 24500, status: "Highest Bidder", endTime: "1h 24m" }
  ];

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to toggle favorites
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(itemId => itemId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <><div className="flex h-screen bg-gray-900 text-gray-200 relative overflow-hidden">
      
      <div className="flex-1 overflow-y-auto">

        
        {/* Dashboard Content */}
        <main className="p-4 md:p-8">
          <div className={`${isMobile ? 'flex flex-col gap-4' : 'flex justify-between items-center'} mb-8`}>
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-light text-gray-100">Welcome back, Alexander</h2>
              <p className="text-gray-400 mt-1 text-sm md:text-base">Tuesday, February 25, 2025 • Your Platinum membership unlocks exclusive auctions today</p>
            </div>
            <div className={`${isMobile ? 'flex-col' : 'flex-row'} flex gap-3 md:gap-4`}>
              <button className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-lg">
                View All Auctions
              </button>
              <button className="px-6 py-2 rounded-lg border border-gray-600 font-medium hover:bg-gray-800 text-gray-300 transition-colors duration-200">
                My Collection
              </button>
            </div>
          </div>
          
          {/* Live Auctions Section */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-gray-100">Live Auctions</h3>
              <button className="text-indigo-400 font-medium flex items-center hover:text-indigo-300 transition-colors duration-200">
                View All <Clock size={16} className="ml-1" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {liveAuctions.map(auction => (
                <div key={auction.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-indigo-600 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative">
                    <img src={auction.image} alt={auction.title} className="w-full h-48 object-cover" />
                    <div className="absolute top-3 right-3 bg-black bg-opacity-80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-red-400 flex items-center">
                      <Clock size={14} className="mr-1" /> {auction.endTime} left
                    </div>
                    {auction.authenticated && (
                      <div className="absolute top-8 left-3 bg-indigo-900 bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-indigo-200">
                        Authenticated
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-medium text-lg mb-2 font-serif text-gray-100">{auction.title}</h4>
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="text-sm text-gray-400">Current Bid</p>
                        <p className="text-xl font-medium text-indigo-300">₹{auction.currentBid.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Reserve</p>
                        <p className="text-md text-gray-300">₹{auction.reserve.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex flex-col">
  <div className="flex items-center mb-1">
    <input 
      type="checkbox" 
      id={`checkpassBid-${auction.id}`}
      className="mr-1"
      checked={checkpassBids[auction.id] || false}
      onChange={() => {
        setCheckpassBids(prev => ({
          ...prev,
          [auction.id]: !prev[auction.id]
        }));
      }}
    />
    <label htmlFor={`checkpassBid-${auction.id}`} className="text-xs text-gray-300">Checkpass the Bid</label>
  </div>
  <div className="flex gap-2">
    <button className="flex-1 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md">
      {checkpassBids[auction.id] ? 'Direct Purchase' : 'Place Bid'}
    </button>
    <button 
      className={`w-10 h-10 flex items-center justify-center border border-gray-600 rounded-lg hover:bg-gray-700 ${favorites.includes(auction.id) ? 'text-red-400' : 'text-gray-300'} transition-colors duration-200`}
      onClick={() => toggleFavorite(auction.id)}
    >
      <Heart size={18} />
    </button>
  </div>
</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Upcoming Auctions */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-gray-100">Upcoming Auctions</h3>
              <button className="text-indigo-400 font-medium flex items-center hover:text-indigo-300 transition-colors duration-200">
                View Calendar <Calendar size={16} className="ml-1" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {upcomingAuctions.map(auction => (
                <div key={auction.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-indigo-600 transition-all duration-300 transform hover:-translate-y-1">
                  <div className={isMobile ? 'flex flex-col' : 'flex'}>
                    <img src={auction.image} alt={auction.title} className={`${isMobile ? 'w-full h-32' : 'w-1/3'} object-cover`} />
                    <div className="p-4 flex-1">
                      <h4 className="font-medium text-lg mb-2 font-serif text-gray-100">{auction.title}</h4>
                      <div className="mb-3">
                        <div className="flex items-center mb-1">
                          <Calendar size={14} className="mr-2 text-indigo-400" />
                          <p className="text-sm text-gray-300">{auction.startDate}</p>
                        </div>
                        <div className="flex items-center">
                          <Award size={14} className="mr-2 text-indigo-400" />
                          <p className="text-sm text-gray-400">Estimated: {auction.estimate}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <button className="flex-1 py-2 border border-indigo-500 text-indigo-300 rounded-lg font-medium hover:bg-indigo-900 transition-colors duration-200 shadow-md">
                          Set Reminder
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300 transition-colors duration-200">
                          <Heart size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Private Invitations & Active Bids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Private Invitations */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium text-gray-100">Private Invitations</h3>
              </div>
              
              <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl overflow-hidden text-white border border-indigo-600 shadow-lg hover:shadow-indigo-900/30 transition-all duration-300">
                <div className="p-5">
                  <div className={`${isMobile ? 'flex flex-col gap-4' : 'flex justify-between items-start'}`}>
                    <div>
                      <h4 className="font-serif text-lg mb-1 text-indigo-200">Platinum Member Exclusive</h4>
                      <h3 className="font-serif text-xl font-medium mb-3">{privateInvitations[0].title}</h3>
                      <div className="flex items-center mb-1">
                        <Calendar size={14} className="mr-2 text-indigo-300" />
                        <p className="text-sm text-gray-200">{privateInvitations[0].startDate}</p>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-2 text-indigo-300" />
                        <p className="text-sm text-gray-200">RSVP by {privateInvitations[0].rsvpDeadline}</p>




                      </div>
                    </div>
                    <img 
                      src={privateInvitations[0].image} 
                      alt={privateInvitations[0].title} 
                      className={`${isMobile ? 'w-full h-32 object-cover mt-2' : 'w-24 h-24 object-cover'} rounded-lg border border-indigo-400`} 
                    />
                  </div>
                  
                  <button className="mt-4 w-full py-2 bg-indigo-400 text-gray-900 rounded-lg font-medium hover:bg-indigo-300 transition-colors duration-200 shadow-md">
                    RSVP Now
                  </button>
                </div>
              </div>
            </section>
            
            {/* Active Bids */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium text-gray-100">Your Active Bids</h3>
                <button className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors duration-200">
                  View All
                </button>
              </div>
              
              <div className="bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-700 hover:border-gray-600 transition-all duration-300">
                {activeBids.map(bid => (
                  <div key={bid.id} className="border-b border-gray-700 pb-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium font-serif text-gray-100">{bid.title}</h4>
                      <span className="px-3 py-1 bg-green-900 text-green-300 text-xs font-medium rounded-full">
                        {bid.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div>
                        <p className="text-xs text-gray-400">Your Bid</p>
                        <p className="font-medium text-gray-200">₹{bid.yourBid.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Current Bid</p>
                        <p className="font-medium text-gray-200">₹{bid.currentBid.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Time Left</p>
                        <p className="font-medium text-red-400">{bid.endTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors duration-200 shadow-md">
                        Increase Bid
                      </button>
                      <button className="flex-1 py-1.5 border border-indigo-500 text-indigo-300 rounded-lg text-sm hover:bg-indigo-900 transition-colors duration-200">
                        Set Auto Bid
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="text-center text-gray-400 text-sm">
                  <p>No more active bids at the moment</p>
                  <button className="text-indigo-400 font-medium mt-1 hover:text-indigo-300 transition-colors duration-200">
                    Browse Live Auctions
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
    </>
  );
};

export default LuxuryBuyerDashboard;