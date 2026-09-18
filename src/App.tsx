/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ServicesView } from './components/ServicesView';
import { AboutView } from './components/AboutView';
import { HowItWorksView } from './components/HowItWorksView';
import { ContactView } from './components/ContactView';
import { TrackInquiryView } from './components/TrackInquiryView';
import { ConsultationBookingView } from './components/ConsultationBookingView';
import { ClientDashboardView } from './components/ClientDashboardView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { LegalView } from './components/LegalView';
import { RequestAssistanceModal } from './components/RequestAssistanceModal';

const AppContent: React.FC = () => {
  const { activeView, setActiveView } = useApp();

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView />;
      case 'services':
        return <ServicesView />;
      case 'about':
        return <AboutView />;
      case 'how-it-works':
        return <HowItWorksView />;
      case 'contact':
        return <ContactView />;
      case 'track-inquiry':
        return <TrackInquiryView />;
      case 'book-consultation':
        return <ConsultationBookingView />;
      case 'client-dashboard':
        return <ClientDashboardView />;
      case 'admin-portal':
      case 'admin-dashboard':
        return <AdminDashboardView />;
      case 'privacy-policy':
        return <LegalView type="privacy-policy" />;
      case 'terms-of-service':
        return <LegalView type="terms-of-service" />;
      case 'disclaimer':
        return <LegalView type="disclaimer" />;
      case 'request-assistance':
        return (
          <div className="py-8">
            <HomeView />
          </div>
        );
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080B10] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      <Navbar />

      <main className="flex-1 w-full flex flex-col">
        {renderActiveView()}
      </main>

      <Footer />

      {/* Global Request Assistance Modal */}
      <RequestAssistanceModal
        isOpen={activeView === 'request-assistance'}
        onClose={() => setActiveView('home')}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
