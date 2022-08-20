export default function (state, action) {
  switch (action.type) {
    case 'sendMessage':
      return action.payload;

    case 'recieveMessage':
      return action.payload;

    case 'chatIdChanged':
      return action.payload;

    default:
      return state;
  }
}
