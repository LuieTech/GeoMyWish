import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createStore, deleteProduct, getListDetails } from "../../service/api-services"; 
import { useAuthContext } from "../../contexts/auth-context";  
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { PencilSquare, Trash, PlusCircle } from 'react-bootstrap-icons';


function ListDetails() {
  const { listId } = useParams();
  const [listDetails, setListDetails] = useState({
    list: null,
    products: [],
    store: null
  });  
  const [storeForm, setStoreForm] = useState(false);
  const [newStore, setNewStore] = useState("");
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    getListDetails(listId)
      .then((res) => {
        setListDetails(res);
      })
      .catch((error) => {
        console.error("Error fetching list details:", error);
      });
  }, [listId]);

  const handleSelectStore = () => {
    createStore(listId, { name: newStore })
     .then((newStore) => {
        setListDetails({...listDetails, store: newStore});
        setStoreForm(false);
        setNewStore("");
     }).catch((error) => {
        console.error("Error creating store:", error);
     });
  };

  const handleDeleteClick = (productId) => {
    console.log("EL productId es...", productId)//esto esta funcionando bien , ya tengo el id del producto;
    deleteProduct(productId)
      .then(() => {
        setListDetails({
          ...listDetails,
          products: listDetails.products.filter(
            (product) => product.id !== productId
          ),
        });
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  

  return (
    <Container className="components">
      <Row>
        <Col md={6} className="mb-4 mt-4">
          <div className="mb-2 d-flex align-item-center gap-2 ">
            <h5 >List :</h5>
            <p>{listDetails.title}</p>
          </div>
         
          <h5>Notes :</h5>
          <p className="text-start">{listDetails.description}</p>
        
          {/* aqui escribo para mostrar "Stores" */}
          <h5 className="">Stores :</h5>
          {!listDetails.store ? (
      <>
        <div>No Stores in this group</div>
        {storeForm ? (
          <div className="my-3"> 
            <input
              type="text"
              placeholder="Store Name"
              value={newStore}
              onChange={(e) => setNewStore(e.target.value)}
            />
            <button className="btn btn-sm btn-primary ms-2" onClick={() => setStoreForm(false)}>Cancel</button>
            <button className="btn btn-sm btn-success ms-2" onClick={handleSelectStore}>Save</button>
          </div>
        ) : (
          <PlusCircle size={20} onClick={() => setStoreForm(true)} className="mx-2 my-3 "/>
        )}
      </>
          ) : (
            
            <ListGroup>
              {listDetails.store.map((store) => (
                <ListGroup.Item
                  key={store.id} 
                  action
                  onClick={() => navigate(`/stores/${store.id}`)} 
                >
                  {store.name} 
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          {/* aqui termina */}
          <h5 className="mb-3">Products :</h5>
          {listDetails.products.length === 0 ? (
            <div className="d-flex align-items-center mb-4">
              <div>No products in this list.</div> 
              <PlusCircle 
                  size={50} 
                  onClick={() => navigate(`/lists/${listDetails.id}/add-product`)}
                  className="btn btn-link"
                />

            </div>
              
          ) : (
            
            <ListGroup>
              {listDetails.products.map((product) => (
                <ListGroup.Item 
                  key={product.id} 
                  className="d-flex align-items-center justify-content-between"
                >
                  <div>{product.name}</div>
                  <Trash className="ms-2" onClick={() => handleDeleteClick(product.id)} />
                </ListGroup.Item>
              ))}
              <div className="text-end">
                <PlusCircle onClick={() => navigate(`/lists/${listDetails.id}/add-product`)}/>
              </div>
            </ListGroup>

          )}
        </Col>
        <div>
          
        </div>
      </Row>
    </Container>
  );
}

export default ListDetails;
