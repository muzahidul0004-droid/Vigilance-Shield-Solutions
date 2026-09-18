import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  Mail,
  Phone,
  MapPin,
  Clock,
  Lock,
  ArrowRight,
  Send,
  CheckCircle,
  MessageSquare,
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { setActiveView } = useApp();
  const [fastSent, setFastSent] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleFastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFastSent(true);
  };

  return (
    <div className="w-full py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5" />
            Direct Communications Desk
          </div>
          <h1 className="font-['Cinzel'] text-3xl sm:text-4xl font-bold tracking-wide text-slate-100">
            Contact Vigilance Shield & Solutions
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Reach our intake specialists directly for confidential business inquiries, contract disputes, and corporate coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details & Regional Desks */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6 space-y-6">
              <h3 className="font-['Cinzel'] text-base font-bold text-slate-100 border-b border-slate-800 pb-3">
                Corporate Coordination Desks
              </h3>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">Confidential Intake Email</span>
                    <a href="mailto:intake@vigilanceshield.com" className="text-slate-200 hover:text-amber-400 font-medium">
                      intake@vigilanceshield.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">Direct Executive Line</span>
                    <a href="tel:+18005927443" className="text-slate-200 hover:text-amber-400 font-medium">
                      +1 (800) 592-7443
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">Triage Hours</span>
                    <span className="text-slate-300">Mon–Fri: 08:00 – 20:00 EST</span>
                    <span className="text-slate-500 block text-[10px]">Urgent matters monitored 24/7</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">Corporate Operations</span>
                    <span className="text-slate-300">New York • London • Singapore Liaison</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={() => setActiveView('book-consultation')}
                  className="w-full py-2.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
                >
                  Schedule Teleconference Briefing
                </button>
              </div>
            </div>

            <div className="p-5 bg-slate-950/80 border border-amber-500/20 rounded-xl text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <Lock className="w-4 h-4" />
                Encrypted Inquiry Recommended
              </div>
              <p className="text-[11px] leading-relaxed">
                If your requirement involves contracts or dispute notices, we strongly recommend using our dedicated intake portal with document attachment capabilities.
              </p>
            </div>
          </div>

          {/* Direct Assistance Intake Trigger / Fast Dispatch */}
          <div className="lg:col-span-2 bg-[#0B0F17] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-['Cinzel'] text-xl font-bold text-slate-100">
                  Fast Outreach Message
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Send a quick confidential message to our review team.
                </p>
              </div>
              <button
                onClick={() => setActiveView('request-assistance')}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300"
              >
                <Shield className="w-3.5 h-3.5" />
                Full Case Intake Form
              </button>
            </div>

            {fastSent ? (
              <div className="py-12 text-center space-y-3 bg-slate-950/60 rounded-xl p-6 border border-amber-500/30">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-100 font-['Cinzel']">
                  Message Dispatched Successfully
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Thank you, {name}. An intake director will reach out to {email} within our standard review window.
                </p>
                <div className="pt-3">
                  <button
                    onClick={() => setFastSent(false)}
                    className="text-xs text-amber-400 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFastSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Full Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Email Address <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="contact@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Message or Question <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe your inquiry or request a call back..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded text-xs text-slate-100 focus:border-amber-400 focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveView('request-assistance')}
                    className="text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2 self-start"
                  >
                    Need to attach contracts or notices? Use the full Request Assistance form →
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    DISPATCH MESSAGE
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
