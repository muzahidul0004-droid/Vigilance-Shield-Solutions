import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Lock, Scale, AlertTriangle, ArrowLeft } from 'lucide-react';

export const LegalView: React.FC<{
  type: 'privacy-policy' | 'terms-of-service' | 'disclaimer';
}> = ({ type }) => {
  const { setActiveView } = useApp();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      <button
        onClick={() => setActiveView('home')}
        className="inline-flex items-center text-xs text-slate-400 hover:text-amber-400 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
        Return to Homepage
      </button>

      {type === 'disclaimer' && (
        <div className="bg-[#0B0F17] border border-amber-500/30 rounded-2xl p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded bg-amber-500/10 text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold">
                Regulatory Disclosure & Scope Statement
              </span>
              <h1 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold text-slate-100">
                Official Company Disclaimer
              </h1>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p className="font-semibold text-amber-300">
              Vigilance Shield & Solutions is a specialized corporate business-services, risk coordination, and operational consulting organization.
            </p>
            <p>
              <strong>Not a Police or Law Enforcement Entity:</strong> Vigilance Shield & Solutions is NOT a police department, law enforcement agency, security patrol service, or vigilante organization. It does not possess, claim, or exercise statutory law-enforcement powers.
            </p>
            <p>
              <strong>Not a Law Firm:</strong> Vigilance Shield & Solutions does NOT provide unauthorized legal representation, attorney-client privileged legal counsel, or court filings. All services are strictly confined to commercial administration, dispute chronology documentation, risk mitigation planning, and project coordination.
            </p>
            <p>
              <strong>Independent Professional Coordination:</strong> Where formal legal advice, representation in court, or regulated professional services are required, Vigilance Shield & Solutions coordinates directly with appropriately licensed and certified independent attorneys or subject-matter professionals selected by or agreed upon with the client.
            </p>
            <p>
              <strong>No Unrealistic Guarantees:</strong> We do not make misleading statements such as "we guarantee legal victory" or "we can solve every dispute." Every business matter involves independent commercial, legal, and operational variables.
            </p>
          </div>
        </div>
      )}

      {type === 'privacy-policy' && (
        <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded bg-amber-500/10 text-amber-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold">
                Confidentiality & Data Protocol
              </span>
              <h1 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold text-slate-100">
                Privacy Policy & Document Retention
              </h1>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <h3 className="font-bold text-slate-100 text-sm">1. Intake Collection & Purpose</h3>
            <p>
              We collect information submitted directly through our encrypted inquiry portal, including contact details, corporate affiliations, and uploaded documentation. This information is utilized exclusively for reviewing your requirements, assigning specialized staff, and communicating regarding agreed deliverables.
            </p>

            <h3 className="font-bold text-slate-100 text-sm">2. Document Storage & Non-Disclosure Safeguards</h3>
            <p>
              All files uploaded to our infrastructure are stored with advanced encryption standards at rest and in transit. Access is strictly limited to authorized case directors and assigned personnel under formal non-disclosure agreements.
            </p>

            <h3 className="font-bold text-slate-100 text-sm">3. No Third-Party Data Sharing or Commercial Sale</h3>
            <p>
              Vigilance Shield & Solutions does not sell, lease, or monetize client data or case information under any circumstances. Information is shared with third parties only upon explicit client instruction (e.g., sharing a dossier with retained legal counsel).
            </p>

            <h3 className="font-bold text-slate-100 text-sm">4. Data Purging & Retention Rights</h3>
            <p>
              Clients maintain the absolute right to request complete data expungement following conclusion of our services. Written requests sent to <code>privacy@vigilanceshield.com</code> or initiated via the Client Portal will result in permanent deletion within 30 business days, subject to mandatory tax or accounting retention laws.
            </p>
          </div>
        </div>
      )}

      {type === 'terms-of-service' && (
        <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded bg-amber-500/10 text-amber-400">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold">
                Commercial Engagement Terms
              </span>
              <h1 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold text-slate-100">
                Terms of Service
              </h1>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <h3 className="font-bold text-slate-100 text-sm">1. Scope of Engagement</h3>
            <p>
              Vigilance Shield & Solutions provides corporate support, contract administration, compliance review, and business coordination services under executed statements of work (SOWs) or engagement letters.
            </p>

            <h3 className="font-bold text-slate-100 text-sm">2. Client Responsibilities</h3>
            <p>
              Clients agree to provide accurate, non-fraudulent documentation and information. Vigilance Shield & Solutions reserves the right to decline or terminate services if illegal conduct, bad faith, or fraud is identified.
            </p>

            <h3 className="font-bold text-slate-100 text-sm">3. Limitation of Liability</h3>
            <p>
              Our consulting and coordination services are provided on a best-efforts basis according to sound business judgment. In no event shall Vigilance Shield & Solutions be liable for indirect, punitive, or consequential commercial damages arising from third-party vendor defaults or legal judgments.
            </p>

            <h3 className="font-bold text-slate-100 text-sm">4. Independent Counsel Integration</h3>
            <p>
              The engagement of external legal counsel, expert witnesses, or regulated professionals constitutes an independent direct agreement between the client and said professional unless explicitly governed by a written tripartite management agreement.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
