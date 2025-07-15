import React from 'react';

export default function Import() {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (evt) => {
      const base64Data = evt.target.result; // כולל גם את ה-`data:...;base64,` בהתחלה

      console.log('📥 Base64 encoded file:', base64Data);

      try {
        const response = await fetch('http://localhost:5000/api/members/saveMembers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            file: base64Data,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert('✅ File uploaded successfully!');
          console.log('Server response:', data);
        } else {
          alert('❌ Upload failed: ' + data.message);
        }
      } catch (err) {
        console.error('Error uploading file:', err);
        alert('❌ Error uploading file');
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <a href="/excel/templateFile.xlsx" download>
        Download Excel Template
      </a>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        className="form-control w-auto mt-2"
      />
    </>
  );
}
