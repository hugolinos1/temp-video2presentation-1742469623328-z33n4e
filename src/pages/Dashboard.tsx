
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoUploader from '@/components/VideoUploader';
import PresentationPreview from '@/components/PresentationPreview';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Upload, PresentationIcon, Clock, MoreHorizontal, Download, FileVideo, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('upload');
  
  const recentPresentations = [
    {
      id: 1,
      title: "Product Launch Presentation",
      date: "2023-08-15",
      slides: 15,
      status: "completed",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80"
    },
    {
      id: 2,
      title: "Quarterly Business Review",
      date: "2023-07-22",
      slides: 12,
      status: "completed",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
  ];
  
  const handleDelete = (id: number) => {
    toast({
      title: "Presentation deleted",
      description: "The presentation has been successfully deleted.",
    });
  };
  
  const handleDownload = (id: number) => {
    toast({
      title: "Download started",
      description: "Your presentation is being prepared for download.",
    });
    
    setTimeout(() => {
      toast({
        title: "Download complete",
        description: "Your presentation has been successfully downloaded.",
      });
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage your videos and presentations
            </p>
          </div>
          
          <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center">
              <TabsList className="mb-8">
                <TabsTrigger value="upload" className="flex items-center gap-1.5">
                  <Upload className="h-4 w-4" />
                  <span>Upload Video</span>
                </TabsTrigger>
                <TabsTrigger value="presentations" className="flex items-center gap-1.5">
                  <PresentationIcon className="h-4 w-4" />
                  <span>My Presentations</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="upload" className="space-y-8 animate-fade-in">
              <VideoUploader />
            </TabsContent>
            
            <TabsContent value="presentations" className="space-y-8 animate-fade-in">
              {recentPresentations.length > 0 ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentPresentations.map((presentation) => (
                      <Card key={presentation.id} className="overflow-hidden">
                        <div 
                          className="aspect-video bg-cover bg-center"
                          style={{ backgroundImage: `url(${presentation.thumbnail})` }}
                        >
                          <div className="w-full h-full bg-black/20 flex items-center justify-center group">
                            <Link to="/dashboard">
                              <Button 
                                variant="secondary" 
                                size="sm" 
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <PresentationIcon className="h-4 w-4 mr-1" />
                                View Presentation
                              </Button>
                            </Link>
                          </div>
                        </div>
                        
                        <CardHeader className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <CardTitle className="text-lg">{presentation.title}</CardTitle>
                              <CardDescription className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>
                                  {new Date(presentation.date).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              </CardDescription>
                            </div>
                            
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleDownload(presentation.id)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-destructive"
                                onClick={() => handleDelete(presentation.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="p-4 pt-0">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <PresentationIcon className="h-4 w-4" />
                              <span>{presentation.slides} slides</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {/* New Presentation Card */}
                    <Card className="flex flex-col items-center justify-center h-full aspect-[4/3] border-dashed">
                      <CardContent className="flex flex-col items-center justify-center text-center p-6 h-full">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <Upload className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Create New Presentation</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          Upload a video to generate a new presentation
                        </p>
                        <Button variant="outline" onClick={() => setActiveTab('upload')}>
                          <FileVideo className="h-4 w-4 mr-1" />
                          Upload Video
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {recentPresentations.length > 0 && (
                    <div className="mt-12 space-y-6">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Recent Presentation
                      </h2>
                      <PresentationPreview />
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <PresentationIcon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No presentations yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Upload a video to generate your first presentation. It only takes a few minutes.
                  </p>
                  <Button onClick={() => setActiveTab('upload')}>
                    <Upload className="h-4 w-4 mr-1" />
                    Upload Video
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
