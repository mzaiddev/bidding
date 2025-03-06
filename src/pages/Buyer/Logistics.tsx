import { useState, useEffect } from 'react';
import { 
   
  Search, 
 
  ChevronLeft,
  
} from 'lucide-react';

const LogisticsDashboard = () => {

  const [activeSubTab, setActiveSubTab] = useState('shipment-tracking');
  const [selectedShipment, setSelectedShipment] = useState<typeof shipments[0] | null>(null);
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
  const shipments = [
    { 
      id: 1, 
      item: "18th Century Sozni Shawl", 
      orderDate: "Feb 25, 2025",
      estimatedDelivery: "Mar 5, 2025",
      status: "In Transit",
      image: "/api/placeholder/400/250",
      trackingNumber: "KLA-12345-IN",
      origin: "Srinagar, Kashmir",
      destination: "Mumbai, India",
      currentLocation: "Delhi, India",
      lastUpdated: "Feb 28, 2025, 10:30 AM"
    },
    { 
      id: 2, 
      item: "Antique Walnut Wood Samovar", 
      orderDate: "Feb 20, 2025",
      estimatedDelivery: "Mar 2, 2025",
      status: "Out for Delivery",
      image: "/api/placeholder/400/250",
      trackingNumber: "KLA-12346-IN",
      origin: "Srinagar, Kashmir",
      destination: "Bangalore, India",
      currentLocation: "Bangalore, India",
      lastUpdated: "Mar 1, 2025, 8:45 AM"
    }
  ];
  
  const deliveryHistory = [
    { 
      id: 3, 
      item: "Handcrafted Pashmina Stole", 
      orderDate: "Jan 15, 2025",
      deliveryDate: "Jan 25, 2025",
      status: "Delivered",
      image: "/api/placeholder/400/250",
      trackingNumber: "KLA-12340-IN",
      deliveryPartner: "Premium Logistics",
      signedBy: "Alexander Wright"
    },
    { 
      id: 4, 
      item: "Kashmir Copper Tea Set", 
      orderDate: "Dec 10, 2024",
      deliveryDate: "Dec 22, 2024",
      status: "Delivered",
      image: "/api/placeholder/400/250",
      trackingNumber: "KLA-12335-IN",
      deliveryPartner: "Premium Logistics",
      signedBy: "Alexander Wright"
    }
  ];
  
  const packagingOptions = [
    {
      id: 1,
      name: "Premium Gift Box",
      description: "Hand-crafted wooden box with satin lining",
      price: 2500,
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      name: "Luxury Presentation Case",
      description: "Museum-quality display case with UV protection",
      price: 4500,
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      name: "Signature Gift Wrapping",
      description: "Hand-printed Kashmiri paper with artisan ribbon",
      price: 1200,
      image: "/api/placeholder/400/250"
    }
  ];

  // Handler functions
  const viewShipmentDetails = (shipment: typeof shipments[0]) => {
    setSelectedShipment(shipment);
  };
  
  const closeShipmentDetails = () => {
    setSelectedShipment(null);
  };
  
  const requestConciergeDelivery = (shipmentId: number) => {
    alert(`Requested concierge delivery for shipment ${shipmentId}`);
  };

  // Render shipment tracking section
  const renderShipmentTracking = () => (
    <div>
      {selectedShipment ? (
        <div>
          <button 
            className="flex items-center text-indigo-400 hover:text-indigo-300 mb-6"
            onClick={closeShipmentDetails}
          >
            <ChevronLeft size={16} className="mr-1" /> Back to All Shipments
          </button>
          
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <img src={selectedShipment.image} alt={selectedShipment.item} className="w-full md:w-1/4 rounded-lg object-cover" />
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-serif font-medium mb-2">{selectedShipment.item}</h2>
                    <p className="text-gray-400 mb-1">
                      Order Date: <span className="text-gray-300">{selectedShipment.orderDate}</span>
                    </p>
                    <p className="text-gray-400 mb-1">
                      Tracking Number: <span className="text-gray-300">{selectedShipment.trackingNumber}</span>
                    </p>
                    <p className="text-gray-400 mb-1">
                      Current Location: <span className="text-gray-300">{selectedShipment.currentLocation}</span>
                    </p>
                    <p className="text-gray-400">
                      Last Updated: <span className="text-gray-300">{selectedShipment.lastUpdated}</span>
                    </p>
                  </div>
                  
                  <div className="bg-indigo-900/30 border border-indigo-800 rounded-lg px-4 py-3 text-center mt-4 md:mt-0">
                    <p className="text-gray-400 text-sm">Estimated Delivery</p>
                    <p className="text-xl font-medium text-indigo-300">{selectedShipment.estimatedDelivery}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <button 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
                onClick={() => requestConciergeDelivery(selectedShipment.id)}
              >
                Request VIP Delivery
              </button>
              
              <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700">
                Contact Courier
              </button>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-4">Shipment Route</h3>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-400 text-sm">From</p>
                    <p className="font-medium">{selectedShipment.origin}</p>
                  </div>
                  
                  <div className="flex-1 mx-4 h-0.5 bg-gray-600 relative">
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-500 rounded-full"></div>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm">To</p>
                    <p className="font-medium">{selectedShipment.destination}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
            <h2 className="text-2xl font-serif">Shipment Tracking</h2>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search shipments..."
                className="pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-gray-200 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {shipments.map(shipment => (
              <div key={shipment.id} className="bg-gray-800 rounded-xl p-5 border border-gray-700 flex flex-col md:flex-row">
                <div className="w-full md:w-32 h-32 overflow-hidden rounded-lg mb-4 md:mb-0">
                  <img src={shipment.image} alt={shipment.item} className="w-full h-full object-cover" />
                </div>
                
                <div className="md:ml-6 flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <h3 className="font-medium text-lg">{shipment.item}</h3>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium md:ml-4 ${
                      shipment.status === 'In Transit' ? 'bg-blue-900/50 text-blue-300' :
                      shipment.status === 'Out for Delivery' ? 'bg-yellow-900/50 text-yellow-300' :
                      'bg-green-900/50 text-green-300'
                    } self-start`}>
                      {shipment.status}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
                    <div>
                      <p className="text-gray-400 text-sm">Order Date</p>
                      <p className="font-medium">{shipment.orderDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Tracking Number</p>
                      <p className="font-medium">{shipment.trackingNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Estimated Delivery</p>
                      <p className="font-medium text-indigo-300">{shipment.estimatedDelivery}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-col md:flex-row gap-3">
                    <button 
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
                      onClick={() => viewShipmentDetails(shipment)}
                    >
                      Track Package
                    </button>
                    <button className="px-4 py-2 border border-indigo-500 text-indigo-300 rounded-lg font-medium hover:bg-indigo-900/50">
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Render concierge delivery section
  const renderConciergeDelivery = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif">Concierge Delivery</h2>
      </div>

      <div className="bg-gray to-purple-900 rounded-xl overflow-hidden text-white border border-indigo-600 mb-8">
        <div className="p-6">
          <h3 className="text-xl font-serif font-medium mb-3">VIP Delivery Service</h3>
          <p className="mb-4">Experience the ultimate in personal service with our white-glove concierge delivery option.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div className="bg-black bg-opacity-20 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Personal Delivery</h4>
              <p className="text-sm text-indigo-200">Your item hand-delivered by a dedicated concierge at your preferred time.</p>
            </div>
            
            <div className="bg-black bg-opacity-20 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Item Presentation</h4>
              <p className="text-sm text-indigo-200">Professional unpacking and presentation of your luxury item.</p>
            </div>
            
            <div className="bg-black bg-opacity-20 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Verification</h4>
              <p className="text-sm text-indigo-200">On-site authentication and condition verification for your peace of mind.</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <button className="px-4 py-2 bg-white text-indigo-900 rounded-lg font-medium hover:bg-indigo-100">
              Learn More
            </button>
            <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600">
              Request for Current Shipment
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-lg font-medium mb-4">Available Shipments for Concierge Delivery</h3>
        
        <div className="space-y-4">
          {shipments.map(shipment => (
            <div key={shipment.id} className="p-4 border border-gray-700 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h4 className="font-medium">{shipment.item}</h4>
                <p className="text-gray-400 text-sm">Estimated Delivery: {shipment.estimatedDelivery}</p>
              </div>
              
              <button 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
                onClick={() => requestConciergeDelivery(shipment.id)}
              >
                Request VIP Delivery
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render delivery history section
  const renderDeliveryHistory = () => (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
        <h2 className="text-2xl font-serif">Delivery History</h2>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search deliveries..."
            className="pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-gray-200 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deliveryHistory.map(delivery => (
          <div key={delivery.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
            <div className="h-40 relative">
              <img src={delivery.image} alt={delivery.item} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 bg-green-900/70 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                {delivery.status}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-lg mb-2">{delivery.item}</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-sm">Order Date</p>
                  <p className="font-medium">{delivery.orderDate}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Delivery Date</p>
                  <p className="font-medium text-green-300">{delivery.deliveryDate}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Tracking Number</p>
                  <p className="font-medium">{delivery.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Signed By</p>
                  <p className="font-medium">{delivery.signedBy}</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-3">
                <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 flex-1">
                  View Details
                </button>
                <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 flex-1">
                  Download Receipt
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render packaging options section
  const renderPackagingOptions = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif">Luxury Packaging Options</h2>
      </div>

      <p className="text-gray-300 mb-6">
        Enhance your Kashmir Luxe experience with our premium packaging options, designed to showcase your artisan treasures.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {packagingOptions.map(option => (
          <div key={option.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
            <div className="h-48">
              <img src={option.image} alt={option.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-lg">{option.name}</h3>
                <p className="text-indigo-300 font-medium">₹{option.price.toLocaleString()}</p>
              </div>
              
              <p className="text-gray-300 mb-4">{option.description}</p>
              
              <button className="w-full py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
                Select for Next Purchase
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-lg font-medium mb-4">Customization Services</h3>
        <p className="text-gray-300 mb-4">
          Kashmir Luxe Auctions offers bespoke packaging solutions for special occasions and corporate gifts.
        </p>
        
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
          Request Custom Packaging
        </button>
      </div>
    </div>
  );

  // Main content based on active tab
  const renderContent = () => {
    switch(activeSubTab) {
      case 'shipment-tracking':
        return renderShipmentTracking();
      case 'concierge-delivery':
        return renderConciergeDelivery();
      case 'delivery-history':
        return renderDeliveryHistory();
      case 'packaging-options':
        return renderPackagingOptions();
      default:
        return renderShipmentTracking();
    }
  };

  return (
    <><div className="flex h-screen bg-gray-900 text-gray-200">
         
          <div className={`flex-1`}>
         
        
        {/* Dashboard Content */}
        <main className="p-4 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-serif font-light text-gray-100">Logistics & VIP Fulfillment</h2>
            <p className="text-gray-400 mt-1">Track your shipments and manage premium delivery options</p>
          </div>
          
          {/* Tab Navigation */}
          <div className="overflow-x-auto pb-2">
    <div className={`flex border-b border-gray-700 mb-6 ${isMobile ? 'w-max' : ''}`}>
    <button
        className={`px-4 py-2 font-medium ${activeSubTab === 'shipment-tracking' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'}`}
    onClick={() => setActiveSubTab('shipment-tracking')}
    >
    Shipment Tracking
</button><button
    className={`px-4 py-2 font-medium ${activeSubTab === 'concierge-delivery' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'}`}
    onClick={() => setActiveSubTab('concierge-delivery')}
>
        Concierge Delivery
    </button><button
        className={`px-4 py-2 font-medium ${activeSubTab === 'delivery-history' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'}`}
        onClick={() => setActiveSubTab('delivery-history')}
    >
        Delivery History
    </button><button
        className={`px-4 py-2 font-medium ${activeSubTab === 'packaging-options' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'}`}
        onClick={() => setActiveSubTab('packaging-options')}
    >
        Luxury Packaging
    </button>
            </div>
          </div>
          
          {/* Tab Content */}
          {renderContent()}
        </main>
      </div>
    </div>
    </>
  );
};

export default LogisticsDashboard;
