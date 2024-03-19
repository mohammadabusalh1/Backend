/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const assert = require("assert");
const request = require("supertest");
const { describe } = require("mocha");
const { app } = require("../../app");

const AIchatId = 40;
const userId = 2;
const companyId = 26;
const chatId = 1;
const teamId = 25;
const projectId = 57;
const projectNoteId = 27;
const userCreateTaskId = 65;
const taskId = 71;
const taskStepId = 123;
const postId = 15;
const skillId = 185;
const accountId = 68;

// describe("Create AIChat API Tests", () => {
//   it("Should create a new AI chat for a valid user ID", () => {
//     const mutation = `
//       mutation {
//         createNewAIChat(userId: ${userId}) {
//           _id
//           CreatedDate
//           Messages {
//             _id
//             Question
//             Answer
//             CreatedDate
//           }
//         }
//       }
//     `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return assert.fail(err);
//         const aiChat = res.body.data.createNewAIChat;
//         assert.ok(aiChat._id);
//         assert.notStrictEqual(aiChat._id, null);
//       });
//   });
// });

// describe("Send AI Message", () => {
//   it("Should create a new AI Message and link it with AI chat", () => {
//     const message = "can tell me about this project?";
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
//         const aiChat = res.body.data.sendAIMessage;
//         assert.ok(aiChat._id); // Ensure an ID is returned for the sent message
//         assert.strictEqual(aiChat.Question, message); // Ensure the sent message matches the input
//         assert.notEqual(aiChat.Answer, null);
//       });
//   });
// });

// describe("Create User API Tests (create)", () => {
//   it("Should create a new user with valid input data", (done) => {
//     const mutation = `
//     mutation {
//       createNewUser(user: {
//         Username: "example_username",
//         FirstName: "John",
//         LastName: "Doe",
//         Email: "john.doe@example.com",
//         Password: "secure_password",
//         Country: "United States",
//         CreatedBy: 1,
//         Rate: 4.5,
//         DateOfBirth: "1990-01-01",
//         Gender: "Male",
//         Work: "Software Developer",
//         Bio: "A passionate individual in the field of technology.",
//         LastTimeOnline: "2024-01-21T08:30:00Z",
//       }) {
//         _id
//         Username
//         FirstName
//         LastName
//         Email
//         Password
//         Country
//         IsActive
//         CreatedBy
//         CreateDate
//         Rate
//         DateOfBirth
//         Gender
//         Work
//         Bio
//         LastTimeOnline
//       }
//     }
//     `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;

//         assert.ok(data.createNewUser._id);
//         assert.strictEqual(data.createNewUser.Username, "example_username");
//         assert.strictEqual(data.createNewUser.FirstName, "John");
//         assert.strictEqual(data.createNewUser.LastName, "Doe");
//         assert.strictEqual(data.createNewUser.Email, "john.doe@example.com");
//         assert.strictEqual(data.createNewUser.Country, "United States");
//         assert.strictEqual(data.createNewUser.Gender, "Male");
//         assert.strictEqual(data.createNewUser.Rate, 4.5);
//         assert.strictEqual(data.createNewUser.DateOfBirth, "1990-01-01");
//         assert.strictEqual(data.createNewUser.Work, "Software Developer");
//         assert.strictEqual(
//           data.createNewUser.Bio,
//           "A passionate individual in the field of technology."
//         );

//         done();
//       });
//   });
// });

