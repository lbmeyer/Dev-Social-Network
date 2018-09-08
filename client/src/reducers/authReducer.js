const initializeState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initializeState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
