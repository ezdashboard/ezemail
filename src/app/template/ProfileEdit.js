"use client"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import MsgModal from './MsgModal';
import {useState } from 'react'
const MyVerticallyCenteredModal =(props)=> {
  console.log('prodif',props)
  const [modalShow, setModalShow] = useState(false);
  const [msgType, setMsgType] = useState('')

  return (
  <>
 
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
              Update  
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
    {modalShow &&
                            <MsgModal 
                            msgType={msgType}
                            msg={msg}
                            />
                        }
    </>
  );
}



export default MyVerticallyCenteredModal