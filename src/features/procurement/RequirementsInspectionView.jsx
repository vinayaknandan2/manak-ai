import React, { useState } from 'react';
import {
  CheckCircle2,
  Package,
  Layers,
  Sparkles,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  FileText,
  Tag,
  Scale,
  Wrench,
  AlertCircle,
  Building,
} from 'lucide-react';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

export default function RequirementsInspectionView({
  requirement,
  onSearchKeyword,
  onOpenClauseStudio,
}) {
  const [showRawText, setShowRawText] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!requirement) return null;

  const {
    product = 'Not specified',
    application = 'Public Procurement',
    technicalParameters = {},
    keywords = [],
    rawText = '',
    createdAt,
    _id,
  } = requirement;

  const handleCopyRaw = () => {
    if (!rawText) return;
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Extract known parameters or format dynamic ones
  const {
    material,
    capacity,
    quantity,
    properties = [],
    capType,
    maintenance,
    standards: statedStandards,
    ...otherParams
  } = technicalParameters;

  // Normalized properties list
  const propertiesList = Array.isArray(properties)
    ? properties
    : typeof properties === 'string'
    ? properties.split(',').map((p) => p.trim())
    : [];

  return (
    <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-start gap-3.5">
          <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-slate-900 capitalize">
                {product}
              </h3>
              <Badge variant="emerald" size="sm" dot>
                AI Extracted & Verified
              </Badge>
              {_id && (
                <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  ID: {_id.substring(0, 8)}...
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
              <Building className="h-3.5 w-3.5 text-slate-400" />
              <span>Target Domain: <strong className="text-slate-700">{application || 'Government Public Sector'}</strong></span>
              {createdAt && (
                <span className="text-slate-400">• {new Date(createdAt).toLocaleDateString()}</span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenClauseStudio && (
            <Button
              variant="outline"
              size="sm"
              iconLeft={FileText}
              onClick={onOpenClauseStudio}
            >
              Synthesize Clause
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            iconRight={showRawText ? ChevronUp : ChevronDown}
            onClick={() => setShowRawText(!showRawText)}
          >
            {showRawText ? 'Hide Raw Statement' : 'View Statement'}
          </Button>
        </div>
      </div>

      {/* Raw Stated Statement Collapsible */}
      {showRawText && (
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs space-y-2 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Original Draft Procurement Statement
            </span>
            <button
              onClick={handleCopyRaw}
              className="text-[11px] hover:text-white flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
          </div>
          <p className="font-mono leading-relaxed whitespace-pre-wrap text-slate-300">
            {rawText || 'No raw text available.'}
          </p>
        </div>
      )}

      {/* Technical Parameters Breakdown Grid */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-brand-blue" />
          <h4 className="text-xs font-medium uppercase tracking-normal text-slate-700">
            Technical Parameter Specifications
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {/* Material */}
          {material && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-normal text-slate-500">
                Material & Composition
              </span>
              <div className="text-xs font-medium text-slate-900 capitalize">
                {material}
              </div>
              <span className="inline-block text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-medium border border-blue-100">
                Food-Grade / Structural Grade
              </span>
            </div>
          )}

          {/* Capacity / Size */}
          {capacity && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Capacity / Dimensions
              </span>
              <div className="text-xs font-semibold text-slate-900">
                {capacity}
              </div>
              <span className="inline-block text-[10px] text-slate-600 bg-slate-200/60 px-2 py-0.5 rounded font-mono">
                Standard Volumetric Rating
              </span>
            </div>
          )}

          {/* Quantity */}
          {quantity && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Procurement Batch Quantity
              </span>
              <div className="text-xs font-bold text-slate-900">
                {quantity} Units
              </div>
              <span className="inline-block text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-100">
                Commercial Lot Size
              </span>
            </div>
          )}

          {/* Closure / Cap Type */}
          {capType && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Enclosure / Cap Mechanism
              </span>
              <div className="text-xs font-semibold text-slate-900">
                {capType}
              </div>
            </div>
          )}

          {/* Maintenance / Cleaning */}
          {maintenance && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Maintenance & Sanitation
              </span>
              <div className="text-xs font-semibold text-slate-900">
                {maintenance}
              </div>
            </div>
          )}

          {/* Any other dynamic parameters */}
          {Object.entries(otherParams).map(([key, val]) => (
            <div
              key={key}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <div className="text-xs font-semibold text-slate-900">
                {typeof val === 'object' ? JSON.stringify(val) : String(val)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mandatory Quality & Safety Attributes */}
      {propertiesList.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <h4 className="text-xs font-medium uppercase tracking-normal text-slate-700">
              Mandatory Quality & Performance Attributes ({propertiesList.length})
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {propertiesList.map((prop, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-2.5 bg-emerald-50/50 border border-emerald-200/70 rounded-lg text-xs"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-normal text-emerald-950 capitalize">{prop}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stated Standards & Statutory Mandate from Statement */}
      {statedStandards && (
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs space-y-1.5">
          <div className="flex items-center gap-2 text-brand-blue font-semibold">
            <Scale className="h-4 w-4 shrink-0" />
            <span>Stated Statutory & Standard Directive:</span>
          </div>
          <p className="text-blue-950 font-normal leading-relaxed">
            "{statedStandards}"
          </p>
          <p className="text-[11px] text-blue-700 font-normal">
            Mandated under Public Procurement Quality Control Orders (QCO) & BIS Act 2016.
          </p>
        </div>
      )}

      {/* Extracted Search Keywords */}
      {keywords.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-[11px] font-medium uppercase tracking-normal text-slate-600">
                Dispatched BIS Search Tokens ({keywords.length})
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-normal">Click token to match live standards</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {keywords.map((kw, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onSearchKeyword && onSearchKeyword(kw)}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-brand-blue hover:text-white border border-slate-200 hover:border-brand-blue transition-all"
              >
                #{kw}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
