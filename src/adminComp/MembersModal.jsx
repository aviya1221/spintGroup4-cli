import React, { useEffect, useState } from 'react';
import { Modal, Button, ListGroup, Spinner, Alert } from 'react-bootstrap';

export default function MembersModal({ group_id, onClose, show }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!group_id || !show) return;

      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/members/getMembersByGroupId/1/${group_id}`);
        if (!res.ok) throw new Error('Failed to fetch members');
        const data = await res.json();
        setMembers(data);
      } catch (err) {
        console.error(err);
        setError('Could not load members.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [group_id, show]);

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Members in Biggest Group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : members.length > 0 ? (
          <ListGroup>
            {members.slice(0, 7).map((m) => (
              <ListGroup.Item key={m.member_id}>
                <strong>{m.english_name}</strong> — {m.city}, {m.role}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No members found for this group.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
