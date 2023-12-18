const { createProject } = require('../controllers/project.controller');
const db = require("../models");
const User = db.user;
const Project = db.project;

jest.mock("node-mailjet");

describe('createProject', () => {
  let req, res, userId, name, project, user;

  beforeEach(() => {
    req = { body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    userId = 'user-id';
    name = 'project-name';
    project = { id: 'project-id', name, createdBy: userId };
    user = { id: userId };
    Project.create = jest.fn().mockResolvedValue(project);
    User.findByPk = jest.fn().mockResolvedValue(user);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a project and associate it with the user', async () => {
    req.body.userId = userId;
    req.body.name = name;

    await createProject(req, res);

    expect(Project.create).toBeCalledWith({ name, createdBy: userId });
    expect(User.findByPk).toBeCalledWith(userId);
    expect(user.addProject).toBeCalledWith(project);
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith({ message: "Project created successfully.", project });
  });

  it('should return a 404 status if the user is not found', async () => {
    req.body.userId = userId;
    req.body.name = name;
    User.findByPk = jest.fn().mockResolvedValue(null);

    await createProject(req, res);

    expect(Project.create).toBeCalledWith({ name, createdBy: userId });
    expect(User.findByPk).toBeCalledWith(userId);
    expect(user.addProject).not.toBeCalled();
    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({ message: "User Not found." });
  });

  it('should return a 500 status and error message if an error occurs', async () => {
    req.body.userId = userId;
    req.body.name = name;
    const error = new Error('Some error');
    Project.create = jest.fn().mockRejectedValue(error);

    await createProject(req, res);

    expect(Project.create).toBeCalledWith({ name, createdBy: userId });
    expect(User.findByPk).toBeCalledWith(userId);
    expect(user.addProject).not.toBeCalled();
    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({ message: "Error while adding Project to User: ", err: error });
  });
});