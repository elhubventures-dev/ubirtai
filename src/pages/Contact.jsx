import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, MessageSquare, Send } from 'lucide-react';
import { submitForm } from '../utils/submitForm';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [company, setCompany] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setError('');

        try {
            await submitForm('/api/contact', { name, email, message, company });
            setStatus('success');
            setName('');
            setEmail('');
            setMessage('');
            setCompany('');
        } catch (err) {
            setStatus('error');
            setError(err.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 text-center">
                    Get in <span className="gradient-text">Touch</span>
                </h1>
                
                <p className="text-xl text-textMuted text-center mb-16 max-w-2xl mx-auto">
                    Have questions about UBIRT.AI? We'd love to hear from you. 
                    Whether it's feedback, support, or partnership inquiries, our team is here to help.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-surface/50 p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors">
                            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 text-primary">
                                <Mail size={24} />
                            </div>
                            <h3 className="text-white font-semibold text-xl mb-2">Email Us</h3>
                            <p className="text-textMuted mb-4">For general inquiries and support:</p>
                            <a href="mailto:info@ubirtai.site" className="text-primary font-medium hover:underline text-lg">
                                info@ubirtai.site
                            </a>
                        </div>

                        <div className="bg-surface/50 p-8 rounded-2xl border border-white/5 hover:border-success/30 transition-colors">
                            <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mb-4 text-success">
                                <MessageSquare size={24} />
                            </div>
                            <h3 className="text-white font-semibold text-xl mb-2">Support</h3>
                            <p className="text-textMuted">
                                Our support team is available Monday through Friday, 9:00 AM to 5:00 PM EST.
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-surface/80 p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full filter blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-all duration-500"></div>
                        
                        {status === 'success' ? (
                            <div className="relative z-10 flex flex-col items-center text-center gap-4 py-10">
                                <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center text-success">
                                    <CheckCircle size={32} />
                                </div>
                                <h3 className="text-2xl font-display font-bold text-white">Message sent</h3>
                                <p className="text-textMuted">
                                    Thanks for reaching out. Check your inbox for a confirmation — we&apos;ll reply soon.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setStatus('idle')}
                                    className="mt-2 text-sm text-accent hover:underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <div
                                    aria-hidden="true"
                                    style={{ position: 'absolute', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
                                >
                                    <label htmlFor="contact-company">Company</label>
                                    <input
                                        id="contact-company"
                                        type="text"
                                        name="company"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-textMuted mb-2">Full Name</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        required 
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-background border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-textMuted mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        required 
                                        placeholder="john@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-background border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-textMuted mb-2">Message</label>
                                    <textarea 
                                        name="message"
                                        required 
                                        rows="4"
                                        placeholder="How can we help you?"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full bg-background border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 transition-all resize-none"
                                    ></textarea>
                                </div>

                                {status === 'error' && (
                                    <p className="text-sm text-red-400" role="alert">{error}</p>
                                )}

                                <button 
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-linear-to-r from-primary to-[#00b4d8] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    <Send size={18} />
                                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
