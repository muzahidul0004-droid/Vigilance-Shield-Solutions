import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { InquiryStatus, AttachmentFile } from '../types';
import {
  Shield,
  Search,
  CheckCircle,
  Clock,
  Send,
  Paperclip,
  Calendar,
  AlertCircle,
  User,
  Building,
  FileText,
  Lock,
  ArrowLeft,
  X,
  ChevronRight,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';

const STATUS_STEPS: InquiryStatus[] = [
  'Submitted',
  'Under Review',
  'In Discussion',
  'In Progress',
  'Completed',
];

export const TrackInquiryView: React.FC = () => {
  const {
    inquiries,
    selectedInquiryRef,
    setSelectedInquiryRef,
    addMessage,
    setActiveView,
    userRole,
  } = useApp();

  const [inputRef, setInputRef] = useState(selectedInquiryRef || '');
  const [searchError, setSearchError] = useState('');
  const [replyText, setReplyText] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<AttachmentFile[]>([]);
  const [uploadError, setUploadError] = useState('');

  // Find active inquiry
  const activeInquiry = inquiries.find(
    (inq) =>
      inq.referenceNumber.toUpperCase() === (selectedInquiryRef || inputRef).trim().toUpperCase() ||
      inq.id.toUpperCase() === (selectedInquiryRef || inputRef).trim().toUpperCase()
  );

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    const clean = inputRef.trim().toUpperCase();
    if (!clean) return;

    const found = inquiries.find(
      (inq) => inq.referenceNumber.toUpperCase() === clean || inq.id.toUpperCase() === clean
    );

    if (found) {
      setSelectedInquiryRef(found.referenceNumber);
      setSearchError('');
    } else {
      setSearchError(`Inquiry "${clean}" not found. Please verify your reference code or submit a new inquiry.`);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeInquiry || (!replyText.trim() && attachedFiles.length === 0)) return;

    const senderRole = userRole === 'admin' ? 'admin' : 'client';
    const senderName = userRole === 'admin' ? 'Executive Director' : activeInquiry.clientName;

    addMessage(
      activeInquiry.id,
      replyText.trim() || 'Uploaded attachment document.',
      senderRole,
      senderName,
      false,
      attachedFiles
    );

    setReplyText('');
    setAttachedFiles([]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);
    const newItems: AttachmentFile[] = [];

    for (const f of files) {
      if (f.size > 10 * 1024 * 1024) {
        setUploadError(`File "${f.name}" exceeds 10MB limit.`);
        continue;
      }
      newItems.push({
        id: `att-msg-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
        name: f.name,
        size: f.size,
        type: f.type,
        uploadedAt: new Date().toISOString(),
        uploadedBy: userRole === 'admin' ? 'Staff' : 'Client',
      });
    }

    setAttachedFiles((prev) => [...prev, ...newItems]);
  };

  // Status progression calculation
  const getStepStatus = (step: InquiryStatus, current: InquiryStatus) => {
    const stepIdx = STATUS_STEPS.indexOf(step);
    const currentIdx = STATUS_STEPS.indexOf(current);

    if (current === 'Completed') return 'completed';
    if (stepIdx < currentIdx || (currentIdx === -1 && stepIdx === 0)) return 'completed';
    if (stepIdx === currentIdx) return 'current';
    return 'upcoming';
  };

  // Filter messages: Client should NEVER see isInternalNote messages!
  const visibleMessages = activeInquiry
    ? activeInquiry.messages.filter((msg) => userRole === 'admin' || !msg.isInternalNote)
    : [];

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
        <div>
          <button
            onClick={() => setActiveView('home')}
            className="inline-flex items-center text-xs text-slate-400 hover:text-amber-400 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Back to Public Website
          </button>
          <h1 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold tracking-wide text-slate-100 flex items-center gap-3">
            <Lock className="w-6 h-6 text-amber-400" />
            Confidential Inquiry Tracker
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Private client communication portal for Vigilance Shield & Solutions.
          </p>
        </div>

        {/* Quick Reference Code Search */}
        <form onSubmit={handleLookup} className="w-full sm:w-auto flex items-center gap-2">
          <input
            type="text"
            placeholder="Reference code (e.g., VSS-2026-000124)"
            value={inputRef}
            onChange={(e) => setInputRef(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs font-mono uppercase text-slate-200 focus:border-amber-400 focus:outline-none w-60"
          />
          <button
            type="submit"
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            Lookup
          </button>
        </form>
      </div>

      {searchError && (
        <div className="mb-6 p-4 bg-red-950/40 border border-red-800/80 rounded-lg text-xs text-red-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{searchError}</span>
        </div>
      )}

      {!activeInquiry ? (
        <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-xl p-8 max-w-xl mx-auto">
          <Shield className="w-12 h-12 text-amber-400/60 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-200">No Inquiry Selected</h3>
          <p className="text-xs text-slate-400 mt-1 mb-6">
            Enter your unique reference number above, or click one of the recent inquiries below to inspect the private communication channel:
          </p>
          <div className="space-y-2 text-left">
            {inquiries.slice(0, 3).map((inq) => (
              <div
                key={inq.id}
                onClick={() => {
                  setSelectedInquiryRef(inq.referenceNumber);
                  setInputRef(inq.referenceNumber);
                }}
                className="p-3 bg-slate-950 hover:bg-slate-800/70 border border-slate-800 hover:border-amber-500/40 rounded flex items-center justify-between cursor-pointer transition-all"
              >
                <div>
                  <div className="font-mono text-xs font-bold text-amber-400">{inq.referenceNumber}</div>
                  <div className="text-xs text-slate-300 font-medium truncate max-w-sm">{inq.subject}</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {inq.status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800">
            <button
              onClick={() => setActiveView('request-assistance')}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-2"
            >
              Need to submit a new inquiry? Click here to Request Assistance.
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Messaging & Status Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Pipeline Progress Bar */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold">
                    Inquiry #{activeInquiry.referenceNumber}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-400">
                    Category: <strong className="text-slate-200">{activeInquiry.assistanceType}</strong>
                  </span>
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                  activeInquiry.status === 'Completed'
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                    : activeInquiry.status === 'In Progress'
                    ? 'bg-blue-950/60 border-blue-500 text-blue-300'
                    : 'bg-amber-950/60 border-amber-500 text-amber-300'
                }`}>
                  Current: {activeInquiry.status}
                </span>
              </div>

              {/* Steps Progress */}
              <div className="grid grid-cols-5 gap-1 pt-2">
                {STATUS_STEPS.map((step, idx) => {
                  const state = getStepStatus(step, activeInquiry.status);
                  return (
                    <div key={step} className="flex flex-col items-center text-center">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                          state === 'completed'
                            ? 'bg-amber-500 text-slate-950'
                            : state === 'current'
                            ? 'bg-amber-400/20 text-amber-300 border-2 border-amber-400 animate-pulse'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {state === 'completed' ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                      </div>
                      <span
                        className={`text-[10px] mt-1.5 font-medium leading-tight ${
                          state === 'current'
                            ? 'text-amber-300 font-semibold'
                            : state === 'completed'
                            ? 'text-slate-300'
                            : 'text-slate-500'
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Conversation Feed */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-xl flex flex-col h-[520px]">
              {/* Channel Header */}
              <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold text-slate-200">
                    Encrypted Case Communications Desk
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveView('book-consultation')}
                    className="text-xs font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Request Consultation
                  </button>
                </div>
              </div>

              {/* Message List */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {visibleMessages.length === 0 ? (
                  <div className="text-center py-10 text-xs text-slate-500">
                    No messages recorded yet. Send a message below to reach your assigned case specialist.
                  </div>
                ) : (
                  visibleMessages.map((msg) => {
                    const isClient = msg.senderRole === 'client';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isClient ? 'items-end' : 'items-start'}`}
                      >
                        <div className="flex items-center gap-2 mb-1 px-1">
                          <span className="text-[11px] font-semibold text-slate-300">
                            {msg.senderName}
                          </span>
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded font-mono uppercase ${
                              isClient ? 'bg-slate-800 text-slate-400' : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {isClient ? 'Client' : 'Case Specialist'}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <div
                          className={`max-w-[85%] rounded-lg p-3.5 text-xs leading-relaxed ${
                            isClient
                              ? 'bg-slate-800/90 text-slate-100 border border-slate-700'
                              : 'bg-amber-950/30 text-amber-100/95 border border-amber-500/30 shadow-sm'
                          }`}
                        >
                          <p className="whitespace-pre-line">{msg.content}</p>

                          {msg.attachments && msg.attachments.length > 0 && (
                            <div className="mt-2.5 pt-2 border-t border-white/10 space-y-1">
                              {msg.attachments.map((att) => (
                                <div
                                  key={att.id}
                                  className="flex items-center gap-1.5 text-[11px] text-amber-300 underline underline-offset-2 cursor-pointer"
                                >
                                  <Paperclip className="w-3 h-3" />
                                  <span>{att.name}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Message Composer */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-950/70 rounded-b-xl">
                {attachedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {attachedFiles.map((file) => (
                      <span
                        key={file.id}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700"
                      >
                        <FileText className="w-3 h-3 text-amber-400" />
                        {file.name}
                        <button
                          type="button"
                          onClick={() => setAttachedFiles((prev) => prev.filter((f) => f.id !== file.id))}
                          className="hover:text-red-400 ml-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {uploadError && <p className="text-[11px] text-red-400 mb-1">{uploadError}</p>}

                <div className="flex items-center gap-2">
                  <label className="p-2 text-slate-400 hover:text-amber-400 cursor-pointer rounded hover:bg-slate-800 transition-colors" title="Attach Document">
                    <Paperclip className="w-4 h-4" />
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.xlsx"
                    />
                  </label>

                  <input
                    type="text"
                    placeholder="Type your message to the assigned case specialist..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded text-xs text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                  />

                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded transition-colors flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Sidebar: Inquiry Summary & Governance */}
          <div className="space-y-6">
            {/* Case Overview Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 pb-2 border-b border-slate-800 flex items-center justify-between">
                <span>Inquiry Specifications</span>
                <span className="font-mono text-amber-400 lowercase">{activeInquiry.referenceNumber}</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Subject</span>
                  <span className="font-semibold text-slate-200">{activeInquiry.subject}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Primary Contact</span>
                  <span className="text-slate-200">
                    {activeInquiry.clientName}
                    {activeInquiry.companyName && ` (${activeInquiry.companyName})`}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Assigned Specialist</span>
                  <span className="text-amber-300 font-medium">
                    {activeInquiry.assignedStaffName || 'Triage Director (Under Review)'}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Urgency Level</span>
                  <span
                    className={`inline-block font-semibold px-2 py-0.5 rounded text-[10px] mt-0.5 ${
                      activeInquiry.urgency === 'Urgent'
                        ? 'bg-red-950/60 text-red-300 border border-red-800'
                        : activeInquiry.urgency === 'Important'
                        ? 'bg-amber-950/60 text-amber-300 border border-amber-800'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {activeInquiry.urgency} Priority
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Preferred Communication</span>
                  <span className="text-slate-200">
                    {activeInquiry.preferredMethod} ({activeInquiry.preferredContactTime})
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Initial Description</span>
                  <p className="text-[11px] text-slate-400 line-clamp-4 bg-slate-950/60 p-2.5 rounded border border-slate-800/80 leading-relaxed">
                    {activeInquiry.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Document Repository */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 pb-2 border-b border-slate-800 flex items-center justify-between">
                <span>Associated Documents</span>
                <span className="text-[10px] text-slate-400">{activeInquiry.attachments.length} files</span>
              </h3>

              {activeInquiry.attachments.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-2">No documents attached to this case.</p>
              ) : (
                <div className="space-y-2">
                  {activeInquiry.attachments.map((file) => (
                    <div
                      key={file.id}
                      className="p-2.5 bg-slate-950 border border-slate-800 rounded flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate text-slate-200 font-mono text-[11px]">{file.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium shrink-0 ml-2">
                        {file.category || 'Doc'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confidentiality Reminder */}
            <div className="p-4 bg-slate-950/70 border border-amber-500/20 rounded-xl text-xs space-y-1.5 text-slate-400">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px] uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                Confidentiality Assurance
              </div>
              <p className="text-[11px] leading-relaxed">
                All records and communications are strictly protected under corporate non-disclosure protocols and encrypted at rest.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
