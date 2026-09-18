import React from 'react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';
import {
  Shield,
  Lock,
  Scale,
  CheckCircle,
  FileText,
  AlertTriangle,
  Users,
  Target,
  ArrowRight,
  Award,
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <div className="w-full py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            Corporate Identity & Ethos
          </div>
          <h1 className="font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-slate-100">
            About Vigilance Shield & Solutions
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            A specialized business-services and interest-protection consultancy assisting enterprises, organizations, and individuals in navigating complex contractual obligations, operational risks, and regulatory coordination.
          </p>
        </div>

        {/* Company Purpose & Identity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <h2 className="font-['Cinzel'] text-xl sm:text-2xl font-bold text-slate-100">
              Who We Are & Our Purpose
            </h2>
            <p>
              Vigilance Shield & Solutions was founded to bridge a critical operational divide in modern commerce: the space between routine internal management and high-cost external legal disputes.
            </p>
            <p>
              Organizations frequently enter agreements with vendors, contractors, and international partners where execution breaks down. Without systematic contract administration, thorough documentation, and rigorous risk triage, business interests are easily compromised.
            </p>
            <p>
              Our purpose is to instill structured governance, protect corporate continuity, and provide disciplined problem-solving support so our clients can defend their commercial standing lawfully and effectively.
            </p>
          </div>

          <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <BrandLogo variant="icon" size="sm" />
              <div>
                <h3 className="font-['Cinzel'] text-sm font-bold text-slate-100">
                  Core Corporate Mandate
                </h3>
                <span className="text-[10px] text-amber-400 font-mono">
                  Trust • Protection • Professionalism
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Independent Operational Support:</strong> We work directly alongside your executive, operations, and procurement teams.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Evidence-Grade Chronologies:</strong> We transform disorganized emails and notices into structured chronologies.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Liaison Coordination:</strong> Where legal representation is needed, we coordinate smoothly with licensed counsel.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">
              Operating Standard
            </span>
            <h2 className="font-['Cinzel'] text-2xl font-bold text-slate-100 mt-1">
              Our Professional Approach
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
              <div className="w-9 h-9 rounded bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                Confidentiality First
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We implement bank-grade encryption protocols and non-disclosure standards across all client interactions. We respect the extreme sensitivity of internal disputes and supplier negotiations.
              </p>
            </div>

            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
              <div className="w-9 h-9 rounded bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                Client-Focused Execution
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                No rigid, bureaucratic formulas. We adapt our support scope to your precise timeline, industry constraints, and commercial priorities.
              </p>
            </div>

            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
              <div className="w-9 h-9 rounded bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Scale className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                Lawful & Ethical Boundaries
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We operate with complete adherence to lawful and ethical business practices. We do not make misleading guarantees or engage in unauthorized professional practices.
              </p>
            </div>
          </div>
        </div>

        {/* Clear Regulatory Distinction & Disclaimers */}
        <div className="p-6 sm:p-8 bg-amber-950/15 border border-amber-500/30 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
            <h3 className="font-['Cinzel'] text-base sm:text-lg font-bold text-slate-100">
              Clear Boundaries: Non-Police & Regulated Legal Services Policy
            </h3>
          </div>
          <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
            <p>
              To maintain the highest ethical transparency, <strong>Vigilance Shield & Solutions</strong> explicitly states that it is <strong>not</strong> a police department, law enforcement agency, private security patrol, or vigilante organization.
            </p>
            <p>
              Furthermore, we do <strong>not</strong> make unrealistic claims such as <em>"we guarantee legal protection"</em> or <em>"we can solve every legal problem."</em> Our work encompasses commercial contract management, risk mitigation, operational consulting, dispute documentation, and administrative coordination.
            </p>
            <p>
              Where legal representation, formal court pleadings, or statutory legal advice are required, such matters are strictly referred to and coordinated with appropriately licensed independent legal professionals.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center pt-4">
          <button
            onClick={() => setActiveView('request-assistance')}
            className="px-8 py-3.5 rounded text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all shadow-md shadow-amber-500/20 inline-flex items-center gap-2"
          >
            <Shield className="w-4 h-4 text-slate-950" />
            DISCUSS YOUR REQUIREMENTS IN CONFIDENCE
          </button>
        </div>
      </div>
    </div>
  );
};
