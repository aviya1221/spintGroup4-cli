import { Modal, Button } from 'react-bootstrap';
import React, { useState, useEffect } from "react";

export default function ProfileMember({ memberId, onClose }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [groups, setGroups] = useState([]);
  const [events, setEvents] = useState([]);
  const [historyWork, setHistoryWork] = useState([]);
  const [groupsFetched, setGroupsFetched] = useState(false);
  const [eventsFetched, setEventsFetched] = useState(false);
  const [historyWorkFetched, setHistoryWorkFetched] = useState(false);
  // Fetch main member details
  useEffect(() => {
    const fetchMemberById = async (id) => {
      try {
        const response = await fetch(`/api/members/getMemberById/${id}`);
        if (response.ok) {
          const data = await response.json();
          setSelectedRow(data);
        } else {
          console.error("❌ Failed to fetch member. Status:", response.status);
        }
      } catch (err) {
        console.error("🛑 Network error:", err);
      }
    };

    if (memberId) {
      fetchMemberById(memberId);
      // Reset extra sections when opening modal
      setGroups([]);
      setEvents([]);
      setHistoryWork([]);
    }
  }, [memberId]);

  // Fetch groups
  const fetchGroups = async () => {
    try {
      setGroupsFetched(true);
      const res = await fetch(`/api/groups/getGroupsById/${memberId}`);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setGroups(data);
      } else {
        console.error("Failed to fetch groups");
      }
    } catch (err) {
      console.error("Error fetching groups:", err);
    }
  };

  // Fetch events
  const fetchEvents = async () => {
    try {
      setEventsFetched(true);
      const res = await fetch(`/api/event/getEventsById/${memberId}`);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setEvents(data);
      } else {
        console.error("Failed to fetch events");
      }
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  // Fetch work history
  const fetchHistoryWork = async () => {
    try {
      setHistoryWorkFetched(true);
      const res = await fetch(`/api/company/getHistoryWork/${memberId}`);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setHistoryWork(data);
      } else {
        console.error("Failed to fetch work history");
      }
    } catch (err) {
      console.error("Error fetching work history:", err);
    }
  };

  return (
    <Modal show={true} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{selectedRow?.full_name || "Loading..."}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {selectedRow ? (
          <>
            <img
              src={selectedRow.picture}
              alt="Profile"
              style={{ width: "100px", borderRadius: "50%", marginBottom: "1rem" }}
            />
            <p><strong>Phone:</strong> {selectedRow.phone || "N/A"}</p>
            <p><strong>Email:</strong> {selectedRow.email || "N/A"}</p>
            <p><strong>City:</strong> {selectedRow.city}</p>
            <p><strong>Role:</strong> {selectedRow.role}</p>
            <p><strong>Company:</strong> {selectedRow.current_company}</p>
            <p><strong>Experience:</strong> {selectedRow.years_of_experience} years</p>
            <p><strong>LinkedIn:</strong> <a href={selectedRow.linkedin_url} target="_blank" rel="noreferrer">Profile</a></p>
            <p><strong>Skills:</strong> {selectedRow.skills}</p>
            <p><strong>Additional Info:</strong> {selectedRow.additional_info}</p>

            <hr />
            <div className="d-flex gap-2 mb-3 flex-wrap">
              <Button variant="primary" onClick={fetchGroups}>Show Groups</Button>
              <Button variant="success" onClick={fetchEvents}>Show Events</Button>
              <Button variant="warning" onClick={fetchHistoryWork}>Show Work History</Button>
            </div>

 {groupsFetched ? (
              groups.length > 0 ? (
                <>
                  <h5>Groups</h5>
                  <ul>
                    {groups.map((g, i) => (
                      <li key={i}>{g.group_name}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <p><em>No groups found.</em></p>
              )
            ) : null}

            {eventsFetched ? (
              events.length > 0 ? (
                <>
                  <h5>Events</h5>
                  <ul>
                    {events.map((e, i) => (
                      <li key={i}>{e.subject}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <p><em>No events found.</em></p>
              )
            ) : null}

            {historyWorkFetched ? (
              historyWork.length > 0 ? (
                <>
                  <h5>Work History</h5>
                  <ul>
                    {historyWork.map((h, i) => (
                      <li key={i}>
                        {h.company_name} — {h.months_of_experience} months
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p><em>No work history available.</em></p>
              )
            ) : null}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
