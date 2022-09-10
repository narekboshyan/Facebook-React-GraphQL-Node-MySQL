import jwt from 'jsonwebtoken';

export function getTokenPayload(token) {
  try {
    return jwt.verify(token, process.env.APP_SECRET);
  } catch {
    return {};
  }
}

export function getUserId(req, authToken) {
  let token = '';
  if (req && req.headers && req.headers.authorization) {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      token = authHeader.replace('Bearer ', '');
      if (!token) {
        throw new Error('No token found');
      }
    }
  } else if (authToken) {
    token = authToken;
  }
  const { userId } = getTokenPayload(token);
  return userId;
}
