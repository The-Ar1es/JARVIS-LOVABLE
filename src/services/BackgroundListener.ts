
export class BackgroundListener {
  private recognition: SpeechRecognition | null = null;
  private isListening = false;
  private onWakeWordDetected: (transcript: string) => void;
  private wakeWords = ['hey jarvis', 'jarvis', 'hi jarvis', 'hello jarvis'];

  constructor(onWakeWordDetected: (transcript: string) => void) {
    this.onWakeWordDetected = onWakeWordDetected;
    this.initializeSpeechRecognition();
  }

  private initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
      
      this.recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('')
          .toLowerCase()
          .trim();

        console.log('Background listening transcript:', transcript);

        // Check for wake words
        const hasWakeWord = this.wakeWords.some(wakeWord => 
          transcript.includes(wakeWord)
        );

        if (hasWakeWord) {
          console.log('Wake word detected:', transcript);
          this.onWakeWordDetected(transcript);
        }
      };

      this.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          console.warn('Microphone access denied');
        } else {
          // Restart recognition on error
          setTimeout(() => this.startListening(), 1000);
        }
      };

      this.recognition.onend = () => {
        if (this.isListening) {
          // Restart recognition if it stops unexpectedly
          setTimeout(() => this.startListening(), 100);
        }
      };
    }
  }

  async startListening() {
    if (!this.recognition) {
      console.warn('Speech recognition not supported');
      return false;
    }

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      this.isListening = true;
      this.recognition.start();
      console.log('Background listening started');
      return true;
    } catch (error) {
      console.error('Failed to start background listening:', error);
      return false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.isListening = false;
      this.recognition.stop();
      console.log('Background listening stopped');
    }
  }

  isCurrentlyListening() {
    return this.isListening;
  }
}
