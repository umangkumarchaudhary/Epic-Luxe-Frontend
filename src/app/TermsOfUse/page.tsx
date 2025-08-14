'use client';

import React from 'react';
import {
  Scale,
  Shield,
  Users,
  Car,
  FileText,
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import '../GlobalFonts.css';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const TermsOfUse: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      <Header />
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-[#BFA980]/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#BFA980]/5 rounded-full blur-3xl" />
      </div>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white relative z-10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 backdrop-blur-sm rounded-full p-4 border border-[#D4AF37]/30">
                <Scale className="w-12 h-12 text-[#D4AF37]" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#D4AF37] via-white to-[#BFA980] bg-clip-text text-transparent">
              Terms of Use
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
              Clear guidelines for using Epic Luxe&apos;s premium automotive platform
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA980]/10 border border-[#D4AF37]/30 rounded-full px-4 py-2 backdrop-blur-sm">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-light">Effective: January 1, 2025</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-[#BFA980]/10 to-[#D4AF37]/10 border border-[#BFA980]/30 rounded-full px-4 py-2 backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-[#BFA980]" />
                <span className="font-light">Governed by Indian Law</span>
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
                <FileText className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Welcome to Epic Luxe</h2>
                <p className="text-gray-300 leading-relaxed mb-4 font-light">
                  These Terms of Use (&quot;Terms&quot;) govern your access to and use of Epic Luxe&apos;s platform, website, and services. By accessing or using our platform, you agree to be bound by these Terms and our Privacy Policy.
                </p>
                <p className="text-gray-300 leading-relaxed font-light">
                  Epic Luxe is India&apos;s premier platform for luxury pre-owned vehicles, offering services including vehicle browsing, buying, selling, financing, and professional valuations for premium brands such as Mercedes-Benz, BMW, Audi, and other luxury automobiles.
                </p>
              </div>
            </div>
          </section>

          {/* Acceptance of Terms */}
          <section className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#BFA980]/20 to-[#D4AF37]/10 rounded-lg p-3 border border-[#BFA980]/30">
                <CheckCircle className="w-6 h-6 text-[#BFA980]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-6">Acceptance of Terms</h2>

                <div className="bg-gradient-to-r from-[#BFA980]/20 to-[#D4AF37]/10 border-l-4 border-[#BFA980] rounded-lg p-6 mb-6">
                  <p className="text-[#BFA980] font-medium mb-2">Agreement to Terms</p>
                  <p className="text-gray-300 text-sm font-light">
                    By using Epic Luxe&apos;s services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, please discontinue use of our platform.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-[#D4AF37]/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#D4AF37] mb-3">Binding Agreement</h3>
                    <p className="text-gray-300 text-sm mb-3 font-light">
                      These Terms constitute a legally binding agreement between you and Epic Luxe.
                    </p>
                    <ul className="space-y-1 text-gray-400 text-sm font-light">
                      <li>• Applies to all users and visitors</li>
                      <li>• Includes all platform features</li>
                      <li>• Updated periodically with notice</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-[#BFA980]/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#BFA980] mb-3">Modifications</h3>
                    <p className="text-gray-300 text-sm mb-3 font-light">
                      We reserve the right to modify these Terms at any time with appropriate notice.
                    </p>
                    <ul className="space-y-1 text-gray-400 text-sm font-light">
                      <li>• Changes posted on platform</li>
                      <li>• Significant changes notified via email</li>
                      <li>• Continued use implies acceptance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Eligibility */}
          <section className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 rounded-lg p-3 border border-[#D4AF37]/30">
                <Users className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-6">Eligibility</h2>

                <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#BFA980]/5 border border-[#D4AF37]/30 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-[#D4AF37] mb-3">User Requirements</h3>
                  <p className="text-gray-300 text-sm font-light">
                    To use Epic Luxe&apos;s services, you must meet the following criteria and provide accurate information throughout your interactions with our platform.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center bg-gradient-to-br from-[#D4AF37]/10 to-[#BFA980]/5 border border-[#D4AF37]/30 rounded-lg p-4">
                    <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 border border-[#D4AF37]/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <span className="text-[#D4AF37] font-bold text-lg">18+</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Age Requirement</h3>
                    <p className="text-gray-400 text-sm font-light">Must be at least 18 years old or have legal guardian consent</p>
                  </div>

                  <div className="text-center bg-gradient-to-br from-[#BFA980]/10 to-[#D4AF37]/5 border border-[#BFA980]/30 rounded-lg p-4">
                    <div className="bg-gradient-to-br from-[#BFA980]/20 to-[#D4AF37]/10 border border-[#BFA980]/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <span className="text-[#BFA980] font-bold text-lg">ID</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Valid Identity</h3>
                    <p className="text-gray-400 text-sm font-light">Provide accurate personal information and valid identification</p>
                  </div>

                  <div className="text-center bg-gradient-to-br from-[#D4AF37]/10 to-[#BFA980]/5 border border-[#D4AF37]/30 rounded-lg p-4">
                    <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 border border-[#D4AF37]/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <span className="text-[#D4AF37] font-bold text-lg">⚖️</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Legal Capacity</h3>
                    <p className="text-gray-400 text-sm font-light">Have legal capacity to enter into binding agreements</p>
                  </div>
                </div>

                <div className="mt-6 bg-gradient-to-r from-red-900/30 to-red-800/20 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-300 text-sm font-light">
                    <strong className="text-red-200">Account Suspension:</strong> Epic Luxe reserves the right to suspend or terminate accounts that do not meet eligibility requirements or provide false information.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Services Offered */}
          <section className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#BFA980]/20 to-[#D4AF37]/10 rounded-lg p-3 border border-[#BFA980]/30">
                <Car className="w-6 h-6 text-[#BFA980]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-6">Services Offered</h2>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#BFA980]/5 border border-[#D4AF37]/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#D4AF37] mb-4">Vehicle Services</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#BFA980]" />
                        <span className="text-sm font-light">Browse luxury pre-owned vehicles</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#BFA980]" />
                        <span className="text-sm font-light">Buy certified premium cars</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#BFA980]" />
                        <span className="text-sm font-light">Sell your luxury vehicle</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#BFA980]" />
                        <span className="text-sm font-light">Professional vehicle inspections</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-[#BFA980]/10 to-[#D4AF37]/5 border border-[#BFA980]/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#BFA980] mb-4">Support Services</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-sm font-light">Free vehicle valuations</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-sm font-light">Financing assistance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-sm font-light">WhatsApp support and consultation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-sm font-light">Documentation assistance</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#D4AF37]/20 to-[#BFA980]/10 border-l-4 border-[#D4AF37] rounded-lg p-6">
                  <h3 className="font-semibold text-[#D4AF37] mb-3">Important Service Notes</h3>
                  <div className="space-y-2 text-gray-300 text-sm font-light">
                    <p>• <strong className="text-[#BFA980]">Inventory Updates:</strong> Vehicle availability is subject to change and updated regularly</p>
                    <p>• <strong className="text-[#BFA980]">Inspections:</strong> All listed vehicles undergo comprehensive quality inspections</p>
                    <p>• <strong className="text-[#BFA980]">Valuations:</strong> Estimates provided are indicative and not guaranteed offers unless explicitly quoted</p>
                    <p>• <strong className="text-[#BFA980]">Third-Party Services:</strong> Financing and some services may involve partner institutions</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 rounded-lg p-3 border border-[#D4AF37]/30">
                <Shield className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-6">User Responsibilities</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                      <span className="text-[#BFA980]">✓</span> You Must
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-gradient-to-br from-[#BFA980]/10 to-[#D4AF37]/5 border border-[#BFA980]/30 rounded-lg p-4">
                        <p className="font-medium text-[#BFA980] text-sm mb-1">Provide Accurate Information</p>
                        <p className="text-gray-300 text-sm font-light">Submit truthful personal and vehicle details</p>
                      </div>
                      <div className="bg-gradient-to-br from-[#BFA980]/10 to-[#D4AF37]/5 border border-[#BFA980]/30 rounded-lg p-4">
                        <p className="font-medium text-[#BFA980] text-sm mb-1">Respect Platform Rules</p>
                        <p className="text-gray-300 text-sm font-light">Follow all terms and community guidelines</p>
                      </div>
                      <div className="bg-gradient-to-br from-[#BFA980]/10 to-[#D4AF37]/5 border border-[#BFA980]/30 rounded-lg p-4">
                        <p className="font-medium text-[#BFA980] text-sm mb-1">Maintain Account Security</p>
                        <p className="text-gray-300 text-sm font-light">Protect your login credentials and notify us of breaches</p>
                      </div>
                      <div className="bg-gradient-to-br from-[#BFA980]/10 to-[#D4AF37]/5 border border-[#BFA980]/30 rounded-lg p-4">
                        <p className="font-medium text-[#BFA980] text-sm mb-1">Complete Legal Documentation</p>
                        <p className="text-gray-300 text-sm font-light">Provide required documents for transactions</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                      <span className="text-red-400">✗</span> You Must Not
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-500/30 rounded-lg p-4">
                        <p className="font-medium text-red-300 text-sm mb-1">Misrepresent Vehicles</p>
                        <p className="text-gray-400 text-sm font-light">Provide false information about vehicle condition or history</p>
                      </div>
                      <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-500/30 rounded-lg p-4">
                        <p className="font-medium text-red-300 text-sm mb-1">Engage in Fraud</p>
                        <p className="text-gray-400 text-sm font-light">Attempt fraudulent transactions or identity theft</p>
                      </div>
                      <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-500/30 rounded-lg p-4">
                        <p className="font-medium text-red-300 text-sm mb-1">Violate Laws</p>
                        <p className="text-gray-400 text-sm font-light">Use the platform for illegal activities or prohibited purposes</p>
                      </div>
                      <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-500/30 rounded-lg p-4">
                        <p className="font-medium text-red-300 text-sm mb-1">Abuse Support Channels</p>
                        <p className="text-gray-400 text-sm font-light">Spam or misuse WhatsApp, phone, or email communications</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Third-Party Services */}
          <section className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#BFA980]/20 to-[#D4AF37]/10 rounded-lg p-3 border border-[#BFA980]/30">
                <Users className="w-6 h-6 text-[#BFA980]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-6">Third-Party Services & Links</h2>

                <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#BFA980]/5 border border-[#D4AF37]/30 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-[#D4AF37] mb-3">Partner Services</h3>
                  <p className="text-gray-300 text-sm mb-4 font-light">
                    Epic Luxe collaborates with trusted financial institutions, inspection services, and other partners to provide comprehensive automotive solutions.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 border border-[#D4AF37]/30 rounded-lg p-3 mb-2">
                        <span className="text-2xl">🏦</span>
                      </div>
                      <p className="text-[#D4AF37] text-sm font-medium">Banking Partners</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-[#BFA980]/20 to-[#D4AF37]/10 border border-[#BFA980]/30 rounded-lg p-3 mb-2">
                        <span className="text-2xl">🔍</span>
                      </div>
                      <p className="text-[#BFA980] text-sm font-medium">Inspection Services</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 border border-[#D4AF37]/30 rounded-lg p-3 mb-2">
                        <span className="text-2xl">📋</span>
                      </div>
                      <p className="text-[#D4AF37] text-sm font-medium">Documentation</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#D4AF37]/20 to-[#BFA980]/10 border-l-4 border-[#D4AF37] rounded-lg p-6">
                  <h3 className="font-semibold text-[#D4AF37] mb-3">Important Disclaimers</h3>
                  <div className="space-y-3 text-gray-300 text-sm font-light">
                    <p>• <strong className="text-[#BFA980]">Independent Services:</strong> Third-party services operate under their own terms and conditions</p>
                    <p>• <strong className="text-[#BFA980]">No Endorsement:</strong> Links to external sites do not constitute endorsement of their content</p>
                    <p>• <strong className="text-[#BFA980]">Financing Terms:</strong> Loan terms and approvals are determined by financial institution partners</p>
                    <p>• <strong className="text-[#BFA980]">External Privacy:</strong> Third-party sites have their own privacy policies and data practices</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-red-500/20 to-red-400/10 rounded-lg p-3 border border-red-500/30">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-6">Limitation of Liability</h2>

                <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-[#BFA980]/20 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-[#BFA980] mb-4">Service Limitations</h3>
                  <p className="text-gray-300 text-sm mb-4 font-light">
                    Epic Luxe provides its platform and services &quot;as is&quot; and makes no warranties regarding accuracy, completeness, or availability of information or services.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-[#D4AF37] mb-2">Vehicle Information</h4>
                      <ul className="space-y-1 text-gray-400 text-sm font-light">
                        <li>• Specifications subject to verification</li>
                        <li>• Condition reports are indicative</li>
                        <li>• Prices may vary based on final inspection</li>
                        <li>• Availability changes without notice</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-[#BFA980] mb-2">Valuation Services</h4>
                      <ul className="space-y-1 text-gray-400 text-sm font-light">
                        <li>• Estimates are not binding offers</li>
                        <li>• Market conditions may affect values</li>
                        <li>• Final offers subject to inspection</li>
                        <li>• No guarantee of resale value</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-900/30 to-red-800/20 border border-red-500/30 rounded-lg p-6">
                  <h3 className="font-semibold text-red-300 mb-3">Liability Exclusions</h3>
                  <p className="text-red-200 text-sm mb-4 font-light">
                    Epic Luxe shall not be liable for indirect, incidental, special, or consequential damages arising from:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-1 text-red-300 text-sm font-light">
                      <li>• Platform downtime or technical issues</li>
                      <li>• Third-party service failures</li>
                      <li>• Market fluctuations affecting vehicle values</li>
                    </ul>
                    <ul className="space-y-1 text-red-300 text-sm font-light">
                      <li>• User error or misuse of services</li>
                      <li>• Delays in processing or communications</li>
                      <li>• Force majeure events beyond our control</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Termination */}
          <section className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-gray-600/20 to-gray-500/10 rounded-lg p-3 border border-gray-500/30">
                <XCircle className="w-6 h-6 text-gray-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-6">Account Termination</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#BFA980]/5 border border-[#D4AF37]/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#D4AF37] mb-4">User-Initiated Termination</h3>
                    <p className="text-gray-300 text-sm mb-4 font-light">
                      You may discontinue using Epic Luxe services at any time by:
                    </p>
                    <ul className="space-y-2 text-gray-300 text-sm font-light">
                      <li>• Contacting customer support</li>
                      <li>• Requesting account closure</li>
                      <li>• Completing pending transactions</li>
                      <li>• Following data deletion procedures</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-[#BFA980]/10 to-[#D4AF37]/5 border border-[#BFA980]/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#BFA980] mb-4">Platform-Initiated Termination</h3>
                    <p className="text-gray-300 text-sm mb-4 font-light">
                      Epic Luxe may suspend or terminate accounts for:
                    </p>
                    <ul className="space-y-2 text-gray-300 text-sm font-light">
                      <li>• Violation of these Terms</li>
                      <li>• Fraudulent or illegal activities</li>
                      <li>• Providing false information</li>
                      <li>• Abuse of platform services</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-[#D4AF37]/20 rounded-lg p-6">
                  <h3 className="font-semibold text-[#D4AF37] mb-3">Post-Termination</h3>
                  <p className="text-gray-300 text-sm font-light">
                    Upon termination, your access to Epic Luxe services will cease, but certain provisions of these Terms (including liability limitations and dispute resolution) will survive termination. We will handle your data according to our Privacy Policy and applicable legal requirements.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Dispute Resolution */}
          <section className="bg-gradient-to-br from-[#090909]/90 to-[#040404]/90 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#BFA980]/20 to-[#D4AF37]/10 rounded-lg p-3 border border-[#BFA980]/30">
                <Scale className="w-6 h-6 text-[#BFA980]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-6">Dispute Resolution</h2>

                <div className="bg-gradient-to-br from-[#BFA980]/10 to-[#D4AF37]/5 border border-[#BFA980]/30 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-[#BFA980] mb-4">Governing Law</h3>
                  <p className="text-gray-300 text-sm font-light">
                    These Terms are governed by the laws of India. Any disputes arising from your use of Epic Luxe services will be subject to the exclusive jurisdiction of courts in [Your City], India.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center bg-gradient-to-br from-[#BFA980]/10 to-[#D4AF37]/5 border border-[#BFA980]/30 rounded-lg p-6">
                    <div className="bg-gradient-to-br from-[#BFA980]/20 to-[#D4AF37]/10 border border-[#BFA980]/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <span className="text-[#BFA980] font-bold">1</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Direct Resolution</h3>
                    <p className="text-gray-400 text-sm font-light">Contact our support team first to resolve issues amicably</p>
                  </div>

                  <div className="text-center bg-gradient-to-br from-[#D4AF37]/10 to-[#BFA980]/5 border border-[#D4AF37]/30 rounded-lg p-6">
                    <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 border border-[#D4AF37]/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <span className="text-[#D4AF37] font-bold">2</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Mediation</h3>
                    <p className="text-gray-400 text-sm font-light">Engage in good faith mediation before formal proceedings</p>
                  </div>

                  <div className="text-center bg-gradient-to-br from-[#BFA980]/10 to-[#D4AF37]/5 border border-[#BFA980]/30 rounded-lg p-6">
                    <div className="bg-gradient-to-br from-[#BFA980]/20 to-[#D4AF37]/10 border border-[#BFA980]/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <span className="text-[#BFA980] font-bold">3</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">Legal Action</h3>
                    <p className="text-gray-400 text-sm font-light">Resort to court proceedings if resolution attempts fail</p>
                  </div>
                </div>

                <div className="mt-6 bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-[#D4AF37]/20 rounded-lg p-4">
                  <p className="text-gray-300 text-sm font-light">
                    <strong className="text-[#D4AF37]">Time Limitation:</strong> Any claims must be brought within one (1) year of the date the cause of action arose, unless otherwise required by applicable law.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gradient-to-r from-black via-gray-900 to-black text-white rounded-xl shadow-lg p-8 border border-[#D4AF37]/30">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4 text-[#D4AF37]">Questions About These Terms?</h2>
              <p className="text-gray-300 font-light">
                For clarifications or concerns regarding these Terms of Use, please contact us:
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#BFA980]/5 border border-[#D4AF37]/30 backdrop-blur-sm rounded-lg p-6">
                <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 border border-[#D4AF37]/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="font-semibold mb-2 text-[#D4AF37]">Email Support</h3>
                <p className="text-gray-300 text-sm font-light">legal@epicluxe.in</p>
                <p className="text-gray-400 text-xs mt-1 font-light">Response within 48 hours</p>
              </div>

              <div className="bg-gradient-to-br from-[#BFA980]/10 to-[#D4AF37]/5 border border-[#BFA980]/30 backdrop-blur-sm rounded-lg p-6">
                <div className="bg-gradient-to-br from-[#BFA980]/20 to-[#D4AF37]/10 border border-[#BFA980]/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-[#BFA980]" />
                </div>
                <h3 className="font-semibold mb-2 text-[#BFA980]">Phone Support</h3>
                <p className="text-gray-300 text-sm font-light">+91-XXXX-XXXXX</p>
                <p className="text-gray-400 text-xs mt-1 font-light">Mon-Sat: 9 AM - 7 PM IST</p>
              </div>

              <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#BFA980]/5 border border-[#D4AF37]/30 backdrop-blur-sm rounded-lg p-6">
                <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 border border-[#D4AF37]/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="font-semibold mb-2 text-[#D4AF37]">Corporate Office</h3>
                <p className="text-gray-300 text-sm font-light">Epic Luxe Headquarters</p>
                <p className="text-gray-400 text-xs mt-1 font-light">India</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA980]/10 border border-[#D4AF37]/30 rounded-lg p-6 inline-block backdrop-blur-sm">
                <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-300 font-light">
                  <div>
                    <p className="font-semibold mb-1 text-[#D4AF37]">Effective Date</p>
                    <p>January 1, 2025</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1 text-[#BFA980]">Version</p>
                    <p>1.0</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1 text-[#D4AF37]">Next Review</p>
                    <p>July 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Note */}
          <div className="text-center mt-8 text-gray-400">
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-[#D4AF37]/20 rounded-lg shadow-md p-6 backdrop-blur-sm">
              <p className="text-sm mb-4 font-light">
                By continuing to use Epic Luxe&apos;s services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and our Privacy Policy.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500 font-light">
                <span>© 2025 Epic Luxe. All rights reserved.</span>
                <span className="text-[#BFA980]">•</span>
                <span>These terms may be updated periodically</span>
                <span className="text-[#BFA980]">•</span>
                <span>Significant changes will be notified via email</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfUse;
