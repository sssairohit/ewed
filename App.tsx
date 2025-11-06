import React, { useState, useCallback, useRef } from 'react';
import { Certificate } from './components/Certificate';
import { InputForm } from './components/InputForm';
import { generateBatmanWitnessStatement, generateCelebrityImage } from './services/geminiService';

// Let TypeScript know html2canvas is available globally
declare const html2canvas: any;

interface CertificateData {
  userName: string;
  userPhoto: string;
  celebrityName: string;
  celebrityPhoto: string;
  witnessStatement: string;
}

const App: React.FC = () => {
  const [celebrityInput, setCelebrityInput] = useState<string>('');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const certificateRef = useRef<HTMLDivElement>(null);

  const defaultUserPhoto = `https://picsum.photos/seed/you/400/400`;

  const [certificateData, setCertificateData] = useState<CertificateData>({
    userName: "Your Name",
    userPhoto: defaultUserPhoto,
    celebrityName: "A Celebrity",
    celebrityPhoto: `https://picsum.photos/seed/celebrity/400/400`,
    witnessStatement: "In the shadows of Gotham, I have observed this union. It is a beacon in the night. This bond is now under my watch. Justice has been served.",
  });

  const handleUserPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhoto(reader.result as string);
        // Also update the certificate in real-time
        setCertificateData(prev => ({ ...prev, userPhoto: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateCertificate = useCallback(async () => {
    if (!celebrityInput.trim()) {
      setError('Please enter a celebrity name.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Generate statement and image in parallel
      const [statement, celebrityPhotoUrl] = await Promise.all([
        generateBatmanWitnessStatement("Your Name", celebrityInput),
        generateCelebrityImage(celebrityInput)
      ]);
      
      setCertificateData({
        userName: "Your Name",
        userPhoto: userPhoto || defaultUserPhoto,
        celebrityName: celebrityInput,
        celebrityPhoto: celebrityPhotoUrl,
        witnessStatement: statement,
      });
    } catch (err) {
      console.error(err);
      setError('Failed to generate certificate details. The shadows are unforgiving today.');
    } finally {
      setIsLoading(false);
    }
  }, [celebrityInput, userPhoto, defaultUserPhoto]);

  const handleDownload = () => {
    if (certificateRef.current) {
      html2canvas(certificateRef.current, {
        backgroundColor: null, // Use transparent background
        scale: 2, // Increase resolution for better quality
      }).then((canvas: HTMLCanvasElement) => {
        const link = document.createElement('a');
        link.download = 'e-wed-certificate.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">E-Wed Certificate Generator</h1>
        <p className="text-gray-400 mt-2">Create your dream marriage certificate, witnessed by the Dark Knight himself.</p>
      </header>
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        <main className="w-full lg:w-2/3 flex flex-col items-center justify-center gap-6">
          <div id="printable-area">
            <Certificate ref={certificateRef} data={certificateData} />
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Download Certificate
            </button>
            <button 
              onClick={handlePrint}
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Print Certificate
            </button>
          </div>
        </main>
        <aside className="w-full lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-xl h-fit">
          <InputForm
            celebrityName={celebrityInput}
            setCelebrityName={setCelebrityInput}
            onUserPhotoChange={handleUserPhotoChange}
            userPhotoPreview={userPhoto}
            onSubmit={handleGenerateCertificate}
            isLoading={isLoading}
          />
          {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
        </aside>
      </div>
       <footer className="text-center mt-8 text-gray-500 text-sm">
        <p>This is for entertainment purposes only. Not a legally binding document.</p>
        <p>Celebrity photos are AI-generated. Your photo is from your upload or a placeholder.</p>
      </footer>
    </div>
  );
};

export default App;