/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const assert = require("assert");
const request = require("supertest");
const { describe } = require("mocha");
const { app } = require("../../app");

let AIchatId = 0;
let userId = 0;
let projectId = 0;
let companyId = 0;
let teamId = 0;
let skillId = 0;
let projectNoteId = 0;
const userCreateTaskId = 2;
let taskId = 0;
let taskStepId = 0;
let postId = 0;
let accountId = 0;
const message = "can tell me about this project?";

describe("Create User API Tests (create)", () => {
  it("Should create a new user with valid input data", (done) => {
    const user = {
      Username: "example_username",
      FirstName: "John",
      LastName: "Doe",
      Email: "john.doe@example.com",
      Password: "secure_password",
      Country: "United States",
      CreatedBy: 1,
      Rate: 4.5,
      DateOfBirth: "1990-01-01",
      Gender: "Male",
      Work: "Software Developer",
      Bio: "A passionate individual in the field of technology.",
      LastTimeOnline: "2024-01-21T08:30:00Z",
    };
    const mutation = `
    mutation {
      createNewUser(user: $user) {
        _id
        Username
        FirstName
        LastName
        Email
        Password
        Country
        IsActive
        CreatedBy
        CreateDate
        Rate
        DateOfBirth
        Gender
        Work
        Bio
        LastTimeOnline
      }
    }
    `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        if (userId === 0) {
          userId = data?.createNewUser?._id;
        }

        assert.notStrictEqual(data?.createNewUser, null);
        assert.notStrictEqual(data?.createNewUser?._id, null);
        assert.notStrictEqual(data?.createNewUser?.CreateDate, null);
        assert.strictEqual(data?.createNewUser?.Username, user.Username);
        assert.strictEqual(data?.createNewUser?.FirstName, user.FirstName);
        assert.strictEqual(data?.createNewUser?.LastName, user.LastName);
        assert.strictEqual(data?.createNewUser?.Email, user.Email);
        assert.strictEqual(data?.createNewUser?.Password, user.Password);
        assert.strictEqual(data?.createNewUser?.Country, user.Country);
        assert.strictEqual(data?.createNewUser?.IsActive, true);
        assert.strictEqual(data?.createNewUser?.CreatedBy, user.CreatedBy);
        assert.strictEqual(data?.createNewUser?.Rate, user.Rate);
        assert.strictEqual(data?.createNewUser?.DateOfBirth, user.DateOfBirth);
        assert.strictEqual(data?.createNewUser?.Gender, user.Gender);
        assert.strictEqual(data?.createNewUser?.Work, user.Work);
        assert.strictEqual(data?.createNewUser?.Bio, user.Bio);
        assert.strictEqual(
          data?.createNewUser?.LastTimeOnline,
          user.LastTimeOnline
        );

        done();
      });
  });
});

describe("Create AIChat API Tests", () => {
  it("Should create a new AI chat for a valid user ID", () => {
    const mutation = `
      mutation {
        createNewAIChat(userId: ${userId}) {
          _id
          CreatedDate
        }
      }
    `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return assert.fail(err);
        const aiChat = res?.body?.data?.createNewAIChat;
        if (AIchatId === 0) {
          AIchatId = aiChat?._id;
        }
        assert.notStrictEqual(aiChat, null);
        assert.notStrictEqual(aiChat._id, null);
        assert.notStrictEqual(aiChat.CreatedDate, null);
      });
  });
});

describe("Create Project API Tests", () => {
  it("Should create a new project with valid input data", (done) => {
    const project = {
      ProjectName: "Sample Project",
      ProjectDescription: "This is a sample project description.",
      FileName: "sample.txt",
    };
    const mutation = `
        mutation {
          createNewProject(
            project: $project
          ) {
            _id
            ProjectName
            ProjectDescription
            FileName
          }
        }
      `;

    request(app)
      .post("/graphql")
      .send({ query: mutation, variables: { project } })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;

        assert.notStrictEqual(data?.createNewProject, null);
        assert.notStrictEqual(data?.createNewProject?._id, null);
        if (projectId === 0) {
          projectId = data?.createNewProject?._id;
        }
        assert.strictEqual(
          data?.createNewProject?.ProjectName,
          project?.ProjectName
        );
        assert.strictEqual(
          data?.createNewProject?.ProjectDescription,
          project?.ProjectDescription
        );
        assert.strictEqual(data?.createNewProject?.FileName, project?.FileName);
        done();
      });
  });
});

describe("Create Project Requirement API Test", () => {
  it("Should create a new project requirement with valid input data", (done) => {
    const projectRequirement = {
      Value: "Sample Requirement",
    };
    const mutation = `
        mutation {
          createNewProjectRequirement(
            projectId: ${projectId}
            requirement: $projectRequirement
          ) {
            _id: ID
            Value: String
          }
        }
      `;

    request(app)
      .post("/graphql")
      .send({ query: mutation, variables: { projectRequirement } })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;

        assert.notStrictEqual(data?.createNewProjectRequirement, null);
        assert.notStrictEqual(data?.createNewProjectRequirement?._id, null);
        assert.strictEqual(
          data?.createNewProjectRequirement?.Value,
          projectRequirement?.Value
        );
        done();
      });
  });
});

