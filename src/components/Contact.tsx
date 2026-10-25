import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaWhatsapp, FaInstagram, FaBehance } from 'react-icons/fa';

const contacts = [
  { icon: <FaEnvelope />, label: 'Email', value: 'sasithimarsha776@gmail.com' },
  { icon: <FaWhatsapp />, label: 'WhatsApp', value: '+94 76 048 8991' },
];

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState(''); // අලුතෙන් එකතු කළා

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSending(true);
    setStatus('idle');
    setErrorMsg('');

    // මෙතන තමයි අපේ .env එකේ තියෙන Keys ටික පාවිච්චි වෙන්නේ
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setIsSending(false);
          setStatus('success');
          form.current?.reset();
          setTimeout(() => setStatus('idle'), 5000);
        },
        (error) => {
          console.error('EmailJS Error:', error);
          setIsSending(false);
          setStatus('error');
          // ඇත්ත Error එක පෙන්නන්න හදනවා
          setErrorMsg(error?.text || error?.message || 'Unknown error occurred'); 
          setTimeout(() => setStatus('idle'), 8000);
        }
      );
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[var(--purple)] rounded-full filter blur-[150px] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        
        {/* Left Info */}
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl font-bold text-white mb-2">Let's Work <span className="text-[var(--gold)]">Together</span></h2>
          <p className="text-gray-400 mb-10">Have a project in mind? Let's turn your ideas into reality.</p>
          
          <div className="space-y-6">
            {contacts.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)]">{item.icon}</div>
                <div>
                  <p className="text-gray-500 text-xs uppercase">{item.label}</p>
                  <p className="text-white font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Form */}
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8">
          <form ref={form} className="space-y-4" onSubmit={sendEmail}>
            
            <input type="text" name="user_name" placeholder="Your Name" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[var(--gold)] outline-none" />
            <input type="email" name="user_email" placeholder="Your Email" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[var(--gold)] outline-none" />
            
            <div className="grid grid-cols-2 gap-4">
              <select name="project_type" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[var(--gold)] outline-none appearance-none">
                <option value="" className="bg-[#0B0B10]">Project Type</option>
                <option value="Branding" className="bg-[#0B0B10]">Branding</option>
                <option value="Social Media" className="bg-[#0B0B10]">Social Media</option>
                <option value="Poster Design" className="bg-[#0B0B10]">Poster Design</option>
                <option value="Packaging" className="bg-[#0B0B10]">Packaging</option>
                <option value="Other" className="bg-[#0B0B10]">Other</option>
              </select>

              <select name="budget" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[var(--gold)] outline-none appearance-none">
                <option value="" className="bg-[#0B0B10]">Budget</option>
                <option value="Under LKR 10,000" className="bg-[#0B0B10]">Under LKR 10,000</option>
                <option value="LKR 10,000 - 25,000" className="bg-[#0B0B10]">LKR 10,000 - 25,000</option>
                <option value="LKR 25,000 - 50,000" className="bg-[#0B0B10]">LKR 25,000 - 50,000</option>
                <option value="Above LKR 50,000" className="bg-[#0B0B10]">Above LKR 50,000</option>
              </select>
            </div>

            <textarea name="message" rows={4} placeholder="Your Message" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[var(--gold)] outline-none resize-none"></textarea>
            
            <button type="submit" disabled={isSending} className="btn-gold w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
              {isSending ? 'Sending...' : 'Send Message ↗'}
            </button>
          </form>

          {/* Success Message */}
          {status === 'success' && <p className="text-green-400 text-sm mt-4 text-center">Message sent successfully! I'll get back to you soon. 🎉</p>}
          
          {/* Detailed Error Message */}
          {status === 'error' && (
            <div className="mt-4 text-center">
              <p className="text-red-400 text-sm font-bold">Error occurred 😢</p>
              <p className="text-red-300 text-xs mt-1">{errorMsg}</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;