
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Check if the user is on the auth pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  
  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // For demo purposes - in a real app this would check auth state
  const isLoggedIn = location.pathname === '/dashboard' || 
                     location.pathname === '/processing' || 
                     location.pathname.includes('/presentation');

  const navLinks = [
    { name: 'Home', path: '/', showWhen: 'always' },
    { name: 'Dashboard', path: '/dashboard', showWhen: 'loggedIn' },
  ];

  const filteredLinks = navLinks.filter(link => {
    if (link.showWhen === 'always') return true;
    if (link.showWhen === 'loggedIn' && isLoggedIn) return true;
    if (link.showWhen === 'loggedOut' && !isLoggedIn) return true;
    return false;
  });

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 md:px-6',
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 font-medium text-xl"
          aria-label="Video2Presentation"
        >
          <span className="text-primary font-semibold">Video2Presentation</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {filteredLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm transition-colors hover:text-primary',
                location.pathname === link.path ? 'text-primary font-medium' : 'text-muted-foreground'
              )}
            >
              {link.name}
            </Link>
          ))}
          
          {!isAuthPage && (
            <>
              {isLoggedIn ? (
                <Button variant="outline" asChild>
                  <Link to="/">Sign Out</Link>
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button variant="outline" asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Sign Up</Link>
                  </Button>
                </div>
              )}
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-background/90 backdrop-blur-md animate-fade-in">
          <nav className="flex flex-col items-center justify-center h-full space-y-8">
            {filteredLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-lg transition-colors hover:text-primary',
                  location.pathname === link.path ? 'text-primary font-medium' : 'text-foreground'
                )}
              >
                {link.name}
              </Link>
            ))}
            
            {!isAuthPage && (
              <>
                {isLoggedIn ? (
                  <Button variant="outline" size="lg" asChild className="w-1/2">
                    <Link to="/">Sign Out</Link>
                  </Button>
                ) : (
                  <div className="flex flex-col space-y-4 w-1/2">
                    <Button variant="outline" size="lg" asChild className="w-full">
                      <Link to="/login">Sign In</Link>
                    </Button>
                    <Button size="lg" asChild className="w-full">
                      <Link to="/register">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
