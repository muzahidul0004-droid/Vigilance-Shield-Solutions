import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AssistanceType } from '../types';
import {
  Shield,
  FileCheck,
  Scale,
  Briefcase,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Filter,
  Check,
  Building,
  Users,
} from 'lucide-react';

export const ServicesView: React.FC = () => {
  const { setActiveView, setSelectedServicePreselect } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const servicesData = [
    {
      id: 'contract',
      category: 'Contract' as AssistanceType,
      title: 'Contract & Vendor Solutions',
      tagline: 'Precision oversight for agreements, service levels, and vendor compliance.',
      description:
        'Contracts and supplier agreements are the backbone of commerce, yet vendor non-performance and administrative oversights cause severe financial leakage. We provide hands-on contract coordination, administration, and vendor dispute documentation.',
      whatWeHelpWith: [
        'Contract coordination & lifecycle tracking',
        'Vendor performance monitoring & SLA reviews',
        'Formal contract administration & milestone verification',
        'Project responsibility & deliverable matrix management',
        'Structured dispute and notice documentation support',
      ],
      whoItIsFor:
        'Enterprises, procurement teams, general contractors, commercial buyers, and businesses managing multi-vendor projects who need organized execution oversight without adding full-time overhead.',
    },
    {
      id: 'compliance',
      category: 'Compliance' as AssistanceType,
      title: 'Compliance & Risk Support',
      tagline: 'Identifying operational exposures and structuring defensible compliance records.',
      description:
        'Regulatory frameworks and industry standards evolve rapidly. We assist clients in conducting structured business process reviews, mapping risk exposures, and assembling verifiable record-management systems.',
      whatWeHelpWith: [
        'Compliance program coordination & tracking',
        'Operational and third-party risk identification',
        'Internal business process reviews & gap audits',
        'Documentation systems & verifiable record management',
        'Practical risk mitigation planning & response frameworks',
      ],
      whoItIsFor:
        'Growing companies, medical/tech labs, logistics providers, and regulated entities preparing for external reviews, subcontractor audits, or institutional client due diligence.',
    },
    {
      id: 'business',
      category: 'Business Problem' as AssistanceType,
      title: 'Business Solutions & Operations',
      tagline: 'Targeted administrative muscle and project execution for complex corporate friction.',
      description:
        'When critical projects stall due to operational deadlocks or insufficient specialized staff, our consultants step in to provide outsourced administrative support, stakeholder coordination, and milestone execution.',
      whatWeHelpWith: [
        'Outsourced executive and business responsibilities',
        'High-priority administrative & documentation support',
        'Inter-departmental and vendor business coordination',
        'End-to-end project management & remediation plans',
        'Client, supplier, and partner relationship coordination',
      ],
      whoItIsFor:
        'Executive teams, board directors, and business owners dealing with sudden administrative burdens, restructuring phases, or high-friction joint ventures.',
    },
    {
      id: 'protection',
      category: 'Risk/Protection' as AssistanceType,
      title: 'Protection & Interest Management',
      tagline: 'Shielding commercial leverage and defending organizational stability.',
      description:
        'Commercial disputes, breaches of good faith, and hostile counter-party maneuvers require immediate, calculated responses. We specialize in assembling dispute records, preserving evidence, and formulating confidential interest-protection plans.',
      whatWeHelpWith: [
        'Strategic business-interest protection & asset safeguarding',
        'Pre-dispute chronology documentation & notice preparation',
        'Proactive risk-response planning & scenario mapping',
        'Strictly confidential business support & discreet liaison',
        'Safeguarding commercial positioning before escalation',
      ],
      whoItIsFor:
        'Business owners, investors, and corporate leaders facing partnership dissolutions, supplier defaults, breach threats, or sensitive commercial conflicts.',
    },
    {
      id: 'legal-coord',
      category: 'Legal/Professional Coordination' as AssistanceType,
      title: 'Professional & Legal Coordination',
      tagline: 'Organized case preparation and seamless bridge to licensed independent counsel.',
      description:
        'We prepare comprehensive document dossiers, chronological records, and factual summaries so that when independent legal or specialized counsel is engaged, their billable time is maximally efficient.',
      regulatoryNotice:
        'Important Notice: Vigilance Shield & Solutions coordinates with qualified independent professionals where necessary. Regulated legal advice, formal representation, and court pleadings must be provided by appropriately licensed legal practitioners.',
      whatWeHelpWith: [
        'Preparation of factual evidence & document chronologies',
        'Liaison and briefing coordination with client-retained counsel',
        'Referrals to vetted independent licensed practitioners',
        'Technical & industry expert witness coordination',
        'Pre-arbitration administrative dossier organization',
      ],
      whoItIsFor:
        'Clients facing potential litigation or regulatory inquiries who wish to organize their files and factual timeline meticulously prior to engaging formal legal representation.',
    },
  ];

  const handleRequest = (category: AssistanceType) => {
    setSelectedServicePreselect(category);
    setActiveView('request-assistance');
  };

  return (
    <div className="w-full py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            Tailored Practice Solutions
          </div>
          <h1 className="font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-slate-100">
            Our Services & Capabilities
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Comprehensive business solutions designed to protect organizational interests, uphold contractual discipline, and manage risk with institutional rigor.
          </p>
        </div>

        {/* Services Cards List */}
        <div className="space-y-8">
          {servicesData.map((svc, idx) => (
            <div
              key={svc.id}
              className="bg-[#0B0F17] border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 sm:p-8 transition-all shadow-xl space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-800/80 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-wider">
                      Service Pillar 0{idx + 1}
                    </span>
                    {svc.regulatoryNotice && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Regulated Coordination Notice
                      </span>
                    )}
                  </div>
                  <h2 className="font-['Cinzel'] text-xl sm:text-2xl font-bold text-slate-100">
                    {svc.title}
                  </h2>
                  <p className="text-xs font-medium text-amber-300/80 italic">
                    {svc.tagline}
                  </p>
                </div>

                <button
                  onClick={() => handleRequest(svc.category)}
                  className="px-6 py-2.5 rounded text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-md shadow-amber-500/10 flex items-center justify-center gap-1.5 shrink-0 self-start"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-950" />
                  Request Assistance
                </button>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {svc.description}
              </p>

              {/* Regulatory Notice Banner if applicable */}
              {svc.regulatoryNotice && (
                <div className="p-3.5 bg-amber-950/20 border border-amber-500/30 rounded-lg flex items-start gap-2.5 text-xs text-amber-200/90">
                  <Scale className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{svc.regulatoryNotice}</p>
                </div>
              )}

              {/* Grid: What We Help With vs Who It Is For */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    What We Can Help With
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {svc.whatWeHelpWith.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-400" />
                      Who It Is For
                    </h4>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {svc.whoItIsFor}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Confidentiality Assured</span>
                    <button
                      onClick={() => handleRequest(svc.category)}
                      className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                      Inquire About This Service
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-8 text-center space-y-4">
          <h3 className="font-['Cinzel'] text-xl font-bold text-slate-100">
            Unsure Which Service Matches Your Need?
          </h3>
          <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
            Our triage team reviews each inquiry personally and routes your case to the appropriate specialist desk.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setSelectedServicePreselect('Other');
                setActiveView('request-assistance');
              }}
              className="px-6 py-3 rounded text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300"
            >
              Submit General Inquiry
            </button>
            <button
              onClick={() => setActiveView('book-consultation')}
              className="px-6 py-3 rounded border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-200"
            >
              Book 20-Min Advisory Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
