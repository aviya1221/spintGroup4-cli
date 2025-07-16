import React from 'react';

export default function Import() {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const fullDataUrl = evt.target.result;       // "data:…;base64,AAAA…"
      const base64Data  = fullDataUrl.split(',')[1];
      console.log(base64Data); // רק החלק אחרי ה‑prefix

      try {
        const response = await fetch('/api/members/saveMembers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ base64: base64Data }),
        });

        console.log('🛑 status:', response.status);

        if (!response.ok) {
          alert('❌ Upload failed: ' + ( response.statusText));
          return;
        }

        alert('✅ File uploaded!');
        console.log('✅ response:');
      } catch (err) {
        console.error('🚨 Error uploading file:', err);
        alert('❌ Error uploading file – בדוק קונסול');
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
