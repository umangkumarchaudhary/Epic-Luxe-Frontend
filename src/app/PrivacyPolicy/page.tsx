'use client';

import React from 'react';
import { Shield, Phone, Mail, MapPin, Clock, Users, Lock, Eye, Settings, AlertCircle } from 'lucide-react';
import '../../GlobalFonts.css';
import Header from '@/app/components/Header'; // Ensure this path is correct
import Footer from '@/app/components/Footer'; // Ensure this path is correct

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <Header />
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-[#BFA980]/10"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#BFA980]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white relative z-10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 backdrop-blur-sm rounded-full p-4 border border-[#D4AF37]/30">
                <Shield className="w-12 h-12 text-[#D4AF37]" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#D4AF37] via-white to-[#BFA980] bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
              Your privacy and trust are paramount to Epic Luxe
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA980]/10 border border-[#D4AF37]/30 rounded-full px-4 py-2 backdrop-blur-sm">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-light">Effective: January 1, 2025</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-[#BFA980]/10 to-[#D4AF37]/10 border border-[#BFA980]/30 rounded-full px-4 py-2 backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-[#BFA980]" />
                <span className="font-light">India Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Introduction */}
          <section className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 rounded-lg p-3 border border-[#D4AF37]/30">
                <Users className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
                <p className="text-gray-300 leading-relaxed font-light">
  Welcome to Epic Luxe, India&apos;s premier platform for luxury pre-owned vehicles. This Privacy Policy explains how we collect, use, protect, and share your personal information when you use our platform for buying, selling, trading, financing, or obtaining valuations for premium vehicles including Mercedes-Benz, BMW, Audi, and other luxury brands.
</p>

                <p className="text-gray-300 leading-relaxed mt-4 font-light">
                  By using our services, you consent to the practices described in this Privacy Policy. We are committed to maintaining the highest standards of data protection in compliance with the Information Technology Act, 2000, and related regulations.
                </p>
              </div>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#BFA980]/20 to-[#D4AF37]/10 rounded-lg p-3 border border-[#BFA980]/30">
                <Eye className="w-6 h-6 text-[#BFA980]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-6">Information We Collect</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-[#D4AF37]/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#D4AF37] mb-3">Personal Information</h3>
                    <ul className="space-y-2 text-gray-300 font-light">
                      <li>• Full name and contact details</li>
                      <li>• Phone number and email address</li>
                      <li>• City and location information</li>
                      <li>• Identity verification documents</li>
                      <li>• Financial information for loan processing</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-[#BFA980]/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#BFA980] mb-3">Vehicle Information</h3>
                    <ul className="space-y-2 text-gray-300 font-light">
                      <li>• Vehicle make, model, and year</li>
                      <li>• Registration and ownership details</li>
                      <li>• Service history and condition</li>
                      <li>• Valuation preferences</li>
                      <li>• Trade-in requirements</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 bg-gradient-to-br from-[#D4AF37]/10 to-[#BFA980]/5 border border-[#D4AF37]/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#D4AF37] mb-3">Technical Information</h3>
                  <p className="text-gray-300 mb-3 font-light">
                    We automatically collect certain technical information to improve our services:
                  </p>
                  <ul className="space-y-2 text-gray-300 font-light">
                    <li>• IP address and device identifiers</li>
                    <li>• Browser type and operating system</li>
                    <li>• Website usage patterns via Google Analytics</li>
                    <li>• Marketing engagement through Meta Pixel</li>
                    <li>• WhatsApp interaction data</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 rounded-lg p-3 border border-[#D4AF37]/30">
                <Settings className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-6">How We Use Your Information</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-[#D4AF37]/20 rounded-lg p-6">
                    <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-[#D4AF37]/30">
                      <span className="text-2xl">🚗</span>
                    </div>
                    <h3 className="font-semibold text-[#D4AF37] mb-2">Service Delivery</h3>
                    <p className="text-gray-300 text-sm font-light">Facilitate buying, selling, trading, and financing of luxury vehicles</p>
                  </div>
                  
                  <div className="text-center bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-[#BFA980]/20 rounded-lg p-6">
                    <div className="bg-gradient-to-br from-[#BFA980]/20 to-[#D4AF37]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-[#BFA980]/30">
                      <span className="text-2xl">💰</span>
                    </div>
                    <h3 className="font-semibold text-[#BFA980] mb-2">Valuations</h3>
                    <p className="text-gray-300 text-sm font-light">Provide accurate free valuations using advanced algorithms</p>
                  </div>
                  
                  <div className="text-center bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-[#D4AF37]/20 rounded-lg p-6">
                    <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-[#D4AF37]/30">
                      <span className="text-2xl">📞</span>
                    </div>
                    <h3 className="font-semibold text-[#D4AF37] mb-2">Communication</h3>
                    <p className="text-gray-300 text-sm font-light">Contact you via phone, email, or WhatsApp for service updates</p>
                  </div>
                </div>

                <div className="mt-8 bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-[#BFA980]/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#BFA980] mb-4">Additional Uses</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-gray-300 font-light">
                      <li>• Process loan applications through partner lenders</li>
                      <li>• Verify identity and prevent fraud</li>
                      <li>• Improve our platform and user experience</li>
                    </ul>
                    <ul className="space-y-2 text-gray-300 font-light">
                      <li>• Send relevant marketing communications</li>
                      <li>• Comply with legal obligations</li>
                      <li>• Generate analytics and insights</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Third-Party Sharing */}
          <section className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#BFA980]/20 to-[#D4AF37]/10 rounded-lg p-3 border border-[#BFA980]/30">
                <Users className="w-6 h-6 text-[#BFA980]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-6">Information Sharing</h2>
                
                <div className="bg-gradient-to-r from-[#D4AF37]/20 to-[#BFA980]/10 border-l-4 border-[#D4AF37] rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-[#D4AF37]" />
                    <p className="font-semibold text-[#D4AF37]">We never sell your personal information</p>
                  </div>
                  <p className="text-gray-300 text-sm font-light">
                    Your data is only shared with trusted partners to deliver our services effectively.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-[#D4AF37]/20 rounded-lg p-4">
                    <h3 className="font-semibold text-[#D4AF37] mb-2">Financial Partners</h3>
                    <p className="text-gray-300 text-sm font-light">
                      Loan applications are shared with authorized lending institutions for financing approvals.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-[#BFA980]/20 rounded-lg p-4">
                    <h3 className="font-semibold text-[#BFA980] mb-2">Service Providers</h3>
                    <p className="text-gray-300 text-sm font-light">
                      Third-party APIs for vehicle valuations, verification services, and communication platforms.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-[#D4AF37]/20 rounded-lg p-4">
                    <h3 className="font-semibold text-[#D4AF37] mb-2">Analytics Partners</h3>
                    <p className="text-gray-300 text-sm font-light">
                      Google Analytics and Meta Pixel for website optimization and targeted marketing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cookies and Tracking */}
          <section className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 rounded-lg p-3 border border-[#D4AF37]/30">
                <Eye className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-6">Cookies and Tracking</h2>
                
                <p className="text-gray-300 mb-6 font-light">
                  We use cookies and similar technologies to enhance your browsing experience and analyze website performance.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#BFA980]/5 border border-[#D4AF37]/30 rounded-lg p-4 text-center">
                    <h3 className="font-semibold text-[#D4AF37] mb-2">Essential Cookies</h3>
                    <p className="text-gray-300 text-sm font-light">Required for website functionality and security</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#BFA980]/10 to-[#D4AF37]/5 border border-[#BFA980]/30 rounded-lg p-4 text-center">
                    <h3 className="font-semibold text-[#BFA980] mb-2">Analytics Cookies</h3>
                    <p className="text-gray-300 text-sm font-light">Help us understand user behavior and improve services</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#BFA980]/5 border border-[#D4AF37]/30 rounded-lg p-4 text-center">
                    <h3 className="font-semibold text-[#D4AF37] mb-2">Marketing Cookies</h3>
                    <p className="text-gray-300 text-sm font-light">Enable personalized advertising and lead generation</p>
                  </div>
                </div>

                <div className="mt-6 bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-[#BFA980]/20 rounded-lg p-4">
                  <p className="text-gray-300 text-sm font-light">
                    <strong className="text-[#BFA980]">Cookie Management:</strong> You can control cookies through your browser settings. Note that disabling certain cookies may affect website functionality.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#BFA980]/20 to-[#D4AF37]/10 rounded-lg p-3 border border-[#BFA980]/30">
                <Lock className="w-6 h-6 text-[#BFA980]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-6">Data Security</h2>
                
                <p className="text-gray-300 mb-6 font-light">
                  Epic Luxe employs industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-[#D4AF37]/20 rounded-lg p-6">
                    <h3 className="font-semibold text-[#D4AF37] mb-3">Technical Safeguards</h3>
                    <ul className="space-y-2 text-gray-300 text-sm font-light">
                      <li>• SSL encryption for data transmission</li>
                      <li>• Secure server infrastructure</li>
                      <li>• Regular security audits and updates</li>
                      <li>• Access controls and authentication</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-[#BFA980]/20 rounded-lg p-6">
                    <h3 className="font-semibold text-[#BFA980] mb-3">Organizational Measures</h3>
                    <ul className="space-y-2 text-gray-300 text-sm font-light">
                      <li>• Employee training on data protection</li>
                      <li>• Limited access on need-to-know basis</li>
                      <li>• Regular privacy impact assessments</li>
                      <li>• Incident response procedures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 rounded-lg p-3 border border-[#D4AF37]/30">
                <Shield className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-6">Your Privacy Rights</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#BFA980]/5 border border-[#D4AF37]/30 rounded-lg p-4">
                      <h3 className="font-semibold text-[#D4AF37] mb-2">Access & Correction</h3>
                      <p className="text-gray-300 text-sm font-light">Request access to your personal data and correct any inaccuracies</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-[#BFA980]/10 to-[#D4AF37]/5 border border-[#BFA980]/30 rounded-lg p-4">
                      <h3 className="font-semibold text-[#BFA980] mb-2">Data Portability</h3>
                      <p className="text-gray-300 text-sm font-light">Obtain a copy of your data in a structured, machine-readable format</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#BFA980]/5 border border-[#D4AF37]/30 rounded-lg p-4">
                      <h3 className="font-semibold text-[#D4AF37] mb-2">Deletion</h3>
                      <p className="text-gray-300 text-sm font-light">Request deletion of your personal information, subject to legal requirements</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-[#BFA980]/10 to-[#D4AF37]/5 border border-[#BFA980]/30 rounded-lg p-4">
                      <h3 className="font-semibold text-[#BFA980] mb-2">Opt-Out</h3>
                      <p className="text-gray-300 text-sm font-light">Unsubscribe from marketing communications at any time</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-[#D4AF37]/20 rounded-lg p-4">
                  <p className="text-gray-300 text-sm font-light">
                    To exercise any of these rights, please contact us using the information provided below. We will respond to your request within 30 days as required by applicable law.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Legal Compliance */}
          <section className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#BFA980]/20 to-[#D4AF37]/10 rounded-lg p-3 border border-[#BFA980]/30">
                <AlertCircle className="w-6 h-6 text-[#BFA980]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-6">Legal Compliance</h2>
                
                <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#BFA980]/5 border border-[#D4AF37]/30 rounded-lg p-6">
                  <h3 className="font-semibold text-[#D4AF37] mb-4">Indian Data Protection Laws</h3>
                  <p className="text-gray-300 mb-4 font-light">
                    This Privacy Policy complies with the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
                  </p>
                  <p className="text-gray-300 text-sm font-light">
                    We also follow internationally recognized best practices aligned with GDPR principles to ensure the highest standards of data protection.
                  </p>
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-[#BFA980]/20 rounded-lg p-4">
                    <h3 className="font-semibold text-[#BFA980] mb-2">Data Retention</h3>
                    <p className="text-gray-300 text-sm font-light">
                      We retain your information only as long as necessary for the purposes outlined in this policy or as required by law.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-[#D4AF37]/20 rounded-lg p-4">
                    <h3 className="font-semibold text-[#D4AF37] mb-2">Cross-Border Transfer</h3>
                    <p className="text-gray-300 text-sm font-light">
                      Any international data transfers are conducted with appropriate safeguards and legal frameworks in place.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gradient-to-r from-black via-gray-900 to-black text-white rounded-xl shadow-lg p-8 border border-[#D4AF37]/30">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4 text-[#D4AF37]">Contact Us</h2>
              <p className="text-gray-300 font-light">
                For privacy-related questions or to exercise your rights, please reach out to us:
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#BFA980]/5 border border-[#D4AF37]/30 backdrop-blur-sm rounded-lg p-6">
                <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 border border-[#D4AF37]/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="font-semibold mb-2 text-[#D4AF37]">Email</h3>
                <p className="text-gray-300 text-sm font-light">privacy@epicluxe.in</p>
              </div>
              
              <div className="bg-gradient-to-br from-[#BFA980]/10 to-[#D4AF37]/5 border border-[#BFA980]/30 backdrop-blur-sm rounded-lg p-6">
                <div className="bg-gradient-to-br from-[#BFA980]/20 to-[#D4AF37]/10 border border-[#BFA980]/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-[#BFA980]" />
                </div>
                <h3 className="font-semibold mb-2 text-[#BFA980]">Phone</h3>
                <p className="text-gray-300 text-sm font-light">+91-XXXX-XXXXX</p>
              </div>
              
              <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#BFA980]/5 border border-[#D4AF37]/30 backdrop-blur-sm rounded-lg p-6">
                <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 border border-[#D4AF37]/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="font-semibold mb-2 text-[#D4AF37]">Address</h3>
                <p className="text-gray-300 text-sm font-light">Epic Luxe Headquarters<br />India</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA980]/10 border border-[#D4AF37]/30 rounded-lg p-4 inline-block backdrop-blur-sm">
                <p className="text-sm text-gray-300 font-light">
                  <strong className="text-[#D4AF37]">Last Updated:</strong> January 1, 2025 | 
                  <strong className="text-[#BFA980]"> Version:</strong> 1.0 | 
                  <strong className="text-[#D4AF37]"> Next Review:</strong> July 2025
                </p>
              </div>
            </div>
          </section>

          {/* Footer Note */}
          <div className="text-center mt-8 text-gray-400">
            <p className="text-sm font-light">
              This Privacy Policy may be updated periodically. We will notify you of significant changes via email or prominent website notice.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
