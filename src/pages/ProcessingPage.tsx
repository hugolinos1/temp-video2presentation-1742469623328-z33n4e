
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProcessingStatus from '@/components/ProcessingStatus';

const ProcessingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Processing Video</h1>
            <p className="text-muted-foreground mt-1">
              We're working on converting your video to a presentation
            </p>
          </div>
          
          <ProcessingStatus />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProcessingPage;
