const reducer = (state = {}, action) => {
    console.log(state);
    switch (action.type) {
      case 'GET_ALBUMS':
        return { ...state, loading: true };
      case 'ALBUMS_RECEIVED':
        return { ...state, albums: action.json, loading: false }
      default:
        return state;
    }
  };
  
  export default reducer;
