import React, { Component } from "react";

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';

class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem : this.props.activeItem
        };
    };
    // To check if the checkbox is checked or not
    handleChange = e => {
        let { name, value } = e.target;
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem })
    };

    render() {
        const { toggle, onSave } = this.props;
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Task Item</ModalHeader>
                <ModalBody>

                    <Form>
                        <FormGroup>
                            {/* Title */}
                            <Label for="title">Title</Label>
                            <Input
                             type="text"
                             name="title"
                             value={this.state.activeItem.title}
                             onChange={this.handleChange}
                             placeholder="Enter Task Title"
                            />
                        </FormGroup>

                        <FormGroup>
                            {/* 2 description label */}
                            <Label for="description">Description</Label>
                            <Input
                             type="text"
                             name="description"
                             value={this.state.activeItem.description}
                             onChange={this.handleChange}
                             placeholder="Enter Task Description"
                            />
                        </FormGroup>

                        <FormGroup check>
                            {/* 3 completed label */}
                            <Label for="completed">
                                <Input
                                 type="checkbox"
                                 name="completed"
                                 checked={this.state.activeItem.completed}
                                 onChange={this.handleChange}
                                />
                                Completed
                            </Label>
                        </FormGroup>

                        <FormGroup>
                            {/* priority */}
                            <Label for="prior">Priority</Label>
                            <Input
                             type="integer"
                             name="prior"
                             value={this.state.activeItem.prior}
                             onChange={this.handleChange}
                             placeholder="Enter priority task"
                            />
                        </FormGroup>


                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    };





};

export default CustomModal