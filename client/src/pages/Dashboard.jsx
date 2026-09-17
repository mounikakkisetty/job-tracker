import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getStats } from '../services/jobService';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getStats();
        setStats(res.data);
      } catch (err) {
        setError('Failed to load dashboard stats');
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total', value: stats?.total, color: 'bg-gray-100 text-gray-700' },
    { label: 'Applied', value: stats?.applied, color: 'bg-blue-100 text-blue-700' },
    { label: 'Interview', value: stats?.interview, color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Selected', value: stats?.selected, color: 'bg-green-100 text-green-700' },
    { label: 'Rejected', value: stats?.rejected, color: 'bg-red-100 text-red-700' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-1">Welcome, {user?.name}!</h1>
        <p className="text-gray-600 mb-6">{user?.email}</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {!stats ? (
          <p>Loading stats...</p>
        ) : (
          <>
            <div className="grid grid-cols-5 gap-4 mb-8">
              {statCards.map((card) => (
                <div key={card.label} className="bg-white p-4 rounded-lg shadow-md text-center">
                  <p className={`text-3xl font-bold rounded p-2 ${card.color}`}>{card.value}</p>
                  <p className="text-gray-600 mt-2 text-sm">{card.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Recent Applications</h2>
                <Link to="/jobs" className="text-blue-600 hover:underline text-sm">
                  View all →
                </Link>
              </div>

              {stats.recent.length === 0 ? (
                <p className="text-gray-500">No applications yet. Start by adding one!</p>
              ) : (
                <div className="space-y-3">
                  {stats.recent.map((job) => (
                    <div
                      key={job._id}
                      className="flex justify-between items-center border-b pb-2 last:border-0"
                    >
                      <div>
                        <p className="font-medium">{job.companyName}</p>
                        <p className="text-sm text-gray-500">{job.jobRole}</p>
                      </div>
                      <span className="text-sm text-gray-600">{job.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;