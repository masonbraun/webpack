//reducer for each tree in the store

//readucer takes in a copy of the current state - state entire store

//reducer takes the action - action

const posts = (state = [], action) => {
  console.log("THE POST WILL CHANGE");
  console.log(state, action);
  return state;
}

export default posts;