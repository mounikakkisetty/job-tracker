import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getJobs, deleteJob } from '../services/jobService';

function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await getJobs({ search, status });
      setJobs(res.data);
    } catch (err) {
      setError('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [search, status]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    try {
      await deleteJob(id);
      fetchJobs();
    } catch (err) {
      setError('Failed to delete application');
    }
  };

  const statusColors = {
    Applied: 'bg-blue-100 text-blue-700',
    Interview: 'bg-yellow-100 text-yellow-700',
    Selected: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700',
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Job Applications</h2>
          <Link
            to="/jobs/add"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Application
          </Link>
        </div>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border p-2 rounded"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="All">All Status</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {loading ? (
          <p>Loading...</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-500">No job applications found.</p>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4">Company</th>
                  <th className="text-left p-4">Role</th>
                  <th className="text-left p-4">Location</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id} className="border-t">
                    <td className="p-4">{job.companyName}</td>
                    <td className="p-4">{job.jobRole}</td>
                    <td className="p-4">{job.location}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-sm ${statusColors[job.status]}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => navigate(`/jobs/edit/${job._id}`)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobsList;