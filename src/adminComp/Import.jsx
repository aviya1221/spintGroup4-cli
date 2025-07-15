import React from 'react';

export default function Import() {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const base64Data = evt.target.result;

      console.log('📥 Base64 encoded file:', base64Data);
      alert('File loaded and encoded as Base64 successfully!');

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
        accept=".xlsx,.xls,.odc"
        onChange={handleFileUpload}
        className="form-control w-auto"
      />
    </>
  );
}