// describe("Update User API Tests (update)", () => {
//   it("Should update an existing user with valid input data", (done) => {
//     const mutation = `
//       mutation {
//         updateUser(userId: ${userId}, user: {
//           Username: "aa",
//           FirstName: "b",
//           LastName: "c",
//           Email: "abc@example.com",
//           Password: "123",
//           Country: "as",
//           IsActive: false,
//           CreatedBy: 99,
//           CreateDate: "2025-02-26T12:00:00Z",
//           Rate: 4.8,
//           DateOfBirth: "1988-05-15",
//           Gender: "Female",
//           Work: "Data Scientist",
//           Bio: "A data enthusiast with a passion for analysis.",
//           LastTimeOnline: "2024-02-26T10:00:00Z",
//         }) {
//           _id
//           Username
//           FirstName
//           LastName
//           Email
//           Country
//           IsActive
//           CreatedBy
//           CreateDate
//           Rate
//           DateOfBirth
//           Gender
//           Work
//           Bio
//           LastTimeOnline
//         }
//       }
//     `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;
//         assert(data.updateUser._id); // Ensure an ID is returned for the updated user
//         assert.strictEqual(data.updateUser.Username, "aa"); // Ensure the updated user has the expected values
//         assert.strictEqual(data.updateUser.FirstName, "b");
//         assert.strictEqual(data.updateUser.LastName, "c");
//         assert.strictEqual(data.updateUser.Email, "abc@example.com");
//         assert.strictEqual(data.updateUser.Country, "as");
//         assert.strictEqual(data.updateUser.Gender, "Female");
//         assert.strictEqual(data.updateUser.Rate, 4.8);
//         assert.strictEqual(data.updateUser.DateOfBirth, "1988-05-15");
//         assert.strictEqual(data.updateUser.Work, "Data Scientist");
//         assert.strictEqual(
//           data.updateUser.Bio,
//           "A data enthusiast with a passion for analysis."
//         );
//         assert.strictEqual(data.updateUser.IsActive, false);
//         assert.strictEqual(
//           data.updateUser.LastTimeOnline,
//           "2024-02-26T10:00:00Z"
//         );
//         assert.strictEqual(data.updateUser.CreateDate, "2025-02-26T12:00:00Z");
//         assert.strictEqual(data.updateUser.CreatedBy, 99);

//         done();
//       });
//   });
// });

// describe("Create Project API Tests", () => {
//   it("Should create a new project with valid input data", (done) => {
//     const mutation = `
//         mutation {
//           createNewProject(
//             project: {
//                 ProjectName: "Sample Project",
//                 ProjectDescription: "This is a sample project description.",
//                 FileName: "sample.txt",
//               }
//           ) {
//             _id
//             ProjectName
//             ProjectDescription
//             FileName
//           }
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.ok(data.createNewProject._id);
//         assert.strictEqual(data.createNewProject.ProjectName, "Sample Project");
//         assert.strictEqual(
//           data.createNewProject.ProjectDescription,
//           "This is a sample project description."
//         );
//         assert.strictEqual(data.createNewProject.FileName, "sample.txt");

//         const project = data.createNewProject._id;

//         const mutation1 = `
//           mutation {
//             createProjectRequirement(projectId: ${project}, requirement: {
//              Value: "Sample Requirement",
//             }) {
//               Value
//             }
//          }
//         `;

//         request(app)
//           .post("/graphql")
//           .send({ query: mutation1 })
//           .expect(200)
//           .end((err1, res1) => {
//             if (err1) return done(err1);
//             console.log(res1.body);
//             assert.strictEqual(
//               res1.body.data.createProjectRequirement.Value,
//               "Sample Requirement"
//             );
//             done();
//           });
//       });
//   });
// });

// describe("Create Team API Tests", () => {
//   it("Should create a new team with valid input data", (done) => {
//     const mutation = `
//       mutation {
//         createNewTeam(team: {
//           TeamName: "Test Team",
//           IsDeleted: false,
//           TeamRole: "Developer",
//           CreateDate: "2024-02-26T12:00:00Z",
//         }, companyId: ${companyId}) {
//           TeamName
//           IsDeleted
//           TeamRole
//           CreateDate
//         }
//       }
//     `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;
//         assert.strictEqual(data.createNewTeam.TeamName, "Test Team");
//         assert.strictEqual(data.createNewTeam.IsDeleted, false);
//         assert.strictEqual(data.createNewTeam.TeamRole, "Developer");
//         assert.strictEqual(
//           data.createNewTeam.CreateDate,
//           "2024-02-26T12:00:00Z"
//         );
//         done();
//       });
//   });
// });

