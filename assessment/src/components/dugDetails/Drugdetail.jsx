import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DrugDetail = () => {
  const { drugName } = useParams();
  const [drugDetail, setDrugDetail] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDrugDetail = async () => {
      try {
        const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=aspirin`);
        if (response.data) {
          setDrugDetail(response.data);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    };
    fetchDrugDetail();
  }, [drugName]);

  if (error) {
    return <div className="text-center text-red-600">Drug Not Found</div>;
  }

  return (
    <div className="max-w-lg mx-auto">
      {drugDetail ? (
        <div>
          <h1 className="text-2xl font-bold">{drugDetail.name}</h1>
          <p>{drugDetail.description}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default DrugDetail;
