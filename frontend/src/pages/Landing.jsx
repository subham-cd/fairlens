import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, MessageSquare, Globe, ArrowRight } from 'lucide-react';

const Landing = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
              Is Your AI Treating <span className="text-primary-600">Everyone Fairly?</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              FairLens detects hidden bias in your datasets and AI models — no coding required. 
              Built specifically for the Indian context (Caste, Religion, Language, and more).
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/upload" className="btn-primary px-8 py-4 text-lg flex items-center justify-center gap-2">
                Audit Your Dataset Free <ArrowRight className="h-5 w-5" />
              </Link>
              <a href="#how-it-works" className="btn-secondary px-8 py-4 text-lg">
                How It Works
              </a>
            </div>
          </div>
        </div>
        
        {/* Background blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-6">
              <div className="bg-primary-100 h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Detect Hidden Bias</h3>
              <p className="text-gray-600">Automatically measure demographic parity and equalized odds across protected Indian attributes.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-100 h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Explainable Insights</h3>
              <p className="text-gray-600">Get plain-English explanations of why bias exists and how it impacts your compliance status.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Actionable Fixes</h3>
              <p className="text-gray-600">Receive specific technical and process suggestions to mitigate discrimination in your systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Three Steps to a Fairer System</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Upload CSV', desc: 'Drag and drop your dataset. We support local and cloud storage.' },
              { step: '02', title: 'Configure Attributes', desc: 'Select which columns represent sensitive groups and your target outcome.' },
              { step: '03', title: 'Get Your Audit', desc: 'Receive a comprehensive bias report and compliance-ready PDF.' }
            ].map((s, i) => (
              <div key={i} className="relative p-8 border border-gray-100 rounded-2xl bg-white shadow-sm">
                <span className="text-6xl font-black text-gray-50 absolute top-4 right-4">{s.step}</span>
                <h4 className="text-xl font-bold text-gray-900 mb-2 relative z-10">{s.title}</h4>
                <p className="text-gray-600 relative z-10">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-8 w-8 text-primary-400" />
              <span className="text-2xl font-bold">FairLens</span>
            </div>
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <span>Built for Sustainable Development Goal 10 (Reduced Inequalities)</span>
              <Globe className="h-5 w-5" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
