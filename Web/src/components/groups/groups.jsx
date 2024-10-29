import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
  getGroups,
  updateGroup,
  deleteGroup,
} from "../../service/api-services";
import { useAuthContext } from "../../contexts/auth-context";
import {
  Container,
  Row,
  Col,
  ListGroup,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import {
  PencilSquare,
  CheckSquare,
  Trash,
  PlusCircle,
} from "react-bootstrap-icons";
import ConfirmationModal from "../modal/confirmation.modal";

import "./groups.css";

function Groups() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getGroups().then(setData);
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const filteredGroups = data?.length
    ? data.filter((group) =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleEditClick = (group) => {
    setEditingGroupId(group.id);
    setEditValue(group.name);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const saveEdit = (group) => {
    updateGroup(group, { name: editValue })
      .then((updatedGroup) => {
        setData(
          data?.map((group) => {
            if (group.id === updatedGroup.id) {
              return updatedGroup;
            } else {
              return group;
            }
          })
        );
        setEditingGroupId(null);
      })
      .catch((error) => {
        console.error("Error updating group:", error);
      });
  };

  const handleDeleteClick = (groupId) => {
    setSelectedGroupId(groupId);
    setShowConfirmationModal(true);
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
  };

  const handleConfirmDelete = () => {
    handleCloseModal();
    deleteGroup(selectedGroupId)
      .then(() => {
        setData(data?.filter((group) => group.id !== selectedGroupId));
      })
      .catch((error) => {
        console.error("Error deleting group:", error);
      });
  };

  return (
    
    <Container className="components">
      <Row>
        <Col md={8} className="mx-auto">
          <h2 className="text-left mb-4 mt-4">Your Groups!</h2>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search for a group"
              aria-label="Search for a group"
              aria-describedby="basic-addon2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <ListGroup>
            {data?.length === 0 && <div className="text-primary">Please create your first shopping Group!</div>}
            {filteredGroups?.map((group) => (
              <ListGroup.Item
                key={group.id}
                className="d-flex justify-content-between align-items-center"
              >
                {editingGroupId === group.id ? (
                  <FormControl
                    autoFocus
                    value={editValue}
                    onChange={handleEditChange}
                    onBlur={() => saveEdit(group.id)}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        saveEdit(group.id);
                      }
                    }}
                  />
                ) : (
                  <span className=" mi-boton" onClick={() => navigate(`/groups/${group.id}`)}>
                    {group.name}
                  </span>
                )}
                {editingGroupId === group.id ? (
                  <CheckSquare
                    className="ms-2 "
                    onClick={() => saveEdit(group.id)}
                  />
                ) : (
                  <div>
                    <PencilSquare
                      className="mi-boton"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(group);
                      }}
                    />
                    <Trash
                      className="ms-2 mi-boton"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(group.id);
                      }}
                    />
                  </div>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <ConfirmationModal
            show={showConfirmationModal}
            handleClose={handleCloseModal}
            handleConfirm={handleConfirmDelete}
            title="Confirm Deletion"
          >
            Are you sure you want to delete this group?
          </ConfirmationModal>
        </Col>
      </Row>
      <div className="text-end">
        <span className="me-2">add group</span>
        <PlusCircle onClick={() => navigate(`/create-groups`)} />
      </div>
    </Container>
  );
}

export default Groups;
