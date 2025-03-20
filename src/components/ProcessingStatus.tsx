
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProcessingStep {
  id: string;
  label: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  duration: number; // Duration in seconds for simulation
}

const ProcessingStatus = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [processingComplete, setProcessingComplete] = useState(false);
  
  const [steps, setSteps] = useState<ProcessingStep[]>([
    {
      id: 'transcription',
      label: 'Transcribing Audio',
      description: 'Converting speech to text for content analysis',
      status: 'pending',
      progress: 0,
      duration: 8
    },
    {
      id: 'extraction',
      label: 'Extracting Key Points',
      description: 'Identifying the most important content from your video',
      status: 'pending',
      progress: 0,
      duration: 12
    },
    {
      id: 'screenshots',
      label: 'Capturing Screenshots',
      description: 'Taking screenshots at key moments in your video',
      status: 'pending',
      progress: 0,
      duration: 10
    },
    {
      id: 'generation',
      label: 'Generating Presentation',
      description: 'Creating slides with your content and organizing them',
      status: 'pending',
      progress: 0,
      duration: 15
    }
  ]);

  // Calculate total remaining time based on current step progress and remaining steps
  useEffect(() => {
    if (processingComplete) {
      setRemainingTime(null);
      return;
    }

    const currentStep = steps[currentStepIndex];
    if (!currentStep) return;

    // Calculate time remaining for current step
    const currentStepRemaining = (currentStep.duration * (100 - currentStep.progress)) / 100;
    
    // Add time for remaining steps
    const remainingStepsTime = steps
      .slice(currentStepIndex + 1)
      .reduce((acc, step) => acc + step.duration, 0);
    
    setRemainingTime(Math.ceil(currentStepRemaining + remainingStepsTime));
  }, [steps, currentStepIndex, processingComplete]);

  // Simulate processing steps
  useEffect(() => {
    if (processingComplete) return;
    
    const currentStep = steps[currentStepIndex];
    if (!currentStep) return;
    
    // Start processing current step
    if (currentStep.status === 'pending') {
      setSteps(prevSteps => {
        const updatedSteps = [...prevSteps];
        updatedSteps[currentStepIndex].status = 'processing';
        return updatedSteps;
      });
    }
    
    const interval = setInterval(() => {
      setSteps(prevSteps => {
        const updatedSteps = [...prevSteps];
        const step = updatedSteps[currentStepIndex];
        
        if (step.progress < 100) {
          // Increment progress with a bit of randomness for realism
          const increment = Math.min(100 - step.progress, 2 + Math.random() * 5);
          updatedSteps[currentStepIndex].progress = step.progress + increment;
        } else {
          // Step is complete
          clearInterval(interval);
          updatedSteps[currentStepIndex].status = 'completed';
          
          // Move to the next step if any
          if (currentStepIndex < updatedSteps.length - 1) {
            setCurrentStepIndex(prevIndex => prevIndex + 1);
          } else {
            // All steps complete
            setProcessingComplete(true);
            toast({
              title: "Processing complete!",
              description: "Your presentation is ready to download.",
            });
          }
        }
        
        return updatedSteps;
      });
    }, 350); // Update interval
    
    return () => clearInterval(interval);
  }, [currentStepIndex, processingComplete, toast]);

  const formatTime = (seconds: number): string => {
    if (seconds < 60) return `${seconds} seconds`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  };

  const viewPresentation = () => {
    navigate('/dashboard');
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 animate-scale-in">
      {/* Processing Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">
          {processingComplete ? 'Processing Complete!' : 'Processing Your Video'}
        </h2>
        <p className="text-muted-foreground">
          {processingComplete 
            ? 'Your presentation is ready to view and download' 
            : remainingTime 
              ? `Estimated time remaining: ${formatTime(remainingTime)}`
              : 'Analyzing your content...'}
        </p>
      </div>
      
      {/* Overall Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>
            {processingComplete ? 'Complete' : 'Processing...'}
          </span>
          <span>
            {Math.floor((steps.reduce((acc, step) => acc + step.progress, 0) / (steps.length * 100)) * 100)}%
          </span>
        </div>
        <Progress 
          value={(steps.reduce((acc, step) => acc + step.progress, 0) / (steps.length * 100)) * 100} 
          className="h-2"
        />
      </div>

      {/* Step Details */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className={cn(
              "p-4 rounded-lg border transition-all duration-300",
              step.status === 'completed' ? "border-green-500/20 bg-green-500/5" : 
              step.status === 'processing' ? "border-primary/20 bg-primary/5" : 
              step.status === 'error' ? "border-destructive/20 bg-destructive/5" :
              "border-border bg-secondary/30"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                step.status === 'completed' ? "bg-green-500/20" : 
                step.status === 'processing' ? "bg-primary/20" : 
                step.status === 'error' ? "bg-destructive/20" :
                "bg-secondary/50"
              )}>
                {step.status === 'completed' ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : step.status === 'processing' ? (
                  <Loader2 className="h-4 w-4 text-primary animate-spin" />
                ) : (
                  <span className="text-xs text-muted-foreground">{index + 1}</span>
                )}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-sm">{step.label}</h4>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(step.progress)}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{step.description}</p>
                
                {step.status === 'processing' && (
                  <Progress 
                    value={step.progress} 
                    className="h-1 mt-2"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Actions */}
      {processingComplete && (
        <div className="flex justify-center pt-4">
          <Button onClick={viewPresentation}>
            View Your Presentation
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProcessingStatus;
