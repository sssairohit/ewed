import React, { forwardRef } from 'react';

interface CertificateData {
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

interface CertificateProps {
  data: CertificateData;
}

const WeddingRingsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="9" cy="12" r="7" />
      <circle cx="15" cy="12" r="7" />
    </svg>
);

export const Certificate = forwardRef<HTMLDivElement, CertificateProps>(({ data }, ref) => {
  return (
    <div ref={ref} className="bg-amber-50 text-stone-800 p-6 md:p-10 shadow-2xl rounded-lg border-4 border-amber-900/50 w-full max-w-6xl mx-auto transform hover:scale-105 transition-transform duration-300">
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-900 tracking-wider font-serif">
          Certificate of Matrimony
        </h1>
        <p className="text-stone-600 mt-2 italic">A Union Forged in Fate</p>
      </div>

      <div className="text-center text-stone-700 text-lg my-6">
        <p>This document hereby certifies that</p>
      </div>

      <div className="flex flex-row items-center justify-around gap-4 md:gap-8 my-8">
        <div className="text-center flex-1">
          <img
            src={data.userPhoto}
            alt={data.userName}
            className="rounded-full w-24 h-24 md:w-40 md:h-40 object-cover border-4 border-amber-800 shadow-lg mx-auto"
          />
          <h2 className={`text-2xl md:text-3xl font-semibold mt-4 text-stone-900 ${data.nameFont}`}>{data.userName}</h2>
        </div>
        
        <WeddingRingsIcon className="w-16 h-16 md:w-20 md:h-20 text-amber-800 flex-shrink-0" />

        <div className="text-center flex-1">
          <img
            src={data.celebrityPhoto}
            alt={data.celebrityName}
            className="rounded-full w-24 h-24 md:w-40 md:h-40 object-cover border-4 border-amber-800 shadow-lg mx-auto"
          />
          <h2 className={`text-2xl md:text-3xl font-semibold mt-4 text-stone-900 ${data.nameFont}`}>{data.celebrityName}</h2>
        </div>
      </div>
      
      <div className="text-center text-stone-700 text-lg my-6">
        <p>were united in matrimony on this glorious day, sealing their union with these vows.</p>
      </div>

      <div className="my-8 border-t border-b border-amber-300 py-6 px-4">
        <div className="flex flex-row gap-8 justify-center text-center">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-stone-800 mb-2">{data.userName}'s Vows</h3>
            <p className={`italic text-stone-600 ${data.vowsFont}`}>"{data.userVows}"</p>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-stone-800 mb-2">{data.celebrityName}'s Vows</h3>
            <p className={`italic text-stone-600 ${data.vowsFont}`}>"{data.celebrityVows}"</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end mt-12 gap-8">
        <blockquote className="text-left italic text-stone-600 border-l-4 border-amber-300 pl-4 max-w-xl">
          "{data.witnessStatement}"
        </blockquote>
        
        <div className="w-64 text-center flex-shrink-0">
            <p className="font-script text-6xl text-stone-900 -mb-4">Batman</p>
            <hr className="border-t-2 border-stone-600"/>
            <p className="text-sm text-stone-600 mt-1">Witness, The Dark Knight</p>
        </div>
      </div>

    </div>
  );
});