describe("Send AI Message", () => {
  it("Should create a new AI Message and link it with AI chat", () => {
    const fileName = "file1.pdf";
    const mutation = `
      mutation {
        sendAIMessage(message: "${message}", fileName: "${fileName}", AIchatId: ${AIchatId}) {
          _id
          Question
          Answer
          CreatedDate
        }
      }
    `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return assert.fail(err);
        const sendAIMessage = res?.body?.data?.sendAIMessage;
        assert.notStrictEqual(sendAIMessage, null);
        assert.notStrictEqual(sendAIMessage._id, null);
        assert.notStrictEqual(sendAIMessage.Answer, null);
        assert.notStrictEqual(sendAIMessage.CreatedDate, null);
        assert.strictEqual(sendAIMessage.Question, message);
      });
  });
});

describe("Create Company API Tests", () => {
  it("Should create a new company with valid input data", (done) => {
    const company = {
      CompanyName: "Test Company",
      CompanyDescription: "Test company description",
      Domain: "a",
      Rate: 4.5,
    };

    const mutation = `
        mutation {
          createNewCompany(company: $company , userId: ${userId}) {
            CompanyName
            CompanyDescription
            Domain
            Rate
          }
        }
      `;

    request(app)
      .post("/graphql")
      .send({ query: mutation, variables: { company } })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;

        assert.notStrictEqual(data?.createNewCompany, null);
        assert.notStrictEqual(data?.createNewCompany?._id, null);
        if (companyId === 0) {
          companyId = data?.createNewCompany?._id;
        }
        assert.strictEqual(
          data?.createNewCompany?.CompanyName,
          company?.CompanyName
        );
        assert.strictEqual(
          data?.createNewCompany?.CompanyDescription,
          company?.CompanyDescription
        );
        assert.strictEqual(data?.createNewCompany?.Domain, company?.Domain);
        assert.strictEqual(data?.createNewCompany?.Rate, company?.Rate);

        done();
      });
  });
});

describe("Create Team API Tests", () => {
  it("Should create a new team with valid input data", (done) => {
    const team = {
      TeamName: "Test Team",
      IsDeleted: false,
      TeamRole: "Developer",
      CreateDate: "2024-02-26T12:00:00Z",
    };

    const mutation = `
      mutation {
        createNewTeam(team: $team, companyId: ${companyId}) {
          TeamName
          IsDeleted
          TeamRole
          CreateDate
        }
      }
    `;

    request(app)
      .post("/graphql")
      .send({ query: mutation, variables: { team } })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert.notStrictEqual(data?.createNewTeam, null);
        assert.notStrictEqual(data?.createNewTeam?._id, null);
        if (teamId === 0) {
          teamId = data?.createNewTeam?._id;
        }

        assert.strictEqual(data?.createNewTeam?.TeamName, team?.TeamName);
        assert.strictEqual(data?.createNewTeam?.IsDeleted, team?.IsDeleted);
        assert.strictEqual(data?.createNewTeam?.TeamRole, team?.TeamRole);
        assert.strictEqual(data?.createNewTeam?.CreateDate, team?.CreateDate);
        done();
      });
  });
});

describe("Create Skill API Tests", () => {
  it("Should create a new skill with valid input data", (done) => {
    const skillInput = {
      Skill: "Test Skill",
    };

    const mutation = `
        mutation {
          createNewSkill(skill: $skillInput, userId: ${userId}) {
            _id
            Skill
          }
        }
      `;

    request(app)
      .post("/graphql")
      .send({ query: mutation, variables: { skillInput } })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert.notStrictEqual(data?.createNewSkill, null);
        assert.notStrictEqual(data?.createNewSkill?._id, null);
        if (skillId === 0) {
          skillId = data?.createNewSkill?._id;
        }
        assert.strictEqual(data?.createNewSkill?.Skill, skillInput.Skill);

        done();
      });
  });
});

describe("Create Contact Message API Tests", () => {
  it("Should create a new contact message with valid input data", (done) => {
    const contactMessageInput = {
      Message: "Test contact message",
    };

    const mutation = `
        mutation {
          createNewContactMessage(contactMessage: $contactMessage , userId: ${userId}) {
            _id
            Message
            CreatedDate
          }
        }
      `;

    request(app)
      .post("/graphql")
      .send({
        query: mutation,
        variables: { contactMessage: contactMessageInput },
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;

        assert.notStrictEqual(data?.createNewContactMessage, null);
        assert.notStrictEqual(data?.createNewContactMessage?._id, null);

        assert.strictEqual(
          data?.createNewContactMessage?.Message,
          contactMessageInput.Message
        );

        done();
      });
  });
});

