export default function (state, action) {
  switch (action.type) {
    case 'sendMessage':
      return action.payload;

    default:
      return state;
  }
}
