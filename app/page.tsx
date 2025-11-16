'use client'
import React, { useState, useEffect } from 'react';
import {Menu,X, Code2, Sparkles, Rocket, Mail, ChevronRight, Brain, Zap, Server, ExternalLink, Terminal, Cpu, Database, ArrowRight, Heart, Users, TrendingUp } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  url: string;
  gradient: string;
  image: string;
  icon: React.ReactNode;
}

interface Skill {
  name: string;
  level: number;
  color: string;
  character: string;
}

interface NavItem {
  name: string;
  id: string;
}

type CursorVariant = 'default' | 'code' | 'link' | 'database' | 'cpu';

export default function GaboDevPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [skillsAnimated, setSkillsAnimated] = useState(false);
  const [sectionsRevealed, setSectionsRevealed] = useState<Record<string, boolean>>({
    trabajos: false,
    skills: false,
    contacto: false
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['inicio', 'trabajos', 'skills', 'contacto'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);

      const skillsSection = document.getElementById('skills');
      if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.7 && !skillsAnimated) {
          setSkillsAnimated(true);
        }
      }

      // Reveal section titles
      const sectionIds = ['trabajos', 'skills', 'contacto'];
      sectionIds.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section && !sectionsRevealed[sectionId]) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.8) {
            setSectionsRevealed(prev => ({ ...prev, [sectionId]: true }));
          }
        }
      });
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (Math.random() > 0.95) {
        const newParticle: Particle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
        };
        setParticles(prev => [...prev.slice(-20), newParticle]);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [skillsAnimated, sectionsRevealed]);

  useEffect(() => {
    const timer = setInterval(() => {
      setParticles(prev => prev.slice(-15));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const projects: Project[] = [
    {
      title: "Europa Padel",
      description: "E-commerce completo para proveedor líder de productos de padel. Catálogo dinámico, carrito de compras y gestión de inventario en tiempo real.",
      tags: ["Next.js", "E-Commerce", "Stripe", "MongoDB"],
      url: "https://www.europadel.com.ar",
      gradient: "from-indigo-600 to-blue-500",
      image: "https://www.europadel.com.ar/assets/europadel2.jpg",
      icon: <Rocket className="w-6 h-6" />,
    },
    {
      title: "Empatía Digital",
      description: "Plataforma de gestión de redes sociales con análisis de empatía por IA. Monitoreo de salud digital, huella online y engagement emocional en tiempo real.",
      tags: ["Next.js", "Vibe Coding", "Analytics", "MongoDB"],
      url: "https://www.empatiadigital.com.ar",
      gradient: "from-purple-600 to-indigo-600",
      image: "../assets/empatialogo.png",
      icon: <Heart className="w-6 h-6" />,
    },
    {
      title: "Sentidos Padres",
      description: "Portal educativo especializado en Fisura Labio Alveolo Palatina (FLAP). Recursos, comunidad de apoyo, guías médicas y testimonios para familias.",
      tags: ["Next.js", "Salud", "Comunidad", "MongoDB"],
      // url: "https://www.sentidospadres.com",
      url: "https://sentidospadres.vercel.app",
      gradient: "from-blue-600 to-cyan-500",
      image: "https://sentidospadres.vercel.app/assets/Sentidoslogo.png",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Zoonito Music",
      url: "https://front-zoonito.vercel.app",
      description: "Sistema de Música Karaoke, Reproductor Online con sincronización en tiempo real y análisis de tendencias.",
      tags: ["Next.js", "WebSockets", "Vibe Coding", "MongoDB"],
      gradient: "from-violet-600 to-purple-500",
      image: "https://front-zoonito.vercel.app/assets/zoonito.jpg",
      icon: <TrendingUp className="w-6 h-6" />,
    }
  ];

  const skills: Skill[] = [
    { name: "Next.js & React", level: 95, color: "from-indigo-600 to-blue-500", character: "" },
    { name: "Vibe Coding & IA", level: 88, color: "from-purple-600 to-indigo-600", character: "" },
    { name: "MongoDB & Databases", level: 90, color: "from-blue-600 to-cyan-500", character: "" },
    { name: "UI/UX Design", level: 85, color: "from-violet-600 to-purple-500", character: "" },
    { name: "DevOps & Cloud", level: 82, color: "from-blue-500 to-indigo-500", character: "" }
  ];

  const navItems: NavItem[] = [
    { name: 'Inicio', id: 'inicio' },
    { name: 'Trabajos', id: 'trabajos' },
    { name: 'Skills', id: 'skills' },
    { name: 'Contacto', id: 'contacto' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white overflow-hidden">


      <div 
        className="fixed pointer-events-none z-50 transition-all duration-100 ease-out"
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-lg"></div>
      </div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-xl shadow-2xl border-b border-indigo-500/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div 
              className="flex items-center space-x-3 group cursor-pointer"
              onMouseEnter={() => setCursorVariant('code')}
              onMouseLeave={() => setCursorVariant('default')}
              onClick={() => scrollToSection('inicio')}
            >
              <div className="relative">
                <Code2 className="w-10 h-10 text-indigo-500 group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Gabo Dev
              </span>
            </div>
            
            <div className="hidden md:flex space-x-2 bg-slate-900/50 backdrop-blur-sm rounded-full p-2 border border-indigo-500/20">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50'
                      : 'text-gray-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                  onMouseEnter={() => setCursorVariant('link')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <button
              className="md:hidden text-white p-2 hover:bg-indigo-500/20 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onMouseEnter={() => setCursorVariant('code')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              {/* {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />} */}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/98 backdrop-blur-xl border-t border-indigo-500/20 animate-slideDown">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      : 'text-gray-300 hover:bg-slate-800/50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="inicio" className="relative pt-32 pb-24 px-4 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fadeInUp">
              <div className="inline-block animate-bounce">
                <span className="px-5 py-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/30 rounded-full text-purple-300 text-sm border border-purple-500/30 backdrop-blur-sm">
                  <Sparkles className="inline w-4 h-4 mr-2 text-purple-400" />
                  Disponible para proyectos
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-bold leading-tight">
                {['D','e','s','a','r','r','o','l','l','o'].map((letter, idx) => (
                  <span key={idx} className="inline-block hover:scale-110 transition-transform cursor-default">{letter}</span>
                ))}
                <br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                  Web Pro
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                Especializado en <span className="text-indigo-400 font-semibold">Next.js</span>, 
                implementación de <span className="text-purple-400 font-semibold">Vibe Coding</span> y 
                <span className="text-blue-400 font-semibold"> MongoDB</span>. Transformo ideas en experiencias digitales excepcionales.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection('contacto')}
                  className="group px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center space-x-2 hover:scale-105"
                  onMouseEnter={() => setCursorVariant('link')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <span>Hablemos</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection('trabajos')}
                  className="px-8 py-4 border-2 border-purple-500 rounded-2xl font-semibold hover:bg-purple-500/10 transition-all duration-300 backdrop-blur-sm hover:scale-105"
                  onMouseEnter={() => setCursorVariant('link')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  Ver Proyectos
                </button>
              </div>
            </div>
            
            <div className="relative animate-fadeInUp animation-delay-300">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-3xl border border-indigo-500/30 shadow-2xl backdrop-blur-xl">
                <div className="space-y-6">
                  {[
                    { icon: <Sparkles className="w-6 h-6 text-purple-400" />, label: "Frontend Moderno", progress: 95, color: "from-indigo-600 to-blue-500" },
                    { icon: <Brain className="w-6 h-6 text-purple-400" />, label: "Vibe Coding", progress: 88, color: "from-purple-600 to-indigo-600" },
                    { icon: <Database className="w-6 h-6 text-cyan-400" />, label: "MongoDB", progress: 90, color: "from-blue-600 to-cyan-500" }
                  ].map((item, idx) => (
                    <div key={idx} className="group">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-slate-800 rounded-lg group-hover:scale-110 transition-transform">
                            {item.icon}
                          </div>
                          <span className="text-lg font-semibold">{item.label}</span>
                        </div>
                        <span className="text-sm text-purple-400 font-mono">{item.progress}%</span>
                      </div>
                      <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
                        <div
                          className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 group-hover:animate-pulse`}
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="trabajos" className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className={`text-5xl md:text-6xl font-bold mb-6 relative inline-block ${sectionsRevealed.trabajos ? 'animate-titleReveal' : 'opacity-0'}`}>
              Mis <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent relative">
                Trabajos
                {!sectionsRevealed.trabajos && (
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-lightBeam"></span>
                )}
              </span>
            </h2>
            <p className={`text-xl text-gray-400 max-w-2xl mx-auto ${sectionsRevealed.trabajos ? 'animate-fadeInUp animation-delay-500' : 'opacity-0'}`}>
              Proyectos reales que combinan diseño, tecnología e innovación
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-indigo-500/30 hover:border-purple-500 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-3 overflow-hidden backdrop-blur-xl"
                onMouseEnter={() => {
                  setCursorVariant(idx === 0 ? 'link' : idx === 1 ? 'cpu' : idx === 2 ? 'database' : 'code');
                  setHoveredProject(idx);
                }}
                onMouseLeave={() => {
                  setCursorVariant('default');
                  setHoveredProject(null);
                }}
              >
                <div className={`relative h-64 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      hoveredProject === idx ? 'scale-110 rotate-2' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                  
                  <div className="absolute top-6 left-6 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 group-hover:scale-110 transition-transform">
                    {project.icon}
                  </div>

                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/20 transition-all border border-white/20 group-hover:rotate-12"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                  )}
                </div>

                <div className="p-8">
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 text-sm mb-6 inline-flex items-center gap-2 group/link transition-colors"
                    >
                      {project.url.replace('https://www.', '')}
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  )}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-sm text-indigo-300 hover:bg-purple-500/20 hover:border-purple-500/30 hover:text-purple-300 transition-colors backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className={`text-5xl md:text-6xl font-bold mb-6 relative inline-block ${sectionsRevealed.skills ? 'animate-titleReveal' : 'opacity-0'}`}>
              Mis <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent relative">
                Skills
                {!sectionsRevealed.skills && (
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-lightBeam"></span>
                )}
              </span>
            </h2>
            <p className={`text-xl text-gray-400 ${sectionsRevealed.skills ? 'animate-fadeInUp animation-delay-500' : 'opacity-0'}`}>
              Tecnologías y herramientas que domino
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8 animate-fadeInUp">
              {skills.map((skill, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between mb-3">
                    <span className="font-semibold text-lg">{skill.name}</span>
                    <span className="text-purple-400 font-mono">{skill.level}%</span>
                  </div>
                  <div className="relative h-8 bg-slate-800/50 rounded-full backdrop-blur-sm border border-indigo-500/20 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-2000 relative flex items-center justify-end pr-2`}
                      style={{ width: skillsAnimated ? `${skill.level}%` : '0%' }}
                    >
                      {skillsAnimated && (
                        <div className="relative text-2xl animate-sonic z-10 filter drop-shadow-lg">
                          {skill.character}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6 animate-fadeInUp animation-delay-300">
              <div className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-3xl border border-indigo-500/30 hover:border-indigo-500 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20 backdrop-blur-xl">
                <div className="p-4 bg-indigo-500/10 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                  <Code2 className="w-12 h-12 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Frontend Moderno</h3>
                <p className="text-gray-400 leading-relaxed">
                  Desarrollo con Next.js y React, priorizando la experiencia del usuario, performance y código limpio y mantenible.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-3xl border border-purple-500/30 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/40 backdrop-blur-xl">
                <div className="p-4 bg-purple-500/20 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform border border-purple-500/20">
                  <Brain className="w-12 h-12 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Vibe Coding & MongoDB</h3>
                <p className="text-gray-400 leading-relaxed">
                  Integración de modelos de Vibe Coding y bases de datos MongoDB escalables para crear experiencias inteligentes y automatizadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-5xl md:text-6xl font-bold mb-6 relative inline-block ${sectionsRevealed.contacto ? 'animate-titleReveal' : 'opacity-0'}`}>
              Hablemos de tu <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent relative">
                Proyecto
                {!sectionsRevealed.contacto && (
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-lightBeam"></span>
                )}
              </span>
            </h2>
            <p className={`text-xl text-gray-400 ${sectionsRevealed.contacto ? 'animate-fadeInUp animation-delay-500' : 'opacity-0'}`}>
              ¿Listo para llevar tu idea al siguiente nivel?
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-10 rounded-3xl border border-indigo-500/30 shadow-2xl backdrop-blur-xl animate-fadeInUp animation-delay-300">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold mb-3 text-purple-300">Nombre</label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 bg-slate-700/50 border border-indigo-500/30 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all backdrop-blur-sm group-hover:border-indigo-500/50"
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold mb-3 text-purple-300">Email</label>
                  <input
                    type="email"
                    className="w-full px-5 py-4 bg-slate-700/50 border border-indigo-500/30 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all backdrop-blur-sm group-hover:border-indigo-500/50"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-semibold mb-3 text-purple-300">Mensaje</label>
                <textarea
                  rows={6}
                  className="w-full px-5 py-4 bg-slate-700/50 border border-indigo-500/30 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all backdrop-blur-sm resize-none group-hover:border-indigo-500/50"
                  placeholder="Cuéntame sobre tu proyecto..."
                ></textarea>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const nombre = (document.querySelector('input[type="text"]') as HTMLInputElement)?.value || '';
                  const email = (document.querySelector('input[type="email"]') as HTMLInputElement)?.value || '';
                  const mensaje = (document.querySelector('textarea') as HTMLTextAreaElement)?.value || '';
                  
                  const textoWhatsApp = `Hola! Soy ${nombre}%0A%0AEmail: ${email}%0A%0AMensaje: ${mensaje}`;
                  const urlWhatsApp = `https://wa.me/543462529718?text=${textoWhatsApp}`;
                  
                  window.open(urlWhatsApp, '_blank');
                }}
                className="group w-full px-8 py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center space-x-3 hover:scale-105"
                onMouseEnter={() => setCursorVariant('link')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <Mail className="w-6 h-6" />
                <span className="text-lg">Enviar por WhatsApp</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-indigo-500/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-3">
              <Code2 className="w-8 h-8 text-indigo-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Gabo Dev
              </span>
            </div>
            <p className="text-gray-400 text-center">
              © 2024 Gabo Dev. Construido con Next.js, Vibe Coding y MongoDB.
            </p>
            <div className="flex gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  onMouseEnter={() => setCursorVariant('link')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes sonic {
          0% { transform: translateX(-3px); }
          50% { transform: translateX(3px); }
          100% { transform: translateX(-3px); }
        }

        @keyframes lightBeam {
          0% {
            transform: translateX(-200%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(200%);
            opacity: 0;
          }
        }

        @keyframes titleReveal {
          0% {
            opacity: 0;
            filter: blur(10px);
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
            filter: blur(0);
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        
        .animate-sonic {
          animation: sonic 0.15s ease-in-out infinite;
        }

        .animate-lightBeam {
          animation: lightBeam 1.5s ease-out;
        }

        .animate-titleReveal {
          animation: titleReveal 1.5s ease-out forwards;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }

        .animation-delay-500 {
          animation-delay: 500ms;
        }
        
        .duration-2000 {
          transition-duration: 2000ms;
        }
        
        input:focus, textarea:focus {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
