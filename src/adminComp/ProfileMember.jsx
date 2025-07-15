import { Modal, Button } from 'react-bootstrap';
import adminStore from '../assets/mangerStore';

export default function ProfileMember() {
  const { selctedRowId, setSelctedRowId } = adminStore();

  const rows = [
    { id: 1, full_name: "Alice Johnson", phone: "052-1234567", email: "alice@example.com", city: "Tel Aviv", role: "Frontend", experience: 3 },
    { id: 2, full_name: "Bob Smith", phone: "050-9876543", email: "bob@example.com", city: "Jerusalem", role: "Backend", experience: 5 },
    { id: 3, full_name: "Charlie Brown", phone: "053-5678910", email: "charlie@example.com", city: "Haifa", role: "DevOps", experience: 2 },
    { id: 4, full_name: "Dana Levi", phone: "054-1122334", email: "dana@example.com", city: "Be'er Sheva", role: "QA", experience: 4 },
    { id: 5, full_name: "Eli Cohen", phone: "058-4455667", email: "eli@example.com", city: "Netanya", role: "Product", experience: 6 },
  ];

  const selectedRow = rows.find(row => row.id === selctedRowId);

  return (
    <Modal show={selctedRowId > 0} onHide={() => setSelctedRowId(0)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{selectedRow?.full_name || 'Loading...'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedRow && (
          <>
            <p>Phone: {selectedRow.phone}</p>
            <p>Email: {selectedRow.email}</p>
            <p>City: {selectedRow.city}</p>
            <p>Role: {selectedRow.role}</p>
            <p>Experience: {selectedRow.experience} years</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setSelctedRowId(0)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
