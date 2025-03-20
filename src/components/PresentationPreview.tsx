
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ChevronLeft, ChevronRight, Download, ExternalLink, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Placeholder data for the presentation preview
const slides = [
  {
    id: 1,
    title: "Introduction to Video2Presentation",
    content: "Transform your videos into beautiful presentations with AI-powered technology.",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    timestamp: "00:00:15"
  },
  {
    id: 2,
    title: "How It Works",
    content: "Our system analyzes your video content, extracts key points, and creates professionally designed slides.",
    imageUrl: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
    timestamp: "01:23:45"
  },
  {
    id: 3,
    title: "Key Benefits",
    content: "Save time, maintain consistency, and ensure your presentations perfectly match your video content.",
    imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    timestamp: "03:12:30"
  },
  {
    id: 4,
    title: "Getting Started",
    content: "Upload your video, select your template, and let our AI create a presentation within minutes.",
    imageUrl: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    timestamp: "05:47:10"
  },
  {
    id: 5,
    title: "Advanced Features",
    content: "Customize templates, edit content, and export to PowerPoint or PDF formats.",
    imageUrl: "https://images.unsplash.com/photo-1562577308-9e66f0c65ce5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
    timestamp: "08:36:22"
  }
];

const PresentationPreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { toast } = useToast();
  
  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };
  
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  };
  
  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your presentation is being prepared for download.",
    });
    
    // Simulate download start delay
    setTimeout(() => {
      toast({
        title: "Download complete",
        description: "Your presentation has been successfully downloaded.",
      });
    }, 2000);
  };
  
  const openVideoTimestamp = () => {
    toast({
      title: "Video playback",
      description: `Playing video from timestamp ${slides[currentSlide].timestamp}`,
    });
  };

  return (
    <div className="w-full animate-scale-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Slide Navigator */}
        <div className="lg:col-span-1 order-2 lg:order-1 space-y-4">
          <h3 className="text-lg font-medium mb-4">Slides</h3>
          
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {slides.map((slide, index) => (
              <div 
                key={slide.id}
                className={cn(
                  "p-3 rounded-lg border cursor-pointer transition-all",
                  index === currentSlide 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/20 hover:bg-secondary/50"
                )}
                onClick={() => setCurrentSlide(index)}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded bg-cover bg-center bg-no-repeat shrink-0"
                    style={{ backgroundImage: `url(${slide.imageUrl})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{slide.title}</h4>
                    <p className="text-xs text-muted-foreground truncate">{slide.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Current Slide Preview */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="rounded-lg border border-border overflow-hidden bg-card">
            {/* Slide Header */}
            <div className="p-4 border-b border-border bg-secondary/30 flex justify-between items-center">
              <h3 className="font-medium">Presentation Preview</h3>
              <div className="text-sm text-muted-foreground">
                Slide {currentSlide + 1} of {slides.length}
              </div>
            </div>
            
            {/* Slide Content */}
            <div className="relative aspect-[16/9] bg-black/5">
              <img 
                src={slides[currentSlide].imageUrl} 
                alt={slides[currentSlide].title} 
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 p-6 flex flex-col justify-end">
                <h2 className="text-2xl font-bold text-white">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-white/90 mt-2">
                  {slides[currentSlide].content}
                </p>
                
                <button 
                  className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
                  onClick={openVideoTimestamp}
                  title={`Play video at ${slides[currentSlide].timestamp}`}
                >
                  <PlayCircle className="h-5 w-5" />
                </button>
                
                <div className="absolute bottom-4 right-4 bg-black/30 text-white px-2 py-1 rounded text-xs">
                  {slides[currentSlide].timestamp}
                </div>
              </div>
            </div>
            
            {/* Slide Controls */}
            <div className="p-4 border-t border-border flex justify-between items-center">
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={goToPrevSlide}
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={goToNextSlide}
                  disabled={currentSlide === slides.length - 1}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="hidden sm:flex"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentationPreview;
