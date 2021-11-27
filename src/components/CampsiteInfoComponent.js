import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardImg,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
} from "reactstrap";

import { Link } from "react-router-dom";
import { Control, Errors, LocalForm } from "react-redux-form";

const minLength = (len) => (val) => val && val.length >= len;
const maxLength = (len) => (val) => !val || val.length <= len;
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModel: false,
    };
  }
  handleToggle = () => {
    this.setState({
      showModel: !this.state.showModel,
    });
  };
  handleSubmit = (values) => {
    alert(values);
  };
  render() {
    return (
      <>
        <Button outline onClick={this.handleToggle}>
          <i className="fa fa-pencil fa-lg" />
          Submit Comment
        </Button>
        <Modal isOpen={this.state.showModel} toggle={this.handleToggle}>
          <ModalHeader>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm>
              <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <Control.select
                  name="rating"
                  model=".rating"
                  className="col-12">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Control.select>
              </div>
              <div className="form-group">
                <label htmlFor="author">Your name</label>
                <Control.text
                  name="author"
                  model=".author"
                  className="col-12"
                  validators={{
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  model=".author"
                  className="text-danger"
                  component="div"
                  messages={{
                    maxLength: "Must be 15 characters or less",
                    minLength: "Must be at least 2 characters",
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="comment">Comment</label>
                <Control.textarea
                  rows="6"
                  name="text"
                  model=".text"
                  className="col-12"
                />
              </div>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
function RenderComments({ comments }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map((comment) => {
          return (
            <div key={comment.id}>
              <p>{comment.text}</p>
              <p>
                --{comment.author}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(comment.date)))}
              </p>
            </div>
          );
        })}
        <CommentForm />
      </div>
    );
  }
  return <div />;
}

function CampsiteInfo(props) {
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default CampsiteInfo;
