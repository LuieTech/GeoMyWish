import { Container, Row, Col, Form, Button, Navbar } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getListDetails, updateList } from '../../service/api-services'; 
import { useEffect, useState } from 'react';

function EditList() {
  
  const {listId} = useParams();
  //console.log("ESTE ES EL LIST ID: ", listId);
  const [list, setList] = useState({
    title: "",
    description: "",
  }) 
  const navigate = useNavigate();
  const { register, handleSubmit, reset ,formState: { errors } } = useForm({ defaultValues: list});

  useEffect(() => {
    getListDetails(listId)
      .then((res) => {
        setList(res);
        reset(res); // Actualiza los valores por defecto del formulario con los datos cargados
      })
      .catch((error) => {
        console.error("Error fetching list details:", error);
      });        
  }, [listId, reset]);


  const onSubmit = (data) => {
    //console.log("este es el listId y el data: ", listId, data)
    const updateData = {
      title: data.title,
      description: data.description,
    };
    updateList(listId, updateData)
    .then(() => {
      navigate(`/list/${listId}`);
    })
    .catch(error => {
      console.error(error);
    });
  };

  if (!list.title) return <div>Loading...</div>;

  return (
    <Container className='components'>

      <Row>
        <Col md={{ span: 6, offset: 3 }}> 
          <div className="create-list-form">
            <h2>Edit List </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type='text'
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  id='title'
                  {...register('title', {required: true})}
                />
                {errors.title && <div className="invalid-feedback">Title is required (3-20 characters).</div>}
              </div>
  
              <div className='mb-3'>
              <label htmlFor='description' className='form-label'>
                Description
              </label>

              <input
                type='text'
                className='form-control'
                id='description'
                {...register('description')}
              />
            </div>
              <div className='text-center'>
                <button type="submit" className="btn btn-sm mt-3 btn-primary">Edit List</button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default EditList;