// describe("Send Message API Tests", () => {
//   it("Should send a new message with valid input data", (done) => {
//     const mutation = `
//         mutation {
//           sendMessage(chatId: ${chatId}, message: {
//             userId: ${userId},
//             MessageContent: "Test message content",
//           }) {
//             _id
//             userId
//             MessageContent
//             CreatedDate
//             IsDeleted
//           }
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;
//         assert.ok(data.sendMessage._id);
//         assert.strictEqual(data.sendMessage.userId, userId);
//         assert.strictEqual(
//           data.sendMessage.MessageContent,
//           "Test message content"
//         );

//         done();
//       });
//   });
// });

// describe("Create Company API Tests", () => {
//   it("Should create a new company with valid input data", (done) => {
//     const mutation = `
//         mutation {
//           createNewCompany(company: {
//             CompanyName: "Test Company",
//             CompanyDescription: "Test company description",
//             Domain: "a",
//             Rate: 4.5,
//           }, userId: ${userId}) {
//             CompanyName
//             CompanyDescription
//             Domain
//             Rate
//           }
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;
//         assert.strictEqual(data.createNewCompany.CompanyName, "Test Company");
//         assert.strictEqual(
//           data.createNewCompany.CompanyDescription,
//           "Test company description"
//         );
//         assert.strictEqual(data.createNewCompany.Domain, "a");
//         assert.strictEqual(data.createNewCompany.Rate, 4.5);

//         done();
//       });
//   });
// });

// describe("Create Skill API Tests", () => {
//   it("Should create a new skill with valid input data", (done) => {
//     const skillInput = {
//       Skill: "Test Skill",
//     };

//     const mutation = `
//         mutation {
//           createNewSkill(skill: {
//             Skill: "Test Skill",
//           }, userId: ${userId}) {
//             _id
//             Skill
//           }
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;
//         assert.ok(data.createNewSkill._id);
//         assert.strictEqual(data.createNewSkill.Skill, skillInput.Skill);

//         done();
//       });
//   });
// });

// describe("Create Contact Message API Tests", () => {
//   it("Should create a new contact message with valid input data", (done) => {
//     const contactMessageInput = {
//       Message: "Test contact message",
//     };

//     const mutation = `
//         mutation {
//           createNewContactMessage(contactMessage: {
//             Message: "Test contact message",
//           }, userId: ${userId}) {
//             _id
//             Message
//             CreatedDate
//           }
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;
//         assert.ok(data.createNewContactMessage._id);
//         assert.strictEqual(
//           data.createNewContactMessage.Message,
//           contactMessageInput.Message
//         );

//         done();
//       });
//   });
// });

// describe("Create Position Post API Tests", () => {
//   it("Should create a new position post with valid input data", (done) => {
//     const positionPostInput = {
//       Content: "Test position post content",
//     };

//     const mutation = `
//         mutation {
//           createPositionPost(post: {
//             Content: "Test position post content",
//           }, companyId: ${companyId}) {
//             _id
//             Content
//             CreatedDate
//             IsDeleted
//           }
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;
//         assert.ok(data.createPositionPost._id);
//         assert.strictEqual(
//           data.createPositionPost.Content,
//           positionPostInput.Content
//         );

//         done();
//       });
//   });
// });

// describe("Add a User To a Team", () => {
//   it("Should add a user to a team with valid input data", (done) => {
//     const role = "Developer";

//     const mutation = `
//         mutation {
//           addUserToTeam(teamId: ${teamId}, userId: ${userId}, role: "${role}")
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;
//         assert.strictEqual(data.addUserToTeam, true);

//         done();
//       });
//   });
// });

// describe("Create Project Note API Tests", () => {
//   it("Should create a new project note with valid input data", (done) => {
//     const projectNoteInput = {
//       Title: "Test Project Note Title",
//     };

//     const mutation = `
//     mutation{
//       createProjectNote(projectNote: {Title: "${projectNoteInput.Title}"}, projectId: ${projectId}) {
//         Tasks {
//           _id
//           Title
//           Description
//         }
//         Title
//         _id
//       }
//     }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;
//         assert.ok(data.createProjectNote._id);
//         assert.strictEqual(
//           data.createProjectNote.Title,
//           projectNoteInput.Title
//         );

//         done();
//       });
//   });
// });

