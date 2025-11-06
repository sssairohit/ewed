import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { InputForm } from './components/InputForm';
import { Certificate } from './components/Certificate';
import { generateBatmanWitnessStatement, generateCelebrityImage } from './services/geminiService';

interface CertificateData {
  userName: string;
  userPhoto: string;
  celebrityName: string;
  celebrityPhoto: string;
  witnessStatement: string;
  userVows: string;
  celebrityVows: string;
}

function App() {
  const [userName, setUserName] = useState('');
  const [celebrityName, setCelebrityName] = useState('');
  const [userPhotoPreview, setUserPhotoPreview] = useState<string | null>(null);
  const [userVows, setUserVows] = useState('');
  const [celebrityVows, setCelebrityVows] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);

  const certificateRef = useRef<HTMLDivElement>(null);

  const handleUserPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!userName || !celebrityName || !userPhotoPreview || !userVows || !celebrityVows) {
      setError('Please fill out all fields and upload a photo.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setCertificateData(null);

    try {
      const [witnessStatement, celebrityPhoto] = await Promise.all([
        generateBatmanWitnessStatement(userName, celebrityName),
        generateCelebrityImage(celebrityName),
      ]);

      setCertificateData({
        userName,
        userPhoto: userPhotoPreview,
        celebrityName,
        celebrityPhoto,
        witnessStatement,
        userVows,
        celebrityVows,
      });

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (certificateRef.current === null) {
      return;
    }

    toPng(certificateRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'marriage-certificate.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('oops, something went wrong!', err);
        setError("Failed to download certificate. Please try again.");
      });
  };

  const handleStartOver = () => {
    setCertificateData(null);
    setUserName('');
    setCelebrityName('');
    setUserPhotoPreview(null);
    setUserVows('');
    setCelebrityVows('');
    setError(null);
    // Also reset file input
    const fileInput = document.getElementById('user-photo') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 sm:p-8 flex flex-col items-center font-sans">
      <header className="text-center mb-8 w-full max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          AI Celebrity Marriage Certificate
        </h1>
        <p className="text-gray-400 mt-2 text-lg">
          Create a (totally not legally binding) certificate of matrimony with your favorite star!
        </p>
      </header>
      
      <main className="w-full max-w-4xl flex-grow flex flex-col justify-center">
        {!certificateData ? (
          <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-2xl border border-gray-700">
            <InputForm
              userName={userName}
              setUserName={setUserName}
              celebrityName={celebrityName}
              setCelebrityName={setCelebrityName}
              onUserPhotoChange={handleUserPhotoChange}
              userPhotoPreview={userPhotoPreview}
              userVows={userVows}
              setUserVows={setUserVows}
              celebrityVows={celebrityVows}
              setCelebrityVows={setCelebrityVows}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8">
            <Certificate ref={certificateRef} data={certificateData} />
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <button
                    onClick={handleDownload}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
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
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md text-center">
            <p><strong>Error:</strong> {error}</p>
          </div>
        )}
      </main>
      
      <footer className="text-center text-gray-500 mt-12 text-sm w-full max-w-4xl">
        <p>This is for entertainment purposes only. The witness signature is not legally binding. Especially not from Batman.</p>
      </footer>
    </div>
  );
}

export default App;
