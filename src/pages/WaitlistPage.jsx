import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";
import api from '../api/axios';
import { toast } from "react-toastify";
import Footer from "../components/Footer";

// Custom spinning animation logic for the glowing action button border
const buttonSpinStyle = `
  @keyframes spin-gradient {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .animate-spin-gradient {
    animation: spin-gradient 4s linear infinite;
  }
`;

const WaitlistPage = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success'

  // Ensure page views snap seamlessly to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");

    try {
        await api.post("/api/waitlist", {
          email,
        });
        setStatus("success");
        setEmail("");
    } catch (err) {
        console.error(err);
        const serverMessage = err?.response?.data?.message || err?.response?.data || err.message;
        toast.error(serverMessage || "Failed to join waitlist. Please try again.");
        setStatus("idle");
        return;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased relative overflow-x-hidden flex flex-col justify-between selection:bg-[#2575fc]/20 selection:text-[#2575fc]">
      <style>{buttonSpinStyle}</style>

      {/* GLOBAL MESH GRID OVERLAY */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.025] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_60px]" />

      {/* RADIAL AMBIENT ECLIPSE HIGHLIGHTS */}
      <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[35rem] sm:w-[60rem] h-[30rem] sm:h-[40rem] bg-gradient-to-b from-[#2575fc]/15 to-transparent rounded-full blur-[100px] sm:blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[-10%] w-[30rem] h-[30rem] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* GLOBAL NAVIGATION LAYER */}
        <nav className="relative z-10 flex items-center justify-between max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-konnect font-black tracking-tight"
            >
                <span className="text-[#2575fc]">Nisi</span> HR
            </motion.div>
            <div className="space-x-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Link
                        to="/"
                        className="text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
                    >
                        Home
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Link
                        to="/solutions"
                        className="text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
                    >
                        Solutions
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Link
                        to="/waitlist"
                        className="text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
                    >
                        Join Waitlist
                    </Link>
                </motion.div>
            </div>
        </nav>

      {/* MAIN WAITLIST CONTENT GATEWAY */}
      <main className="relative z-10 flex-1 flex items-center justify-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-40 pb-24">
        <div className="max-w-2xl w-full text-center space-y-8 sm:space-y-10 px-2">
          
          {/* EXCLUSIVITY FLAG CHIP */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <Sparkles size={12} className="text-[#2575fc] animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase font-poppins text-slate-300">
              Now Accepting Signups
            </span>
          </motion.div>

          {/* MAIN CATCHY COPY STACK */}
          <div className="space-y-4 sm:space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="text-xs sm:text-sm md:text-base font-black font-konnect tracking-tight uppercase leading-[1.05]"
            >
             <span className="text-[#2575fc]">Join our waitlist</span> to be the first to experience the future of HR.
            </motion.h1>
          </div>

          {/* INTERACTIVE FORM PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="w-full max-w-md mx-auto p-1 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl shadow-black/50 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {status !== "success" ? (
                <motion.form 
                  key="waitlist-form"
                  onSubmit={handleSubmit}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col sm:flex-row gap-2 w-full p-2"
                >
                  <input 
                    type="email"
                    required
                    disabled={status === "submitting"}
                    placeholder="Enter company email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent border-0 outline-none focus:ring-0 px-4 py-3 text-sm text-white placeholder-slate-500 font-poppins font-medium disabled:opacity-50"
                  />
                  
                  {/* Dynamic Neon Outline Cosmic Button */}
                  <button
                    disabled={status === "submitting" || !email}
                    type="submit"
                    className="relative overflow-hidden p-[1.5px] rounded-2xl flex items-center justify-center w-full sm:w-auto shadow-lg transition-transform active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
                  >
                    {/* Continuous Moving Background Track Ring */}
                    <div className="absolute inset-0 w-[200%] h-[200%] top-[-50%] left-[-50%] bg-[conic-gradient(from_0deg,#2575fc,#6366f1,#d9e6ef,#2575fc)] animate-spin-gradient z-0" />

                    {/* Inner Action Layout Container */}
                    <div className="relative z-10 flex items-center justify-center gap-2 bg-white text-slate-950 font-konnect font-extrabold text-xs tracking-wider uppercase px-6 py-3.5 rounded-[14px] w-full h-full transition-colors hover:bg-white/90">
                      {status === "submitting" ? (
                        <>
                          <Loader2 size={14} className="animate-spin text-[#2575fc]" />
                          <span>Syncing...</span>
                        </>
                      ) : (
                        <>
                          <span>Join Waitlist</span>
                          <ArrowRight size={14} className="stroke-[3.5]" />
                        </>
                      )}
                    </div>
                  </button>
                </motion.form>
              ) : (
                /* GLORIOUS SUCCESS STATE DISPLAY PANEL */
                <motion.div 
                  key="success-prompt"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="p-8 text-center flex flex-col items-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#2575fc]/10 border border-[#2575fc]/30 flex items-center justify-center text-[#2575fc]">
                    <CheckCircle2 size={24} className="stroke-[2.2]" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium font-poppins text-slate-400 max-w-xs mx-auto">
                      Thankyou for joining our waitlist! We are excited to have you on board and will keep you updated on our progress. In the meantime, feel free to explore our website and learn more about how Nisi HR can transform your business.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* PRIVACY TRUST FOOTNOTE CAPTION */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-2 text-[10px] font-bold font-poppins tracking-wider text-slate-500 uppercase"
          >
            <ShieldCheck size={13} className="text-slate-600 stroke-[2.5]" />
            <span>Zero Spam policy • Encrypted Endpoint authentication</span>
          </motion.div>

        </div>
      </main>

      {/* GLOBAL FOOTER LAYER */}
      <Footer />
    </div>
  );
};

export default WaitlistPage;