// describe("Create Project Note Task API Tests", () => {
//   it("Should create a new project note task with valid input data", (done) => {
//     const projectNoteTaskInput = {
//       Title: "Test Project Note Task Title",
//       Description: "Test Project Note Task Description",
//     };

//     const mutation = `
//         mutation {
//           createProjectNoteTask(projectNoteTask: {
//             Title: "${projectNoteTaskInput.Title}",
//             Description: "${projectNoteTaskInput.Description}",
//           }, projectNoteId: ${projectNoteId}) {
//             _id
//             Title
//             Description
//           }
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;
//         assert.ok(data.createProjectNoteTask._id);
//         assert.strictEqual(
//           data.createProjectNoteTask.Title,
//           projectNoteTaskInput.Title
//         );
//         assert.strictEqual(
//           data.createProjectNoteTask.Description,
//           projectNoteTaskInput.Description
//         );

//         done();
//       });
//   });
// });

// describe("Create Social Media Link API Tests", () => {
//   it("Should create a new social media link with valid input data", (done) => {
//     const socialMediaLinkInput = {
//       PlatformName: "Test Platform",
//       Link: "https://example.com/test",
//     };

//     const mutation = `
//         mutation {
//           createNewSocialMediaLink(socialMediaAccount: {
//             PlatformName: "${socialMediaLinkInput.PlatformName}",
//             Link: "${socialMediaLinkInput.Link}",
//           }, userId: ${userId}) {
//             _id
//             PlatformName
//             Link
//           }
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;
//         assert.ok(data.createNewSocialMediaLink._id);
//         assert.strictEqual(
//           data.createNewSocialMediaLink.PlatformName,
//           socialMediaLinkInput.PlatformName
//         );
//         assert.strictEqual(
//           data.createNewSocialMediaLink.Link,
//           socialMediaLinkInput.Link
//         );

//         done();
//       });
//   });
// });

// describe("Create Task For User API Tests", () => {
//   it("Should create a new task for a user with valid input data", (done) => {
//     const taskInput = {
//       TaskName: "Test Task",
//       TaskStatus: "Pending",
//       StartDate: "2024-03-01",
//       EndDate: "2024-03-15",
//       Priority: 1,
//       Comments: "Test comments",
//       IsMarked: false,
//     };

//     const mutation = `
//         mutation {
//           createTaskForUser(task: {
//             TaskName: "${taskInput.TaskName}",
//             TaskStatus: "${taskInput.TaskStatus}",
//             StartDate: "${taskInput.StartDate}",
//             EndDate: "${taskInput.EndDate}",
//             Priority: ${taskInput.Priority},
//             Comments: "${taskInput.Comments}",
//             IsMarked: ${taskInput.IsMarked},
//           }, userId: ${userId}, userCreateTaskId: ${userCreateTaskId}, companyId: ${companyId}) {
//             _id
//             TaskName
//             TaskStatus
//             StartDate
//             EndDate
//             Priority
//             Comments
//             IsMarked
//             CreateDate
//           }
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;
//         assert.ok(data.createTaskForUser._id);
//         assert.strictEqual(data.createTaskForUser.TaskName, taskInput.TaskName);
//         assert.strictEqual(
//           data.createTaskForUser.TaskStatus,
//           taskInput.TaskStatus
//         );
//         assert.strictEqual(
//           data.createTaskForUser.StartDate,
//           taskInput.StartDate
//         );
//         assert.strictEqual(data.createTaskForUser.EndDate, taskInput.EndDate);
//         assert.strictEqual(data.createTaskForUser.Priority, taskInput.Priority);
//         assert.strictEqual(data.createTaskForUser.Comments, taskInput.Comments);
//         assert.strictEqual(data.createTaskForUser.IsMarked, taskInput.IsMarked);

//         done();
//       });
//   });
// });

// describe("Create Task For Team API Tests", () => {
//   it("Should create a new task for a team with valid input data", (done) => {
//     const taskInput = {
//       TaskName: "Test Task",
//       TaskStatus: "Pending",
//       StartDate: "2024-03-01",
//       EndDate: "2024-03-15",
//       Priority: 1,
//       Comments: "Test comments",
//       IsMarked: false,
//     };

