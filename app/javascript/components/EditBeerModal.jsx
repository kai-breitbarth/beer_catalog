import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";

const { Option } = Select;

class EditBeerModal extends React.Component {
  formRef = React.createRef();
  state = {
    visible: false,
  };

  onFinish = (values) => {
    const url = "api/v1/beers/update";
    values.id = this.props.beer.id;
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((data) => {
        if (data.ok) {
          this.handleCancel();

          return data.json();
        }
        throw new Error("Network error.");
      })
      .then(() => {
        this.props.reloadBeers();
      })
      .catch((err) => console.error("Error: " + err));
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    let beer = this.props.beer;
    return (
      <>
        <a onClick={this.showModal}>Edit</a>

        <Modal title="Edit Beer ..." open={this.state.visible} onCancel={this.handleCancel} footer={null}>
          <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish} initialValues={beer}>
            <Form.Item name="brand" label="Brand" rules={[{ required: true, message: "Please input your beer brand!" }]}>
              <Input placeholder="Input your beer brand" />
            </Form.Item>

            <Form.Item name="style" label="Style" rules={[{ required: true, message: "Please input your beer style!" }]}>
              <Input placeholder="Input your beer style" />
            </Form.Item>

            <Form.Item
              name="country"
              label="Country"
              rules={[
                {
                  required: true,
                  message: "Please input the country of the beer!",
                },
              ]}
            >
              <Select showSearch placeholder="Select your beer country" optionFilterProp="items" style={{ width: "100%" }}>
                <Option value="Finland">Finland</Option>
                <Option value="Germany">Germany</Option>
                <Option value="Netherlands">Netherlands</Option>
                <Option value="UK">UK</Option>
                <Option value="USA">USA</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: "Please input the quantity!" }]}>
              <Input type="number" placeholder="How many beers you desire?" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default EditBeerModal;
