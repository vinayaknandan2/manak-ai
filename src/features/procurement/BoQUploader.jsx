import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import Button from '../../components/common/Button';

export default function BoQUploader({ onFileAnalyzed, isAuditing = false }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState({
    name: 'NIT_Bridge_Steel_Procurement_Draft_2024.pdf',
    size: '3.4 MB',
    pages: 24,
    clauses: 32,
  });

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        pages: 18,
        clauses: 26,
      });
    }
  };

  return (
    <div className="bg-white border border-brand-border rounded-xl p-5 shadow-sm">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
          dragActive
            ? 'border-brand-blue bg-blue-50/50'
            : 'border-slate-300 hover:border-slate-400 bg-slate-50/30'
        }`}
      >
        <div className="max-w-md mx-auto">
          <div className="inline-flex p-3 rounded-full bg-blue-50 text-brand-blue mb-3">
            <UploadCloud className="h-6 w-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Upload Draft Tender Document or BoQ Schedule
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Drag and drop NIT, RFP, or Technical BoQ (.pdf, .docx, .xlsx) up to 25MB
          </p>

          {/* Active File Ingestion Badge */}
          {selectedFile && (
            <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-left flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="h-5 w-5 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-emerald-900 truncate">
                    File Analyzed: {selectedFile.name}
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    {selectedFile.pages} Pages • {selectedFile.clauses} Technical Clauses Extracted • {selectedFile.size}
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Ready</span>
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center justify-center gap-3">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  setSelectedFile({
                    name: file.name,
                    size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                    pages: 18,
                    clauses: 26,
                  });
                }
              }}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-sm"
            >
              Browse Files
            </label>

            <Button
              variant="royal"
              size="md"
              loading={isAuditing}
              onClick={() => onFileAnalyzed && onFileAnalyzed(selectedFile)}
            >
              Run BIS Gap Audit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
