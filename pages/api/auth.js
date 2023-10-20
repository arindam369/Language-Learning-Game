import { withAuth } from "@/src/helpers/middleware";

const authenticatedRoute = (req, res) => {
  res.status(200).json({ message: 'User is authenticated', user: req.user });
};

export default withAuth(authenticatedRoute);