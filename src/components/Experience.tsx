import { useRef } from 'react';
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  // Work Experience Scroll Tracking
  const workRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: workProgress } = useScroll({
    target: workRef,
    offset: ["start center", "end center"]
  });
  const workScaleY = useSpring(workProgress, { stiffness: 90, damping: 25, restDelta: 0.001 });
  const workCometTop = useTransform(workScaleY, [0, 1], ["0%", "100%"]);
  const workCometOpacity = useTransform(workScaleY, [0, 0.08], [0, 1]);

  // Education Scroll Tracking
  const eduRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: eduProgress } = useScroll({
    target: eduRef,
    offset: ["start center", "end center"]
  });
  const eduScaleY = useSpring(eduProgress, { stiffness: 90, damping: 25, restDelta: 0.001 });
  const eduCometTop = useTransform(eduScaleY, [0, 1], ["0%", "100%"]);
  const eduCometOpacity = useTransform(eduScaleY, [0, 0.08], [0, 1]);

  const experienceList = [
    {
      company: 'OTTOBON Prof Svc Pvt. Ltd',
      role: 'Agentic AI Engineer',
      date: 'August 2025 – Present',
      desc: 'Architected a configuration-driven Digital Twin platform with multi-agent orchestration, tool-use planning, and stateful AI workflows. Built hybrid RAG pipelines combining vector search, lexical retrieval, and confidence gating over pgvector/Supabase. Engineered human-intercept and AI safety guardrail mechanisms for high-stakes workflows. Delivered React-based control planes and patient workflow interfaces.'
    },
    {
      company: 'Dredging Corporation of India Limited',
      role: 'Graduate Technical Apprentice (IT)',
      date: 'September 2024 – July 2025',
      desc: 'Supported enterprise operations maintaining MS Dynamics 365 (ERP) modules for payroll and HR processes. Created interactive Power BI dashboards to visualize operational data. Delivered frontline IT support resolving hardware, software, and network issues for 100+ employees.'
    }
  ];

  const educationList = [
    {
      degree: 'B.Tech in Artificial Intelligence & Data Science',
      institution: "Vignan's Institute of Information Technology (VIIT), Visakhapatnam",
      date: 'Nov 2021 – June 2024',
      details: 'Focused on machine learning, deep learning, natural language processing, and data science. CGPA: 7.9/10. Developed expertise in Python, AI model development, and data-driven application engineering.'
    },
    {
      degree: 'Diploma in Computer Science & Engineering',
      institution: 'Govt. Polytechnic College, Srikakulam',
      date: 'July 2018 – Sept 2021',
      details: 'Built strong foundational knowledge in programming, data structures, algorithms, database management, and computer networks. CGPA: 8.7/10.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section 
      id="experience" 
      className="relative w-full bg-[#0A0A0A] text-white py-24 sm:py-32 overflow-hidden border-t border-white/5"
    >
      {/* Background radial glow */}
      <div className="absolute left-1/4 top-1/3 w-[300px] h-[300px] rounded-full bg-[#d4f534]/3 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl w-[90%] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16 sm:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#d4f534] select-none">
            J o u r n e y
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
            Experience & Journey
          </h2>
          <p className="font-sans text-neutral-400 max-w-xl text-base">
            From enterprise IT to Agentic AI engineering — a focused career journey building production-grade intelligent systems with Python, FastAPI, and cloud-native architectures.
          </p>
        </div>

        {/* Dual timeline grid */}
        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
        >
          
          {/* Left Column: Work Experience */}
          <div ref={workRef} className="flex flex-col gap-8">
            <h3 className="font-sans font-bold text-xl uppercase tracking-wider text-white border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
              <span className="text-[#d4f534]">/</span> Work Experience
            </h3>
            
            <div className="relative pl-6 sm:pl-10 ml-2 flex flex-col gap-12">
              {/* Static background line */}
              <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-white/10" />
              {/* Active scroll-drawn line */}
              <motion.div
                className="absolute left-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#d4f534] to-[#d4f534]/20 origin-top"
                style={{ scaleY: workScaleY }}
              />
              {/* Scroll-following glowing comet */}
              <div className="absolute left-0 top-2 bottom-2 w-0 pointer-events-none">
                <motion.div
                  className="absolute left-0 -translate-x-1/2 w-1 h-8 rounded-full bg-gradient-to-t from-[#d4f534] via-[#d4f534]/50 to-transparent shadow-[0_0_10px_rgba(212,245,52,0.8)]"
                  style={{ top: workCometTop, y: "-100%", opacity: workCometOpacity }}
                />
              </div>
              {experienceList.map((job, idx) => (
                <motion.div 
                  key={job.company + idx}
                  variants={itemVariants}
                  className="relative flex flex-col gap-2 group cursor-default"
                >
                  {/* Glassy hover card background overlay (zero-shift) */}
                  <div className="absolute inset-x-[-16px] sm:inset-x-[-24px] inset-y-[-12px] rounded-xl bg-white/0 border border-transparent group-hover:bg-white/[0.015] group-hover:border-white/5 transition-all duration-300 pointer-events-none" />

                  {/* Timeline indicator node dot */}
                  <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 z-20">
                    <div 
                      className="w-full h-full rounded-full bg-[#0A0A0A] border-2 border-white/30 group-hover:border-[#d4f534] group-hover:bg-[#d4f534] group-hover:scale-125 transition-all duration-300 relative flex items-center justify-center"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-black transition-colors duration-300" />
                      <span className="absolute -inset-1.5 rounded-full border border-[#d4f534]/30 group-hover:border-[#d4f534]/50 group-hover:scale-110 animate-pulse pointer-events-none transition-all duration-300" />
                    </div>
                  </div>
                  
                  {/* Sliding Text Wrapper */}
                  <div className="flex flex-col gap-2 transition-transform duration-300 group-hover:translate-x-1.5 relative z-10">
                    <div className="flex flex-col gap-1">
                      <span className="font-sans font-black text-base sm:text-lg text-white group-hover:text-[#d4f534] transition-colors duration-300">
                        {job.company}
                      </span>
                      <span className="font-mono text-xs text-neutral-400">
                        {job.role}
                      </span>
                      <span className="font-sans text-xs text-neutral-500 font-medium mt-1">
                        {job.date}
                      </span>
                    </div>
                    <div>
                      <p className="font-sans text-[#71717A] group-hover:text-neutral-300 transition-colors duration-300 text-sm leading-relaxed">
                        {job.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Education */}
          <div ref={eduRef} className="flex flex-col gap-8">
            <h3 className="font-sans font-bold text-xl uppercase tracking-wider text-white border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
              <span className="text-[#d4f534]">/</span> Education
            </h3>
            
            <div className="relative pl-6 sm:pl-10 ml-2 flex flex-col gap-12">
              {/* Static background line */}
              <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-white/10" />
              {/* Active scroll-drawn line */}
              <motion.div
                className="absolute left-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#d4f534] to-[#d4f534]/20 origin-top"
                style={{ scaleY: eduScaleY }}
              />
              {/* Scroll-following glowing comet */}
              <div className="absolute left-0 top-2 bottom-2 w-0 pointer-events-none">
                <motion.div
                  className="absolute left-0 -translate-x-1/2 w-1 h-8 rounded-full bg-gradient-to-t from-[#d4f534] via-[#d4f534]/50 to-transparent shadow-[0_0_10px_rgba(212,245,52,0.8)]"
                  style={{ top: eduCometTop, y: "-100%", opacity: eduCometOpacity }}
                />
              </div>
              {educationList.map((edu, idx) => (
                <motion.div 
                  key={edu.degree + idx}
                  variants={itemVariants}
                  className="relative flex flex-col gap-2 group cursor-default"
                >
                  {/* Glassy hover card background overlay (zero-shift) */}
                  <div className="absolute inset-x-[-16px] sm:inset-x-[-24px] inset-y-[-12px] rounded-xl bg-white/0 border border-transparent group-hover:bg-white/[0.015] group-hover:border-white/5 transition-all duration-300 pointer-events-none" />

                  {/* Timeline indicator node dot */}
                  <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 z-20">
                    <div 
                      className="w-full h-full rounded-full bg-[#0A0A0A] border-2 border-white/30 group-hover:border-[#d4f534] group-hover:bg-[#d4f534] group-hover:scale-125 transition-all duration-300 relative flex items-center justify-center"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-black transition-colors duration-300" />
                      <span className="absolute -inset-1.5 rounded-full border border-[#d4f534]/30 group-hover:border-[#d4f534]/50 group-hover:scale-110 animate-pulse pointer-events-none transition-all duration-300" />
                    </div>
                  </div>
                  
                  {/* Sliding Text Wrapper */}
                  <div className="flex flex-col gap-2 transition-transform duration-300 group-hover:translate-x-1.5 relative z-10">
                    <div className="flex flex-col gap-1">
                      <span className="font-sans font-black text-base sm:text-lg text-white group-hover:text-[#d4f534] transition-colors duration-300">
                        {edu.degree}
                      </span>
                      <span className="font-mono text-xs text-neutral-400">
                        {edu.institution}
                      </span>
                      <span className="font-sans text-xs text-neutral-500 font-medium mt-1">
                        {edu.date}
                      </span>
                    </div>
                    <div>
                      <p className="font-sans text-[#71717A] group-hover:text-neutral-300 transition-colors duration-300 text-sm leading-relaxed">
                        {edu.details}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
