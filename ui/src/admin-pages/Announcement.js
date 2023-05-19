import React from 'react';

const Announcement = () => {
  return (
    <div>
      <h2 style={{ textAlign: 'center', marginTop:'50px', fontSize: '36px', fontWeight: "bold" }}>Duyuru Yap</h2>
      <div className="bg-red-700" style={{ padding: '20px', width: '500px', margin: '0 auto', marginTop: '50px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input type="text" placeholder="Duyuru Başlığı" style={{ marginBottom: '20px', width:'400px', paddingTop: '5px', paddingBottom: '5px', textAlign: 'center' }} />
          <textarea rows={7} placeholder="Duyuru İçeriği" style={{ marginBottom: '20px', width:'400px', paddingTop: '5px', paddingBottom: '5px' }} />
          <button style={{ backgroundColor: 'gray', color: 'white', width: '100px', height: '30px', alignSelf: 'center' }}>Gönder</button>
        </div>
      </div>
    </div>
  );
}

export default Announcement;
