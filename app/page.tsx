import Link from "next/link";
import JourneyScrollSection from "@/components/layout/JourneyScrollSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section - Ultra Premium Redesign */}
      <section className="relative min-h-screen lg:h-screen lg:max-h-[900px] flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
        {/* Advanced Custom CSS for Next-Level Animations & Glassmorphism */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(1deg); }
          }
          @keyframes float-reverse {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(15px) rotate(-1deg); }
          }
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -40px) scale(1.05); }
            66% { transform: translate(-20px, 20px) scale(0.95); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          @keyframes shine {
            to { background-position: 200% center; }
          }
          .animate-float { animation: float 7s ease-in-out infinite; }
          .animate-float-delayed { animation: float-reverse 9s ease-in-out infinite; }
          .animate-blob { animation: blob 12s infinite; }
          .animate-blob-delayed { animation: blob 14s infinite; animation-delay: 3s; }
          
          .glass-panel {
            background: rgba(255, 255, 255, 0.65);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.9);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
          }
          .glass-pill {
            background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.6));
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 8px 24px 0 rgba(0,0,0,0.04);
          }
          .text-gradient {
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 200% auto;
            animation: shine 5s linear infinite;
          }
          .hero-bg-texture {
            background: radial-gradient(circle at top left, #f8fafc 0%, #ffffff 100%);
          }
          .svg-noise {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            opacity: 0.015;
            mix-blend-mode: multiply;
          }
        `}} />

        {/* Ethereal Background with Orbs & Noise Texture */}
        <div className="absolute inset-0 hero-bg-texture -z-20"></div>
        <div className="absolute inset-0 svg-noise -z-10 pointer-events-none"></div>
        
        <div className="absolute inset-0 w-full h-full overflow-hidden -z-10 flex items-center justify-center">
          <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-blue-200/40 mix-blend-multiply filter blur-[80px] opacity-70 animate-blob"></div>
          <div className="absolute top-[10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-violet-200/40 mix-blend-multiply filter blur-[80px] opacity-70 animate-blob-delayed"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-teal-100/50 mix-blend-multiply filter blur-[80px] opacity-70 animate-blob"></div>
        </div>

        <div className="layout-container relative z-10 w-full h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full">
            
            {/* Left Column: Typography & Call to Action */}
            <div className="col-span-1 lg:col-span-6 2xl:col-span-5 flex flex-col justify-center text-center lg:text-left py-10 lg:py-0">
              
              {/* Premium Pill Badge */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-pill mb-6 mx-auto lg:mx-0 w-max shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-xs sm:text-sm font-bold tracking-wide text-slate-700 uppercase">A nurturing space for development</span>
              </div>

              {/* Advanced Hero Headline */}
              <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4.2rem] font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1] drop-shadow-sm">
                Empower your <br className="hidden sm:block" />
                child's unique <br className="hidden lg:block" />
                <span className="text-gradient inline-block pb-2">brilliance.</span>
              </h1>

              {/* Refined Body Text */}
              <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Discover a calming, interactive world designed for neurodivergent children. Our supportive games gently nurture emotional, cognitive, and social milestones at their own perfect pace.
              </p>
              
              {/* High-End Button Group */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Link href="/register" className="group relative inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-3.5 rounded-full font-semibold text-base sm:text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10">Start the Journey</span>
                  <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                
                <Link href="/login" className="group inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-base sm:text-lg text-slate-700 bg-white/50 backdrop-blur-md border border-slate-200 hover:bg-white hover:border-slate-300 transition-all hover:shadow-lg hover:-translate-y-0.5 duration-300">
                  Parent Access
                  <span className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-5">
                <div className="flex -space-x-3">
                  <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=100&auto=format&fit=crop" alt="Parent" className="w-10 h-10 rounded-full border-[3px] border-white object-cover shadow-sm" />
                  <img src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=100&auto=format&fit=crop" alt="Parent" className="w-10 h-10 rounded-full border-[3px] border-white object-cover shadow-sm" />
                  <img src="https://images.unsplash.com/photo-1555252115-442d87e02df3?q=80&w=100&auto=format&fit=crop" alt="Parent" className="w-10 h-10 rounded-full border-[3px] border-white object-cover shadow-sm" />
                  <div className="w-10 h-10 rounded-full border-[3px] border-white bg-slate-50 flex items-center justify-center shadow-sm text-[10px] font-bold text-slate-600">+2k</div>
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex gap-1 text-warning-amber mb-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-3.5 h-3.5 fill-current drop-shadow-sm" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-slate-500 font-bold tracking-wide">Trusted by caring parents</span>
                </div>
              </div>
            </div>

            {/* Right Column: Abstract Multi-layered Image Collage */}
            <div className="col-span-1 lg:col-span-6 2xl:col-span-7 relative w-full h-[50vh] lg:h-[75vh] max-h-[550px] flex items-center justify-center mt-6 lg:mt-0 pb-10 lg:pb-0">
              
              {/* Abstract decorative elements */}
              <div className="absolute top-1/4 right-0 w-24 h-24 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
              <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>

              <div className="relative w-full max-w-[380px] lg:max-w-[460px] aspect-[4/5] mx-auto z-10">
                
                {/* Main Large Portrait Image */}
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] border-[6px] border-white/80 animate-float">
                  <img 
                    src="https://images.unsplash.com/photo-1602030028438-4cf153cba9ed?q=80&w=2070&auto=format&fit=crop" 
                    alt="Child in a calm environment" 
                    className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000 ease-out"
                  />
                  {/* Subtle inner gradient for premium feel */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
                </div>

                {/* Overlapping Landscape Image (Bottom Left) */}
                <div className="absolute -left-6 sm:-left-12 bottom-6 w-[65%] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-[5px] border-white animate-float-delayed z-20">
                  <img 
                    src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2000&auto=format&fit=crop" 
                    alt="Hands playing with educational toys" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Floating Glassmorphism Achievement Card (Top Right) */}
                <div className="absolute -right-4 sm:-right-8 top-12 glass-panel p-4 rounded-2xl w-[200px] z-30 animate-float shadow-xl" style={{ animationDelay: '1.5s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white shadow-[0_0_12px_rgba(96,165,250,0.5)]">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-slate-800">New Milestone!</p>
                      <p className="text-[10px] text-slate-500 font-bold tracking-wide uppercase mt-0.5">Cognitive Skills</p>
                    </div>
                  </div>
                  <div className="mt-3 bg-slate-200/50 rounded-full h-1.5 w-full overflow-hidden backdrop-blur-sm">
                    <div className="bg-gradient-to-r from-blue-400 to-violet-500 w-[85%] h-full rounded-full relative">
                      <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 animate-pulse rounded-full blur-[1px]"></div>
                    </div>
                  </div>
                </div>

                {/* Decorative Sparkle SVG (Top Left) */}
                <svg className="absolute -top-6 -left-6 w-10 h-10 text-warning-amber animate-spin z-0 opacity-80 filter drop-shadow-md" style={{ animationDuration: '15s' }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" />
                </svg>
                
                {/* Decorative Sparkle SVG (Bottom Right) */}
                <svg className="absolute -bottom-6 right-6 w-8 h-8 text-primary-blue animate-spin z-30 opacity-70 filter drop-shadow-md" style={{ animationDuration: '10s', animationDirection: 'reverse' }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" />
                </svg>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section - Horizontal Interactive Slider */}
      <JourneyScrollSection />

      {/* Development Areas - World-Class Bento Grid */}
      <section className="relative py-32 bg-slate-900 overflow-hidden rounded-[3rem] mx-4 sm:mx-8 lg:mx-12 my-32 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
        {/* Dark Mode Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/20 blur-[120px]"></div>
          <div className="absolute -bottom-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-violet-600/20 blur-[120px]"></div>
        </div>

        <div className="layout-container relative z-10 lg:px-12">
          {/* Header */}
          <div className="text-center sm:text-left flex flex-col lg:flex-row justify-between items-center sm:items-start lg:items-end gap-8 mb-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-white/10 border border-white/20 text-blue-300 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md">
                Growth Pillars
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-extrabold text-white tracking-tight leading-[1.05]">
                Four dimensions of <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-teal-300">brilliant growth.</span>
              </h2>
            </div>
            <p className="text-lg text-slate-300 font-medium leading-relaxed max-w-sm text-center sm:text-left pb-2">
              Our curated activities are intricately designed to gently nurture these core developmental areas through the joy of play.
            </p>
          </div>

          {/* Asymmetrical Bento Grid */}
          <div className="flex flex-col gap-6">
            
            {/* Top Row */}
            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* Emotion (Large Card) */}
              <div className="relative group w-full lg:w-7/12 aspect-square sm:aspect-[2/1] lg:aspect-auto lg:h-[480px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl">
                <img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2070&auto=format&fit=crop" alt="Emotion" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent transition-opacity duration-700 group-hover:opacity-90"></div>
                
                {/* Content */}
                <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end z-20">
                  <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white mb-6 shadow-lg">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg tracking-tight">Emotion</h3>
                    
                    {/* Hidden Hover Content (Expands naturally without overlap) */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                      <div className="overflow-hidden">
                        <p className="text-slate-200 text-lg font-medium drop-shadow-md leading-relaxed pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          Helping children recognize, understand, and beautifully express their feelings through highly engaging visual matching games.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cognitive Skills (Small Card) */}
              <div className="relative group w-full lg:w-5/12 aspect-square sm:aspect-[2/1] lg:aspect-auto lg:h-[480px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl">
                <img src="https://images.unsplash.com/photo-1611080922880-928cc518779b?q=80&w=2069&auto=format&fit=crop" alt="Cognitive Skills" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent transition-opacity duration-700 group-hover:opacity-90"></div>
                
                {/* Content */}
                <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end z-20">
                  <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white mb-6 shadow-lg">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg tracking-tight">Cognitive Skills</h3>
                    
                    {/* Hidden Hover Content */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                      <div className="overflow-hidden">
                        <p className="text-slate-200 text-lg font-medium drop-shadow-md leading-relaxed pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          Fun spatial patterns and gentle memory challenges designed to dramatically boost focus and logical problem-solving.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row */}
            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* Self-awareness (Small Card) */}
              <div className="relative group w-full lg:w-5/12 aspect-square sm:aspect-[2/1] lg:aspect-auto lg:h-[480px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl">
                <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=2000&auto=format&fit=crop" alt="Self-awareness" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent transition-opacity duration-700 group-hover:opacity-90"></div>
                
                {/* Content */}
                <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end z-20">
                  <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white mb-6 shadow-lg">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg tracking-tight">Self-awareness</h3>
                    
                    {/* Hidden Hover Content */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                      <div className="overflow-hidden">
                        <p className="text-slate-200 text-lg font-medium drop-shadow-md leading-relaxed pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          Step-by-step interactive activities teaching daily habits and encouraging mindfulness and healthy independence.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mathematical Skills (Large Card) */}
              <div className="relative group w-full lg:w-7/12 aspect-square sm:aspect-[2/1] lg:aspect-auto lg:h-[480px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl">
                <img src="https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=2070&auto=format&fit=crop" alt="Mathematical Skills" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent transition-opacity duration-700 group-hover:opacity-90"></div>
                
                {/* Content */}
                <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end z-20">
                  <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white mb-6 shadow-lg">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg tracking-tight">Mathematical Skills</h3>
                    
                    {/* Hidden Hover Content */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                      <div className="overflow-hidden">
                        <p className="text-slate-200 text-lg font-medium drop-shadow-md leading-relaxed pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          Friendly number games with colorful objects designed to make counting, sorting, and early logic a pure joy.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Final CTA & Medical Disclaimer Section */}
      <section className="relative py-24 sm:py-32 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] sm:w-[80vw] sm:h-[80vw] rounded-full bg-gradient-to-tr from-primary-blue/5 via-secondary-violet/5 to-teal-400/10 blur-[120px]"></div>
        </div>

        <div className="layout-container relative z-10">
          <div className="max-w-5xl mx-auto bg-slate-50/80 backdrop-blur-3xl rounded-[3rem] sm:rounded-[4rem] p-8 sm:p-20 text-center shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-white relative overflow-hidden group">
            {/* Subtle corner decorations */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary-blue/10 rounded-full blur-3xl group-hover:bg-primary-blue/20 transition-colors duration-1000"></div>
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-secondary-violet/10 rounded-full blur-3xl group-hover:bg-secondary-violet/20 transition-colors duration-1000"></div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tight drop-shadow-sm">
              Ready to support their <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue via-secondary-violet to-teal-400">growth journey?</span>
            </h2>
            
            <div className="relative mb-16">
              <Link href="/register" className="inline-flex items-center justify-center px-10 py-5 text-lg font-extrabold text-white bg-slate-900 rounded-full hover:scale-105 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-500 relative z-10 overflow-hidden group/btn">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-blue via-secondary-violet to-teal-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></span>
                <span className="relative z-10 flex items-center gap-3">
                  Start For Free
                  <svg className="w-6 h-6 group-hover/btn:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Medical Disclaimer Note */}
            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-5 bg-white/70 backdrop-blur-lg p-6 sm:p-8 rounded-[2rem] border border-white shadow-sm hover:shadow-md transition-shadow duration-300 text-left">
              <div className="flex-shrink-0 w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 shadow-inner">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <strong className="text-slate-800 text-lg block mb-1">Important Note</strong>
                <p className="text-slate-600 font-medium leading-relaxed">
                  This platform provides supportive learning activities and progress tracking. It is not a medical diagnosis tool.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      

    </main>
  );
}
