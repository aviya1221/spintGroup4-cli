import React, { useState, useEffect, useRef } from "react";
import ProfileMember from "./ProfileMember";
import "./Table.css";

export default function Table() {
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]); // array of group IDs

  const [allRows, setAllRows] = useState([]); // current page data from server (paginated)
  const [page, setPage] = useState(0);
  const pageSize = 7;
  const [showDropdown, setShowDropdown] = useState(false);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [selectedRowId, setSelectedRowId] = useState(null);

  const [rowCount, setRowCount] = useState(0); // total count for pagination

  // Debounce timer reference
  const searchTimeout = useRef(null);

  // Fetch groups for dropdown
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

  // Fetch all members paginated (no group, no search)
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

  // Fetch members by group(s) (POST, no pagination assumed on server)
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
      setRowCount(members.length); // client paginated
    } catch (err) {
      console.error(err);
      setAllRows([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Fetch members by search word with server pagination
  const fetchMembersBySearch = async (searchWord, page) => {
    if (searchWord.length < 3) {
      // If search cleared or too short, reset to normal
      setPage(0);
      fetchPaginatedMembers(0);
      return;
    }
    setLoading(true);
    try {
      // Assuming your backend supports pagination for search? 
      // If not, you may need to handle pagination client side.
      // Let's assume backend returns full search results, so we do client pagination here:
      const res = await fetch(`/api/members/getMemberInclude/${encodeURIComponent(searchWord)}`);
      if (!res.ok) throw new Error("Failed to fetch search results");
      const members = await res.json();

      setAllRows(members.map((m) => ({ ...m, id: m.member_id })));
      setRowCount(members.length); // client paginate total count
    } catch (err) {
      console.error(err);
      setAllRows([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch data depending on filters/search
  useEffect(() => {
    if (selectedGroups.length > 0) {
      // When groups selected, ignore search and fetch by groups
      fetchMembersByGroups(selectedGroups);
      setPage(0);
    } else if (input.trim().length >= 3) {
      // Search active, fetch search results
      fetchMembersBySearch(input.trim(), page);
    } else {
      // No group, no search - fetch normal paginated members
      fetchPaginatedMembers(page);
    }
  }, [page, selectedGroups]);

  // Handle search input with debounce to avoid spamming server
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
    }, 400); // 400ms debounce

    return () => clearTimeout(searchTimeout.current);
  }, [input]);

  // For pagination display of search and group filtered results (client side paginate)
  const displayedRows =
    selectedGroups.length > 0 || input.trim().length >= 3
      ? allRows.slice(page * pageSize, (page + 1) * pageSize)
      : allRows; // server paginated for normal all members

  // Handlers
  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    const maxPage = Math.floor((rowCount - 1) / pageSize);
    if (page < maxPage) setPage(page + 1);
  };

  const handleGroupSelect = (e) => {
    const val = e.target.value;
    if (val === "") {
      setSelectedGroups([]);
      setPage(0);
    } else {
      setSelectedGroups([Number(val)]);
      setPage(0);
    }
    setInput("");
  };

  return (
    <div style={{ padding: "1rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
      {/* Group dropdown */}
      <div style={{ position: "relative", width: "80%", maxWidth: "400px" }}>
        <div
          onClick={() => setShowDropdown((prev) => !prev)}
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            borderRadius: "4px",
            backgroundColor: "#fff",
            cursor: "pointer",
          }}
        >
          {selectedGroups.length === 0
            ? "Select Groups..."
            : groups
                .filter((g) => selectedGroups.includes(g.group_id))
                .map((g) => g.group_name)
                .join(", ")}
        </div>

        {showDropdown && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              maxHeight: "200px",
              overflowY: "auto",
              border: "1px solid #ccc",
              borderTop: "none",
              backgroundColor: "white",
              zIndex: 1000,
            }}
          >
            {groups.map((group) => (
              <label
                key={group.group_id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "6px 8px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
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
                  style={{ marginRight: "8px" }}
                />
                {group.group_name}
              </label>
            ))}
            <div style={{ padding: "8px", textAlign: "center" }}>
              <button onClick={() => setSelectedGroups([])}>Clear All</button>
            </div>
          </div>
        )}
      </div>

      {/* Search input */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search members (min 3 chars)..."
        style={{ padding: "8px", width: "80%", maxWidth: "400px" }}
      />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table style={{ borderCollapse: "collapse", minWidth: "800px" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Phone</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Email</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>City</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Role</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Experience</th>
              </tr>
            </thead>
            <tbody>
              {displayedRows.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "8px" }}>
                    No members found.
                  </td>
                </tr>
              ) : (
                displayedRows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedRowId(row.id)}
                    style={{
                      cursor: "pointer",
                      backgroundColor: row.id === selectedRowId ? "#e0e0e0" : "transparent",
                    }}
                  >
                    <td style={{ border: "1px solid black", padding: "8px" }}>{row.english_name}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{row.phone}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{row.email}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{row.city}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{row.role}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{row.years_of_experience}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div style={{ marginTop: "1rem" }}>
            <button onClick={handlePrevPage} disabled={page === 0} style={{ marginRight: "1rem" }}>
              &lt; Previous
            </button>
            <span>
              Page {page + 1} of {Math.max(1, Math.ceil(rowCount / pageSize))}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page >= Math.ceil(rowCount / pageSize) - 1}
              style={{ marginLeft: "1rem" }}
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
