
import React, { useState, useCallback } from 'react';
import { Certificate } from './components/Certificate';
import { InputForm } from './components/InputForm';
import { generateBatmanWitnessStatement } from './services/geminiService';

interface CertificateData {
  userName: string;
  userPhoto: string;
  celebrityName: string;
  celebrityPhoto: string;
  witnessStatement: string;
}

const App: React.FC = () => {
  const [celebrityInput, setCelebrityInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [certificateData, setCertificateData] = useState<CertificateData>({
    userName: "Your Name",
    userPhoto: `https://picsum.photos/seed/you/400/400`,
    celebrityName: "A Celebrity",
    celebrityPhoto: `https://picsum.photos/seed/celebrity/400/400`,
    witnessStatement: "In the shadows of Gotham, I have observed this union. It is a beacon in the night. This bond is now under my watch. Justice has been served.",
  });

  const handleGenerateCertificate = useCallback(async () => {
    if (!celebrityInput.trim()) {
      setError('Please enter a celebrity name.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const statement = await generateBatmanWitnessStatement("Your Name", celebrityInput);
      setCertificateData({
        userName: "Your Name",
        userPhoto: `https://picsum.photos/seed/you/400/400`,
        celebrityName: celebrityInput,
        celebrityPhoto: `https://picsum.photos/seed/${encodeURIComponent(celebrityInput)}/400/400`,
        witnessStatement: statement,
      });
    } catch (err) {
      console.error(err);
      setError('Failed to generate witness statement. The shadows are unforgiving today.');
    } finally {
      setIsLoading(false);
    }
  }, [celebrityInput]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">E-Wed Certificate Generator</h1>
        <p className="text-gray-400 mt-2">Create your dream marriage certificate, witnessed by the Dark Knight himself.</p>
      </header>
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        <main className="w-full lg:w-2/3 flex items-center justify-center">
          <Certificate data={certificateData} />
        </main>
        <aside className="w-full lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-xl h-fit">
          <InputForm
            celebrityName={celebrityInput}
            setCelebrityName={setCelebrityInput}
            onSubmit={handleGenerateCertificate}
            isLoading={isLoading}
          />
          {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
        </aside>
      </div>
       <footer className="text-center mt-8 text-gray-500 text-sm">
        <p>This is for entertainment purposes only. Not a legally binding document.</p>
        <p>Photos are placeholders from picsum.photos.</p>
      </footer>
    </div>
  );
};

export default App;