describe("Create Position Post API Tests", () => {
  it("Should create a new position post with valid input data", (done) => {
    const positionPostInput = {
      Content: "Test position post content",
    };

    const mutation = `
        mutation {
          createPositionPost(post: $positionPost, companyId: ${companyId}) {
            _id
            Content
            CreatedDate
            IsDeleted
          }
        }
      `;

    request(app)
      .post("/graphql")
      .send({ query: mutation, variables: { positionPost: positionPostInput } })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert.notStrictEqual(data?.createPositionPost, null);
        assert.notStrictEqual(data?.createPositionPost?._id, null);
        if (postId === 0) {
          postId = data?.createPositionPost?._id;
        }
        assert.strictEqual(
          data?.createPositionPost?.Content,
          positionPostInput.Content
        );

        done();
      });
  });
});

describe("Add a User To a Team", () => {
  it("Should add a user to a team with valid input data", (done) => {
    const role = "Developer";

    const mutation = `
        mutation {
          addUserToTeam(teamId: ${teamId}, userId: ${userId}, role: "${role}")
        }
      `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert.strictEqual(data?.addUserToTeam, true);

        done();
      });
  });
});

describe("Create Project Note API Tests", () => {
  it("Should create a new project note with valid input data", (done) => {
    const projectNoteInput = {
      Title: "Test Project Note Title",
    };

    const mutation = `
    mutation{
      createProjectNote(projectNote: {Title: "${projectNoteInput.Title}"}, projectId: ${projectId}) {
        Tasks {
          _id
          Title
          Description
        }
        Title
        _id
      }
    }
      `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        if (projectNoteId === 0) {
          projectNoteId = data?.createProjectNote?._id;
        }
        assert.notStrictEqual(data?.createProjectNote, null);
        assert.notStrictEqual(data?.createProjectNote?._id, null);
        assert.strictEqual(
          data?.createProjectNote?.Title,
          projectNoteInput.Title
        );

        done();
      });
  });
});

describe("Create Project Note Task API Tests", () => {
  it("Should create a new project note task with valid input data", (done) => {
    const projectNoteTaskInput = {
      Title: "Test Project Note Task Title",
      Description: "Test Project Note Task Description",
    };

    const mutation = `
        mutation {
          createProjectNoteTask(projectNoteTask: {
            Title: "${projectNoteTaskInput.Title}",
            Description: "${projectNoteTaskInput.Description}",
          }, projectNoteId: ${projectNoteId}) {
            _id
            Title
            Description
          }
        }
      `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert.notStrictEqual(data?.createProjectNoteTask, null);
        assert.notStrictEqual(data?.createProjectNoteTask?._id, null);
        assert.strictEqual(
          data?.createProjectNoteTask?.Title,
          projectNoteTaskInput.Title
        );
        assert.strictEqual(
          data?.createProjectNoteTask?.Description,
          projectNoteTaskInput.Description
        );

        done();
      });
  });
});

describe("Create Account API Tests", () => {
  it("Should create a account with valid input data", (done) => {
    const socialMediaLinkInput = {
      PlatformName: "Test Platform",
      Link: "https://example.com/test",
    };

    const mutation = `
        mutation {
          createNewSocialMediaLink(socialMediaAccount: {
            PlatformName: "${socialMediaLinkInput.PlatformName}",
            Link: "${socialMediaLinkInput.Link}",
          }, userId: ${userId}) {
            _id
            PlatformName
            Link
          }
        }
      `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert.notStrictEqual(data?.createNewSocialMediaLink, null);
        assert.notStrictEqual(data?.createNewSocialMediaLink?._id, null);
        if (accountId === 0) {
          accountId = data?.createNewSocialMediaLink?._id;
        }
        assert.strictEqual(
          data?.createNewSocialMediaLink?.PlatformName,
          socialMediaLinkInput.PlatformName
        );
        assert.strictEqual(
          data?.createNewSocialMediaLink?.Link,
          socialMediaLinkInput.Link
        );

        done();
      });
  });
});

describe("Create Task For User API Tests", () => {
  it("Should create a new task for a user with valid input data", (done) => {
    const taskInput = {
      TaskName: "Test Task",
      TaskStatus: "Pending",
      StartDate: "2024-03-01",
      EndDate: "2024-03-15",
      Priority: 1,
      Comments: "Test comments",
      IsMarked: false,
    };

    const mutation = `
        mutation {
          createTaskForUser(task: {
            TaskName: "${taskInput.TaskName}",
            TaskStatus: "${taskInput.TaskStatus}",
            StartDate: "${taskInput.StartDate}",
            EndDate: "${taskInput.EndDate}",
            Priority: ${taskInput.Priority},
            Comments: "${taskInput.Comments}",
            IsMarked: ${taskInput.IsMarked},
          }, userId: ${userId}, userCreateTaskId: ${userCreateTaskId}, companyId: ${companyId}) {
            _id
            TaskName
            TaskStatus
            StartDate
            EndDate
            Priority
            Comments
            IsMarked
            CreateDate
          }
        }
      `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        if (taskId === 0) {
          taskId = data?.createTaskForUser?._id;
        }
        assert.notStrictEqual(data.createTaskForUser, null);
        assert.notStrictEqual(data.createTaskForUser._id, null);
        assert.strictEqual(data.createTaskForUser.TaskName, taskInput.TaskName);
        assert.strictEqual(
          data.createTaskForUser.TaskStatus,
          taskInput.TaskStatus
        );
        assert.strictEqual(
          data.createTaskForUser.StartDate,
          taskInput.StartDate
        );
        assert.strictEqual(data.createTaskForUser.EndDate, taskInput.EndDate);
        assert.strictEqual(data.createTaskForUser.Priority, taskInput.Priority);
        assert.strictEqual(data.createTaskForUser.Comments, taskInput.Comments);
        assert.strictEqual(data.createTaskForUser.IsMarked, taskInput.IsMarked);

        done();
      });
  });
});

