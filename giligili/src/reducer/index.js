const initialState = {
  name: "Unkonwn",
  icon: null,
};

exports.reducer = (state = initialState, action) => {
  switch (action.type) {
    case "userInfo_action":
      return action;
    default:
      return state;
  }
};
