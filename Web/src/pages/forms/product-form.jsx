
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createProduct } from '../../service/api-services';
import { PlusSquare } from 'react-bootstrap-icons';
import './form.css';
import { Container } from 'react-bootstrap';

function ProductForm(){

  const { listId } = useParams(); 
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const productData = { ...data, list: listId };
    createProduct(listId, productData)
      .then(() => {
        navigate(`/list/${listId}`);
      })
      .catch(error => {
        console.error("Error creating product:", error);
      });
  }

  const handleOnClick = () => {
    handleSubmit(onSubmit)();

  }
    
    return (
            
          <Container className='components py-4'>
          

            <h2>Create a Product</h2>

            <form onSubmit={handleSubmit(onSubmit)} className='form-control-sm input-icon-container' style={{width:"auto", height:"50px"}}>
                
                    <input
                      placeholder='Product name'
                      id={listId}
                      name="name"
                      type="text"
                      {...register('name', { required: true, minLength: 3, maxLength: 20 })}
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    /> <PlusSquare size={20} onClick={handleOnClick} />
                    
                    {errors.title && <div className="invalid-feedback">Name is required (3-20 characters).</div>}

            </form>
          </Container>
            

            
    )
}

export default ProductForm;