import React, { useState } from 'react';

const Announcement = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSendData = () => {
    // Simulating sending data to the backend
    const data = {
      title: title,
      content: content
    };

    // Replace this with your actual API call to send data to the backend
    // axios.post('/api/announcement', data)
    //   .then(response => {
    //     // Handle successful response
    //   })
    //   .catch(error => {
    //     // Handle error
    //   });
    
    console.log(data); // For demonstration purposes
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginTop:'50px', fontSize: '36px', fontWeight: "bold" }}>Duyuru Yap</h2>
      <div className="bg-red-700" style={{ padding: '20px', width: '500px', margin: '0 auto', marginTop: '50px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input type="text" placeholder="Duyuru Başlığı" style={{ marginBottom: '20px', width:'400px', paddingTop: '5px', paddingBottom: '5px', textAlign: 'center' }} onChange={handleTitleChange} />
          <textarea rows={7} placeholder="Duyuru İçeriği" style={{ marginBottom: '20px', width:'400px', paddingTop: '5px', paddingBottom: '5px' }} onChange={handleContentChange} />
          <button style={{ backgroundColor: 'gray', color: 'white', width: '100px', height: '30px', alignSelf: 'center' }} onClick={handleSendData}>Gönder</button>
        </div>
      </div>
    </div>
  );
}

export default Announcement;
