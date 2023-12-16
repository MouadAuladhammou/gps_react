import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

// Reducer
import { deleteAsyncGroup } from "../../../shared/redux/users/userSlice";

import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

import "./GroupItem.scss";

const GroupItem = ({ group }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteGroup = (id) => {
    Swal.fire({
      title: "Vous voulez vraiment supprimer ce groupe ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (group?.vehicles?.length > 0) {
          Swal.fire({
            title: "Erreur ...",
            text: "Vous ne pouvez pas supprimer ce groupe car il a déjà des vehicules associés ",
            icon: "error",
          });
        } else {
          await dispatch(deleteAsyncGroup(id));
          navigate(`/user/${group.user_id}`, { replace: true });
        }
      }
    });
  };

  const { id, name, description } = group;
  return (
    <ListGroup.Item
      key={id}
      as="li"
      className="d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{name}</div>
        <p className="my-1">{description}</p>
        <Button
          onClick={() => handleDeleteGroup(id)} // Méthode 1
          // onClick={handleDeleteGroup.bind(id)} // Méthode 2
          // onClick={handleDeleteGroup(id)} // Méthode 3 (ne fonctionne pas): sera exécuté automatiquement lors de la création du composant
          variant="outline-danger"
          className="btn-sm"
        >
          Supprimer
        </Button>
      </div>

      <Badge bg="primary" pill>
        {group?.vehicles?.length || 0}
      </Badge>
    </ListGroup.Item>
  );
};

GroupItem.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

export default GroupItem;

/*
Remarque très importante à garder à l’esprit :
==============================================
Sachant qu'an a une fonction comme la suivante :
const add = (x, y) => {
  return x + y
}

Cas 1:
<Button onClick={() => add(1, 2)}>Add</Button>
- Ici, add(1, 2) sera appelé et renverra 3 lorsqu'on clique sur le bouton.

Cas 2:
<Button onClick={add(1, 2)}>Add</Button>
- Ici, Il appellera add(1, 2) lorsque le JSX sera calculé (très probablement pendant la création de composant) et passera "3" comme paramètre dans onClick.
- c-v-d Le cas 2 équivaut à : <Button onClick={3}>Add</Button>

Exeption :
==========
si on a une fonction sans paramtres par exp : const testFunction = () => { alert("done") }
alors ici, tu peux mettre la fonction sans parenthèses : <Button onClick={testFunction}>Add</Button>
  Car dans ce cas, elle est considérée comme une fonction d'écoute (listener), lorsqu'on clique dessus, cette fonction fonctionne normalement sans problème
  Alors, tu peux l'utiliser avec une fonction de soumission qui traite les données dans "state" (où il n'y a aucun paramètre dans la fonction) pour l'envoyer à l'API
*/
