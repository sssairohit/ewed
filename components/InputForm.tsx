
import React from 'react';

interface InputFormProps {
  celebrityName: string;
  setCelebrityName: (name: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ celebrityName, setCelebrityName, onSubmit, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-white mb-4">Customize Your Certificate</h2>
      <div>
        <label htmlFor="celebrity-name" className="block text-sm font-medium text-gray-300 mb-2">
          Enter Celebrity Name
        </label>
        <input
          id="celebrity-name"
          type="text"
          value={celebrityName}
          onChange={(e) => setCelebrityName(e.target.value)}
          placeholder="e.g., Keanu Reeves"
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md flex items-center justify-center transition-colors duration-300"
      >
        {isLoading ? (
            <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
            </>
        ) : (
          'Generate Certificate'
        )}
      </button>
    </form>
  );
};
