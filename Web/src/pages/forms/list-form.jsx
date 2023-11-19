import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { createList } from '../../service/api-services'; 

function ListForm() {
  
  const { groupId } = useParams();

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
  
    const listData = { ...data, group: groupId };
    
    createList(groupId, listData)
      .then(() => {

        navigate(`/groups/${groupId}`);
      })
      .catch(error => {
        console.error("Error creating list:", error);
      });
  };

  return (
    <Container className='components'>
      <Row>
        <Col md={{ span: 6, offset: 3 }}> 
          <div className="create-list-form">
            <h2>Create New List</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  {...register('title', { required: true, minLength: 3, maxLength: 20 })}
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                />
                {errors.title && <div className="invalid-feedback">Title is required (3-20 characters).</div>}
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Description (optional)</label>
                <textarea
                  id="description"
                  name="description"
                  {...register('description', { minLength: 3, maxLength: 100 })}
                  className="form-control"
                ></textarea>
              </div>
              <div className='text-center'>
                <button type="submit" className="btn btn-sm mt-3 btn-primary">Create List</button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ListForm;