//     const mutation = `
//         mutation {
//           createTaskForTeam(task: {
//             TaskName: "${taskInput.TaskName}",
//             TaskStatus: "${taskInput.TaskStatus}",
//             StartDate: "${taskInput.StartDate}",
//             EndDate: "${taskInput.EndDate}",
//             Priority: ${taskInput.Priority},
//             Comments: "${taskInput.Comments}",
//             IsMarked: ${taskInput.IsMarked},
//           }, teamId: ${teamId}, userId: ${userId}) {
//             _id
//             TaskName
//             TaskStatus
//             StartDate
//             EndDate
//             Priority
//             Comments
//             IsMarked
//             CreateDate
//           }
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;
//         assert.ok(data.createTaskForTeam._id);
//         assert.strictEqual(data.createTaskForTeam.TaskName, taskInput.TaskName);
//         assert.strictEqual(
//           data.createTaskForTeam.TaskStatus,
//           taskInput.TaskStatus
//         );
//         assert.strictEqual(
//           data.createTaskForTeam.StartDate,
//           taskInput.StartDate
//         );
//         assert.strictEqual(data.createTaskForTeam.EndDate, taskInput.EndDate);
//         assert.strictEqual(data.createTaskForTeam.Priority, taskInput.Priority);
//         assert.strictEqual(data.createTaskForTeam.Comments, taskInput.Comments);
//         assert.strictEqual(data.createTaskForTeam.IsMarked, taskInput.IsMarked);

//         done();
//       });
//   });
// });

// describe("Update Task API Tests", () => {
//   it("Should update a task with valid input data", (done) => {
//     const taskInput = {
//       TaskName: "Updated Task Name",
//       TaskStatus: "In Progress",
//       StartDate: "2024-02-23",
//       EndDate: "2024-03-15",
//       Priority: 3,
//       Comments: "This is a sample task for testing purposes.",
//       IsMarked: true,
//       CreateDate: "2024-02-23T10:00:00Z",
//     };

//     const mutation = `
//         mutation {
//           updateTask(taskId: ${taskId}, task: {
//             TaskName: "${taskInput.TaskName}",
//             TaskStatus: "${taskInput.TaskStatus}",
//             StartDate: "${taskInput.StartDate}",
//             EndDate: "${taskInput.EndDate}",
//             Priority: ${taskInput.Priority},
//             Comments: "${taskInput.Comments}",
//             IsMarked: ${taskInput.IsMarked},
//             CreateDate: "${taskInput.CreateDate}",
//           }) {
//             _id
//             TaskName
//             TaskStatus
//             StartDate
//             EndDate
//             Priority
//             Comments
//             IsMarked
//             CreateDate
//           }
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;
//         assert(data.updateTask._id);
//         assert.strictEqual(data.updateTask.TaskName, taskInput.TaskName);
//         assert.strictEqual(data.updateTask.TaskStatus, taskInput.TaskStatus);
//         assert.strictEqual(data.updateTask.StartDate, taskInput.StartDate);
//         assert.strictEqual(data.updateTask.EndDate, taskInput.EndDate);
//         assert.strictEqual(data.updateTask.Priority, taskInput.Priority);
//         assert.strictEqual(data.updateTask.Comments, taskInput.Comments);
//         assert.strictEqual(data.updateTask.IsMarked, taskInput.IsMarked);

//         done();
//       });
//   });
// });

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

// describe("Create Company Comment API Tests", () => {
//   it("Should create a new comment for a company with valid input data", (done) => {
//     const commentInput = {
//       Value: "Test comment value",
//       CreatedDate: "2024-03-01T12:00:00Z", // Optional: Replace with a valid created date if needed
//     };

//     const mutation = `
//         mutation {
//           createCompanyComment(comment: {
//             Value: "${commentInput.Value}",
//             CreatedDate: "${commentInput.CreatedDate}",
//           }, companyId: ${companyId}) {
//             _id
//             Value
//             CreatedDate
//           }
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;
//         assert.ok(data.createCompanyComment._id);
//         assert.strictEqual(data.createCompanyComment.Value, commentInput.Value);
//         assert.strictEqual(
//           data.createCompanyComment.CreatedDate,
//           commentInput.CreatedDate
//         );

