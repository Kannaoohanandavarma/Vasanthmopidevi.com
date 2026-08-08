import React, { useState, useEffect } from 'react';
import { 
  Menu, X, MapPin, Phone, Mail, Home, Building, 
  Map, CheckCircle, ChevronRight, Search, SlidersHorizontal,
  Camera, IndianRupee, BedDouble, Bath, Square, ArrowRight,
  ShieldCheck, LayoutDashboard, User, MessageCircle
} from 'lucide-react';


const CONTACT_INFO = {
  name: "Mopidevi Vasanth Kumar",
  title: "Vijayawada Local Real Estate Consultant",
  phone: "919121456859", // For WhatsApp link
  displayPhone: "+91 91214 56859",
  email: "Vasanthkumarmopidevi@gmail.com",
  areas: ["Patamata", "Ajith Singh Nagar", "High School Road", "Benz Circle", "Tadigadapa", "Vijayawada Surrounding Areas"]
};

// Realistic mock data clearly labeled as samples
const INITIAL_PROPERTIES = [
  {
    id: 1,
    title: "Premium 3BHK Apartment - Sample Listing",
    location: "Benz Circle, Vijayawada",
    type: "Apartment",
    category: "Residential",
    price: "₹ 1.25 Cr",
    area: "1,850 sq.ft.",
    beds: 3,
    baths: 3,
    featured: true,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "This is a sample listing demonstrating a premium apartment located in the prime area of Benz Circle. Features modern amenities, excellent ventilation, and proximity to major commercial hubs."
  },
  {
    id: 2,
    title: "Luxury Independent Villa - Demo Property",
    location: "Patamata, Vijayawada",
    type: "Villa",
    category: "Residential",
    price: "₹ 3.50 Cr",
    area: "3,200 sq.ft.",
    beds: 4,
    baths: 5,
    featured: true,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Demo property showcasing a luxurious villa in Patamata. Designed for sophisticated living with ample parking, a private garden, and high-end finishes throughout."
  },
  {
    id: 3,
    title: "Commercial Retail Space - Sample Listing",
    location: "Ajith Singh Nagar, Vijayawada",
    type: "Commercial",
    category: "Commercial",
    price: "₹ 2.10 Cr",
    area: "2,500 sq.ft.",
    beds: null,
    baths: 2,
    featured: true,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Sample commercial property ideal for retail or office setup in a bustling neighborhood. High footfall area with excellent road frontage."
  },
  {
    id: 4,
    title: "Highway Facing Open Plot - Demo",
    location: "Tadigadapa, Vijayawada",
    type: "Open Plot",
    category: "Commercial",
    price: "₹ 85 Lakhs",
    area: "300 Sq.Yards",
    beds: null,
    baths: null,
    featured: false,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Demonstration listing of an open plot suitable for commercial development or investment purposes near the Tadigadapa highway."
  },
  {
    id: 5,
    title: "Modern 2BHK Flat - Sample",
    location: "High School Road, Vijayawada",
    type: "Apartment",
    category: "Residential",
    price: "₹ 65 Lakhs",
    area: "1,100 sq.ft.",
    beds: 2,
    baths: 2,
    featured: false,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Sample residential flat ideal for small families. Well-connected location with nearby educational institutions and markets."
  },
  {
    id: 6,
    title: "Spacious Residential House - Demo",
    location: "Poranki, Vijayawada",
    type: "Residential Property",
    category: "Residential",
    price: "₹ 1.80 Cr",
    area: "2,400 sq.ft.",
    beds: 3,
    baths: 3,
    featured: false,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Demo listing of an independent house offering peace and tranquility in a growing residential sector just outside the main city."
  }
];

const generateWhatsAppLink = (message) => {
  return `https://wa.me/${CONTACT_INFO.phone}?text=${encodeURIComponent(message)}`;
};


