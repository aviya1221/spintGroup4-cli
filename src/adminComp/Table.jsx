import React, { useState, useEffect, useRef } from "react";
import ProfileMember from "./ProfileMember";
import "./Table.css";

export default function Table() {
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [allRows, setAllRows] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 7;
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [rowCount, setRowCount] = useState(0);
  const searchTimeout = useRef(null);
  const fetchGroups = async () => {
    try {
      const res = await fetch("/api/groups/getAllGroups");
      if (!res.ok) throw new Error("Failed to fetch groups");
      const data = await res.json();
      setGroups(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);
  const fetchPaginatedMembers = async (page) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/members/getPageMembers/${page}`);
      if (!res.ok) throw new Error("Failed to fetch paginated members");
      const members = await res.json();

      const countRes = await fetch("/api/members/getCountMembers");
      if (!countRes.ok) throw new Error("Failed to fetch count");
      const count = await countRes.json();

      setAllRows(members.map((m) => ({ ...m, id: m.member_id })));
      setRowCount(count);
    } catch (err) {
      console.error(err);
      setAllRows([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };
  const fetchMembersByGroups = async (groupIds) => {
    setLoading(true);
    try {
      const res = await fetch("/api/groups/getAllMembersThatBelongTo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(groupIds),
      });
      if (!res.ok) throw new Error("Failed to fetch members by groups");
      const members = await res.json();

      setAllRows(members.map((m) => ({ ...m, id: m.member_id })));
      setRowCount(members.length);
    } catch (err) {
      console.error(err);
      setAllRows([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembersBySearch = async (searchWord, page) => {
    if (searchWord.length < 3) {
      setPage(0);
      fetchPaginatedMembers(0);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/members/getMemberInclude/${encodeURIComponent(searchWord)}`);
      if (!res.ok) throw new Error("Failed to fetch search results");
      const members = await res.json();

      setAllRows(members.map((m) => ({ ...m, id: m.member_id })));
      setRowCount(members.length);
    } catch (err) {
      console.error(err);
      setAllRows([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (selectedGroups.length > 0) {
      fetchMembersByGroups(selectedGroups);
      setPage(0);
    } else if (input.trim().length >= 3) {
      fetchMembersBySearch(input.trim(), page);
    } else {
      fetchPaginatedMembers(page);
    }
  }, [page, selectedGroups]);
  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(() => {
      setPage(0);
      if (selectedGroups.length === 0) {
        if (input.trim().length >= 3) {
          fetchMembersBySearch(input.trim(), 0);
        } else {
          fetchPaginatedMembers(0);
        }
      }
    }, 400);

    return () => clearTimeout(searchTimeout.current);
  }, [input]);

  const displayedRows =
    selectedGroups.length > 0 || input.trim().length >= 3
      ? allRows.slice(page * pageSize, (page + 1) * pageSize)
      : allRows; 
  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    const maxPage = Math.floor((rowCount - 1) / pageSize);
    if (page < maxPage) setPage(page + 1);
  };


    return (
    <div className="container">
      <div className="dropdown-wrapper">
        <div
          onClick={() => setShowDropdown((prev) => !prev)}
          className="dropdown-header"
        >
          {selectedGroups.length === 0
            ? "Select Groups..."
            : groups
                .filter((g) => selectedGroups.includes(g.group_id))
                .map((g) => g.group_name)
                .join(", ")}
        </div>

        {showDropdown && (
          <div className="dropdown-content">
            {groups.map((group) => (
              <label
                key={group.group_id}
                className="dropdown-item"
              >
                <input
                  type="checkbox"
                  checked={selectedGroups.includes(group.group_id)}
                  onChange={(e) => {
                    const groupId = group.group_id;
                    setSelectedGroups((prev) =>
                      e.target.checked ? [...prev, groupId] : prev.filter((id) => id !== groupId)
                    );
                    setPage(0);
                  }}
                />
                {group.group_name}
              </label>
            ))}
            <div className="clear-all-button-container">
              <button onClick={() => setSelectedGroups([])}>Clear All</button>
            </div>
          </div>
        )}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search members (min 3 chars)..."
        className="search-input"
      />

      {loading ? (
        <div className="loading-message">Loading...</div>
      ) : (
        <>
          <table className="members-table">
            <thead>
              <tr>
                <th className="members-table-th">Name</th>
                <th className="members-table-th">Phone</th>
                <th className="members-table-th">Email</th>
                <th className="members-table-th">City</th>
                <th className="members-table-th">Role</th>
                <th className="members-table-th">Experience</th>
              </tr>
            </thead>
            <tbody>
              {displayedRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="table-no-members">
                    No members found.
                  </td>
                </tr>
              ) : (
                displayedRows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedRowId(row.id)}
                    className={`table-row ${row.id === selectedRowId ? 'table-row-selected' : ''}`}
                  >
                    <td>{row.english_name}</td>
                    <td>{row.phone}</td>
                    <td>{row.email}</td>
                    <td>{row.city}</td>
                    <td>{row.role}</td>
                    <td>{row.years_of_experience}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="pagination-container">
            <button onClick={handlePrevPage} disabled={page === 0} className="pagination-button">
              &lt; Previous
            </button>
            <span>
              Page {page + 1} of {Math.max(1, Math.ceil(rowCount / pageSize))}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page >= Math.ceil(rowCount / pageSize) - 1}
              className="pagination-button"
            >
              Next &gt;
            </button>
          </div>
        </>
      )}

      {selectedRowId && selectedRowId > 0 && <ProfileMember memberId={selectedRowId} onClose={() => setSelectedRowId(null)} />}
    </div>
  );
}
