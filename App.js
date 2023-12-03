import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable, { defaultThemes } from "react-data-table-component";
import { FaSearch } from "react-icons/fa";
const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#4682A9",
      color: "white",
    },
  },
  headcells: {
    style: {
      fontSize: "16px",
      fontWeight: "600",
      textTransform: "uppercase",
    },
  },
  cell: {
    style: {
      fontSize: "15px",
    },
  },
};

function App() {
  const column = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
    {
      name: "Action",
      cell: (row) => {
        return (
          <>
            <button className="edit-btn" onClick={() => handleEdit(row.id)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => handleDelete(row.id)}>
              Delete
            </button>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    const fetData = async () => {
      axios
        .get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        )
        .then((res) => {
          setRecords(res.data);
          setFilterRecords(res.data);
        })
        .catch((error) => console.log(error));
    };
    fetData();
  }, []);

  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState(false);

  const [newName, setRowName] = useState(" ");
  const [newEmail, setRowEmail] = useState(" ");
  const [newRole, setRowRole] = useState(" ");
  const [editId, setEditID] = useState(0);

  useEffect(() => {
    handleFilter();
  }, []);

  const handleFilter = (event) => {
    let newData = filterRecords.filter((row) => {
      setSearch(event.target.value.toLowerCase());
      console.log("searchhh", search);
      if (
        row.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        row.email.toLowerCase().includes(event.target.value.toLowerCase()) ||
        row.role.toLowerCase().includes(event.target.value.toLowerCase()) ||
        row.id.toLowerCase().includes(event.target.value.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    });
    setRecords(newData);
  };

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
    console.log("----SelectedRow---", selectedRows);
  };

  const handleEdit = (targetId) => {
    console.log("----This the target ID---", targetId);
    setEditID(targetId);
    <input type="text" />;
    records.map((row) => {
      if (targetId) {
        <input
          type="text"
          value={row.name}
          onChange={(e) => setRowName(e.target.value)}
        />;
      }
    });
  };

  const handleDelete = (targetId) => {
    setRecords(records.filter((row) => row.id !== targetId));
  };

  return (
    <div
      className="App"
      style={{ padding: "50px 10%", backgroundColor: "lightgray" }}
    >
      <div style={{ display: "flex", justifyContent: "right" }}>
        <input
          type="text"
          value={search}
          placeholder="Search..."
          onChange={handleFilter}
          style={{ padding: "6px 10px" }}
        />
        <FaSearch className="search-icon" />
      </div>

      <DataTable
        columns={column}
        data={records}
        customStyles={customStyles}
        pagination
        highlightOnHover
        paginationPerPage={10}
        responsive
        fixedHeader
        selectableRows={selectedRows}
        onSelectedRowsChange={handleChange}
        selectableRowsVisibleOnly={true}
      ></DataTable>
    </div>
  );
}

export default App;
