"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white font-sans">
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-10 py-5 transition-colors duration-700 backdrop-blur-md
          ${scrolled ? "bg-black/90 shadow-xl" : "bg-transparent"}`}
      >
        <h1 className="text-4xl font-extrabold tracking-widest drop-shadow text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 cursor-default select-none">
          SynergySphere
        </h1>

        <div className="flex gap-6 text-lg font-medium items-center">
          {["Home", "Solutions", "Work", "About"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="relative px-2 py-1 hover:text-indigo-400 transition duration-300"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          <Link href="/auth/login" passHref>
            <Button variant="outline" size="sm" className="border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white transition">
              Login
            </Button>
          </Link>
          <Link href="/auth/register" passHref>
            <Button variant="default" size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg transition">
              Register
            </Button>
          </Link>
        </div>
      </nav>

      {/* Spacer for fixed navbar height */}
      <div className="h-20"></div>

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center flex-grow px-6 text-center max-w-5xl mx-auto py-28 select-none">
        <h2 className="text-6xl md:text-7xl font-black leading-tight drop-shadow-lg bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Orchestrate Collaboration.<br /> Empower Success.
        </h2>
        <p className="mt-6 max-w-3xl text-xl text-gray-300 font-light leading-relaxed">
          SynergySphere is the intelligent team collaboration platform that <br />
          centralizes communication, task management, and project insights<br />
          — all designed to help your team achieve peak productivity.
        </p>

        <Button
          size="lg"
          asChild
          className="mt-12 px-14 py-5 font-semibold rounded-full shadow-xl bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-600 transition-transform transform hover:scale-105 active:scale-95"
        >
          <Link href="/auth/register">Get Started — It’s Free!</Link>
        </Button>

        {/* Bottom Benefit Highlights */}
        <div className="mt-20 flex flex-wrap justify-center gap-12 max-w-4xl">
          {[
            { icon: "🔗", title: "Real-time Collaboration", desc: "Instant connection with your team, anywhere." },
            { icon: "📈", title: "Dynamic Task Tracking", desc: "Visualize workload and deadlines effortlessly." },
            { icon: "💬", title: "Seamless Messaging", desc: "Project-specific chat that keeps everyone in sync." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="text-left max-w-xs bg-gradient-to-br from-black/30 to-black/10 rounded-3xl p-6 shadow-lg backdrop-blur-md border border-white/10 hover:bg-indigo-900/30 transition">
              <div className="text-5xl mb-4 select-text">{icon}</div>
              <h3 className="font-bold text-2xl mb-2 tracking-wide">{title}</h3>
              <p className="text-gray-300 font-normal">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 bg-opacity-90 border-t border-gray-700 text-gray-400 text-sm select-none py-12 px-10 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          {/* Brand Info */}
          <div className="flex items-center gap-3 mb-6 md:mb-0">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-3xl shadow-lg">
              SS
            </div>
            <div>
              <p className="font-bold text-white text-lg">SynergySphere</p>
              <p className="mt-1 max-w-xs">Orchestrate your team workflow, enhance communication, and unlock potential.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-3 gap-16 text-left text-gray-300">
            <div>
              <h4 className="mb-4 font-semibold text-indigo-400">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/dashboard" className="hover:text-indigo-500 transition">Dashboard</Link></li>
                <li><Link href="/projects" className="hover:text-indigo-500 transition">Projects</Link></li>
                <li><Link href="/tasks" className="hover:text-indigo-500 transition">Tasks</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-indigo-400">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-indigo-500 transition">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-indigo-500 transition">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-indigo-500 transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-indigo-400">Connect</h4>
              <ul className="space-y-2 flex flex-col">
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition">Twitter</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition">LinkedIn</a></li>
                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition">Facebook</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs mt-12 text-gray-600">&copy; {new Date().getFullYear()} SynergySphere. All rights reserved.</p>
      </footer>
    </main>
  );
}
