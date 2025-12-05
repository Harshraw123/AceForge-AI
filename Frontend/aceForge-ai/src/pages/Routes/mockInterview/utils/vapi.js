import Vapi from "@vapi-ai/web";

// Get API key from environment or use fallback
const VAPI_API_KEY = import.meta.env.VITE_VAPI_API_KEY || '4b342171-7d3a-4495-9eff-c8d6195b8b38';

if (!VAPI_API_KEY) {
  console.error('Vapi API key is missing. Please set VITE_VAPI_API_KEY in your environment variables.');
}

// Create Vapi instance with audio configuration
const vapi = new Vapi(VAPI_API_KEY, {
  // Audio configuration for better compatibility
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
  },
  // Enable debugging
  debug: true,
});

// Add comprehensive event listeners for debugging
vapi.on('call-start', () => {
  console.log('🎤 Vapi call started');
});

vapi.on('call-end', () => {
  console.log('📞 Vapi call ended');
});

vapi.on('speech-start', () => {
  console.log('🗣️ Assistant started speaking');
});

vapi.on('speech-end', () => {
  console.log('🔇 Assistant stopped speaking');
});

vapi.on('message', (message) => {
  console.log('💬 Vapi message:', message);
});

vapi.on('error', (error) => {
  console.error('❌ Vapi error:', error);
  
  // Log specific error types for debugging
  if (error.message) {
    if (error.message.includes('permission')) {
      console.error('🔒 Audio permission issue detected');
    } else if (error.message.includes('network')) {
      console.error('🌐 Network connectivity issue detected');
    } else if (error.message.includes('agent')) {
      console.error('🤖 Agent configuration issue detected');
    }
  }
});

// Add audio device change listener
vapi.on('audio-device-change', (device) => {
  console.log('🎧 Audio device changed:', device);
});

export default vapi;
