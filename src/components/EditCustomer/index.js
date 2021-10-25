import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";

const EditCustomer = ({ customers, updateCustomer }) => {
  const { id } = useParams();
  const history = useHistory();
  const currentCustomer = customers.find(
    (customer) => customer.id === parseInt(id)
  );

  useEffect(() => {
    setName(currentCustomer.name);
    setEmail(currentCustomer.email);
    setPhone(currentCustomer.phone);
    setAddress(currentCustomer.address);
  }, [currentCustomer]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkCustomerEmailExists = customers.filter((customer =>
      customer.email === email && customer.id !== currentCustomer.id
        ? customer
        : null
    ));
    const checkCustomerPhoneExists = customers.filter((customer) =>
    customer.phone === phone && customer.id !== currentCustomer.id
        ? customer
        : null
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
      id: currentCustomer.id,
      email,
      name,
      phone,
      address,
    };

    updateCustomer(data);
    toast.success("Customer updated successfully!!");
    history.push("/");
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <button
          className="btn btn-dark ml-auto my-5"
          onClick={() => history.push("/")}
        >
          Go back
        </button>
        <div className="col-md-6 mx-auto shadow p-5">
          {currentCustomer ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  value={name}
                  placeholder={"Name"}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={email}
                  placeholder={"Email"}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={phone}
                  placeholder={"Phone"}
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
              <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary">
                  Update Customer
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => history.push("/")}
                >
                  cancel
                </button>
              </div>
            </form>
          ) : (
            <h1 className="text-center">No Customer Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  customers: state,
});
const mapDispatchToProps = (dispatch) => ({
  updateCustomer: (data) => {
    dispatch({ type: "UPDATE_CUSTOMER", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomer);
