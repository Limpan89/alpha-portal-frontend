import { useEffect, useState } from "react";
import { Client, defaultClient, useClient } from "../contexts/ClientContext";
import { ClientRow } from "../components/ClientRow";

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
        <header className="client-header"></header>
        {clients.map((c) => (
          <ClientRow client={c} setSelected={setSelected} />
        ))}
      </div>
    </div>
  );
};
