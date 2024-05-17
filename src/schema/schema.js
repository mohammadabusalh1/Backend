const { gql } = require("apollo-server");

const typeDefs = gql`
  type integer {
    low: Float
    high: Float
  }

  type AIMessage {
    _id: ID
    Question: String
    Answer: String
    CreatedDate: String
  }

  type AIChat {
    _id: ID
    CreatedDate: String
    Messages: [AIMessage]
    Name: String
    FileName: String
  }

  type Comment {
    _id: ID
    Value: String
    CreatedDate: String
  }

  input CommentInput {
    Value: String!
    CreatedDate: String
  }

  type Chat {
    _id: ID
    CreatedDate: String
    Messages: [Message]
  }

  input ChatInput {
    CreatedDate: String
  }

  type Company {
    _id: ID
    CompanyName: String
    CompanyDescription: String
    Rate: Float
    Domain: String
    CreateDate: String
    Teams: [Team]
    Project: Project
    Comments: [Comment]
    Posts: [PositionPost]
    Tasks: [Task]
  }

  input CompanyInput {
    CompanyName: String!
    CompanyDescription: String!
    Domain: String!
    Rate: Float
  }

  type ContactMessage {
    _id: ID
    Message: String
    CreatedDate: String
  }

  input ContactMessageInput {
    Message: String!
  }

  type Education {
    _id: ID
    Title: String
    Description: String
    FileName: String
  }

  input EducationInput {
    Title: String
    Description: String
    FileName: String
  }

  type Message {
    _id: ID
    userId: Int
    MessageContent: String
    CreatedDate: String
  }

  input MessageInput {
    userId: String!
    MessageContent: String!
  }

  type PositionPost {
    _id: ID
    Content: String
    CreatedDate: String
    User: User
    Company: Company
  }

  input PositionPostInput {
    Content: String!
  }

  type Project {
    _id: ID
    ProjectName: String
    ProjectDescription: String
    FileName: String
    Notes: [ProjectNote]
    Requirements: [ProjectRequirement]
    Applies: [Company]
  }

  input ProjectInput {
    ProjectName: String!
    ProjectDescription: String!
    FileName: String!
  }

  type ProjectNoteTask {
    _id: ID
    Title: String
    Description: String
  }

  input ProjectNoteTaskInput {
    Title: String!
    Description: String!
  }

  type ProjectNote {
    _id: ID
    Title: String
    Tasks: [ProjectNoteTask]
  }

  input ProjectNoteInput {
    Title: String!
  }

  type ProjectRequirement {
    _id: ID
    Value: String
  }

  input ProjectRequirementInput {
    Value: String!
  }

  type Skill {
    _id: ID
    Skill: String
  }

  input SkillInput {
    Skill: String!
  }

  type SocialMediaLink {
    _id: ID
    PlatformName: String
    Link: String
  }

  input SocialMediaLinkInput {
    PlatformName: String!
    Link: String!
  }

  type Task {
    _id: ID
    TaskName: String
    TaskStatus: String
    StartDate: String
    EndDate: String
    Priority: Int
    Comments: String
    IsMarked: Boolean
    CreateDate: String
    Steps: [TaskStep]
    CompanyName: String
    TeamName: String
  }

  input TaskInput {
    TaskName: String!
    TaskStatus: String!
    StartDate: String!
    EndDate: String!
    Priority: Int!
    Comments: String!
    IsMarked: Boolean
    CreateDate: String
  }

  type TaskStep {
    _id: ID
    Description: String
    Number: Int
  }

  input TaskStepInput {
    Description: String!
    Number: Int!
  }

  type Team {
    _id: ID
    TeamName: String
    TeamRole: String
    CreateDate: String
    Tasks: [Task]
    Members: [User]
  }

  input TeamInput {
    TeamName: String!
    TeamRole: String!
    CreateDate: String
  }

  input UserInput {
    id: String
    Username: String
    FirstName: String
    LastName: String
    Country: String
    IsActive: Boolean
    CreatedBy: Int
    CreateDate: String
    Rate: Float
    DateOfBirth: String
    Gender: String
    Work: String
    Bio: String
    LastTimeOnline: String
    ImageUrl: String
  }

  type Friends {
    friends: [User]
    myFriends: [User]
  }

  type User {
    id: String
    Username: String
    FirstName: String
    LastName: String
    Email: String
    Password: String
    Country: String
    IsActive: Boolean
    CreatedBy: Int
    CreateDate: String
    Rate: Float
    DateOfBirth: String
    Gender: String
    Work: String
    Bio: String
    LastTimeOnline: String
    ImageUrl: String
    MyCompanies: [Company]
    WorkCompanies: [Company]
    Skills: [Skill]
    Accounts: [SocialMediaLink]
    Tasks: [Task]
    Posts: [PositionPost]
    Chats: [Chat]
    Educations: [Education]
    AIChats: [AIChat]
    Friends: Friends
    CreatedTasks: [Task]
    type: String
  }

  type UserStatistics {
    NumberOfProjects: Int
    NumberOfTeams: Int
    NumberOfTasks: Int
    NumberOfMyCompanies: Int
  }

  type Query {
    getAIChat(chatId: Int!, page: Int, limit: Int): AIChat
    getUser(userId: String!, page: Int, limit: Int): User
    deleteTeam(teamId: Int!): Boolean
    deleteCompany(companyId: Int!): Boolean
    deleteSkill(skillId: Int!): Boolean
    filterMyCompanies(
      userId: String!
      filterType: String
      desc: Boolean
      page: Int
      limit: Int
    ): [Company]
    searchInMyCompanies(
      userId: String!
      word: String!
      page: Int
      limit: Int
    ): [Company]
    filterWorksCompanies(
      userId: String!
      filterType: String
      desc: Boolean
      page: Int
      limit: Int
    ): [Company]
    searchInWorksCompanies(
      userId: String!
      word: String!
      page: Int
      limit: Int
    ): [Company]
    getProfileStatistics(userId: String!): UserStatistics
    deleteSocialMediaAccounts(id: Int!): Boolean
    getProjects(page: Int, limit: Int): [Project]
    getProject(projectId: Int!, page: Int, limit: Int): Project
    searchInProjects(page: Int, limit: Int, word: String!): [Project]
    getTask(taskId: Int!): Task
    getCompany(companyId: Int!): Company
    getContactMessages(page: Int, limit: Int): [ContactMessage]
    getAllPosts(userId: String!, page: Int, limit: Int): [PositionPost]
    searchInPositionPosts(
      page: Int
      limit: Int
      word: String!
      userId: String!
    ): [PositionPost]
    getAllPostsSortedByDate(
      page: Int
      limit: Int
      isDESC: Boolean
      userId: String!
    ): [PositionPost]
    searchInMyPosts(
      page: Int
      limit: Int
      word: String!
      userId: String!
    ): [PositionPost]
    getAllMyPostsSortedByDate(
      page: Int
      limit: Int
      isDESC: Boolean
      userId: String!
    ): [PositionPost]
    getTeam(teamId: Int!): Team
    deleteEducation(educationId: Int!): Boolean
    deleteUserFromTeam(userId: String!, teamId: Int!): Boolean
    deletePost(postId: Int!): Boolean
    deleteUser(userId: String!): Boolean
    deleteAIChat(AIchatId: Int!): Boolean
    deleteTask(taskId: Int!): Boolean
    deleteTaskStep(taskStepId: Int!): Boolean
    deleteCompanyComment(commentId: Int!): Boolean
    deleteProjectRequirement(projectRequirementId: Int!): Boolean
    deleteProjectNote(projectNoteId: Int!): Boolean
    deleteProjectNoteTask(projectNoteTaskId: Int!): Boolean
  }

  type Mutation {
    sendAIMessage(
      message: String!
      fileName: String!
      AIchatId: Int!
    ): AIMessage
    createNewAIChat(userId: String!, Name: String!, projectId: Int!): AIChat
    createNewUser(user: UserInput!): User
    forgetPassword(email: String!): Boolean
    updateUser(userId: String!, user: UserInput!): User
    createNewProject(project: ProjectInput!, page: Int, limit: Int): Project
    createProjectRequirement(
      projectId: Int!
      requirement: ProjectRequirementInput!
    ): ProjectRequirement
    createNewTeam(team: TeamInput!, companyId: Int!): Team
    createNewCompany(company: CompanyInput!, userId: String!): Company
    createNewSkill(skill: SkillInput!, userId: String!): Skill
    createNewContactMessage(
      contactMessage: ContactMessageInput!
      userId: String!
    ): ContactMessage
    createPositionPost(post: PositionPostInput!, companyId: Int!): PositionPost
    addUserToTeam(teamId: Int!, userId: String!, role: String!): Boolean
    createProjectNote(
      projectNote: ProjectNoteInput!
      projectId: Int!
    ): ProjectNote
    createProjectNoteTask(
      projectNoteTask: ProjectNoteTaskInput!
      projectNoteId: Int!
    ): ProjectNoteTask
    createNewSocialMediaLink(
      socialMediaAccount: SocialMediaLinkInput!
      userId: String!
    ): SocialMediaLink
    createTaskForUser(
      task: TaskInput!
      userId: String!
      userCreateTaskId: String!
      companyId: Int!
      teamId: Int!
    ): Task
    createTaskForTeam(
      task: TaskInput!
      teamId: Int!
      userId: String!
      companyId: Int!
    ): Task
    updateTask(taskId: Int!, task: TaskInput!): Task
    updateTaskStep(taskStepId: Int!, taskStep: TaskStepInput!): TaskStep
    createCompanyComment(comment: CommentInput!, companyId: Int!): Comment
    updateCompany(companyId: Int!, company: CompanyInput!): Company
    updateProject(
      projectId: Int!
      project: ProjectInput!
      page: Int
      limit: Int
    ): Project
    createTaskStep(taskStep: TaskStepInput!, taskId: Int!): TaskStep
    replayContactMessage(contactMessageId: Int!, message: String!): Boolean
    updatePositionPost(
      positionPostId: Int!
      positionPost: PositionPostInput!
    ): PositionPost
    applyToPost(postId: Int!, userId: String!): Boolean
    createEducation(education: EducationInput!, userId: String!): Education
    applyForProject(projectId: Int!, companyId: Int!): Boolean
    updateEducation(educationId: Int!, education: EducationInput!): Education
    updateTeam(teamId: Int!, team: TeamInput!): Team
  }
`;

module.exports = { typeDefs };
