import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  FileText,
  Clock,
  Calendar,
  Bell,
  User,
  Lock,
  ChevronRight,
  Download,
  Search,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export const ClientDashboardView: React.FC = () => {
  const {
    inquiries,
    consultations,
    notifications,
    setSelectedInquiryRef,
    setActiveView,
    markNotificationRead,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'inquiries' | 'messages' | 'documents' | 'appointments' | 'notifications' | 'profile' | 'privacy'
  >('inquiries');

  // Client user demo
  const clientName = 'Alexander Hayes';
  const clientEmail = 'a.hayes@apexlogistics.io';
  const clientOrg = 'Apex Logistics International';

  // Inquiries for this client
  const clientInquiries = inquiries.filter(
    (i) => i.email.toLowerCase() === clientEmail.toLowerCase() || i.clientName === clientName
  );

  const activeCases = clientInquiries.filter((i) => i.status !== 'Completed' && i.status !== 'Closed');
  const pastCases = clientInquiries.filter((i) => i.status === 'Completed' || i.status === 'Closed');

  // Documents from inquiries
  const allDocs = clientInquiries.flatMap((i) =>
    i.attachments.map((att) => ({ ...att, inquiryRef: i.referenceNumber, subject: i.subject }))
  );

  // Client consultations
  const clientConsultations = consultations.filter(
    (c) => c.email.toLowerCase() === clientEmail.toLowerCase() || c.clientName === clientName
  );

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Client Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
              Authenticated Client Portal
            </span>
          </div>
          <h1 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold tracking-wide text-slate-100">
            My Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Logged in as <strong className="text-slate-200">{clientName}</strong> ({clientOrg})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('request-assistance')}
            className="px-4 py-2 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-slate-950 font-bold text-xs rounded transition-all flex items-center gap-1.5"
          >
            <Shield className="w-4 h-4" />
            New Inquiry
          </button>
          <button
            onClick={() => setActiveView('book-consultation')}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded border border-slate-700"
          >
            Book Consultation
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex overflow-x-auto border-b border-slate-800 mb-8 gap-2 pb-1 scrollbar-thin">
        {[
          { id: 'inquiries', label: 'Active Inquiries', icon: Shield, count: activeCases.length },
          { id: 'messages', label: 'Case Messages', icon: MessageSquare },
          { id: 'documents', label: 'Document Vault', icon: FileText, count: allDocs.length },
          { id: 'appointments', label: 'Appointments', icon: Calendar, count: clientConsultations.length },
          { id: 'notifications', label: 'Notifications', icon: Bell, count: notifications.filter((n) => !n.read).length },
          { id: 'profile', label: 'Profile & Organization', icon: User },
          { id: 'privacy', label: 'Privacy & Security', icon: Lock },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-t-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 border-b-2 transition-colors ${
                isActive
                  ? 'border-amber-400 text-amber-300 bg-slate-900/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && tab.count > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-['Cinzel'] text-base font-bold text-slate-100">
              Active Case Files ({activeCases.length})
            </h2>
            <span className="text-xs text-slate-400">Click any case to open the private communication desk</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {clientInquiries.length === 0 ? (
              <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-xl text-xs text-slate-400">
                No inquiries registered under this account yet.
              </div>
            ) : (
              clientInquiries.map((inq) => (
                <div
                  key={inq.id}
                  onClick={() => {
                    setSelectedInquiryRef(inq.referenceNumber);
                    setActiveView('track-inquiry');
                  }}
                  className="bg-[#0B0F17] hover:bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-xl p-5 cursor-pointer transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-amber-400">
                        {inq.referenceNumber}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-300 font-medium">
                        {inq.assistanceType}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        Priority: {inq.urgency}
                      </span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                        {inq.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-100">{inq.subject}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {inq.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-4">
                      <span>Assigned: <strong className="text-slate-300">{inq.assignedStaffName || 'Triage Director'}</strong></span>
                      <span>Messages: <strong className="text-slate-300">{inq.messages.length}</strong></span>
                      <span>Docs: <strong className="text-slate-300">{inq.attachments.length}</strong></span>
                    </div>
                    <span className="text-amber-400 font-semibold flex items-center gap-1 hover:underline">
                      Open Communication Desk
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: MESSAGES */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="font-['Cinzel'] text-base font-bold text-slate-100">
              Active Conversations
            </h2>
          </div>
          {clientInquiries.map((inq) => (
            <div
              key={inq.id}
              onClick={() => {
                setSelectedInquiryRef(inq.referenceNumber);
                setActiveView('track-inquiry');
              }}
              className="p-4 bg-[#0B0F17] hover:bg-slate-900 border border-slate-800 rounded-xl cursor-pointer transition-all flex items-center justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-amber-400 font-bold">{inq.referenceNumber}</span>
                  <span className="text-xs font-semibold text-slate-200">{inq.subject}</span>
                </div>
                <div className="text-xs text-slate-400">
                  Last response from: <strong className="text-slate-300">{inq.assignedStaffName || 'Specialist'}</strong>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="font-['Cinzel'] text-base font-bold text-slate-100">
              Secured Document Vault
            </h2>
            <span className="text-xs text-slate-400">All files protected under NDA</span>
          </div>

          {allDocs.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-xl text-xs text-slate-400">
              No documents stored yet. You can attach documents to your active inquiries.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-[#0B0F17] border border-slate-800 rounded-xl p-4 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {doc.category || 'Document'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {doc.inquiryRef}
                      </span>
                    </div>
                    <div className="font-mono text-xs font-semibold text-slate-200 truncate" title={doc.name}>
                      {doc.name}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Uploaded by {doc.uploadedBy} • {(doc.size / 1024).toFixed(0)} KB
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Encrypted at rest
                    </span>
                    <button
                      onClick={() => alert(`Simulating secure download of ${doc.name}`)}
                      className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: APPOINTMENTS */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="font-['Cinzel'] text-base font-bold text-slate-100">
              Scheduled Consultations & Briefings
            </h2>
            <button
              onClick={() => setActiveView('book-consultation')}
              className="text-xs font-bold text-amber-400 hover:underline"
            >
              + Book New Consultation
            </button>
          </div>

          {clientConsultations.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-xl text-xs text-slate-400">
              No appointments scheduled.
            </div>
          ) : (
            <div className="space-y-3">
              {clientConsultations.map((c) => (
                <div
                  key={c.id}
                  className="bg-[#0B0F17] border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400">{c.referenceNumber}</span>
                      <span className="text-xs text-slate-200 font-semibold">{c.serviceType} Briefing</span>
                    </div>
                    <div className="text-xs text-slate-300">
                      {c.preferredDate} at {c.preferredTime} • {c.format}
                    </div>
                    <div className="text-xs text-slate-400">{c.description}</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                      {c.status}
                    </span>
                    {c.meetingLink && (
                      <a
                        href={c.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1"
                      >
                        Join Room
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <div className="space-y-3">
          <h2 className="font-['Cinzel'] text-base font-bold text-slate-100 pb-2 border-b border-slate-800">
            Account Notifications
          </h2>
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                n.read
                  ? 'bg-slate-950/60 border-slate-800 text-slate-400'
                  : 'bg-slate-900 border-amber-500/40 text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-100">{n.title}</span>
                <span className="text-[10px] text-slate-500">
                  {new Date(n.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs mt-1 text-slate-300">{n.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: PROFILE */}
      {activeTab === 'profile' && (
        <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-6 space-y-4 max-w-2xl">
          <h2 className="font-['Cinzel'] text-base font-bold text-slate-100 border-b border-slate-800 pb-2">
            Client & Organization Details
          </h2>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-500 block">Client Contact:</span>
              <span className="text-slate-200 font-semibold">{clientName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Organization:</span>
              <span className="text-slate-200 font-semibold">{clientOrg}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Email Address:</span>
              <span className="text-slate-200 font-semibold">{clientEmail}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Account Status:</span>
              <span className="text-emerald-400 font-semibold">Corporate Verified</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: PRIVACY */}
      {activeTab === 'privacy' && (
        <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-6 space-y-4 max-w-2xl text-xs text-slate-300">
          <h2 className="font-['Cinzel'] text-base font-bold text-slate-100 border-b border-slate-800 pb-2">
            Privacy Controls & Data Retention
          </h2>
          <p>
            Vigilance Shield & Solutions enforces strict data minimization. Your records are maintained exclusively for the duration of the engagement and can be purged upon request.
          </p>
          <div className="pt-2">
            <button
              onClick={() => alert('Data purge request submitted. Our compliance desk will confirm receipt within 24 hours.')}
              className="px-4 py-2 rounded bg-red-950/40 border border-red-800 text-red-300 hover:bg-red-900/60 font-semibold"
            >
              Request Complete Case Data Purge
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
