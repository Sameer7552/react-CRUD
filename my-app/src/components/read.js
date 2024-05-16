import React, { useState } from "react";
import DeleteButton from "./deleteBtn";
import UpdateButton from "./updateBtn";
import UpdateForm from "./updateModule";
import "../fonts/css/all.css";

function DisplayItems({ items, onDelete, onUpdate }) {
  function getColorClass(priority) {
    if (priority === "Very Low") {
      return "bg-emerald-300";
    } else if (priority === "Low") {
      return "bg-lime-300";
    } else if (priority === "Medium") {
      return "bg-amber-300";
    } else if (priority === "High") {
      return "bg-orange-300";
    } else {
      return "bg-red-300";
    }
  }

  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSort = (column) => {
    if (sortedColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(column);
      setSortOrder("asc");
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = (updatedItem) => {
    onUpdate(updatedItem);
    setIsModalOpen(false); // Close the modal after updating
  };

  const sortedItems = items.slice().sort((a, b) => {
    if (sortedColumn === "priority") {
      const priorityOrder = {
        "Very Low": 1,
        Low: 2,
        Medium: 3,
        High: 4,
        "Very High": 5,
      };
      const comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
      return sortOrder === "asc" ? comparison : -comparison;
    } else {
      const comparison = a[sortedColumn] > b[sortedColumn] ? 1 : -1;
      return sortOrder === "asc" ? comparison : -comparison;
    }
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="w-1/12 px-4 py-2 border select-none">S.No</th>
            <th
              className="w-2/12 px-4 py-2 border cursor-pointer select-none"
              onClick={() => handleSort("title")}
            >
              Title
            </th>
            <th
              className="w-4/12 px-4 py-2 border cursor-pointer select-none"
              onClick={() => handleSort("description")}
            >
              Description
            </th>
            <th
              className="w-2/12 px-4 py-2 border cursor-pointer select-none"
              onClick={() => handleSort("datetime")}
            >
              Due Date
            </th>
            <th
              className="w-2/12 px-4 py-2 border cursor-pointer select-none"
              onClick={() => handleSort("priority")}
            >
              Priority
            </th>
            <th className="w-1/12 px-4 py-2 border select-none">Delete</th>
            <th className="w-1/12 px-4 py-2 border select-none">Update</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item, index) => {
            return (
              <tr key={index}>
                <td
                  className={`w-1/12 px-4 py-2 border text-center ${getColorClass(
                    item.priority
                  )}`}
                >
                  {index + 1}
                </td>
                <td
                  className={`w-2/12 px-4 py-2 border text-center ${getColorClass(
                    item.priority
                  )}`}
                >
                  {item.title}
                </td>
                <td
                  className={`w-4/12 px-4 py-2 border text-center ${getColorClass(
                    item.priority
                  )}`}
                >
                  {item.description}
                </td>
                <td
                  className={`w-2/12 px-4 py-2 border text-center ${getColorClass(
                    item.priority
                  )}`}
                >
                  {item.datetime}
                </td>
                <td
                  className={`w-2/12 px-4 py-2 border text-center ${getColorClass(
                    item.priority
                  )}`}
                >
                  {item.priority}
                </td>
                <td className="w-2/12 px-4 py-2 border text-center bg-slate-100">
                  <DeleteButton onConfirmDelete={() => onDelete(index)} />
                </td>
                <td className="w-2/12 px-4 py-2 border text-center bg-slate-100">
                  <UpdateButton onClick={() => handleEdit(item)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isModalOpen && (
        <UpdateForm 
          item={selectedItem} 
          onUpdate={handleUpdate} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

export default DisplayItems;
