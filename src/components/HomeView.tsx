import React from 'react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';
import {
  Shield,
  FileCheck,
  Scale,
  Lock,
  ArrowRight,
  CheckCircle2,
  Clock,
  Building,
  Users,
  AlertCircle,
  FileText,
  Search,
  Calendar,
  Briefcase,
  ChevronRight,
} from 'lucide-react';
import { AssistanceType } from '../types';

export const HomeView: React.FC = () => {
  const { setActiveView, setSelectedServicePreselect, inquiries, setSelectedInquiryRef } = useApp();

  const handleRequestService = (svc: AssistanceType) => {
    setSelectedServicePreselect(svc);
    setActiveView('request-assistance');
  };

  const coreServices = [
    {
      title: 'Contract & Vendor Solutions',
      category: 'Contract' as AssistanceType,
      desc: 'Rigorous contract coordination, vendor lifecycle management, SLA monitoring, and formal dispute documentation.',
      points: ['Contract administration', 'Vendor oversight & SLAs', 'Documentation support', 'Project responsibility'],
    },
    {
      title: 'Compliance & Risk Support',
      category: 'Compliance' as AssistanceType,
      desc: 'Comprehensive compliance coordination, business process reviews, risk identification, and audit trail preparation.',
      points: ['Risk identification', 'Regulatory process reviews', 'Documentation retention', 'Mitigation strategies'],
    },
    {
      title: 'Business Solutions & Management',
      category: 'Business Problem' as AssistanceType,
      desc: 'Targeted administrative and project execution support to resolve complex operational bottlenecks and vendor deadlock.',
      points: ['Outsourced responsibilities', 'Project coordination', 'Stakeholder alignment', 'Process remediation'],
    },
    {
      title: 'Protection & Interest Management',
      category: 'Risk/Protection' as AssistanceType,
      desc: 'Safeguarding strategic commercial interests through proactive risk planning, dispute chronologies, and confidential oversight.',
      points: ['Commercial interest defense', 'Dispute documentation', 'Risk-response planning', 'Confidential support'],
    },
    {
      title: 'Professional & Legal Coordination',
      category: 'Legal/Professional Coordination' as AssistanceType,
      desc: 'Organized case preparation and seamless coordination with appropriately licensed independent legal and technical counsel.',
      points: ['Pre-litigation document packs', 'External counsel liaison', 'Independent expert networks', 'Licensed referrals'],
      badge: 'Regulated Coordination',
    },
  ];

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-800 bg-gradient-to-b from-[#0B0F17] via-[#080B10] to-[#06080D]">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-slate-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Majestic Shield Visual Identity */}
            <div className="mb-6">
              <BrandLogo variant="hero" size="xl" />
            </div>

            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-xs font-semibold tracking-wider uppercase text-amber-300 shadow-inner mb-6">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              Protecting Interests. Delivering Solutions.
            </div>

            {/* Required Short Description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal mb-10">
              Professional contract, compliance, protection and business support solutions designed to help individuals and organizations manage responsibilities, reduce risks and resolve business challenges.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => setActiveView('request-assistance')}
                className="w-full sm:w-auto px-8 py-4 rounded text-sm sm:text-base font-bold tracking-wide text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all shadow-xl shadow-amber-500/20 active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                <Shield className="w-5 h-5 text-slate-950 transition-transform group-hover:scale-110" />
                REQUEST ASSISTANCE
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={() => setActiveView('services')}
                className="w-full sm:w-auto px-7 py-4 rounded border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-sm sm:text-base font-semibold text-slate-200 transition-all hover:border-slate-600 flex items-center justify-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-amber-400" />
                EXPLORE OUR SERVICES
              </button>

              <button
                onClick={() => setActiveView('contact')}
                className="w-full sm:w-auto px-6 py-4 rounded text-sm sm:text-base font-medium text-slate-400 hover:text-white transition-colors"
              >
                Contact Us
              </button>
            </div>

            {/* Fast 1-2 Minute Contact Guarantee Banner */}
            <div className="mt-8 text-xs text-slate-400 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Public intake ready: Submit your inquiry confidentially in under 2 minutes.</span>
            </div>
          </div>
        </div>

        {/* Quick Reference Tracker Stripe */}
        <div className="mt-14 border-t border-b border-slate-800/80 bg-slate-950/70 py-4 px-4">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Already submitted an inquiry? Access your encrypted communication channel:</span>
            </div>
            <button
              onClick={() => setActiveView('track-inquiry')}
              className="px-4 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 font-semibold flex items-center gap-1.5 transition-colors shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              Enter Reference #
            </button>
          </div>
        </div>
      </section>

      {/* CORE VALUE PILLARS & TRUST INDICATORS */}
      <section className="py-16 bg-[#090D14] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                Absolute Confidentiality
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every inquiry is handled under corporate non-disclosure safeguards. Your identity and trade data are never indexed or made public.
              </p>
            </div>

            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                Business Interest Defense
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Strategic oversight to protect company continuity, prevent unilateral vendor defaults, and preserve contract leverage.
              </p>
            </div>

            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                Methodical Documentation
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bulletproof administrative audit trails, notice timelines, and evidence-grade record compilations.
              </p>
            </div>

            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                Lawful & Ethical Standards
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Committed strictly to ethical practices. Where regulated legal representation is required, we coordinate with licensed counsel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 CORE SERVICE PILLARS */}
      <section className="py-20 bg-[#070A10] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">
                Specialized Solutions
              </span>
              <h2 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold tracking-wide text-slate-100 mt-1">
                Our Core Practice Areas
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Structured support designed for businesses, executives, and organizations requiring high-integrity operational coordination.
              </p>
            </div>
            <button
              onClick={() => setActiveView('services')}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 shrink-0"
            >
              View Full Scope of Services
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreServices.map((svc, i) => (
              <div
                key={svc.title}
                className={`p-6 bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 rounded-xl transition-all flex flex-col justify-between group ${
                  i === 4 ? 'md:col-span-2' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400/90 font-bold">
                      Pillar 0{i + 1}
                    </span>
                    {svc.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {svc.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-['Cinzel'] text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors mb-2">
                    {svc.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {svc.desc}
                  </p>

                  <ul className="space-y-1.5 mb-6 text-xs text-slate-300">
                    {svc.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => handleRequestService(svc.category)}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    Request Assistance
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveView('services')}
                    className="text-[11px] text-slate-400 hover:text-slate-300"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (SECTION 18) */}
      <section className="py-20 bg-[#0B0F17] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">
              Structured Engagement Process
            </span>
            <h2 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold tracking-wide text-slate-100 mt-1">
              How It Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              A transparent, four-step methodology ensuring rapid evaluation, rigorous execution, and constant client visibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl relative space-y-3">
              <div className="font-mono text-3xl font-black text-amber-400/30">01</div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                Submit Your Request
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tell us what you need help with. Provide contact details and optional documents through our encrypted public intake.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl relative space-y-3">
              <div className="font-mono text-3xl font-black text-amber-400/30">02</div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                We Review
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our team reviews your request and determines the appropriate next step, assessing risk factors and operational timelines.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl relative space-y-3">
              <div className="font-mono text-3xl font-black text-amber-400/30">03</div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                Consultation & Planning
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We communicate with you and develop an appropriate course of action, aligning on deliverables, scope, and coordination.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl relative space-y-3">
              <div className="font-mono text-3xl font-black text-amber-400/30">04</div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                Delivery
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We coordinate and deliver the agreed services, providing complete documentation, audit records, and progress updates.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setActiveView('request-assistance')}
              className="px-8 py-3.5 rounded text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all shadow-md shadow-amber-500/20 inline-flex items-center gap-2"
            >
              <Shield className="w-4 h-4 text-slate-950" />
              START STEP 01 — SUBMIT REQUEST
            </button>
          </div>
        </div>
      </section>

      {/* WHY WORK WITH US */}
      <section className="py-20 bg-[#080B10] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">
                Institutional Credibility
              </span>
              <h2 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold tracking-wide text-slate-100 leading-tight">
                Why Industry Leaders Rely on Vigilance Shield & Solutions
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Organizations frequently encounter high-stakes disputes, vendor non-performance, and compliance burdens that exceed internal administrative capacity. We act as an outsourced buffer and solution delivery partner to maintain discipline, preserve evidence, and achieve commercial resolution.
              </p>

              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-100">Protection of Commercial Leverage:</strong>{' '}
                    We prevent procedural forfeitures and compile chronological fact packets before disputes solidify.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-100">Cross-Disciplinary Coordination:</strong>{' '}
                    We bridge the gap between business operations and specialized external counsel, saving substantial retainer costs.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-100">Discretion & Strict Ethics:</strong>{' '}
                    Strict non-disclosure agreements govern every matter. We never overstep statutory boundaries.
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => setActiveView('about')}
                  className="px-5 py-2.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
                >
                  Read Our Corporate Ethos
                </button>
                <button
                  onClick={() => setActiveView('book-consultation')}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  Schedule Consultation
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Corporate Assurance Visual Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-8 relative shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <BrandLogo variant="icon" size="sm" />
                    <div>
                      <div className="text-xs font-bold text-slate-200">VSS Engagement Charter</div>
                      <div className="text-[10px] text-slate-400">Institutional Governance Spec</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500 text-emerald-300 font-semibold">
                    ASSURANCE VERIFIED
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-900/90 rounded border border-slate-800/80">
                    <div className="font-semibold text-amber-300 text-[11px] mb-0.5">
                      Client-Focused Service
                    </div>
                    <div className="text-slate-400 text-[11px] leading-relaxed">
                      Customized engagement models built around the specific commercial reality and timeline constraints of each client.
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/90 rounded border border-slate-800/80">
                    <div className="font-semibold text-amber-300 text-[11px] mb-0.5">
                      Responsible Data Handling
                    </div>
                    <div className="text-slate-400 text-[11px] leading-relaxed">
                      Encrypted file transport, access logs, and prompt data purging upon conclusion of services upon request.
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/90 rounded border border-slate-800/80">
                    <div className="font-semibold text-amber-300 text-[11px] mb-0.5">
                      Clear Regulatory Boundaries
                    </div>
                    <div className="text-slate-400 text-[11px] leading-relaxed">
                      Zero ambiguity: We operate purely as business administrators, risk coordinators, and liaison specialists.
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <button
                    onClick={() => setActiveView('request-assistance')}
                    className="w-full py-3 rounded text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors uppercase tracking-wider"
                  >
                    Engage Our Team Today
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION BANNER */}
      <section className="py-16 bg-gradient-to-r from-slate-950 via-[#0C121E] to-slate-950 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <h2 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold tracking-wide text-slate-100">
            Have an Urgent Contract, Vendor, or Compliance Challenge?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Our specialized intake desk is ready to review your matter confidentially. Submit an initial inquiry or book an executive briefing today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActiveView('request-assistance')}
              className="w-full sm:w-auto px-8 py-3.5 rounded text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-slate-950" />
              REQUEST ASSISTANCE NOW
            </button>
            <button
              onClick={() => setActiveView('book-consultation')}
              className="w-full sm:w-auto px-6 py-3.5 rounded border border-slate-700 bg-slate-900 hover:bg-slate-800 text-sm font-medium text-slate-200"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
