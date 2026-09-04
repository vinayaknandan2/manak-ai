import React, { useState, useEffect } from 'react';
import { ShieldCheck, FileText, ExternalLink, Calendar, Building, AlertCircle } from 'lucide-react';
import { standardApi } from '../../api/standardApi';

export default function GazetteGrid() {
  const [qcos, setQcos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQCOStandards = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await standardApi.searchStandards('QCO mandatory');
        setQcos(res.standards || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch statutory QCO records');
      } finally {
        setLoading(false);
      }
    };

    fetchQCOStandards();
  }, []);

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
          <span>Statutory Notice: {error}</span>
        </div>
      )}

      {loading && (
        <div className="p-8 text-center text-xs text-slate-500">
          Loading statutory Quality Control Orders from BIS index...
        </div>
      )}

      {!loading && qcos.length === 0 && !error && (
        <div className="bg-white border border-brand-border rounded-xl p-8 text-center text-slate-400">
          <ShieldCheck className="h-8 w-8 mx-auto mb-2 text-slate-300" />
          <p className="text-xs font-semibold text-slate-700">No statutory QCO standards indexed yet</p>
          <p className="text-[11px] text-slate-500 mt-1">
            Publish or import QCO records via the backend standard controller to track Gazette mandates.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {qcos.map((item) => (
          <div
            key={item._id || item.code}
            className="bg-white border border-brand-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-mono text-sm font-bold text-brand-blue bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block mb-1">
                  {item.code}
                </span>
                <h3 className="text-xs font-bold text-slate-900">{item.title}</h3>
              </div>
              {item.status && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  {item.status}
                </span>
              )}
            </div>

            {item.description && (
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {item.description}
              </p>
            )}

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Category: <strong>{item.category || 'Statutory Order'}</strong></span>
              {item.latestVersion && <span>Edition: v{item.latestVersion}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
