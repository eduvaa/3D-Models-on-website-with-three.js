"use client";

import React, { useState, useEffect } from "react";

interface Model {
  id: string;
  filename: string;
}

interface Props {
  onModelSelect: (id: string) => void;
}

const ModelButtons: React.FC<Props> = ({ onModelSelect }) => {
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("/api/test");
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
  
        const data = await response.json();
        console.log("Fetched models:", data);
  
        setModels(data);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };
  
    fetchModels();
  }, []);
  

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {models.map((model) => (
        <button
          key={model.id}
          onClick={() => onModelSelect(model.id)}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 min-w-[120px] px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm md:text-base bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition-all break-words"
        >
        {model.filename}
        </button>

      ))}
    </div>
  );
  
};

export default ModelButtons;
