import { useState, useEffect } from 'react';

export default function JobPortal() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch jobs from API
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch jobs', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Job Portal
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Find your next career opportunity.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading jobs...</div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {jobs.length > 0 ? jobs.map((job: any) => (
              <li key={job.id}>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {job.title}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {job.status}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          Sample Organization
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            )) : (
              <li className="px-4 py-4 sm:px-6 text-center text-gray-500">No jobs available at the moment.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
