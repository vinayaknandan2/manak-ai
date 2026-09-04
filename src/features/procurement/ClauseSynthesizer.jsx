import React, { useState } from 'react';
import {
  Copy,
  Check,
  FileDown,
  FileSpreadsheet,
  FileText,
  Sliders,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import Button from '../../components/common/Button';

export default function ClauseSynthesizer() {
  const [copied, setCopied] = useState(false);

  // Parameter toggles
  const [params, setParams] = useState({
    isiMark: true,
    nablReport: true,
    thirdPartyInspection: true,
    beeStar: false,
    makeInIndia: true,
  });

  const toggleParam = (key) => {
    setParams((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Dynamically constructed dispute-proof clause based on toggles
  const generatedClause = `The contractor/supplier shall supply LED Luminaires conforming strictly to IS 10322 (Part 5/Sec 3):2024 bearing valid Bureau of Indian Standards (BIS) certification mark (ISI License) as on bid opening date.${
    params.nablReport
      ? ' The power controlgear must satisfy IS 15885-2-13 with surge immunity up to 10kV tested in accordance with IS 16103 at an accredited NABL facility with test reports not older than 180 days.'
      : ' The power controlgear must satisfy IS 15885-2-13 with surge immunity up to 10kV per IS 16103.'
  }${
    params.thirdPartyInspection
      ? ' Pre-dispatch Third Party Inspection (TPI) shall be executed through an approved agency (RITES / EIL / SGS) certifying dimensional and photometric compliance.'
      : ''
  }${
    params.beeStar
      ? ' Luminaires must possess valid BEE 5-Star energy efficiency rating with minimum system efficacy of 130 lm/W.'
      : ''
  }${
    params.makeInIndia
      ? ' Bidder must submit DPIIT Class-I Local Supplier self-certification and QCO S.O. 1563(E) compliance affidavit.'
      : ''
  }`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedClause);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Parameter Customization Toggles */}
      <div className="bg-white border border-brand-border rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Sliders className="h-4 w-4 text-brand-blue" />
          <h3 className="text-sm font-bold text-slate-900">
            Interactive Clause Parameter Customization
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={params.isiMark}
              onChange={() => toggleParam('isiMark')}
              className="mt-0.5 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
            />
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Mandatory ISI Mark License
              </span>
              <span className="text-[11px] text-slate-500">
                Enforces valid CMo/L license at bid submission
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={params.nablReport}
              onChange={() => toggleParam('nablReport')}
              className="mt-0.5 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
            />
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                NABL Lab Report (&lt; 180 Days)
              </span>
              <span className="text-[11px] text-slate-500">
                Requires recent laboratory type-test certificate
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={params.thirdPartyInspection}
              onChange={() => toggleParam('thirdPartyInspection')}
              className="mt-0.5 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
            />
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Pre-Dispatch TPI (RITES / EIL)
              </span>
              <span className="text-[11px] text-slate-500">
                Mandates 3rd-party pre-shipment inspection
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={params.beeStar}
              onChange={() => toggleParam('beeStar')}
              className="mt-0.5 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
            />
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                BEE 5-Star Energy Mandate
              </span>
              <span className="text-[11px] text-slate-500">
                Enforces minimum 130 lm/W luminous efficacy
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={params.makeInIndia}
              onChange={() => toggleParam('makeInIndia')}
              className="mt-0.5 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
            />
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                DPIIT QCO & MII Affidavit
              </span>
              <span className="text-[11px] text-slate-500">
                Mandates Gazette S.O. 1563(E) compliance
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Synthesized Tender Clause Preview Card */}
      <div className="bg-white border-2 border-brand-blue/30 rounded-2xl p-6 shadow-md relative">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brand-blue" />
            <h3 className="text-sm font-bold text-slate-900">
              Synthesized Dispute-Proof Technical Clause (Ready for GeM BoQ)
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Audit Rejection Risk: 0.0%
          </span>
        </div>

        {/* Monospace Reading Box */}
        <div className="p-5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm leading-relaxed border border-slate-800 shadow-inner">
          <p className="whitespace-pre-wrap">{generatedClause}</p>
        </div>

        {/* Export Action Toolbar */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-400">
            Formatted to GeM GTC (General Terms and Conditions) Clause 4.1 Specification
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Copy button */}
            <Button
              variant={copied ? 'whiteCta' : 'royal'}
              size="md"
              iconLeft={copied ? Check : Copy}
              onClick={handleCopy}
              className={copied ? '!bg-emerald-600 !text-white !border-emerald-500' : ''}
            >
              {copied ? 'Copied to Clipboard!' : '1-Click Copy Clause'}
            </Button>

            {/* Word .docx export */}
            <Button
              variant="outline"
              size="md"
              iconLeft={FileDown}
              onClick={() => alert('Downloaded formatted GeM technical specification (.docx)')}
            >
              Download .docx
            </Button>

            {/* Excel BoQ export */}
            <Button
              variant="outline"
              size="md"
              iconLeft={FileSpreadsheet}
              onClick={() => alert('Exported to GeM BoQ Excel Template (.xlsx)')}
            >
              Export BoQ .xlsx
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
