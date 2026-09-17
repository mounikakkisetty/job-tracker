import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../services/jobService';

function AddJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    jobRole: '',
    location: '',
    jobType: 'Full-time',
    applicationDate: '',
    jobUrl: '',
    status: 'Applied',
    notes: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createJob(formData);
      navigate('/jobs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add job application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Add Job Application</h2>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="jobRole"
            placeholder="Job Role"
            value={formData.jobRole}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
          <input
            type="date"
            name="applicationDate"
            value={formData.applicationDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="url"
            name="jobUrl"
            placeholder="Job URL"
            value={formData.jobUrl}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {loading ? 'Adding...' : 'Add Application'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddJob;