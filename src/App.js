import './App.css';
import './index.css';
import CompanyDashboard from './components/CompanyDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
            <h1 className="text-2xl font-bold text-blue-600">Companies Directory</h1>
          </div>
        </div>

        {/* Main Content */}
        <CompanyDashboard />
      </div>
    </div>
  );
}

export default App;
