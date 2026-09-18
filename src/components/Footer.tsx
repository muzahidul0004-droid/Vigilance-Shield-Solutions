import React from 'react';
import { BrandLogo } from './BrandLogo';
import { useApp } from '../context/AppContext';
import {
  Shield,
  Lock,
  FileCheck,
  Scale,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, setUserRole } = useApp();

  return (
    <footer className="w-full bg-[#06080D] border-t border-slate-800 text-slate-400 text-sm">
      {/* Top Banner with Trust Badges */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Confidential Handling
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Strict non-disclosure standards and encrypted communications for sensitive business data.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Interest Protection
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Proactive risk mitigation, vendor accountability, and strategic corporate oversight.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Rigorous Documentation
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Methodical audit trails, dispute records, contract chronologies, and evidence readiness.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Professional Coordination
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Seamless liaison with appropriately licensed legal counsel and certified specialists.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand Lockup & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="footer" size="lg" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mt-4">
              Vigilance Shield & Solutions provides professional contract, compliance, protection, and business support solutions designed to help individuals and organizations manage responsibilities, reduce operational risks, and resolve critical business challenges.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Executive Operations: New York • London • Singapore Liaison</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>intake@vigilanceshield.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Direct Client Line: +1 (800) 592-7443</span>
              </div>
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4 pb-1 border-b border-slate-800">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setActiveView('services')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500/70" />
                  Contract & Vendor Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('services')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500/70" />
                  Compliance & Risk Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('services')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500/70" />
                  Business Solutions & PM
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('services')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500/70" />
                  Protection & Interest Mgmt
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('services')}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500/70" />
                  Professional & Legal Coordination
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Actions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4 pb-1 border-b border-slate-800">
              Platform & Intake
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setActiveView('request-assistance')}
                  className="text-amber-300 font-medium hover:text-amber-200 flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  Request Assistance (Public)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('track-inquiry')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500/70" />
                  Track Public Inquiry
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('book-consultation')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500/70" />
                  Book Executive Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('how-it-works')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500/70" />
                  How It Works (4 Steps)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setUserRole('client');
                    setActiveView('client-dashboard');
                  }}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500/70" />
                  Client Portal Login
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Governance & Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4 pb-1 border-b border-slate-800">
              Governance & Trust
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setActiveView('privacy-policy')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500/70" />
                  Privacy & Data Safeguards
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('terms-of-service')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500/70" />
                  Terms of Engagement
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('disclaimer')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-amber-500/70" />
                  Regulatory & Legal Disclaimer
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => {
                    setUserRole('admin');
                    setActiveView('admin-portal');
                  }}
                  className="text-[11px] text-slate-500 hover:text-amber-400/90 transition-colors flex items-center gap-1.5"
                >
                  <Shield className="w-3 h-3 text-slate-600" />
                  Authorized Staff & Admin Login
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Legal & Regulatory Disclaimer Box */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 bg-slate-950/40 p-4 rounded-lg border border-slate-900">
          <div className="flex items-start gap-3">
            <Scale className="w-4 h-4 text-amber-400/80 shrink-0 mt-0.5" />
            <div className="text-[11px] text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-300">Mandatory Regulatory Notice & Disclaimer:</span>{' '}
              Vigilance Shield & Solutions provides business, contract, compliance, coordination, risk mitigation, and corporate support services. Information provided through this digital platform does not automatically constitute a lawyer-client relationship or formal legal advice. Where regulated legal representation, formal court filings, or statutory opinions are required, matters are referred to and coordinated with appropriately licensed and certified independent legal practitioners. Vigilance Shield & Solutions is not a law enforcement entity, private police agency, or vigilante organization.
            </div>
          </div>
        </div>

        {/* Copyright & Sub-footer */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <div>
            © {new Date().getFullYear()} Vigilance Shield & Solutions LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Corporate Registration: Active</span>
            <span>•</span>
            <span>Security Tier: High Assurance SSL/TLS</span>
            <span>•</span>
            <button
              onClick={() => setActiveView('disclaimer')}
              className="hover:text-amber-400 underline underline-offset-2"
            >
              Statutory Disclaimers
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
