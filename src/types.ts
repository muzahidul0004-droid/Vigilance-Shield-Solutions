export type AssistanceType =
  | 'Contract'
  | 'Vendor'
  | 'Compliance'
  | 'Business Problem'
  | 'Risk/Protection'
  | 'Documentation'
  | 'Legal/Professional Coordination'
  | 'Other';

export type UrgencyLevel = 'Normal' | 'Important' | 'Urgent';

export type CommunicationMethod = 'Email' | 'Phone' | 'Encrypted Message Portal' | 'Video Conference';

export type InquiryStatus =
  | 'Submitted'
  | 'Under Review'
  | 'In Discussion'
  | 'In Progress'
  | 'Completed'
  | 'Awaiting Client'
  | 'Approved'
  | 'On Hold'
  | 'Closed';

export interface AttachmentFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  uploadedBy: 'Client' | 'Staff' | 'Public';
  url?: string;
  category?: 'Contract' | 'Notice' | 'Financial Document' | 'Compliance Record' | 'General';
}

export interface InquiryMessage {
  id: string;
  inquiryId: string;
  senderName: string;
  senderRole: 'client' | 'staff' | 'admin';
  content: string;
  timestamp: string;
  attachments?: AttachmentFile[];
  isInternalNote?: boolean; // If true, only visible to staff/admin!
}

export interface Inquiry {
  id: string; // e.g. VSS-2026-000124
  referenceNumber: string;
  createdAt: string;
  updatedAt: string;
  clientName: string;
  companyName?: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  preferredMethod: CommunicationMethod;
  preferredContactTime: string;
  assistanceType: AssistanceType;
  subject: string;
  description: string;
  urgency: UrgencyLevel;
  status: InquiryStatus;
  assignedStaffId?: string;
  assignedStaffName?: string;
  attachments: AttachmentFile[];
  messages: InquiryMessage[];
  internalNotes: {
    id: string;
    author: string;
    content: string;
    timestamp: string;
  }[];
  consultationId?: string;
  lastClientActivity?: string;
}

export interface Consultation {
  id: string;
  referenceNumber: string;
  inquiryId?: string;
  clientName: string;
  email: string;
  phone: string;
  organization?: string;
  serviceType: AssistanceType;
  preferredDate: string;
  preferredTime: string;
  format: 'Encrypted Video Briefing' | 'Telephone Conference' | 'Secure Executive Room';
  description: string;
  status: 'Requested' | 'Confirmed' | 'Completed' | 'Rescheduled' | 'Cancelled';
  assignedStaff?: string;
  meetingLink?: string;
  createdAt: string;
}

export interface ClientProfile {
  id: string;
  name: string;
  organization?: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  inquiryCount: number;
  activeCases: number;
  status: 'Active' | 'Verified' | 'Confidential';
  joinedDate: string;
  notes?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  activeCases: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: 'System' | 'Staff' | 'Admin' | 'Client';
  action: string;
  details: string;
  targetId?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'inquiry' | 'message' | 'status' | 'consultation' | 'security';
  read: boolean;
  linkId?: string;
}

export type ActiveView =
  | 'home'
  | 'about'
  | 'services'
  | 'how-it-works'
  | 'request-assistance'
  | 'track-inquiry'
  | 'book-consultation'
  | 'contact'
  | 'client-dashboard'
  | 'admin-portal'
  | 'admin-dashboard'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'disclaimer';
