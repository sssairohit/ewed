import React, { forwardRef } from 'react';

interface CertificateData {
  userName: string;
  userPhoto: string;
  celebrityName: string;
  celebrityPhoto: string;
  witnessStatement: string;
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
    <div ref={ref} className="bg-amber-50 text-stone-800 p-6 md:p-10 shadow-2xl rounded-lg border-4 border-amber-900/50 w-full max-w-4xl mx-auto transform hover:scale-105 transition-transform duration-300">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-900 tracking-wider">
          Certificate of Matrimony
        </h1>
        <p className="text-stone-600 mt-2 italic">A Union Forged in Fate</p>
      </div>

      <div className="text-center text-stone-700 text-lg my-8">
        <p>This document hereby certifies that</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around gap-6 md:gap-12 my-8">
        <div className="text-center">
          <img
            src={data.userPhoto}
            alt={data.userName}
            className="rounded-full w-32 h-32 md:w-48 md:h-48 object-cover border-4 border-amber-800 shadow-lg mx-auto"
          />
          <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-stone-900">{data.userName}</h2>
        </div>
        
        <WeddingRingsIcon className="w-20 h-20 md:w-24 md:h-24 text-amber-800" />

        <div className="text-center">
          <img
            src={data.celebrityPhoto}
            alt={data.celebrityName}
            className="rounded-full w-32 h-32 md:w-48 md:h-48 object-cover border-4 border-amber-800 shadow-lg mx-auto"
          />
          <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-stone-900">{data.celebrityName}</h2>
        </div>
      </div>
      
      <div className="text-center text-stone-700 text-lg my-8">
        <p>were united in matrimony on this glorious day.</p>
      </div>

      <blockquote className="text-center italic text-stone-600 border-l-4 border-amber-300 pl-4 my-10 max-w-2xl mx-auto">
        "{data.witnessStatement}"
      </blockquote>
      
      <div className="mt-16 flex flex-col items-end">
        <div className="w-64 text-center">
            <p className="text-6xl text-stone-900 -mb-4">Batman</p>
            <hr className="border-t-2 border-stone-600"/>
            <p className="text-sm text-stone-600 mt-1">Witness, The Dark Knight</p>
        </div>
      </div>

    </div>
  );
});