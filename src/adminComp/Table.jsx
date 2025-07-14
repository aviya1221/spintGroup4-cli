    import React from "react";
    import { useState } from "react";
    import { DataGrid } from "@mui/x-data-grid";
    

    export default function Table() {
    const [input, setInput] = useState("");




    const columns = [
        { field: "full_name", headerName: "Name", width: 90 },
        { field: "phone", headerName: "phone", width: 150 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "city", headerName: "City", width: 150 },
        { field: "role", headerName: "Role", width: 150 },
        { field: "experience", headerName: "Experience", width: 150 },
    ];

    const rows = [
        {
          id: 1,
          full_name: "Alice Johnson",
          phone: "052-1234567",
          email: "alice@example.com",
          city: "Tel Aviv",
          role: "Frontend",
          experience: 3,
        },
        {
          id: 2,
          full_name: "Bob Smith",
          phone: "050-9876543",
          email: "bob@example.com",
          city: "Jerusalem",
          role: "Backend",
          experience: 5,
        },
        {
          id: 3,
          full_name: "Charlie Brown",
          phone: "053-5678910",
          email: "charlie@example.com",
          city: "Haifa",
          role: "DevOps",
          experience: 2,
        },
        {
          id: 4,
          full_name: "Dana Levi",
          phone: "054-1122334",
          email: "dana@example.com",
          city: "Be'er Sheva",
          role: "QA",
          experience: 4,
        },
        {
          id: 5,
          full_name: "Eli Cohen",
          phone: "058-4455667",
          email: "eli@example.com",
          city: "Netanya",
          role: "Product",
          experience: 6,
        },
      ];
      

    const [filteredRows,setFilterRows]=useState(rows);

    const handleSearch=(e)=>{
        setInput(e.target.value);

        const filterResult=rows.filter((currentRow)=>{
          return  Object.values(currentRow).some(((check)=>{
                return String(check).toLowerCase().includes(e.target.value.toLowerCase())
            }))
        })
        setFilterRows(filterResult);
        if(e.target.value==="")
            setFilterRows(rows);
    }
    return (
        <>
        <div className="d-flex flex-column align-items-center gap-3">
            <input onChange={handleSearch} value={input}></input>
            <DataGrid rows={filteredRows} columns={columns} pageSize={5} />
        </div>
        </>
    );
    }
