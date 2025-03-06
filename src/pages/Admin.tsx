import { Settings } from 'lucide-react';
import React, { useState } from 'react';
import BuyerPaymentDashboard from './Admin/BuyerPayment';
import SellerPaymentDashboard from './Admin/SellerPayment';

const AdminDashboard: React.FC = () => {
  // Basic state
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('auctions');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Edit states
  const [editingAuctionId, setEditingAuctionId] = useState<string | null>(null);
  const [editingBidAmount, setEditingBidAmount] = useState('');
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  
  // Data states
  const [activeAuctions] = useState([
    { id: 'A1001', title: 'Vintage Watch Collection', bids: 12, currentBid: 2450, status: 'active', endTime: '2h 15m', featured: false },
    { id: 'A1002', title: 'Modern Art Painting', bids: 8, currentBid: 1800, status: 'active', endTime: '4h 30m', featured: true },
    { id: 'A1003', title: 'Signed Sports Memorabilia', bids: 24, currentBid: 3200, status: 'active', endTime: '1h 45m', featured: false }
  ]);
  
  const [pendingAuctions] = useState([
    { id: 'P2001', title: 'Antique Furniture Set', seller: 'VintageDealer', reserve: 1500, status: 'pending' },
    { id: 'P2002', title: 'Rare Coin Collection', seller: 'NumismaticsInc', reserve: 2200, status: 'pending' }
  ]);
  
  const [withdrawalRequests] = useState([
    { id: 'W4001', user: 'premium_seller', amount: 2800.00, status: 'pending', requested: '1h ago' },
    { id: 'W4002', user: 'luxury_items', amount: 4500.00, status: 'pending', requested: '3h ago' },
    { id: 'W4003', user: 'collectibles_store', amount: 1850.00, status: 'pending', requested: '5h ago' }
  ]);
  
  const [members] = useState([
    { id: 'M001', username: 'artifact_hunter', tier: 'gold', points: 5200 },
    { id: 'M002', username: 'vintage_queen', tier: 'bronze', points: 1850 },
    { id: 'M003', username: 'modern_collector', tier: 'platinum', points: 9800 }
  ]);
  
  const tierLevels = ['bronze', 'silver', 'gold', 'platinum'];
  
  // Helper function for notifications
  const notify = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };
  
  // Function to simulate loading state
  const simulateLoading = (callback: () => void) => {
    setIsLoading(true);
    setTimeout(() => {
      callback();
      setIsLoading(false);
    }, 800);
  };
  
  // Auction Management Functions
  const startEditBid = (id: string, currentBid: number) => {
    setEditingAuctionId(id);
    setEditingBidAmount(currentBid.toString());
  };
  
  const saveBidAdjustment = () => {
    simulateLoading(() => {
      notify(`Bid amount adjusted to $${editingBidAmount}`);
      setEditingAuctionId(null);
    });
  };
  
  const toggleFeature = (id: string) => {
    simulateLoading(() => {
      notify(`Auction ${id} featured status updated`);
    });
  };
  
  const approveAuction = (id: string) => {
    simulateLoading(() => {
      notify(`Auction ${id} approved`);
    });
  };
  
  const rejectAuction = (id: string) => {
    simulateLoading(() => {
      notify(`Auction ${id} rejected`);
    });
  };
  
  // Wallet Management Functions
  const processWithdrawal = (id: string) => {
    simulateLoading(() => {
      notify(`Withdrawal ${id} processed`);
    });
  };
  
  const rejectWithdrawal = (id: string) => {
    simulateLoading(() => {
      notify(`Withdrawal ${id} rejected`);
    });
  };
  
  // Membership Functions
  const upgradeTier = (id: string) => {
    simulateLoading(() => {
      notify(`Member ${id} tier upgraded`);
    });
  };
  
  const downgradeTier = (id: string) => {
    simulateLoading(() => {
      notify(`Member ${id} tier downgraded`);
    });
  };
  
  const editMember = (id: string) => {
    setEditingMemberId(id);
  };
  
  const saveMember = () => {
    simulateLoading(() => {
      notify(`Member details updated`);
      setEditingMemberId(null);
    });
  };
  
  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} flex items-center`}>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Processing...</span>
          </div>
        </div>
      )}
      
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg bg-green-500 text-white">
          {notificationMessage}
        </div>
      )}
    
      {/* Side Navigation */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} ${sidebarCollapsed ? 'w-16' : 'w-64'} flex flex-col transition-all duration-300`}>
        {/* Logo */}
        <div className="p-4 h-16 flex items-center justify-between border-b border-gray-200">
          {!sidebarCollapsed && <span className="font-bold text-lg">Admin Dashboard</span>}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded hover:bg-gray-200"
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>
        
        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto p-2">
          <button
            onClick={() => setActiveSection('auctions')}
            className={`w-full my-1 p-2 rounded flex items-center ${activeSection === 'auctions' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
          >
            <button className="p-3 rounded-xl duration-200">
            <Settings size={24} />
          </button>
            {!sidebarCollapsed && <span className="ml-3">Auction Mgt.</span>}
          </button>
          
          <button
            onClick={() => setActiveSection('wallet')}
            className={`w-full my-1 p-2 rounded flex items-center ${activeSection === 'wallet' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
          >
            <button className="p-3 rounded-xl  duration-200">
            <Settings size={24} />
          </button>
            {!sidebarCollapsed && <span className="ml-3">Wallet Mgt.</span>}
          </button>
          
          <button
            onClick={() => setActiveSection('membership')}
            className={`w-full my-1 p-2 rounded flex items-center ${activeSection === 'membership' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
          >
            <button className="p-3 rounded-xl duration-200">
            <Settings size={24} />
          </button>
            {!sidebarCollapsed && <span className="ml-3">Membership Mgt.</span>}
          </button>
          
          <button
            onClick={() => setActiveSection('settings')}
            className={`w-full my-1 p-2 rounded flex items-center ${activeSection === 'settings' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
          >
            <button className="p-3 rounded-xl duration-200">
            <Settings size={24} />
          </button>
            {!sidebarCollapsed && <span className="ml-3">Settings</span>}
          </button>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">A</div>
          {!sidebarCollapsed && <span className="ml-3">Admin User</span>}
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="ml-auto p-1 rounded hover:bg-gray-200"
          >
            {darkMode ? '☀' : '🌙'}
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`h-16 flex items-center px-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b border-gray-200`}>
          <h1 className="text-xl font-semibold">
              KASHMIR LUXURY HANDICRAFTS AUCTION HOUSE
          </h1>
        
        </header>
        
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="text-gray-500">Active Auctions</div>
              <div className="text-2xl font-bold">{activeAuctions.length}</div>
            </div>
            <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="text-gray-500">Pending Approvals</div>
              <div className="text-2xl font-bold">{pendingAuctions.length}</div>
            </div>
            <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="text-gray-500">Platform Wallet</div>
              <div className="text-2xl font-bold">$124,500.75</div>
            </div>
            <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="text-gray-500">Pending Withdrawals</div>
              <div className="text-2xl font-bold">{withdrawalRequests.length}</div>
            </div>
          </div>
        </div>
        
        
        <main className="flex-1 overflow-y-auto p-6">
          
          {activeSection === 'auctions' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Auctions */}
              <div className={`p-5 rounded shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-xl font-bold mb-4">Active Auctions</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">ID</th>
                        <th className="text-left py-2">Title</th>
                        <th className="text-left py-2">Current Bid</th>
                        <th className="text-left py-2">Status</th>
                        <th className="text-left py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeAuctions.map(auction => (
                        <tr key={auction.id} className="border-b">
                          <td className="py-2">{auction.id}</td>
                          <td className="py-2">{auction.title}</td>
                          <td className="py-2">
                            {editingAuctionId === auction.id ? (
                              <div className="flex items-center">
                                <input 
                                  type="text" 
                                  value={editingBidAmount}
                                  onChange={(e) => setEditingBidAmount(e.target.value)}
                                  className="w-20 px-2 py-1 rounded border text-black"
                                />
                                <button 
                                  onClick={saveBidAdjustment}
                                  className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
                                >
                                  Save
                                </button>
                                <button 
                                  onClick={() => setEditingAuctionId(null)}
                                  className="ml-1 px-2 py-1 bg-gray-500 text-white rounded"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center">
                                ${auction.currentBid}
                                <button 
                                  onClick={() => startEditBid(auction.id, auction.currentBid)}
                                  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded text-xs"
                                >
                                  Adjust
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="py-2">
                            <span className={`px-2 py-1 rounded text-xs ${auction.featured ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                              {auction.featured ? 'Featured' : 'Active'}
                            </span>
                          </td>
                          <td className="py-2">
                            <button 
                              onClick={() => toggleFeature(auction.id)}
                              className={`px-2 py-1 rounded text-white text-xs ${auction.featured ? 'bg-yellow-500' : 'bg-blue-500'}`}
                            >
                              {auction.featured ? 'Unfeature' : 'Feature'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Pending Auctions */}
              <div className={`p-5 rounded shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-xl font-bold mb-4">Pending Approvals</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">ID</th>
                        <th className="text-left py-2">Title</th>
                        <th className="text-left py-2">Seller</th>
                        <th className="text-left py-2">Reserve</th>
                        <th className="text-left py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingAuctions.map(auction => (
                        <tr key={auction.id} className="border-b">
                          <td className="py-2">{auction.id}</td>
                          <td className="py-2">{auction.title}</td>
                          <td className="py-2">{auction.seller}</td>
                          <td className="py-2">${auction.reserve}</td>
                          <td className="py-2">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => approveAuction(auction.id)}
                                className="px-2 py-1 bg-green-500 text-white rounded text-xs"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => rejectAuction(auction.id)}
                                className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Wallet Management Section */}
          {activeSection === 'wallet' && (
            <>
             <BuyerPaymentDashboard/>
              <SellerPaymentDashboard/>
             <div className="mb-6 p-10">
            <h2 className="text-3xl font-serif font-light text-gray-100">Buyer/Seller Biddng Auction Withdrawl/Refund Request</h2>
            <p className="text-gray-400 mt-1">If item does not match standard of the auction bidding parameters, even if payment was made.</p>
          </div>
            <div className={`p-5 rounded shadow ${darkMode ? 'bg-gray-800' : 'bg-white'} m-6`}>
                
              <h2 className="text-xl font-bold mb-4">Seller Withdrawal Requests</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">ID</th>
                      <th className="text-left py-2">User</th>
                      <th className="text-left py-2">Amount</th>
                      <th className="text-left py-2">Requested</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawalRequests.map(request => (
                      <tr key={request.id} className="border-b">
                        <td className="py-2">{request.id}</td>
                        <td className="py-2">{request.user}</td>
                        <td className="py-2">${request.amount.toLocaleString()}</td>
                        <td className="py-2">{request.requested}</td>
                        <td className="py-2">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => processWithdrawal(request.id)}
                              className="px-2 py-1 bg-green-500 text-white rounded text-xs"
                            >
                              Process
                            </button>
                            <button 
                              onClick={() => rejectWithdrawal(request.id)}
                              className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className={`p-5 rounded shadow ${darkMode ? 'bg-gray-800' : 'bg-white'} m-6`}>
            <h2 className="text-xl font-bold mb-4">Buyer Withdrawal Requests</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">ID</th>
                    <th className="text-left py-2">User</th>
                    <th className="text-left py-2">Amount</th>
                    <th className="text-left py-2">Requested</th>
                    <th className="text-left py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawalRequests.map(request => (
                    <tr key={request.id} className="border-b">
                      <td className="py-2">{request.id}</td>
                      <td className="py-2">{request.user}</td>
                      <td className="py-2">${request.amount.toLocaleString()}</td>
                      <td className="py-2">{request.requested}</td>
                      <td className="py-2">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => processWithdrawal(request.id)}
                            className="px-2 py-1 bg-green-500 text-white rounded text-xs"
                          >
                            Process
                          </button>
                          <button 
                            onClick={() => rejectWithdrawal(request.id)}
                            className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </>
          )}
          
          {/* Membership Section */}
          {activeSection === 'membership' && (
            <>
            <div className={`p-5 rounded shadow ${darkMode ? 'bg-gray-800' : 'bg-white'} mb-8`}>
              <h2 className="text-xl font-bold mb-4">Buyer Membership</h2>
              
              {editingMemberId && (
                <div className="p-4 border rounded mb-6">
                  <h3 className="font-bold mb-3">Edit Member Details</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block mb-1">Username</label>
                      <input 
                        type="text" 
                        value="Selected Member"
                        className="w-full px-3 py-2 rounded border text-black"
                      />
                    </div>
                    <div>
                      <label className="block mb-1">Tier</label>
                      <select 
                        className="w-full px-3 py-2 rounded border text-black"
                      >
                        {tierLevels.map(tier => (
                          <option key={tier} value={tier}>{tier.charAt(0).toUpperCase() + tier.slice(1)}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={saveMember}
                      className="px-3 py-2 bg-green-500 text-white rounded"
                    >
                      Save Changes
                    </button>
                    <button 
                      onClick={() => setEditingMemberId(null)}
                      className="px-3 py-2 bg-gray-500 text-white rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">ID</th>
                      <th className="text-left py-2">Username</th>
                      <th className="text-left py-2">Tier</th>
                      <th className="text-left py-2">Points</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map(member => (
                      <tr key={member.id} className="border-b">
                        <td className="py-2">{member.id}</td>
                        <td className="py-2">{member.username}</td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded text-xs
                            ${member.tier === 'bronze' ? 'bg-amber-100 text-amber-800' : ''}
                            ${member.tier === 'silver' ? 'bg-gray-200 text-gray-800' : ''}
                            ${member.tier === 'gold' ? 'bg-yellow-100 text-yellow-800' : ''}
                            ${member.tier === 'platinum' ? 'bg-blue-100 text-blue-800' : ''}
                          `}>
                            {member.tier.charAt(0).toUpperCase() + member.tier.slice(1)}
                          </span>
                        </td>
                        <td className="py-2">{member.points.toLocaleString()}</td>
                        <td className="py-2">
                          <div className="flex flex-wrap gap-2">
                            <button 
                              onClick={() => editMember(member.id)}
                              className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => upgradeTier(member.id)}
                              className="px-2 py-1 bg-green-500 text-white rounded text-xs"
                            >
                              Upgrade
                            </button>
                            <button 
                              onClick={() => downgradeTier(member.id)}
                              className="px-2 py-1 bg-yellow-500 text-white rounded text-xs"
                            >
                              Downgrade
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className={`p-5 rounded shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-bold mb-4"> Seller Membership </h2>
            
            {editingMemberId && (
              <div className="p-4 border rounded mb-6">
                <h3 className="font-bold mb-3">Edit Member Details</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-1">Username</label>
                    <input 
                      type="text" 
                      value="Selected Member"
                      className="w-full px-3 py-2 rounded border text-black"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Tier</label>
                    <select 
                      className="w-full px-3 py-2 rounded border text-black"
                    >
                      {tierLevels.map(tier => (
                        <option key={tier} value={tier}>{tier.charAt(0).toUpperCase() + tier.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={saveMember}
                    className="px-3 py-2 bg-green-500 text-white rounded"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={() => setEditingMemberId(null)}
                    className="px-3 py-2 bg-gray-500 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">ID</th>
                    <th className="text-left py-2">Username</th>
                    <th className="text-left py-2">Tier</th>
                    <th className="text-left py-2">Points</th>
                    <th className="text-left py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map(member => (
                    <tr key={member.id} className="border-b">
                      <td className="py-2">{member.id}</td>
                      <td className="py-2">{member.username}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded text-xs
                          ${member.tier === 'bronze' ? 'bg-amber-100 text-amber-800' : ''}
                          ${member.tier === 'silver' ? 'bg-gray-200 text-gray-800' : ''}
                          ${member.tier === 'gold' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${member.tier === 'platinum' ? 'bg-blue-100 text-blue-800' : ''}
                        `}>
                          {member.tier.charAt(0).toUpperCase() + member.tier.slice(1)}
                        </span>
                      </td>
                      <td className="py-2">{member.points.toLocaleString()}</td>
                      <td className="py-2">
                        <div className="flex flex-wrap gap-2">
                          <button 
                            onClick={() => editMember(member.id)}
                            className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => upgradeTier(member.id)}
                            className="px-2 py-1 bg-green-500 text-white rounded text-xs"
                          >
                            Upgrade
                          </button>
                          <button 
                            onClick={() => downgradeTier(member.id)}
                            className="px-2 py-1 bg-yellow-500 text-white rounded text-xs"
                          >
                            Downgrade
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </>
          )}
          
          
          {activeSection === 'settings' && (
            <div className={`p-5 rounded shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-xl font-bold mb-4">System Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Appearance</h3>
                  <div className="flex justify-between items-center p-3 rounded bg-gray-100 dark:bg-gray-700 mb-2">
                    <div>
                      <div className="font-medium">Dark Mode</div>
                      <div className="text-sm text-gray-500">Toggle dark/light theme</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={darkMode} 
                        onChange={() => setDarkMode(!darkMode)} 
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;