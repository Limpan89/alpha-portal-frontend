import { useEffect, useState } from "react";
import { UserCard } from "../components/UserCard";
import { defaultUser, User, useUser } from "../contexts/UserContext";
import { AddMemberModal } from "../components/AddMemberModal";
import { EditMemberModal } from "../components/EditMemberModal";

export const Members = () => {
  const { users } = useUser();
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [selected, setSelected] = useState<User>(defaultUser);

  const HandleAddClick = () => {
    setShowAdd(true);
  };

  useEffect(() => {
    if (selected.id != defaultUser.id) setShowEdit(true);
  }, [selected]);

  return (
    <div id="members">
      <header className="page-header">
        <h1 className="h1">Team Members</h1>
        <button
          type="button"
          data-modal="true"
          onClick={HandleAddClick}
          className="btn btn-add"
        >
          <span>Add Member</span>
        </button>
      </header>
      <div className="card-container">
        {users.map((u) => (
          <UserCard user={u} setSelected={setSelected} />
        ))}
      </div>
      <AddMemberModal show={showAdd} close={setShowAdd} />
      <EditMemberModal show={showEdit} close={setShowEdit} user={selected} />
    </div>
  );
};