describe("Create Task For Team API Tests", () => {
  it("Should create a new task for a team with valid input data", (done) => {
    const taskInput = {
      TaskName: "Test Task",
      TaskStatus: "Pending",
      StartDate: "2024-03-01",
      EndDate: "2024-03-15",
      Priority: 1,
      Comments: "Test comments",
      IsMarked: false,
    };

    const mutation = `
        mutation {
          createTaskForTeam(task: {
            TaskName: "${taskInput.TaskName}",
            TaskStatus: "${taskInput.TaskStatus}",
            StartDate: "${taskInput.StartDate}",
            EndDate: "${taskInput.EndDate}",
            Priority: ${taskInput.Priority},
            Comments: "${taskInput.Comments}",
            IsMarked: ${taskInput.IsMarked},
          }, teamId: ${teamId}, userId: ${userId}) {
            _id
            TaskName
            TaskStatus
            StartDate
            EndDate
            Priority
            Comments
            IsMarked
            CreateDate
          }
        }
      `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert.notStrictEqual(data.createTaskForTeam, null);
        assert.notStrictEqual(data.createTaskForTeam._id, null);
        assert.strictEqual(data.createTaskForTeam.TaskName, taskInput.TaskName);
        assert.strictEqual(
          data.createTaskForTeam.TaskStatus,
          taskInput.TaskStatus
        );
        assert.strictEqual(
          data.createTaskForTeam.StartDate,
          taskInput.StartDate
        );
        assert.strictEqual(data.createTaskForTeam.EndDate, taskInput.EndDate);
        assert.strictEqual(data.createTaskForTeam.Priority, taskInput.Priority);
        assert.strictEqual(data.createTaskForTeam.Comments, taskInput.Comments);
        assert.strictEqual(data.createTaskForTeam.IsMarked, taskInput.IsMarked);

        done();
      });
  });
});

describe("Create Task Step API Tests", () => {
  it("Should create a new task step with valid input data", (done) => {
    const taskStepInput = {
      Description: "Test Task Step Description",
      Number: 1,
    };

    const mutation = `
        mutation {
          createTaskStep(taskStep: {
            Description: "${taskStepInput.Description}",
            Number: ${taskStepInput.Number},
          }, taskId: ${taskId}) {
            _id
            Description
            Number
          }
        }
      `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert.notStrictEqual(data.createTaskStep, null);
        assert.notStrictEqual(data.createTaskStep._id, null);

        if (taskStepId === 0) {
          taskStepId = data.createTaskStep._id;
        }

        assert.strictEqual(
          data.createTaskStep.Description,
          taskStepInput.Description
        );
        assert.strictEqual(data.createTaskStep.Number, taskStepInput.Number);

        done();
      });
  });
});

describe("Create Company Comment API Tests", () => {
  it("Should create a new comment for a company with valid input data", (done) => {
    const commentInput = {
      Value: "Test comment value",
      CreatedDate: "2024-03-01T12:00:00Z", // Optional: Replace with a valid created date if needed
    };

    const mutation = `
        mutation {
          createCompanyComment(comment: {
            Value: "${commentInput.Value}",
            CreatedDate: "${commentInput.CreatedDate}",
          }, companyId: ${companyId}) {
            _id
            Value
            CreatedDate
          }
        }
      `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert.ok(data.createCompanyComment._id);
        assert.strictEqual(data.createCompanyComment.Value, commentInput.Value);
        assert.strictEqual(
          data.createCompanyComment.CreatedDate,
          commentInput.CreatedDate
        );

        done();
      });
  });
});

describe("Create Education API Tests", () => {
  it("Should create a new education with valid input data", (done) => {
    const educationInput = {
      Title: "Test education title",
      Description: "Test education description",
      FileName: "test.pdf",
    };

    const mutation = `
        mutation {
          createEducation(education: {
            Title: "${educationInput.Title}",
            Description: "${educationInput.Description}",
            FileName: "${educationInput.FileName}",
          }, userId: ${userId}) {
            _id
            Title
            Description
            FileName
          }
        }
      `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert.notStrictEqual(data?.createEducation, null);
        assert.notStrictEqual(data?.createEducation._id, null);
        assert.strictEqual(data?.createEducation.Title, educationInput.Title);
        assert.strictEqual(
          data?.createEducation.Description,
          educationInput.Description
        );
        assert.strictEqual(
          data?.createEducation.FileName,
          educationInput.FileName
        );

        done();
      });
  });
});

describe("Apply To a Post API Tests", () => {
  it("Should apply to a post with valid post and user IDs", (done) => {
    const mutation = `
        mutation {
          applyToPost(postId: ${postId}, userId: ${userId})
        }
      `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert.strictEqual(data.applyToPost, true);

        done();
      });
  });
});