//         done();
//       });
//   });
// });

// describe("Update Company API Tests", () => {
//   it("Should update a company with valid input data", (done) => {
//     const companyInput = {
//       CompanyName: "Updated Company Name",
//       CompanyDescription: "Updated Company Description",
//       Domain: "updatedcompany.com",
//       Rate: 4.5,
//     };

//     const mutation = `
//         mutation {
//           updateCompany(companyId: ${companyId}, company: {
//             CompanyName: "${companyInput.CompanyName}",
//             CompanyDescription: "${companyInput.CompanyDescription}",
//             Domain: "${companyInput.Domain}",
//             Rate: ${companyInput.Rate},
//           }) {
//             _id
//             CompanyName
//             CompanyDescription
//             Domain
//             Rate
//           }
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;
//         assert.ok(data.updateCompany._id);
//         assert.strictEqual(
//           data.updateCompany.CompanyName,
//           companyInput.CompanyName
//         );
//         assert.strictEqual(
//           data.updateCompany.CompanyDescription,
//           companyInput.CompanyDescription
//         );
//         assert.strictEqual(data.updateCompany.Domain, companyInput.Domain);
//         assert.strictEqual(data.updateCompany.Rate, companyInput.Rate);

//         done();
//       });
//   });
// });

// describe("Update Project API Tests", () => {
//   it("Should update a project with valid input data", (done) => {
//     const projectInput = {
//       ProjectName: "Updated Project Name",
//       ProjectDescription: "Updated Project Description",
//       FileName: "updatedfile.pdf",
//     };

//     const mutation = `
//         mutation {
//           updateProject(projectId: ${projectId}, project: {
//             ProjectName: "${projectInput.ProjectName}",
//             ProjectDescription: "${projectInput.ProjectDescription}",
//             FileName: "${projectInput.FileName}",
//           }) {
//             _id
//             ProjectName
//             ProjectDescription
//             FileName
//           }
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;
//         assert.ok(data.updateProject._id);
//         assert.strictEqual(
//           data.updateProject.ProjectName,
//           projectInput.ProjectName
//         );
//         assert.strictEqual(
//           data.updateProject.ProjectDescription,
//           projectInput.ProjectDescription
//         );
//         assert.strictEqual(data.updateProject.FileName, projectInput.FileName);

//         done();
//       });
//   });
// });

// describe("Create Task Step API Tests", () => {
//   it("Should create a new task step with valid input data", (done) => {
//     const taskStepInput = {
//       Description: "Test Task Step Description",
//       Number: 1,
//     };

//     const mutation = `
//         mutation {
//           createTaskStep(taskStep: {
//             Description: "${taskStepInput.Description}",
//             Number: ${taskStepInput.Number},
//           }, taskId: ${taskId}) {
//             _id
//             Description
//             Number
//           }
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;
//         assert.ok(data.createTaskStep._id);
//         assert.strictEqual(
//           data.createTaskStep.Description,
//           taskStepInput.Description
//         );
//         assert.strictEqual(data.createTaskStep.Number, taskStepInput.Number);

//         done();
//       });
//   });
// });

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

// describe("Apply To a Post API Tests", () => {
//   it("Should apply to a post with valid post and user IDs", (done) => {
//     const mutation = `
//         mutation {
//           applyToPost(postId: ${postId}, userId: ${userId})
//         }
//       `;

//     request(app)
//       .post("/graphql")
//       .send({ query: mutation })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;
//         assert.strictEqual(data.applyToPost, true);

//         done();
//       });
//   });
// });

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

//         assert.ok(data.getAIChat._id);
//         assert.equal(data.getAIChat._id, AIchatId);
//         assert.notStrictEqual(data.getAIChat.CreateDate, null);
//         assert.notStrictEqual(data.getAIChat.Messages.length, 0);
//         assert.notStrictEqual(data.getAIChat.Messages[0]._id, null);
//         assert.notStrictEqual(data.getAIChat.Messages[0].Question, null);
//         assert.notStrictEqual(data.getAIChat.Messages[0].Answer, null);
//         assert.notStrictEqual(data.getAIChat.Messages[0].CreatedDate, null);
//         done();
//       });
//   });
// });

