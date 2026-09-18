import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AssistanceType } from '../types';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  Phone,
  Shield,
  CheckCircle2,
  Lock,
  ArrowRight,
  User,
  Building,
  Mail,
  MapPin,
  ChevronRight,
} from 'lucide-react';

const TIME_SLOTS = [
  '09:00 AM EST',
  '10:30 AM EST',
  '01:00 PM EST',
  '02:30 PM EST',
  '04:00 PM EST',
];

export const ConsultationBookingView: React.FC = () => {
  const { bookConsultation, setActiveView, selectedServicePreselect } = useApp();

  const [clientName, setClientName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState<AssistanceType>(selectedServicePreselect || 'Contract');
  const [preferredDate, setPreferredDate] = useState('2026-09-25');
  const [preferredTime, setPreferredTime] = useState('10:30 AM EST');
  const [format, setFormat] = useState<'Encrypted Video Briefing' | 'Telephone Conference' | 'Secure Executive Room'>(
    'Encrypted Video Briefing'
  );
  const [description, setDescription] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = bookConsultation({
      clientName,
      organization: organization.trim() || undefined,
      email,
      phone,
      serviceType,
      preferredDate,
      preferredTime,
      format,
      description,
    });
    setConfirmedBooking(result);
  };

  if (confirmedBooking) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4">
        <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-8 text-center shadow-2xl space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-400 text-amber-400 mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">
              Consultation Requested
            </span>
            <h2 className="text-2xl font-bold font-['Cinzel'] text-slate-100 mt-1">
              Executive Briefing Scheduled
            </h2>
            <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto">
              Your confidential session has been logged and forwarded to our specialized directorate.
            </p>
          </div>

          {/* Booking Code Card */}
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-lg max-w-sm mx-auto text-left space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Booking Reference:</span>
              <span className="font-mono font-bold text-amber-400">{confirmedBooking.referenceNumber}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Date & Time:</span>
              <span className="text-slate-200">{confirmedBooking.preferredDate} at {confirmedBooking.preferredTime}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Format:</span>
              <span className="text-slate-200">{confirmedBooking.format}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Domain:</span>
              <span className="text-slate-200">{confirmedBooking.serviceType}</span>
            </div>
            {confirmedBooking.meetingLink && (
              <div className="pt-2 border-t border-slate-800 text-[11px] text-amber-300/80">
                Encrypted Meeting Room: <span className="font-mono">{confirmedBooking.meetingLink}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveView('home')}
              className="w-full sm:w-auto px-6 py-2.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
            >
              Return to Homepage
            </button>
            <button
              onClick={() => setActiveView('request-assistance')}
              className="w-full sm:w-auto px-6 py-2.5 rounded bg-amber-400 hover:bg-amber-300 text-xs font-bold text-slate-950"
            >
              Submit Full Document Packet
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Clock className="w-3.5 h-3.5" />
          Direct Specialist Access
        </div>
        <h1 className="font-['Cinzel'] text-3xl sm:text-4xl font-bold tracking-wide text-slate-100">
          Book an Executive Consultation
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          Schedule a focused, private consultation with our contract, risk, or compliance advisors to assess your requirements and establish an action plan.
        </p>
      </div>

      <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-6 sm:p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Your Name <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Company / Organization <span className="text-slate-500">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="Organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Email Address <span className="text-amber-400">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Phone Number <span className="text-amber-400">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Service Focus
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value as AssistanceType)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
              >
                <option value="Contract">Contract & Vendor Solutions</option>
                <option value="Compliance">Compliance & Risk Support</option>
                <option value="Business Problem">Business Solutions & PM</option>
                <option value="Risk/Protection">Protection & Interest Management</option>
                <option value="Legal/Professional Coordination">Legal/Professional Coordination</option>
                <option value="Other">Other Strategic Support</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Consultation Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
              >
                <option value="Encrypted Video Briefing">Encrypted Video Briefing (Secure Link)</option>
                <option value="Telephone Conference">Private Telephone Conference</option>
                <option value="Secure Executive Room">In-Person Executive Room (By Request)</option>
              </select>
            </div>
          </div>

          {/* Date & Available Slots */}
          <div className="pt-2 border-t border-slate-800">
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Select Preferred Date & Available Time Slot
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 flex flex-wrap gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setPreferredTime(slot)}
                    className={`px-3 py-2 rounded text-xs font-medium border transition-colors ${
                      preferredTime === slot
                        ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Matter Summary & Objectives <span className="text-amber-400">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Briefly state key questions, involved parties, or specific milestones you wish to address during this session..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded text-slate-100 text-sm focus:border-amber-400 focus:outline-none placeholder:text-slate-600 leading-relaxed"
            />
          </div>

          <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-slate-400 flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>All consultations are conducted under strict non-disclosure obligations.</span>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-8 py-3 rounded text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all shadow-md shadow-amber-500/20 flex items-center gap-2"
            >
              <CalendarIcon className="w-4 h-4" />
              CONFIRM CONSULTATION REQUEST
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
