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
let myCompany = 0;
let companyId = 0;
let teamId = 0;
let skillId = 0;
let projectNoteId = 0;
let userCreateTaskId = 0;
let taskId = 0;
let teamTaskId = 0;
let taskStepId = 0;
let teamTaskStepId = 0;
let postId = 0;
let accountId = 0;
let educationId = 0;
let commentId = 0;
let projectRequirementId = 0;
let projectNoteTaskId = 0;
const message = "can tell me about this project?";
const company = {
  CompanyName: "Test Company",
  CompanyDescription: "Test company description",
  Domain: "a",
  Rate: 4.5,
};
const projectRequirement = {
  Value: "Sample Requirement",
};
const projectNoteInput = {
  Title: "Test Project Note Title",
};
const projectNoteTaskInput = {
  Title: "Test Project Note Task Title",
  Description: "Test Project Note Task Description",
};
const project = {
  ProjectName: "Sample Project",
  ProjectDescription: "This is a sample project description.",
  FileName: "sample.txt",
};
const taskInput = {
  TaskName: "Test Task",
  TaskStatus: "Pending",
  StartDate: "2024-03-01",
  EndDate: "2024-03-15",
  Priority: 1,
  Comments: "Test comments",
  IsMarked: false,
};
const taskStepInput = {
  Description: "Test Task Step Description",
  Number: 1,
};
const commentInput = {
  Value: "Test comment value",
  CreatedDate: "2024-03-01T12:00:00Z", // Optional: Replace with a valid created date if needed
};
const team = {
  TeamName: "Test Team",
  TeamRole: "Developer",
  CreateDate: "2024-02-26T12:00:00Z",
};

const user = {
  id: "sikFUvzJTqTEkW7e36vlDR2PAfl1",
  Username: "example_username",
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
  ImageUrl: "https://example.com/john-doe.jpg",
};

const projectInput = {
  ProjectName: "Updated Project Name",
  ProjectDescription: "Updated Project Description",
  FileName: "updatedfile.pdf",
};

const positionPostInput = {
  Content: "Test position post content",
};

const contactMessageInput = {
  Message: "Test contact message",
};

const socialMediaLinkInput = {
  PlatformName: "Test Platform",
  Link: "https://example.com/test",
};

const skillInput = {
  Skill: "Test Skill",
};

