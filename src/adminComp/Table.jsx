    import React from "react";
    import { useState } from "react";
    import { DataGrid } from "@mui/x-data-grid";
    

    export default function Table() {
    const [input, setInput] = useState("");




    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "email", headerName: "Email", width: 200 },
    ];

    const rows = [
        { id: 1, name: "Alice", email: "alice@example.com" },
        { id: 2, name: "Bob", email: "bob@example.com" },
        { id: 3, name: "Charlie", email: "charlie@example.com" },
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
        <div>
            <input onChange={handleSearch} value={input}></input>
            <DataGrid rows={filteredRows} columns={columns} pageSize={5} />
        </div>
        </>
    );
    }
