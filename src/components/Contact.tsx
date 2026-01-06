"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Copy,
  CheckCircle2,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "gauravmishraa2025@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);

    // Trigger Confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#22d3ee", "#a855f7", "#ffffff"],
    });

    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-3xl bg-slate-900 border border-white/10 p-12 shadow-2xl"
        >
          {/* Decorative Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />

          <h2 className="text-4xl font-bold text-white mb-6">
            Let's build something great.
          </h2>
          <p className="text-slate-400 mb-10 text-lg">
            I'm currently open to new opportunities and collaborations.
          </p>

          <div className="flex flex-col items-center gap-6">
            {/* The Email Button */}
            <button
              onClick={handleCopy}
              className="group relative flex items-center gap-4 px-8 py-4 rounded-2xl bg-slate-950 border border-white/10 hover:border-cyan-500/50 transition-all active:scale-95"
            >
              <Mail className="text-cyan-400" size={24} />
              <span className="text-xl font-mono text-slate-200">{email}</span>
              <div className="ml-4 p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                {copied ? (
                  <CheckCircle2 className="text-green-400" size={20} />
                ) : (
                  <Copy className="text-slate-400" size={20} />
                )}
              </div>
            </button>

            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              {[
                { Icon: Github, href: "https://github.com/Gauravmishra01" },
                {
                  Icon: Linkedin,
                  href: "https://www.linkedin.com/in/gauravmishra77/",
                },
                { Icon: Twitter, href: "https://x.com/GauravMishra077" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ y: -5 }}
                  className="p-4 rounded-xl bg-slate-800/50 border border-white/5 text-slate-400 hover:text-white transition-colors"
                >
                  <social.Icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        <footer className="mt-20 text-slate-600 text-sm font-mono">
          © {new Date().getFullYear()} • Built with Next.js & Framer Motion
        </footer>
      </div>
    </section>
  );
}