describe("apply for project", () => {
  it("Should apply for project and return true", (done) => {
    const query = `
    query{
      applyForProject(projectId: ${projectId}, companyId: ${companyId})
        }
        `;

    request(app)
      .post("/graphql")
      .send({ query })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        assert.strictEqual(data.applyForProject, true);
        done();
      });
  });
});

describe("Update User API Tests (update)", () => {
  it("Should update an existing user with valid input data", (done) => {
    const mutation = `
      mutation {
        updateUser(userId: ${userId}, user: {
          Username: "aa",
          FirstName: "b",
          LastName: "c",
          Email: "abc@example.com",
          Password: "123",
          Country: "as",
          IsActive: false,
          CreatedBy: 99,
          CreateDate: "2025-02-26T12:00:00Z",
          Rate: 4.8,
          DateOfBirth: "1988-05-15",
          Gender: "Female",
          Work: "Data Scientist",
          Bio: "A data enthusiast with a passion for analysis.",
          LastTimeOnline: "2024-02-26T10:00:00Z",
        }) {
          _id
          Username
          FirstName
          LastName
          Email
          Country
          IsActive
          CreatedBy
          CreateDate
          Rate
          DateOfBirth
          Gender
          Work
          Bio
          LastTimeOnline
        }
      }
    `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert(data.updateUser._id); // Ensure an ID is returned for the updated user
        assert.strictEqual(data.updateUser.Username, "aa"); // Ensure the updated user has the expected values
        assert.strictEqual(data.updateUser.FirstName, "b");
        assert.strictEqual(data.updateUser.LastName, "c");
        assert.strictEqual(data.updateUser.Email, "abc@example.com");
        assert.strictEqual(data.updateUser.Country, "as");
        assert.strictEqual(data.updateUser.Gender, "Female");
        assert.strictEqual(data.updateUser.Rate, 4.8);
        assert.strictEqual(data.updateUser.DateOfBirth, "1988-05-15");
        assert.strictEqual(data.updateUser.Work, "Data Scientist");
        assert.strictEqual(
          data.updateUser.Bio,
          "A data enthusiast with a passion for analysis."
        );
        assert.strictEqual(data.updateUser.IsActive, false);
        assert.strictEqual(
          data.updateUser.LastTimeOnline,
          "2024-02-26T10:00:00Z"
        );
        assert.strictEqual(data.updateUser.CreateDate, "2025-02-26T12:00:00Z");
        assert.strictEqual(data.updateUser.CreatedBy, 99);

        done();
      });
  });
});

describe("Update Task API Tests", () => {
  it("Should update a task with valid input data", (done) => {
    const taskInput = {
      TaskName: "Updated Task Name",
      TaskStatus: "In Progress",
      StartDate: "2024-02-23",
      EndDate: "2024-03-15",
      Priority: 3,
      Comments: "This is a sample task for testing purposes.",
      IsMarked: true,
      CreateDate: "2024-02-23T10:00:00Z",
    };

    const mutation = `
        mutation {
          updateTask(taskId: ${taskId}, task: {
            TaskName: "${taskInput.TaskName}",
            TaskStatus: "${taskInput.TaskStatus}",
            StartDate: "${taskInput.StartDate}",
            EndDate: "${taskInput.EndDate}",
            Priority: ${taskInput.Priority},
            Comments: "${taskInput.Comments}",
            IsMarked: ${taskInput.IsMarked},
            CreateDate: "${taskInput.CreateDate}",
          }) {
            _id
            TaskName
            TaskStatus
            StartDate
            EndDate
            Priority
            Comments
            IsMarked
            CreateDate
          }
        }
      `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert(data.updateTask._id);
        assert.strictEqual(data.updateTask.TaskName, taskInput.TaskName);
        assert.strictEqual(data.updateTask.TaskStatus, taskInput.TaskStatus);
        assert.strictEqual(data.updateTask.StartDate, taskInput.StartDate);
        assert.strictEqual(data.updateTask.EndDate, taskInput.EndDate);
        assert.strictEqual(data.updateTask.Priority, taskInput.Priority);
        assert.strictEqual(data.updateTask.Comments, taskInput.Comments);
        assert.strictEqual(data.updateTask.IsMarked, taskInput.IsMarked);

        done();
      });
  });
});

describe("Update Task Step API Tests", () => {
  it("Should update a task step with valid input data", (done) => {
    const taskStepInput = {
      Description: "Updated Task Step Description",
      Number: 2,
    };

    const mutation = `
        mutation {
          updateTaskStep(taskStepId: ${taskStepId}, taskStep:{
            Description: "${taskStepInput.Description}",
            Number: ${taskStepInput.Number},
          }) {
            _id
            Description
            Number
          }
        }
      `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert.ok(data.updateTaskStep._id);
        assert.strictEqual(
          data.updateTaskStep.Description,
          taskStepInput.Description
        );
        assert.strictEqual(data.updateTaskStep.Number, taskStepInput.Number);

        done();
      });
  });
});

