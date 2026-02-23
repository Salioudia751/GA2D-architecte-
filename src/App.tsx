import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ArrowRight, Calendar, MapPin,
  Phone, Mail, Users, Building2, Leaf, Globe, Award,
  Quote, ChevronDown, ExternalLink, ChevronLeft, ChevronRight
} from 'lucide-react';
import { cn } from './utils/cn';

// Types
interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  year: string;
  image: string;
  description: string;
  gallery?: string[];
  fullDescription?: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
}

// Logo Component - GA2D ARCHITECTES
const Logo = ({ className = "", variant = "dark" }: { className?: string; variant?: "dark" | "light" }) => {
  const isDark = variant === "dark";
  return (
    <div className={`flex items-center ${className}`}>
      <div className={`w-14 h-14 border-2 flex flex-wrap items-center justify-center ${isDark ? 'border-black' : 'border-white'}`}>
        <div className={`text-xl font-bold font-['Montserrat'] tracking-wider ${isDark ? 'text-black' : 'text-white'}`} style={{ lineHeight: 0.9 }}>
          <div className="flex gap-1">
            <span>G</span>
            <span>A</span>
          </div>
          <div className="flex gap-1">
            <span>2</span>
            <span>D</span>
          </div>
        </div>
      </div>
      <div className={`w-px h-14 mx-3 ${isDark ? 'bg-black' : 'bg-white'}`} />
      <div className={`text-xs font-medium tracking-[0.3em] uppercase ${isDark ? 'text-black' : 'text-white'}`}>
        ARCHITECTES
      </div>
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['accueil', 'agence', 'projets', 'equipe', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'agence', label: 'Agence' },
    { id: 'projets', label: 'Projets' },
    { id: 'equipe', label: 'Équipe' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <button onClick={() => scrollToSection('accueil')} className="flex items-center gap-3">
            <Logo variant={scrolled ? "dark" : "light"} />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={cn(
                  "text-sm font-medium uppercase tracking-wider transition-colors",
                  scrolled
                    ? activeSection === link.id ? "text-black border-b-2 border-black pb-1" : "text-gray-600 hover:text-black"
                    : activeSection === link.id ? "text-white border-b-2 border-white pb-1" : "text-white/90 hover:text-white"
                )}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Contact Info */}
          <div className="hidden lg:block">
            <a
              href="tel:+221338258950"
              className="px-6 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <Phone size={18} />
              (+221) 33 825 89 50
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "lg:hidden p-2",
              scrolled ? "text-black" : "text-white"
            )}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={cn(
                    "block w-full text-left py-2 text-sm font-medium uppercase tracking-wider",
                    activeSection === link.id ? "text-black font-bold" : "text-gray-600"
                  )}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full bg-black text-white py-3 font-medium text-center mt-4"
              >
                Prendre rendez-vous
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/assets/46021825744_7099db0cb3_o_16.9.jpg",
      title: "Réhabilitation de la Gare de Dakar",
      subtitle: "Patrimoine historique - Dakar"
    },
    {
      image: "/assets/VUE-1-scaled.jpg",
      title: "Architecture Durable & Innovante",
      subtitle: "Engagés pour l'avenir du Sénégal"
    },
    {
      image: "/assets/MAISON-GA2D_16.9-2-scaled.jpg",
      title: "28 Ans d'Excellence",
      subtitle: "Depuis 1996 à Dakar"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl"
          >
            <div className="w-16 h-1 bg-white mb-6" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-['Montserrat'] leading-tight mb-6">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
              {slides[currentSlide].subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('projets')}
                className="px-8 py-4 bg-white text-black font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Découvrir nos projets
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollToSection('agence')}
                className="px-8 py-4 border-2 border-white text-white font-medium hover:bg-white hover:text-black transition-all duration-300"
              >
                L'agence
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-12 h-1 transition-all duration-300",
              currentSlide === index ? "bg-white" : "bg-white/40 hover:bg-white/60"
            )}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-10 right-10 z-20 hidden lg:block"
      >
        <button
          onClick={() => scrollToSection('agence')}
          className="flex flex-col items-center gap-2 text-white/80 hover:text-white"
        >
          <span className="text-xs uppercase tracking-widest rotate-90 origin-center translate-y-8">Scroll</span>
          <ChevronDown size={24} />
        </button>
      </motion.div>
    </section>
  );
};

