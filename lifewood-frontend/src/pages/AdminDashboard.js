import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../api/api";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/applications`);
        if (!res.ok) throw new Error("Failed to fetch applications");
        const data = await res.json();
        setApplications(data);
      } catch (err) {
        toast.error("Error loading applications");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEdit = (app) => {
    setEditingId(app._id);
    setEditData({ ...app });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleSave = async (id) => {
    if (!editData.fullName || !editData.email) {
      toast.warn("Full Name and Email are required");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch(`${API_URL}/applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (!res.ok) throw new Error("Failed to update application");

      const updated = await res.json();
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? updated : app))
      );
      toast.success("Application updated");
      handleCancel();
    } catch (err) {
      toast.error("Error updating application");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      const res = await fetch(`${API_URL}/applications/${id}/accept`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error();

      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: "ACCEPTED" } : app
        )
      );
      toast.success("Application accepted");
    } catch {
      toast.error("Failed to accept application");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;
    try {
      const res = await fetch(`${API_URL}/applications/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();

      setApplications((prev) => prev.filter((app) => app._id !== id));
      toast.success("Application deleted");
    } catch {
      toast.error("Failed to delete application");
    }
  };

  const renderInput = (name, type = "text") => (
    <input
      type={type}
      name={name}
      value={editData[name] || ""}
      onChange={handleChange}
      className="border border-gray-300 p-1 rounded w-full"
    />
  );

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const filteredApplications = applications
    .filter((app) =>
      filterStatus === "ALL" ? true : (app.status || "PENDING") === filterStatus
    )
    .filter(
      (app) =>
        (app.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (app.email || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      const aValue = a[sortConfig.key] || "";
      const bValue = b[sortConfig.key] || "";

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

  if (loading)
    return <div className="p-6 text-center">Loading applications...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded shadow">
      <ToastContainer position="top-center" autoClose={3000} />
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard - Applications
      </h1>

      {/* Filter & Search */}
      <div className="flex items-center justify-between mb-4">
        <div className="space-x-2">
          <label>Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="DECLINED">Declined</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-2 py-1 rounded w-64"
        />
      </div>

      {filteredApplications.length === 0 ? (
        <div>No applications found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                {["fullName", "age", "degree", "experience", "email", "projectName"].map(
                  (field) => (
                    <th
                      key={field}
                      className="p-2 border cursor-pointer"
                      onClick={() => handleSort(field)}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                      {sortConfig.key === field &&
                        (sortConfig.direction === "asc" ? "▲" : "▼")}
                    </th>
                  )
                )}
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50">
                  {["fullName", "age", "degree", "experience", "email", "projectName"].map(
                    (field) => (
                      <td key={field} className="p-2 border">
                        {editingId === app._id
                          ? renderInput(field, field === "age" ? "number" : "text")
                          : app[field] || ""}
                      </td>
                    )
                  )}
                  <td className="p-2 border text-yellow-700 font-semibold">
                    {app.status || "PENDING"}
                  </td>
                  <td className="p-2 border space-x-2">
                    {editingId === app._id ? (
                      <>
                        <button
                          onClick={() => handleSave(app._id)}
                          disabled={isSaving}
                          className={`px-3 py-1 rounded text-white ${
                            isSaving
                              ? "bg-blue-300"
                              : "bg-blue-500 hover:bg-blue-600"
                          }`}
                        >
                          {isSaving ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleAccept(app._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleEdit(app)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(app._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
