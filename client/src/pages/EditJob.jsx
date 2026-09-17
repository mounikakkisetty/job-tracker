import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById, updateJob } from '../services/jobService';

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getJobById(id);
        const job = res.data;
        setFormData({
          companyName: job.companyName || '',
          jobRole: job.jobRole || '',
          location: job.location || '',
          jobType: job.jobType || 'Full-time',
          applicationDate: job.applicationDate ? job.applicationDate.split('T')[0] : '',
          jobUrl: job.jobUrl || '',
          status: job.status || 'Applied',
          notes: job.notes || '',
        });
      } catch (err) {
        setError('Failed to load job application');
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await updateJob(id, formData);
      navigate('/jobs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update application');
    } finally {
      setLoading(false);
    }
  };

  if (!formData) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Edit Job Application</h2>

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
            {loading ? 'Updating...' : 'Update Application'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditJob;