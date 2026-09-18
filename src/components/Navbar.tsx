import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { useApp } from '../context/AppContext';
import {
  Shield,
  FileText,
  Clock,
  Phone,
  User,
  ShieldAlert,
  Menu,
  X,
  Search,
  CheckCircle,
  Briefcase,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    userRole,
    setUserRole,
    inquiries,
    setSelectedInquiryRef,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickTrackInput, setQuickTrackInput] = useState('');
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [trackError, setTrackError] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanRef = quickTrackInput.trim().toUpperCase();
    if (!cleanRef) return;

    const exists = inquiries.find(
      (inq) => inq.referenceNumber.toUpperCase() === cleanRef || inq.id.toUpperCase() === cleanRef
    );

    if (exists) {
      setSelectedInquiryRef(exists.referenceNumber);
      setActiveView('track-inquiry');
      setTrackModalOpen(false);
      setQuickTrackInput('');
      setTrackError('');
    } else {
      setTrackError(`No record found matching "${cleanRef}". Please check your reference code (e.g., VSS-2026-000124).`);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0A0E17]/95 backdrop-blur-md">
      {/* Top Regulatory Compliance Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-[#0F172A] to-slate-950 px-4 py-1.5 border-b border-amber-500/20 text-[11px] text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-medium text-slate-300">
              Vigilance Shield & Solutions — Confidential Corporate, Contract, Compliance & Business Protection Services
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span className="hidden md:inline">
              Coordination with Licensed Professionals Where Regulated
            </span>
            <div className="flex items-center gap-1.5 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800 text-[10px]">
              <span className="text-slate-400">View Mode:</span>
              <button
                onClick={() => {
                  setUserRole('public');
                  if (activeView === 'admin-portal' || activeView === 'client-dashboard') {
                    setActiveView('home');
                  }
                }}
                className={`px-1.5 py-0.5 rounded ${
                  userRole === 'public' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Public
              </button>
              <span className="text-slate-600">|</span>
              <button
                onClick={() => {
                  setUserRole('client');
                  setActiveView('client-dashboard');
                }}
                className={`px-1.5 py-0.5 rounded ${
                  userRole === 'client' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Client Portal
              </button>
              <span className="text-slate-600">|</span>
              <button
                onClick={() => {
                  setUserRole('admin');
                  setActiveView('admin-portal');
                }}
                className={`px-1.5 py-0.5 rounded ${
                  userRole === 'admin' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <div onClick={() => setActiveView('home')} className="flex items-center">
            <BrandLogo variant="header" size="md" />
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveView(link.id as any)}
                className={`px-3.5 py-2 rounded-md text-sm font-medium tracking-wide transition-colors ${
                  activeView === link.id
                    ? 'text-amber-400 bg-slate-900/80 border-b-2 border-amber-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Track Inquiry Quick Lookup */}
            <button
              onClick={() => setTrackModalOpen(true)}
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
              title="Track Public Inquiry"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span>Track Inquiry</span>
            </button>
          </nav>

          {/* Right CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Request Assistance Primary Button */}
            <button
              onClick={() => setActiveView('request-assistance')}
              className="relative inline-flex items-center justify-center px-4 py-2.5 rounded text-sm font-semibold tracking-wide text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-md shadow-amber-500/10 hover:shadow-amber-500/25 hover:from-amber-200 hover:to-amber-400 transition-all active:scale-[0.98]"
            >
              <Shield className="w-4 h-4 mr-1.5 text-slate-950" />
              REQUEST ASSISTANCE
            </button>

            {/* Client Portal Link */}
            <button
              onClick={() => {
                setUserRole('client');
                setActiveView('client-dashboard');
              }}
              className="inline-flex items-center justify-center px-3.5 py-2 rounded border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-xs font-medium text-slate-200 transition-colors"
            >
              <User className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
              Client Login
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setActiveView('request-assistance')}
              className="px-2.5 py-1.5 text-xs font-semibold rounded text-slate-950 bg-amber-400"
            >
              Request Help
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-slate-300 hover:text-white hover:bg-slate-800"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-800 bg-[#0A0E17] px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveView(link.id as any);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2.5 rounded text-sm font-medium ${
                activeView === link.id
                  ? 'text-amber-400 bg-slate-900 border-l-4 border-amber-400'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setTrackModalOpen(true);
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 w-full text-left px-3 py-2.5 rounded text-sm text-slate-300 hover:bg-slate-800"
          >
            <Search className="w-4 h-4 text-amber-400" />
            Track Inquiry with Reference #
          </button>
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setActiveView('request-assistance');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center rounded text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500"
            >
              REQUEST ASSISTANCE
            </button>
            <button
              onClick={() => {
                setUserRole('client');
                setActiveView('client-dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 text-center rounded text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800"
            >
              Client Login / My Dashboard
            </button>
            <button
              onClick={() => {
                setUserRole('admin');
                setActiveView('admin-portal');
                setMobileMenuOpen(false);
              }}
              className="w-full py-1.5 text-center rounded text-xs text-slate-400 hover:text-amber-400"
            >
              Staff & Admin Secure Workspace
            </button>
          </div>
        </div>
      )}

      {/* Quick Track Modal */}
      {trackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-2xl relative">
            <button
              onClick={() => {
                setTrackModalOpen(false);
                setTrackError('');
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-100">
                  Track Inquiry Status
                </h3>
                <p className="text-xs text-slate-400">
                  Enter your unique reference number to access your private inquiry channel.
                </p>
              </div>
            </div>

            <form onSubmit={handleTrackSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Reference Code (e.g. VSS-2026-000124)
                </label>
                <input
                  type="text"
                  placeholder="VSS-2026-000124"
                  value={quickTrackInput}
                  onChange={(e) => {
                    setQuickTrackInput(e.target.value);
                    setTrackError('');
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded text-slate-100 text-sm font-mono focus:border-amber-400 focus:outline-none uppercase"
                  autoFocus
                />
              </div>

              {trackError && (
                <div className="p-3 bg-red-950/40 border border-red-800/60 rounded text-xs text-red-300">
                  {trackError}
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <div className="text-[11px] text-slate-400">
                  Demo refs: <span className="font-mono text-amber-400/90 cursor-pointer" onClick={() => setQuickTrackInput('VSS-2026-000124')}>VSS-2026-000124</span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTrackModalOpen(false);
                      setTrackError('');
                    }}
                    className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-semibold rounded transition-colors"
                  >
                    Lookup Inquiry
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
