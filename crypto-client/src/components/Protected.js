import React, { useEffect, useState } from 'react';
import { getProtected } from '../api/api';

const Protected = ({ token }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const result = await getProtected(token);
        setData(result);
      };
      fetchData();
    }
  }, [token]);

  if (!token) {
    return <div>Du måste vara inloggad för att se den här sidan.</div>;
  }

  return (
    <div>
      <h2>Skyddad information</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Protected;