import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  CheckCircle,
  ExternalLink,
  FileText,
  Network,
  AlertTriangle,
} from 'lucide-react';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

export default function StandardSearchCard({ standard }) {
  const navigate = useNavigate();

  if (!standard) return null;

  return (
    <div className="bg-white border-2 border-brand-blue/30 rounded-2xl p-6 sm:p-7 shadow-lg shadow-blue-500/5 relative overflow-hidden">
      {/* Top ambient highlight */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-blue via-blue-400 to-emerald-400" />

      {/* Header section with Code & Match Confidence */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/60">
              Primary BIS Recommendation
            </span>
            <span className="text-xs text-slate-500">{standard.status}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-normal">
            {standard.code}
          </h2>
          <p className="text-sm font-medium text-slate-700 mt-1">
            {standard.title}
          </p>
        </div>

        {/* 96.8% Confidence Match */}
        <div className="shrink-0">
          <Badge variant="emerald" size="lg" dot>
            <span className="font-extrabold text-emerald-800">{standard.confidenceScore}%</span>
            <span className="text-emerald-700 font-medium">Confidence Match</span>
          </Badge>
        </div>
      </div>

      {/* Legal & Statutory Flags */}
      <div className="mt-5 flex flex-wrap gap-2">
        {standard.flags?.map((flag, idx) => (
          <Badge key={idx} variant={flag.type} size="md">
            {flag.label}
          </Badge>
        ))}
      </div>

      {/* Summary Scope */}
      <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <p className="font-medium text-slate-900 mb-1">Mandatory Procurement Scope:</p>
        <p>{standard.summary}</p>
      </div>

      {/* Mandatory Testing Matrix */}
      <div className="mt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          Mandatory Laboratory Testing Matrix:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {standard.mandatoryTestingMatrix?.map((test, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-800 shadow-2xl shadow-slate-100"
            >
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>{test}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Superseded Notice */}
      {standard.supersedes && (
        <div className="mt-5 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
          <span>
            <strong>Supersedes: </strong> {standard.supersedes}. Tender bids citing the superseded edition will be automatically rejected.
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-slate-400">
          Source: BIS Technical Committee ETD 24 (Luminaires & Lighting)
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconLeft={Network}
            onClick={() => navigate('/normative-graph')}
          >
            Explore Normative Graph
          </Button>
          <Button
            variant="royal"
            size="sm"
            iconLeft={FileText}
            onClick={() => navigate('/clause-studio')}
          >
            Synthesize GeM Clause
          </Button>
        </div>
      </div>
    </div>
  );
}
