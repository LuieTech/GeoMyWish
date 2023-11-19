import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { getLists, deleteList } from "../../service/api-services";
import { useAuthContext } from "../../contexts/auth-context";
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { PencilSquare, Trash, PlusCircle } from 'react-bootstrap-icons';
import ConfirmationModal from "../modal/confirmation.modal";

function Lists() {
  const { groupId } = useParams(); 
  const [lists, setLists] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedListId, setSelectedListId] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { register, watch } = useForm(); 

  useEffect(() => {
    let isMounted = true; 
    getLists(groupId)
      .then((res) => {
        if (isMounted) { 
          setLists(res);
        }
      })
      .catch((error) => {
        if (isMounted) { 
          console.error("Error fetching lists:", error);
        }
      });
    return () => {
      isMounted = false; 
    };
  }, [groupId]);

  const searchTerm = watch("search");
  const filteredLists = searchTerm ? lists.filter((list) => list.title.toLowerCase().includes(searchTerm.toLowerCase())) : lists;

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleEdit = (listId) => {
    navigate(`/list/${listId}/edit`);
  };

  const handleDeleteClick = (listId) => {
    setSelectedListId(listId);
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = () => {
    deleteList(selectedListId)
      .then(() => {
        setLists(lists.filter(list => list.id !== selectedListId));
        setShowConfirmationModal(false);
      })
      .catch(error => {
        console.error("Error deleting list:", error);
      });
  };




  return (
    <Container className="components">
      <Row>
        <Col md={6} className="my-3 ">
          <h2 className="text-left mb-4 mt-4">Your Lists...</h2>
          <form>
            <input
              className="form-control mb-4"
              type="text"
              id="search"
              {...register("search")}
              placeholder="Search for a list"
            />
          </form>
          {filteredLists.length === 0 ? (
            <div>No Lists available in this group.</div>
          ) : (
            <ListGroup>
              {filteredLists.map((list) => (
                <ListGroup.Item key={list.id} className="d-flex justify-content-between align-items-center">
                  <div onClick={() => navigate(`/list/${list.id}`)}>
                    <strong>{list.title}</strong> 
                    <div className="text-muted">{list.description}</div> 
                  </div>
                  <div>
                    {/* <PencilSquare onClick={() => handleEdit(list.id)} /> */}
                    <Trash className="ms-2" onClick={() => handleDeleteClick(list.id)} />
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          <ConfirmationModal
            show={showConfirmationModal}
            handleClose={() => setShowConfirmationModal(false)}
            handleConfirm={handleConfirmDelete}
            title="Confirm Deletion"
          >
            Are you sure you want to delete this list?
          </ConfirmationModal>
        </Col>
      </Row>
      <div className="text-end">
        
      <PlusCircle onClick={() => navigate(`/groups/${groupId}/create-list`)}/>
      </div>
      
    </Container>
  );
  
}

export default Lists;

