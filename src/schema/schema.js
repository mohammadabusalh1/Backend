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
    IsDeleted: Boolean
    CreatedDate: String
    Messages: [Message]
  }

  input ChatInput {
    IsDeleted: Boolean
    CreatedDate: String
  }

  type Company {
    _id: ID
    CompanyName: String
    CompanyDescription: String
    Rate: Float
    Domain: String
    IsDeleted: Boolean
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
    IsDeleted: Boolean
  }

  input MessageInput {
    userId: Int!
    MessageContent: String!
  }

  type PositionPost {
    _id: ID
    Content: String
    CreatedDate: String
    IsDeleted: Boolean
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
    IsDeleted: Boolean
    TeamRole: String
    CreateDate: String
    Tasks: [Task]
    Members: [User]
  }

  input TeamInput {
    TeamName: String!
    IsDeleted: Boolean
    TeamRole: String!
    CreateDate: String
  }

  input UserInput {
    Username: String!
    FirstName: String!
    LastName: String!
    Email: String!
    Password: String!
    Country: String!
    IsActive: Boolean
    CreatedBy: Int!
    CreateDate: String
    Rate: Float!
    DateOfBirth: String!
    Gender: String!
    Work: String!
    Bio: String!
    LastTimeOnline: String
  }

  type User {
    _id: ID
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
    MyCompanies: [Company]
    WorkCompanies: [Company]
    Skills: [Skill]
    Accounts: [SocialMediaLink]
    Tasks: [Task]
    Posts: [PositionPost]
    Chats: [Chat]
    Educations: [Education]
    AIChats: [AIChat]
    Friends: [User]
    CreatedTasks: [Task]
  }

  type Query {
    getAIChat(chatId: Int!, page: Int, limit: Int): AIChat
    getUser(userId: Int!, page: Int, limit: Int): User
    deleteTeam(teamId: Int!): Boolean
    deleteCompany(companyId: Int!, userId: Int!): Boolean
    deleteSkill(skillId: Int!): Boolean
    filterMyCompanies(
      userId: Int!
      filterType: String!
      desc: Boolean
      page: Int
      limit: Int
    ): [Company]
    searchInMyCompanies(
      userId: Int!
      word: String!
      page: Int!
      limit: Int!
    ): [Company]
    filterWorksCompanies(
      userId: Int!
      filterType: String!
      desc: Boolean
      page: Int
      limit: Int
    ): [Company]
    searchInWorksCompanies(
      userId: Int!
      word: String!
      page: Int
      limit: Int
    ): [Company]
    getProfileStatistics(userId: Int!): User
    deleteSocialMediaAccounts(id: Int!): Boolean
    getProjects(page: Int, limit: Int): [Project]
    getProject(projectId: Int!): Project
    searchInProjects(page: Int, limit: Int, word: String!): [Project]
    applyForProject(projectId: Int!, companyId: Int!): Boolean
    getTask(taskId: Int!): Task
    getCompany(companyId: Int!): Company
    takeProjectByCompany(companyId: Int!, projectId: Int!): Boolean
    getContactMessages(page: Int, limit: Int): [ContactMessage]
    getAllPosts(userId: Int!, page: Int, limit: Int): [PositionPost]
    searchInPositionPosts(
      page: Int
      limit: Int
      word: String!
      userId: Int!
    ): [PositionPost]
    getAllPostsSortedByDate(
      page: Int
      limit: Int
      isDESC: Boolean!
      userId: Int!
    ): [PositionPost]
    searchInMyPosts(
      page: Int
      limit: Int
      word: String!
      userId: Int!
    ): [PositionPost]
    getAllMyPostsSortedByDate(
      page: Int
      limit: Int
      isDESC: Boolean!
      userId: Int!
    ): [PositionPost]
    getTeam(teamId: Int!): Team
    deleteMessage(messageId: Int!): Boolean
    deleteEducation(educationId: Int!): Boolean
    deleteUserFromTeam(userId: Int!, teamId: Int!): Boolean
  }

  type Mutation {
    sendAIMessage(
      message: String!
      fileName: String!
      AIchatId: Int!
    ): AIMessage
    createNewAIChat(userId: Int!): AIChat
    createNewUser(user: UserInput!): User
    forgetPassword(email: String!): Boolean
    updateUser(userId: Int!, user: UserInput!): User
    createNewProject(project: ProjectInput!): Project
    createProjectRequirement(
      projectId: Int!
      requirement: ProjectRequirementInput!
    ): ProjectRequirement
    createNewTeam(team: TeamInput!, companyId: Int!): Team
    createNewChat(userId: Int!, chat: ChatInput!): Chat
    sendMessage(message: MessageInput!, chatId: Int!): Message
    createNewCompany(company: CompanyInput!, userId: Int!): Company
    createNewSkill(skill: SkillInput!, userId: Int!): Skill
    createNewContactMessage(
      contactMessage: ContactMessageInput!
      userId: Int!
    ): ContactMessage
    createPositionPost(post: PositionPostInput!, companyId: Int!): PositionPost
    addUserToTeam(teamId: Int!, userId: Int!, role: String!): Boolean
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
      userId: Int!
    ): SocialMediaLink
    createTaskForUser(
      task: TaskInput!
      userId: Int!
      userCreateTaskId: Int!
      companyId: Int!
    ): Task
    createTaskForTeam(task: TaskInput!, teamId: Int!, userId: Int!): Task
    updateTask(taskId: Int!, task: TaskInput!): Task
    updateTaskStep(taskStepId: Int!, taskStep: TaskStepInput!): TaskStep
    createCompanyComment(comment: CommentInput!, companyId: Int!): Comment
    updateCompany(companyId: Int!, company: CompanyInput!, userId: Int!): Company
    updateProject(projectId: Int!, project: ProjectInput!): Project
    createTaskStep(taskStep: TaskStepInput!, taskId: Int!): TaskStep
    replayContactMessage(contactMessageId: Int!, message: String!): Boolean
    updatePositionPost(
      positionPostId: Int!
      positionPost: PositionPostInput!
    ): PositionPost
    applyToPost(postId: Int!, userId: Int!): Boolean
    createEducation(education: EducationInput!, userId: Int!): Education
  }
`;

module.exports = { typeDefs };
