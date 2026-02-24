import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ArrowRight, Calendar, MapPin,
  Phone, Mail, Users, Building2, Leaf, Globe, Award,
  Quote, ChevronDown, ExternalLink, ChevronLeft, ChevronRight, Facebook
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
  subtitle?: string;
  entreprise?: string;
  maitrise_oeuvre?: string;
  surface?: string;
  livraison?: string;
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
      image: '/assets/46021825744_7099db0cb3_o_16.9.jpg',
      title: "Réhabilitation de la Gare de Dakar",
      subtitle: "Patrimoine historique - Dakar"
    },
    {
      image: '/assets/VUE-1-scaled.jpg',
      title: "Architecture Durable & Innovante",
      subtitle: "Engagés pour l'avenir du Sénégal"
    },
    {
      image: '/assets/MAISON-GA2D_16.9-2-scaled.jpg',
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
    {
      "id": 1,
      "title": "Campus Circulaire Citadin",
      "category": "education",
      "location": "Diamniadio",
      "year": "2021",
      "image": "/assets/VUE-1-scaled.jpg",
      "description": "Le projet de CRMN n’est pas un bâtiment. Il est le support étudié pour un programme d’appui et d’apprentissage de technologies de pointe destiné à for...",
      "gallery": [
        "/assets/VUE-1-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2021/04/VUE-2-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2021/04/VUE-3-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2021/04/PLAN-1-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2021/04/DETAIL-1-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2021/04/DETAIL-2-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2021/04/DETAIL-3-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2021/04/DETAIL-4-scaled.jpg"
      ],
      "fullDescription": "Le projet de CRMN n’est pas un bâtiment. Il est le support étudié pour un programme d’appui et d’apprentissage de technologies de pointe destiné à former et aider les futurs talents et entreprises qui marqueront le paysage technologique et économique du Sénégal. C’est pourquoi le CRMN a été pensé comme une expérience sociale et spatiale avant tout.\n\nPar son implantation le CRMN se définit comme un outil de la ville de demain. Il offre des espaces publics riches et variés en s’inscrivant dans les parcours citadins du quotidien entre parc et centre-ville. Le CRMN ne s’oppose pas au quartier tout au contraire il s’expose. Il s’ouvre largement sur le quartier. Il se veut vitrine de l’apprentissage des technologies de pointe ainsi que de la construction bioclimatique à l’aide de la ressource terre.\n\nLe CRMN n’exclut personne, mais s’intègre et se fond dans le quartier. Les habitants y sont invités afin d’y profiter de conférences ainsi que du restaurant et des structures récréatives. Ils pourront en même temps y partager des expériences spatiales riches et être sensibilisés aux technologies du futur ainsi qu’au bioclimatisme.\n\nLe CRMN est une structure d’accueil, de partage du savoir et d’expériences. Sa flexibilité spatiale se reflète dans les modes d’usage où travail et détente se mélangent en favorisant l’échange, la créativité et la productivité. L’extrême flexibilité dont il est doté en fait l’outil parfait pour servir les besoins actuels et muter vers les exigences futures.",
      "subtitle": "Conception d'un centre de référence de haute qualité environnementale dans les métiers du numérique (CRMN)",
      "entreprise": "",
      "maitrise_oeuvre": "Etat du Sénégal, Ministère de l'Emploi, de la Formation Professionnelle et de l'Artisanat \n\nLuxembourg Aid & Development",
      "surface": "4000 m²",
      "livraison": "Concours rendu en 2021 (2ème place)"
    },
    {
      "id": 2,
      "title": "Cathédrale de Saint Louis",
      "category": "cultuel",
      "location": "Saint Louis",
      "year": "2020",
      "image": "/assets/CATHEDRALE-DE-SAINT-LOUIS-4.jpg",
      "description": "Classée au Patrimoine mondial de l'UNESCO, la cathédrale de Saint Louis, première église catholique edifiée en Afrique de l'ouest en 1827, présentait ...",
      "gallery": [
        "/assets/CATHEDRALE-DE-SAINT-LOUIS-4.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/IMG_4305_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/CATHEDRALE-DE-SAINT-LOUIS-2.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/FSSZ9180_16.9.jpg"
      ],
      "fullDescription": "Classée au Patrimoine mondial de l'UNESCO, la cathédrale de Saint Louis, première église catholique edifiée en Afrique de l'ouest en 1827, présentait de nombreuses dégradations qui nécessitaient en urgence diverses interventions pour sauvegarder l'édifice et éviter tous risques de dangerosité pour les fidèles et visiteurs. Les travaux ont consisté en la consolidation de la structure, le traitement des remontées d'humidité, la réparation des zones dégradées, la réhabilitation de tous les vitraux, le remplacement des sols, le remplacement ou la création de menuiseries bois, le traitement des façades et toitures.",
      "subtitle": "Réhabilitation de la cathédrale\n\nMission complète de maîtrise d'œuvre intégrée à l'entreprise Eiffage",
      "entreprise": "Eiffage Sénégal\n\nMichel Bellanger (expert conseil en patrimoine )",
      "maitrise_oeuvre": "Etat du Sénégal - Ministère de la culture \n\nAPIX (Maîtrise d'ouvrage déléguée)\n\nSuzanne Hirschi (architecte conseil de l'APIX, experte en patrimoine)",
      "surface": "900 m²",
      "livraison": "2020"
    },
    {
      "id": 3,
      "title": "Centre d'hébergement",
      "category": "rehabilitation",
      "location": "Ile de Gorée",
      "year": "2013",
      "image": "/assets/CENTRE-D-HEBERGEMENT-3.jpg",
      "description": "Le projet se place dans un programme de réhabilitation de bâtiments classés dans l’île de Gorée. Cette réhabilitation a pour but aussi de mettre en pl...",
      "gallery": [
        "/assets/CENTRE-D-HEBERGEMENT-3.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/CENTRE-D-HEBERGEMENT-2.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/20140103_131539_16.9.jpg"
      ],
      "fullDescription": "Le projet se place dans un programme de réhabilitation de bâtiments classés dans l’île de Gorée. Cette réhabilitation a pour but aussi de mettre en place des équipements nécessaires à l’amélioration de la vie des habitants de l’île. La création d’un centre d’hébergement entre dans ce programme.",
      "subtitle": "Réhabilitation d'un centre d'hébergement \n\nMission complète de maîtrise d'œuvre",
      "entreprise": "SCI SARL",
      "maitrise_oeuvre": "Mairie de Dakar - AGETIP (Agence d'Exécution des Travaux d'Intérêt Public  contre le sous-emploi)",
      "surface": "615 m²",
      "livraison": "2013"
    },
    {
      "id": 4,
      "title": "CHOM",
      "category": "sante",
      "location": "Dakar",
      "year": "2020",
      "image": "/assets/VUE-4-scaled.jpg",
      "description": "Situé au sein du centre national universitaire de Fann, un établissement hospitalier public, le projet consiste en l'extension du Centre Hospitalier d...",
      "gallery": [
        "/assets/VUE-4-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2021/04/VUE-3-1-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2021/04/VUE-5-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2021/04/VUE-1-1-scaled.jpg"
      ],
      "fullDescription": "Situé au sein du centre national universitaire de Fann, un établissement hospitalier public, le projet consiste en l'extension du Centre Hospitalier de l'Ordre de Malte existant en vue d'accueillir de nouvelles activités, à savoir la kinésithérapie et la radiologie. Le bâtiment se caractérise par une galerie qui permet de circuler entre les différentes activités, cette galerie ombragée permet de reduire concretement la surchauffe du bâtiment.",
      "subtitle": "Construction d'une extension du centre hospitalier de l'ordre de Malte (Kinésithérapie - Radiologie)\n\nMission complète de maîtrise d'œuvre",
      "entreprise": "Eiffage, Geotec, Veritas, END, COTOA, IA-Afrique, Akacia",
      "maitrise_oeuvre": "CHOM",
      "surface": "500 m²",
      "livraison": "2020"
    },
    {
      "id": 5,
      "title": "Concessionnaires CFAO",
      "category": "commercial",
      "location": "Dakar",
      "year": "2013",
      "image": "/assets/IMG_0624-Copie_16.9-scaled.jpg",
      "description": "En 2007, GA2D collabore avec CFAO Sénégal en participant comme maitre d'œuvre d'opération, à son projet de concession neuve Toyota Yamaha (site 02), c...",
      "gallery": [
        "/assets/IMG_0624-Copie_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/CFAO-Sénégal-05_16.9-2.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/CFAO-Sénégal-02_16.9-2.jpg"
      ],
      "fullDescription": "En 2007, GA2D collabore avec CFAO Sénégal en participant comme maitre d'œuvre d'opération, à son projet de concession neuve Toyota Yamaha (site 02), comprenant showroom et ateliers. Puis, en 2012, GA2D réitère sa participation au projet de concession Peugeot Suzuki. Depuis, GA2D a accompagné CFAO dans divers projets d'aménagement pour CFAO Truck en 2015 et CFAO Equipement en 2016.",
      "subtitle": "Constructions de concessions automobiles et motos pour le distributeur CFAO\n\nPeugeot Suzuki pour site 01 et Toyota Yamaha sur site 02\n\nMission de maîtrise d'œuvre d'opération",
      "entreprise": "Site 02: GE, CMA, CSC, LeFroid, Sodacom, C&P, SB, Dumas  \n\nSite 01: BTP B., EGB B., SNTS, Sodacom, FB, DKR E.",
      "maitrise_oeuvre": "CFAO Sénégal",
      "surface": "1400 (01)\n\n6500 (02) m²",
      "livraison": "2013 (01)\n\n2010 (02)"
    },
    {
      "id": 6,
      "title": "Eglise de l’Epiphanie",
      "category": "cultuel",
      "location": "Nianing",
      "year": "2018",
      "image": "/assets/EGLISE-NIANING-3_16.9-scaled.jpg",
      "description": "L’église de Nianing se démarque de son environnement bâti par sa forme sculpturale étonnante qui rappelle celle d’un coquillage. Son volume se décompo...",
      "gallery": [
        "/assets/EGLISE-NIANING-3_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/EGLISE-NIANING-4-1-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/EGLISE-NIANING-2-1-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/EGLISE-NIANING-5_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/EGLISE-NIANING-1_16.9-scaled.jpg"
      ],
      "fullDescription": "L’église de Nianing se démarque de son environnement bâti par sa forme sculpturale étonnante qui rappelle celle d’un coquillage. Son volume se décompose en sept voûtes avec un clocher qui culmine à 45 mètres et qui joue le rôle, à la fois de signal, et de cheminée de ventilation. L’intérieur laissé en béton brut de décoffrage se veut sobre et minimaliste.",
      "subtitle": "Construction d'une Eglise\n\nMission de suivi de l’exécution du chantier",
      "entreprise": "Eiffage Sénégal",
      "maitrise_oeuvre": "Privé",
      "surface": "455 m²",
      "livraison": "2018"
    },
    {
      "id": 7,
      "title": "Eglise Saint Paul",
      "category": "cultuel",
      "location": "Dakar",
      "year": "2020",
      "image": "/assets/SITE-SAINT-PAUL-1_16.9.jpg",
      "description": "La future église Saint Paul s’organise sur trois niveaux dont un niveau de sous-sol accueillant le parking. Sa forme en coquillage et son large parvis...",
      "gallery": [
        "/assets/SITE-SAINT-PAUL-1_16.9.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/SITE-SAINT-PAUL-2_16.9.jpg"
      ],
      "fullDescription": "La future église Saint Paul s’organise sur trois niveaux dont un niveau de sous-sol accueillant le parking. Sa forme en coquillage et son large parvis dégagé ouvrent l’accès à un grand nombre de fidèles. Au total, l’église pourra accueillir 5000 personnes assises réparties entre espaces extérieurs et intérieurs.",
      "subtitle": "Construction d'une Eglise\n\nMission complète de maîtrise d'œuvre",
      "entreprise": "Socetra",
      "maitrise_oeuvre": "Archidiocèse de Dakar",
      "surface": "13600 m²",
      "livraison": "Travaux en cours"
    },
    {
      "id": 8,
      "title": "Gare de Dakar",
      "category": "infrastructure",
      "location": "Dakar",
      "year": "2019",
      "image": "/assets/46021825744_7099db0cb3_o_16.9.jpg",
      "description": "Dans le cadre de la création de la nouvelle ligne de TER entre Dakar et Diamniadio, GA2D a été choisi pour mener la réhabilitation de la gare de Dakar...",
      "gallery": [
        "/assets/46021825744_7099db0cb3_o_16.9.jpg",
        "https://ga2d.com/wp-content/uploads/2020/04/20190331_113126_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/04/20190331_113217_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/04/46746619531_6e4fe32cc6_o_16.9.jpg",
        "https://ga2d.com/wp-content/uploads/2020/04/P1050225_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/04/P1050242_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/04/P1050247_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/04/P1050251_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/04/P1050258_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/04/P1050261_16.9-scaled.jpg"
      ],
      "fullDescription": "Dans le cadre de la création de la nouvelle ligne de TER entre Dakar et Diamniadio, GA2D a été choisi pour mener la réhabilitation de la gare de Dakar, monument historique datant de 1914. Le projet consiste en la stabilisation et la modernisation du bâtiment existant, la création d’un bâtiment neuf et la restructuration des espaces extérieurs environnants. La gare en question se situe au Nord de la place du Tirailleur, elle est dotée d’un plan en U avec un volume central sur toute la hauteur qui relie les deux ailes, plus hautes et divisées en trois niveaux. L’extension, à l’architecture contemporaine, se situe en continuité de la gare historique. Elle crée le lien entre le bâtiment historique et l’accès aux trains.",
      "subtitle": "Réhabilitation et extension de la gare, \n\nMission complète en conception construction",
      "entreprise": "Eiffage Sénégal",
      "maitrise_oeuvre": "Etat du Sénégal – APIX",
      "surface": "2500 m²",
      "livraison": "2019"
    },
    {
      "id": 9,
      "title": "Gare de Rufisque",
      "category": "infrastructure",
      "location": "Rufisque",
      "year": "2019",
      "image": "/assets/RUFISQUE-4_16.9-scaled.jpg",
      "description": "Dans le cadre de la création de la nouvelle ligne de TER entre Dakar et Diamniadio, GA2D a été choisi pour mener la réhabilitation de la gare de Rufis...",
      "gallery": [
        "/assets/RUFISQUE-4_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/04/RUFISQUE-3_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/04/RUFISQUE-2_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/04/PHOTO-2020-05-28-11-55-23_16.9.jpg"
      ],
      "fullDescription": "Dans le cadre de la création de la nouvelle ligne de TER entre Dakar et Diamniadio, GA2D a été choisi pour mener la réhabilitation de la gare de Rufisque, monument historique datant de la fin du XIXème siècle. Le projet consiste en la stabilisation et la modernisation du bâtiment existant, la création d’un bâtiment neuf et la restructuration des espaces extérieurs environnants. Le bâtiment existant est composé d’un corps principal rectangulaire en maçonnerie sur 2 niveaux et est situé le long des voies existantes, en retrait par rapport à la rue qui le dessert. Ce bâtiment est entouré d’une coursive qui assure la distribution des différents espaces au rdc et r+1. Le bâtiment neuf est, quant à lui, construit sur un seul niveau. Il prolonge le bâtiment existant côté Est, tout en en étant, physiquement, clairement détaché. Par l’utilisation du même vocabulaire architectural (trame, dessin des ouvertures, toiture débordante), il dialogue avec son voisin tout en marquant puissamment son esthétique contemporaine.",
      "subtitle": "Réhabilitation et extension de la gare, \n\nMission complète en conception construction",
      "entreprise": "Eiffage Sénégal",
      "maitrise_oeuvre": "Etat du Sénégal – APIX",
      "surface": "600 m²",
      "livraison": "2019"
    },
    {
      "id": 10,
      "title": "Green Agro Business",
      "category": "industriel",
      "location": "Diamniadio",
      "year": "2022",
      "image": "/assets/Image-02_16.9-scaled.jpg",
      "description": "Le projet consiste en la construction d’une usine de biofertilisants sur une parcelle d’environ 69 000 m² dans la région de Thies. Le site a été aména...",
      "gallery": [
        "/assets/Image-02_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/Image-09_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/Image-01_16.9-scaled.jpg"
      ],
      "fullDescription": "Le projet consiste en la construction d’une usine de biofertilisants sur une parcelle d’environ 69 000 m² dans la région de Thies. Le site a été aménagé de manière à organiser de façon optimale les rapports entre les différentes fonctions de l’usine tout en s’intégrant au mieux dans son environnement climatique et paysager. La gestion des flux, des nuisances et des échanges ont été les points focal du traitement architectural. Une ceinture verte, composée de grands arbres aux racines profondes, a été aménagée sur le site pour faire barrage aux vents de sable et au soleil.",
      "subtitle": "Construction d'une usine de bio fertilisants\n\nMission complète de maîtrise d'œuvre",
      "entreprise": "EGB Badarrachi, LES, LeFroid, Sodeci",
      "maitrise_oeuvre": "Green Agro Business",
      "surface": "44000 m²",
      "livraison": "Travaux en cours - livraison prévue 2022"
    },
    {
      "id": 11,
      "title": "Haltes et gares",
      "category": "infrastructure",
      "location": "Sur toute le ligne de TER de Dakar à Bargny",
      "year": "2020",
      "image": "/assets/IMG_6061_16.9-scaled.jpg",
      "description": "La présente opération s’inscrit dans le cadre de la réalisation de la nouvelle ligne de TER DAKAR-AIBD, initiée par le Ministère des Infrastructures, ...",
      "gallery": [
        "/assets/IMG_6061_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/IMG_6817_16.9-scaled.jpg"
      ],
      "fullDescription": "La présente opération s’inscrit dans le cadre de la réalisation de la nouvelle ligne de TER DAKAR-AIBD, initiée par le Ministère des Infrastructures, des Transports Terrestres et du Désenclavement dont la maîtrise d'ouvrage déléguée est assurée par l'APIX. Ce grand projet d’infrastructure comprend 14 arrêts regroupés selon trois typologies qui correspondent à leurs tailles et aux services qui leurs sont associées. Ces trois typologies sont la halte, la gare moyenne et la gare multimodale. L’architecture des haltes et gares répond aux enjeux suivants: accueillir les programmes liés à la ligne de TER, assurer un confort thermique optimal aux utilisateurs, exploiter et réguler les apports solaires et utiliser une écriture architecturale sobre et homogène.\n\nPour répondre à ces objectifs, plusieurs typologies de haltes ont été conçues. Les bâtiments sont composés de deux parois séparées par une lame d’air ventilée, la paroi extérieure est en BTC (Brique de Terre Compressée) et la paroi intérieure est en parpaing de ciment. Chaque bâtiment est constitué d’un volume, abrité du soleil et des intempéries par une toiture-parapluie à la structure autonome. Ce principe de dissociation entre bâti et couverture autorise une toiture ample, à large débords, s’adaptant aux différentes typologies de halte, protégeant de manière optimale le bâti maçonné et prodiguant ombre et fraicheurs au public. Cette dissociation se traduit par une surélévation de la toiture par rapport au bâtiment. Cela permet une bonne ventilation de cet entre-deux et participe au confort thermique des usagers. L’architecture des bâtiments tend à profiter au maximum de la lumière naturelle tout en se protégeant des rayons solaires directs.",
      "subtitle": "Construction des haltes et gares de la ligne de TER Dakar - Diamniadio\n\nMission conception architecturale et VISA architecturaux",
      "entreprise": "Getran (gares)\n\nSertem (hates)",
      "maitrise_oeuvre": "Etat du Sénégal – APIX",
      "surface": "Entre 60 et 200 m² pour les haltes et entre 1000 et 1200 m² pour les gares. \n\nTotal haltes et gares : 3600 m²",
      "livraison": "Travaux en cours - livraison prévue 2020"
    },
    {
      "id": 12,
      "title": "Immeuble Al",
      "category": "logements",
      "location": "Dakar",
      "year": "2017",
      "image": "/assets/IMMEUBLE-AL-1.jpg",
      "description": "Située sur un terrain traversant entre deux rues calmes du quartier de Ouakam, la résidence est implantée à l'alignement d'un immeuble R+2 d'un côté e...",
      "gallery": [
        "/assets/IMMEUBLE-AL-1.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/IMMEUBLE-AL-2.jpg"
      ],
      "fullDescription": "Située sur un terrain traversant entre deux rues calmes du quartier de Ouakam, la résidence est implantée à l'alignement d'un immeuble R+2 d'un côté et d'un R+3 de l'autre, créant une cour et un jardin intérieur. Une voie traversante permet d'accéder, d'un coté à un parking privé et de l'autre à un escalier et à un ascenseur au milieu d'un jardin distribuant les coursives d'accès aux sept appartements. La toiture terrasse est accessible à tous les occupants de la résidence.",
      "subtitle": "Construction d'un immeuble d'habitation R+2\n\nMission complète de maîtrise d'œuvre",
      "entreprise": "Afeco, CFAO Technologie",
      "maitrise_oeuvre": "Privé",
      "surface": "2000 m²",
      "livraison": "2017"
    },
    {
      "id": 13,
      "title": "Immeuble Lz",
      "category": "logements",
      "location": "Dakar",
      "year": "2017",
      "image": "/assets/Protection-palliers-scaled.jpeg",
      "description": "Situé dans le quartier des Almadies, la résidence comporte 5 niveaux sur un sous sol. Elle organise trois appartements F4 autour d'une platforme génér...",
      "gallery": [
        "/assets/Protection-palliers-scaled.jpeg",
        "https://ga2d.com/wp-content/uploads/2020/07/IMG_4533_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/IMG_5238_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/IMG_5239_16.9-scaled.jpg"
      ],
      "fullDescription": "Situé dans le quartier des Almadies, la résidence comporte 5 niveaux sur un sous sol. Elle organise trois appartements F4 autour d'une platforme généreuse et ouverte sur l'extérieur offrant un espace de convivialité et distribuant les circulations verticales. Les espaces communs sont situés en RDC (locaux vélos, poubelles, entretien et vestiaires pour le personnel) et en toiture terrasse avec des boxes étendoirs. Chaque appartement possède une cave privée et une ou deux places de parking. la résidence offre 14 appartements dont certains possèdent un espace privé extérieur",
      "subtitle": "Construction d'un immeuble d'habitation R+5 + sous-sol\n\nMission complète de maîtrise d'œuvre",
      "entreprise": "SCI SUARL",
      "maitrise_oeuvre": "Privé",
      "surface": "4500 m² dont 1000 m² de sous sol m²",
      "livraison": "2017"
    },
    {
      "id": 14,
      "title": "Immeuble Sunuker",
      "category": "logements",
      "location": "Dakar",
      "year": "2020",
      "image": "/assets/P1040858_16.9-scaled.jpg",
      "description": "L’immeuble, destiné à un usage mixte, comprend un parking en sous-sol, un hall, des bureaux et locaux commerciaux en rez-de-chaussée et des appartemen...",
      "gallery": [
        "/assets/P1040858_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/P1040861-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/P1040856_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/P1040859_16.9-scaled.jpg"
      ],
      "fullDescription": "L’immeuble, destiné à un usage mixte, comprend un parking en sous-sol, un hall, des bureaux et locaux commerciaux en rez-de-chaussée et des appartements F2, F3 et F4 sur cinq niveaux. Chaque appartement possède un espace extérieur sous forme de balcon ou de loggia. En toiture une grande terrasse accessible à tous est aménagée.",
      "subtitle": "Construction d'un immeuble d'habitation R+6\n\nMission complète de maîtrise d'œuvre",
      "entreprise": "Sertem",
      "maitrise_oeuvre": "Privé",
      "surface": "2700 m²",
      "livraison": "2020"
    },
    {
      "id": 15,
      "title": "Institut cardio-pédiatrique",
      "category": "sante",
      "location": "Dakar",
      "year": "2016",
      "image": "/assets/IMG_1675-2.jpg",
      "description": "Grace à la persévérance de La Chaîne de l'Espoir, le premier centre cardio-pédiatrique d'Afrique de l'ouest a pu voir le jour au centre hospitalier de...",
      "gallery": [
        "/assets/IMG_1675-2.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/IMG_3270_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/IMG_3269_16.9-scaled.jpg"
      ],
      "fullDescription": "Grace à la persévérance de La Chaîne de l'Espoir, le premier centre cardio-pédiatrique d'Afrique de l'ouest a pu voir le jour au centre hospitalier de Fann. Ce centre, construit sur un seul niveau, est juxtaposé au centre de cardiologie de l'hôpital de Fann. Ses différents services de consultation, administration, plateau technique et hospitalisation, s'organisent autour d'un patio central végétalisé. Il permet de dissocier les circulations, faire pénétrer la lumière et la ventilation naturelle. Le plateau technique, composé de deux blocs opératoires et de 10 lits de réanimation, offre une capacité opérationnelle évitant désormais l'organisation de rapatriement d’enfants pour des opérations en Europe.",
      "subtitle": "Construction d'un institut cardio-pédiatrique\n\nMission complète de maîtrise d'œuvre",
      "entreprise": "Eiffage Sénégal",
      "maitrise_oeuvre": "CHNU - La Chaîne de l'Espoir",
      "surface": "4200 m²",
      "livraison": "2016"
    },
    {
      "id": 16,
      "title": "Institut Pasteur",
      "category": "sante",
      "location": "Diamniadio",
      "year": "2022",
      "image": "/assets/Image-03_16.9.jpg",
      "description": "Dans le cadre de l’aménagement du Nouveau Pôle urbain de Diamniadio, l’Institut Pasteur de Dakar aménage une unité de production de vaccin de la fièvr...",
      "gallery": [
        "/assets/Image-03_16.9.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/Image-01_16.9-1.jpg"
      ],
      "fullDescription": "Dans le cadre de l’aménagement du Nouveau Pôle urbain de Diamniadio, l’Institut Pasteur de Dakar aménage une unité de production de vaccin de la fièvre jaune, sur un terrain d'une superficie d’environ 18000 m². L'ensemble du projet a été traité en fonction des vents dominants et de l’ensoleillement. Pour limiter l’échauffement des locaux, les bâtiments du site comportent une double paroi ventilée des murs exposés à l’ensoleillement. Cette ventilation rafraîchit la paroi intérieure et évite une accumulation et une compression de l’air chaud entre les murs. La protection des châssis vitrés par des brise-soleil en aluminium thermo laqué complètent le système de d’isolation thermique des murs et volumes intérieurs.",
      "subtitle": "Construction d'un centre de vaccins\n\nMission complète de maîtrise d'œuvre",
      "entreprise": "",
      "maitrise_oeuvre": "Institut Pasteur Dakar",
      "surface": "18000 m²",
      "livraison": "Travaux en cours - livraison prévue 2022"
    },
    {
      "id": 17,
      "title": "La cour du fleuve",
      "category": "rehabilitation",
      "location": "Podor",
      "year": "2010",
      "image": "/assets/IMG_7714_16.9-scaled.jpg",
      "description": "La cour du fleuve est un ancien comptoir colonial datant de la fin du XIXème siècle et situé en bordure du fleuve Sénégal. Né d'un coup de cœur collec...",
      "gallery": [
        "/assets/IMG_7714_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/IMG_7690_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/IMG_7715_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/IMG_7720_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/02-la-cour-2_16.9-2.jpg"
      ],
      "fullDescription": "La cour du fleuve est un ancien comptoir colonial datant de la fin du XIXème siècle et situé en bordure du fleuve Sénégal. Né d'un coup de cœur collectif, ce projet de réhabilitation a consisté à transformer le bâtiment en maison d'hôtes comprenant 7 chambres et une suite et offrant des espaces et terrasses généreuses. Le bâti s'oranise autour d'une cour centrale offrant un havre de paix et de fraicheur sous la végétation. Tous les enduits intérieurs et extérieurs ont été refait à la chaux, permettant aux murs composés de briques ou ou de terre de respirer. Les sols ont été habillés de carreaux de ciment teintés à la manière traditionnelle.",
      "subtitle": "Réhabilitation d'un ancien comptoir colonial (patrimoine classé) en maison d'hôtes\n\nMission complète de maîtrise d'œuvre",
      "entreprise": "ETPB",
      "maitrise_oeuvre": "Privé",
      "surface": "650 m²",
      "livraison": "2010"
    },
    {
      "id": 18,
      "title": "Le Manège",
      "category": "culturel",
      "location": "Dakar",
      "year": "2005",
      "image": "/assets/le-manege-03.jpg",
      "description": "Anciennes écuries de l’armée française pendant la période coloniale, cet édifice arrive là à son ultime mutation. Par ce projet, il s’agit de donner à...",
      "gallery": [
        "/assets/le-manege-03.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/le-manege-02.jpg"
      ],
      "fullDescription": "Anciennes écuries de l’armée française pendant la période coloniale, cet édifice arrive là à son ultime mutation. Par ce projet, il s’agit de donner à ce bâtiment sans nom un acte de naissance officiel : Le Manège. Patrimoine, Renouveau, Mémoire, tels sont les mots qui caractérisent les enjeux de la transformation de ce bâtiment en une salle d’exposition.\n\nLa première phase du projet consiste en la restauration et le réaménagement du bâtiment historique pour créer de nouveaux espaces équipés des moyens techniques nécessaires au fonctionnement d’une salle d’exposition. Une nouvelle trame structurelle en poteaux métalliques vient soutenir la charpente historique et désolidariser les murs périphériques fragilisés. Cette nouvelle structure plus flexible permet de diversifier les moyens d’exposition. Cet espace offre alors une capacité de mutation et de perfectionnement indiscutable qui lui permettra certainement d’évoluer continuellement. La deuxième phase du projet repose sur l’intégration de la cour comme espace d’exposition pour former un ensemble uni, cohérent et fonctionnel composant une vision globale. Le Manège devient alors un espace culturel aux multiples facettes.",
      "subtitle": "Réhabilitation d'un ancien bâtiment de l'ambassade de France en salle d'exposition pour l'Institut Français\n\nMission complète de maîtrise d'œuvre",
      "entreprise": "EGB Badarrachi\n\nSénégal bois",
      "maitrise_oeuvre": "Service de coopération et d'action culturelle de l'ambassade de France à Dakar",
      "surface": "400 m²",
      "livraison": "2005"
    },
    {
      "id": 19,
      "title": "Maison des enfants",
      "category": "sante",
      "location": "Dakar",
      "year": "2017",
      "image": "/assets/MAISON-DES-ENFANTS-3_16.9.jpg",
      "description": "La maison des enfants est située dans l’enceinte du CHNU Fann Dakar, un établissement hospitalier public. Elle est construite à proximité du nouveau s...",
      "gallery": [
        "/assets/MAISON-DES-ENFANTS-3_16.9.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/MAISON-DES-ENFANTS-4_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/MAISON-DES-ENFANTS-1_16.9.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/MAISON-DES-ENFANTS-2_16.9.jpg"
      ],
      "fullDescription": "La maison des enfants est située dans l’enceinte du CHNU Fann Dakar, un établissement hospitalier public. Elle est construite à proximité du nouveau service de cardio-pédiatrie afin de faciliter les allers-retours des patients entre la structure sanitaire et leur lieu d’hébergement. Elle peut accueillir dix-huit enfants et leurs accompagnants dans cinq chambres partagées, disposées autour d’un patio central végétalisé. L’équipement propose également des espaces collectifs : cuisine, réfectoire et salle d’éveil dédiée aux activités pédagogiques. Aujourd’hui, la maison des enfants participe, à son échelle, à faire connaître l’utilisation de la construction en terre dans les cadres institutionnels.",
      "subtitle": "Construction d'un centre d'accueil de nuit pour les enfants hospitalisés en BTC (Briques de Terre Compressée)\n\nMission complète de maîtrise d'œuvre",
      "entreprise": "Eiffage Sénégal\n\nElémenterre (BTC)",
      "maitrise_oeuvre": "CHNU - La Chaîne de l'Espoir",
      "surface": "635 m²",
      "livraison": "2017"
    },
    {
      "id": 20,
      "title": "Maison des esclaves",
      "category": "culturel",
      "location": "Ile de Gorée",
      "year": "2020",
      "image": "/assets/WhatsApp-Image-2020-09-03-at-12.15.42.jpg.jpg",
      "description": "Le projet est situé sur l’île de Gorée au large de Dakar, que M. Amadou-Mahtar M'BOW, lorsqu’il était Directeur Général de l'Unesco décrivait ainsi : ...",
      "gallery": [
        "/assets/WhatsApp-Image-2020-09-03-at-12.15.42.jpg.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/20200107_112420_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/P1050208_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/WhatsApp-Image-2020-09-03-at-12.15.49.jpg"
      ],
      "fullDescription": "Le projet est situé sur l’île de Gorée au large de Dakar, que M. Amadou-Mahtar M'BOW, lorsqu’il était Directeur Général de l'Unesco décrivait ainsi : « Gorée a préservé une cohérence architecturale qui réunit les apports culturels les plus dissemblables (nordiques et méditerranéens, islamiques et chrétiens) pour les fondre dans une unité dictée à la fois par l'exiguïté de l'espace, l'exposition aux vents du grand large et l'homogénéité du matériau de construction ». L’île est d’ailleurs inscrite sur la liste du Patrimoine Mondial de l’UNESCO depuis 1978. La Coalition Internationale des Sites de Conscience s’est engagée à soutenir l’effort de conservation et de valorisation de ce patrimoine exceptionnel que représentent la Maison des Esclaves et la Maison Victoria Albis. Les deux sites se font face d’un côté et de l’autre de la rue St Germain, ils seront réunis par un programme commun: la création d’un Centre International d’Interprétation et de Documentation de l’esclavage et des traites négrières. Vérandas, balcons en bois et colonnades, constituent dans leur ensemble un monument, soit comme symboles de la traite des esclaves, soit pour la richesse des couleurs et des styles. GA2D s’est investi pleinement dans ce projet en assurant le respect scrupuleux des règlements édictés pour la sauvegarde de l’île et de son architecture et en mettant en œuvre des solutions adaptées aux pathologies locales (humidité, etc…).",
      "subtitle": "Réhabilitation de la maison des esclaves et de la maison Victoria Albis\n\nMission complète de maîtrise d'œuvre",
      "entreprise": "SCI SARL",
      "maitrise_oeuvre": "Etat du Sénégal - Direction du patrimoine culturel",
      "surface": "1300 m²",
      "livraison": "Travaux en cours - livraison prévue 2020"
    },
    {
      "id": 21,
      "title": "Maison de l'Amiral",
      "category": "rehabilitation",
      "location": "Ile de Gorée",
      "year": "2022",
      "image": "/assets/P1050186_16.9-scaled.jpg",
      "description": "Le Musée des civilisations noires a entrepris en 2020 de sauver l’ancienne maison de l’amiral de Gorée en la réhabilitant pour la transformer en resta...",
      "gallery": [
        "/assets/P1050186_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/09/P1050115_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/09/P1050182_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/09/VUE-5_16.9.jpg",
        "https://ga2d.com/wp-content/uploads/2020/09/VUE-4_16.9.jpg",
        "https://ga2d.com/wp-content/uploads/2020/09/COUR_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/09/VUE-3_16.9-scaled.jpg"
      ],
      "fullDescription": "Le Musée des civilisations noires a entrepris en 2020 de sauver l’ancienne maison de l’amiral de Gorée en la réhabilitant pour la transformer en restaurant, lieu de séminaire et résidence d’artistes. Sa situation exceptionnelle et sa grande terrasse sur la mer en font un lieu ouvert propice aux échanges. Sa cour intérieure fraîche et ombragée offre une intimité précieuse à quelques minutes de la capitale.",
      "subtitle": "Réhabilitation de la maison de l'Amiral en restaurant, lieu de séminaire et résidence d'artistes \n\nMission complète de maîtrise d'œuvre",
      "entreprise": "",
      "maitrise_oeuvre": "Musée des Civilisations Noires",
      "surface": "600 m²",
      "livraison": "Etudes en cours - livraison prévue 2022"
    },
    {
      "id": 22,
      "title": "Maison du port",
      "category": "rehabilitation",
      "location": "Ile de Gorée",
      "year": "2013",
      "image": "/assets/IMG_0208_16.9-scaled.jpg",
      "description": "La maison donnant sur la place du port de Gorée, remaniée au fil du temps, avait la particularité de posséder un grand vide en son centre, surchargé p...",
      "gallery": [
        "/assets/IMG_0208_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/IMG_0648_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/IMG_0209_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/IMG_0634-2-scaled-e1600765074884.jpg"
      ],
      "fullDescription": "La maison donnant sur la place du port de Gorée, remaniée au fil du temps, avait la particularité de posséder un grand vide en son centre, surchargé par différents volumes ajoutés. Ce dernier a été dégagé et mis en valeur par le déploiement d'escaliers et coursives en bois, distribuants des demi-niveaux. L'ensemble des enduits intérieurs ont été refait à la chaux mélangée à du sable blanc. Les sols du RDC sont en pierre et ceux des niveau supérieurs en bois. La réorganisation des espaces a permis d'ouvrir le séjour sur le jardin arrière, réaménagé pour l'occasion par des paysagistes (Indice D).",
      "subtitle": "Réhabilitation d'une maison en maison d'hôtes\n\nMission complète de maîtrise d'œuvre",
      "entreprise": "OKMAT, CSC, Sénégal Bois, APGEEL, EGEFSP, Pape Sow",
      "maitrise_oeuvre": "Privé",
      "surface": "320 m²",
      "livraison": "2013"
    },
    {
      "id": 23,
      "title": "Maison Sh",
      "category": "logements",
      "location": "Dakar",
      "year": "2020",
      "image": "/assets/c_11-Photo_11-Photo_16.9.jpg",
      "description": "La maison accueille deux unités d’habitation : un duplex en RDC et R+1 et un appartement indépendant au R+2. Le volume du garage au RDC qui s’avance s...",
      "gallery": [
        "/assets/c_11-Photo_11-Photo_16.9.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/c_12-Photo_16.9.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/a_1-Photo.jpg"
      ],
      "fullDescription": "La maison accueille deux unités d’habitation : un duplex en RDC et R+1 et un appartement indépendant au R+2. Le volume du garage au RDC qui s’avance sur la rue sépare clairement les deux entrées et préserve l’indépendance des familles. Un jeu de claustra en façade protège les espaces intérieurs des rayons chauds du soleil et limite les vues directes pour garantir l’intimité des habitants.",
      "subtitle": "Construction d'une maison R+2\n\nMission complète de maîtrise d'œuvre",
      "entreprise": "3C",
      "maitrise_oeuvre": "Privé",
      "surface": "450 m²",
      "livraison": "Travaux en cours - livraison prévue 2020"
    },
    {
      "id": 24,
      "title": "Marché Sandaga",
      "category": "rehabilitation",
      "location": "Dakar",
      "year": "2018",
      "image": "/assets/EXTERIEUR_16.9-scaled.jpg",
      "description": "Patrimoine historique de la ville de Dakar, cet édifice, inauguré en 1933 a subi les affres du temps. Conçu en béton armé et ravagé par un incendie en...",
      "gallery": [
        "/assets/EXTERIEUR_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/INTERIEUR_16.9-scaled.jpg"
      ],
      "fullDescription": "Patrimoine historique de la ville de Dakar, cet édifice, inauguré en 1933 a subi les affres du temps. Conçu en béton armé et ravagé par un incendie en 2013, sa structure est aujourd’hui très fragilisée et menace de s’effondrer. Il est donc urgent de penser un programme de réhabilitation complet de ce bâtiment inscrit au registre des monuments historiques du Sénégal. L’objectif du projet est de réactiver le marché et la parcelle Sandaga. Pour cela, le bâtiment historique sera réhabilité et retrouvera sa fonction initiale de « marché frais ». Le programme est issu de problématiques clés, essentielles à la constitution d’un projet à même de faire revivre pertinemment et dans la durée le marché Sandaga. En plus de la réhabilitation lourde du marché, le projet prévoit la construction d’un nouveau bâtiment à l’extrémité de la parcelle. Cette construction neuve permet de proposer d’avantage de surface commerciale tout en ancrant le monument existant dans l’époque actuelle par l’instauration d’un dialogue entre l’ancien et le nouveau. Le parvis qui relie les deux bâtiments est complètement requalifié et dégagé pour redonner l’espace aux piétons.",
      "subtitle": "Réhabilitation et extension du marché Sandaga\n\nConcours d'idée",
      "entreprise": "Eiffage Sénégal",
      "maitrise_oeuvre": "",
      "surface": "12553 m²",
      "livraison": "2018 (esquisse)"
    },
    {
      "id": 25,
      "title": "Pavillon Saint-Louis HPD",
      "category": "rehabilitation",
      "location": "Dakar",
      "year": "2011",
      "image": "/assets/P2220096_16.9-scaled.jpg",
      "description": "L’Hôpital Principal de Dakar est situé sur la corniche Est de la Presqu'île du Cap-vert ; ses premiers bâtiments ont été inaugurés en 1884. Le bâtimen...",
      "gallery": [
        "/assets/P2220096_16.9-scaled.jpg"
      ],
      "fullDescription": "L’Hôpital Principal de Dakar est situé sur la corniche Est de la Presqu'île du Cap-vert ; ses premiers bâtiments ont été inaugurés en 1884. Le bâtiment à étages appelé Pavillon Saint Louis qui surplombe la baie de l’Anse Bernard, a été construit en 1922. Par cette situation exceptionnelle au sein de l'Hôpital Principal, il constitue un des fleurons du patrimoine architectural classé du Sénégal. La Direction de l'Hôpital avait engagé depuis 2003 un vaste programme de mise à niveau des infrastructures de L’Hôpital Principal de Dakar. C'est dans ce cadre qu'elle a envisagé une réhabilitation du bâtiment de la maternité \"Pavillon Saint Louis\" Elle a ainsi mandaté GA2D pour effectuer sur la base de plans remis et des visites du site, un diagnostic de l'état des lieux ; définir les travaux de réhabilitation à réaliser dans un esprit de modernisation et de pérennité du Pavillon St Louis de la Maternité ; estimer le programme de réhabilitation, en tenant compte des nouvelles orientations à prendre dans les aménagements des espaces médicaux.",
      "subtitle": "Réhabilitation de la maternité pavillon Saint-Louis de l'Hôpital principal\n\nMission complète de maîtrise d'œuvre",
      "entreprise": "Eiffage Sénégal",
      "maitrise_oeuvre": "Hôpital Principal de Dakar",
      "surface": "2000 m²",
      "livraison": "2011"
    },
    {
      "id": 26,
      "title": "Poste de santé",
      "category": "rehabilitation",
      "location": "Ile de Gorée",
      "year": "2005",
      "image": "/assets/DSC02161.jpg",
      "description": "Le projet se place dans un programme de réhabilitation de bâtiments classés dans l’île de Gorée. Cette réhabilitation a pour but aussi de mettre en pl...",
      "gallery": [
        "/assets/DSC02161.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/ps-goree-01_16.9-2.jpg"
      ],
      "fullDescription": "Le projet se place dans un programme de réhabilitation de bâtiments classés dans l’île de Gorée. Cette réhabilitation a pour but aussi de mettre en place des équipements nécessaires à l’amélioration de la vie des habitants de l’île. La création d’un poste de santé entre dans ce programme. Le poste de santé est aménagé dans une maison R+1 située à l’angle de la rue Saint Germain et de la rue Boufflers, sur une parcelle de 293 m². La maison d’un étage, avec coursive traditionnelle intérieure, donne sur une cour autour de laquelle sont disposés quelques abris. L’ensemble était dans un état de dégradation avancé et a nécessité une réhabilitation rapide afin de préserver la construction.",
      "subtitle": "Réhabilitation d'une maison en poste de santé\n\nMission complète de maîtrise d'œuvre",
      "entreprise": "Soeco",
      "maitrise_oeuvre": "ADM - AGETIP (Agence d'Exécution des Travaux d'Intérêt Public  contre le sous-emploi)",
      "surface": "235 m²",
      "livraison": "2005"
    },
    {
      "id": 27,
      "title": "SMI - SMR",
      "category": "infrastructure",
      "location": "Dakar, Rufisque",
      "year": "2020",
      "image": "/assets/1_16.9.jpg",
      "description": "La présente opération s’inscrit dans le cadre de la réalisation de la nouvelle ligne de TER DAKAR-AIBD, initiée par le Ministère des Infrastructures, ...",
      "gallery": [
        "/assets/1_16.9.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/IMG_9418_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/IMG_9368_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/IMG_9414_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/IMG_9382_16.9-scaled.jpg"
      ],
      "fullDescription": "La présente opération s’inscrit dans le cadre de la réalisation de la nouvelle ligne de TER DAKAR-AIBD, initiée par le Ministère des Infrastructures, des Transports Terrestres et du Désenclavement dont la maitrise d'ouvrage déléguée est assurée par l'APIX. Elle consiste en la construction des sites de maintenance de la ligne et des 22 automotrices.\n\nLe SMR rassemble tous les programmes techniques, administratifs et de management nécessaires pour la mise en service, la gestion et l’exploitation du matériel roulant de la ligne. Le site regroupe donc les bâtiments suivants : atelier de maintenance, poste de commande, stockage, nettoyage, tour en fosse.\n\nLe SMI rassemble des bureaux, des bâtiments de stockage et de garage organisés en L autour d'une fosse permettant le garage de cinq trains lors de leur manutention\n\nL’ensemble des projets est composé d’une structure en double paroi de parpaings de ciment. Le vide entre les deux est ventilé pour éviter l’accumulation et la compression de l’air chaud et garder la paroi intérieure la plus fraiche possible. La réduction de la consommation de l’air conditionné dans les locaux de travail, se traduit aussi sur les façades exposées au soleil, par des percements qui améliorent la qualité de la lumière pénétrante, donc qui éclairent les espaces sans laisser passer les rayons solaires chauffant à l’intérieur des locaux.",
      "subtitle": "Construction du Site de Maintenance des Infrastructures (SMI) et du Site de Maintenance et de Remisage du Matériel Roulant (SMR)\n\nMission de maîtrise d'œuvre d'exécution",
      "entreprise": "Yapi Merkezi",
      "maitrise_oeuvre": "Etat du Sénégal – APIX",
      "surface": "21700 m²",
      "livraison": "Travaux en cours - livraison prévue 2020"
    },
    {
      "id": 28,
      "title": "Supermarchés et hypermarchés Auchan",
      "category": "commercial",
      "location": "Dakar et Mbour",
      "year": "2020",
      "image": "/assets/Image-11-scaled.jpg",
      "description": "Depuis son implantation au Sénégal en 2014, GA2D accompagne ATAC devenu AUCHAN, dans certains de ses projets de supermarchés et hypermarchés: Mairie (...",
      "gallery": [
        "/assets/Image-11-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/AUCHAN-MBOUR-01_16.9.png",
        "https://ga2d.com/wp-content/uploads/2020/07/AUCHAN-MBOUR-02_16.9.png",
        "https://ga2d.com/wp-content/uploads/2023/09/Image-09-scaled.jpg"
      ],
      "fullDescription": "Depuis son implantation au Sénégal en 2014, GA2D accompagne ATAC devenu AUCHAN, dans certains de ses projets de supermarchés et hypermarchés: Mairie (2015), Gibraltar (2016), Mbour (2017), Sacré Cœur (2018), Yoff (2019), Mermoz (2020). Les surfaces varient entre 700 m² (Mairie) et 6800m² (Mermoz)",
      "subtitle": "Construction de supermarchés et hypermarchés pour la marque Auchan\n\nMission complète de maîtrise d'œuvre",
      "entreprise": "Selon projets: Batix, LeFroid, EGB Badaracchi",
      "maitrise_oeuvre": "SENAS SA",
      "surface": "6800 (Dakar Mermoz)\n\n4000 (Mbour) m²",
      "livraison": "2020 (Dakar Mermoz)\n\n2018 (Mbour)"
    },
    {
      "id": 29,
      "title": "Théâtre de verdure",
      "category": "culturel",
      "location": "Ile de Gorée",
      "year": "2005",
      "image": "/assets/P1020844_16.9-1-scaled.jpg",
      "description": "Le projet se place dans un programme de réhabilitation de bâtiments classés dans l’île de Gorée. Cette réhabilitation a pour but aussi de mettre en pl...",
      "gallery": [
        "/assets/P1020844_16.9-1-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/Centre-socio-culturel-04_16.9-2.jpg"
      ],
      "fullDescription": "Le projet se place dans un programme de réhabilitation de bâtiments classés dans l’île de Gorée. Cette réhabilitation a pour but aussi de mettre en place des équipements nécessaires à l’amélioration de la vie des habitants de l’île. La création d’un centre Socio-Collectif entre dans ce programme. Le centre est aménagé dans l’ancien théâtre de verdure situé à l’angle de la rue Malavois et de la rue Boufflers, sur une parcelle de 759 m². Son état de ruine avancé, l’a rendu inutilisable. Sa réhabilitation a nécessité une reprise complète du bâtiment à partir des fondations.",
      "subtitle": "Réhabilitation et extension du théâtre de verdure en centre socio-collectif\n\nMission complète de maîtrise d'œuvre",
      "entreprise": "Soeco",
      "maitrise_oeuvre": "ADM - AGETIP (Agence d'Exécution des Travaux d'Intérêt Public  contre le sous-emploi)",
      "surface": "730 m²",
      "livraison": "2005"
    },
    {
      "id": 30,
      "title": "Université des sciences et technologies Tamaro Toure (US3T)",
      "category": "education",
      "location": "Dakar",
      "year": "2017",
      "image": "/assets/2_16.9-scaled.jpg",
      "description": "Le terrain de 1040 m² se situe à Sacré-Cœur dans l’enceinte du village SOS de Dakar. Il accueille un bâtiment R+2 dont le programme était destiné à l’...",
      "gallery": [
        "/assets/2_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/CD5560F9-64A5-45A0-91DC-F3771C10609B_16.9-scaled.jpg"
      ],
      "fullDescription": "Le terrain de 1040 m² se situe à Sacré-Cœur dans l’enceinte du village SOS de Dakar. Il accueille un bâtiment R+2 dont le programme était destiné à l’origine à héberger des bureaux. Néanmoins, la flexibilité de l’aménagement qui prévoyait la possibilité de transformer chaque bureau en salle de cours, a poussé le maître d’ouvrage à reconvertir son bâtiment en université. Les espaces ont donc été requalifiés, les sanitaires agrandis et un amphithéâtre a été ajouté. Les volumes du projet traduisent la fonctionnalité du bâtiment et l’amphithéâtre émerge comme un signal qui traduit les nouveaux objectifs de SOS Sénégal : la volonté d’auto gestion.",
      "subtitle": "Construction d'un centre de formation pour l'association SOS villages d'enfants\n\nMission complète de maîtrise d'œuvre",
      "entreprise": "",
      "maitrise_oeuvre": "Association des villages d'enfants SOS Sénégal",
      "surface": "3400 m²",
      "livraison": "2017"
    },
    {
      "id": 31,
      "title": "Villa Aq",
      "category": "logements",
      "location": "Toubab Dialaw",
      "year": "2019",
      "image": "/assets/2_16.9-1-scaled.jpg",
      "description": "La position exceptionnelle du terrain, situé en haut de la falaise de Toubab Dialaw, a déterminé de nombreux aspects du projet. La villa en forme de U...",
      "gallery": [
        "/assets/2_16.9-1-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/4_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/1_16.9-1-scaled.jpg"
      ],
      "fullDescription": "La position exceptionnelle du terrain, situé en haut de la falaise de Toubab Dialaw, a déterminé de nombreux aspects du projet. La villa en forme de U autour d'une piscine, s'ouvre sur l'océan à l'ouest. Un séjour et 3 chambres donnent sur la piscine en préservant un accès privatif par la façade opposée. Un accès traversant la villa sépare pièces de vie et chambres et offre une perspective sur l'océan et son horizon.",
      "subtitle": "Construction d'une maison individuelle\n\nMission complète de maîtrise d'œuvre",
      "entreprise": "Afeco",
      "maitrise_oeuvre": "Privé",
      "surface": "350 m²",
      "livraison": "2019"
    },
    {
      "id": 32,
      "title": "Villa Fs",
      "category": "logements",
      "location": "Ngaparou",
      "year": "2016",
      "image": "/assets/IMG_0270_16.9-scaled.jpg",
      "description": "Le projet de la villa Fs s’inscrit sur un site tout en longueur se déployant depuis la route vers la plage de la Somone et marqué par la présence d’un...",
      "gallery": [
        "/assets/IMG_0270_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/IMG_0954_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/IMG_0597_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/IMG_0759_16.9-scaled.jpg"
      ],
      "fullDescription": "Le projet de la villa Fs s’inscrit sur un site tout en longueur se déployant depuis la route vers la plage de la Somone et marqué par la présence d’un superbe baobab plusieurs fois centenaire. Le bâtiment est le résultat d’une volonté forte des maîtres d’ouvrage et maîtres d’œuvre de s’intégrer au mieux à cet environnement. Cette détermination s’est matérialisée par des choix respectueux : La dissociation des volumes et fonctions répartis sur le terrain pour préserver la végétation et l’intimité, le choix de matériaux bio-sourcés et naturels tels que la BTC, les enduits à la chaux, une charpente et des menuiseries bois, un sol en granito de coloris noir avec des agrégats de marbre blanc, etc…",
      "subtitle": "Construction d'une villa en BTC (Briques de Terre Compressée)\n\nMission de maîtrise d'œuvre d'exécution",
      "entreprise": "Atelier Koé, Sénégal bois",
      "maitrise_oeuvre": "Privé",
      "surface": "600 m²",
      "livraison": "2016"
    },
    {
      "id": 33,
      "title": "Villa Mm",
      "category": "logements",
      "location": "Ngaparou",
      "year": "2013",
      "image": "/assets/67ABCD74-AC58-4C11-A833-8FAB631E24B9_16.9-scaled.jpg",
      "description": "Le projet de la Villa Mm a été conçu pour s'insérer dans une concession comprenant 3 maisons complémentaires à construire, organisées autour d'une pis...",
      "gallery": [
        "/assets/67ABCD74-AC58-4C11-A833-8FAB631E24B9_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/8FE1058A-41D2-4086-8FFC-B55E01030FFA_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/IMG_7917-scaled.jpg"
      ],
      "fullDescription": "Le projet de la Villa Mm a été conçu pour s'insérer dans une concession comprenant 3 maisons complémentaires à construire, organisées autour d'une piscine centrale. La Villa Mm, pour se préserver de la chaleur du site, est ceinturée par des coursives et terrasses sur ses deux niveaux qui la protègent de l'ensoleillement direct, et possède deux petits patios végétalisés procurant une source d'air rafraichissant. Son isolement a favorisé le choix de l'utilisation du solaire pour l’éclairage et le moteur de la piscine.",
      "subtitle": "Construction d'une maison individuelle\n\nMission complète de maîtrise d'œuvre",
      "entreprise": "Afeco",
      "maitrise_oeuvre": "Privé",
      "surface": "400 m²",
      "livraison": "2013"
    },
    {
      "id": 34,
      "title": "Villa Rz",
      "category": "logements",
      "location": "Dakar",
      "year": "2009",
      "image": "/assets/P1000153_16.9.jpg",
      "description": "Située dans le quartier résidentiel de Fann, à Dakar, la villa existante nécessitait une rénovation profonde. Le projet a permis de prolonger les espa...",
      "gallery": [
        "/assets/P1000153_16.9.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/Photo-C_16.9.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/P1000147_16.9.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/P1000143_16.9.jpg"
      ],
      "fullDescription": "Située dans le quartier résidentiel de Fann, à Dakar, la villa existante nécessitait une rénovation profonde. Le projet a permis de prolonger les espaces intérieurs sur l'extérieur, grâce à davantage de transparence et la continuité de sols intérieurs. La villa se développe sur des paliers successifs se prolongeant à l’extérieur sur les terrasses et dans la piscine elle-même.",
      "subtitle": "Construction d'une maison individuelle\n\nMission complète de maîtrise d'œuvre",
      "entreprise": "EGB Badarrachi",
      "maitrise_oeuvre": "Privé",
      "surface": "300 m²",
      "livraison": "2009"
    },
    {
      "id": 35,
      "title": "Villa Signare",
      "category": "rehabilitation",
      "location": "Ile de Gorée",
      "year": "2015",
      "image": "/assets/IMG_0239_16.9-scaled.jpg",
      "description": "La villa Signare est une maison ancienne qui avait subit des rénovations préalables mettant en oeuvre des matériaux peu adaptés aux exigences de Gorée...",
      "gallery": [
        "/assets/IMG_0239_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/20200107_113653_16.9-scaled.jpg",
        "https://ga2d.com/wp-content/uploads/2020/07/IMG_2264_16.9-scaled.jpg"
      ],
      "fullDescription": "La villa Signare est une maison ancienne qui avait subit des rénovations préalables mettant en oeuvre des matériaux peu adaptés aux exigences de Gorée et un bétonnage grossier. La réhabilitation a permis de réorganiser les espaces extérieurs en créant un nouvel escalier d'accès à l'étage, offrant davantage d'espaces plantés et une circulation mieux intégrée aux espaces intérieurs. Un belvédère accessible par une passerelle à partir de l'étage, a été créé au dessus d'un salon ouvert, permettant d'ouvrir un panorama sur la mer et la presqu'île de Dakar. Les matériaux, tels que la pierre utilisée au sol du rdc, l'enduit à la chaux sur les murs et le bois pour les ouvertures et les parquets de l'étage, ont remplacé le carrelage émaillé et les enduits de ciments.",
      "subtitle": "Réhabilitation d'une maison\n\nMission complète de maîtrise d'œuvre",
      "entreprise": "Compagnie Sahélienne de Construction CSC, Sénégal Bois, Pape Sow",
      "maitrise_oeuvre": "Privé",
      "surface": "300 m²",
      "livraison": "2015"
    }
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
                      <h2 className="text-3xl font-bold font-['Montserrat'] mb-2">
                        {selectedProject.title}
                      </h2>
                      {selectedProject.subtitle && (
                        <p className="text-gray-600 font-medium mb-4 whitespace-pre-line">
                          {selectedProject.subtitle}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-4 text-gray-600 mb-6 border-b pb-6">
                        <div className="flex items-center gap-2">
                          <MapPin size={18} className="text-gray-400" />
                          <span>{selectedProject.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={18} className="text-gray-400" />
                          <span>{selectedProject.year}</span>
                        </div>
                      </div>

                      {/* Metadata Table */}
                      <div className="space-y-4 mb-8">
                        {selectedProject.entreprise && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 text-sm border-b border-gray-100 pb-3">
                            <span className="font-bold text-black uppercase tracking-wider">Entreprise</span>
                            <span className="sm:col-span-2 text-gray-700 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: selectedProject.entreprise }} />
                          </div>
                        )}
                        {selectedProject.maitrise_oeuvre && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 text-sm border-b border-gray-100 pb-3">
                            <span className="font-bold text-black uppercase tracking-wider">Maîtrise d’œuvre</span>
                            <span className="sm:col-span-2 text-gray-700 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: selectedProject.maitrise_oeuvre }} />
                          </div>
                        )}
                        {selectedProject.surface && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 text-sm border-b border-gray-100 pb-3">
                            <span className="font-bold text-black uppercase tracking-wider">Surface</span>
                            <span className="sm:col-span-2 text-gray-700 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: selectedProject.surface }} />
                          </div>
                        )}
                        {selectedProject.livraison && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 text-sm border-b border-gray-100 pb-3">
                            <span className="font-bold text-black uppercase tracking-wider">Livraison</span>
                            <span className="sm:col-span-2 text-gray-700 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: selectedProject.livraison }} />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-6 text-gray-700 leading-relaxed">
                      {selectedProject.fullDescription ? (
                        <div className="prose prose-gray max-w-none">
                          {selectedProject.fullDescription.split('\n').map((para, i) => (
                            para.trim() && <p key={i} className="mb-4">{para}</p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-lg font-medium text-black">
                          {selectedProject.description}
                        </p>
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
      image: '/assets/ANDREE.jpg'
    },
    {
      id: 2,
      name: "Eric Mulot",
      role: "Architecte DPLG",
      bio: "Associé Gérant",
      image: '/assets/ERIC-4.jpg'
    },
    {
      id: 3,
      name: "Nelson Nkonmeneck",
      role: "Architecte",
      bio: "Chef de projet",
      image: '/assets/NELSON-1-e1694188624211.png'
    },
    {
      id: 4,
      name: "Maïlys Tham",
      role: "Architecte",
      bio: "Chef de projet",
      image: '/assets/MAILYS-scaled-e1694188173921.jpg'
    },
    {
      id: 5,
      name: "Ulrich B. Tchouante K.",
      role: "Architecte Urbaniste DEIAU",
      bio: "Chef de projet",
      image: '/assets/ULRICH.jpg'
    },
    {
      id: 6,
      name: "François Gomis",
      role: "Suivi de chantier",
      bio: "",
      image: '/assets/FRANCOIS-1.jpg'
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
                <div>
                  <p className="flex items-center gap-2">
                    <Facebook size={16} />
                    <a href="https://www.facebook.com/GA2D.SENEGAL" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                      Facebook GA2D
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
              <a
                href="https://www.facebook.com/GA2D.SENEGAL"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                title="Facebook"
              >
                <Facebook size={20} />
              </a>
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
