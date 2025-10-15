import React from "react";
import { ArrowUp, Mail, Phone, Smartphone, Laptop, Headphones, Cpu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-700">
      <div
        className="flex justify-center items-center font-medium cursor-pointer py-3 gap-2 bg-slate-800 hover:bg-slate-700 transition-all duration-300"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp className="h-4 w-4 text-blue-400" />
        <span className="text-sm text-slate-300 hover:text-white">Back to Top</span>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-3 md:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:col-span-2">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            TechStore
          </Link>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">Your premier destination for cutting-edge electronics and tech solutions.</p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-slate-400">
              <Mail className="h-4 w-4 mr-2 text-blue-400" />
              support@techstore.com
            </div>
            <div className="flex items-center text-sm text-slate-400">
              <Phone className="h-4 w-4 mr-2 text-blue-400" />
              (+977) 1234567890
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-slate-200 mb-3 text-sm">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/categories/smartphones" className="flex items-center text-slate-400 hover:text-white transition-colors">
                <Smartphone className="h-4 w-4 mr-2 text-blue-400" />
                Smartphones
              </Link>
            </li>
            <li>
              <Link to="/categories/laptops" className="flex items-center text-slate-400 hover:text-white transition-colors">
                <Laptop className="h-4 w-4 mr-2 text-blue-400" />
                Laptops
              </Link>
            </li>
            <li>
              <Link to="/categories/audio" className="flex items-center text-slate-400 hover:text-white transition-colors">
                <Headphones className="h-4 w-4 mr-2 text-blue-400" />
                Audio
              </Link>
            </li>
            <li>
              <Link to="/categories/components" className="flex items-center text-slate-400 hover:text-white transition-colors">
                <Cpu className="h-4 w-4 mr-2 text-blue-400" />
                Components
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-slate-200 mb-3 text-sm">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="text-slate-400 hover:text-white transition-colors">
                Shipping
              </Link>
            </li>
            <li>
              <Link to="/returns" className="text-slate-400 hover:text-white transition-colors">
                Returns
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-slate-400 hover:text-white transition-colors">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-700 py-6">
        <div className="max-w-md mx-auto px-4 text-center">
          <h3 className="font-semibold text-slate-200 mb-2 text-sm">Get the latest tech updates</h3>
          <div className="flex gap-2">
            <Input type="email" placeholder="Your email" className="flex-1 bg-slate-800 border-slate-600 text-white placeholder-slate-400 text-sm" />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4">Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-400">
            <div>© {new Date().getFullYear()} TechStore. All rights reserved.</div>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
