import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, Search, AlertCircle } from 'lucide-react';
import Button from '../../components/common/Button';
import { standardApi } from '../../api/standardApi';

export default function QuickValidator() {
  const [standardCode, setStandardCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [matchedStandard, setMatchedStandard] = useState(null);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(null);

  const handleValidate = async (e) => {
    e.preventDefault();
    if (!standardCode.trim()) return;

    setLoading(true);
    setError(null);
    setChecked(false);
    try {
      const res = await standardApi.searchStandards(standardCode.trim());
      const match = res.standards?.find((s) =>
        s.code.toLowerCase().includes(standardCode.trim().toLowerCase())
      ) || res.standards?.[0] || null;

      setMatchedStandard(match);
      setChecked(true);
    } catch (err) {
      setError(err.message || 'Validation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-brand-border rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="h-5 w-5 text-brand-blue" />
        <h3 className="text-sm font-bold text-slate-900">
          Instant BIS Standard & Specification Verification
        </h3>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        Validate any Indian Standard code directly against the Bureau of Indian Standards master index.
      </p>

      <form onSubmit={handleValidate} className="flex flex-col sm:flex-row items-end gap-3 mb-4">
        <div className="flex-1 w-full">
          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
            Indian Standard Code
          </label>
          <input
            type="text"
            required
            value={standardCode}
            onChange={(e) => setStandardCode(e.target.value)}
            placeholder="e.g. IS 10322 or IS 1786"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 outline-none focus:border-brand-blue"
          />
        </div>

        <Button
          type="submit"
          variant="royal"
          size="md"
          loading={loading}
          iconLeft={Search}
        >
          Verify in BIS Index
        </Button>
      </form>

      {error && (
        <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {checked && matchedStandard && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-2">
          <div className="flex items-center gap-2 text-emerald-900 font-bold">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Verified in Bureau of Indian Standards Registry</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-700 pt-1">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Code</span>
              <span className="font-mono font-bold text-slate-900">{matchedStandard.code}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Title</span>
              <span className="font-semibold text-slate-900">{matchedStandard.title}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Status</span>
              <span className="font-semibold text-emerald-700">{matchedStandard.status || 'Active'}</span>
            </div>
          </div>
        </div>
      )}

      {checked && !matchedStandard && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
          <XCircle className="h-4 w-4 text-amber-600 shrink-0" />
          <span>No exact standard match found in the current index for "{standardCode}".</span>
        </div>
      )}
    </div>
  );
}
