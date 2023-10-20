import getDataFromToken from './getDataFromToken';
import User from '../models/user';

// Middleware to verify JWT token from cookie
export const withAuth = (handler) => async (req, res) => {
  try {
    const token = req.cookies.languageGame;

    if (!token) {
      return res.json({ message: 'Unauthorized: No Token found' });
    }

    const userId = getDataFromToken(token);
    const authUser = await User.findOne({_id: userId, "tokens.token": token});  // retrieve user data from token
    // console.log(authUser);

    if (!authUser) {
      return res.json({ message: 'Unauthorized' });
    }

    req.user = authUser;
    return handler(req, res);
  } catch (error) {
    console.error('Error:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};