// describe("get User API Test", () => {
//   it("Should get a user with valid user ID", (done) => {
//     const query = `
//     query GetUser($userId: Int!) {
//       getUser(userId: $userId) {
//         _id
//         Username
//         FirstName
//         LastName
//         Email
//         Country
//         IsActive
//         CreatedBy
//         CreateDate
//         DateOfBirth
//         Gender
//         Work
//         Bio
//         LastTimeOnline
//         Password
//         Rate
//       }
//     }`;

//     request(app)
//       .post("/graphql")
//       .send({ query, variables: { userId: 65 } })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;

//         assert.ok(data.getUser._id);
//         assert.equal(data.getUser._id, 65);
//         assert.notStrictEqual(data.getUser.Username, null);
//         assert.notStrictEqual(data.getUser.FirstName, null);
//         assert.notStrictEqual(data.getUser.LastName, null);
//         assert.notStrictEqual(data.getUser.Email, null);
//         assert.notStrictEqual(data.getUser.Country, null);
//         assert.notStrictEqual(data.getUser.IsActive, null);
//         assert.notStrictEqual(data.getUser.CreatedBy, null);
//         assert.notStrictEqual(data.getUser.CreateDate, null);
//         assert.notStrictEqual(data.getUser.DateOfBirth, null);
//         assert.notStrictEqual(data.getUser.Gender, null);
//         assert.notStrictEqual(data.getUser.Work, null);
//         assert.notStrictEqual(data.getUser.Bio, null);
//         assert.notStrictEqual(data.getUser.LastTimeOnline, null);
//         assert.notStrictEqual(data.getUser.Rate, null);

//         done();
//       });
//   });
// });

// describe("get user AiChat API Test", () => {
//   it("Should get an AI chat with valid chat ID", (done) => {
//     const query = `
//     query GetUser($userId: Int!) {
//       getUser(userId: $userId) {
//         _id
//         AIChats {
//           _id
//           Messages {
//             Answer
//           }
//           CreatedDate
//         }
//       }
//     }`;

//     request(app)
//       .post("/graphql")
//       .send({ query, variables: { userId } })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;

//         assert.ok(data.getUser._id);
//         assert.equal(data.getUser._id, userId);
//         assert.notStrictEqual(data.getUser.AIChats.length, 0);
//         assert.notStrictEqual(data.getUser.AIChats[0]._id, null);
//         assert.notStrictEqual(data.getUser.AIChats[0].CreatedDate, null);
//         assert.notStrictEqual(data.getUser.AIChats[0].Messages, null);

//         done();
//       });
//   });
// });

// describe("get use accounts", () => {
//   it("Should get accounts with valid user ID", (done) => {
//     const query = `
//     query GetUser($userId: Int!) {
//       getUser(userId: $userId) {
//         _id
//         Accounts {
//           _id
//           PlatformName
//           Link
//         }
//       }
//     }`;

//     request(app)
//       .post("/graphql")
//       .send({ query, variables: { userId } })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;

//         assert.ok(data.getUser._id);
//         assert.equal(data.getUser._id, userId);
//         assert.notStrictEqual(data.getUser.Accounts, null);

//         done();
//       });
//   });
// });

// describe("get user chats", () => {
//   it("Should get chats with valid user ID", (done) => {
//     const query = `
//         query Query($userId: Int!) {
//             getUser(userId: $userId) {
//               _id
//               Chats {
//                 CreatedDate
//                 IsDeleted
//                 Messages {
//                   IsDeleted
//                   CreatedDate
//                   MessageContent
//                   _id
//                   userId
//                 }
//                 _id
//               }
//             }
//           }`;

//     request(app)
//       .post("/graphql")
//       .send({ query, variables: { userId } })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;

//         assert.ok(data.getUser._id);
//         assert.equal(data.getUser._id, userId);
//         assert.notStrictEqual(data.getUser.Chats, null);

//         done();
//       });
//   });
// });

