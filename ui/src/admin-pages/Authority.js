import React, { useEffect, useState } from 'react';
import faviconImage from './indir.png';

const Authority = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const mockApiResponse = [
          { name: 'John', surname: 'Dode', department: 'Computer Science', numberOfVotes: 5 },
          { name: 'Jane', surname: 'Smith', department: 'Electrical Engineering', numberOfVotes: 8 },
          { name: 'Alice', surname: 'Johnson', department: 'Mechanical Engineering', numberOfVotes: 12 },
          // Add more student data here
        ];
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

  const handleRemoveAuthority = (student) => {
    console.log('Authority removed for:', student.name, student.surname);
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
              height: '300px',
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
              onClick={() => handleRemoveAuthority(student)}
            >
              Yetki Kaldır
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Authority;
