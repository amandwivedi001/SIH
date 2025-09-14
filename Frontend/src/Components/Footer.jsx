import React from "react";
import { Shield, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900/80 backdrop-blur-xl border-t border-blue-500/20 mt-auto shadow-inner shadow-blue-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center shadow-md shadow-blue-700/40">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">
                TrackSecure
              </span>
            </div>
            <p className="text-slate-300 mb-6 max-w-md leading-relaxed">
              Leading the future of secure device tracking with real-time
              intelligence and enterprise-grade technology.
            </p>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-sm">contact@tracksecure.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="text-sm">+91 7049487950</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/features"
                  className="text-slate-400 hover:text-emerald-400 transition-colors hover:pl-1 block"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-slate-400 hover:text-emerald-400 transition-colors hover:pl-1 block"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/docs"
                  className="text-slate-400 hover:text-emerald-400 transition-colors hover:pl-1 block"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="text-slate-400 hover:text-emerald-400 transition-colors hover:pl-1 block"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-slate-400 hover:text-emerald-400 transition-colors hover:pl-1 block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-slate-400 hover:text-emerald-400 transition-colors hover:pl-1 block"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/security"
                  className="text-slate-400 hover:text-emerald-400 transition-colors hover:pl-1 block"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  to="/compliance"
                  className="text-slate-400 hover:text-emerald-400 transition-colors hover:pl-1 block"
                >
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-500/20 mt-10 pt-6 text-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} TrackSecure. All rights reserved.  
            <span className="text-blue-400"> Built for security.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
