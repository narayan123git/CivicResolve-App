
import React, { useState, useRef, useContext } from 'react';
import type { Report } from '../types';
import { ReportCategory, ReportPriority } from '../types';
import { CATEGORIES, ICONS } from '../constants';
import Spinner from './Spinner';
import { analyzeIssueWithAI } from '../services/geminiService';
import { ReportContext } from '../App';

interface ReportFormProps {
  onFormSubmit: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onFormSubmit }) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ReportCategory>(ReportCategory.Other);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { addReport } = useContext(ReportContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.onerror = error => reject(error);
      });
  };

  const handleAIAnalyze = async () => {
    if (!description.trim()) {
      setError("Please provide a description before using AI analysis.");
      return;
    }
    setError(null);
    setIsAnalyzing(true);
    try {
        const imageBase64 = image ? await fileToBase64(image) : null;
        const result = await analyzeIssueWithAI(description, imageBase64);
        setCategory(result.category);
        // We could also set a title and priority from the result if the form had those fields.
    } catch (err) {
      setError("AI analysis failed. Please select a category manually.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !image) {
      setError('Please provide a description and an image.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    // In a real app, you'd get real coordinates
    const mockLocation = { lat: 34.0522 + (Math.random() - 0.5) * 0.1, lng: -118.2437 + (Math.random() - 0.5) * 0.1 };
    
    // AI analysis to get title and priority if not already done
    const aiResult = await analyzeIssueWithAI(description, image ? await fileToBase64(image) : null);

    const newReport: Omit<Report, 'id' | 'status' | 'submittedAt' | 'resolvedAt'> = {
      title: aiResult.title,
      description,
      category,
      priority: aiResult.priority,
      location: mockLocation,
      imageUrl: imagePreview!, // We know this is set if image is present
      submittedBy: 'Demo User',
    };

    try {
      await addReport(newReport);
      onFormSubmit();
    } catch (err) {
      setError('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Issue Photograph
        </label>
        <div className="mt-1 flex items-center space-x-4">
          <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50">
            {imagePreview ? (
              <img src={imagePreview} alt="Issue preview" className="h-full w-full object-cover rounded-md" />
            ) : (
              <span className="text-gray-500">Image Preview</span>
            )}
          </div>
        </div>
        <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            Upload Photo
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          ref={fileInputRef}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe the issue you see..."
        />
      </div>
      
      <div className="space-y-2">
          <button
            type="button"
            onClick={handleAIAnalyze}
            disabled={isAnalyzing || !description}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isAnalyzing ? <Spinner /> : ICONS.ai}
            {isAnalyzing ? 'Analyzing...' : 'Categorize with AI'}
          </button>
          <p className="text-xs text-center text-gray-500">Requires a description.</p>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as ReportCategory)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting || isAnalyzing}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isSubmitting ? <Spinner /> : 'Submit Report'}
        </button>
      </div>
    </form>
  );
};

export default ReportForm;
