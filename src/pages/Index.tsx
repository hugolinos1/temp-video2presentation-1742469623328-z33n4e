
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, FileVideo, Zap, Check, BarChart, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const features = [
    {
      icon: <FileVideo className="h-5 w-5" />,
      title: "Simple Video Upload",
      description: "Upload MP4, AVI, or MOV videos up to 500MB and 30 minutes in length."
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "AI-Powered Analysis",
      description: "Our advanced AI analyzes your video content to extract the most important information."
    },
    {
      icon: <BarChart className="h-5 w-5" />,
      title: "Professional Designs",
      description: "Get beautiful, professionally designed slides that match your content."
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Save Hours of Work",
      description: "What would take hours manually is completed in minutes automatically."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Upload Your Video",
      description: "Select and upload your video file in a supported format."
    },
    {
      number: "02",
      title: "AI Processing",
      description: "Our system analyzes your content and extracts key information."
    },
    {
      number: "03",
      title: "Download Presentation",
      description: "Get your ready-to-use presentation with all the important points."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
          
          <div className="container text-center space-y-8 max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-2">
              <span>Launching Soon</span>
            </div>
            
            <h1 className="hero-title">
              Transform Videos into Beautiful Presentations
            </h1>
            
            <p className="hero-subtitle">
              Upload your video content and our AI technology will automatically create a professional presentation with key points and visuals from your content.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center pt-4 animate-slide-in" style={{ animationDelay: "0.3s" }}>
              <Button size="lg" asChild>
                <Link to="/register">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container">
            <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-semibold tracking-tight mb-4">
                Turn Video Content into Presentations Instantly
              </h2>
              <p className="text-muted-foreground">
                Save time and create consistency between your video content and presentations with our easy-to-use platform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "glass-card animate-scale-in",
                    `animate-stagger-${index + 1}`
                  )}
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/5),transparent_70%)] -z-10" />
          
          <div className="container">
            <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-semibold tracking-tight mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground">
                Our streamlined process makes creating presentations from videos simple and efficient.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "relative p-6 rounded-lg bg-background border animate-scale-in",
                    `animate-stagger-${index + 1}`
                  )}
                >
                  <div className="text-3xl font-light text-primary/40 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container max-w-4xl">
            <div className="glass-card md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1 space-y-4 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  Ready to Save Hours on Presentation Creation?
                </h2>
                <p className="text-muted-foreground">
                  Join thousands of professionals who are streamlining their workflow with Video2Presentation.
                </p>
                <ul className="space-y-2">
                  {["Free to get started", "No credit card required", "Export to PowerPoint or PDF"].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm md:text-base">
                      <Check className="h-5 w-5 text-green-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="shrink-0 flex flex-col space-y-3 w-full md:w-auto">
                <Button size="lg" className="w-full" asChild>
                  <Link to="/register">
                    Create Free Account
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link to="/login">
                    Sign In
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
