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
    <div>
      {models.map((model) => (
        <button
          key={model.id}
          onClick={() => onModelSelect(model.id)}
          style={{
            margin: "5px",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {model.filename}
        </button>
      ))}
    </div>
  );
};

export default ModelButtons;
