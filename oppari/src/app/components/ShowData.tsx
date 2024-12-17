'use client';

import React, { useEffect, useState } from 'react';

const ShowData: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/test');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json(); // Odottaa JSON-muotoista dataa
        setData(result);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error.message || 'An unknown error occurred');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Database Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {Object.entries(item).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {String(value)}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowData;
