import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudit } from '../hooks/useAudit';
import FileUpload from '../components/FileUpload';
import AttributeSelector from '../components/AttributeSelector';
import { Check, Loader2 } from 'lucide-react';

const Upload = () => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);
  const { runAnalysis, loading, error } = useAudit();
  const navigate = useNavigate();

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const firstLine = text.split('\n')[0];
        setColumns(firstLine.split(',').map(c => c.trim()));
        setStep(2);
      };
      reader.readAsText(selectedFile);
    } else {
      setStep(1);
    }
  };

  const handleConfirm = async ({ sensitiveColumns, outcomeColumn, domain }) => {
    try {
      setStep(3); // Loading state
      const result = await runAnalysis(file, domain, sensitiveColumns, outcomeColumn);
      navigate(`/dashboard/${result.audit_id}`);
    } catch (err) {
      setStep(2);
      console.error(err);
    }
  };

  const steps = [
    { id: 1, name: 'Upload Data' },
    { id: 2, name: 'Configure' },
    { id: 3, name: 'Analyze' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Step Indicator */}
      <div className="mb-12">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold transition-colors 
                ${step > s.id ? 'bg-green-500 text-white' : step === s.id ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {step > s.id ? <Check className="h-6 w-6" /> : s.id}
              </div>
              <span className={`text-xs mt-2 font-medium ${step === s.id ? 'text-primary-600' : 'text-gray-500'}`}>{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Upload Your Dataset</h2>
            <p className="text-gray-600">Select the CSV file you want to audit for AI bias.</p>
          </div>
          <FileUpload onFileSelect={handleFileSelect} selectedFile={file} />
        </div>
      )}

      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Define Parameters</h2>
              <p className="text-gray-600">Tell us what to analyze in "{file?.name}"</p>
            </div>
            <button onClick={() => setStep(1)} className="text-sm text-primary-600 font-medium hover:underline">Change File</button>
          </div>
          <AttributeSelector columns={columns} onConfirm={handleConfirm} />
        </div>
      )}

      {step === 3 && (
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
          <Loader2 className="h-16 w-16 text-primary-600 animate-spin mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Dataset for Bias...</h2>
          <p className="text-gray-600 max-w-md">
            Our AI engine is processing your metrics and generating localized India-context insights. This typically takes 10-15 seconds.
          </p>
        </div>
      )}

      {error && step !== 3 && (
        <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default Upload;
