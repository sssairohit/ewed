import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { InputForm } from './components/InputForm';
import { Certificate } from './components/Certificate';
import { generateBatmanWitnessStatement, generateCelebrityImage } from './services/geminiService';

export interface CertificateData {
  userName: string;
  userPhoto: string;
  celebrityName: string;
  celebrityPhoto: string;
  witnessStatement: string;
  userVows: string;
  celebrityVows: string;
  nameFont: string;
  vowsFont: string;
}

const PLACEHOLDER_USER = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2E1YTVhNSI+PHBhdGggZD0iTTEyIDEyYzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNHptMCAyYy0yLjY3IDAtOCAxLjM0LTggNHYyYzAgMS4xLjkgMiAyIDJoMTRjMS4xIDAgMi0uOSAyLTJ2LTJjMC0yLjY2LTUuMzMtNC04LTR6Ii8+PC9zdmc+';
const PLACEHOLDER_CELEB = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2E1YTVhNSI+PHBhdGggZD0iTTkgMTEuM2MtMi4yMyAwLTQtMS43OS00LTQgMCAuMDktLjAxLjE4LS4wMS4yNy4wMS0xLjY5IDEuMzYtMy4wMyAzLjAyLTMuMDMgMS40NSAwIDIuNzIuOTkgMy4wNCAyLjM1LjA0LjE5LjA2LjM5LjA2LjU5IDAgMi4yMS0xLjc5IDQtNCA0ek0yMCAxMmMtMi45NyAwLTYuMSAxLjQ5LTYuMSAzLjI2VjE3aDEyLjJ2LTEuNzRjMC0xLjc3LTMuMTMtMy4yNi02LjEtMy4yNnptLTggMGMtMi4yMSAwLTQtMS43OS00LTRzMS43OS00IDQtNCA0IDEuNzkgNCA0LTEuNzkgNC00IDR6bTAtMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz48L3N2Zz4=';


const initialData: CertificateData = {
  userName: 'Your Name',
  userPhoto: PLACEHOLDER_USER,
  celebrityName: 'Celebrity Name',
  celebrityPhoto: PLACEHOLDER_CELEB,
  witnessStatement: 'Batman is thinking of something cool to say...',
  userVows: 'Your heartfelt vows will appear here.',
  celebrityVows: 'Their dramatic vows will appear here.',
  nameFont: 'font-script',
  vowsFont: 'font-serif',
}

function App() {
  const [data, setData] = useState<CertificateData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGenerated, setIsGenerated] = useState(false);

  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDataChange = <K extends keyof CertificateData>(key: K, value: CertificateData[K]) => {
      setData(prev => ({ ...prev, [key]: value }));
      setIsGenerated(false); // Reset generation status on new input
  };
  
  const handleUserPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleDataChange('userPhoto', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (data.userName === initialData.userName || data.celebrityName === initialData.celebrityName || data.userPhoto === PLACEHOLDER_USER) {
      setError('Please enter your name, a celebrity name, and upload a photo.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [witnessStatement, celebrityPhoto] = await Promise.all([
        generateBatmanWitnessStatement(data.userName, data.celebrityName),
        generateCelebrityImage(data.celebrityName),
      ]);

      setData(prev => ({ ...prev, witnessStatement, celebrityPhoto }));
      setIsGenerated(true);

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (certificateRef.current === null) return;
    toPng(certificateRef.current, { cacheBust: true, pixelRatio: 2 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'ewed-certificate.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('oops, something went wrong!', err);
        setError("Failed to download certificate. Please try again.");
      });
  };

  const handleStartOver = () => {
    setData(initialData);
    setIsGenerated(false);
    setError(null);
    const fileInput = document.getElementById('user-photo') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 sm:p-8 flex flex-col items-center font-sans">
      <header className="text-center mb-8 w-full max-w-7xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          ewed
        </h1>
        <p className="text-gray-400 mt-2 text-lg">
          Create a (totally not legally binding) certificate of matrimony with your favorite star!
        </p>
      </header>
      
      <main className="w-full max-w-7xl flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-2xl border border-gray-700 lg:sticky lg:top-8">
          <InputForm
            data={data}
            onDataChange={handleDataChange}
            onUserPhotoChange={handleUserPhotoChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
        
        <div className="flex flex-col items-center gap-6">
          <Certificate ref={certificateRef} data={data} />
          {isGenerated && (
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <button
                    onClick={handleDownload}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300"
                >
                    Download Certificate
                </button>
                <button
                    onClick={handleStartOver}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300"
                >
                    Start Over
                </button>
            </div>
          )}
        </div>
      </main>

      {error && (
        <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md text-center max-w-md">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}
      
      <footer className="text-center text-gray-500 mt-12 text-sm w-full max-w-4xl">
        <p>This is for entertainment purposes only. The witness signature is not legally binding. Especially not from Batman.</p>
      </footer>
    </div>
  );
}

export default App;