describe("Update Company API Tests", () => {
  it("Should update a company with valid input data", (done) => {
    const companyInput = {
      CompanyName: "Updated Company Name",
      CompanyDescription: "Updated Company Description",
      Domain: "updatedcompany.com",
      Rate: 4.5,
    };

    const mutation = `
        mutation {
          updateCompany(companyId: ${companyId}, company: {
            CompanyName: "${companyInput.CompanyName}",
            CompanyDescription: "${companyInput.CompanyDescription}",
            Domain: "${companyInput.Domain}",
            Rate: ${companyInput.Rate},
          }) {
            _id
            CompanyName
            CompanyDescription
            Domain
            Rate
          }
        }
      `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert.ok(data.updateCompany._id);
        assert.strictEqual(
          data.updateCompany.CompanyName,
          companyInput.CompanyName
        );
        assert.strictEqual(
          data.updateCompany.CompanyDescription,
          companyInput.CompanyDescription
        );
        assert.strictEqual(data.updateCompany.Domain, companyInput.Domain);
        assert.strictEqual(data.updateCompany.Rate, companyInput.Rate);

        done();
      });
  });
});

describe("Update Project API Tests", () => {
  it("Should update a project with valid input data", (done) => {
    const projectInput = {
      ProjectName: "Updated Project Name",
      ProjectDescription: "Updated Project Description",
      FileName: "updatedfile.pdf",
    };

    const mutation = `
        mutation {
          updateProject(projectId: ${projectId}, project: {
            ProjectName: "${projectInput.ProjectName}",
            ProjectDescription: "${projectInput.ProjectDescription}",
            FileName: "${projectInput.FileName}",
          }) {
            _id
            ProjectName
            ProjectDescription
            FileName
          }
        }
      `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert.ok(data.updateProject._id);
        assert.strictEqual(
          data.updateProject.ProjectName,
          projectInput.ProjectName
        );
        assert.strictEqual(
          data.updateProject.ProjectDescription,
          projectInput.ProjectDescription
        );
        assert.strictEqual(data.updateProject.FileName, projectInput.FileName);

        done();
      });
  });
});

describe("Update Position Post API Tests", () => {
  it("Should update a position post with valid input data", (done) => {
    const positionPostInput = {
      Content: "Updated post content",
    };

    const mutation = `
        mutation {
          updatePositionPost(positionPostId: ${postId}, positionPost: {
            Content: "${positionPostInput.Content}",
          }) {
            _id
            Content
            CreatedDate
            IsDeleted
          }
        }
      `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert.ok(data.updatePositionPost._id);
        assert.strictEqual(
          data.updatePositionPost.Content,
          positionPostInput.Content
        );

        done();
      });
  });
});

describe("Update Education API Tests", () => {
  it("Should update an education with valid input data", (done) => {
    const educationInput = {
      Title: "Updated Education Title",
      Description: "Updated Education Description",
      FileName: "updatedfile.pdf",
    };

    const mutation = `
        mutation {
          updateEducation(educationId: ${educationId}, education: {
            Title: "${educationInput.Title}",
            Description: "${educationInput.Description}",
            FileName: "${educationInput.FileName}",
          }) {
            _id
            Title
            Description
            FileName
          }
        }
      `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert.notStrictEqual(data?.updateEducation, null);
        assert.strictEqual(data?.updateEducation?._id, educationId);
        assert.strictEqual(data?.updateEducation?.Title, educationInput.Title);
        assert.strictEqual(
          data?.updateEducation?.Description,
          educationInput.Description
        );
        assert.strictEqual(
          data?.updateEducation?.FileName,
          educationInput.FileName
        );

        done();
      });
  });
});

describe("Update Team API Tests", () => {
  it("Should update a team with valid input data", (done) => {
    const teamInput = {
      TeamName: "Updated Team Name",
      TeamRole: "Updated Team Role",
    };

    const mutation = `
        mutation {
          updateTeam(teamId: ${teamId}, team: {
            TeamName: "${teamInput.TeamName}",
            TeamRole: "${teamInput.TeamRole}",
          }) {
            _id
            TeamName
            TeamRole
          }
        }
      `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert.notStrictEqual(data?.updateTeam, null);
        assert.strictEqual(data?.updateTeam?._id, teamId);
        assert.strictEqual(data?.updateTeam?.TeamName, teamInput.TeamName);
        assert.strictEqual(data?.updateTeam?.TeamRole, teamInput.TeamRole);

        done();
      });
  });
});

// filterMyCompanies(
//   userId: Int!
//   filterType: String!
//   desc: Boolean
//   page: Int
//   limit: Int
// ): [Company]
describe("filterMyCompanies API Tests", () => {
  it("Should filter my companies with valid input data", (done) => {
    const query = `
    query FilterMyCompanies($userId: Int!, $filterType: String!, $desc: Boolean, $page: Int, $limit: Int) {
      filterMyCompanies(userId: $userId, filterType: $filterType, desc: $desc, page: $page, limit: $limit) {
        _id
        CompanyName
        CompanyDescription
        Domain
      }
    }`;

    request(app)
      .post("/graphql")
      .send({ query, variables: { userId, filterType, desc, page, limit } })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;

        assert.notStrictEqual(data?.filterMyCompanies, null);
        assert.notStrictEqual(data?.filterMyCompanies.length, 0);
        assert.notStrictEqual(data?.filterMyCompanies[0]._id, null);

        done();
      });
  });
});

