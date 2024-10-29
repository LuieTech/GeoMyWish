import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { getLists, deleteList } from "../../service/api-services";
import { useAuthContext } from "../../contexts/auth-context";
import { Container, Row, Col, ListGroup, Navbar } from 'react-bootstrap';
import { PencilSquare, Trash, PlusCircle } from 'react-bootstrap-icons';
import ConfirmationModal from "../modal/confirmation.modal";

function Lists() {
  const { groupId } = useParams(); 
  const [lists, setLists] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedListId, setSelectedListId] = useState(null);
  // const [selectedGroupId, setSelectedGroupId] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { register, watch } = useForm(); 
  useEffect(() => {
    let isMounted = true; 
    getLists(groupId)
      .then((res) => {
        if (isMounted && Array.isArray(res)) { 
          setLists(res);
        } 
      })
      .catch((error) => {
        if (isMounted && error.response?.status === 404) {
          setLists([]);
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
        <Col  md={8} className="mx-auto">
          {lists.length === 0 ? (<h2 className="text-left mb-4 mt-4">No lists in this group yet</h2>)  
          : (<h2 className="text-left mb-4 mt-4 ">Your are on {lists[0].group.name}</h2>)
        }
          
          <form >
            <input
              className="form-control mb-4"
              type="text"
              id="search"
              {...register("search")}
              placeholder="Search for a list"
            />
          </form>
          {filteredLists.length === 0 ? (
            <div className="text-primary">Now create your first shopping List!</div>
          ) : (
            <ListGroup>
              {filteredLists?.map((list) => (
                <ListGroup.Item key={list.id} className="d-flex justify-content-between">
                  <div className="d-flex flex-column" onClick={() => navigate(`/list/${list.id}`)}>
                    <span className="mi-boton fw-bold ">{list.title}</span> 
                    <span className="text-muted">{list.description}</span> 
                  </div>
                  <div>
                    {/* <PencilSquare onClick={() => handleEdit(list.id)} /> */}
                    <Trash className="ms-2 mi-boton" onClick={() => handleDeleteClick(list.id)} />
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

