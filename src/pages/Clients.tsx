import { useEffect, useState } from "react";
import { Client, defaultClient, useClient } from "../contexts/ClientContext";
import { ClientRow } from "../components/ClientRow";
import { AddClientModal } from "../components/AddClientModal";
import { EditClientModal } from "../components/EditClientModal";

export const Clients = () => {
  const { clients } = useClient();
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [selected, setSelected] = useState<Client>(defaultClient);

  const HandleAddClick = () => {
    setShowAdd(true);
  };

  useEffect(() => {
    if (selected.id != defaultClient.id) setShowEdit(true);
  }, [selected]);

  return (
    <div id="clients">
      <header className="page-header">
        <h1 className="h1">Clients</h1>
        <button
          type="button"
          data-modal="true"
          onClick={HandleAddClick}
          className="btn btn-add"
        >
          <span>Add Client</span>
        </button>
      </header>

      <div className="card clients-container">
        <header className="client-header">
          <input type="checkbox" />
          <div className="header-item">Customer Name</div>
          <div className="header-item">Location</div>
          <div className="header-item">Phone</div>
          <div className="header-item">Date</div>
          <div className="header-item">Status</div>
        </header>
        {clients.map((c) => (
          <ClientRow client={c} setSelected={setSelected} />
        ))}
      </div>
      <AddClientModal show={showAdd} close={setShowAdd} />
      <EditClientModal show={showEdit} close={setShowEdit} client={selected} />
    </div>
  );
};