describe("get AiChat API Test", () => {
  it("Should get an AI chat with valid chat ID", (done) => {
    const query = `
    query GetAIChat($chatId: Int!) {
      getAIChat(chatId: $chatId) {
        CreatedDate
        Messages {
          Answer
          CreatedDate
          Question
          _id
        }
        _id
      }
    }`;

    request(app)
      .post("/graphql")
      .send({ query, variables: { chatId: AIchatId } })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;

        assert.ok(data?.getAIChat?._id);
        assert.equal(data?.getAIChat?._id, AIchatId);
        assert.notStrictEqual(data?.getAIChat?.CreateDate, null);
        assert.notStrictEqual(data?.getAIChat?.Messages.length, 0);
        assert.notStrictEqual(data?.getAIChat?.Messages[0]._id, null);
        assert.notStrictEqual(data?.getAIChat?.Messages[0].Question, null);
        assert.notStrictEqual(data?.getAIChat?.Messages[0].Answer, null);
        assert.notStrictEqual(data?.getAIChat?.Messages[0].CreatedDate, null);
        assert.strictEqual(data?.getAIChat?.Messages[0].Question, message);
        done();
      });
  });
});

describe("get User API Test", () => {
  it("Should get a user with valid user ID", (done) => {
    const query = `
    query GetUser($userId: Int!) {
      getUser(userId: $userId) {
        _id
        Username
        FirstName
        LastName
        Email
        Country
        IsActive
        CreatedBy
        CreateDate
        DateOfBirth
        Gender
        Work
        Bio
        LastTimeOnline
        Password
        Rate
      }
    }`;

    request(app)
      .post("/graphql")
      .send({ query, variables: { userId: 65 } })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;

        assert.ok(data.getUser._id);
        assert.equal(data.getUser._id, 65);
        assert.notStrictEqual(data.getUser.Username, null);
        assert.notStrictEqual(data.getUser.FirstName, null);
        assert.notStrictEqual(data.getUser.LastName, null);
        assert.notStrictEqual(data.getUser.Email, null);
        assert.notStrictEqual(data.getUser.Country, null);
        assert.notStrictEqual(data.getUser.IsActive, null);
        assert.notStrictEqual(data.getUser.CreatedBy, null);
        assert.notStrictEqual(data.getUser.CreateDate, null);
        assert.notStrictEqual(data.getUser.DateOfBirth, null);
        assert.notStrictEqual(data.getUser.Gender, null);
        assert.notStrictEqual(data.getUser.Work, null);
        assert.notStrictEqual(data.getUser.Bio, null);
        assert.notStrictEqual(data.getUser.LastTimeOnline, null);
        assert.notStrictEqual(data.getUser.Rate, null);

        done();
      });
  });
});

describe("get user AiChat API Test", () => {
  it("Should get an AI chat with valid chat ID", (done) => {
    const query = `
    query GetUser($userId: Int!) {
      getUser(userId: $userId) {
        _id
        AIChats {
          _id
          Messages {
            Answer
          }
          CreatedDate
        }
      }
    }`;

    request(app)
      .post("/graphql")
      .send({ query, variables: { userId } })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;

        assert.ok(data.getUser._id);
        assert.equal(data.getUser._id, userId);
        assert.notStrictEqual(data.getUser.AIChats.length, 0);
        assert.notStrictEqual(data.getUser.AIChats[0]._id, null);
        assert.notStrictEqual(data.getUser.AIChats[0].CreatedDate, null);
        assert.notStrictEqual(data.getUser.AIChats[0].Messages, null);

        done();
      });
  });
});

describe("get use accounts", () => {
  it("Should get accounts with valid user ID", (done) => {
    const query = `
    query GetUser($userId: Int!) {
      getUser(userId: $userId) {
        _id
        Accounts {
          _id
          PlatformName
          Link
        }
      }
    }`;

    request(app)
      .post("/graphql")
      .send({ query, variables: { userId } })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;

        assert.ok(data.getUser._id);
        assert.equal(data.getUser._id, userId);
        assert.notStrictEqual(data.getUser.Accounts, null);

        done();
      });
  });
});

describe("get user chats", () => {
  it("Should get chats with valid user ID", (done) => {
    const query = `
        query Query($userId: Int!) {
            getUser(userId: $userId) {
              _id
              Chats {
                CreatedDate
                IsDeleted
                Messages {
                  IsDeleted
                  CreatedDate
                  MessageContent
                  _id
                  userId
                }
                _id
              }
            }
          }`;

    request(app)
      .post("/graphql")
      .send({ query, variables: { userId } })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;

        assert.ok(data.getUser._id);
        assert.equal(data.getUser._id, userId);
        assert.notStrictEqual(data.getUser.Chats, null);

        done();
      });
  });
});

