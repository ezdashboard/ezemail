"use client"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const MyVerticallyCenteredModal =(props)=> {
  console.log('prodif',props)
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Profile update
          <p style={{textAlign: 'center',
    color: '#95f095',
    fontWeight: '400'}}>{props.msg}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={props.onSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" onChange={props.inputChangeData} name="name" value={props.inputData.name}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" readOnly onChange={props.inputChangeData} name="email" value={props.inputData.email}/>
          </Form.Group>   
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control type="number" placeholder="Mobile Number" onChange={props.inputChangeData} name="contactno" value={props.inputData.contactno}/>
          </Form.Group>  
          <Button variant="primary" type="submit">
              Update profile
          </Button>
          {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> 
                   <Form.Label>Name</Form.Label>
            <Form.Control type="email" placeholder="Name" />
          </Form.Group>           */}
          {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
}



export default MyVerticallyCenteredModal