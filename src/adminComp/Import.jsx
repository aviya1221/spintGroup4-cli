import React, { useState } from 'react';

export default function Import() {
  const [file, setFile] = useState(null);
  const [base64, setBase64] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const fullDataUrl = evt.target.result;
      const base64Data = fullDataUrl.split(',')[1];
      setBase64(base64Data);
      setFile(selectedFile);
    };
    reader.readAsDataURL(selectedFile);
  };

  const uploadFile = async (endpoint) => {
    if (!base64) {
      alert('❌ No file selected');
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64 }),
      });

      console.log('🛑 Status:', response.status);

      if (!response.ok) {
        alert('❌ Upload failed: ' + (text || response.statusText));
        return;
      }
      alert('✅ File uploaded successfully!');
    } catch (err) {
      console.error('🚨 Error uploading file:', err);
      alert('❌ Error uploading file');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <h2>📄 Upload Member Excel File</h2>

      <div className="mb-3">
        <label className="form-label fw-bold">📥 Download Templates:</label>
        <div>
          <a
            href="/excel/templateFile.xlsx"
            className="btn btn-outline-primary me-2"
            download
          >
            Download Regular Members Template
          </a>
          <a
            href="/excel/linkedinTemplateFile.xlsx"
            className="btn btn-outline-success"
            download
          >
            Download LinkedIn Template
          </a>
        </div>
      </div>

      <div className="mb-3 mt-4">
        <label htmlFor="fileInput" className="form-label fw-bold">
          📂 Select Excel File:
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".xlsx,.xls,.ods"
          className="form-control"
          onChange={handleFileChange}
        />
        {file && (
          <div className="mt-2 text-success">
            ✅ Selected File: <strong>{file.name}</strong>
          </div>
        )}
      </div>

      <div className="d-flex gap-3 mt-4">
        <button
          className="btn btn-primary"
          onClick={() => uploadFile('/api/members/saveMembers')}
        >
          ➕ Upload as Regular Members
        </button>
        <button
          className="btn btn-success"
          onClick={() => uploadFile('/api/members/saveMembersFromLinkedinFile')}
        >
          🔗 Upload as LinkedIn Members
        </button>
      </div>
    </div>
  );
}
