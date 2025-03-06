import  { useState, useEffect } from 'react';
import { 
  
  ShoppingBag, 
  Wallet, 
  Gift, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  User, 
  Menu,
  X,PersonStanding

} from 'lucide-react';
import logo from '../../assets/logo.png';
import LuxuryBuyerDashboard from './LuxeryDashboard';
import BiddingManagementDashboard from './BiddingManagementDashboard';
import MembershipDashboard from './MemberShip';
import LogisticsDashboard from './Logistics';
import WalletDashboard from './WalletManagementDashboard';

const BuyerLayout = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

 

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 relative overflow-hidden">
      {isMobile && (
        <button 
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-black bg-opacity-70"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}
      
      {/* Sidebar Navigation */}
      <div className={`${isMobile ? 'fixed inset-y-0 left-0 z-40' : 'relative'} 
        ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'} 
        w-20 bg-black bg-opacity-95 text-gray-300 flex flex-col items-center py-8 border-r border-gray-800 backdrop-blur-lg
        transition-transform duration-300 ease-in-out`}>
        <div className="mb-10">
          <img src={logo} width={35} height={35}  alt="Logo" className="rounded-full border-2 border-indigo-500" />
        </div>
        
        <nav className="flex flex-col items-center gap-8 flex-grow">
         
          <button 
            className={`p-3 rounded-xl ${activeTab === 'bids' ? 'bg-indigo-700' : 'hover:bg-gray-800'} transition-colors duration-200`}
            onClick={() => {
              setActiveTab('bids');
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <ShoppingBag size={24} />
          </button>
          <button 
            className={`p-3 rounded-xl ${activeTab === 'wallet' ? 'bg-indigo-700' : 'hover:bg-gray-800'} transition-colors duration-200`}
            onClick={() => {
              setActiveTab('wallet');
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <Wallet size={24} />
          </button>
          <button 
            className={`p-3 rounded-xl ${activeTab === 'logistics' ? 'bg-indigo-700' : 'hover:bg-gray-800'} transition-colors duration-200`}
            onClick={() => {
              setActiveTab('logistics');
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <Gift size={24} />
          </button>
          <button 
            className={`p-3 rounded-xl ${activeTab === 'membership' ? 'bg-indigo-700' : 'hover:bg-gray-800'} transition-colors duration-200`}
            onClick={() => {
              setActiveTab('membership');
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <PersonStanding size={24} />
          </button>
          <button className="p-3 rounded-xl hover:bg-gray-800 transition-colors duration-200">
            <Settings size={24} />
          </button>
          <button className="p-3 rounded-xl hover:bg-gray-800 mt-4 transition-colors duration-200">
            <LogOut size={24} />
          </button>
        </nav>
        
      
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className={`sticky top-0 z-30 flex ${isMobile ? 'flex-col' : 'flex-row justify-between'} items-center px-4 md:px-8 py-4 bg-gray-900 border-b border-gray-800 shadow-lg backdrop-blur-sm bg-opacity-80`}>
          <div className={`${isMobile ? 'w-full text-center mb-4 mt-6' : 'flex-1'}`}>
            <h1 className="text-xl md:text-2xl font-serif font-medium text-indigo-300 tracking-wider">KASHMIR LUXURY HANDICRAFTS AUCTION HOUSE</h1>
          </div>
          
          <div className={`flex ${isMobile ? 'w-full justify-between' : ''} items-center gap-4 md:gap-6`}>
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search transactions..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-800 bg-opacity-70 text-gray-200 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 border border-gray-700"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            
            <button className="relative">
              <Bell size={22} className="text-gray-300 hover:text-indigo-300 transition-colors duration-200" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">3</span>
            </button>
            
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center border border-indigo-500 shadow-lg">
                <User size={20} className="text-indigo-300" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">Buyer Account</p>
              
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="p-4 md:p-8">
        {activeTab === 'overview' && (
           <LuxuryBuyerDashboard/>
        )}
        {activeTab === 'wallet' && (
          <WalletDashboard/>
        )}
        {activeTab === 'bids' && (
           <BiddingManagementDashboard/>
        )}
        {activeTab === 'membership' && (
           <MembershipDashboard/>
        )}
        {activeTab === 'logistics' && (
           <LogisticsDashboard/>
        )}
        
          
         
        </main>
      </div>
    </div>
  );
};

export default BuyerLayout;