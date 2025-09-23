import React, { useState } from 'react';
import { SOCIAL_LINKS } from '../constants';
import { Mail, Phone, Send, CheckCircle2 } from 'lucide-react';

const SectionTitle: React.FC<{children: React.ReactNode; subtitle: string}> = ({ children, subtitle }) => (
    <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold font-montserrat">{children}</h2>
        <p className="mt-4 text-lg text-dark-text-secondary max-w-2xl mx-auto">{subtitle}</p>
    </div>
);

const Contact: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission here.
    setShowConfirmation(true);
    (e.target as HTMLFormElement).reset();

    // Hide the confirmation message after 4 seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 4000);
  };
  
  const FloatingLabelInput: React.FC<{ type: string; id: string; label: string }> = ({ type, id, label }) => (
    <div className="relative z-0">
      <input 
        type={type} 
        id={id} 
        name={id}
        className="block py-2.5 px-0 w-full text-base text-dark-text bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-brand-green peer" 
        placeholder=" " 
        required 
      />
      <label 
        htmlFor={id} 
        className="absolute text-base text-dark-text-secondary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand-green peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>
    </div>
  );
  
  const FloatingLabelTextarea: React.FC<{ id: string; label: string }> = ({ id, label }) => (
    <div className="relative z-0">
      <textarea 
        id={id} 
        name={id}
        rows={4}
        className="block py-2.5 px-0 w-full text-base text-dark-text bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-brand-green peer" 
        placeholder=" " 
        required 
      />
      <label 
        htmlFor={id} 
        className="absolute text-base text-dark-text-secondary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand-green peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>
    </div>
  );

  return (
    <section id="contact" className="py-20 lg:py-28 bg-dark-bg fade-in-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="Let's create something bold & memorable together.">
          Get In <span className="text-brand-green">Touch</span>
        </SectionTitle>

        <div className="max-w-6xl mx-auto bg-dark-bg-secondary bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_70%)] border border-gray-800 rounded-2xl shadow-2xl shadow-black/30 overflow-hidden">
          <div className="grid lg:grid-cols-5">
            {/* Form Section */}
            <div className="lg:col-span-3 p-8 lg:p-12">
              <h3 className="text-2xl font-bold font-display mb-8 text-dark-text">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <FloatingLabelInput type="text" id="name" label="Your Name" />
                  <FloatingLabelInput type="email" id="email" label="Your Email" />
                </div>
                <FloatingLabelInput type="text" id="subject" label="Subject" />
                <FloatingLabelTextarea id="message" label="Your Message" />
                <button type="submit" className="w-full inline-flex items-center justify-center gap-3 px-8 py-3.5 text-base font-semibold text-dark-bg rounded-full transition-all duration-300 ease-in-out bg-gradient-to-r from-brand-green via-emerald-400 to-green-400 bg-[length:200%_auto] bg-left hover:bg-right focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green dark:focus:ring-offset-dark-bg transform hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(74,222,128,0.5)]">
                  <Send size={18} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
            
            {/* Info Section */}
            <div className="lg:col-span-2 bg-black/20 p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-white/10">
              <h3 className="text-2xl font-bold font-display mb-8 text-dark-text">Contact Information</h3>
              <div className="space-y-6">
                <a href="mailto:nasimdesign@example.com" className="group flex items-center gap-4 p-4 rounded-lg transition-colors hover:bg-white/5">
                  <div className="flex-shrink-0 w-12 h-12 bg-dark-bg text-brand-green rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-text">Email</h4>
                    <p className="text-dark-text-secondary text-sm group-hover:text-brand-green transition-colors">nasimdesign@example.com</p>
                  </div>
                </a>
                <a href="tel:+8806354278493" className="group flex items-center gap-4 p-4 rounded-lg transition-colors hover:bg-white/5">
                  <div className="flex-shrink-0 w-12 h-12 bg-dark-bg text-brand-green rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-text">Phone / WhatsApp</h4>
                    <p className="text-dark-text-secondary text-sm group-hover:text-brand-green transition-colors">+880 635 427 8493</p>
                  </div>
                </a>
                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-lg font-semibold text-dark-text mb-4">Follow Me</h4>
                  <div className="flex flex-wrap gap-4">
                    {SOCIAL_LINKS.map(({ name, url, Icon }) => (
                      <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name} className="w-12 h-12 flex items-center justify-center bg-dark-bg rounded-lg text-dark-text-secondary border-2 border-white/10 hover:border-brand-green hover:text-brand-green transition-all duration-300 transform hover:scale-110">
                        <Icon size={22} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showConfirmation && (
        <div
          className="fixed bottom-5 right-5 flex items-center gap-4 p-4 pr-6 bg-dark-bg-secondary border-l-4 border-brand-green rounded-lg shadow-2xl z-50 animate-fade-in-up"
          role="alert"
          aria-live="assertive"
        >
          <CheckCircle2 className="w-6 h-6 text-brand-green flex-shrink-0" />
          <div>
            <p className="font-bold text-dark-text">Success!</p>
            <p className="text-sm text-dark-text-secondary">Your message has been sent.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;