const errorMessages = {
  badRequestData: 'Invalid fields',
  badRequestName: '"displayName" length must be at least 8 characters long',
  badRequestEmptyEmail: '"email" is not allowed to be empty',
  badRequestNullEmail: '"email" is required',
  badRequestInvalidEmail: '"email" must be a valid email',
  badRequestEmptyPassword: '"password" is not allowed to be empty',
  badRequestInvalidPassword: '"password" length must be 6 characters long',
  badRequestNullPassword: '"password" is required',
  badRequestNullName: '"name" is required',
  badRequestNullTitle: '"title" is required',
  badRequestNullContent: '"content" is required',
  badRequestNullCategotyID: '"categoryid" is required',
  badRequestNullCategotyIDs: '"categoryids" is required',
  conflictEmail: 'User already registered',
  unauthorizedEmptyToken: 'Token not found',
  unauthorizedInvalidToken: 'Expired or invalid token',
  notFoundUser: 'User does not exist',
  notFoundPost: 'Post does not exist',
};

module.exports = {
  errorMessages,
};
