import React from 'react';
import { Button, Modal, ModalFooter, ModalHeader,ModalBody} from 'reactstrap';


class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: props.initialModalState,
            fade: true
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
            fade: !this.state.fade

        });
    }

    render() {
        return (
            <div>
                <Button color="info" onClick={this.toggle}>Submit</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}
                       fade={this.state.fade}
                       className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Assessment</ModalHeader>
                    <ModalBody>

                    <h3>Do you want Submit exam?</h3>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Submit Exam</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default class SampleApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <ModalExample initialModalState={false} />
            </div>
        )
    }
}