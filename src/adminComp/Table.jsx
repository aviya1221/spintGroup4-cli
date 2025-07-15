import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ProfileMember from './ProfileMember';

export default function Table() {
  const [rows, setRows] = useState([]);
  const [filterRows, setFilterRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [selectedRowId, setSelectedRowId] = useState(null);

  const columns = [
    { field: "english_name", headerName: "Name", minWidth: 120, flex: 1 },
    { field: "phone", headerName: "Phone", minWidth: 150, flex: 1 },
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
    { field: "city", headerName: "City", minWidth: 150, flex: 1 },
    { field: "role", headerName: "Role", minWidth: 150, flex: 1 },
    { field: "years_of_experience", headerName: "Experience", minWidth: 100, flex: 1 },
  ];

  const fetchMembers = async (currentPage) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/members/getPageMembers/${currentPage}`);
      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      console.log("data from server:", data);

      const formatted = data.map((member) => ({
        ...member,
        id: member.member_id,
      }));

      setRows(formatted);
      setFilterRows(formatted);
      setRowCount(formatted.length);
    } catch (err) {
      console.error("Failed to fetch members:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers(page);
  }, [page, pageSize]);

  const handleSearch = (e) => {
    const val = e.target.value;
    setInput(val);

    if (val === "") {
      setFilterRows(rows);
      return;
    }

    const filtered = rows.filter((row) =>
      Object.values(row).some((field) =>
        String(field).toLowerCase().includes(val.toLowerCase())
      )
    );

    setFilterRows(filtered);
  };

  return (
    <div className="d-flex flex-column align-items-center gap-3" style={{ padding: "1rem" }}>
      <input
        onChange={handleSearch}
        value={input}
        placeholder="Search..."
        style={{ padding: "8px", width: "80%", maxWidth: "400px" }}
      />
      <div style={{ width: "100%", overflowX: "auto" }}>
        <div style={{ minWidth: "800px" }}>
          <DataGrid
            rows={filterRows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pagination
            paginationMode="server"
            rowCount={rowCount}
            onPageChange={(newPage) => setPage(newPage)}
            loading={loading}
            autoHeight
            onRowClick={(params) => {
              setSelectedRowId(params.id);
            }}
          />
        </div>
      </div>
      {selectedRowId && <ProfileMember />}
    </div>
  );
}

