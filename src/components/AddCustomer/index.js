import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const AddPost = ({ customers, addCustomer }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkCustomerEmailExists = customers.filter((customer) =>
      customer.email === email ? customer : null
    );
    const checkCustomerPhoneExists = customers.filter((customer) =>
      customer.phone === phone ? customer : null
    );

    if (!email || !name || !phone || !address) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkCustomerEmailExists.length > 0) {
      return toast.error("This email already exists!!");
    }
    if (checkCustomerPhoneExists.length > 0) {
      return toast.error("This phone number already exists!!");
    }
    if (checkCustomerPhoneExists.length > 0) {
      return toast.error("This address number already exists!!");
    }

    const data = {
      id: customers.length > 0 ? customers[customers.length - 1].id + 1 : 0,
      email,
      name,
      phone,
      address,
    };

    addCustomer(data);
    toast.success("Customer added successfully!!");
    history.push("/");
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center text-dark py-3 display-2">Add Post</h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="Add Customer"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  customers: state,
});
const mapDispatchToProps = (dispatch) => ({
  addCustomer: (data) => {
    dispatch({ type: "ADD_CUSTOMER", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
