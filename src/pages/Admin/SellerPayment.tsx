import  { useState, useEffect } from 'react';
import { 

  Search, 
 
  DollarSign, 
  ChevronLeft, 
  ChevronRight,
  
} from 'lucide-react';

const SellerPaymentDashboard = () => {
  const [activeSubTab, setActiveSubTab] = useState('payment-methods');
  const [, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Sample data
  const paymentMethods = [
    { id: 1, type: "credit", name: "Visa", last4: "4242", expiry: "09/27", default: true, image: "/api/placeholder/40/25" },
    { id: 2, type: "credit", name: "Mastercard", last4: "8791", expiry: "11/26", default: false, image: "/api/placeholder/40/25" },
    { id: 3, type: "escrow", name: "Escrow Account", balance: 45000, default: false }
  ];
  
  const transactions = [
    { id: 1, date: "Feb 25, 2025", type: "payment", amount: 24500, status: "Completed", reference: "TXN-78912" },
    { id: 2, date: "Feb 20, 2025", type: "deposit", amount: 50000, status: "Completed", reference: "DEP-23456" },
    { id: 3, date: "Feb 15, 2025", type: "refund", amount: 8500, status: "Processing", reference: "REF-34567" }
  ];
  
  const invoices = [
    { id: 1, number: "INV-2025-0042", date: "Feb 25, 2025", amount: 24500, status: "Paid", item: "18th Century Sozni Shawl", due: "Feb 25, 2025" },
    { id: 2, number: "INV-2025-0038", date: "Feb 15, 2025", amount: 12000, status: "Paid", item: "Antique Copper Samavar", due: "Feb 15, 2025" },
    { id: 3, number: "INV-2025-0029", date: "Feb 5, 2025", amount: 18200, status: "Pending", item: "Handcrafted Pashmina Stole", due: "Mar 7, 2025" }
  ];

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };
  
  // Render payment methods tab
  const renderPaymentMethods = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif">Payment Methods</h2>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors duration-200">
          Add Payment Method
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-8">
        {paymentMethods.map(method => (
          <div key={method.id} className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-indigo-600 transition-all duration-300 shadow-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {method.type === 'credit' ? (
                  <img src={method.image} alt={method.name} className="h-8 w-12 mr-4" />
                ) : (
                  <div className="h-8 w-12 mr-4 flex items-center justify-center bg-indigo-900 rounded text-indigo-300">
                    <DollarSign size={18} />
                  </div>
                )}
                
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-lg">
                      {method.type === 'credit' ? `${method.name} •••• ${method.last4}` : method.name}
                    </h3>
                    {method.default && (
                      <span className="ml-2 px-2 py-0.5 bg-indigo-900/50 text-indigo-300 text-xs rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  
                  {method.type === 'credit' ? (
                    <p className="text-gray-400 text-sm">Expires {method.expiry}</p>
                  ) : (
                    <p className="text-gray-400 text-sm">Available Balance: {method.balance !== undefined ? formatCurrency(method.balance) : 'N/A'}</p>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                {!method.default && (
                  <button className="px-3 py-1 text-sm border border-indigo-500 text-indigo-300 rounded-lg hover:bg-indigo-900/50">
                    Make Default
                  </button>
                )}
                {!method.default && (
                  <button className="px-3 py-1 text-sm border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700">
                    Remove
                  </button>
                )}
                {method.type === 'escrow' && (
                  <button className="px-3 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
                    Top Up
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
        <h3 className="text-lg font-medium mb-4">Secure Payment Information</h3>
        <p className="text-gray-300 mb-2">Kashmir Luxury Handicrafts Auction House uses bank-level encryption to protect your payment information.</p>
        <p className="text-gray-300 mb-2">Escrow payment service available for high-value purchases.</p>
        <p className="text-gray-400 text-sm">Funds are only released to the seller after you receive and approve your item.</p>
      </div>
    </div>
  );

  // Render transactions tab
  const renderTransactions = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif">Transaction History</h2>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search transactions..."
            className="pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-4 px-6 text-gray-400 font-medium">Date</th>
              <th className="text-left py-4 px-6 text-gray-400 font-medium">Reference</th>
              <th className="text-left py-4 px-6 text-gray-400 font-medium">Type</th>
              <th className="text-left py-4 px-6 text-gray-400 font-medium">Amount</th>
              <th className="text-left py-4 px-6 text-gray-400 font-medium">Status</th>
              <th className="text-left py-4 px-6 text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id} className={index !== transactions.length - 1 ? "border-b border-gray-700" : ""}>
                <td className="py-4 px-6">{transaction.date}</td>
                <td className="py-4 px-6">{transaction.reference}</td>
                <td className="py-4 px-6 capitalize">{transaction.type}</td>
                <td className="py-4 px-6">
                  <span className={transaction.type === 'refund' ? 'text-green-400' : ''}>
                    {transaction.type === 'refund' ? '+' : ''}{formatCurrency(transaction.amount)}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    transaction.status === 'Completed' ? 'bg-green-900/50 text-green-300' : 
                    'bg-yellow-900/50 text-yellow-300'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button className="text-indigo-400 hover:text-indigo-300">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-400">
          Showing 3 of 24 transactions
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700">
            <ChevronLeft size={18} />
          </button>
          <button className="px-3 py-1 rounded-lg bg-indigo-700 text-white">1</button>
          <button className="px-3 py-1 rounded-lg hover:bg-gray-700">2</button>
          <button className="px-3 py-1 rounded-lg hover:bg-gray-700">3</button>
          <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  // Render invoices tab
  const renderInvoices = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif">Invoices</h2>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search invoices..."
            className="pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {invoices.map(invoice => (
          <div key={invoice.id} className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-indigo-600 transition-all duration-300 shadow-lg">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <h3 className="font-medium text-lg">{invoice.number}</h3>
                  <span className={`ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    invoice.status === 'Paid' ? 'bg-green-900/50 text-green-300' : 
                    'bg-yellow-900/50 text-yellow-300'
                  }`}>
                    {invoice.status}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-1">{invoice.item}</p>
                <div className="flex gap-6 text-sm text-gray-400">
                  <span>Invoice Date: {invoice.date}</span>
                  <span>Due Date: {invoice.due}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end justify-between">
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Amount</p>
                  <p className="text-xl font-medium text-indigo-300">{formatCurrency(invoice.amount)}</p>
                </div>
                
                <div className="flex gap-2">
                  {invoice.status === 'Pending' ? (
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
                      Pay Now
                    </button>
                  ) : (
                    <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700">
                      Download
                    </button>
                  )}
                  
                  <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700">
                    View
                  </button>
                </div>
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
      case 'payment-methods':
        return renderPaymentMethods();
      case 'transactions':
        return renderTransactions();
      case 'invoices':
        return renderInvoices();
      default:
        return renderPaymentMethods();
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
    
      <div className="flex-1">
       
        
        <main className="p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-serif font-light text-gray-100">Seller Payment Management</h2>
            <p className="text-gray-400 mt-1">Manage Seller payment methods, view transactions, and track invoices</p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-700 mb-6">
            <button 
              className={`px-4 py-2 font-medium ${activeSubTab === 'payment-methods' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveSubTab('payment-methods')}
            >
              Payment Methods
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeSubTab === 'transactions' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveSubTab('transactions')}
            >
              Transaction History
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeSubTab === 'invoices' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveSubTab('invoices')}
            >
              Invoices
            </button>
          </div>
          
          {/* Tab Content */}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default SellerPaymentDashboard;