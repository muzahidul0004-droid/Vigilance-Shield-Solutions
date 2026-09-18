import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  FileText,
  Search,
  Calendar,
  CheckCircle2,
  Lock,
  ArrowRight,
  Clock,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';

export const HowItWorksView: React.FC = () => {
  const { setActiveView } = useApp();

  const steps = [
    {
      num: '01',
      title: 'Submit Your Request',
      subtitle: 'Encrypted Public Intake',
      desc: 'Tell us what you need help with. Provide contact details, a description of the matter, and upload relevant contracts, notices, or dispute documents through our confidential portal without needing an account.',
      details: [
        'No pre-existing account required to initiate',
        'Optional document attachment (PDF, DOC, images)',
        'Anti-spam and sensitive credential protection',
        'Instant generation of your unique Reference Code (e.g., VSS-2026-000124)',
      ],
      sla: 'Completed in 1–2 minutes',
    },
    {
      num: '02',
      title: 'We Review',
      subtitle: 'Specialized Triage & Assessment',
      desc: 'Our senior review desk analyzes your submission against operational criteria, risk exposures, and jurisdiction requirements to assign the optimal case specialist or director.',
      details: [
        'Confidential assessment by senior case directors',
        'Cross-reference of contractual deadlines and cure periods',
        'Risk classification and urgency prioritization',
        'Initial response dispatched via your preferred method',
      ],
      sla: 'Initial assessment within 4–12 business hours',
    },
    {
      num: '03',
      title: 'Consultation & Planning',
      subtitle: 'Strategic Alignment & Scope Definition',
      desc: 'We communicate directly through your encrypted inquiry channel or an executive briefing call to formulate a structured course of action tailored to your commercial reality.',
      details: [
        'Private teleconference or secure messaging session',
        'Identification of key contractual levers and documentation gaps',
        'Definition of deliverables, milestones, and audit timelines',
        'Coordination with client-retained licensed counsel where needed',
      ],
      sla: 'Scheduled at client convenience',
    },
    {
      num: '04',
      title: 'Delivery',
      subtitle: 'Execution & Ongoing Governance',
      desc: 'We execute the agreed services: administering vendor communications, compiling chronological dispute dossiers, conducting compliance audits, and delivering tangible business protection.',
      details: [
        'Execution of project management and contract administration',
        'Delivery of evidence-grade chronologies & notice packs',
        'Real-time status updates via client tracker',
        'Secure archiving or certified data purge upon case closure',
      ],
      sla: 'Milestone-based delivery with continuous status visibility',
    },
  ];

  return (
    <div className="w-full py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            Structured Engagement Lifecycle
          </div>
          <h1 className="font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-slate-100">
            How It Works
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
            From initial confidential intake to final service delivery, our structured four-step methodology ensures total operational clarity, rapid response times, and uncompromising security.
          </p>
        </div>

        {/* 4 Steps Detailed Breakdown */}
        <div className="space-y-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6 sm:p-8 relative shadow-xl overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="font-mono text-3xl sm:text-4xl font-black text-amber-400/40 shrink-0 bg-slate-900 border border-slate-800 rounded-xl p-3 text-center min-w-[70px]">
                    {step.num}
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                      {step.subtitle}
                    </div>
                    <h2 className="font-['Cinzel'] text-xl sm:text-2xl font-bold text-slate-100">
                      {step.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{step.sla}</span>
                </div>
              </div>

              {/* Step Checklist */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {step.details.map((detail) => (
                  <div key={detail} className="flex items-center gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="p-8 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-2xl text-center space-y-4">
          <h3 className="font-['Cinzel'] text-2xl font-bold text-slate-100">
            Ready to Begin Step 01?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Submitting an initial inquiry takes under 2 minutes and requires no pre-existing account. Your data is encrypted immediately.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveView('request-assistance')}
              className="px-8 py-3.5 rounded text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all shadow-md shadow-amber-500/20 inline-flex items-center gap-2"
            >
              <Shield className="w-4 h-4 text-slate-950" />
              SUBMIT YOUR REQUEST (STEP 01)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
