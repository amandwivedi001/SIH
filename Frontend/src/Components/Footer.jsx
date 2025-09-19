import React from "react";
import { Shield, Mail, Phone, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/";
  if (!isLogin) return null;

  return (
    <footer className="bg-[#1C1A16]/95 backdrop-blur-xl border-t border-[#EDB74B]/30 mt-auto shadow-inner shadow-[#EDB74B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-[#EDB74B] to-[#CFA53A] rounded-lg flex items-center justify-center shadow-md shadow-[#EDB74B]/40">
                <Shield className="w-5 h-5 text-[#1C1A16]" />
              </div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-[#EDB74B] to-[#CFA53A] bg-clip-text text-transparent">
                TrackSecure
              </span>
            </div>
            <p className="text-[#D6CFC0] mb-6 max-w-md leading-relaxed">
              Empowering enterprises with secure, real-time device tracking
              and intelligent analytics for a safer future.
            </p>
            <div className="space-y-2 text-[#B8B2A3]">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#EDB74B]" />
                <span className="text-sm">contact@tracksecure.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#EDB74B]" />
                <span className="text-sm">+91 7049487950</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-[#EDB74B]" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#FFF9EF] font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Features", "Pricing", "Documentation", "Support"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-[#B8B2A3] hover:text-[#EDB74B] transition-colors hover:pl-1 block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[#FFF9EF] font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Security", "Compliance"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(/\s+/g, "")}`}
                    className="text-[#B8B2A3] hover:text-[#EDB74B] transition-colors hover:pl-1 block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#EDB74B]/30 mt-10 pt-6 text-center">
          <p className="text-[#B8B2A3] text-sm">
            © {new Date().getFullYear()} TrackSecure. All rights reserved.  
            <span className="text-[#EDB74B]"> Built for security.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
