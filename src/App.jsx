import React from 'react';
import FormSection from './sections/FormSection';
import PreviewSection from './sections/PreviewSection';

function App() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          CV BUILDER PRO
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left Side: Editor */}
          <div className="sticky top-10">
            <FormSection />
          </div>

          {/* Right Side: Preview */}
          <div className="bg-slate-800/50 rounded-3xl p-4 overflow-hidden border border-white/5">
            <PreviewSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;