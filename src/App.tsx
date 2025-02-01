import React, { useState, useEffect } from 'react';
import { PlusCircle, Loader2, RefreshCw, AlertCircle } from 'lucide-react';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  createdAt: string;
}

function App() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://44.201.228.138:3000/api/faq');
      const data = await response.json();
      console.log(data);
      localStorage.setItem('faqs', JSON.stringify(data));      
      // Retrieve FAQs from local storage
      const storedFaqs = JSON.parse(localStorage.getItem('faqs') || '[]');
      setFaqs(storedFaqs);
      setError(null);
    } catch (err) {
      setError('Failed to fetch FAQs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    try {
      setSubmitting(true);
      const response = await fetch('http://44.201.228.138:3000/api/faq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, answer }),
      });

      localStorage.setItem('faqs', JSON.stringify({ question, answer }));      


      if (!response.ok) throw new Error('Failed to add FAQ');

      await fetchFAQs();
      setQuestion('');
      setAnswer('');
    } catch (err) {
      setError('Failed to add FAQ');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">FAQ Management</h1>
          <p className="mt-2 text-gray-600">Add and manage frequently asked questions</p>
        </div>

        {/* Add FAQ Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New FAQ</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                Question
              </label>
              <input
                type="text"
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter the question"
              />
            </div>
            <div>
              <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
                Answer
              </label>
              <textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter the answer"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Adding...
                </>
              ) : (
                <>
                  <PlusCircle className="-ml-1 mr-2 h-4 w-4" />
                  Add FAQ
                </>
              )}
            </button>
          </form>
        </div>

        {/* FAQ List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold">FAQ List</h2>
            <button
              onClick={fetchFAQs}
              disabled={loading}
              className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-400">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <p className="ml-3 text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {loading ? (
            <div className="p-8 text-center">
              <Loader2 className="animate-spin h-8 w-8 mx-auto text-gray-400" />
              <p className="mt-2 text-gray-500">Loading FAQs...</p>
            </div>
          ) : faqs.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">No FAQs found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Question
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Answer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {faqs.map((faq) => (
                    <tr key={faq._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-normal">
                        <div className="text-sm text-gray-900">{faq.question}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-normal">
                        <div className="text-sm text-gray-500">{faq.answer}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(faq.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <footer className="bg-white border-t border-gray-200 text-center">Made with ❤️ by Mani</footer>
    </div>
  );
}

export default App;