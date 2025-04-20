import { FaRegEdit } from "react-icons/fa";
import { Client } from "../contexts/ClientContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { API_URL } from "../Constants";

export const ClientRow = ({
  client,
  setSelected,
}: {
  client: Client;
  setSelected: React.Dispatch<React.SetStateAction<Client>>;
}) => {
  const [show, setShow] = useState<boolean>(false);
  const { token, apiKey } = useAuth();

  const handleShowClick = () => {
    setShow(!show);
  };

  const handleEditClick = () => {
    setSelected(client);
  };

  const handleDeleteClick = () => {
    deleteClient();
  };

  const deleteClient = async () => {
    const headers: HeadersInit = {
      Authorization: `Bearer ${token}`,
    };
    if (apiKey) {
      headers["X-ADM-API-KEY"] = apiKey;
    }

    console.log(API_URL + `/api/clients/${client.id}`);

    try {
      const response = await fetch(API_URL + `/api/clients/${client.id}`, {
        method: "DELETE",
        headers,
      });

      if (response.ok) {
        console.log("Project deleted successfully");
      } else {
        console.error("Failed to delete project", response.status);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="client-row">
      <input type="checkbox" />
      <div className="client-profile">
        <div className="client-image">
          <img src={client.image ?? ""} alt="client profile image" />
        </div>
        <div>
          <div className="client-name">{client.clientName}</div>
          <div className="client-email">{client.email}</div>
        </div>
      </div>
      <div className="client-location">{client.postalAddress.cityName}</div>
      <div className="client-phone">{client.phone}</div>
      <div className="client-created">
        {client.created instanceof Date
          ? client.created.toISOString().split("T")[0]
          : new Date(client.created).toISOString().split("T")[0]}
      </div>
      <div className="client-status">Active</div>
      <div className="actions-container">
        <button
          type="button"
          datatype="drop-down"
          onClick={handleShowClick}
          className="btn-actions"
        >
          <div className="meatballs">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </button>
        <div className={`dropdown ${show ? "show" : ""}`}>
          <div className="dropdown-body">
            <nav className="dropdown-actions">
              <div className="dropdown-action" onClick={handleEditClick}>
                <FaRegEdit />
                <span>Edit</span>
              </div>
              <div className="divider"></div>
              <div className="dropdown-action" onClick={handleDeleteClick}>
                <RiDeleteBin6Line />
                <span>Delete Client</span>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
