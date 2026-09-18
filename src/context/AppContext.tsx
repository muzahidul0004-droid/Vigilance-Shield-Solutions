import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ActiveView,
  Inquiry,
  Consultation,
  ClientProfile,
  StaffMember,
  AuditLog,
  AppNotification,
  InquiryStatus,
  AssistanceType,
  UrgencyLevel,
  CommunicationMethod,
  AttachmentFile,
} from '../types';
import {
  INITIAL_INQUIRIES,
  INITIAL_CONSULTATIONS,
  INITIAL_CLIENTS,
  INITIAL_STAFF,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';

interface SubmitInquiryPayload {
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
  attachments: AttachmentFile[];
}

interface AppContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  userRole: 'public' | 'client' | 'admin';
  setUserRole: (role: 'public' | 'client' | 'admin') => void;
  selectedInquiryRef: string | null;
  setSelectedInquiryRef: (ref: string | null) => void;
  selectedServicePreselect: AssistanceType | null;
  setSelectedServicePreselect: (svc: AssistanceType | null) => void;

  inquiries: Inquiry[];
  consultations: Consultation[];
  clients: ClientProfile[];
  staff: StaffMember[];
  auditLogs: AuditLog[];
  notifications: AppNotification[];

  submitInquiry: (payload: SubmitInquiryPayload) => Inquiry;
  addMessage: (
    inquiryId: string,
    content: string,
    role: 'client' | 'staff' | 'admin',
    senderName: string,
    isInternal?: boolean,
    attachments?: AttachmentFile[]
  ) => void;
  updateStatus: (inquiryId: string, status: InquiryStatus, actorName: string) => void;
  assignStaff: (inquiryId: string, staffId: string, staffName: string) => void;
  addInternalNote: (inquiryId: string, author: string, content: string) => void;
  bookConsultation: (
    data: Omit<Consultation, 'id' | 'referenceNumber' | 'status' | 'createdAt'>
  ) => Consultation;
  updateConsultationStatus: (
    id: string,
    status: Consultation['status'],
    meetingLink?: string
  ) => void;
  markNotificationRead: (id: string) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  INQUIRIES: 'vss_inquiries_v1',
  CONSULTATIONS: 'vss_consultations_v1',
  CLIENTS: 'vss_clients_v1',
  AUDIT: 'vss_audit_v1',
  NOTIFS: 'vss_notifs_v1',
  ROLE: 'vss_user_role_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [userRole, setUserRoleState] = useState<'public' | 'client' | 'admin'>('public');
  const [selectedInquiryRef, setSelectedInquiryRef] = useState<string | null>(null);
  const [selectedServicePreselect, setSelectedServicePreselect] = useState<AssistanceType | null>(null);

  // Data states with localStorage initialization
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [consultations, setConsultations] = useState<Consultation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONSULTATIONS);
      return saved ? JSON.parse(saved) : INITIAL_CONSULTATIONS;
    } catch {
      return INITIAL_CONSULTATIONS;
    }
  });

  const [clients, setClients] = useState<ClientProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CLIENTS);
      return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
    } catch {
      return INITIAL_CLIENTS;
    }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUDIT);
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFS);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const staff = INITIAL_STAFF;

  // Persist whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONSULTATIONS, JSON.stringify(consultations));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [consultations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [clients]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(auditLogs));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [auditLogs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(notifications));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [notifications]);

  const setUserRole = (role: 'public' | 'client' | 'admin') => {
    setUserRoleState(role);
    try {
      localStorage.setItem(STORAGE_KEYS.ROLE, role);
    } catch {}
  };

  const submitInquiry = (payload: SubmitInquiryPayload): Inquiry => {
    const year = 2026;
    const randomSeq = Math.floor(100000 + Math.random() * 900000);
    const refCode = `VSS-${year}-${randomSeq.toString().slice(0, 6)}`;
    const nowIso = new Date().toISOString();

    const newInquiry: Inquiry = {
      id: refCode,
      referenceNumber: refCode,
      createdAt: nowIso,
      updatedAt: nowIso,
      clientName: payload.clientName,
      companyName: payload.companyName,
      email: payload.email,
      phone: payload.phone,
      country: payload.country,
      city: payload.city,
      preferredMethod: payload.preferredMethod,
      preferredContactTime: payload.preferredContactTime,
      assistanceType: payload.assistanceType,
      subject: payload.subject,
      description: payload.description,
      urgency: payload.urgency,
      status: 'Submitted',
      attachments: payload.attachments,
      messages: [
        {
          id: `msg-init-${Date.now()}`,
          inquiryId: refCode,
          senderName: payload.clientName,
          senderRole: 'client',
          content: `Initial inquiry submitted: "${payload.subject}". Preferred communication: ${payload.preferredMethod} (${payload.preferredContactTime}).`,
          timestamp: nowIso,
          attachments: payload.attachments,
        },
      ],
      internalNotes: [],
      lastClientActivity: nowIso,
    };

    setInquiries((prev) => [newInquiry, ...prev]);

    // Update or create client profile
    setClients((prev) => {
      const existing = prev.find((c) => c.email.toLowerCase() === payload.email.toLowerCase());
      if (existing) {
        return prev.map((c) =>
          c.email.toLowerCase() === payload.email.toLowerCase()
            ? { ...c, inquiryCount: c.inquiryCount + 1, activeCases: c.activeCases + 1 }
            : c
        );
      } else {
        const newClient: ClientProfile = {
          id: `cl-${Date.now()}`,
          name: payload.clientName,
          organization: payload.companyName || 'Private Individual',
          email: payload.email,
          phone: payload.phone,
          city: payload.city,
          country: payload.country,
          inquiryCount: 1,
          activeCases: 1,
          status: 'Active',
          joinedDate: nowIso.slice(0, 10),
        };
        return [newClient, ...prev];
      }
    });

    // Create system notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'New Inquiry Received',
      message: `Inquiry ${refCode} from ${payload.clientName} (${payload.assistanceType}) logged.`,
      timestamp: nowIso,
      type: 'inquiry',
      read: false,
      linkId: refCode,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Add audit log
    const audit: AuditLog = {
      id: `audit-${Date.now()}`,
      timestamp: nowIso,
      actorName: payload.clientName,
      actorRole: 'Client',
      action: 'SUBMIT_PUBLIC_INQUIRY',
      details: `Inquiry ${refCode} registered with urgency: ${payload.urgency}`,
      targetId: refCode,
    };
    setAuditLogs((prev) => [audit, ...prev]);

    return newInquiry;
  };

  const addMessage = (
    inquiryId: string,
    content: string,
    role: 'client' | 'staff' | 'admin',
    senderName: string,
    isInternal: boolean = false,
    attachments: AttachmentFile[] = []
  ) => {
    const nowIso = new Date().toISOString();
    const newMsg = {
      id: `msg-${Date.now()}`,
      inquiryId,
      senderName,
      senderRole: role,
      content,
      timestamp: nowIso,
      attachments,
      isInternalNote: isInternal,
    };

    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id !== inquiryId && inq.referenceNumber !== inquiryId) return inq;
        return {
          ...inq,
          updatedAt: nowIso,
          lastClientActivity: role === 'client' ? nowIso : inq.lastClientActivity,
          messages: [...inq.messages, newMsg],
        };
      })
    );

    // Audit log
    const audit: AuditLog = {
      id: `audit-${Date.now()}`,
      timestamp: nowIso,
      actorName: senderName,
      actorRole: role === 'client' ? 'Client' : role === 'admin' ? 'Admin' : 'Staff',
      action: isInternal ? 'INTERNAL_NOTE_POSTED' : 'COMMUNICATION_MESSAGE',
      details: `${isInternal ? 'Confidential note' : 'Message'} added to inquiry ${inquiryId}`,
      targetId: inquiryId,
    };
    setAuditLogs((prev) => [audit, ...prev]);
  };

  const updateStatus = (inquiryId: string, status: InquiryStatus, actorName: string) => {
    const nowIso = new Date().toISOString();
    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id !== inquiryId && inq.referenceNumber !== inquiryId) return inq;
        return {
          ...inq,
          status,
          updatedAt: nowIso,
        };
      })
    );

    const audit: AuditLog = {
      id: `audit-${Date.now()}`,
      timestamp: nowIso,
      actorName,
      actorRole: 'Staff',
      action: 'STATUS_UPDATE',
      details: `Status of ${inquiryId} changed to "${status}"`,
      targetId: inquiryId,
    };
    setAuditLogs((prev) => [audit, ...prev]);

    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Inquiry Status Updated',
      message: `Inquiry ${inquiryId} updated to: ${status}`,
      timestamp: nowIso,
      type: 'status',
      read: false,
      linkId: inquiryId,
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const assignStaff = (inquiryId: string, staffId: string, staffName: string) => {
    const nowIso = new Date().toISOString();
    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id !== inquiryId && inq.referenceNumber !== inquiryId) return inq;
        return {
          ...inq,
          assignedStaffId: staffId,
          assignedStaffName: staffName,
          updatedAt: nowIso,
        };
      })
    );

    const audit: AuditLog = {
      id: `audit-${Date.now()}`,
      timestamp: nowIso,
      actorName: 'Administrator',
      actorRole: 'Admin',
      action: 'ASSIGN_STAFF',
      details: `Assigned ${staffName} to ${inquiryId}`,
      targetId: inquiryId,
    };
    setAuditLogs((prev) => [audit, ...prev]);
  };

  const addInternalNote = (inquiryId: string, author: string, content: string) => {
    const nowIso = new Date().toISOString();
    const newNote = {
      id: `note-${Date.now()}`,
      author,
      content,
      timestamp: nowIso,
    };

    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id !== inquiryId && inq.referenceNumber !== inquiryId) return inq;
        return {
          ...inq,
          internalNotes: [...(inq.internalNotes || []), newNote],
          updatedAt: nowIso,
        };
      })
    );

    const audit: AuditLog = {
      id: `audit-${Date.now()}`,
      timestamp: nowIso,
      actorName: author,
      actorRole: 'Staff',
      action: 'CONFIDENTIAL_NOTE',
      details: `Internal briefing note added to ${inquiryId}`,
      targetId: inquiryId,
    };
    setAuditLogs((prev) => [audit, ...prev]);
  };

  const bookConsultation = (
    data: Omit<Consultation, 'id' | 'referenceNumber' | 'status' | 'createdAt'>
  ): Consultation => {
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const ref = `CON-2026-${randomSeq}`;
    const nowIso = new Date().toISOString();

    const newCon: Consultation = {
      ...data,
      id: `con-${Date.now()}`,
      referenceNumber: ref,
      status: 'Requested',
      createdAt: nowIso,
      meetingLink:
        data.format === 'Encrypted Video Briefing'
          ? `https://secure.vigilanceshield.com/briefing/${ref.toLowerCase()}`
          : undefined,
    };

    setConsultations((prev) => [newCon, ...prev]);

    const audit: AuditLog = {
      id: `audit-${Date.now()}`,
      timestamp: nowIso,
      actorName: data.clientName,
      actorRole: 'Client',
      action: 'CONSULTATION_REQUESTED',
      details: `Consultation ${ref} requested for ${data.preferredDate} (${data.format})`,
      targetId: ref,
    };
    setAuditLogs((prev) => [audit, ...prev]);

    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Consultation Requested',
      message: `${data.clientName} booked a consultation for ${data.preferredDate}`,
      timestamp: nowIso,
      type: 'consultation',
      read: false,
      linkId: ref,
    };
    setNotifications((prev) => [notif, ...prev]);

    return newCon;
  };

  const updateConsultationStatus = (
    id: string,
    status: Consultation['status'],
    meetingLink?: string
  ) => {
    setConsultations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status, ...(meetingLink ? { meetingLink } : {}) } : c))
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const resetAllData = () => {
    setInquiries(INITIAL_INQUIRIES);
    setConsultations(INITIAL_CONSULTATIONS);
    setClients(INITIAL_CLIENTS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        userRole,
        setUserRole,
        selectedInquiryRef,
        setSelectedInquiryRef,
        selectedServicePreselect,
        setSelectedServicePreselect,
        inquiries,
        consultations,
        clients,
        staff,
        auditLogs,
        notifications,
        submitInquiry,
        addMessage,
        updateStatus,
        assignStaff,
        addInternalNote,
        bookConsultation,
        updateConsultationStatus,
        markNotificationRead,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