// Stats Section
const StatsSection = () => {
  const stats = [
    { number: "28+", label: "Années d'expérience", icon: Award },
    { number: "150+", label: "Projets réalisés", icon: Building2 },
    { number: "15+", label: "Professionnels", icon: Users },
    { number: "35+", label: "Collaborations", icon: Globe },
  ];

  return (
    <section className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <stat.icon className="w-8 h-8 text-white mx-auto mb-4" />
              <div className="text-4xl lg:text-5xl font-bold text-white font-['Montserrat'] mb-2">
                {stat.number}
              </div>
              <div className="text-white/70 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Agency Section
const AgencySection = () => {
  const values = [
    {
      icon: Leaf,
      title: "Durabilité",
      description: "Intégration des principes du développement durable dans chaque projet"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Recherche constante de la qualité et de l'innovation architecturale"
    },
    {
      icon: Globe,
      title: "Ouverture",
      description: "Collaborations internationales et échanges culturels enrichissants"
    },
    {
      icon: Building2,
      title: "Patrimoine",
      description: "Préservation et valorisation du patrimoine architectural sénégalais"
    }
  ];

  return (
    <section id="agence" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <span className="text-gray-500 text-sm font-semibold uppercase tracking-widest">L'Agence</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-black font-['Montserrat'] mt-4 mb-6">
            Le Bureau GA2D
          </h2>
          <div className="w-16 h-1 bg-black mb-8" />

          {/* Office Image */}
          <div className="mb-8">
            <img
              src="/assets/MAISON-GA2D_16.9-2-scaled.jpg"
              alt="Bureau GA2D"
              className="w-full h-80 object-cover"
            />
          </div>

          <div className="text-gray-700 text-lg leading-relaxed space-y-6">
            <p>
              GA2D est une agence d'architecture fondée en 1996 par Andrée Diop Depret, rejointe en 2000 par Eric Mulot.
              Andrée est architecte DPLG, diplômée de l'École d'Architecture et d'Urbanisme Régionale de Dakar en 1980
              et première femme architecte diplômée au Sénégal. Eric est architecte DPLG, diplômé de l'École Nationale
              Supérieure d'architecture de La Défense en 1992.
            </p>
            <p>
              Depuis près de 25 ans GA2D pratique l'architecture pour tous les usages et à toutes les échelles,
              du domestique à l'urbain. Installée à Dakar, l'agence mène des projets dans tout le Sénégal et dans
              la sous-région. GA2D emploie des profils aux cultures et compétences variées dans un souci de
              diversification des expériences et de renforcement des savoir-faire.
            </p>
            <p>
              Cette recherche de qualité lui a donné l'occasion de collaborer avec de multiples partenaires internationaux,
              agences d'architecture ou bureaux d'étude. Cette philosophie de travail permet d'offrir à chaque projet
              une réponse aboutie alliant créativité, esthétique et technicité. Aujourd'hui, GA2D regroupe plus de 15 personnes :
              architectes, ingénieurs, dessinateurs... et intervient sur la totalité de l'étendue du métier d'architecte :
              conception, maîtrise d'œuvre, suivi de chantier, assistance à la maîtrise d'ouvrage, conseil.
            </p>
            <p>
              GA2D inscrit la qualité environnementale au cœur de sa pratique et travaille à la mise en valeur des savoirs
              faire et matériaux locaux. Comme en attestent nos nombreuses références en réhabilitation de monuments historiques,
              le respect du patrimoine bâti est au centre de notre pratique professionnelle.
            </p>
          </div>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 p-8 group hover:bg-black transition-colors duration-300"
            >
              <div className="w-14 h-14 bg-black flex items-center justify-center mb-6 group-hover:bg-white transition-colors duration-300">
                <value.icon className="w-7 h-7 text-white group-hover:text-black transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-black font-['Montserrat'] mb-3 group-hover:text-white transition-colors duration-300">
                {value.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Methodology Section */}
        <div className="bg-gray-50 p-8 lg:p-16">
          <div className="max-w-4xl mx-auto">
            <span className="text-gray-500 text-sm font-semibold uppercase tracking-widest">Notre Approche</span>
            <h3 className="text-3xl lg:text-4xl font-bold text-black font-['Montserrat'] mt-4 mb-8">
              Méthodologie
            </h3>

            <p className="text-gray-700 leading-relaxed mb-12">
              GA2D s'engage à mettre à disposition les moyens humains et techniques nécessaires à la bonne réalisation
              de vos projets, tant en phase études qu'en phase de réalisation. Pour ce faire, notre travail repose sur
              les quatre engagements suivants : écouter, comprendre, concevoir et construire.
            </p>
            <p className="text-gray-700 leading-relaxed mb-12">
              L'objectif du GA2D est de créer des lieux de vie uniques, en adéquation avec les occupants et leur
              environnement, afin d'améliorer les conditions de vie domestiques et urbaines des populations concernées.
              GA2D et ses partenaires s'engagent à travailler en équipe à vos côtés pour fournir une réponse architecturale
              qualitative et responsable.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  step: "01",
                  title: "Écouter",
                  desc: "Chaque projet est unique et sa réussite repose sur la cohérence entre les différents acteurs : client, maître d'ouvrage, occupants, exploitant, voisinage, contexte... Notre approche consiste à rencontrer chaque protagoniste pour recueillir ses attentes et l'aider à mieux les définir."
                },
                {
                  step: "02",
                  title: "Comprendre",
                  desc: "Une fois le cadre du projet bien défini, nous commençons le travail par une analyse exhaustive des enjeux, contraintes, opportunités, et de leurs impacts sur le contexte urbain, architectural et social existant. Il s'agit alors de définir les niveaux de priorité et d'identifier les points bloquants du processus pour mieux les désamorcer."
                },
                {
                  step: "03",
                  title: "Concevoir",
                  desc: "Respect de l'environnement et des spécificités sociales et culturelles, créativité, innovation, technicité, humilité, sobriété et réversibilité, guident notre approche architecturale. La conception permet de synthétiser de multiples réponses aux différentes contraintes du projet pour aboutir à une solution architecturale fédératrice, cohérente et aboutie."
                },
                {
                  step: "04",
                  title: "Construire",
                  desc: "Le suivi de l'exécution des travaux est primordial pour aboutir à une construction conforme au projet, c'est pourquoi notre équipe s'engage à venir le plus souvent possible sur le chantier. Elle vérifie ainsi la conformité des travaux et appuie les entreprises dans la recherche de solutions pertinentes."
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="bg-white p-8"
                >
                  <div className="w-16 h-16 bg-black flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-white font-['Montserrat']">{item.step}</span>
                  </div>
                  <h4 className="text-xl font-bold text-black font-['Montserrat'] mb-4">{item.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = () => {
  const [filter, setFilter] = useState('tous');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const categories = [
    { id: 'tous', label: 'Tous les projets' },
    { id: 'amenagement', label: 'Aménagement' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'cultuel', label: 'Cultuel' },
    { id: 'culturel', label: 'Culturel' },
    { id: 'education', label: 'Éducation' },
    { id: 'industriel', label: 'Industriel' },
    { id: 'infrastructure', label: 'Infrastructure' },
    { id: 'logements', label: 'Logements' },
    { id: 'rehabilitation', label: 'Réhabilitation' },
    { id: 'sante', label: 'Santé' },
    { id: 'tertiaire', label: 'Tertiaire' },
  ];

  const projects: Project[] = [
    { id: 1, title: 'Marché Sandaga', category: 'commercial', location: 'Dakar', year: '2020', image: '/assets/EXTERIEUR_16.9-scaled.jpg', description: 'Réhabilitation et modernisation du marché historique Sandaga.', gallery: [], fullDescription: '' },
    { id: 2, title: 'Supermarchés Auchan', category: 'commercial', location: 'Sénégal', year: '2023', image: '/assets/Image-11-scaled.jpg', description: 'Conception architecturale pour la chaîne Auchan.', gallery: [], fullDescription: '' },
    {
      id: 3, title: 'Concessionnaires CFAO', category: 'commercial', location: 'Dakar', year: '2020', image: '/assets/IMG_0624-Copie_16.9-scaled.jpg', description: 'Aménagement de concessions automobiles pour CFAO.', gallery: ["https://ga2d.com/wp-content/uploads/2020/07/IMG_0624-Copie_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/CFAO-Sénégal-05_16.9-2.jpg","https://ga2d.com/wp-content/uploads/2020/07/CFAO-Sénégal-02_16.9-2.jpg"], fullDescription: 'Constructions de concessions automobiles et motos pour le distributeur CFAO\n Peugeot Suzuki pour site 01 et Toyota Yamaha sur site 02\n Mission de maîtrise d\'œuvre d\'opération' },
    { id: 4, title: 'Eglise Saint Paul', category: 'cultuel', location: 'Dakar', year: '2020', image: '/assets/SITE-SAINT-PAUL-1_16.9.jpg', description: 'Architecture religieuse contemporaine.', gallery: ["https://ga2d.com/wp-content/uploads/2020/07/SITE-SAINT-PAUL-1_16.9.jpg","https://ga2d.com/wp-content/uploads/2020/07/SITE-SAINT-PAUL-2_16.9.jpg"], fullDescription: 'Construction d\'une Eglise\n Mission complète de maîtrise d\'œuvre' },
    { id: 5, title: 'Cathédrale de Saint Louis', category: 'cultuel', location: 'Saint - Louis', year: '2020', image: '/assets/CATHEDRALE-DE-SAINT-LOUIS-4.jpg', description: 'Restauration monumentale de la cathédrale.', gallery: [], fullDescription: '' },
    { id: 6, title: 'Eglise de l’Epiphanie', category: 'cultuel', location: 'Nianing', year: '2020', image: '/assets/EGLISE-NIANING-3_16.9-scaled.jpg', description: 'Architecture organique à Nianing.', gallery: [], fullDescription: '' },
    { id: 7, title: 'Maison des esclaves', category: 'culturel', location: 'Gorée', year: '2020', image: '/assets/WhatsApp-Image-2020 -09-03-at-12.15.42.jpg.jpg', description: 'Préservation du patrimoine mondial à Gorée.', gallery: ["https://ga2d.com/wp-content/uploads/2020/07/WhatsApp-Image-2020-09-03-at-12.15.42.jpg.jpg","https://ga2d.com/wp-content/uploads/2020/07/20200107_112420_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/P1050208_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/WhatsApp-Image-2020-09-03-at-12.15.49.jpg"], fullDescription: 'Réhabilitation de la maison des esclaves et de la maison Victoria Albis\n Mission complète de maîtrise d\'œuvre' },
    { id: 8, title: 'Théâtre de verdure', category: 'culturel', location: 'Sénégal', year: '2020', image: '/assets/P1020844_16.9-1-scaled.jpg', description: 'Espace culturel de plein air.', gallery: [], fullDescription: '' },
    { id: 9, title: 'Le Manège', category: 'culturel', location: 'Dakar', year: '2020', image: '/assets/le-manege-03.jpg', description: 'Réhabilitation d\'un espace culturel polyvalent.', gallery: [], fullDescription: '' },
    { id: 10, title: 'Campus Circulaire', category: 'education', location: 'Dakar', year: '2021', image: '/assets/VUE-1-scaled.jpg', description: 'Campus moderne axé sur la durabilité.', gallery: ["https://ga2d.com/wp-content/uploads/2021/04/VUE-1-scaled.jpg","https://ga2d.com/wp-content/uploads/2021/04/VUE-2-scaled.jpg","https://ga2d.com/wp-content/uploads/2021/04/VUE-3-scaled.jpg","https://ga2d.com/wp-content/uploads/2021/04/PLAN-1-scaled.jpg","https://ga2d.com/wp-content/uploads/2021/04/DETAIL-1-scaled.jpg","https://ga2d.com/wp-content/uploads/2021/04/DETAIL-2-scaled.jpg","https://ga2d.com/wp-content/uploads/2021/04/DETAIL-3-scaled.jpg","https://ga2d.com/wp-content/uploads/2021/04/DETAIL-4-scaled.jpg"], fullDescription: 'Conception d\'un centre de référence de haute qualité environnementale dans les métiers du numérique (CRMN)' },
    { id: 11, title: 'Université US3T', category: 'education', location: 'Sénégal', year: '2020', image: '/assets/2_16.9-scaled.jpg', description: 'Infrastructures universitaires technologiques.', gallery: [], fullDescription: '' },
    { id: 12, title: 'Green Agro Business', category: 'industriel', location: 'Sénégal', year: '2020', image: '/assets/Image-02_16.9-scaled.jpg', description: 'Complexes agro- industriels éco - responsables.', gallery: ["https://ga2d.com/wp-content/uploads/2020/07/Image-02_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/Image-09_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/Image-01_16.9-scaled.jpg"], fullDescription: 'Construction d\'une usine de bio fertilisants\n Mission complète de maîtrise d\'œuvre' },
  { id: 13, title: 'Haltes et gares', category: 'infrastructure', location: 'Sénégal', year: '2020', image: '/assets/IMG_6061_16.9-scaled.jpg', description: 'Développement du réseau ferroviaire.', gallery: ["https://ga2d.com/wp-content/uploads/2020/07/IMG_6061_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/IMG_6817_16.9-scaled.jpg"], fullDescription: 'Construction des haltes et gares de la ligne de TER Dakar - Diamniadio\n Mission conception architecturale et VISA architecturaux' },
{
  id: 14, title: 'SMI - SMR', category: 'infrastructure', location: 'Sénégal', year: '2020', image: ' / assets / 1_16.9.jpg', description: 'Infrastructures de maintenance ferroviaire.', gallery: [], fullDescription: '' },
  {
    id: 15, title: 'Gare de Dakar', category: 'infrastructure', location: 'Dakar', year: '2020', image: '/assets/46021825744_7099db0cb3_o_16.9.jpg', description: 'Restauration de la gare centrale.', gallery: ["https://ga2d.com/wp-content/uploads/2020/04/46021825744_7099db0cb3_o_16.9.jpg", "https://ga2d.com/wp-content/uploads/2020/04/20190331_113126_16.9-scaled.jpg", "https://ga2d.com/wp-content/uploads/2020/04/20190331_113217_16.9-scaled.jpg", "https://ga2d.com/wp-content/uploads/2020/04/46746619531_6e4fe32cc6_o_16.9.jpg", "https://ga2d.com/wp-content/uploads/2020/04/P1050225_16.9-scaled.jpg", "https://ga2d.com/wp-content/uploads/2020/04/P1050242_16.9-scaled.jpg", "https://ga2d.com/wp-content/uploads/2020/04/P1050247_16.9-scaled.jpg", "https://ga2d.com/wp-content/uploads/2020/04/P1050251_16.9-scaled.jpg", "https://ga2d.com/wp-content/uploads/2020/04/P1050258_16.9-scaled.jpg", "https://ga2d.com/wp-content/uploads/2020/04/P1050261_16.9-scaled.jpg"], fullDescription: 'Réhabilitation et extension de la gare, \n Mission complète en conception construction' },
    {
      id: 16, title: 'Gare de Rufisque', category: 'infrastructure', location: 'Rufisque', year: '2020', image: '/assets/RUFISQUE-4_16.9-scaled.jpg', description: 'Réhabilitation de la gare de Rufisque.', gallery: ["https://ga2d.com/wp-content/uploads/2020/04/RUFISQUE-4_16.9-scaled.jpg", "https://ga2d.com/wp-content/uploads/2020/04/RUFISQUE-3_16.9-scaled.jpg", "https://ga2d.com/wp-content/uploads/2020/04/RUFISQUE-2_16.9-scaled.jpg", "https://ga2d.com/wp-content/uploads/2020/04/PHOTO-2020-05-28-11-55-23_16.9.jpg"], fullDescription: 'Réhabilitation et extension de la gare, \n Mission complète en conception construction' },
      {
        id: 17, title: 'Maison de l\'Amiral', category: 'logements', location: 'Dakar', year: '2020', image: ' / assets / P1050186_16.9 - scaled.jpg', description: 'Résidence de prestige.', gallery: [], fullDescription: '' },
        { id: 18, title: 'Maison Sh', category: 'logements', location: 'Dakar', year: '2020', image: ' / assets / c_11 - Photo_11 - Photo_16.9.jpg', description: 'Villa contemporaine à Dakar.', gallery: ["https://ga2d.com/wp-content/uploads/2020/07/c_11-Photo_11-Photo_16.9.jpg","https://ga2d.com/wp-content/uploads/2020/07/c_12-Photo_16.9.jpg","https://ga2d.com/wp-content/uploads/2020/07/a_1-Photo.jpg"], fullDescription: 'Construction d\'une maison R+2\n Mission complète de maîtrise d\'œuvre' },
        { id: 19, title: 'Immeuble Sunuker', category: 'logements', location: 'Dakar', year: '2020', image: ' / assets / P1040858_16.9 - scaled.jpg', description: 'Habitat collectif haut de gamme.', gallery: ["https://ga2d.com/wp-content/uploads/2020/07/P1040858_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/P1040861-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/P1040856_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/P1040859_16.9-scaled.jpg"], fullDescription: 'Construction d\'un immeuble d\'habitation R+6\n Mission complète de maîtrise d\'œuvre' },
        { id: 20, title: 'Villa Aq', category: 'logements', location: 'Dakar', year: '2020', image: ' / assets / 2_16.9 - 1 - scaled.jpg', description: 'Architecture résidentielle moderne.', gallery: ["https://ga2d.com/wp-content/uploads/2020/07/2_16.9-1-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/4_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/1_16.9-1-scaled.jpg"], fullDescription: 'Construction d\'une maison individuelle\n Mission complète de maîtrise d\'œuvre' },
        { id: 21, title: 'Immeuble Lz', category: 'logements', location: 'Dakar', year: '2020', image: ' / assets / Protection - palliers - scaled.jpeg', description: 'Projet immobilier à Dakar.', gallery: ["https://ga2d.com/wp-content/uploads/2020/07/Protection-palliers-scaled.jpeg","https://ga2d.com/wp-content/uploads/2020/07/IMG_4533_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/IMG_5238_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/IMG_5239_16.9-scaled.jpg"], fullDescription: 'Construction d\'un immeuble d\'habitation R+5 + sous-sol\n Mission complète de maîtrise d\'œuvre' },
        { id: 22, title: 'Immeuble Al', category: 'logements', location: 'Dakar', year: '2020', image: ' / assets / IMMEUBLE - AL - 1.jpg', description: 'Immeuble résidentiel moderne.', gallery: ["https://ga2d.com/wp-content/uploads/2020/07/IMMEUBLE-AL-1.jpg","https://ga2d.com/wp-content/uploads/2020/07/IMMEUBLE-AL-2.jpg"], fullDescription: 'Construction d\'un immeuble d\'habitation R+2\n Mission complète de maîtrise d\'œuvre' },
        {
          id: 23, title: 'Villa Fs', category: 'logements', location: 'Dakar', year: '2020', image: ' / assets / IMG_0270_16.9 - scaled.jpg', description: 'Résidence privée contemporaine.', gallery: ["https://ga2d.com/wp-content/uploads/2020/07/IMG_0270_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/IMG_0954_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/IMG_0597_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/IMG_0759_16.9-scaled.jpg"], fullDescription: 'Construction d\'une villa en BTC (Briques de Terre Compressée)\n Mission de maîtrise d\'œuvre d\'exécution' },
          { id: 24, title: 'Villa Mm', category: 'logements', location: 'Dakar', year: '2020', image: ' / assets / 67ABCD74 - AC58 - 4C11 - A833 - 8FAB631E24B9_16.9 - scaled.jpg', description: 'Villa d\'architecte.', gallery: ["https://ga2d.com/wp-content/uploads/2020/07/67ABCD74-AC58-4C11-A833-8FAB631E24B9_16.9-scaled.jpg", "https://ga2d.com/wp-content/uploads/2020/07/8FE1058A-41D2-4086-8FFC-B55E01030FFA_16.9-scaled.jpg", "https://ga2d.com/wp-content/uploads/2020/07/IMG_7917-scaled.jpg"], fullDescription: 'Construction d\'une maison individuelle\n Mission complète de maîtrise d\'œuvre' },
          { id: 25, title: 'Villa Rz', category: 'logements', location: 'Dakar', year: '2020', image: ' / assets / P1000153_16.9.jpg', description: 'Projet résidentiel à Dakar.', gallery: ["https://ga2d.com/wp-content/uploads/2020/07/P1000153_16.9.jpg","https://ga2d.com/wp-content/uploads/2020/07/Photo-C_16.9.jpg","https://ga2d.com/wp-content/uploads/2020/07/P1000147_16.9.jpg","https://ga2d.com/wp-content/uploads/2020/07/P1000143_16.9.jpg"], fullDescription: 'Construction d\'une maison individuelle\n Mission complète de maîtrise d\'œuvre' },
          { id: 26, title: 'Maison du port', category: 'logements', location: 'Dakar', year: '2020', image: ' / assets / IMG_0208_16.9 - scaled.jpg', description: 'Habitat urbain innovant.', gallery: ["https://ga2d.com/wp-content/uploads/2020/07/IMG_0208_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/IMG_0648_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/IMG_0209_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/IMG_0634-2-scaled-e1600765074884.jpg"], fullDescription: 'Réhabilitation d\'une maison en maison d\'hôtes\n Mission complète de maîtrise d\'œuvre' },
          { id: 27, title: 'Villa Signare', category: 'logements', location: 'Dakar', year: '2020', image: ' / assets / IMG_0239_16.9 - scaled.jpg', description: 'Réinterprétation de l\'architecture traditionnelle.', gallery: ["https://ga2d.com/wp-content/uploads/2020/07/IMG_0239_16.9-scaled.jpg", "https://ga2d.com/wp-content/uploads/2020/07/20200107_113653_16.9-scaled.jpg", "https://ga2d.com/wp-content/uploads/2020/07/IMG_2264_16.9-scaled.jpg"], fullDescription: 'Réhabilitation d\'une maison\n Mission complète de maîtrise d\'œuvre' },
          { id: 28, title: 'La cour du fleuve', category: 'logements', location: 'Dakar', year: '2020', image: ' / assets / IMG_7714_16.9 - scaled.jpg', description: 'Projet résidentiel paisible.', gallery: ["https://ga2d.com/wp-content/uploads/2020/07/IMG_7714_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/IMG_7690_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/IMG_7715_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/IMG_7720_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/02-la-cour-2_16.9-2.jpg"], fullDescription: 'Réhabilitation d\'un ancien comptoir colonial (patrimoine classé) en maison d\'hôtes\n Mission complète de maîtrise d\'œuvre' },
          { id: 29, title: 'Centre d\'hébergement', category: 'logements', location: 'Dakar', year: '2020', image: ' / assets / CENTRE - D - HEBERGEMENT - 3.jpg', description: 'Infrastructures d\'accueil.', gallery: [], fullDescription: '' },
          { id: 30, title: 'CHOM', category: 'sante', location: 'Dakar', year: '2021', image: ' / assets / VUE - 4 - scaled.jpg', description: 'Infrastructures hospitalières de pointe.', gallery: ["https://ga2d.com/wp-content/uploads/2021/04/VUE-4-scaled.jpg","https://ga2d.com/wp-content/uploads/2021/04/VUE-3-1-scaled.jpg","https://ga2d.com/wp-content/uploads/2021/04/VUE-5-scaled.jpg","https://ga2d.com/wp-content/uploads/2021/04/VUE-1-1-scaled.jpg"], fullDescription: 'Construction d\'une extension du centre hospitalier de l\'ordre de Malte (Kinésithérapie - Radiologie)\n Mission complète de maîtrise d\'œuvre' },
          { id: 31, title: 'Institut Pasteur', category: 'sante', location: 'Dakar', year: '2020', image: '/assets/Image-03_16.9.jpg', description: 'Laboratoires de recherche modernes.', gallery: ["https://ga2d.com/wp-content/uploads/2020/07/Image-03_16.9.jpg", "https://ga2d.com/wp-content/uploads/2020/07/Image-01_16.9-1.jpg"], fullDescription: 'Construction d\'un centre de vaccins\n Mission complète de maîtrise d\'œuvre' },
          { id: 32, title: 'Maison des enfants', category: 'sante', location: 'Dakar', year: '2020', image: ' / assets / MAISON - DES - ENFANTS - 3_16.9.jpg', description: 'Centre de santé pédiatrique.', gallery: ["https://ga2d.com/wp-content/uploads/2020/07/MAISON-DES-ENFANTS-3_16.9.jpg","https://ga2d.com/wp-content/uploads/2020/07/MAISON-DES-ENFANTS-4_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/MAISON-DES-ENFANTS-1_16.9.jpg","https://ga2d.com/wp-content/uploads/2020/07/MAISON-DES-ENFANTS-2_16.9.jpg"], fullDescription: 'Construction d\'un centre d\'accueil de nuit pour les enfants hospitalisés en BTC (Briques de Terre Compressée)\n Mission complète de maîtrise d\'œuvre' },
          { id: 33, title: 'Institut cardio-pédiatrique', category: 'sante', location: 'Dakar', year: '2020', image: '/assets/IMG_1675-2.jpg', description: 'Unité spécialisée en cardiologie pédiatrique.', gallery: [], fullDescription: '' },
          {
            id: 34, title: 'Poste de santé', category: 'sante', location: 'Sénégal', year: '2020', image: ' / assets / DSC02161.jpg', description: 'Infrastructures de santé communautaire.', gallery: [], fullDescription: '' },
            {
              id: 35, title: 'Pavillon Saint-Louis HPD', category: 'sante', location: 'Dakar', year: '2020', image: ' / assets / P2220096_16.9 - scaled.jpg', description: 'Extension hospitalière.', gallery: [], fullDescription: '' },
              {
                id: 36, title: 'Maison de l\'Amiral', category: 'rehabilitation', location: 'Dakar', year: '2020', image: ' / assets / P1050186_16.9 - scaled.jpg', description: 'Résidence de prestige.', gallery: [], fullDescription: '' },
                { id: 37, title: 'Maison des esclaves', category: 'rehabilitation', location: 'Gorée', year: '2020', image: ' / assets / WhatsApp - Image - 2020 -09-03 - at - 12.15.42.jpg.jpg', description: 'Préservation du patrimoine mondial à Gorée.', gallery: ["https://ga2d.com/wp-content/uploads/2020/07/WhatsApp-Image-2020-09-03-at-12.15.42.jpg.jpg","https://ga2d.com/wp-content/uploads/2020/07/20200107_112420_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/P1050208_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/WhatsApp-Image-2020-09-03-at-12.15.49.jpg"], fullDescription: 'Réhabilitation de la maison des esclaves et de la maison Victoria Albis\n Mission complète de maîtrise d\'œuvre' },
                {
                  id: 38, title: 'Cathédrale de Saint Louis', category: 'rehabilitation', location: 'Saint - Louis', year: '2020', image: ' / assets / CATHEDRALE - DE - SAINT - LOUIS - 4.jpg', description: 'Restauration monumentale de la cathédrale.', gallery: [], fullDescription: '' },
                  {
                    id: 39, title: 'Marché Sandaga', category: 'rehabilitation', location: 'Dakar', year: '2020', image: ' / assets / EXTERIEUR_16.9 - scaled.jpg', description: 'Réhabilitation et modernisation du marché historique Sandaga.', gallery: [], fullDescription: '' },
                    { id: 40, title: 'Maison du port', category: 'rehabilitation', location: 'Dakar', year: '2020', image: ' / assets / IMG_0208_16.9 - scaled.jpg', description: 'Habitat urbain innovant.', gallery: ["https://ga2d.com/wp-content/uploads/2020/07/IMG_0208_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/IMG_0648_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/IMG_0209_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/IMG_0634-2-scaled-e1600765074884.jpg"], fullDescription: 'Réhabilitation d\'une maison en maison d\'hôtes\n Mission complète de maîtrise d\'œuvre' },
                    { id: 41, title: 'Villa Signare', category: 'rehabilitation', location: 'Dakar', year: '2020', image: ' / assets / IMG_0239_16.9 - scaled.jpg', description: 'Réinterprétation de l\'architecture traditionnelle.', gallery: ["https://ga2d.com/wp-content/uploads/2020/07/IMG_0239_16.9-scaled.jpg", "https://ga2d.com/wp-content/uploads/2020/07/20200107_113653_16.9-scaled.jpg", "https://ga2d.com/wp-content/uploads/2020/07/IMG_2264_16.9-scaled.jpg"], fullDescription: 'Réhabilitation d\'une maison\n Mission complète de maîtrise d\'œuvre' },
                    { id: 42, title: 'La cour du fleuve', category: 'rehabilitation', location: 'Dakar', year: '2020', image: ' / assets / IMG_7714_16.9 - scaled.jpg', description: 'Projet résidentiel paisible.', gallery: ["https://ga2d.com/wp-content/uploads/2020/07/IMG_7714_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/IMG_7690_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/IMG_7715_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/IMG_7720_16.9-scaled.jpg","https://ga2d.com/wp-content/uploads/2020/07/02-la-cour-2_16.9-2.jpg"], fullDescription: 'Réhabilitation d\'un ancien comptoir colonial (patrimoine classé) en maison d\'hôtes\n Mission complète de maîtrise d\'œuvre' },
                    {
                      id: 43, title: 'Théâtre de verdure', category: 'rehabilitation', location: 'Sénégal', year: '2020', image: ' / assets / P1020844_16.9 - 1 - scaled.jpg', description: 'Espace culturel de plein air.', gallery: [], fullDescription: '' },
                      { id: 44, title: 'Le Manège', category: 'rehabilitation', location: 'Dakar', year: '2020', image: ' / assets / le - manege-03.jpg', description: 'Réhabilitation d\'un espace culturel polyvalent.', gallery: [], fullDescription: '' },
                      {
                        id: 45, title: 'Pavillon Saint-Louis HPD', category: 'rehabilitation', location: 'Dakar', year: '2020', image: ' / assets / P2220096_16.9 - scaled.jpg', description: 'Extension hospitalière.', gallery: [], fullDescription: '' },
                        { id: 46, title: 'Institut cardio-pédiatrique', category: 'tertiaire', location: 'Dakar', year: '2020', image: '/assets/IMG_1675-2.jpg', description: 'Unité spécialisée en cardiologie pédiatrique.', gallery: [], fullDescription: '' },
                        {
                          id: 47, title: 'Poste de santé', category: 'tertiaire', location: 'Sénégal', year: '2020', image: ' / assets / DSC02161.jpg', description: 'Infrastructures de santé communautaire.', gallery: [], fullDescription: '' },
                          { id: 48, title: 'Campus Circulaire', category: 'tertiaire', location: 'Dakar', year: '2021', image: '/assets/VUE-1-scaled.jpg', description: 'Campus moderne axé sur la durabilité.', gallery: ["https://ga2d.com/wp-content/uploads/2021/04/VUE-1-scaled.jpg", "https://ga2d.com/wp-content/uploads/2021/04/VUE-2-scaled.jpg", "https://ga2d.com/wp-content/uploads/2021/04/VUE-3-scaled.jpg", "https://ga2d.com/wp-content/uploads/2021/04/PLAN-1-scaled.jpg", "https://ga2d.com/wp-content/uploads/2021/04/DETAIL-1-scaled.jpg", "https://ga2d.com/wp-content/uploads/2021/04/DETAIL-2-scaled.jpg", "https://ga2d.com/wp-content/uploads/2021/04/DETAIL-3-scaled.jpg", "https://ga2d.com/wp-content/uploads/2021/04/DETAIL-4-scaled.jpg"], fullDescription: 'Conception d\'un centre de référence de haute qualité environnementale dans les métiers du numérique (CRMN)' },
                          { id: 49, title: 'Immeuble Sunuker', category: 'tertiaire', location: 'Dakar', year: '2020', image: '/assets/P1040858_16.9-scaled.jpg', description: 'Habitat collectif haut de gamme.', gallery: ["https://ga2d.com/wp-content/uploads/2020/07/P1040858_16.9-scaled.jpg", "https://ga2d.com/wp-content/uploads/2020/07/P1040861-scaled.jpg", "https://ga2d.com/wp-content/uploads/2020/07/P1040856_16.9-scaled.jpg", "https://ga2d.com/wp-content/uploads/2020/07/P1040859_16.9-scaled.jpg"], fullDescription: 'Construction d\'un immeuble d\'habitation R+6\n Mission complète de maîtrise d\'œuvre' },
  ];

                          const filteredProjects = filter === 'tous'
                            ? projects
                            : projects.filter(p => p.category === filter);

                          return (
                            <section id="projets" className="py-20 lg:py-32 bg-gray-50">
                              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                                {/* Header */}
                                <motion.div
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  className="text-center max-w-3xl mx-auto mb-12"
                                >
                                  <span className="text-gray-500 text-sm font-semibold uppercase tracking-widest">Portfolio</span>
                                  <h2 className="text-4xl lg:text-5xl font-bold text-black font-['Montserrat'] mt-4 mb-6">
                                    Nos Réalisations
                                  </h2>
                                  <div className="w-16 h-1 bg-black mx-auto mb-6" />
                                </motion.div>

                                {/* Filters */}
                                <div className="flex flex-wrap justify-center gap-3 mb-12">
                                  {categories.map((cat) => (
                                    <button
                                      key={cat.id}
                                      onClick={() => setFilter(cat.id)}
                                      className={cn(
                                        "px-6 py-2 text-sm font-medium transition-all duration-300 border",
                                        filter === cat.id
                                          ? "bg-black text-white border-black"
                                          : "bg-white text-gray-600 border-gray-300 hover:border-black hover:text-black"
                                      )}
                                    >
                                      {cat.label}
                                    </button>
                                  ))}
                                </div>

                                {/* Projects Grid */}
                                <motion.div
                                  layout
                                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                                >
                                  <AnimatePresence>
                                    {filteredProjects.map((project) => (
                                      <motion.div
                                        key={project.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        className="group cursor-pointer relative overflow-hidden bg-white"
                                        onClick={() => setSelectedProject(project)}
                                      >
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                          <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                          />
                                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-end p-6 opacity-0 group-hover:opacity-100">
                                            <div className="text-white">
                                              <p className="text-sm text-white/80 uppercase tracking-wider mb-2">
                                                {categories.find(c => c.id === project.category)?.label}
                                              </p>
                                              <h3 className="text-xl font-bold font-['Montserrat']">{project.title}</h3>
                                              <p className="text-white/80 text-sm mt-1">{project.location}, {project.year}</p>
                                            </div>
                                          </div>
                                        </div>
                                      </motion.div>
                                    ))}
                                  </AnimatePresence>
                                </motion.div>

                                {/* Project Modal */}
                                <AnimatePresence>
                                  {selectedProject && (
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                                      onClick={() => {
                                        setSelectedProject(null);
                                        setModalImageIndex(0);
                                      }}
                                    >
                                      <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                        className="bg-white max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        {/* Header/Close Button */}
                                        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md p-4 flex justify-between items-center border-b">
                                          <h3 className="text-xl font-bold font-['Montserrat'] truncate">{selectedProject.title}</h3>
                                          <button
                                            onClick={() => {
                                              setSelectedProject(null);
                                              setModalImageIndex(0);
                                            }}
                                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                          >
                                            <X size={24} />
                                          </button>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2">
                                          {/* Gallery Section */}
                                          <div className="relative aspect-video lg:aspect-square bg-gray-100">
                                            <AnimatePresence mode="wait">
                                              <motion.img
                                                key={modalImageIndex}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                src={selectedProject.gallery?.[modalImageIndex] || selectedProject.image}
                                                alt={selectedProject.title}
                                                className="w-full h-full object-cover"
                                              />
                                            </AnimatePresence>

                                            {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                                              <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
                                                {selectedProject.gallery.map((_, idx) => (
                                                  <button
                                                    key={idx}
                                                    onClick={() => setModalImageIndex(idx)}
                                                    className={cn(
                                                      "w-2 h-2 rounded-full transition-all",
                                                      modalImageIndex === idx ? "bg-white w-6" : "bg-white/50"
                                                    )}
                                                  />
                                                ))}
                                              </div>
                                            )}

                                            {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                                              <>
                                                <button
                                                  onClick={() => setModalImageIndex(prev => (prev - 1 + selectedProject.gallery!.length) % selectedProject.gallery!.length)}
                                                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all"
                                                >
                                                  <ChevronLeft size={24} />
                                                </button>
                                                <button
                                                  onClick={() => setModalImageIndex(next => (next + 1) % selectedProject.gallery!.length)}
                                                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all"
                                                >
                                                  <ChevronRight size={24} />
                                                </button>
                                              </>
                                            )}
                                          </div>

                                          {/* Info Section */}
                                          <div className="p-8 lg:p-12 overflow-y-auto">
                                            <div className="mb-8">
                                              <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
                                                {categories.find(c => c.id === selectedProject.category)?.label}
                                              </p>
                                              <h2 className="text-3xl font-bold font-['Montserrat'] mb-4">
                                                {selectedProject.title}
                                              </h2>
                                              <div className="flex flex-wrap gap-4 text-gray-600">
                                                <div className="flex items-center gap-2">
                                                  <MapPin size={18} />
                                                  <span>{selectedProject.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                  <Calendar size={18} />
                                                  <span>{selectedProject.year}</span>
                                                </div>
                                              </div>
                                            </div>

                                            <div className="space-y-6 text-gray-700 leading-relaxed">
                                              <p className="text-lg font-medium text-black">
                                                {selectedProject.description}
                                              </p>
                                              {selectedProject.fullDescription && (
                                                <div className="prose prose-gray">
                                                  {selectedProject.fullDescription.split('\n').map((para, i) => (
                                                    para.trim() && <p key={i}>{para}</p>
                                                  ))}
                                                </div>
                                              )}
                                            </div>

                                            
                                          </div>
                                        </div>
                                      </motion.div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </section>
                          );
                        };

                        // Team Section
                        const TeamSection = () => {
                          const team: TeamMember[] = [
                            {
                              id: 1,
                              name: "Andrée Diop Depret",
                              role: "Architecte DPLG",
                              bio: "Fondatrice associée",
                              image: "/assets/ANDREE.jpg"
                            },
                            {
                              id: 2,
                              name: "Eric Mulot",
                              role: "Architecte DPLG",
                              bio: "Associé Gérant",
                              image: "/assets/ERIC-4.jpg"
                            },
                            {
                              id: 3,
                              name: "Nelson Nkonmeneck",
                              role: "Architecte",
                              bio: "Chef de projet",
                              image: "/assets/NELSON-1-e1694188624211.png"
                            },
                            {
                              id: 4,
                              name: "Maïlys Tham",
                              role: "Architecte",
                              bio: "Chef de projet",
                              image: "/assets/MAILYS-scaled-e1694188173921.jpg"
                            },
                            {
                              id: 5,
                              name: "Ulrich B. Tchouante K.",
                              role: "Architecte Urbaniste DEIAU",
                              bio: "Chef de projet",
                              image: "/assets/ULRICH.jpg"
                            },
                            {
                              id: 6,
                              name: "François Gomis",
                              role: "Suivi de chantier",
                              bio: "",
                              image: "/assets/FRANCOIS-1.jpg"
                            },
                          ];

                          const supportTeam = [
                            { name: "Simon Manga", role: "Dessinateur" },
                            { name: "Madeleine Cisse", role: "Dessinatrice" },
                            { name: "Dahirou Kane", role: "Dessinateur" },
                            { name: "Mafal Sarr", role: "Dessinateur" },
                            { name: "Alpha Ba", role: "Intendant" },
                            { name: "Djibril Drame", role: "Coursier" },
                          ];

                          const formerMembers = [
                            "Ahmed Berthomé", "Ana Enguita Hernandez", "Antoine Lesueur",
                            "Antoinette Philippa Assogba-Kouissou", "Carola Luna", "Caroline Geffriaud",
                            "Daouda Sissoko", "Elena Re", "Enrique Garzon", "Essomanda Frédérick Aguim Ali",
                            "Florent Ebion", "Joël Stéphane Guemo Ghogue", "Lamine Ndao", "Lamine Ndiaye",
                            "Laura Campeny", "Magane", "Mame Bineta Ba", "Mamour Touré", "Moustapha Niang",
                            "Ndiaok Diouf", "Ousseynou Coundoul", "Mbaye Gadiaga", "Moctar Ba", "Mbargou Niang",
                            "Sokhna Fall", "Astou Ndiaye", "Djiby Sy", "Maty Sankare", "Oulia Ndiaye",
                            "Alassane Thillo", "Jean Paul Sagna", "Pierre Gomis", "Idrissa Sow"
                          ];

                          return (
                            <section id="equipe" className="py-20 lg:py-32 bg-white">
                              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                                {/* Header */}
                                <motion.div
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  className="text-center max-w-3xl mx-auto mb-16"
                                >
                                  <span className="text-gray-500 text-sm font-semibold uppercase tracking-widest">Notre Équipe</span>
                                  <h2 className="text-4xl lg:text-5xl font-bold text-black font-['Montserrat'] mt-4 mb-6">
                                    Les Architectes de GA2D
                                  </h2>
                                  <div className="w-16 h-1 bg-black mx-auto mb-6" />
                                  <p className="text-gray-600 text-lg">
                                    Une équipe pluridisciplinaire passionnée par l'architecture et engagée
                                    pour l'excellence de chaque projet.
                                  </p>
                                </motion.div>

                                {/* Founders & Architects Grid */}
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                                  {team.map((member, index) => (
                                    <motion.div
                                      key={member.id}
                                      initial={{ opacity: 0, y: 30 }}
                                      whileInView={{ opacity: 1, y: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ delay: index * 0.1 }}
                                      className="text-center"
                                    >
                                      <div className="relative overflow-hidden mb-6 mx-auto w-48 h-48 rounded-full">
                                        <img
                                          src={member.image}
                                          alt={member.name}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <h3 className="text-xl font-bold text-black font-['Montserrat'] mb-1">
                                        {member.name}
                                      </h3>
                                      <p className="text-gray-900 font-medium text-sm mb-1">{member.role}</p>
                                      <p className="text-gray-500 text-sm">{member.bio}</p>
                                    </motion.div>
                                  ))}
                                </div>

                                {/* Support Team */}
                                <div className="bg-gray-50 p-8 lg:p-12 mb-16">
                                  <h3 className="text-2xl font-bold text-black font-['Montserrat'] mb-8 text-center">
                                    Équipe de support
                                  </h3>
                                  <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
                                    {supportTeam.map((member, index) => (
                                      <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                      >
                                        <p className="font-semibold text-black">{member.name}</p>
                                        <p className="text-gray-500 text-sm">{member.role}</p>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>

                                {/* Former Members */}
                                <div className="text-center">
                                  <h3 className="text-xl font-bold text-black font-['Montserrat'] mb-6">
                                    Sont passés par GA2D depuis 1996
                                  </h3>
                                  <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-gray-600 text-sm">
                                    {formerMembers.map((name, index) => (
                                      <span key={index}>{name}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </section>
                          );
                        };

                        // Contact Section
                        const ContactSection = () => {
                          const [formData, setFormData] = useState({
                            name: '',
                            email: '',
                            phone: '',
                            subject: '',
                            message: ''
                          });

                          const handleSubmit = (e: React.FormEvent) => {
                            e.preventDefault();
                            alert('Merci pour votre message ! Nous vous contacterons dans les plus brefs délais.');
                            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                          };

                          return (
                            <section id="contact" className="py-20 lg:py-32 bg-gray-50">
                              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                                {/* Header */}
                                <motion.div
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  className="text-center max-w-3xl mx-auto mb-16"
                                >
                                  <span className="text-gray-500 text-sm font-semibold uppercase tracking-widest">Contact</span>
                                  <h2 className="text-4xl lg:text-5xl font-bold text-black font-['Montserrat'] mt-4 mb-6">
                                    Parlons de Votre Projet
                                  </h2>
                                  <div className="w-16 h-1 bg-black mx-auto mb-6" />
                                  <p className="text-gray-600 text-lg">
                                    Que vous ayez un projet de construction, de réhabilitation ou simplement une question,
                                    notre équipe est à votre écoute.
                                  </p>
                                </motion.div>

                                <div className="grid lg:grid-cols-2 gap-12">
                                  {/* Contact Form */}
                                  <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white p-8 lg:p-12"
                                  >
                                    <h3 className="text-2xl font-bold text-black font-['Montserrat'] mb-6">
                                      Envoyez-nous un message
                                    </h3>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                      <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                          <label className="block text-sm font-medium text-black mb-2">Nom complet *</label>
                                          <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none transition-colors"
                                            placeholder="Votre nom"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-black mb-2">Email *</label>
                                          <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none transition-colors"
                                            placeholder="votre@email.com"
                                          />
                                        </div>
                                      </div>
                                      <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                          <label className="block text-sm font-medium text-black mb-2">Téléphone</label>
                                          <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none transition-colors"
                                            placeholder="+221 XX XXX XX XX"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-black mb-2">Sujet *</label>
                                          <select
                                            required
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none transition-colors bg-white"
                                          >
                                            <option value="">Sélectionnez un sujet</option>
                                            <option value="projet">Nouveau projet</option>
                                            <option value="rehabilitation">Réhabilitation</option>
                                            <option value="collaboration">Collaboration</option>
                                            <option value="devis">Demande de devis</option>
                                            <option value="autre">Autre</option>
                                          </select>
                                        </div>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-black mb-2">Message *</label>
                                        <textarea
                                          required
                                          rows={5}
                                          value={formData.message}
                                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                          className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none transition-colors resize-none"
                                          placeholder="Décrivez votre projet..."
                                        />
                                      </div>
                                      <button type="submit" className="w-full bg-black text-white py-4 font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                        Envoyer le message
                                        <ArrowRight size={18} />
                                      </button>
                                    </form>
                                  </motion.div>

                                  {/* Contact Info */}
                                  <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="space-y-8"
                                  >
                                    {/* Appointment CTA */}
                                    <div className="bg-black p-8 text-white">
                                      <h3 className="text-2xl font-bold font-['Montserrat'] mb-4">
                                        Prendre Rendez-vous
                                      </h3>
                                      <p className="text-white/80 mb-6">
                                        Réservez directement un créneau dans notre agenda pour discuter de votre projet
                                        avec l'un de nos architectes.
                                      </p>
                                      <a
                                        href="https://calendly.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 font-medium hover:bg-gray-100 transition-colors"
                                      >
                                        <Calendar size={18} />
                                        Réserver un rendez-vous
                                        <ExternalLink size={14} />
                                      </a>
                                    </div>

                                    {/* Office Info */}
                                    <div className="bg-white p-8">
                                      <h4 className="text-xl font-bold text-black font-['Montserrat'] mb-6 flex items-center gap-2">
                                        <MapPin size={20} />
                                        Nos Coordonnées
                                      </h4>
                                      <div className="space-y-4 text-gray-600">
                                        <div>
                                          <p className="font-semibold text-black mb-1">GA2D Architecture</p>
                                          <p>Point E rue PE08</p>
                                          <p>BP 25658 Dakar Fann</p>
                                          <p>Sénégal</p>
                                        </div>
                                        <div className="pt-4 border-t">
                                          <p className="flex items-center gap-2">
                                            <Phone size={16} />
                                            <a href="tel:+221338258950" className="hover:text-black transition-colors">
                                              (+221) 33 825 89 50
                                            </a>
                                          </p>
                                        </div>
                                        <div>
                                          <p className="flex items-center gap-2">
                                            <Mail size={16} />
                                            <a href="mailto:contact@ga2d.com" className="hover:text-black transition-colors">
                                              contact@ga2d.com
                                            </a>
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Map placeholder */}
                                    <div className="bg-gray-200 h-64 relative overflow-hidden">
                                      <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15438.307!2d-17.47!3d14.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec1725b8b98b58f%3A0x8670c5f4909a1ac6!2sPoint%20E%2C%20Dakar%2C%20S%C3%A9n%C3%A9gal!5e0!3m2!1sfr!2ssn!4v1700000000000!5m2!1sfr!2ssn"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen={true}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="absolute inset-0"
                                      />
                                    </div>
                                  </motion.div>
                                </div>
                              </div>
                            </section>
                          );
                        };

                        // Testimonials Section
                        const TestimonialsSection = () => {
                          const testimonials = [
                            {
                              quote: "GA2D a su transformer notre vision en une réalité architecturale exceptionnelle. Leur expertise en réhabilitation patrimoniale est remarquable.",
                              author: "Mamadou Sow",
                            },
                            {
                              quote: "Une collaboration fructueuse qui a permis de préserver l'âme de notre bâtiment historique tout en l'adaptant aux besoins modernes.",
                              author: "Aminata Dieng",
                            },
                            {
                              quote: "Professionalisme, créativité et respect des délais. GA2D est un partenaire architectural de confiance pour tous nos projets.",
                              author: "Jean-Pierre Martin",
                            }
                          ];

                          return (
                            <section className="py-20 lg:py-32 bg-black">
                              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                                <motion.div
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  className="text-center max-w-3xl mx-auto mb-16"
                                >
                                  <span className="text-gray-400 text-sm font-semibold uppercase tracking-widest">Témoignages</span>
                                  <h2 className="text-4xl lg:text-5xl font-bold text-white font-['Montserrat'] mt-4 mb-6">
                                    Ce Que Disent Nos Clients
                                  </h2>
                                  <div className="w-16 h-1 bg-white mx-auto" />
                                </motion.div>

                                <div className="grid md:grid-cols-3 gap-8">
                                  {testimonials.map((testimonial, index) => (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, y: 30 }}
                                      whileInView={{ opacity: 1, y: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ delay: index * 0.1 }}
                                      className="bg-white/10 backdrop-blur-sm p-8 relative"
                                    >
                                      <Quote size={40} className="text-white mb-6 opacity-30" />
                                      <p className="text-white/90 text-lg leading-relaxed mb-6 italic">
                                        "{testimonial.quote}"
                                      </p>
                                      <div>
                                        <p className="text-white font-semibold font-['Montserrat']">{testimonial.author}</p>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </section>
                          );
                        };

                        // Footer
                        const Footer = () => {
                          const currentYear = new Date().getFullYear();

                          const scrollToSection = (id: string) => {
                            const element = document.getElementById(id);
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          };

                          return (
                            <footer className="bg-black text-white pt-20 pb-8">
                              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                                  {/* Brand */}
                                  <div>
                                    <Logo variant="light" className="mb-6" />
                                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                                      Cabinet d'architecture sénégalais fondé en 1996, spécialisé dans la réhabilitation
                                      de monuments historiques et l'architecture durable.
                                    </p>
                                    <div className="flex gap-4">
                                      {['LinkedIn', 'Facebook'].map((social) => (
                                        <a
                                          key={social}
                                          href="#"
                                          className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                                        >
                                          <span className="text-xs font-bold">{social[0]}</span>
                                        </a>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Quick Links */}
                                  <div>
                                    <h4 className="text-lg font-bold font-['Montserrat'] mb-6">Navigation</h4>
                                    <ul className="space-y-3">
                                      {[
                                        { label: 'Accueil', id: 'accueil' },
                                        { label: 'L\'Agence', id: 'agence' },
                                        { label: 'Projets', id: 'projets' },
                                        { label: 'Équipe', id: 'equipe' },
                                        { label: 'Contact', id: 'contact' },
                                      ].map((link) => (
                                        <li key={link.id}>
                                          <button
                                            onClick={() => scrollToSection(link.id)}
                                            className="text-white/70 hover:text-white transition-colors text-sm"
                                          >
                                            {link.label}
                                          </button>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Services */}
                                  <div>
                                    <h4 className="text-lg font-bold font-['Montserrat'] mb-6">Nos Services</h4>
                                    <ul className="space-y-3">
                                      {[
                                        'Architecture de patrimoine',
                                        'Réhabilitation',
                                        'Architecture durable',
                                        'Conception commerciale',
                                        'Projets institutionnels',
                                        'Suivi de chantier'
                                      ].map((service) => (
                                        <li key={service}>
                                          <span className="text-white/70 text-sm">{service}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Contact */}
                                  <div>
                                    <h4 className="text-lg font-bold font-['Montserrat'] mb-6">Contact</h4>
                                    <ul className="space-y-3 text-white/70 text-sm">
                                      <li>Point E rue PE08</li>
                                      <li>BP 25658 Dakar Fann</li>
                                      <li>Sénégal</li>
                                      <li className="pt-2">
                                        <a href="tel:+221338258950" className="hover:text-white transition-colors">
                                          (+221) 33 825 89 50
                                        </a>
                                      </li>
                                      <li>
                                        <a href="mailto:contact@ga2d.com" className="hover:text-white transition-colors">
                                          contact@ga2d.com
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>

                                {/* Bottom */}
                                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                                  <p className="text-white/50 text-sm">
                                    © {currentYear} GA2D Architecture. Tous droits réservés.
                                  </p>
                                  <div className="flex gap-6 text-sm">
                                    <a href="#" className="text-white/50 hover:text-white transition-colors">Mentions légales</a>
                                    <a href="#" className="text-white/50 hover:text-white transition-colors">Politique de confidentialité</a>
                                  </div>
                                </div>
                              </div>
                            </footer>
                          );
                        };

                        // Main App Component
                        export function App() {
                          return (
                            <div className="min-h-screen bg-white">
                              <Navigation />
                              <HeroSection />
                              <StatsSection />
                              <AgencySection />
                              <ProjectsSection />
                              <TeamSection />
                              <TestimonialsSection />
                              <ContactSection />
                              <Footer />
                            </div>
                          );
                        }
