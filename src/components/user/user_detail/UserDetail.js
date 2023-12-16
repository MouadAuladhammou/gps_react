import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";

// components
import GroupList from "../../group/group_list/GroupList";
import VehicleList from "../../vehicle/vehicle_list/VehicleList";

// Rducer
import {
  fetchAsyncUserDetail,
  removeSelectedUser,
  getSelectedUser,
  deleteAsyncUser,
} from "../../../shared/redux/users/userSlice";

import { BiEditAlt, BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ListGroup from "react-bootstrap/ListGroup";

import "./UserDetail.scss";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedUser = useSelector(getSelectedUser);

  useEffect(() => {
    dispatch(fetchAsyncUserDetail(id));
    return () => {
      dispatch(removeSelectedUser());
    };
  }, [id]);

  return (
    <Tabs
      defaultActiveKey="profile"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >
      <Tab eventKey="profile" title="Profile">
        <ListGroup>
          <ListGroup.Item
            variant={`${
              selectedUser?.companies?.length > 0 ? "primary" : "warning"
            }`}
            className="d-flex justify-content-between align-items-center"
          >
            <h5 className="my-0">
              {selectedUser.last_name} {selectedUser.first_name}
            </h5>

            <div style={{ float: "right" }}>
              <Link to={`/edit/user/${id}`}>
                <BiEditAlt size={24} />
              </Link>
              &nbsp;
              <NavLink
                to="#"
                onClick={() => {
                  Swal.fire({
                    title: "Vous voulez vraiment supprimer cet utilisateur ?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Oui",
                    cancelButtonText: "Annuler",
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      if (selectedUser.groupes.length < 1) {
                        await dispatch(deleteAsyncUser(selectedUser.id));
                        dispatch(removeSelectedUser());
                        navigate(`/`, { replace: true });
                      } else {
                        Swal.fire({
                          title: "Erreur ...",
                          text: "Vous ne pouvez pas supprimer cet utilisateur car il a déjà des groupes associés ",
                          icon: "error",
                        });
                      }
                    }
                  });
                }}
              >
                <BiTrash size={24} color={"var(--bs-pink)"} />
              </NavLink>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div>
              <div className="fw-bold">CIN</div>
              {selectedUser.cin}
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div>
              <div className="fw-bold">Email</div>
              {selectedUser.email}
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div>
              <div className="fw-bold">Adresse</div>
              {selectedUser.address}
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div>
              <div className="fw-bold">Ville</div>
              {selectedUser.city}
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div>
              <div className="fw-bold">Code Postal</div>
              {selectedUser.postal_code}
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div>
              <div className="fw-bold">Tel Fixe</div>
              {selectedUser.cell_phone}
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div>
              <div className="fw-bold">Tel Portable</div>
              {selectedUser.work_phone}
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Tab>

      <Tab eventKey="groupes" title="Groupes">
        {selectedUser.groupes && (
          <GroupList
            groups={selectedUser.groupes || []}
            userId={selectedUser.id}
          />
        )}
      </Tab>

      <Tab eventKey="vehicules" title="Vehicules">
        <VehicleList
          groups={selectedUser.groupes || []}
          userId={selectedUser.id}
        />
      </Tab>
    </Tabs>
  );
};

export default UserDetail;