describe("Create User API Tests (create)", () => {
  it("Should create a new user with valid input data", (done) => {
    const mutation = `
    mutation{
      createNewUser(user: {
        id: "${user.id}222",
        Username: "${user.Username}",
        Country: "${user.Country}",
        CreatedBy: ${user.CreatedBy},
        Rate: ${user.Rate},
        DateOfBirth: "${user.DateOfBirth}",
        Gender: "${user.Gender}",
        Work: "${user.Work}",
        Bio: "${user.Bio}",
        LastTimeOnline: "${user.LastTimeOnline}",
        ImageUrl: "${user.ImageUrl}",
      }) {
        id
        Username
        FirstName
        LastName
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
        ImageUrl
      }
    }
    `;

    request(app)
      .post("/graphql")
      .send({
        query: mutation,
        variables: {
          user: {
            Username: user.Username,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            Password: user.Password,
            Country: user.Country,
            CreatedBy: user.CreatedBy,
            Rate: user.Rate,
            DateOfBirth: user.DateOfBirth,
            Gender: user.Gender,
            Work: user.Work,
            Bio: user.Bio,
            LastTimeOnline: user.LastTimeOnline,
            ImageUrl: user.ImageUrl,
          },
        },
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        if (userId === 0) {
          userId = user.id;
        }

        assert.notStrictEqual(data?.createNewUser, null || undefined);
        assert.notStrictEqual(data?.createNewUser?.id, null || undefined);
        assert.notStrictEqual(
          data?.createNewUser?.CreateDate,
          null || undefined
        );
        assert.strictEqual(data?.createNewUser?.Username, user.Username);
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

describe("Second Create User API Tests (create)", () => {
  it("Should create a new user with valid input data", (done) => {
    const mutation = `
    mutation{
      createNewUser(user: {
        id: "2YrWwaO2CQd6xqhoKIPbn6ddeq02",
        Username: "${user.Username}",
        FirstName: "Mohammad",
        LastName: "Abu Salh",
        Country: "${user.Country}",
        CreatedBy: ${user.CreatedBy},
        Rate: ${user.Rate},
        DateOfBirth: "${user.DateOfBirth}",
        Gender: "${user.Gender}",
        Work: "${user.Work}",
        Bio: "${user.Bio}",
        LastTimeOnline: "${user.LastTimeOnline}",
        ImageUrl: "${user.ImageUrl}",
      }) {
        id
        Username
        FirstName
        LastName
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
        ImageUrl
      }
    }
    `;

    request(app)
      .post("/graphql")
      .send({
        query: mutation,
        variables: {
          user: {
            Username: user.Username,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            Password: user.Password,
            Country: user.Country,
            CreatedBy: user.CreatedBy,
            Rate: user.Rate,
            DateOfBirth: user.DateOfBirth,
            Gender: user.Gender,
            Work: user.Work,
            Bio: user.Bio,
            LastTimeOnline: user.LastTimeOnline,
            ImageUrl: user.ImageUrl,
          },
        },
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        if (userCreateTaskId === 0) {
          userCreateTaskId = data?.createNewUser?.id;
        }

        assert.notStrictEqual(data?.createNewUser, null || undefined);
        assert.notStrictEqual(data?.createNewUser?.id, null || undefined);
        assert.notStrictEqual(
          data?.createNewUser?.CreateDate,
          null || undefined
        );
        assert.strictEqual(data?.createNewUser?.Username, user.Username);
        assert.strictEqual(data?.createNewUser?.FirstName, "Mohammad");
        assert.strictEqual(data?.createNewUser?.LastName, "Abu Salh");
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
        setTimeout(() => {
          done();
        }, 1900);
      });
  });
});

describe("Create AIChat API Tests", () => {
  it("Should create a new AI chat for a valid user ID", (done) => {
    const mutation = `
    mutation Mutation($userId: String!, $name: String!, $projectId: Int!) {
      createNewAIChat(userId: ${userId}, Name: ${project.ProjectName}, projectId: ${projectId}) {
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
        if (err) return done(err);
        const aiChat = res?.body?.data?.createNewAIChat;
        if (AIchatId === 0) {
          AIchatId = aiChat?._id;
        }
        assert.notStrictEqual(aiChat, null || undefined);
        assert.notStrictEqual(aiChat._id, null || undefined);
        assert.notStrictEqual(aiChat.CreatedDate, null || undefined);
        done();
      });
  });
});

describe("Create Project API Tests", () => {
  it("Should create a new project with valid input data", (done) => {
    const mutation = `
    mutation Mutation($project: ProjectInput!) {
      createNewProject(project: $project) {
            _id
            ProjectName
            ProjectDescription
            FileName
          }
        }
      `;

    request(app)
      .post("/graphql")
      .send({
        query: mutation,
        variables: {
          project: {
            ...project,
          },
        },
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        assert.notStrictEqual(data?.createNewProject, null || undefined);
        assert.notStrictEqual(data?.createNewProject?._id, null || undefined);
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
    const mutation = `
    mutation{
      createProjectRequirement(projectId: ${projectId}, requirement: {
        Value: "${projectRequirement.Value}"
      }) {
        _id
        Value
      }
    }
      `;

    request(app)
      .post("/graphql")
      .send({
        query: mutation,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        assert.notStrictEqual(
          data?.createProjectRequirement,
          null || undefined
        );
        assert.notStrictEqual(
          data?.createProjectRequirement?._id,
          null || undefined
        );
        if (projectRequirementId === 0) {
          projectRequirementId = data?.createProjectRequirement?._id;
        }
        assert.strictEqual(
          data?.createProjectRequirement?.Value,
          projectRequirement?.Value
        );
        done();
      });
  });
});

// describe("Send AI Message", () => {
//   it("Should create a new AI Message and link it with AI chat", () => {
//     const fileName = "file1.pdf";
//     const mutation = `
//       mutation {
//         sendAIMessage(message: "${message}", fileName: "${fileName}", AIchatId: ${AIchatId}) {
//           _id
//           Question
//           Answer
//           CreatedDate
//         }
//       }
//     `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return assert.fail(err);
//         const sendAIMessage = res?.body?.data?.sendAIMessage;
//         assert.notStrictEqual(sendAIMessage, null || undefined);
//         assert.notStrictEqual(sendAIMessage._id, null || undefined);
//         assert.notStrictEqual(sendAIMessage.Answer, null || undefined);
//         assert.notStrictEqual(sendAIMessage.CreatedDate, null || undefined);
//         assert.strictEqual(sendAIMessage.Question, message);
//       });
//   });
// });

describe("Create Company API Tests", () => {
  it("Should create a new company with valid input data", (done) => {
    const mutation = `
    mutation{
      createNewCompany(company: {
        CompanyName: "${company.CompanyName}",
        CompanyDescription: "${company.CompanyDescription}",
        Domain: "${company.Domain}",
        Rate: ${company.Rate}
      }, userId: "${userId}") {
        _id
        CompanyName
        CompanyDescription
        Rate
        Domain
        CreateDate
      }
    }
      `;

    request(app)
      .post("/graphql")
      .send({
        query: mutation,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert.notStrictEqual(data?.createNewCompany, null || undefined);
        assert.notStrictEqual(data?.createNewCompany?._id, null || undefined);
        if (myCompany === 0) {
          myCompany = data?.createNewCompany?._id;
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

describe("Second Create Company API Tests", () => {
  it("Should create a new company with valid input data", (done) => {
    const mutation = `
    mutation{
      createNewCompany(company: {
        CompanyName: "${company.CompanyName}",
        CompanyDescription: "${company.CompanyDescription}",
        Domain: "${company.Domain}",
        Rate: ${company.Rate}
      }, userId: "${userCreateTaskId}") {
        _id
        CompanyName
        CompanyDescription
        Rate
        Domain
        CreateDate
      }
    }
      `;

    request(app)
      .post("/graphql")
      .send({
        query: mutation,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert.notStrictEqual(data?.createNewCompany, null || undefined);
        assert.notStrictEqual(data?.createNewCompany?._id, null || undefined);
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

describe("Create Company Comment API Tests", () => {
  it("Should create a new comment for a company with valid input data", (done) => {
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
        assert.notStrictEqual(data?.createCompanyComment, null || undefined);
        assert.notStrictEqual(
          data?.createCompanyComment?._id,
          null || undefined
        );
        if (commentId === 0) {
          commentId = data?.createCompanyComment?._id;
        }
        assert.strictEqual(data.createCompanyComment.Value, commentInput.Value);
        assert.strictEqual(
          data.createCompanyComment.CreatedDate,
          commentInput.CreatedDate
        );

        done();
      });
  });
});

describe("Create Team API Tests", () => {
  it("Should create a new team with valid input data", (done) => {
    const mutation = `
      mutation {
        createNewTeam(team: {
          TeamName: "${team.TeamName}",
          TeamRole: "${team.TeamRole}",
          CreateDate:"${team.CreateDate}"
        }, companyId: ${companyId}) {
          _id
          TeamName
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
        assert.notStrictEqual(data?.createNewTeam, null || undefined);
        assert.notStrictEqual(data?.createNewTeam?._id, null || undefined);
        if (teamId === 0) {
          teamId = data?.createNewTeam?._id;
        }
        assert.strictEqual(data?.createNewTeam?.TeamName, team?.TeamName);
        assert.strictEqual(data?.createNewTeam?.TeamRole, team?.TeamRole);
        assert.strictEqual(data?.createNewTeam?.CreateDate, team?.CreateDate);
        done();
      });
  });
});

describe("Create Skill API Tests", () => {
  it("Should create a new skill with valid input data", (done) => {
    const mutation = `
        mutation {
          createNewSkill(skill: {
            Skill: "${skillInput.Skill}"
          }, userId: "${userId}") {
            _id
            Skill
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
        assert.notStrictEqual(data?.createNewSkill, null || undefined);
        assert.notStrictEqual(data?.createNewSkill?._id, null || undefined);
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
    const mutation = `
        mutation {
          createNewContactMessage(contactMessage: {
            Message: "${contactMessageInput.Message}"
          } , userId: "${userId}") {
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

        assert.notStrictEqual(data?.createNewContactMessage, null || undefined);
        assert.notStrictEqual(
          data?.createNewContactMessage?._id,
          null || undefined
        );

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
    const mutation = `
        mutation {
          createPositionPost(post: {
            Content: "${positionPostInput.Content}"
          }, companyId: ${companyId}) {
            _id
            Content
            CreatedDate
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
        assert.notStrictEqual(data?.createPositionPost, null || undefined);
        assert.notStrictEqual(data?.createPositionPost?._id, null || undefined);
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

describe("apply for project", () => {
  it("Should apply for project and return true", (done) => {
    const mutation = `
    mutation{
      applyForProject(projectId: ${projectId}, companyId: ${companyId})
        }
        `;

    request(app)
      .post("/graphql")
      .send({ query: mutation })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        assert.strictEqual(data.applyForProject, true);
        done();
      });
  });
});

describe("Add a User To a Team", () => {
  it("Should add a user to a team with valid input data", (done) => {
    const role = "Developer";

    const mutation = `
        mutation {
          addUserToTeam(teamId: ${teamId}, userId: "${userId}", role: "${role}")
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
        assert.notStrictEqual(data?.createProjectNote, null || undefined);
        assert.notStrictEqual(data?.createProjectNote?._id, null || undefined);
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
        assert.notStrictEqual(data?.createProjectNoteTask, null || undefined);
        assert.notStrictEqual(
          data?.createProjectNoteTask?._id,
          null || undefined
        );
        if (projectNoteTaskId === 0) {
          projectNoteTaskId = data?.createProjectNoteTask?._id;
        }
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
    const mutation = `
        mutation {
          createNewSocialMediaLink(socialMediaAccount: {
            PlatformName: "${socialMediaLinkInput.PlatformName}",
            Link: "${socialMediaLinkInput.Link}",
          }, userId: "${userId}") {
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
        assert.notStrictEqual(
          data?.createNewSocialMediaLink,
          null || undefined
        );
        assert.notStrictEqual(
          data?.createNewSocialMediaLink?._id,
          null || undefined
        );
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
            CreateDate: "${taskInput.CreateDate}",
          }, userId: "${userId}", userCreateTaskId: "${userCreateTaskId}", companyId: ${myCompany}, teamId: ${teamId}) {
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
        assert.notStrictEqual(data.createTaskForUser, null || undefined);
        assert.notStrictEqual(data.createTaskForUser._id, null || undefined);
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
          }, teamId: ${teamId}, userId: "${userId}", companyId: ${myCompany}) {
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
        assert.notStrictEqual(data.createTaskForTeam, null || undefined);
        assert.notStrictEqual(data.createTaskForTeam._id, null || undefined);
        if (teamTaskId === 0) {
          teamTaskId = data?.createTaskForTeam?._id;
        }
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
        assert.notStrictEqual(data.createTaskStep, null || undefined);
        assert.notStrictEqual(data.createTaskStep._id, null || undefined);

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

describe("Create Team Task Step API Tests", () => {
  it("Should create a new task step with valid input data", (done) => {
    const mutation = `
        mutation {
          createTaskStep(taskStep: {
            Description: "${taskStepInput.Description}",
            Number: ${taskStepInput.Number},
          }, taskId: ${teamTaskId}) {
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
        assert.notStrictEqual(data.createTaskStep, null || undefined);
        assert.notStrictEqual(data.createTaskStep._id, null || undefined);

        if (teamTaskStepId === 0) {
          teamTaskStepId = data.createTaskStep._id;
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
          }, userId: "${userId}") {
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
        assert.notStrictEqual(data?.createEducation, null || undefined);
        assert.notStrictEqual(data?.createEducation._id, null || undefined);
        if (educationId === 0) {
          educationId = data?.createEducation._id;
        }
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
          applyToPost(postId: ${postId}, userId: "${userId}")
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

describe("Filter My Companies API Tests", () => {
  it("Should filter my companies with valid input data", (done) => {
    const query = `
    query{
      filterMyCompanies(userId: "${userId}", desc: true) {
        _id
        CompanyName
        CompanyDescription
        Domain
        Rate
      }
    }`;

    request(app)
      .post("/graphql")
      .send({ query })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;

        assert.notStrictEqual(data?.filterMyCompanies, null || undefined);
        assert.notStrictEqual(
          data?.filterMyCompanies[0]?._id,
          null || undefined
        );
        assert.strictEqual(
          data?.filterMyCompanies[0]?.CompanyName,
          company.CompanyName
        );
        assert.strictEqual(
          data?.filterMyCompanies[0]?.CompanyDescription,
          company.CompanyDescription
        );
        assert.strictEqual(data?.filterMyCompanies[0]?.Domain, company.Domain);
        assert.strictEqual(data?.filterMyCompanies[0]?.Rate, company.Rate);

        done();
      });
  });
});

describe("Search In My Companies API Tests", () => {
  it("Should search in my companies with valid input data", (done) => {
    const query = `
    query{
      searchInMyCompanies(userId: "${userId}", word: "Company") {
        _id
        CompanyName
        CompanyDescription
        Domain
        Rate
      }
    }`;
    request(app)
      .post("/graphql")
      .send({
        query,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;

        assert.notStrictEqual(data?.searchInMyCompanies, null || undefined);
        assert.notStrictEqual(
          data?.searchInMyCompanies[0]?._id,
          null || undefined
        );
        assert.strictEqual(
          data?.searchInMyCompanies[0]?.CompanyName,
          company.CompanyName
        );
        assert.strictEqual(
          data?.searchInMyCompanies[0]?.CompanyDescription,
          company.CompanyDescription
        );
        assert.strictEqual(
          data?.searchInMyCompanies[0]?.Domain,
          company.Domain
        );
        assert.strictEqual(data?.searchInMyCompanies[0]?.Rate, company.Rate);

        done();
      });
  });
});

describe("Filter Works Companies API Tests", () => {
  it("Should filter works companies with valid input data", (done) => {
    const query = `
    query{
      filterWorksCompanies(userId: "${userId}", desc: true) {
        _id
        CompanyName
        CompanyDescription
        Domain
        Rate
      }
    }`;

    request(app)
      .post("/graphql")
      .send({ query })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;

        assert.notStrictEqual(data?.filterWorksCompanies, null || undefined);
        assert.notStrictEqual(
          data?.filterWorksCompanies[0]?._id,
          null || undefined
        );
        assert.strictEqual(
          data?.filterWorksCompanies[0]?.CompanyName,
          company.CompanyName
        );
        assert.strictEqual(
          data?.filterWorksCompanies[0]?.CompanyDescription,
          company.CompanyDescription
        );
        assert.strictEqual(
          data?.filterWorksCompanies[0]?.Domain,
          company.Domain
        );
        assert.strictEqual(data?.filterWorksCompanies[0]?.Rate, company.Rate);

        done();
      });
  });
});

describe("Search In Works Companies API Tests", () => {
  it("Should search in works companies with valid input data", (done) => {
    const query = `
    query{
      searchInWorksCompanies(userId: "${userId}", word: "Company") {
        _id
        CompanyName
        CompanyDescription
        Domain
        Rate
      }
    }`;

    request(app)
      .post("/graphql")
      .send({
        query,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert.notStrictEqual(data?.searchInWorksCompanies, null || undefined);
        assert.notStrictEqual(
          data?.searchInWorksCompanies[0]?._id,
          null || undefined
        );
        assert.strictEqual(
          data?.searchInWorksCompanies[0]?.CompanyName,
          company.CompanyName
        );
        assert.strictEqual(
          data?.searchInWorksCompanies[0]?.CompanyDescription,
          company.CompanyDescription
        );
        assert.strictEqual(
          data?.searchInWorksCompanies[0]?.Domain,
          company.Domain
        );
        assert.strictEqual(data?.searchInWorksCompanies[0]?.Rate, company.Rate);

        done();
      });
  });
});

describe("getProfileStatistics API Test", () => {
  it("Should get profile statistics with valid user ID", (done) => {
    const query = `
    query{
      getProfileStatistics(userId: "${userId}") {
        NumberOfProjects
        NumberOfTeams
        NumberOfTasks
        NumberOfMyCompanies
      }
    }`;

    request(app)
      .post("/graphql")
      .send({ query })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert.notStrictEqual(data?.getProfileStatistics, null || undefined);
        assert.strictEqual(data?.getProfileStatistics.NumberOfProjects, 1);
        assert.strictEqual(data?.getProfileStatistics.NumberOfTeams, 1);
        assert.strictEqual(data?.getProfileStatistics.NumberOfTasks, 1);
        assert.strictEqual(data?.getProfileStatistics.NumberOfMyCompanies, 1);

        done();
      });
  });
});

// describe("get AiChat API Test", () => {
//   it("Should get an AI chat with valid chat ID", (done) => {
//     const query = `
//     query GetAIChat($chatId: Int!) {
//       getAIChat(chatId: $chatId) {
//         CreatedDate
//         Messages {
//           Answer
//           CreatedDate
//           Question
//           _id
//         }
//         _id
//       }
//     }`;

//     request(app)
//       .post("/graphql")
//       .send({ query, variables: { chatId: AIchatId } })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;

//         assert.ok(data?.getAIChat?._id);
//         assert.equal(data?.getAIChat?._id, AIchatId);
//         assert.notStrictEqual(data?.getAIChat?.CreateDate, null || undefined);
//         assert.notStrictEqual(data?.getAIChat?.Messages.length, 0);
//         assert.notStrictEqual(
//           data?.getAIChat?.Messages[0]._id,
//           null || undefined
//         );
//         assert.notStrictEqual(
//           data?.getAIChat?.Messages[0].Question,
//           null || undefined
//         );
//         assert.notStrictEqual(
//           data?.getAIChat?.Messages[0].Answer,
//           null || undefined
//         );
//         assert.notStrictEqual(
//           data?.getAIChat?.Messages[0].CreatedDate,
//           null || undefined
//         );
//         assert.strictEqual(data?.getAIChat?.Messages[0].Question, message);
//         done();
//       });
//   });
// });

describe("get User API Test", () => {
  it("Should get a user with valid user ID", (done) => {
    const query = `
    query{
      getUser(userId: "${userId}") {
        AIChats {
          _id
          CreatedDate
          Messages {
            _id
            Question
            Answer
            CreatedDate
          }
        }
        Accounts {
          _id
          PlatformName
          Link
        }
        Bio
        Country
        CreateDate
        CreatedBy
        CreatedTasks {
          _id
        }
        DateOfBirth
        Educations {
          _id
          Title
          Description
          FileName
        }
        FirstName
        Gender
        ImageUrl
        IsActive
        LastName
        LastTimeOnline
        MyCompanies {
          _id
        }
        Password
        Posts {
          _id
          Content
          CreatedDate
        }
        Rate
        Skills {
          _id
          Skill
        }
        Tasks {
          _id
        }
        Username
        Work
        WorkCompanies {
          _id
        }
        id
      }
    }`;

    request(app)
      .post("/graphql")
      .send({ query })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert.notStrictEqual(data?.getUser, null || undefined);
        assert.strictEqual(data?.getUser?.id, userId);
        assert.strictEqual(data?.getUser?.Username, user.Username);
        assert.strictEqual(data?.getUser?.Rate, user.Rate);
        assert.strictEqual(data?.getUser?.Gender, user.Gender);
        assert.strictEqual(data?.getUser?.Bio, user.Bio);
        assert.strictEqual(data?.getUser?.Country, user.Country);
        assert.strictEqual(data?.getUser?.DateOfBirth, user.DateOfBirth);
        assert.strictEqual(data?.getUser?.Work, user.Work);
        assert.strictEqual(data?.getUser?.Rate, user.Rate);
        assert.strictEqual(data?.getUser?.IsActive, true);
        assert.strictEqual(data?.getUser?.LastTimeOnline, user.LastTimeOnline);
        assert.strictEqual(data?.getUser?.ImageUrl, user.ImageUrl);
        assert.strictEqual(data?.getUser?.Gender, user.Gender);
        assert.strictEqual(data?.getUser?.Rate, user.Rate);
        assert.notStrictEqual(data?.getUser?.MyCompanies, null || undefined);
        assert.strictEqual(data?.getUser?.MyCompanies[0]?._id, myCompany);
        assert.strictEqual(data?.getUser?.CreatedTasks[0]?._id, teamTaskId);
        assert.notStrictEqual(data?.getUser?.AIChats, null || undefined);
        assert.strictEqual(data?.getUser?.AIChats[0]?._id, AIchatId);
        // assert.notStrictEqual(
        //   data?.getUser?.AIChats[0]?.Messages[0]?._id,
        //   null || undefined
        // );
        // assert.strictEqual(
        //   data?.getUser?.AIChats[0]?.Messages[0]?.Question,
        //   message
        // );
        // assert.strictEqual(
        //   data?.getUser?.AIChats[0]?.Messages[0]?.Answer,
        //   null || undefined
        // );
        // assert.strictEqual(
        //   data?.getUser?.AIChats[0]?.Messages[0]?.CreatedDate,
        //   null || undefined
        // );
        assert.notStrictEqual(data?.getUser?.Accounts, null || undefined);
        assert.strictEqual(data?.getUser?.Accounts[0]?._id, accountId);
        assert.strictEqual(
          data?.getUser?.Accounts[0]?.PlatformName,
          socialMediaLinkInput.PlatformName
        );
        assert.strictEqual(
          data?.getUser?.Accounts[0]?.Link,
          socialMediaLinkInput.Link
        );
        assert.notStrictEqual(data?.getUser?.Posts, null || undefined);
        assert.strictEqual(data?.getUser?.Posts[0]?._id, postId);
        assert.strictEqual(
          data?.getUser?.Posts[0]?.Content,
          positionPostInput.Content
        );
        assert.notStrictEqual(data?.getUser?.Skills, null || undefined);
        assert.strictEqual(data?.getUser?.Skills[0]?._id, skillId);
        assert.strictEqual(data?.getUser?.Skills[0]?.Skill, skillInput.Skill);
        assert.notStrictEqual(data?.getUser?.WorkCompanies, null || undefined);
        assert.strictEqual(data?.getUser?.WorkCompanies[0]?._id, companyId);
        done();
      });
  });
});

describe("get Team API Test", () => {
  it("Should get a team with valid team ID", (done) => {
    const query = `
    query{
      getTeam(teamId: ${teamId}) {
        _id
        TeamName
        TeamRole
        CreateDate
        Tasks {
          _id
        }
        Members {
          id
        }
      }
    }`;

    request(app)
      .post("/graphql")
      .send({ query })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { data } = res.body;
        assert.notStrictEqual(data?.getTeam, null || undefined);
        assert.notStrictEqual(data?.getTeam?._id, null || undefined);
        assert.strictEqual(data?.getTeam?._id, teamId);
        assert.strictEqual(data?.getTeam?.TeamName, team.TeamName);
        assert.strictEqual(data?.getTeam?.TeamRole, team.TeamRole);
        assert.notStrictEqual(data?.getTeam?.Members, null || undefined);
        assert.strictEqual(data?.getTeam?.Members[0]?.id, userId);
        assert.strictEqual(data?.getTeam?.Tasks[0]?._id, teamTaskId);
        assert.notStrictEqual(data?.getTeam?.CreateDate, null || undefined);
        done();
      });
  });
});

describe("get all projects", () => {
  it("Should get all projects", (done) => {
    const query = `
        query Query {
          getProjects {
            _id
            ProjectName
            ProjectDescription
            FileName
            Requirements {
              _id
              Value
            }
            Applies {
              _id
              CompanyName
              CompanyDescription
              Rate
              Domain
              CreateDate
            }
            Notes {
              _id
              Title
              Tasks {
                _id
                Title
                Description
              }
            }
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
        assert.notStrictEqual(data?.getProjects, null || undefined);
        assert.notStrictEqual(data?.getProjects[0]?._id, null || undefined);
        assert.strictEqual(
          data?.getProjects[0]?.ProjectName,
          project.ProjectName
        );
        assert.strictEqual(
          data?.getProjects[0]?.ProjectDescription,
          project.ProjectDescription
        );
        assert.strictEqual(data?.getProjects[0]?.FileName, project.FileName);
        assert.notStrictEqual(
          data?.getProjects[0]?.Requirements,
          null || undefined
        );
        assert.notStrictEqual(
          data?.getProjects[0]?.Requirements[0]?._id,
          null || undefined
        );
        assert.strictEqual(
          data?.getProjects[0]?.Requirements[0].Value,
          projectRequirement.Value
        );
        assert.notStrictEqual(data?.getProjects[0]?.Applies, null || undefined);
        assert.notStrictEqual(
          data?.getProjects[0]?.Applies[0]?._id,
          null || undefined
        );
        assert.strictEqual(
          data?.getProjects[0]?.Applies[0]?.CompanyName,
          company.CompanyName
        );
        assert.strictEqual(
          data?.getProjects[0]?.Applies[0]?.Rate,
          company.Rate
        );
        assert.strictEqual(
          data?.getProjects[0]?.Applies[0]?.Domain,
          company.Domain
        );
        assert.notStrictEqual(
          data?.getProjects[0]?.Applies[0]?.CreateDate,
          null || undefined
        );
        assert.notStrictEqual(data?.getProjects[0]?.Notes, null || undefined);
        assert.notStrictEqual(
          data?.getProjects[0]?.Notes[0]?._id,
          null || undefined
        );
        assert.strictEqual(
          data?.getProjects[0]?.Notes[0]?.Title,
          projectNoteInput.Title
        );
        assert.notStrictEqual(
          data?.getProjects[0]?.Notes[0]?.Tasks,
          null || undefined
        );
        assert.notStrictEqual(
          data?.getProjects[0]?.Notes[0]?.Tasks[0]._id,
          null || undefined
        );
        assert.strictEqual(
          data?.getProjects[0]?.Notes[0]?.Tasks[0].Title,
          projectNoteTaskInput.Title
        );
        assert.strictEqual(
          data?.getProjects[0]?.Notes[0]?.Tasks[0].Description,
          projectNoteTaskInput.Description
        );
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
        ProjectName
        ProjectDescription
        FileName
        Notes {
          _id
          Title
          Tasks {
            _id
            Title
            Description
          }
        }
        Requirements {
          _id
          Value
        }
        Applies {
          _id
          CompanyName
          CompanyDescription
          Domain
          CreateDate
          Rate
        }
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
        assert.notStrictEqual(data?.getProject, null || undefined);
        assert.notStrictEqual(data?.getProject?._id, null || undefined);
        assert.strictEqual(data?.getProject?.ProjectName, project.ProjectName);
        assert.strictEqual(
          data?.getProject?.ProjectDescription,
          project.ProjectDescription
        );
        assert.strictEqual(data?.getProject?.FileName, project.FileName);
        assert.notStrictEqual(data?.getProject?.Notes, null || undefined);
        assert.notStrictEqual(
          data?.getProject?.Notes[0]?._id,
          null || undefined
        );
        assert.strictEqual(
          data?.getProject?.Notes[0]?.Title,
          projectNoteInput.Title
        );
        assert.notStrictEqual(
          data?.getProject?.Notes[0]?.Tasks,
          null || undefined
        );
        assert.notStrictEqual(
          data?.getProject?.Notes[0]?.Tasks[0]._id,
          null || undefined
        );
        assert.strictEqual(
          data?.getProject?.Notes[0]?.Tasks[0].Title,
          projectNoteTaskInput.Title
        );
        assert.strictEqual(
          data?.getProject?.Notes[0]?.Tasks[0].Description,
          projectNoteTaskInput.Description
        );
        assert.notStrictEqual(
          data?.getProject?.Requirements,
          null || undefined
        );
        assert.notStrictEqual(
          data?.getProject?.Requirements[0]?._id,
          null || undefined
        );
        assert.strictEqual(
          data?.getProject?.Requirements[0].Value,
          projectRequirement.Value
        );
        assert.notStrictEqual(data?.getProject?.Applies, null || undefined);
        assert.notStrictEqual(
          data?.getProject?.Applies[0]?._id,
          null || undefined
        );
        assert.strictEqual(
          data?.getProject?.Applies[0]?.CompanyName,
          company.CompanyName
        );
        assert.strictEqual(data?.getProject?.Applies[0]?.Rate, company.Rate);
        assert.strictEqual(
          data?.getProject?.Applies[0]?.Domain,
          company.Domain
        );
        assert.notStrictEqual(
          data?.getProject?.Applies[0]?.CreateDate,
          null || undefined
        );
        done();
      });
  });
});

describe("Search In Projects", () => {
  it("Should search in projects", (done) => {
    const query = `
    query{
      searchInProjects(word: "Project") {
        _id
        ProjectName
        ProjectDescription
        FileName
        Notes {
          _id
          Title
          Tasks {
            _id
            Title
            Description
          }
        }
        Requirements {
          _id
          Value
        }
        Applies {
          _id
          CompanyName
          CompanyDescription
          Domain
          CreateDate
          Rate
        }
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
        assert.notStrictEqual(data?.searchInProjects, null || undefined);
        assert.notStrictEqual(
          data?.searchInProjects[0]?._id,
          null || undefined
        );
        assert.strictEqual(
          data?.searchInProjects[0]?.ProjectName,
          project.ProjectName
        );
        assert.strictEqual(
          data?.searchInProjects[0]?.ProjectDescription,
          project.ProjectDescription
        );
        assert.strictEqual(
          data?.searchInProjects[0]?.FileName,
          project.FileName
        );
        assert.notStrictEqual(
          data?.searchInProjects[0]?.Notes,
          null || undefined
        );
        assert.notStrictEqual(
          data?.searchInProjects[0]?.Notes[0]?._id,
          null || undefined
        );
        assert.strictEqual(
          data?.searchInProjects[0]?.Notes[0]?.Title,
          projectNoteInput.Title
        );
        assert.notStrictEqual(
          data?.searchInProjects[0]?.Notes[0]?.Tasks,
          null || undefined
        );
        assert.notStrictEqual(
          data?.searchInProjects[0]?.Notes[0]?.Tasks[0]._id,
          null || undefined
        );
        assert.strictEqual(
          data?.searchInProjects[0]?.Notes[0]?.Tasks[0].Title,
          projectNoteTaskInput.Title
        );
        assert.strictEqual(
          data?.searchInProjects[0]?.Notes[0]?.Tasks[0].Description,
          projectNoteTaskInput.Description
        );
        assert.notStrictEqual(
          data?.searchInProjects[0]?.Requirements,
          null || undefined
        );
        assert.notStrictEqual(
          data?.searchInProjects[0]?.Requirements[0]?._id,
          null || undefined
        );
        assert.strictEqual(
          data?.searchInProjects[0]?.Requirements[0].Value,
          projectRequirement.Value
        );
        assert.notStrictEqual(
          data?.searchInProjects[0]?.Applies,
          null || undefined
        );
        assert.notStrictEqual(
          data?.searchInProjects[0]?.Applies[0]?._id,
          null || undefined
        );
        assert.strictEqual(
          data?.searchInProjects[0]?.Applies[0]?.CompanyName,
          company.CompanyName
        );
        assert.strictEqual(
          data?.searchInProjects[0]?.Applies[0]?.Rate,
          company.Rate
        );
        assert.strictEqual(
          data?.searchInProjects[0]?.Applies[0]?.Domain,
          company.Domain
        );
        assert.notStrictEqual(
          data?.searchInProjects[0]?.Applies[0]?.CreateDate,
          null || undefined
        );
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
        `;

    request(app)
      .post("/graphql")
      .send({ query })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const { data } = res.body;
        assert.notStrictEqual(data?.getTask, null || undefined);
        assert.strictEqual(data?.getTask?._id, taskId);
        assert.strictEqual(data?.getTask?.TaskName, taskInput.TaskName);
        assert.strictEqual(data?.getTask?.TaskStatus, taskInput.TaskStatus);
        assert.strictEqual(data?.getTask?.StartDate, taskInput.StartDate);
        assert.strictEqual(data?.getTask?.EndDate, taskInput.EndDate);
        assert.strictEqual(data?.getTask?.Priority, taskInput.Priority);
        assert.strictEqual(data?.getTask?.Comments, taskInput.Comments);
        assert.strictEqual(data?.getTask?.IsMarked, taskInput.IsMarked);
        assert.notStrictEqual(data?.getTask?.CreateDate, null);
        assert.notStrictEqual(data?.getTask?.Steps, null || undefined);
        assert.notStrictEqual(data?.getTask?.Steps[0]?._id, null || undefined);
        assert.strictEqual(
          data?.getTask?.Steps[0]?.Description,
          taskStepInput.Description
        );
        assert.strictEqual(
          data?.getTask?.Steps[0]?.Number,
          taskStepInput.Number
        );
        done();
      });
  });
});

describe("get company by id", () => {
  it("Should get company by id", (done) => {
    const query = `
    query{
      getCompany(companyId: ${companyId}) {
      _id
        CompanyName
        CompanyDescription
        Rate
        Domain
        CreateDate
        Teams {
          _id
          TeamName
          TeamRole
          CreateDate
          Tasks {
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
          Members {
            id
          }
        }
        Project {
          _id
          ProjectName
          ProjectDescription
          FileName
        }
        Comments {
          _id
          Value
          CreatedDate
        }
        Posts {
          _id
          Content
          CreatedDate
        }
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
        assert.notStrictEqual(data?.getCompany, null || undefined);
        assert.strictEqual(data?.getCompany?._id, companyId);
        assert.strictEqual(data?.getCompany?.CompanyName, company.CompanyName);
        assert.strictEqual(
          data?.getCompany?.CompanyDescription,
          company.CompanyDescription
        );
        assert.strictEqual(data?.getCompany?.Rate, company.Rate);
        assert.strictEqual(data?.getCompany?.Domain, company.Domain);
        assert.notStrictEqual(data?.getCompany?.CreateDate, null || undefined);
        assert.notStrictEqual(data?.getCompany?.Teams, null || undefined);
        assert.notStrictEqual(
          data?.getCompany?.Teams[0]?._id,
          null || undefined
        );
        assert.strictEqual(data?.getCompany?.Teams[0]?.TeamName, team.TeamName);
        assert.strictEqual(data?.getCompany?.Teams[0]?.TeamRole, team.TeamRole);
        assert.notStrictEqual(
          data?.getCompany?.Teams[0]?.CreateDate,
          null || undefined
        );
        assert.notStrictEqual(
          data?.getCompany?.Teams[0]?.Tasks,
          null || undefined
        );
        assert.notStrictEqual(
          data?.getCompany?.Teams[0]?.Tasks[0]?._id,
          null || undefined
        );
        assert.strictEqual(
          data?.getCompany?.Teams[0]?.Tasks[0]?.TaskName,
          taskInput.TaskName
        );
        assert.strictEqual(
          data?.getCompany?.Teams[0]?.Tasks[0]?.TaskStatus,
          taskInput.TaskStatus
        );
        assert.strictEqual(
          data?.getCompany?.Teams[0]?.Tasks[0]?.StartDate,
          taskInput.StartDate
        );
        assert.strictEqual(
          data?.getCompany?.Teams[0]?.Tasks[0]?.EndDate,
          taskInput.EndDate
        );
        assert.strictEqual(
          data?.getCompany?.Teams[0]?.Tasks[0]?.Priority,
          taskInput.Priority
        );
        assert.strictEqual(
          data?.getCompany?.Teams[0]?.Tasks[0]?.Comments,
          taskInput.Comments
        );
        assert.strictEqual(
          data?.getCompany?.Teams[0]?.Tasks[0]?.IsMarked,
          taskInput.IsMarked
        );
        assert.notStrictEqual(
          data?.getCompany?.Teams[0]?.Tasks[0]?.CreateDate,
          null
        );
        assert.notStrictEqual(
          data?.getCompany?.Teams[0]?.Tasks[0]?.Steps,
          null || undefined
        );
        assert.notStrictEqual(
          data?.getCompany?.Teams[0]?.Tasks[0]?.Steps[0]?._id,
          null || undefined
        );
        assert.strictEqual(
          data?.getCompany?.Teams[0]?.Tasks[0]?.Steps[0]?.Description,
          taskStepInput.Description
        );
        assert.strictEqual(
          data?.getCompany?.Teams[0]?.Tasks[0]?.Steps[0]?.Number,
          taskStepInput.Number
        );
        assert.strictEqual(data?.getCompany?.Teams[0]?.Members[0].id, userId);
        assert.notStrictEqual(data?.getCompany?.Project, null || undefined);
        assert.notStrictEqual(
          data?.getCompany?.Project?._id,
          null || undefined
        );
        assert.strictEqual(
          data?.getCompany?.Project?.ProjectName,
          project.ProjectName
        );
        assert.strictEqual(
          data?.getCompany?.Project?.ProjectDescription,
          project.ProjectDescription
        );
        assert.strictEqual(
          data?.getCompany?.Project?.FileName,
          project.FileName
        );
        assert.notStrictEqual(data?.getCompany?.Comments, null || undefined);
        assert.notStrictEqual(
          data?.getCompany?.Comments[0]?._id,
          null || undefined
        );
        assert.strictEqual(
          data?.getCompany?.Comments[0]?.Value,
          commentInput.Value
        );
        assert.notStrictEqual(
          data?.getCompany?.Comments[0]?.CreatedDate,
          null || undefined
        );
        assert.notStrictEqual(data?.getCompany?.Posts, null || undefined);
        assert.notStrictEqual(
          data?.getCompany?.Posts[0]?._id,
          null || undefined
        );
        assert.strictEqual(
          data?.getCompany?.Posts[0]?.Content,
          positionPostInput.Content
        );
        assert.notStrictEqual(
          data?.getCompany?.Posts[0]?.CreatedDate,
          null || undefined
        );
        done();
      });
  });
});

describe("get Contact Messages API Tests", () => {
  it("Should get contact messages", (done) => {
    const query = `
    query GetContactMessages {
      getContactMessages {
        _id
        Message
        CreatedDate
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
        assert.notStrictEqual(data?.getContactMessages, null || undefined);
        assert.notStrictEqual(
          data?.getContactMessages[0]?._id,
          null || undefined
        );
        assert.strictEqual(
          data?.getContactMessages[0]?.Message,
          contactMessageInput.Message
        );
        assert.notStrictEqual(
          data?.getContactMessages[0]?.CreatedDate,
          null || undefined
        );
        done();
      });
  });
});

describe("get All Posts API Tests", () => {
  it("Should get all posts", (done) => {
    const query = `
    query{
      getAllPosts(userId: "${userId}") {
        _id
        Content
        CreatedDate
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
        assert.notStrictEqual(data?.getAllPosts, null || undefined);
        assert.notStrictEqual(data?.getAllPosts[0]?._id, null || undefined);
        assert.strictEqual(
          data?.getAllPosts[0]?.Content,
          positionPostInput.Content
        );
        assert.notStrictEqual(
          data?.getAllPosts[0]?.CreatedDate,
          null || undefined
        );
        done();
      });
  });
});

describe("searchInPositionPosts API Tests", () => {
  it("Should search in position posts", (done) => {
    const query = `
    query{
      searchInPositionPosts(word: "${positionPostInput.Content}", userId: "${userId}") {
        _id
        Content
        CreatedDate
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
        assert.notStrictEqual(data?.searchInPositionPosts, null || undefined);
        assert.notStrictEqual(
          data?.searchInPositionPosts[0]?._id,
          null || undefined
        );
        assert.strictEqual(
          data?.searchInPositionPosts[0]?.Content,
          positionPostInput.Content
        );
        assert.notStrictEqual(
          data?.searchInPositionPosts[0]?.CreatedDate,
          null || undefined
        );
        done();
      });
  });
});

describe("getAllPostsSortedByDate API Tests", () => {
  it("Should get all posts sorted by date", (done) => {
    const query = `
    query{
      getAllPostsSortedByDate(userId: "${userId}") {
        _id
        Content
        CreatedDate
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
        assert.notStrictEqual(data?.getAllPostsSortedByDate, null || undefined);
        assert.notStrictEqual(
          data?.getAllPostsSortedByDate[0]?._id,
          null || undefined
        );
        assert.strictEqual(
          data?.getAllPostsSortedByDate[0]?.Content,
          positionPostInput.Content
        );
        assert.notStrictEqual(
          data?.getAllPostsSortedByDate[0]?.CreatedDate,
          null || undefined
        );
        done();
      });
  });
});

describe("searchInMyPosts API Tests", () => {
  it("Should search in my posts", (done) => {
    const query = `
    query{
      searchInMyPosts(word: "${positionPostInput.Content}", userId: "${userCreateTaskId}") {
        _id
        Content
        CreatedDate
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
        assert.notStrictEqual(data?.searchInMyPosts, null || undefined);
        assert.notStrictEqual(data?.searchInMyPosts[0]?._id, null || undefined);
        assert.strictEqual(
          data?.searchInMyPosts[0]?.Content,
          positionPostInput.Content
        );
        assert.notStrictEqual(
          data?.searchInMyPosts[0]?.CreatedDate,
          null || undefined
        );
        done();
      });
  });
});

describe("getAllMyPostsSortedByDate API Tests", () => {
  it("Should get all my posts sorted by date", (done) => {
    const query = `
    query{
      getAllMyPostsSortedByDate(userId: "${userCreateTaskId}") {
        _id
        Content
        CreatedDate
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
        assert.notStrictEqual(
          data?.getAllMyPostsSortedByDate,
          null || undefined
        );
        assert.notStrictEqual(
          data?.getAllMyPostsSortedByDate[0]?._id,
          null || undefined
        );
        assert.strictEqual(
          data?.getAllMyPostsSortedByDate[0]?.Content,
          positionPostInput.Content
        );
        assert.notStrictEqual(
          data?.getAllMyPostsSortedByDate[0]?.CreatedDate,
          null || undefined
        );
        done();
      });
  });
});

describe("Update User API Tests (update)", () => {
  it("Should update an existing user with valid input data", (done) => {
    const mutation = `
      mutation {
        updateUser(userId: "${user.id}", user: {
          Username: "aa",
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
          id
          Username
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
        assert(data.updateUser.id); // Ensure an ID is returned for the updated user
        assert.strictEqual(data.updateUser.Username, "aa"); // Ensure the updated user has the expected values
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
    const mutation = `
        mutation {
          updatePositionPost(positionPostId: ${postId}, positionPost: {
            Content: "${positionPostInput.Content}",
          }) {
            _id
            Content
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
        assert.notStrictEqual(data?.updateEducation, null || undefined);
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
        assert.notStrictEqual(data?.updateTeam, null || undefined);
        assert.strictEqual(data?.updateTeam?._id, teamId);
        assert.strictEqual(data?.updateTeam?.TeamName, teamInput.TeamName);
        assert.strictEqual(data?.updateTeam?.TeamRole, teamInput.TeamRole);

        done();
      });
  });
});

// describe("delete AI Chat API Tests (create)", () => {
//   it("Should delete an AI chat with valid chat ID", (done) => {
//     const query = `
//     query {
//         deleteAIChat(AIchatId: ${AIchatId})
//       }
//     `;

//     request(app)
//       .post("/graphql")
//       .send({ query })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.strictEqual(data?.deleteAIChat, true);
//         done();
//       });
//   });
// });

// describe("delete team", () => {
//   it("Should delete team", (done) => {
//     const query = `
//     query{
//       deleteTeam(teamId: ${teamId})
//     }
//         `;

//     request(app)
//       .post("/graphql")
//       .send({ query, variables: { userId } })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.equal(data.deleteTeam, true);
//         done();
//       });
//   });
// });

// describe("delete company", () => {
//   it("Should delete company", (done) => {
//     const query = `
//     query{
//       deleteCompany(companyId: ${companyId})
//         }
//         `;

//     request(app)
//       .post("/graphql")
//       .send({ query, variables: { userId } })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.equal(data.deleteCompany, true);
//         done();
//       });
//   });
// });

// describe("delete company", () => {
//   it("Should delete company", (done) => {
//     const query = `
//     query{
//       deleteCompany(companyId: ${myCompany})
//         }
//         `;

//     request(app)
//       .post("/graphql")
//       .send({ query, variables: { userId } })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.equal(data.deleteCompany, true);
//         done();
//       });
//   });
// });

// describe("delete skill", () => {
//   it("Should delete skill", (done) => {
//     const query = `
//     query{
//       deleteSkill(skillId: ${skillId})
//         }
//         `;

//     request(app)
//       .post("/graphql")
//       .send({ query, variables: { userId } })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.equal(data.deleteSkill, true);
//         done();
//       });
//   });
// });

// describe("delete Account", () => {
//   it("Should delete Account", (done) => {
//     const query = `
//     query{
//       deleteSocialMediaAccounts(id: ${accountId})
//         }
//         `;

//     request(app)
//       .post("/graphql")
//       .send({ query })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.equal(data.deleteSocialMediaAccounts, true);
//         done();
//       });
//   });
// });

// describe("delete Education API Tests", () => {
//   it("Should delete an education with valid input data", (done) => {
//     const query = `
//     query {
//           deleteEducation(educationId: ${educationId})
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.strictEqual(data?.deleteEducation, true);
//         done();
//       });
//   });
// });

// describe("deleteUserFromTeam API Tests", () => {
//   it("Should delete user from team with valid input data", (done) => {
//     const query = `
//     query {
//           deleteUserFromTeam(userId: "${userId}", teamId: ${teamId})
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.strictEqual(data?.deleteUserFromTeam, true);
//         done();
//       });
//   });
// });

// describe("deletePost API Tests", () => {
//   it("Should delete a post with valid input data", (done) => {
//     const query = `
//     query {
//           deletePost(postId: ${postId})
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.strictEqual(data?.deletePost, true);
//         done();
//       });
//   });
// });

// describe("deleteUser API Tests", () => {
//   it("Should delete a user with valid input data", (done) => {
//     const query = `
//     query {
//           deleteUser(userId: "${userId}")
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.strictEqual(data?.deleteUser, true);
//         done();
//       });
//   });
// });

// describe("deleteUser API Tests", () => {
//   it("Should delete a user with valid input data", (done) => {
//     const query = `
//     query {
//           deleteUser(userId: "${userCreateTaskId}")
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.strictEqual(data?.deleteUser, true);
//         done();
//       });
//   });
// });

// describe("deleteTask API Tests", () => {
//   it("Should delete a task with valid input data", (done) => {
//     const query = `
//     query {
//           deleteTask(taskId: ${taskId})
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.strictEqual(data?.deleteTask, true);
//         done();
//       });
//   });
// });

// describe("deleteTeamTask API Tests", () => {
//   it("Should delete a task with valid input data", (done) => {
//     const query = `
//     query {
//           deleteTask(taskId: ${teamTaskId})
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.strictEqual(data?.deleteTask, true);
//         done();
//       });
//   });
// });

// describe("deleteTaskStep API Tests", () => {
//   it("Should delete a task step with valid input data", (done) => {
//     const query = `
//     query {
//           deleteTaskStep(taskStepId: ${taskStepId})
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.strictEqual(data?.deleteTaskStep, true);
//         done();
//       });
//   });
// });

// describe("deleteTeamTaskStep API Tests", () => {
//   it("Should delete a task step with valid input data", (done) => {
//     const query = `
//     query {
//           deleteTaskStep(taskStepId: ${teamTaskStepId})
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.strictEqual(data?.deleteTaskStep, true);
//         done();
//       });
//   });
// });

// describe("deleteCompanyComment API Tests", () => {
//   it("Should delete a company comment with valid input data", (done) => {
//     const query = `
//     query {
//           deleteCompanyComment(commentId: ${commentId})
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.strictEqual(data?.deleteCompanyComment, true);
//         done();
//       });
//   });
// });

// describe("deleteProjectRequirement API Tests", () => {
//   it("Should delete a project requirement with valid input data", (done) => {
//     const query = `
//     query {
//           deleteProjectRequirement(projectRequirementId: ${projectRequirementId})
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.strictEqual(data?.deleteProjectRequirement, true);
//         done();
//       });
//   });
// });

// describe("deleteProjectNote API Tests", () => {
//   it("Should delete a project note with valid input data", (done) => {
//     const query = `
//     query {
//           deleteProjectNote(projectNoteId: ${projectNoteId})
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.strictEqual(data?.deleteProjectNote, true);
//         done();
//       });
//   });
// });

// describe("deleteProjectNoteTask API Tests", () => {
//   it("Should delete a project note task with valid input data", (done) => {
//     const query = `
//     query {
//           deleteProjectNoteTask(projectNoteTaskId: ${projectNoteTaskId})
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.strictEqual(data?.deleteProjectNoteTask, true);
//         done();
//       });
//   });
// });
