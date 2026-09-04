import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  XCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  FileCheck,
} from 'lucide-react';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

export default function GapAnalysisSplitView({ findings = [] }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold">Reverse Tender Audit Completed</h4>
            <p className="text-xs text-slate-300">
              Found 1 Superseded Standard • 1 Missing Mandatory Lab Test • 1 Verified Compliant
            </p>
          </div>
        </div>

        <Button
          variant="whiteCta"
          size="sm"
          iconRight={ArrowRight}
          onClick={() => navigate('/clause-studio')}
        >
          Apply Auto-Remediation to GeM Clause
        </Button>
      </div>

      {/* Before vs After Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Pane: Raw Draft Clauses */}
        <div className="bg-white border border-brand-border rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Extracted Raw Draft Tender Clauses
              </h3>
              <p className="text-xs text-slate-500">
                Source: NIT_Bridge_Steel_Procurement_Draft_2024.pdf
              </p>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              Un-remediated
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Clause 1 - Defective Withdrawn */}
            <div className="p-3.5 rounded-lg border-2 border-rose-300 bg-rose-50/50">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-rose-900">Clause 4.2.1 (Steel Reinforcement)</span>
                <span className="text-[10px] font-bold uppercase text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                  Defective Standard
                </span>
              </div>
              <p className="font-mono text-slate-800 bg-white p-2.5 rounded border border-rose-200">
                "High strength deformed steel bars shall conform strictly to <span className="bg-rose-200 font-bold px-1 rounded">IS 1786:1985</span> with yield strength min 415 N/mm²."
              </p>
              <div className="mt-2 text-[11px] text-rose-800 flex items-center gap-1.5 font-semibold">
                <XCircle className="h-3.5 w-3.5 text-rose-600" />
                <span>Audit Risk: IS 1786:1985 withdrawn by BIS; non-compliant with DPIIT QCO.</span>
              </div>
            </div>

            {/* Clause 2 - Missing Non Destructive Test */}
            <div className="p-3.5 rounded-lg border-2 border-amber-300 bg-amber-50/50">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-amber-900">Clause 8.4 (Site Testing & Quality)</span>
                <span className="text-[10px] font-bold uppercase text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                  Missing Testing Mandate
                </span>
              </div>
              <p className="font-mono text-slate-800 bg-white p-2.5 rounded border border-amber-200">
                "Visual inspection and random surface dye-penetrant testing shall be carried out at site by contractor's engineer."
              </p>
              <div className="mt-2 text-[11px] text-amber-800 flex items-center gap-1.5 font-semibold">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                <span>Audit Risk: Lacks 100% ultrasonic testing & NABL lab certification requirement.</span>
              </div>
            </div>

            {/* Clause 3 - Compliant Chemistry */}
            <div className="p-3.5 rounded-lg border border-emerald-300 bg-emerald-50/30">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-emerald-900">Clause 3.1 (Chemical Composition)</span>
                <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                  Verified Compliant
                </span>
              </div>
              <p className="font-mono text-slate-800 bg-white p-2.5 rounded border border-emerald-200">
                "Carbon equivalent shall not exceed 0.42% calculated as C + Mn/6 + (Cr+Mo+V)/5 + (Ni+Cu)/15."
              </p>
            </div>
          </div>
        </div>

        {/* Right Pane: BIS Gap Analysis & Remediation */}
        <div className="bg-white border border-brand-border rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                BIS Remediation & Synthesized Fixes
              </h3>
              <p className="text-xs text-slate-500">
                Authoritative compliance verified against BIS Gazette database
              </p>
            </div>
            <Badge variant="emerald" size="sm">
              Dispute-Proof
            </Badge>
          </div>

          <div className="space-y-4 text-xs">
            {/* Card 1: Critical Fix */}
            <div className="p-4 rounded-xl border border-rose-200 bg-white shadow-sm space-y-2">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
                <h4 className="font-bold text-rose-900 text-sm">
                  Auto-Upgrade to IS 1786:2024 Fe 500D
                </h4>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Draft cites obsolete 1985 code. Tenders for railway girder bridge works require Fe 500D (Seismic Grade) conforming to <strong>IS 1786:2024 Amendment 3</strong> with minimum 16% elongation.
              </p>
              <div className="p-2.5 rounded bg-blue-50/80 border border-blue-200 font-mono text-[11px] text-blue-900">
                Synthesized Replacement: "High strength deformed steel bars shall conform strictly to IS 1786:2024 (Grade Fe 500D) bearing valid BIS ISI mark."
              </div>
              <div className="text-[10px] text-slate-500 flex items-center gap-2">
                <span>Legal Ref: DPIIT Steel QCO S.O. 1225(E)</span>
              </div>
            </div>

            {/* Card 2: Warning Fix */}
            <div className="p-4 rounded-xl border border-amber-200 bg-white shadow-sm space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                <h4 className="font-bold text-amber-900 text-sm">
                  Insert 100% Ultrasonic Testing Mandate
                </h4>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Add mandatory non-destructive ultrasonic testing referencing <strong>IS 1608</strong> and <strong>IS 9000</strong> conducted at an accredited NABL facility prior to shipment.
              </p>
              <div className="p-2.5 rounded bg-blue-50/80 border border-blue-200 font-mono text-[11px] text-blue-900">
                Synthesized Replacement: "100% ultrasonic testing shall be executed per IS 1608 with NABL accredited test reports dated within 180 days."
              </div>
            </div>

            {/* Card 3: Compliant Fix */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-white shadow-sm space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <h4 className="font-bold text-emerald-900 text-sm">
                  Chemical Limits Fully Validated
                </h4>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Carbon equivalent maximum 0.42% strictly satisfies Table 2 of IS 1786. No alteration necessary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
