class message {
  static ACCESS_DENIED = `Access Denied. Please provide a valid token.`;
  static INVALID_TOKEN = `The token is invalid.`;
  static USER_REGISTERED = `User registered successfully.`;
  static USER_ALREADY_EXIST = `This user already exists.`;
  static USER_NOT_FOUND = `User not found.`;
  static USER_LOGIN_SUCCESS = "User logged in successfully";
  static INVALID_USER_CREDENTIALS = "Invalid user credentials";
  static ROOM_CREATED = `Room created.`;
  static ROOM_NOT_FOUND = `Room not found.`;
  static ROOM_IS_ALREADY_FULL = `Room is already full.`;
  static INVALID_JOIN_CODE = `Invalid join code.`;
  static PLAYER_ALREADY_EXIST = `You are already in this room.`;
  static FETCHED_ACTIVE_ROOMS = `Fetched active room.`;
  static START_GAME_VALID_USER = `Room must have 2 players to start the game.`;
  static GAME_START = `Game started.`;
  static GAME_NOT_FOUND = `Game not found.`;
  static INVALID_TURN = `It's not your turn.`;
  static INVALID_MOVE = `Invalid move, cell already occupied`;
  static MOVE_MADE = `Move made`;
}

export { message };