const Button = ({ children, variant = 'primary', className = '', onClick, href }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 font-medium transition-all duration-300 rounded-sm";
  const variants = {
    primary: "bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-amber-600/30",
    secondary: "bg-gray-900 hover:bg-gray-800 text-white border border-gray-700",
    outline: "bg-transparent border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white",
    whatsapp: "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/30",
  };

  const combinedClass = `${baseStyle} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? "_blank" : "_self"} rel="noopener noreferrer" className={combinedClass}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={combinedClass}>
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle, centered = false }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    {subtitle && <span className="text-amber-600 font-semibold tracking-wider uppercase text-sm mb-2 block">{subtitle}</span>}
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
    <div className={`h-1 w-20 bg-amber-600 mt-4 ${centered ? 'mx-auto' : ''}`}></div>
  </div>
);

const PropertyCard = ({ property, onViewDetails }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group">
    <div className="relative h-64 overflow-hidden">
      <img 
        src={property.image} 
        alt={property.title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-4 left-4 flex gap-2">
        <span className="bg-amber-600 text-white px-3 py-1 text-xs font-semibold rounded-sm shadow-md">
          {property.type}
        </span>
        <span className="bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1 text-xs font-semibold rounded-sm shadow-md">
          {property.category}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-900 to-transparent p-4">
        <p className="text-white font-bold text-xl">{property.price}</p>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{property.title}</h3>
      <div className="flex items-center text-gray-600 mb-4 text-sm">
        <MapPin size={16} className="mr-1 text-amber-600" />
        <span className="truncate">{property.location}</span>
      </div>
      
      <div className="flex items-center justify-between border-t border-gray-100 pt-4 mb-6 text-sm text-gray-600">
        <div className="flex flex-col items-center">
          <Square size={18} className="mb-1 text-gray-400" />
          <span>{property.area}</span>
        </div>
        {property.beds && (
          <div className="flex flex-col items-center">
            <BedDouble size={18} className="mb-1 text-gray-400" />
            <span>{property.beds} Beds</span>
          </div>
        )}
        {property.baths && (
          <div className="flex flex-col items-center">
            <Bath size={18} className="mb-1 text-gray-400" />
            <span>{property.baths} Baths</span>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button 
          variant="outline" 
          className="w-full py-2 text-sm"
          onClick={() => onViewDetails(property)}
        >
          View Details
        </Button>
        <Button 
          variant="whatsapp" 
          className="w-full py-2 text-sm px-0"
          href={generateWhatsAppLink(`Hello Vasanth, I am interested in this property: ${property.title} located at ${property.location}. Please share more details.`)}
        >
          WhatsApp
        </Button>
      </div>
    </div>
  </div>
);


export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  // Notification State
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  
  // Mock Database State
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);
  const [leads, setLeads] = useState([]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedProperty]);

  const navigateTo = (page, property = null) => {
    setCurrentPage(page);
    setSelectedProperty(property);
    setIsMobileMenuOpen(false);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 5000); // Hide after 5 seconds
  };

  const handleLeadSubmit = (leadData) => {
    setLeads([...leads, { ...leadData, date: new Date().toISOString(), id: Date.now() }]);
    showNotification("Thank you. Your details have been received. Vasanth will contact you shortly.");
    navigateTo('home');
  };

  // Notification Component
  const NotificationToast = () => {
    if (!notification.show) return null;
    return (
      <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
        <div className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl border ${notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-gray-900 border-gray-700 text-white'}`}>
          <CheckCircle className={notification.type === 'success' ? 'text-green-600' : 'text-amber-500'} size={24} />
          <p className="font-medium">{notification.message}</p>
          <button onClick={() => setNotification({ ...notification, show: false })} className="ml-4 text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>
      </div>
    );
  };

  const Navigation = () => (
    <header className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Area */}
          <div 
            className="flex flex-col cursor-pointer" 
            onClick={() => navigateTo('home')}
          >
            <span className="text-2xl font-bold text-gray-900 tracking-tight">M. Vasanth<span className="text-amber-600">.</span></span>
            <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">Real Estate Consultant</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => navigateTo('home')} className={`text-sm font-semibold transition-colors ${currentPage === 'home' ? 'text-amber-600' : 'text-gray-600 hover:text-gray-900'}`}>Home</button>
            <button onClick={() => navigateTo('properties')} className={`text-sm font-semibold transition-colors ${currentPage === 'properties' ? 'text-amber-600' : 'text-gray-600 hover:text-gray-900'}`}>Properties</button>
            <button onClick={() => navigateTo('about')} className={`text-sm font-semibold transition-colors ${currentPage === 'about' ? 'text-amber-600' : 'text-gray-600 hover:text-gray-900'}`}>About Vasanth</button>
            <button onClick={() => navigateTo('contact')} className={`text-sm font-semibold transition-colors ${currentPage === 'contact' ? 'text-amber-600' : 'text-gray-600 hover:text-gray-900'}`}>Contact</button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="outline" className="px-4 py-2 text-sm" onClick={() => navigateTo('sell')}>
              Sell Property
            </Button>
            <Button variant="primary" className="px-4 py-2 text-sm" href={`tel:${CONTACT_INFO.phone}`}>
              Call Now
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-gray-900 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 absolute w-full left-0 top-20 shadow-xl">
          <div className="flex flex-col px-4 py-6 space-y-4">
            <button onClick={() => navigateTo('home')} className="text-left text-lg font-semibold text-gray-900 py-2 border-b border-gray-50">Home</button>
            <button onClick={() => navigateTo('properties')} className="text-left text-lg font-semibold text-gray-900 py-2 border-b border-gray-50">Find Properties</button>
            <button onClick={() => navigateTo('sell')} className="text-left text-lg font-semibold text-amber-600 py-2 border-b border-gray-50">Sell Your Property</button>
            <button onClick={() => navigateTo('about')} className="text-left text-lg font-semibold text-gray-900 py-2 border-b border-gray-50">About Vasanth</button>
            <button onClick={() => navigateTo('contact')} className="text-left text-lg font-semibold text-gray-900 py-2 border-b border-gray-50">Contact</button>
            <div className="pt-4 flex flex-col gap-3">
              <Button variant="whatsapp" className="w-full justify-center" href={generateWhatsAppLink("Hello Vasanth, I would like to know more about your real estate services.")}>
                WhatsApp Now
              </Button>
              <Button variant="secondary" className="w-full justify-center" href={`tel:${CONTACT_INFO.phone}`}>
                Call {CONTACT_INFO.displayPhone}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );

  const Footer = () => (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t-4 border-amber-600">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div>
            <div className="mb-6">
              <span className="text-2xl font-bold text-white tracking-tight">M. Vasanth<span className="text-amber-600">.</span></span>
              <p className="text-sm text-gray-400 mt-1 uppercase tracking-widest font-medium">Real Estate Consultant</p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted local partner in Vijayawada for buying, selling, and discovering premium residential and commercial properties.
            </p>
            <div className="flex gap-4">
              <a href={generateWhatsAppLink("Hello Vasanth, I am reaching out from your website.")} className="bg-white/10 p-2 rounded-full hover:bg-amber-600 transition-colors">
                <MessageCircle size={20} />
              </a>
              <a href={`tel:${CONTACT_INFO.phone}`} className="bg-white/10 p-2 rounded-full hover:bg-amber-600 transition-colors">
                <Phone size={20} />
              </a>
              <a href={`mailto:${CONTACT_INFO.email}`} className="bg-white/10 p-2 rounded-full hover:bg-amber-600 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><div className="w-2 h-2 bg-amber-600 rounded-full"></div> Quick Links</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><button onClick={() => navigateTo('home')} className="hover:text-amber-500 transition-colors">Home</button></li>
              <li><button onClick={() => navigateTo('properties')} className="hover:text-amber-500 transition-colors">Find a Property</button></li>
              <li><button onClick={() => navigateTo('sell')} className="hover:text-amber-500 transition-colors">Sell Your Property</button></li>
              <li><button onClick={() => navigateTo('about')} className="hover:text-amber-500 transition-colors">About Consultant</button></li>
              <li><button onClick={() => navigateTo('contact')} className="hover:text-amber-500 transition-colors">Contact Us</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><div className="w-2 h-2 bg-amber-600 rounded-full"></div> Property Types</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-amber-500 cursor-pointer transition-colors">Premium Apartments</li>
              <li className="hover:text-amber-500 cursor-pointer transition-colors">Luxury Villas</li>
              <li className="hover:text-amber-500 cursor-pointer transition-colors">Residential Houses</li>
              <li className="hover:text-amber-500 cursor-pointer transition-colors">Commercial Spaces</li>
              <li className="hover:text-amber-500 cursor-pointer transition-colors">Open Plots</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><div className="w-2 h-2 bg-amber-600 rounded-full"></div> Contact Info</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-600 shrink-0 mt-1" />
                <span>Serving Vijayawada,<br/>Andhra Pradesh, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-amber-600 shrink-0" />
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-white">{CONTACT_INFO.displayPhone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-amber-600 shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white truncate">{CONTACT_INFO.email}</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Area */}
        <div className="border-t border-gray-800 pt-8 pb-4">
          <div className="bg-gray-800/50 p-4 rounded-sm text-xs text-gray-400 mb-6 flex items-start gap-3">
            <ShieldCheck size={24} className="text-amber-600 shrink-0" />
            <p>
              <strong className="text-gray-300">Disclaimer:</strong> Property information, pricing, and availability are subject to change without notice. All listings shown as "Sample" or "Demo" are for illustrative purposes only. Buyers and sellers should independently verify property documents, approvals, ownership, and other legal details before completing any real estate transaction. We do not guarantee investment returns, loan approvals, or immediate sales.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Mopidevi Vasanth Kumar. All Rights Reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <button onClick={() => navigateTo('admin')} className="hover:text-gray-300 transition-colors">Admin Login</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  const FloatingActions = () => (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
      <a 
        href={`tel:${CONTACT_INFO.phone}`}
        className="w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-xl hover:-translate-y-1 transition-transform border border-gray-700"
        aria-label="Call Now"
      >
        <Phone size={24} />
      </a>
      <a 
        href={generateWhatsAppLink("Hello Vasanth, I am looking for property assistance in Vijayawada.")}
        className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 hover:-translate-y-1 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );


  const HomePage = () => (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury Home Vijayawada" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/70"></div>
          {/* Subtle gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 border border-amber-500/50 text-amber-500 bg-amber-900/20 backdrop-blur-sm rounded-sm text-sm font-semibold tracking-wider mb-6">
              VIJAYAWADA'S PREMIER PROPERTY EXPERT
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Find the Right <br/>Property in <span className="text-amber-500">Vijayawada.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed border-l-4 border-amber-600 pl-4">
              Residential, Commercial, Villas, Apartments & Open Plots. Local property assistance from search and site visits to negotiation and loan-processing coordination.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => navigateTo('properties')} className="text-lg px-8 py-4">
                Explore Properties
              </Button>
              <Button variant="secondary" onClick={() => navigateTo('sell')} className="text-lg px-8 py-4">
                Sell Your Property
              </Button>
            </div>
            
            {/* Quick Contact Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-gray-700/50 pt-8 max-w-4xl">
              <div>
                <p className="text-amber-500 font-bold text-2xl">Vijayawada</p>
                <p className="text-gray-400 text-sm">Primary Service Area</p>
              </div>
              <div>
                <p className="text-amber-500 font-bold text-2xl">End-to-End</p>
                <p className="text-gray-400 text-sm">Transaction Support</p>
              </div>
              <div>
                <p className="text-amber-500 font-bold text-2xl">Residential</p>
                <p className="text-gray-400 text-sm">& Commercial</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <SectionHeading 
              title="Featured Properties" 
              subtitle="Curated Selection" 
            />
            <Button variant="outline" className="hidden md:flex" onClick={() => navigateTo('properties')}>
              View All <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.filter(p => p.featured).slice(0, 3).map(property => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                onViewDetails={p => navigateTo('propertyDetails', p)} 
              />
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Button variant="outline" className="w-full" onClick={() => navigateTo('properties')}>
              View All Properties
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading 
            title="Explore by Category" 
            subtitle="Find What You Need" 
            centered 
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mt-12">
            {[
              { icon: Building, name: "Apartments", count: "Demo" },
              { icon: Home, name: "Villas", count: "Demo" },
              { icon: BedDouble, name: "Residential", count: "Demo" },
              { icon: LayoutDashboard, name: "Commercial", count: "Demo" },
              { icon: Map, name: "Open Plots", count: "Demo" },
            ].map((cat, idx) => (
              <div 
                key={idx} 
                onClick={() => navigateTo('properties')}
                className="group cursor-pointer bg-gray-50 border border-gray-100 p-6 md:p-8 rounded-lg text-center hover:bg-gray-900 transition-colors duration-300"
              >
                <div className="w-16 h-16 mx-auto bg-white group-hover:bg-gray-800 shadow-sm rounded-full flex items-center justify-center mb-4 transition-colors">
                  <cat.icon size={28} className="text-amber-600" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-white transition-colors">{cat.name}</h3>
                <p className="text-sm text-gray-500 mt-2">{cat.count} Listings</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sell CTA Section */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-600/10 skew-x-12 translate-x-32 hidden lg:block"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Have a Property to Sell?</h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Connect with a local Vijayawada real-estate consultant. We help property owners reach potential buyers through targeted marketing and extensive local networks.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={() => navigateTo('sell')} className="text-lg px-8 py-4">
                List Your Property
              </Button>
              <Button variant="whatsapp" className="text-lg px-8 py-4" href={generateWhatsAppLink("Hello Vasanth, I want to sell my property in Vijayawada. I would like to discuss the property with you.")}>
                WhatsApp Details
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section & Areas */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div>
              <SectionHeading title="Why Work With Vasanth?" subtitle="Professional Services" />
              <div className="space-y-6 mt-8">
                {[
                  { title: "Local Market Knowledge", desc: "Deep understanding of Vijayawada's neighborhoods, trends, and fair property values." },
                  { title: "Property Viewing Assistance", desc: "Organizing and accompanying buyers on site visits to find the perfect match." },
                  { title: "Negotiation Assistance", desc: "Acting as an intermediary to help reach mutually agreeable terms between buyers and sellers." },
                  { title: "Loan-Processing Coordination", desc: "Assisting customers with necessary documentation and connecting them with financing options." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1">
                      <CheckCircle className="text-amber-600" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-8 md:p-12 rounded-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Areas We Serve</h3>
              <p className="text-gray-600 mb-8">Primary operational areas within and around Vijayawada jurisdiction.</p>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                {CONTACT_INFO.areas.map((area, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-800 font-medium">
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                    {area}
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-white rounded border border-amber-100 flex gap-3 items-start">
                <MapPin className="text-amber-600 shrink-0 mt-1" size={20} />
                <p className="text-sm text-gray-600 italic">Property availability varies by area. Please contact us for current listings in your preferred location.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-amber-600 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Looking to Buy or Sell Property in Vijayawada?</h2>
        <p className="text-amber-100 mb-10 max-w-2xl mx-auto text-lg">Let a local expert guide you through the process seamlessly.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="secondary" onClick={() => navigateTo('properties')}>Find a Property</Button>
          <Button variant="secondary" onClick={() => navigateTo('sell')}>List Your Property</Button>
          <Button variant="whatsapp" href={generateWhatsAppLink("Hello Vasanth, I need assistance with real estate in Vijayawada.")}>WhatsApp</Button>
        </div>
      </section>
    </div>
  );


  const PropertiesPage = () => {
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProperties = properties.filter(p => {
      const matchesFilter = filter === 'All' || p.category === filter || p.type === filter;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    return (
      <div className="pt-24 pb-20 bg-gray-50 min-h-screen animate-in fade-in duration-500">
        <div className="container mx-auto px-4 lg:px-8">
          
          <div className="bg-gray-900 rounded-xl p-8 mb-12 text-white shadow-xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Property Listings</h1>
            <p className="text-gray-400 mb-8 max-w-2xl">Browse our sample catalog of residential and commercial properties in Vijayawada. Use the filters below to narrow down your search.</p>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search by location or property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>
              <div className="md:w-64">
                <select 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full px-4 py-4 rounded-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-600 appearance-none cursor-pointer"
                >
                  <option value="All">All Property Types</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Apartment">Apartments</option>
                  <option value="Villa">Villas</option>
                  <option value="Open Plot">Open Plots</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600 font-medium">Showing {filteredProperties.length} Demo Properties</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map(property => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                onViewDetails={p => navigateTo('propertyDetails', p)} 
              />
            ))}
          </div>
          
          {filteredProperties.length === 0 && (
            <div className="text-center py-20 bg-white rounded-lg border border-gray-200 mt-8">
              <Search className="mx-auto text-gray-300 mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-900">No properties found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search criteria or category filter.</p>
              <Button onClick={() => {setFilter('All'); setSearchQuery('');}} className="mt-6" variant="outline">
                Clear Filters
              </Button>
            </div>
          )}

        </div>
      </div>
    );
  };


  const PropertyDetailsPage = () => {
    if (!selectedProperty) return null;
    const p = selectedProperty;

    return (
      <div className="pt-20 pb-20 bg-white min-h-screen animate-in slide-in-from-bottom-4 duration-500">
        
        {/* Header Image */}
        <div className="w-full h-[50vh] md:h-[60vh] relative bg-gray-900">
          <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <div className="container mx-auto">
              <span className="inline-block bg-amber-600 text-white px-3 py-1 rounded-sm text-sm font-bold mb-4 shadow-lg">
                {p.type} • Sample Listing
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{p.title}</h1>
              <div className="flex items-center text-gray-300 text-lg">
                <MapPin className="mr-2 text-amber-500" size={20} />
                {p.location}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 mt-12">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Main Details */}
            <div className="lg:w-2/3">
              <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-6">
                <div>
                  <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">Asking Price</p>
                  <p className="text-4xl font-bold text-gray-900">{p.price}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="whatsapp" className="hidden md:flex" href={generateWhatsAppLink(`Hello Vasanth, I am interested in this property: ${p.title} located at ${p.location}. Price listed: ${p.price}. Please share more details.`)}>
                    <MessageCircle size={18} className="mr-2" /> WhatsApp Enquiry
                  </Button>
                </div>
              </div>

              {/* Key Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-col items-center justify-center text-center">
                  <Square size={24} className="text-amber-600 mb-2" />
                  <span className="text-sm text-gray-500">Area</span>
                  <span className="font-bold text-gray-900">{p.area}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-col items-center justify-center text-center">
                  <LayoutDashboard size={24} className="text-amber-600 mb-2" />
                  <span className="text-sm text-gray-500">Property Type</span>
                  <span className="font-bold text-gray-900">{p.type}</span>
                </div>
                {p.beds !== null && (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-col items-center justify-center text-center">
                    <BedDouble size={24} className="text-amber-600 mb-2" />
                    <span className="text-sm text-gray-500">Bedrooms</span>
                    <span className="font-bold text-gray-900">{p.beds}</span>
                  </div>
                )}
                {p.baths !== null && (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-col items-center justify-center text-center">
                    <Bath size={24} className="text-amber-600 mb-2" />
                    <span className="text-sm text-gray-500">Bathrooms</span>
                    <span className="font-bold text-gray-900">{p.baths}</span>
                  </div>
                )}
              </div>

              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Property Description</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{p.description}</p>
                <p className="text-gray-600 leading-relaxed text-lg mt-4">
                  (Note: This is a sample description for demonstration purposes. Actual property listings will feature detailed information about amenities, facing, legal status, and surrounding infrastructure.)
                </p>
              </div>

              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Map Location</h3>
                <div className="bg-gray-200 w-full h-64 rounded-lg flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
                  <div className="text-center z-10">
                    <MapPin size={48} className="mx-auto text-amber-600 mb-2 drop-shadow-md" />
                    <p className="font-semibold text-gray-700 text-lg">{p.location}</p>
                    <p className="text-sm text-gray-500">Map integration placeholder</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Contact Card */}
            <div className="lg:w-1/3">
              <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-8 sticky top-28">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center border border-gray-200">
                    <User size={40} className="text-gray-400" />
                  </div>
                  <h4 className="font-bold text-xl text-gray-900">{CONTACT_INFO.name}</h4>
                  <p className="text-gray-500 text-sm">Consultant for this property</p>
                </div>
                
                <div className="space-y-4">
                  <Button 
                    className="w-full flex justify-center py-4 text-base"
                    href={`tel:${CONTACT_INFO.phone}`}
                  >
                    <Phone size={18} className="mr-2" /> Call Vasanth
                  </Button>
                  <Button 
                    variant="whatsapp" 
                    className="w-full flex justify-center py-4 text-base"
                    href={generateWhatsAppLink(`Hello Vasanth, I want to schedule a site visit for: ${p.title}.`)}
                  >
                    <Map size={18} className="mr-2" /> Schedule Site Visit
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full flex justify-center py-4 text-base"
                    onClick={() => navigateTo('contact')}
                  >
                    Send Email Enquiry
                  </Button>
                </div>
                
                <p className="text-xs text-center text-gray-400 mt-6 mt-4 border-t border-gray-100 pt-4">
                  Please mention the property title when calling.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  };


  const SellPropertyPage = () => {
    const [formData, setFormData] = useState({
      type: 'seller_lead',
      ownerName: '',
      phone: '',
      propertyType: 'Residential',
      location: '',
      price: '',
      description: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleLeadSubmit(formData);
    };

    return (
      <div className="pt-24 pb-20 bg-gray-50 min-h-screen animate-in fade-in duration-500">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Want to Sell Your Property?</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tell us about your property and connect directly with Vasanth to reach potential buyers in Vijayawada.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
            
            {/* Form Side */}
            <div className="p-8 md:p-12 md:w-2/3">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Property Details Form</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Owner Name *</label>
                    <input required type="text" className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none transition-shadow" placeholder="Full Name" onChange={e => setFormData({...formData, ownerName: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                    <input required type="tel" className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none transition-shadow" placeholder="Mobile / WhatsApp" onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type *</label>
                    <select className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none transition-shadow bg-white" onChange={e => setFormData({...formData, propertyType: e.target.value})}>
                      <option>Apartment</option>
                      <option>Villa / Independent House</option>
                      <option>Commercial Space</option>
                      <option>Open Plot</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location/Area *</label>
                    <input required type="text" className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none transition-shadow" placeholder="e.g., Patamata, Benz Circle" onChange={e => setFormData({...formData, location: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Selling Price</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none transition-shadow" placeholder="e.g., ₹ 1.5 Cr" onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Property Description & Size</label>
                  <textarea rows="4" className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none transition-shadow resize-none" placeholder="Briefly describe the property, area size in sq.ft or sq.yards, age of property, etc." onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center">
                  <Button type="submit" className="w-full sm:w-auto px-10">Submit Property Details</Button>
                  <span className="text-gray-400 text-sm">or</span>
                  <a 
                    href={generateWhatsAppLink("Hello Vasanth, I want to sell my property. Here are some basic details: ")}
                    className="text-green-600 font-semibold hover:text-green-700 flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={18} className="mr-2" /> Prefer WhatsApp? Send details here.
                  </a>
                </div>
              </form>
            </div>

            {/* Info Side */}
            <div className="bg-gray-900 text-white p-8 md:p-12 md:w-1/3 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-6">Why List With Us?</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <CheckCircle className="text-amber-500 shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-lg">Targeted Reach</h4>
                    <p className="text-gray-400 text-sm mt-1">Connect directly with active buyers looking in Vijayawada.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <CheckCircle className="text-amber-500 shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-lg">Professional Handling</h4>
                    <p className="text-gray-400 text-sm mt-1">We manage site visits and filter serious prospects.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <CheckCircle className="text-amber-500 shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-lg">Negotiation Support</h4>
                    <p className="text-gray-400 text-sm mt-1">Expert assistance to ensure you get a fair market value.</p>
                  </div>
                </li>
              </ul>
              <div className="mt-12 pt-8 border-t border-gray-700">
                <p className="text-sm text-gray-400 mb-2">Direct Contact</p>
                <p className="text-xl font-bold text-amber-500">{CONTACT_INFO.displayPhone}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  };


  const AboutPage = () => (
    <div className="pt-24 pb-20 bg-white min-h-screen animate-in fade-in duration-500">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          
          <div className="md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Using a professional abstract placeholder as requested for portrait */}
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Professional Office Building" 
                className="w-full h-auto object-cover aspect-[4/5]"
              />
              <div className="absolute inset-0 border-4 border-white/20 rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                <h3 className="font-bold text-xl text-gray-900">{CONTACT_INFO.name}</h3>
                <p className="text-amber-600 font-medium text-sm">Real Estate Consultant</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <SectionHeading title="About Vasanth" subtitle="Your Local Expert" />
            
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Vasanth began his career as a marketing agent with a reputed real-estate company, working extensively with open plots and premium apartments. This foundational experience provided deep insights into market dynamics and customer requirements.
              </p>
              <p>
                After gaining substantial experience in the real-estate industry, he established himself as an independent local real-estate consultant focused on the Vijayawada market.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-amber-600 mt-8 mb-8">
                <h4 className="font-bold text-gray-900 mb-2">Professional Role</h4>
                <p className="text-base">
                  He specializes in helping buyers discover suitable properties, organizing property visits, negotiating terms with owners, and coordinating loan-processing assistance. For property owners, he provides a reliable channel to connect with serious, potential buyers.
                </p>
              </div>
              <p>
                His portfolio covers a wide range of properties including residential houses, villas, apartments, commercial spaces, and open plots across prime areas like Patamata, Ajith Singh Nagar, Benz Circle, and Tadigadapa.
              </p>
            </div>

            <div className="mt-10 flex gap-4">
              <Button onClick={() => navigateTo('contact')}>Contact Now</Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  const ContactPage = () => {
    const [formData, setFormData] = useState({
      type: 'general_inquiry',
      name: '',
      phone: '',
      email: '',
      interest: 'Buying a property',
      message: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleLeadSubmit(formData);
    };

    return (
      <div className="pt-24 pb-20 bg-gray-50 min-h-screen animate-in fade-in duration-500">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          
          <SectionHeading title="Get in Touch" subtitle="Contact Vasanth" centered />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
            
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone size={32} className="text-amber-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-2">Call</h3>
                <p className="text-gray-600 mb-4">{CONTACT_INFO.displayPhone}</p>
                <Button variant="outline" className="w-full" href={`tel:${CONTACT_INFO.phone}`}>Call Now</Button>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={32} className="text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-2">WhatsApp</h3>
                <p className="text-gray-600 mb-4">Instant messaging</p>
                <Button variant="whatsapp" className="w-full" href={generateWhatsAppLink("Hello Vasanth, I have an enquiry regarding real estate.")}>Message Now</Button>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin size={32} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-2">Location</h3>
                <p className="text-gray-600">Vijayawada, Andhra Pradesh, India</p>
                <p className="text-sm text-gray-400 mt-2">Serving nearby areas</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send an Enquiry</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                      <input required type="text" className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-amber-600 outline-none" onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                      <input required type="tel" className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-amber-600 outline-none" onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input type="email" className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-amber-600 outline-none" onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">I'm interested in: *</label>
                    <select className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-amber-600 outline-none bg-white" onChange={e => setFormData({...formData, interest: e.target.value})}>
                      <option>Buying a property</option>
                      <option>Selling a property</option>
                      <option>General enquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea rows="5" className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-amber-600 outline-none resize-none" placeholder="How can we help you?" onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                  </div>
                  <Button type="submit" className="w-full py-4 text-lg">Submit Enquiry</Button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  };

  
  const AdminDashboard = () => (
    <div className="pt-24 pb-20 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 flex justify-between items-center border border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm">Prototype View - Data is stored in memory for this demo.</p>
          </div>
          <Button variant="outline" onClick={() => navigateTo('home')}>Exit Admin</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Quick Stats */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-l-4 border-l-amber-600">
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Properties</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{properties.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-l-4 border-l-blue-600">
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Leads Collected</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{leads.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-l-4 border-l-green-600">
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Seller Inquiries</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{leads.filter(l => l.type === 'seller_lead').length}</p>
            </div>
          </div>

          {/* Leads Table */}
          <div className="lg:col-span-3 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Recent Leads & Enquiries</h2>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                    <th className="p-4 font-semibold">Date</th>
                    <th className="p-4 font-semibold">Type</th>
                    <th className="p-4 font-semibold">Name</th>
                    <th className="p-4 font-semibold">Contact</th>
                    <th className="p-4 font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-500">No leads captured yet in this session. Use the forms to generate mock leads.</td>
                    </tr>
                  ) : (
                    leads.map((lead) => (
                      <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                          {new Date(lead.date).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${lead.type === 'seller_lead' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                            {lead.type === 'seller_lead' ? 'Seller' : 'Buyer/General'}
                          </span>
                        </td>
                        <td className="p-4 text-sm font-medium text-gray-900">{lead.name || lead.ownerName}</td>
                        <td className="p-4 text-sm text-gray-600">{lead.phone}<br/><span className="text-xs text-gray-400">{lead.email}</span></td>
                        <td className="p-4 text-sm text-gray-600">
                          {lead.type === 'seller_lead' ? (
                            <span>Wants to sell: {lead.propertyType} at {lead.location}</span>
                          ) : (
                            <span>Interest: {lead.interest}</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );


  return (
    <div className="font-sans text-gray-900 bg-white selection:bg-amber-200">
      <Navigation />
      <NotificationToast />
      
      <main className="min-h-screen">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'properties' && <PropertiesPage />}
        {currentPage === 'propertyDetails' && <PropertyDetailsPage />}
        {currentPage === 'sell' && <SellPropertyPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'admin' && <AdminDashboard />}
      </main>

      {currentPage !== 'admin' && <Footer />}
      {currentPage !== 'admin' && <FloatingActions />}
    </div>
  );
}