import React, { useEffect, useState } from 'react';
import faviconImage from './indir.png';

const Result = () => {
  const [students, setStudents] = useState([]);
  const [showOnMap, setShowOnMap] = useState(false);

  useEffect(() => {
    // Fetching data from the API is disabled for testing purposes
    // Replace this code with your API call when the API is working

    /*
      const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/admin/candidates/winners');
        const apiStudents = response.data;
     */
    
    const fetchData = async () => {
      try {
        // Simulating the API response with a delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // Replace this with your API response data structure
        const mockApiResponse = [
          { name: 'John', surname: 'Dode', department: 'Computer Science', numberOfVotes: 5 },
          { name: 'Jane', surname: 'Smith', department: 'Electrical Engineering', numberOfVotes: 8 },
          { name: 'Alice', surname: 'Johnson', department: 'Mechanical Engineering', numberOfVotes: 12 },
          // Add more student data here
        ];

        // Add missing students if necessary
        const missingStudentCount = 16 - mockApiResponse.length;
        const missingStudents = Array.from({ length: missingStudentCount }, (_, index) => ({
          name: `Missing Student ${index + 1}`,
          surname: '',
          department: 'Unknown',
          numberOfVotes: 0,
        }));
        const allStudents = [...mockApiResponse, ...missingStudents];
        setStudents(allStudents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleShowOnMap = () => {
    // Perform any backend-related actions with the `showOnMap` boolean value
    // For now, we'll just toggle the state locally
    setShowOnMap(!showOnMap);
  };

  return (
    <div>
      <div
        style={{
          padding: '20px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {students.map((student, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              width: '200px',
              height: '250px',
              padding: '1rem',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9',
              margin: '0.5rem',
            }}
          >
            <img
              src={faviconImage}
              alt="Student"
              style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }}
            />
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: 0, fontWeight: 'bold' }}>{student.department || 'Department'}</p>
              <p style={{ margin: 0 }}>{student.name || 'Name'} {student.surname || 'Surname'}</p>
              <p style={{ margin: 0 }}>Number of Votes: {student.numberOfVotes}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          style={{
            backgroundColor: 'red',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          onClick={handleShowOnMap}
        >
          Haritada Göster
        </button>
      </div>
    </div>
  );
};

export default Result;
