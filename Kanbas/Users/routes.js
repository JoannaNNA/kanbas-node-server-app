import * as dao from './dao.js';
import * as courseDao from '../Courses/dao.js';
import * as enrollmentsDao from '../Enrollments/dao.js';

let currentUser = null;
export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body).exec();
    res.json(user);
  };
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId).exec();
    res.json(status);
  };
  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role).exec();
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name).exec();
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers().exec();
    res.json(users);
    return;
  };
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId).exec();
    res.json(user);
  };
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates).exec();
    const currentUser = req.session['currentUser'];
    if (currentUser && currentUser._id === userId) {
      const updatedUser = await dao.findUserById(userId).exec();
      req.session['currentUser'] = { ...currentUser, ...updatedUser };
    }
    res.json(userUpdates);
  };
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session['currentUser'] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: 'Unable to login. Try again later.' });
    }
  };
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: 'Username already in use' });
      return;
    }
    const currentUser = await dao.createUser(req.body).exec();
    req.session['currentUser'] = currentUser;
    res.json(currentUser);
  };
  const signout = (req, res) => {
    currentUser = null;
    req.session.destroy();
    res.sendStatus(200);
  };
  const profile = async (req, res) => {
    const currentUser = req.session['currentUser'];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };
  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === 'current') {
      const currentUser = req.session['currentUser'];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };
  const createCourse = (req, res) => {
    const currentUser = req.session['currentUser'];
    const newCourse = courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  app.post('/api/users/current/courses', createCourse);
  app.get('/api/users/:userId/courses', findCoursesForEnrolledUser);

  app.post('/api/users', createUser);
  app.get('/api/users', findAllUsers);
  app.get('/api/users/:userId', findUserById);
  app.put('/api/users/:userId', updateUser);
  app.delete('/api/users/:userId', deleteUser);
  app.post('/api/users/signup', signup);
  app.post('/api/users/signin', signin);
  app.post('/api/users/signout', signout);
  app.post('/api/users/profile', profile);
  app.get('/api/courses', (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });
}
