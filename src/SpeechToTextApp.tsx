import { useState, useEffect, ChangeEvent } from "react";

const SpeechToTextApp = ({ onInputChange }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if browser supports speech recognition
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      setError(
        "Speech recognition is not supported in your browser. Try Chrome or Edge."
      );
      return;
    }

    // Initialize speech recognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();

    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = "en-US";

    recognitionInstance.onresult = (event) => {
      const current = event.resultIndex;
      const transcriptText = event.results[current][0].transcript;
      handleInputChange(transcriptText);
    };

    recognitionInstance.onerror = (event) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognitionInstance.onend = () => {
      if (isListening) {
        recognitionInstance.start();
      }
    };

    setRecognition(recognitionInstance);

    // Cleanup on component unmount
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isListening]);

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      if (recognition) {
        recognition.start();
        setIsListening(true);
        setError("");
      }
    }
  };

  const clearTranscript = () => {
    setTranscript("");
  };

  const handleInputChange = (text: string) => {
    setTranscript(text);
    onInputChange(text);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Speech to Text</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="transcript" className="block text-gray-700 mb-2">
          Your Speech
        </label>
        <input
          id="transcript"
          type="text"
          value={transcript}
          onChange={(e) => handleInputChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Start speaking..."
        />
      </div>

      <div className="flex space-x-2">
        <button
          onClick={toggleListening}
          className={`flex-1 py-2 px-4 rounded font-medium ${
            isListening
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isListening ? "Stop Listening" : "Start Listening"}
        </button>

        <button
          onClick={clearTranscript}
          className="flex-1 py-2 px-4 bg-gray-300 hover:bg-gray-400 rounded font-medium"
        >
          Clear
        </button>
      </div>

      <div className="mt-4 text-center">
        {isListening && (
          <div className="text-green-500 font-medium flex items-center justify-center">
            <div className="mr-2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            Listening...
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeechToTextApp;
