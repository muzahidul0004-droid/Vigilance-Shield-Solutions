import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { InquiryStatus, UrgencyLevel, StaffMember } from '../types';
import {
  Shield,
  Search,
  Filter,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  MessageSquare,
  Lock,
  ChevronDown,
  Calendar,
  Send,
  Eye,
  Plus,
  Building,
  UserCheck,
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const {
    inquiries,
    consultations,
    staff,
    updateStatus,
    assignStaff,
    addMessage,
    setSelectedInquiryRef,
    setActiveView,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('All');
  const [selectedCaseId, setSelectedCaseId] = useState<string>(inquiries[0]?.id || '');
  const [internalNoteText, setInternalNoteText] = useState('');
  const [publicReplyText, setPublicReplyText] = useState('');

  // Selected Inquiry
  const currentCase = inquiries.find((i) => i.id === selectedCaseId) || inquiries[0];

  // Filtering
  const filteredInquiries = inquiries.filter((inq) => {
    const matchSearch =
      inq.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.companyName && inq.companyName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchStatus = statusFilter === 'All' || inq.status === statusFilter;
    const matchUrgency = urgencyFilter === 'All' || inq.urgency === urgencyFilter;

    return matchSearch && matchStatus && matchUrgency;
  });

  // Overview Stats
  const totalCount = inquiries.length;
  const underReviewCount = inquiries.filter((i) => i.status === 'Under Review' || i.status === 'Submitted').length;
  const inProgressCount = inquiries.filter((i) => i.status === 'In Progress' || i.status === 'In Discussion').length;
  const completedCount = inquiries.filter((i) => i.status === 'Completed').length;
  const consultationsCount = consultations.length;

  const handleSendInternalNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCase || !internalNoteText.trim()) return;

    addMessage(
      currentCase.id,
      internalNoteText.trim(),
      'staff',
      'Operations Director (Internal)',
      true
    );
    setInternalNoteText('');
  };

  const handleSendPublicReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCase || !publicReplyText.trim()) return;

    addMessage(
      currentCase.id,
      publicReplyText.trim(),
      'admin',
      'VSS Directorate Staff',
      false
    );
    setPublicReplyText('');
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Administrative Command Console
            </span>
          </div>
          <h1 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold tracking-wide text-slate-100">
            Case Management & Staff Dispatch
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review intake files, assign lead coordinators, and record confidential notes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('track-inquiry')}
            className="px-3.5 py-2 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700"
          >
            Client Tracker Simulator
          </button>
        </div>
      </div>

      {/* OVERVIEW METRICS (SECTION 10) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Total Inquiries</div>
          <div className="font-mono text-2xl font-bold text-slate-100 mt-1">{totalCount}</div>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="text-[10px] uppercase font-mono tracking-wider text-amber-400">Under Review</div>
          <div className="font-mono text-2xl font-bold text-amber-400 mt-1">{underReviewCount}</div>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="text-[10px] uppercase font-mono tracking-wider text-blue-400">In Progress</div>
          <div className="font-mono text-2xl font-bold text-blue-400 mt-1">{inProgressCount}</div>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="text-[10px] uppercase font-mono tracking-wider text-purple-400">Consultations</div>
          <div className="font-mono text-2xl font-bold text-purple-400 mt-1">{consultationsCount}</div>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl col-span-2 sm:col-span-1">
          <div className="text-[10px] uppercase font-mono tracking-wider text-emerald-400">Completed</div>
          <div className="font-mono text-2xl font-bold text-emerald-400 mt-1">{completedCount}</div>
        </div>
      </div>

      {/* Main Two-Column Workflow: Inquiries List & Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Filterable List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search and Filters */}
          <div className="bg-[#0B0F17] p-3.5 rounded-xl border border-slate-800 space-y-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by Ref #, client, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-1.5 bg-slate-950 border border-slate-800 rounded text-slate-300 text-xs focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="In Discussion">In Discussion</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <select
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value)}
                className="p-1.5 bg-slate-950 border border-slate-800 rounded text-slate-300 text-xs focus:outline-none"
              >
                <option value="All">All Priorities</option>
                <option value="Urgent">Urgent</option>
                <option value="Important">Important</option>
                <option value="Standard">Standard</option>
              </select>
            </div>
          </div>

          {/* Inquiry Cards List */}
          <div className="space-y-2.5 max-h-[650px] overflow-y-auto pr-1">
            {filteredInquiries.length === 0 ? (
              <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-xl text-xs text-slate-400">
                No inquiries match your criteria.
              </div>
            ) : (
              filteredInquiries.map((inq) => {
                const isSelected = currentCase?.id === inq.id;
                return (
                  <div
                    key={inq.id}
                    onClick={() => setSelectedCaseId(inq.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-amber-400 shadow-md shadow-amber-500/5'
                        : 'bg-[#0B0F17] hover:bg-slate-900/70 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono font-bold text-amber-400">{inq.referenceNumber}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                          inq.urgency === 'Urgent'
                            ? 'bg-red-950 text-red-300 border border-red-800'
                            : inq.urgency === 'Important'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {inq.urgency}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-100 truncate">{inq.subject}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {inq.clientName} {inq.companyName ? `• ${inq.companyName}` : ''}
                    </div>

                    <div className="pt-2 mt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                      <span className="text-slate-400">{inq.assistanceType}</span>
                      <span className="font-medium text-amber-300/80">{inq.status}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Case Management Workstation (7 cols) */}
        <div className="lg:col-span-7">
          {!currentCase ? (
            <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-xl text-xs text-slate-400">
              Select an inquiry to view management controls.
            </div>
          ) : (
            <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-5 space-y-6">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-amber-400">
                      {currentCase.referenceNumber}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-300 font-semibold">
                      {currentCase.assistanceType}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-slate-100 mt-0.5">{currentCase.subject}</h2>
                </div>

                <button
                  onClick={() => {
                    setSelectedInquiryRef(currentCase.referenceNumber);
                    setActiveView('track-inquiry');
                  }}
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-amber-300 border border-slate-700 flex items-center gap-1.5 self-start"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View As Client
                </button>
              </div>

              {/* Status & Staff Assignment Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
                <div>
                  <label className="block text-[11px] font-semibold uppercase font-mono text-slate-400 mb-1">
                    Update Pipeline Status
                  </label>
                  <select
                    value={currentCase.status}
                    onChange={(e) => updateStatus(currentCase.id, e.target.value as InquiryStatus, 'Operations Directorate')}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-xs text-amber-300 font-semibold focus:outline-none"
                  >
                    <option value="Submitted">Submitted</option>
                    <option value="Under Review">Under Review</option>
                    <option value="In Discussion">In Discussion</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase font-mono text-slate-400 mb-1">
                    Assign Lead Staff Member
                  </label>
                  <select
                    value={currentCase.assignedStaffId || ''}
                    onChange={(e) => {
                      const st = staff.find((s) => s.id === e.target.value);
                      if (st) assignStaff(currentCase.id, st.id, st.name);
                    }}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="">Unassigned (Triage Desk)</option>
                    {staff.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Client & Case Details */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Client Contact</span>
                  <span className="font-semibold text-slate-200">{currentCase.clientName}</span>
                  <div className="text-slate-400 text-[11px]">{currentCase.email} • {currentCase.phone}</div>
                </div>

                <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Organization & Urgency</span>
                  <span className="font-semibold text-slate-200">{currentCase.companyName || 'Private Client'}</span>
                  <div className="text-amber-400 text-[11px]">Priority: {currentCase.urgency}</div>
                </div>
              </div>

              {/* Case Narrative */}
              <div>
                <span className="text-[11px] font-semibold uppercase font-mono text-slate-400 block mb-1">
                  Intake Narrative
                </span>
                <p className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {currentCase.description}
                </p>
              </div>

              {/* Attached Documents */}
              {currentCase.attachments.length > 0 && (
                <div>
                  <span className="text-[11px] font-semibold uppercase font-mono text-slate-400 block mb-1.5">
                    Attached Evidence / Documents ({currentCase.attachments.length})
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentCase.attachments.map((att) => (
                      <div
                        key={att.id}
                        className="px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-mono text-[11px]">{att.name}</span>
                        <span className="text-[10px] text-slate-500">({(att.size / 1024).toFixed(0)} KB)</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages & Internal Notes Log */}
              <div className="border-t border-slate-800 pt-5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center justify-between">
                  <span>Communications & Internal Log</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {currentCase.messages.length} total entries
                  </span>
                </h3>

                <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
                  {currentCase.messages.map((m) => (
                    <div
                      key={m.id}
                      className={`p-3 rounded-lg text-xs ${
                        m.isInternalNote
                          ? 'bg-amber-950/30 border border-amber-500/30 text-amber-100'
                          : m.senderRole === 'client'
                          ? 'bg-slate-900 border border-slate-800 text-slate-300'
                          : 'bg-blue-950/30 border border-blue-800/40 text-blue-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="font-semibold flex items-center gap-1.5">
                          {m.senderName}
                          {m.isInternalNote && (
                            <span className="px-1 py-0.2 rounded bg-amber-400 text-slate-950 font-bold uppercase text-[8px]">
                              CONFIDENTIAL INTERNAL NOTE (CLIENT CANNOT SEE)
                            </span>
                          )}
                        </span>
                        <span className="text-slate-500">
                          {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="leading-relaxed whitespace-pre-line">{m.content}</p>
                    </div>
                  ))}
                </div>

                {/* Forms for Internal Note vs Public Client Reply */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {/* Internal Note (Staff only) */}
                  <form onSubmit={handleSendInternalNote} className="space-y-2 p-3 bg-amber-950/10 border border-amber-500/20 rounded-xl">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Add Internal Staff Note (Hidden From Client)
                    </span>
                    <textarea
                      rows={2}
                      placeholder="e.g. Risk analysis completed, awaiting legal consultation clearance..."
                      value={internalNoteText}
                      onChange={(e) => setInternalNoteText(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-amber-500/30 rounded text-xs text-amber-100 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded transition-colors"
                    >
                      Save Internal Note
                    </button>
                  </form>

                  {/* Public Client Message */}
                  <form onSubmit={handleSendPublicReply} className="space-y-2 p-3 bg-slate-900 border border-slate-800 rounded-xl">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1">
                      <Send className="w-3 h-3 text-blue-400" />
                      Dispatch Response to Client
                    </span>
                    <textarea
                      rows={2}
                      placeholder="Type response visible to client in their portal..."
                      value={publicReplyText}
                      onChange={(e) => setPublicReplyText(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs text-slate-200 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold rounded transition-colors"
                    >
                      Send Client Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
