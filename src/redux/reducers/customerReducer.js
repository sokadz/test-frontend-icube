const initialState = [
  { id: 0, name: "User Name", email: "email@email.com", phone: 1234567890,  },
  { id: 1, name: "Test Name", email: "test@test.com", phone: 4567891230,  },
];

export const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CUSTOMER":
      state = [...state, action.payload];
      return state;
    case "DELETE_CUSTOMER":
      const customerFilter = state.filter((customer) =>
      customer.id === action.payload ? null : customer
      );
      state = customerFilter;
      return state;
    case "UPDATE_CUSTOMER":
      const customerUpdate = state.filter((customer) =>
      customer.id === action.payload.id
          ? Object.assign(customer, action.payload)
          : customer
      );
      state = customerUpdate;
      return state;
    case "RESET_CUSTOMER":
      state = [{ name: null, email: null, phone: null, address: null }];
      return state;
    default:
      return state;
  }
};
