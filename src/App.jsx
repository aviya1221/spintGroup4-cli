import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { CvUploadProvider } from "./userComp/userButtons/Upload_CV"; // 👈 אל תשכח לייבא

function App() {
  return (
    <BrowserRouter>
      <CvUploadProvider> {/* 👈 זה העטיפה החשובה */}
        <Layout />
      </CvUploadProvider>
    </BrowserRouter>
  );
}

export default App;
