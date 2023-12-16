import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

// components
import GroupItem from "../group_item/GroupItem";
import NewGroupModal from "../../../shared/components/modal/group/NewGroupModal";

// Reducer
import { addAsyncGroup } from "../../../shared/redux/users/userSlice";

import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import "./GroupList.scss";

const GroupList = ({ groups, userId }) => {
  const dispatch = useDispatch();

  // Modal New Group
  const [showModalNewGroup, setShowModalNewGroup] = useState(false);
  const handleCloseModalNewGroup = () => setShowModalNewGroup(false);
  const handleShowModalNewGroup = () => setShowModalNewGroup(true);

  const handleAddGroup = async (group) => {
    await dispatch(addAsyncGroup(group));
  };

  const checkGroupNameUnique = (name) => {
    return groups.some((group) => group.name === name);
  };

  let renderingGroups = "";
  renderingGroups =
    groups.length > 0 ? (
      groups.map((group, index) => {
        return <GroupItem key={index} group={group} />;
      })
    ) : (
      <div className="users-error">
        <h3>Pas de données ...</h3>
      </div>
    );

  return (
    <>
      <Button variant="link" onClick={handleShowModalNewGroup}>
        Ajouter un nouveau groupe
      </Button>

      <ListGroup>{renderingGroups}</ListGroup>

      {showModalNewGroup && (
        <NewGroupModal
          userId={userId}
          closeModal={handleCloseModalNewGroup}
          showModal={showModalNewGroup}
          checkGroupNameUnique={checkGroupNameUnique}
          addGroup={handleAddGroup}
        />
      )}
    </>
  );
};

GroupList.propTypes = {
  groups: PropTypes.array.isRequired,
  userId: PropTypes.number.isRequired,
};

export default GroupList;
