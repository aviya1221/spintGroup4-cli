import React, { useEffect, useState } from 'react';
import { Modal, Button, ListGroup, Spinner, Alert } from 'react-bootstrap';

export default function GroupsModal({ onClose, show }) {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('/api/groups/getAllGroups');
        if (!response.ok) throw new Error('Failed to fetch groups');
        const data = await response.json();
        setGroups(data);
      } catch (err) {
        setError('Could not load groups.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (show) fetchGroups();
  }, [show]);

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>All Groups</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        )}
        {error && <Alert variant="danger">{error}</Alert>}
        {!loading && !error && (
          <ListGroup>
            {groups.map((group) => (
              <ListGroup.Item key={group.group_id}>
                <strong>{group.group_name}</strong>
              </ListGroup.Item>
            ))}
          </ListGroup>
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
