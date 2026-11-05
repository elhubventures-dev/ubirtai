import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';
import { Link } from 'react-router-dom';
import { submitForm } from '../utils/submitForm';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        setError('');
        trackEvent(ANALYTICS_EVENTS.NEWSLETTER_SIGNUP, { method: 'newsletter_form' });

        try {
            await submitForm('/api/newsletter', { email, company });
            setStatus('success');
            setEmail('');
            setCompany('');
        } catch (err) {
            setStatus('error');
            setError(err.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="glass-card p-12 text-center border-white/5 bg-linear-to-b from-surface/80 to-background">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
                            Get Smarter <span className="gradient-text">AI Insights</span>
                        </h2>
                        <p className="text-textMuted text-lg mb-10 max-w-2xl mx-auto">
                            Join 5,000+ elite viewers who get weekly AI-curated tips on mindset, longevity, and performance. No spam, just pure signal.
                        </p>

                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center gap-4 text-success py-4"
                                >
                                    <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-2">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold">You're on the list!</h3>
                                    <p className="text-white/70">Check your inbox for a welcome confirmation.</p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="relative max-w-md mx-auto flex flex-col gap-3"
                                >
                                    <div
                                        aria-hidden="true"
                                        style={{ position: 'absolute', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
                                    >
                                        <label htmlFor="newsletter-company">Company</label>
                                        <input
                                            id="newsletter-company"
                                            type="text"
                                            name="company"
                                            tabIndex={-1}
                                            autoComplete="off"
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <input
                                            type="email"
                                            placeholder="Enter your best email..."
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="flex-1 px-6 py-4 rounded-2xl bg-background border border-white/10 text-white placeholder:text-textMuted focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="px-8 py-4 rounded-2xl bg-white text-background font-bold hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50"
                                        >
                                            <span>{status === 'loading' ? 'Joining...' : 'Join Now'}</span>
                                            <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </button>
                                    </div>
                                    {status === 'error' && (
                                        <p className="text-sm text-red-400" role="alert">{error}</p>
                                    )}
                                </motion.form>
                            )}
                        </AnimatePresence>

                        <p className="mt-8 text-xs text-textMuted text-center">
                            By joining, you agree to our <Link to="/terms-of-service" className="text-white hover:underline">Terms</Link> and <Link to="/privacy-policy" className="text-white hover:underline">Privacy Policy</Link>.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