describe("get user CreatedTasks", () => {
  it("Should get CreatedTasks with valid user ID", (done) => {
    const query = `
        query Query($userId: Int!) {
            getUser(userId: $userId) {
              _id
              CreatedTasks {
                _id
                TaskName
                TaskStatus
                StartDate
                EndDate
                Priority
                Comments
                IsMarked
                CreateDate
                Steps {
                  _id
                  Description
                  Number
                }
              }
            }
          }`;

    request(app)
      .post("/graphql")
      .send({ query, variables: { userId } })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;

        assert.ok(data.getUser._id);
        assert.equal(data.getUser._id, userId);
        assert.notStrictEqual(data.getUser.CreatedTasks, null);

        done();
      });
  });
});

describe("get user Educations", () => {
  it("Should get Educations with valid user ID", (done) => {
    const query = `
        query GetUser($userId: Int!) {
            getUser(userId: $userId) {
              _id
              Educations {
                _id
                Title
                Description
                FileName
              }
            }
          }`;

    request(app)
      .post("/graphql")
      .send({ query, variables: { userId } })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;

        assert.ok(data.getUser._id);
        assert.equal(data.getUser._id, userId);
        assert.notStrictEqual(data.getUser.Educations, null);

        done();
      });
  });
});

describe("get user Companies", () => {
  it("Should get Companies with valid user ID", (done) => {
    const query = `
        query GetUser($userId: Int!) {
            getUser(userId: $userId) {
              MyCompanies {
                _id
              }
              _id
            }
          }`;

    request(app)
      .post("/graphql")
      .send({ query, variables: { userId } })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;

        assert.ok(data.getUser._id);
        assert.equal(data.getUser._id, userId);
        assert.notStrictEqual(data.getUser.MyCompanies, null);

        done();
      });
  });
});

describe("get user posts", () => {
  it("Should get posts with valid user ID", (done) => {
    const query = `
        query GetUser($userId: Int!) {
            getUser(userId: $userId) {
              _id
              Posts {
                _id
                Content
                CreatedDate
                IsDeleted
              }
            }
          }
        `;

    request(app)
      .post("/graphql")
      .send({ query, variables: { userId } })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;

        assert.ok(data.getUser._id);
        assert.equal(data.getUser._id, userId);
        assert.notStrictEqual(data.getUser.Posts, null);

        done();
      });
  });
});

describe("get all projects", () => {
  it("Should get all projects", (done) => {
    const query = `
    query{
      getProjects {
        _id
        FileName
      }
        }
        `;

    request(app)
      .post("/graphql")
      .send({ query })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        assert.notStrictEqual(data.getProjects, null);
        done();
      });
  });
});

describe("get project by id", () => {
  it("Should get project by id", (done) => {
    const query = `
    query{
      getProject(projectId: ${projectId}) {
        _id
        FileName
      }
        }
        `;

    request(app)
      .post("/graphql")
      .send({ query })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        assert.equal(data.getProject._id, projectId);
        done();
      });
  });
});

describe("get task by id", () => {
  it("Should get task by id", (done) => {
    const query = `
    query{
      getTask(taskId: ${taskId}) {
        _id
      }
    }
        `;

    request(app)
      .post("/graphql")
      .send({ query })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        assert.equal(data.getTask._id, taskId);
        done();
      });
  });
});

describe("get company by id", () => {
  it("Should get company by id", (done) => {
    const query = `
    query{
      getTask(taskId: ${taskId}) {
        _id
      }
    }
        `;

    request(app)
      .post("/graphql")
      .send({ query })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        assert.equal(data.getTask._id, taskId);
        done();
      });
  });
});

describe("delete AI Chat API Tests (create)", () => {
  it("Should delete an AI chat with valid chat ID", (done) => {
    const mutation = `
      mutation {
        deleteAIChat(AIchatId: ${AIchatId})
      }
    `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        assert.strictEqual(data?.deleteAIChat, true);
        done();
      });
  });
});

describe("delete team", () => {
  it("Should delete team", (done) => {
    const query = `
    query{
      deleteTeam(teamId: ${teamId})
    }
        `;

    request(app)
      .post("/graphql")
      .send({ query, variables: { userId } })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        assert.equal(data.deleteTeam, true);
        done();
      });
  });
});

describe("delete company", () => {
  it("Should delete company", (done) => {
    const query = `
    query{
      deleteCompany(companyId: ${companyId})
        }
        `;

    request(app)
      .post("/graphql")
      .send({ query, variables: { userId } })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        assert.equal(data.deleteCompany, true);
        done();
      });
  });
});

describe("delete skill", () => {
  it("Should delete skill", (done) => {
    const query = `
    query{
      deleteSkill(skillId: ${skillId})
        }
        `;

    request(app)
      .post("/graphql")
      .send({ query, variables: { userId } })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        assert.equal(data.deleteSkill, true);
        done();
      });
  });
});

describe("delete Account", () => {
  it("Should delete Account", (done) => {
    const query = `
    query{
      deleteSocialMediaAccounts(id: ${accountId})
        }
        `;

    request(app)
      .post("/graphql")
      .send({ query })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        assert.equal(data.deleteSocialMediaAccounts, true);
        done();
      });
  });
});
