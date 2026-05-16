import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { solutionPanels, getSolutionTitleFromSlug } from '../data/solutions';

const SolutionPage = () => {
  const { solution } = useParams();
  const navigate = useNavigate();
  const title = getSolutionTitleFromSlug(solution);
  const details = title ? solutionPanels[title] : null;

  if (!details) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-6 py-20">
        <div className="max-w-xl w-full text-center rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
          <h1 className="text-3xl font-bold mb-4">Solution not found</h1>
          <p className="text-slate-600 mb-8">That page doesn’t exist yet. Please go back to the homepage to choose a valid solution.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Solution</p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-slate-900">{details.title}</h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">{details.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              Back to homepage
            </Link>
            <button
              onClick={() => navigate('/')}
              className="rounded-full bg-[#533afd] px-5 py-3 text-sm font-semibold text-white hover:bg-[#3f2bd6]"
            >
              Explore more
            </button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {details.details.map((detail) => (
            <div key={detail} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-slate-700 text-lg">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolutionPage;
