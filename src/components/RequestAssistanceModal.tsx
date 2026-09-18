import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  AssistanceType,
  UrgencyLevel,
  CommunicationMethod,
  AttachmentFile,
} from '../types';
import {
  Shield,
  FileText,
  AlertTriangle,
  Upload,
  X,
  Check,
  Copy,
  Lock,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface RequestAssistanceModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  isModal?: boolean;
}

export const RequestAssistanceModal: React.FC<RequestAssistanceModalProps> = ({
  isOpen = true,
  onClose,
  isModal = true,
}) => {
  if (isOpen === false) return null;

  const {
    submitInquiry,
    setActiveView,
    setSelectedInquiryRef,
    selectedServicePreselect,
    setSelectedServicePreselect,
  } = useApp();

  // Form fields
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('United States');
  const [city, setCity] = useState('');
  const [preferredMethod, setPreferredMethod] = useState<CommunicationMethod>('Encrypted Message Portal');
  const [preferredContactTime, setPreferredContactTime] = useState('During standard business hours');

  const [assistanceType, setAssistanceType] = useState<AssistanceType>('Contract');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<UrgencyLevel>('Normal');

  // Attachments
  const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
  const [uploadError, setUploadError] = useState('');

  // Agreement and CAPTCHA
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [captchaNum1, setCaptchaNum1] = useState(7);
  const [captchaNum2, setCaptchaNum2] = useState(4);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Preselect assistance type if passed from services page
  useEffect(() => {
    if (selectedServicePreselect) {
      setAssistanceType(selectedServicePreselect);
    }
    // Refresh CAPTCHA
    refreshCaptcha();
  }, [selectedServicePreselect]);

  const refreshCaptcha = () => {
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 8) + 1;
    setCaptchaNum1(n1);
    setCaptchaNum2(n2);
    setCaptchaAnswer('');
    setCaptchaError('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);
    const newFiles: AttachmentFile[] = [];

    for (const file of files) {
      // 10MB limit per file
      if (file.size > 10 * 1024 * 1024) {
        setUploadError(`File "${file.name}" exceeds 10MB limit.`);
        continue;
      }

      newFiles.push({
        id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'Public',
        category: file.name.toLowerCase().includes('contract')
          ? 'Contract'
          : file.name.toLowerCase().includes('notice')
          ? 'Notice'
          : 'General',
      });
    }

    setAttachments((prev) => [...prev, ...newFiles]);
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCaptchaError('');

    // Verify Captcha
    if (parseInt(captchaAnswer, 10) !== captchaNum1 + captchaNum2) {
      setCaptchaError('Security anti-spam answer is incorrect. Please try again.');
      refreshCaptcha();
      return;
    }

    if (!agreedToTerms) {
      alert('Please confirm that the information provided is accurate and agree to the Terms.');
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      const created = submitInquiry({
        clientName: fullName,
        companyName: companyName.trim() || undefined,
        email,
        phone,
        country,
        city: city.trim() || 'Unspecified',
        preferredMethod,
        preferredContactTime,
        assistanceType,
        subject,
        description,
        urgency,
        attachments,
      });

      setSubmitting(false);
      setSubmittedRef(created.referenceNumber);
      setSelectedInquiryRef(created.referenceNumber);
    }, 600);
  };

  const copyReferenceNumber = () => {
    if (!submittedRef) return;
    navigator.clipboard.writeText(submittedRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // SUCCESS CONFIRMATION VIEW
  if (submittedRef) {
    return (
      <div className={`${isModal ? 'p-6 sm:p-8' : 'max-w-3xl mx-auto py-12 px-4'} bg-slate-900/95 border border-amber-500/30 rounded-xl shadow-2xl relative`}>
        {isModal && onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-2"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-400 text-amber-400 mx-auto">
            <ShieldCheck className="w-9 h-9" />
          </div>

          <h2 className="text-2xl font-bold font-['Cinzel'] tracking-wide text-slate-100">
            Request Received & Logged
          </h2>

          <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Your inquiry has been encrypted and securely assigned to our specialized review desk. You can track all updates, communicate in real time, and upload additional documents using your unique reference number.
          </p>

          {/* Reference Number Box */}
          <div className="p-6 bg-slate-950 border border-amber-500/40 rounded-lg max-w-md mx-auto my-6 shadow-inner">
            <div className="text-xs uppercase tracking-widest text-amber-400/90 font-semibold mb-1">
              Your Unique Reference Number
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-slate-100 tracking-wider">
                {submittedRef}
              </span>
              <button
                onClick={copyReferenceNumber}
                className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 transition-colors"
                title="Copy Reference Number"
              >
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            {copied && (
              <span className="text-[11px] text-green-400 font-medium block mt-2">
                Copied to clipboard
              </span>
            )}
            <p className="text-[11px] text-slate-400 mt-2">
              Please save your reference number for future communication.
            </p>
          </div>

          {/* Next Steps Card */}
          <div className="text-left bg-slate-950/60 p-4 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-2 max-w-md mx-auto">
            <div className="font-semibold text-amber-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              What Happens Next?
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
              <li>Our triage team evaluates your matter against operational & risk criteria.</li>
              <li>A specialist will contact you via your preferred channel ({preferredMethod}).</li>
              <li>You can enter the encrypted communication channel below at any time.</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => {
                setSelectedInquiryRef(submittedRef);
                setActiveView('track-inquiry');
                if (onClose) onClose();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Lock className="w-4 h-4" />
              Open Private Inquiry Channel
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setActiveView('book-consultation');
                if (onClose) onClose();
              }}
              className="w-full sm:w-auto px-5 py-3 rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 text-sm font-medium text-slate-200"
            >
              Request Live Consultation
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STANDARD INTAKE FORM
  return (
    <div className={`${isModal ? 'p-6 sm:p-8 max-h-[90vh] overflow-y-auto' : 'max-w-4xl mx-auto py-12 px-4 sm:px-6'}`}>
      <div className="bg-[#0D131F] border border-slate-800 rounded-xl p-6 sm:p-8 shadow-2xl relative">
        {isModal && onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header */}
        <div className="border-b border-slate-800 pb-6 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Shield className="w-3.5 h-3.5" />
            Public Inquiry System
          </div>
          <h1 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold tracking-wide text-slate-100">
            Request Assistance
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Submit your inquiry confidentially without creating a mandatory public account. Verified contact information is required so our specialist advisors can communicate and deliver tailored solutions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION 1: Personal / Organization Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-400/90">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20 text-xs font-bold text-amber-300">
                1
              </span>
              Personal & Organization Information
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g., Jonathan Mercer"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded text-slate-100 text-sm focus:border-amber-400 focus:outline-none placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Organization / Company Name <span className="text-slate-500">(optional)</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g., Mercer Holdings Ltd."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded text-slate-100 text-sm focus:border-amber-400 focus:outline-none placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Email Address <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="contact@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded text-slate-100 text-sm focus:border-amber-400 focus:outline-none placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Phone Number <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded text-slate-100 text-sm focus:border-amber-400 focus:outline-none placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Country <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., United States"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded text-slate-100 text-sm focus:border-amber-400 focus:outline-none placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  City <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., New York, NY"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded text-slate-100 text-sm focus:border-amber-400 focus:outline-none placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Preferred Method of Communication
                </label>
                <select
                  value={preferredMethod}
                  onChange={(e) => setPreferredMethod(e.target.value as CommunicationMethod)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
                >
                  <option value="Encrypted Message Portal">Encrypted Message Portal (Recommended)</option>
                  <option value="Email">Official Corporate Email</option>
                  <option value="Phone">Telephone Briefing</option>
                  <option value="Video Conference">Encrypted Video Conference</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Preferred Contact Time
                </label>
                <input
                  type="text"
                  placeholder="e.g., Weekday mornings (9 AM - 12 PM EST)"
                  value={preferredContactTime}
                  onChange={(e) => setPreferredContactTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded text-slate-100 text-sm focus:border-amber-400 focus:outline-none placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Inquiry Details */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-400/90">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20 text-xs font-bold text-amber-300">
                2
              </span>
              Inquiry Details & Requirements
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Type of Assistance <span className="text-amber-400">*</span>
                </label>
                <select
                  value={assistanceType}
                  onChange={(e) => setAssistanceType(e.target.value as AssistanceType)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
                >
                  <option value="Contract">Contract (Coordination, Admin, Review)</option>
                  <option value="Vendor">Vendor Management & Performance</option>
                  <option value="Compliance">Compliance & Regulatory Governance</option>
                  <option value="Business Problem">Business Solutions & Operations</option>
                  <option value="Risk/Protection">Risk Mitigation & Interest Protection</option>
                  <option value="Documentation">Documentation & Records Management</option>
                  <option value="Legal/Professional Coordination">Legal/Professional Coordination</option>
                  <option value="Other">Other Corporate Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Urgency Level <span className="text-amber-400">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Normal', 'Important', 'Urgent'] as UrgencyLevel[]).map((lvl) => (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => setUrgency(lvl)}
                      className={`py-2 px-3 rounded text-xs font-medium border text-center transition-all ${
                        urgency === lvl
                          ? lvl === 'Urgent'
                            ? 'bg-red-950/60 border-red-500 text-red-200'
                            : lvl === 'Important'
                            ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                            : 'bg-slate-800 border-slate-500 text-slate-100'
                          : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Subject / Summary <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Brief summary of the issue or requirement..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded text-slate-100 text-sm focus:border-amber-400 focus:outline-none placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Detailed Description <span className="text-amber-400">*</span>
              </label>
              <textarea
                required
                rows={5}
                placeholder="Please describe the background, key dates, parties involved, current obstacles, and desired outcome..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded text-slate-100 text-sm focus:border-amber-400 focus:outline-none placeholder:text-slate-600 leading-relaxed"
              />
            </div>
          </div>

          {/* SECTION 3: Attachments */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-400/90">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20 text-xs font-bold text-amber-300">
                  3
                </span>
                Supporting Attachments <span className="text-xs text-slate-500 normal-case font-normal">(Optional)</span>
              </div>
              <span className="text-xs text-slate-400">PDF, DOC, PNG, JPG (Max 10MB per file)</span>
            </div>

            <div className="border-2 border-dashed border-slate-700 hover:border-amber-500/50 rounded-lg p-6 text-center bg-slate-950/40 transition-colors">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs text-slate-300 font-medium">
                Drag and drop contracts, notices, or relevant files, or{' '}
                <label className="text-amber-400 hover:text-amber-300 cursor-pointer underline underline-offset-2">
                  browse from device
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.xlsx"
                  />
                </label>
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Supported: Contracts, Vendor agreements, Formal notices, Dispute records, Photos
              </p>
            </div>

            {uploadError && (
              <p className="text-xs text-red-400 font-medium">{uploadError}</p>
            )}

            {attachments.length > 0 && (
              <div className="space-y-2 mt-3">
                <div className="text-xs font-medium text-slate-400">Attached Files ({attachments.length}):</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {attachments.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-2.5 bg-slate-900 border border-slate-800 rounded text-xs text-slate-200"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="truncate font-mono">{file.name}</span>
                        <span className="text-slate-400 shrink-0 text-[10px]">
                          ({formatFileSize(file.size)})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(file.id)}
                        className="text-slate-400 hover:text-red-400 p-1"
                        title="Remove file"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SENSITIVE INFORMATION WARNING */}
          <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-lg flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200/90 leading-relaxed">
              <span className="font-semibold text-amber-300">Confidentiality Protocol Notice:</span>{' '}
              Please do not submit passwords, financial credentials, government identification numbers, or other highly sensitive information unless specifically requested through an approved secure process.
            </div>
          </div>

          {/* CAPTCHA / ANTI-SPAM PROTECTION */}
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Anti-Spam Human Verification
              </div>
              <button
                type="button"
                onClick={refreshCaptcha}
                className="text-[11px] text-slate-400 hover:text-amber-400 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                Change Challenge
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-slate-900 border border-slate-700 rounded font-mono text-base font-bold text-amber-300 select-none tracking-widest">
                {captchaNum1} + {captchaNum2} = ?
              </div>
              <input
                type="number"
                required
                placeholder="Answer"
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                className="w-28 px-3 py-2 bg-slate-950 border border-slate-700 rounded text-slate-100 text-sm font-mono focus:border-amber-400 focus:outline-none"
              />
            </div>
            {captchaError && (
              <p className="text-xs text-red-400 font-medium">{captchaError}</p>
            )}
          </div>

          {/* MANDATORY CONFIRMATION CHECKBOX */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                required
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-950 text-amber-400 focus:ring-amber-400 focus:ring-offset-slate-900"
              />
              <span className="text-xs text-slate-300 leading-relaxed">
                I confirm that the information provided is accurate and I agree to the{' '}
                <button
                  type="button"
                  onClick={() => setActiveView('privacy-policy')}
                  className="text-amber-400 hover:underline inline"
                >
                  Privacy Policy
                </button>{' '}
                and{' '}
                <button
                  type="button"
                  onClick={() => setActiveView('terms-of-service')}
                  className="text-amber-400 hover:underline inline"
                >
                  Terms of Service
                </button>
                . I understand that submitting this inquiry does not establish an attorney-client relationship.
              </span>
            </label>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>256-bit TLS Encrypted Transmission</span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3.5 rounded text-sm font-bold tracking-wide text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] disabled:opacity-50 flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  Encrypting & Submitting...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 text-slate-950" />
                  SUBMIT INQUIRY
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