// describe("get user CreatedTasks", () => {
//   it("Should get CreatedTasks with valid user ID", (done) => {
//     const query = `
//         query Query($userId: Int!) {
//             getUser(userId: $userId) {
//               _id
//               CreatedTasks {
//                 _id
//                 TaskName
//                 TaskStatus
//                 StartDate
//                 EndDate
//                 Priority
//                 Comments
//                 IsMarked
//                 CreateDate
//                 Steps {
//                   _id
//                   Description
//                   Number
//                 }
//               }
//             }
//           }`;

//     request(app)
//       .post("/graphql")
//       .send({ query, variables: { userId } })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;

//         assert.ok(data.getUser._id);
//         assert.equal(data.getUser._id, userId);
//         assert.notStrictEqual(data.getUser.CreatedTasks, null);

//         done();
//       });
//   });
// });

// describe("get user Educations", () => {
//   it("Should get Educations with valid user ID", (done) => {
//     const query = `
//         query GetUser($userId: Int!) {
//             getUser(userId: $userId) {
//               _id
//               Educations {
//                 _id
//                 Title
//                 Description
//                 FileName
//               }
//             }
//           }`;

//     request(app)
//       .post("/graphql")
//       .send({ query, variables: { userId } })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;

//         assert.ok(data.getUser._id);
//         assert.equal(data.getUser._id, userId);
//         assert.notStrictEqual(data.getUser.Educations, null);

//         done();
//       });
//   });
// });

// describe("get user Companies", () => {
//   it("Should get Companies with valid user ID", (done) => {
//     const query = `
//         query GetUser($userId: Int!) {
//             getUser(userId: $userId) {
//               MyCompanies {
//                 _id
//               }
//               _id
//             }
//           }`;

//     request(app)
//       .post("/graphql")
//       .send({ query, variables: { userId } })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;

//         assert.ok(data.getUser._id);
//         assert.equal(data.getUser._id, userId);
//         assert.notStrictEqual(data.getUser.MyCompanies, null);

//         done();
//       });
//   });
// });

// describe("get user posts", () => {
//   it("Should get posts with valid user ID", (done) => {
//     const query = `
//         query GetUser($userId: Int!) {
//             getUser(userId: $userId) {
//               _id
//               Posts {
//                 _id
//                 Content
//                 CreatedDate
//                 IsDeleted
//               }
//             }
//           }
//         `;

//     request(app)
//       .post("/graphql")
//       .send({ query, variables: { userId } })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);

//         const { data } = res.body;

//         assert.ok(data.getUser._id);
//         assert.equal(data.getUser._id, userId);
//         assert.notStrictEqual(data.getUser.Posts, null);

//         done();
//       });
//   });
// });

// describe("get all projects", () => {
//   it("Should get all projects", (done) => {
//     const query = `
//     query{
//       getProjects {
//         _id
//         FileName
//       }
//         }
//         `;

//     request(app)
//       .post("/graphql")
//       .send({ query })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.notStrictEqual(data.getProjects, null);
//         done();
//       });
//   });
// });

// describe("get project by id", () => {
//   it("Should get project by id", (done) => {
//     const query = `
//     query{
//       getProject(projectId: ${projectId}) {
//         _id
//         FileName
//       }
//         }
//         `;

//     request(app)
//       .post("/graphql")
//       .send({ query })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.equal(data.getProject._id, projectId);
//         done();
//       });
//   });
// });

// describe("apply for project", () => {
//   it("Should apply for project and return true", (done) => {
//     const query = `
//     query{
//       applyForProject(projectId: ${projectId}, companyId: ${companyId})
//         }
//         `;

//     request(app)
//       .post("/graphql")
//       .send({ query })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.strictEqual(data.applyForProject, true);
//         done();
//       });
//   });
// });

// describe("get task by id", () => {
//   it("Should get task by id", (done) => {
//     const query = `
//     query{
//       getTask(taskId: ${taskId}) {
//         _id
//       }
//     }
//         `;

//     request(app)
//       .post("/graphql")
//       .send({ query })
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { data } = res.body;
//         assert.equal(data.getTask._id, taskId);
//         done();
//       });
//   });
// });

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
