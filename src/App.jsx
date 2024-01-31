import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [file, setFile] = useState(null);
  const [flags, setFlags] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      await axios.post('https://stats-flag.onrender.com/update_data', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('File uploaded successfully!');
    } catch (error) {
      alert('An error occurred while uploading the file.');
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://stats-flag.onrender.com/get_flags');
      console.log(response.data);
      setFlags(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Upload File</h1>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit</button>

      <h1>Flags</h1>
      {flags !== null ? (
        <ul>
          <li>BORROWING_TO_REVENUE_FLAG: {flags['BORROWING_TO_REVENUE_FLAG']}</li>
          <li>ISCR_FLAG: {flags['ISCR_FLAG']}</li>
          <li>TOTAL_REVENUE_5CR_FLAG: {flags['TOTAL_REVENUE_5CR_FLAG']}</li>
        </ul>
      ) : null}
      <button onClick={fetchData}>Fetch Flags</button>
    </div>
  );
}

export default App
