import { useState, useEffect } from 'react';
import { Award,  Gift, Star, ChevronRight } from 'lucide-react';

const MembershipDashboard = () => {
  const [activeSubTab, setActiveSubTab] = useState('membership-status');
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Sample data
  const membershipStatus = {
    tier: "Platinum",
    since: "January 15, 2025",
    validUntil: "January 15, 2026",
    points: 8750
  };
  
  const membershipTiers = [
    {
      id: 1,
      name: "Gold",
      minSpend: 500000,
      benefits: [
        "Early access to standard auctions",
        "Priority customer service",
        "Basic loyalty rewards"
      ]
    },
    {
      id: 2,
      name: "Platinum",
      minSpend: 1000000,
      benefits: [
        "Early access to all auctions",
        "Invitation to selected private auctions",
        "VIP customer service",
        "Enhanced loyalty rewards",
        "Quarterly curated presentations"
      ]
    },
    {
      id: 3,
      name: "Diamond",
      minSpend: 2500000,
      benefits: [
        "First access to all auctions",
        "Invitation to all private auctions",
        "Dedicated personal concierge",
        "Premium loyalty rewards",
        "Monthly curated presentations",
        "Annual private viewing experience"
      ]
    }
  ];
  
  const availablePerks = [
    {
      id: 1,
      name: "Early Access Auction",
      description: "24-hour early access to the 'Royal Pashmina Collection' auction",
      date: "March 10, 2025",
      image: "/api/placeholder/400/200",
      category: "Auctions",
      claimed: false
    },
    {
      id: 2,
      name: "Private Viewing Session",
      description: "Exclusive private viewing of rare 18th century Kashmiri craft items",
      date: "March 15, 2025",
      image: "/api/placeholder/400/200",
      category: "Experiences",
      claimed: false
    },
    {
      id: 3,
      name: "Artisan Meet & Greet",
      description: "Virtual session with master Sozni embroidery artisans from Kashmir",
      date: "March 20, 2025",
      image: "/api/placeholder/400/200",
      category: "Experiences",
      claimed: true
    }
  ];
  
  const customRequests = [
    {
      id: 1,
      item: "Antique Pashmina Shawl with Specific Motifs",
      status: "In Progress",
      requestDate: "Feb 15, 2025",
      estimatedCompletion: "Apr 30, 2025"
    }
  ];

  // Functionality
  const claimPerk = (id: number) => {
    alert(`Claimed perk ${id}`);
  };
  
  const upgradeMembership = () => {
    alert("Requesting membership upgrade");
  };
  
  const submitCustomRequest = () => {
    alert("Custom request submitted");
  };

  // Tab navigation
  const renderTabs = () => (
    <div className={`${isMobile ? 'overflow-x-auto pb-2' : ''}`}>
      <div className={`flex border-b border-gray-700 mb-6 ${isMobile ? 'w-max' : ''}`}>
        <button 
          className={`px-4 py-2 font-medium ${activeSubTab === 'membership-status' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'} transition-colors duration-200`}
          onClick={() => setActiveSubTab('membership-status')}
        >
          Membership Status
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeSubTab === 'available-perks' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'} transition-colors duration-200`}
          onClick={() => setActiveSubTab('available-perks')}
        >
          Available Perks
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeSubTab === 'custom-requests' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'} transition-colors duration-200`}
          onClick={() => setActiveSubTab('custom-requests')}
        >
          Custom Craft Requests
        </button>
      </div>
    </div>
  );

  // Content sections
  const renderMembershipStatus = () => (
    <div>
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 rounded-xl border border-indigo-600 p-6 mb-8 shadow-lg hover:shadow-indigo-900/30 transition-all duration-300">
        <div className={`${isMobile ? 'flex flex-col gap-4' : 'flex justify-between items-start'} mb-4`}>
          <div>
            <div className="flex items-center">
            <Star size={24} className="text-indigo-300 mr-2" />
              <h2 className="text-2xl font-serif font-medium text-white">{membershipStatus.tier} Membership</h2>
            </div>
            <p className="text-indigo-200 mt-1">Member since {membershipStatus.since}</p>
          </div>
          
          <div className="bg-indigo-800/50 border border-indigo-500/50 rounded-lg px-4 py-2">
            <p className="text-indigo-200 text-sm">Valid Until</p>
            <p className="text-white font-medium">{membershipStatus.validUntil}</p>
          </div>
        </div>
        
        <div className={`${isMobile ? 'flex flex-col gap-6' : 'flex'} mb-4`}>
          <div className={`${isMobile ? 'w-full' : 'w-1/2 pr-6 border-r border-indigo-600'}`}>
            <div className="flex items-center mb-2">
              <Award size={18} className="text-indigo-300 mr-2" />
              <h3 className="text-lg font-medium text-white">Loyalty Points</h3>
            </div>
            
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-white">{membershipStatus.points.toLocaleString()}</span>
              <span className="text-indigo-200 ml-2">points</span>
            </div>
          </div>
          
          <div className={`${isMobile ? 'w-full' : 'w-1/2 pl-6'}`}>
            <div className="flex items-center mb-2">
              <Gift size={18} className="text-indigo-300 mr-2" />
              <h3 className="text-lg font-medium text-white">Membership Benefits</h3>
            </div>
            
            <ul className="space-y-1 text-indigo-100">
              {membershipTiers.find(tier => tier.name === membershipStatus.tier)?.benefits.map((benefit, index) => (
                <li key={index} className="text-sm">
                  • {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className={`${isMobile ? 'flex flex-col' : 'flex justify-between'} gap-4`}>
          <button className="px-4 py-2 bg-black/30 text-white rounded-lg hover:bg-black/40 transition-colors duration-200 shadow-md">
            Manage Billing
          </button>
          
          <button 
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-md"
            onClick={upgradeMembership}
          >
            Upgrade to Diamond
          </button>
        </div>
      </div>
      
      <h3 className="text-xl font-medium mb-4">Membership Tiers</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {membershipTiers.map(tier => (
          <div 
            key={tier.id} 
            className={`bg-gray-800 rounded-xl overflow-hidden border ${
              tier.name === membershipStatus.tier ? 'border-indigo-500' : 'border-gray-700'
            } hover:border-indigo-600 transition-all duration-300 shadow-lg transform hover:-translate-y-1`}
          >
            <div className={`p-4 ${
              tier.name === 'Gold' ? 'bg-yellow-900' : 
              tier.name === 'Platinum' ? 'bg-indigo-900' : 
              'bg-purple-900'
            }`}>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xl font-medium text-white">{tier.name}</h4>
                {tier.name === membershipStatus.tier && (
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-white text-xs">
                    Current
                  </span>
                )}
              </div>
              <p className="text-sm text-white/80">Minimum Annual Spend: ₹{(tier.minSpend / 100000).toFixed(1)} Lakhs</p>
            </div>
            
            <div className="p-4">
              <h5 className="font-medium mb-2">Benefits</h5>
              <ul className="space-y-2 mb-4">
                {tier.benefits.map((benefit, index) => (
                  <li key={index} className="text-sm">
                    • {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAvailablePerks = () => (
    <div>
      <div className={`${isMobile ? 'flex flex-col gap-3' : 'flex justify-between items-center'} mb-6`}>
        <h2 className="text-2xl font-serif">Available Perks</h2>
        <div className="relative">
          <select className="pl-4 pr-8 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
            <option>All Categories</option>
            <option>Auctions</option>
            <option>Experiences</option>
            <option>Services</option>
          </select>
          <ChevronRight size={18} className="absolute right-3 top-2.5 text-gray-400 rotate-90 pointer-events-none" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        {availablePerks.map(perk => (
          <div key={perk.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-600 transition-all duration-300 shadow-lg transform hover:-translate-y-1">
            <div className="h-40 relative">
              <img src={"///"} alt={perk.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-indigo-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-indigo-300 text-xs">
                {perk.category}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-lg mb-2">{perk.name}</h3>
              <p className="text-gray-400 text-sm mb-3">{perk.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  {perk.claimed ? (
                    <span className="text-green-400">
                      Already Claimed
                    </span>
                  ) : (
                    <span className="text-gray-300">{perk.date}</span>
                  )}
                </div>
                
                <button 
                  className={`px-3 py-1 rounded-lg text-sm ${
                    perk.claimed 
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 shadow-md'
                  }`}
                  onClick={() => !perk.claimed && claimPerk(perk.id)}
                  disabled={perk.claimed}
                >
                  {perk.claimed ? 'Claimed' : 'Claim Perk'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCustomRequests = () => (
    <div>
   

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg hover:border-indigo-600 transition-all duration-300">
          <h3 className="text-lg font-medium mb-4">Submit a Custom Request</h3>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Item Type</label>
              <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
                <option>Select Item Type</option>
                <option>Pashmina Shawl</option>
                <option>Hand-knotted Carpet</option>
                <option>Walnut Wood Carving</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-1">Description</label>
              <textarea 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Describe your custom piece in detail..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-1">Budget Range (₹)</label>
              <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
                <option>Select Budget Range</option>
                <option>₹50,000 - ₹1,00,000</option>
                <option>₹1,00,000 - ₹2,50,000</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md"
              onClick={submitCustomRequest}
            >
              Submit Request
            </button>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg hover:border-indigo-600 transition-all duration-300">
          <h3 className="text-lg font-medium mb-4">Request Status</h3>
          
          {customRequests.length > 0 ? (
            <div className="space-y-4">
              {customRequests.map(request => (
                <div key={request.id} className="p-4 border border-gray-700 rounded-lg hover:border-indigo-600 transition-all duration-200">
                  <h4 className="font-medium mb-2">{request.item}</h4>
                  <div className="text-sm mb-3">
                    <p className="text-gray-400">Status: <span className="text-indigo-300">{request.status}</span></p>
                    <p className="text-gray-400">Request Date: {request.requestDate}</p>
                    <p className="text-gray-400">Est. Completion: {request.estimatedCompletion}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">You don't have any active custom requests.</p>
          )}
        </div>
      </div>
    </div>
  );

  // Main content based on active tab
  const renderContent = () => {
    switch(activeSubTab) {
      case 'membership-status':
        return renderMembershipStatus();
      case 'available-perks':
        return renderAvailablePerks();
      case 'custom-requests':
        return renderCustomRequests();
      default:
        return renderMembershipStatus();
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 relative overflow-hidden">
    
      <div className="flex-1 overflow-y-auto">
        
        {/* Dashboard Content */}
        <main className="p-4 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-serif font-light text-gray-100">Membership & Exclusive Perks</h2>
            <p className="text-gray-400 mt-1 text-sm md:text-base">Manage your membership, claim exclusive perks, and request custom crafts</p>
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

export default MembershipDashboard;