const axios = require("axios");
const base64 = require("base-64");
const nodemailer = require("nodemailer");
const Logging = require("../config/Logging");
const backup = require("../config/Backup");
// this is a website company email to send emails for users.
const myEmail = "202007723@bethlehem.edu";
const { v4: uuidv4 } = require("uuid");

const { redisClientSet } = require("../config/Redis");

const transporter = nodemailer.createTransport({
  service: "gmail", // Update with your email service provider (e.g., 'gmail', 'yahoo', etc.)
  auth: {
    user: myEmail, // Update with your email address
    pass: process.env.EMAIL_PASSWORD, // Update with your email password or an app-specific password
  },
});

/**
 * Send an email with the given email, subject, and text.
 *
 * @param {Object} email - the recipient's email address
 * @param {string} subject - the subject of the email
 * @param {string} text - the content of the email
 * @return {Promise} a promise that resolves when the email is sent
 */
const sendEmail = async ({ email, subject, text }) => {
  const mailOptions = {
    from: myEmail,
    to: email,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

/* this library to sync entity with data base, so with this library I can
use models to define schema for database objects and manage it without use
queries.

for example I use NeodeObject.create(model, object) to create object.
*/
const NeodeObject = require("../config/NeodeObject");

// this file save all global variables like urls
// it return module (javascript object)
const Variables = require("../config/Variables");

const resolvers = {
  Query: {
    /**
     * Retrieves the AI chat with the specified chat ID.
     *
     * @param {Object} parent - The parent object.
     * @param {Object} args - The arguments object.
     * @param {string} args.chatId - The ID of the chat.
     * @return {Object} - The AI chat object with the specified chat ID.
     * @throws {Error} - If the chatId is null or if the chat is not found.
     */
    getAIChat: async (parent, args) => {
      try {
        const { chatId, page = 0, limit = 50 } = args;

        if (!chatId) {
          throw new Error("ChatID is null");
        }

        const result = await NeodeObject.findById("AIChat", chatId);

        if (!result) {
          throw new Error("Chat not found");
        }

        return {
          ...result.properties(),
          _id: chatId,
          page,
          limit,
        };
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => getAIChat, ${error}`);
        throw error;
      }
    },
    /**
     * Asynchronous function to retrieve user data based on user ID.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing userId
     * @return {Object} The user data and AI chat history
     */
    getUser: async (parent, args) => {
      try {
        // this int args from client with user id value
        const { userId, page = 0, limit = 50 } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? UserID is required, userId value is ${userId}. please check userId value before send`
          );
        }
        const result = await NeodeObject.first("User", "id", userId);

        if (!result) {
          Logging.warn(
            `${new Date()}, in resolvers.js => getUser, User not found in database`,
            userId
          );
          throw new Error("User not found");
        }

        console.log({ id: userId, ...result.properties(), page, limit });

        return { id: userId, ...result.properties(), page, limit };
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => getUser, ${error}`);
        throw new Error(`Error in getUser: ${error.message}`);
      }
    },
    /**
     * A function to delete a team.
     *
     * @param {Object} parent - the parent object
     * @param {Object} args - the arguments object with teamId
     * @return {Promise} a promise that resolves to the deleted team
     */
    deleteTeam: async (parent, args) => {
      try {
        const { teamId } = args;

        if (!teamId) {
          throw new Error(
            `Are you send teamId? teamId is required, teamId value is ${teamId}. please check teamId value before send`
          );
        }

        const team = await NeodeObject?.findById("Team", teamId);

        if (!team) {
          throw new Error("Team not found");
        }
        await team.delete();

        await backup.info(`
        Match (team:Team) where ID(team) = ${teamId}
        delete team
        `);

        return true;
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => deleteTeam, ${error}`);
        throw new Error(`Error in deleteTeam: ${error.message}`);
      }
    },
    /**
     * A function to delete a company.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object
     * @param {string} args.companyId - The ID of the company to be deleted
     * @return {Promise<Object>} A Promise that resolves to the deleted company object
     */
    deleteCompany: async (parent, args) => {
      try {
        // int args from client
        const { companyId } = args;

        if (!companyId) {
          throw new Error(
            `Are you send companyId? companyId is required, companyId value is ${companyId}. please check companyId value before send`
          );
        }

        const company = await NeodeObject?.findById("Company", companyId);

        if (!company) {
          throw new Error("Company not found");
        }

        await company.delete();

        await backup.info(`
        Match (company:Company) where ID(company) = ${companyId}
        delete company
        `);

        return true;
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => deleteCompany, ${error}`
        );
        throw new Error(`Error in deleteCompany: ${error.message}`);
      }
    },
    /**
     * Delete a skill by its ID.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing skillId
     * @return {Promise} A Promise that resolves to the deleted skill
     */
    deleteSkill: async (parent, args) => {
      try {
        // int args from client
        const { skillId } = args;

        if (!skillId) {
          throw new Error(
            `Are you send skillId? skillId is required, skillId value is ${skillId}. please check skillId value before send`
          );
        }

        // return skill object.
        const skill = await NeodeObject?.findById("Skill", skillId);

        if (!skill) {
          throw new Error("Skill not found");
        }

        await skill.delete();

        await backup.info(` 
        Match (skill:Skill) where ID(skill) = ${skillId}
        delete skill
        `);

        return true;
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => deleteSkill, ${error}`
        );
        throw new Error(`Error in deleteSkill: ${error.message}`);
      }
    },
    /**
     * Asynchronously filters companies based on user ID, filter type, and sorting order.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing userId {int},
     *  filterType {string: Rate, CreatedDate}, and desc {boolean: witch mean is desc order or not}
     * @return {Array} An array of filtered companies
     */
    filterMyCompanies: async (parent, args) => {
      try {
        const {
          userId,
          filterType = "CreatedDate",
          desc = false,
          page = 0,
          limit = 6,
        } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        // this query filter companies on Neo4j database
        // its return object of 2 value {records: array of result objects, summary}
        const companies = await NeodeObject?.cypher(
          `MATCH (user:User {id: "${userId}"}) -[r:ADMIN_OF]-> (companies:Company) 
          return companies 
          ORDER BY companies.${filterType} ${desc ? "desc" : "asc"}
          SKIP ${page} * ${limit} LIMIT ${limit}`
        );

        // I make map because result is not as a schema type.
        return companies?.records?.map((record) => ({
          ...record.get("companies").properties,
          _id: `${record.get("companies").identity}`,
        }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => filterMyCompanies, ${error}`
        );
        throw new Error(`Error in filterMyCompanies: ${error.message}`);
      }
    },
    /**
     * Async function to search for companies based on user ID, search
     * word, and pagination parameters.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing userId, word, page, and limit
     * @return {Array} An array of companies based on the search criteria and pagination
     */
    searchInMyCompanies: async (parent, args) => {
      try {
        // eslint-disable-next-line object-curly-newline
        const { userId, word = "", page = 0, limit = 6 } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const companies = await NeodeObject?.cypher(
          `MATCH (user:User {id: "${userId}"}) -[r:ADMIN_OF]-> (companies:Company)
          where (companies.CompanyDescription CONTAINS '${word}' 
          OR companies.CompanyName CONTAINS '${word}'
          OR companies.Domain CONTAINS '${word}') return companies
          SKIP ${page} * ${limit} LIMIT ${limit}`
        );

        return companies?.records?.map((record) => ({
          ...record.get("companies").properties,
          _id: `${record.get("companies").identity}`,
        }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => searchInMyCompanies, ${error}`
        );
        throw new Error(`Error in searchInMyCompanies: ${error.message}`);
      }
    },
    /**
     * A function to filter works companies based on given parameters.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object with userId, filterType,
     * desc, page, and limit properties
     * @return {Promise} A promise that resolves to an array of filtered companies
     */
    filterWorksCompanies: async (parent, args) => {
      try {
        const {
          userId,
          filterType = "CreatedDate",
          desc = false,
          page = 0,
          limit = 6,
        } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const companies = await NeodeObject?.cypher(
          `
          MATCH (u:User {id: "${userId}"}) - [:IN_TEAM] -> (t:Team)
          MATCH (c:Company) -[:HAS_A_TEAM]-> (t) RETURN c ORDER BY c.${filterType} ${
            desc ? "desc" : "asc"
          }
          SKIP ${page} * ${limit} LIMIT ${limit}
          `
        );

        // I make map because result is not as a schema type.
        return companies?.records?.map((record) => ({
          ...record.get("c").properties,
          _id: `${record.get("c").identity}`,
        }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => filterWorksCompanies, ${error}`
        );
        throw new Error(`Error in filterWorksCompanies: ${error.message}`);
      }
    },
    /**
     * An asynchronous function to search for companies associated with a user.
     *
     * @param {object} parent - the parent object
     * @param {object} args - the arguments object containing userId, word, page, and limit
     * @return {array} an array of companies that match the search criteria
     */
    searchInWorksCompanies: async (parent, args) => {
      try {
        // eslint-disable-next-line object-curly-newline
        const { userId, word = "", page = 0, limit = 6 } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const companies = await NeodeObject?.cypher(
          `
          MATCH (u:User {id: "${userId}"}) - [:IN_TEAM] -> (t:Team)
          MATCH (c:Company) -[:HAS_A_TEAM]-> (t) where 
          c.CompanyDescription CONTAINS '${word}' 
          OR c.CompanyName CONTAINS '${word}'
          OR c.Domain CONTAINS '${word}' 
          RETURN c
          SKIP ${page} * ${limit} LIMIT ${limit}
          `
        );

        return companies?.records?.map((record) => ({
          ...record.get("c").properties,
          _id: `${record.get("c").identity}`,
        }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => searchInWorksCompanies, ${error}`
        );
        throw new Error(`Error in searchInWorksCompanies: ${error.message}`);
      }
    },
    /**
     * Get profile statistics for a user.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object with userId
     * @return {Object} An object containing statistics for the user's projects,
     * teams, tasks, and companies
     */
    getProfileStatistics: async (parent, args) => {
      try {
        const { userId } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        // ## user enroll project after finishing the project in company.
        // where all users get the project points.
        const numberOfProjects = await NeodeObject?.cypher(
          `
          MATCH (u:User {id: "${userId}"}) -[:WORK_ON]-> (p:Project)
          RETURN count(p)
          `
        );

        const numberOfTeams = await NeodeObject?.cypher(
          `
          MATCH (u:User {id: "${userId}"}) -[:IN_TEAM]-> (t:Team)
          RETURN count(t)
          `
        );

        const numberOfTasks = await NeodeObject?.cypher(
          `
          MATCH (u:User {id: "${userId}"}) -[:HAS_A_TASK]-> (t:Task)
          RETURN count(t)
          `
        );

        const numberOfMyCompanies = await NeodeObject?.cypher(
          `
          MATCH (u:User {id: "${userId}"}) -[:ADMIN_OF] -> (c:Company)
          RETURN count(c) as myCompaniesCount
          `
        );

        return {
          NumberOfProjects: numberOfProjects.records[0].get("count(p)").low,
          NumberOfTeams: numberOfTeams.records[0].get("count(t)").low,
          NumberOfTasks: numberOfTasks.records[0].get("count(t)").low,
          NumberOfMyCompanies:
            numberOfMyCompanies.records[0].get("myCompaniesCount").low,
        };
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => getProfileStatistics, ${error}`
        );
        throw new Error(`Error in getProfileStatistics: ${error.message}`);
      }
    },
    /**
     * Asynchronously deletes a social media account.
     *
     * @param {object} parent - The parent object
     * @param {object} args - The arguments object containing the id of the social media account
     * @return {boolean} true if the account was successfully deleted
     */
    deleteSocialMediaAccounts: async (parent, args) => {
      try {
        const { id } = args;

        if (!id) {
          throw new Error(
            `Are you send socialMediaId? socialMediaId is required, socialMediaId value is ${id}. please check socialMediaId value before send`
          );
        }

        // return Account object.
        const account = await NeodeObject?.findById("SocialMediaLink", id);

        if (!account) {
          throw new Error("Account not found");
        }

        await account.delete();

        await backup.info(`query{ deleteSocialMediaAccounts(id: ${id}) }`);

        return true;
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => deleteSocialMediaAccounts , ${error}`
        );
        throw new Error(`Error in deleteSocialMediaAccounts: ${error.message}`);
      }
    },
    /**
     * A function to retrieve projects with optional pagination.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing page and limit
     * @return {Promise} A promise that resolves to a subset of projects
     * based on the provided page and limit
     */
    getProjects: async (parent, args) => {
      try {
        const { page = 0, limit = 6 } = args;
        const skip = page * limit;

        const allProjects = await NeodeObject?.all(
          "Project",
          undefined,
          undefined,
          limit,
          skip
        );

        return allProjects?.map(async (project) => {
          const result = await project.toJson();
          return {
            ...result,
            page,
            limit,
          };
        });
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => getProjects, ${error}`
        );
        throw new Error(`Error in getProjects: ${error.message}`);
      }
    },
    /**
     * Asynchronous function to get a project.
     *
     * @param {object} parent - The parent object
     * @param {object} args - The arguments object containing projectId
     * @return {object} The project data in JSON format
     */
    getProject: async (parent, args) => {
      try {
        const { projectId, page = 0, limit = 6 } = args;

        if (!projectId) {
          throw new Error(
            `Are you send projectId? projectId is required, projectId value is ${projectId}. please check projectId value before send`
          );
        }

        const project = await NeodeObject?.findById("Project", projectId);

        if (!project) {
          throw new Error("Project not found");
        }

        const result = await project.toJson();

        return {
          ...result,
          page,
          limit,
        };
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => getProject, ${error}`);
        throw new Error(`Error in getProject: ${error.message}`);
      }
    },
    /**
     * Search for projects based on a given word, page, and limit.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing word, page, and limit
     * @return {Array} An array of projects that match the search criteria
     */
    searchInProjects: async (parent, args) => {
      try {
        const { word, page = 0, limit = 6 } = args;

        if (!word) {
          throw new Error(
            `Are you send word? word is required, word value is ${word}. please check word value before send`
          );
        }

        const projects = await NeodeObject?.cypher(
          ` MATCH (p:Project) 
            WHERE p.ProjectName CONTAINS $word
            OR p.ProjectDescription CONTAINS $word
            RETURN p
            SKIP ${page} * ${limit} LIMIT ${limit}
          `,
          { word }
        );

        return projects?.records?.map((record) => ({
          ...record.get("p").properties,
          _id: `${record.get("p").identity}`,
          page,
          limit,
        }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => searchInProjects, ${error}`
        );
        throw new Error(`Error in searchInProjects: ${error.message}`);
      }
    },
    /**
     * Asynchronously retrieves a task along with its associated task steps.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing the taskId
     * @return {Object} An object containing the retrieved task and its associated task steps
     */
    getTask: async (parent, args) => {
      try {
        const { taskId } = args;

        if (!taskId) {
          throw new Error(
            `Are you send taskId? taskId is required, taskId value is ${taskId}. please check taskId value before send`
          );
        }

        const task = await NeodeObject?.findById("Task", taskId);

        if (!task) {
          throw new Error("Task not found");
        }

        return {
          ...task?.properties(),
          _id: `${task?.identity()?.low}`,
        };
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => getTask, ${error}`);
        throw new Error(`Error in getTask: ${error.message}`);
      }
    },
    /**
     * Fetches company details and related entities such as teams, projects, and comments.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing companyId
     * @return {Object} The company details along with its comments, project, and teams
     */
    getCompany: async (parent, args) => {
      try {
        const { companyId } = args;

        if (!companyId) {
          throw new Error(
            `Are you send companyId? companyId is required, companyId value is ${companyId}. please check companyId value before send`
          );
        }

        const company = await NeodeObject?.findById("Company", companyId);

        if (!company) {
          throw new Error("Company not found");
        }

        return {
          ...company.properties(),
          _id: `${company.identity().low}`,
        };
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => getCompany, ${error}`);
        throw new Error(`Error in getCompany: ${error.message}`);
      }
    },
    /**
     * Asynchronously retrieves contact messages from user to website owners.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object with optional page and limit properties
     * @return {Array} An array of contact messages based on the specified page and limit
     */
    getContactMessages: async (parent, args) => {
      try {
        const { page = 0, limit = 6 } = args;

        const messages = await NeodeObject?.all(
          "ContactMessage",
          undefined,
          undefined,
          limit,
          page * limit
        );

        if (!messages) {
          throw new Error("Messages not found");
        }

        return messages.toJson();
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => getContactMessages, ${error}`
        );
        throw new Error(`Error in getContactMessages: ${error.message}`);
      }
    },
    /**
     * Get all posts from other companies.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object with userId, page, and limit
     * @return {Array} An array of posts for the specified user
     */
    getAllPosts: async (parent, args) => {
      try {
        // userId is required to doesn't get user posts (my posts)
        const { userId, page = 0, limit = 10 } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const posts = await NeodeObject?.cypher(
          `MATCH (c:Company) -[:HAS_A_POST]-> (p:PositionPost)
           MATCH (u:User {id: "${userId}"}) -[:ADMIN_OF] -> (c1:Company)
           WHERE ID(c) <> ID(c1)
           RETURN p, c
           SKIP ${page} * ${limit} LIMIT ${limit}`
        );

        if (!posts) {
          throw new Error("Posts not found");
        }

        return posts?.records?.map((record) => ({
          ...record.get("p").properties,
          _id: `${record.get("p").identity}`,
        }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => getAllPosts, ${error}`
        );
        throw new Error(`Error in getAllPosts: ${error.message}`);
      }
    },
    /**
     * Asynchronous function to search for position posts based on specified criteria.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The input arguments including page, limit, word, and userId
     * @return {Array} An array of position posts matching the specified criteria
     */
    searchInPositionPosts: async (parent, args) => {
      try {
        const { page = 0, limit = 10, word, userId } = args;

        if (!word) {
          throw new Error(
            `Are you send word? word is required, word value is ${word}. please check word value before send`
          );
        }

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const posts = await NeodeObject?.cypher(
          `
          MATCH (c:Company) -[:HAS_A_POST]-> (p:PositionPost)
          MATCH (u:User {id: "${userId}"}) -[:ADMIN_OF] -> (c1:Company)
          where p.Content CONTAINS $word AND ID(c) <> ID(c1)
          return p
          SKIP ${page} * ${limit} LIMIT ${limit}
          `,
          { word }
        );

        if (!posts) {
          Logging.warn(
            `${new Date()}, in resolvers.js => searchInPositionPosts, posts not found`
          );
          throw new Error("Posts not found");
        }

        return posts?.records?.map((record) => ({
          ...record.get("p").properties,
          _id: `${record.get("p").identity}`,
        }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => searchInPositionPosts, ${error}`
        );
        throw new Error(`Error in searchInPositionPosts: ${error.message}`);
      }
    },
    /**
     * A function to retrieve all posts sorted by date desc or asc.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object including page, limit, isDESC, and userId
     * @return {Array} An array of posts sorted by date
     */
    getAllPostsSortedByDate: async (parent, args) => {
      try {
        const { page = 0, limit = 10, isDESC = false, userId } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const posts = await NeodeObject?.cypher(
          `MATCH (c:Company) -[:HAS_A_POST]-> (p:PositionPost)
           MATCH (u:User {id: "${userId}"}) -[:ADMIN_OF] -> (c1:Company)
           WHERE ID(c) <> ID(c1)
           RETURN p ORDER BY p.CreatedDate ${isDESC ? "DESC" : "ASC"}
           SKIP ${page} * ${limit} LIMIT ${limit}`
        );

        if (!posts) {
          throw new Error("Posts not found");
        }

        return posts?.records?.map((record) => ({
          ...record.get("p").properties,
          _id: `${record.get("p").identity}`,
        }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => getAllPostsSortedByDate, ${error}`
        );
        throw new Error(`Error in getAllPostsSortedByDate: ${error.message}`);
      }
    },
    /**
     * Asynchronous function to search in user posts based on provided criteria.
     *
     * @param {object} parent - The parent object
     * @param {object} args - The arguments object containing page, limit, word, and userId
     * @return {array} An array of posts matching the search criteria
     */
    searchInMyPosts: async (parent, args) => {
      try {
        const { page = 0, limit = 10, word, userId } = args;

        if (!word) {
          throw new Error(
            `Are you send word? word is required, word value is ${word}. please check word value before send`
          );
        }

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const posts = await NeodeObject?.cypher(
          `MATCH (u:User {id: "${userId}"}) -[:ADMIN_OF] -> (c:Company)
          MATCH (c:Company) -[:HAS_A_POST]-> (p:PositionPost)
          WHERE p.Content CONTAINS $word
          RETURN p
          SKIP ${page} * ${limit} LIMIT ${limit}`,
          { word }
        );

        return posts?.records?.map((record) => ({
          ...record.get("p").properties,
          _id: `${record.get("p").identity}`,
        }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => searchInMyPosts, ${error}`
        );
        throw new Error(`Error in searchInMyPosts: ${error.message}`);
      }
    },
    /**
     * Retrieves all of the user's posts sorted by date in desc or asc order.
     *
     * @param {Object} parent - The parent object.
     * @param {Object} args - The arguments object including page, limit, isDESC, and userId.
     * @return {Array} An array of post objects sorted by date.
     */
    getAllMyPostsSortedByDate: async (parent, args) => {
      try {
        const { page = 0, limit = 10, isDESC = false, userId } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const posts = await NeodeObject?.cypher(
          `MATCH (u:User {id: "${userId}"}) -[:ADMIN_OF] -> (c:Company)
          MATCH (c:Company) -[:HAS_A_POST]-> (p:PositionPost)
          RETURN p ORDER BY p.CreatedDate ${isDESC ? "DESC" : "ASC"}
          SKIP ${page} * ${limit} LIMIT ${limit}`
        );

        if (!posts) {
          throw new Error("Posts not found");
        }

        return posts?.records?.map((record) => ({
          ...record.get("p").properties,
          _id: `${record.get("p").identity}`,
        }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => getAllMyPostsSortedByDate, ${error}`
        );
        throw new Error(`Error in getAllMyPostsSortedByDate: ${error.message}`);
      }
    },
    /**
     * Async function to get a team with all its members.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object
     * @return {Object} The team object
     */
    getTeam: async (parent, args) => {
      try {
        const { teamId } = args;

        if (!teamId) {
          throw new Error(
            `Are you send teamId? teamId is required, teamId value is ${teamId}. please check teamId value before send`
          );
        }

        const team = await NeodeObject?.findById("Team", teamId);

        return {
          ...team.properties(),
          _id: `${team.identity().low}`,
        };
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => getTeam, ${error}`);
        throw new Error(`Error in getTeam: ${error.message}`);
      }
    },
    deleteEducation: async (parent, args) => {
      try {
        const { educationId } = args;

        if (!educationId) {
          throw new Error(
            `Are you send educationId? educationId is required, educationId value is ${educationId}. please check educationId value before send`
          );
        }

        const education = await NeodeObject?.findById("Education", educationId);

        if (!education) {
          throw new Error(
            `Education not found with educationId: ${educationId}`
          );
        }

        await NeodeObject?.delete(education);

        await backup.info(
          `Match (education:Education) WHERE ID(education) = ${educationId} DETACH DELETE education`
        );

        return true;
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => deleteEducation, ${error}`
        );
        throw new Error(`Error in deleteEducation: ${error.message}`);
      }
    },
    deleteUserFromTeam: async (parent, args) => {
      try {
        const { userId, teamId } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        if (!teamId) {
          throw new Error(
            `Are you send teamId? teamId is required, teamId value is ${teamId}. please check teamId value before send`
          );
        }

        await NeodeObject?.writeCypher(
          `MATCH (u:User) -[r:IN_TEAM]-> (t:Team) WHERE ID(u) = $userId AND ID(t) = $teamId
           DETACH DELETE r`,
          { userId, teamId }
        );

        await backup.info(`MATCH (u:User) -[r:IN_TEAM]-> (t:Team) WHERE ID(u) = ${userId} AND ID(t) = ${teamId}
        DETACH DELETE r`);

        return true;
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => deleteUserFromTeam, ${error}`
        );
        throw new Error(`Error in deleteUserFromTeam: ${error.message}`);
      }
    },
    deletePost: async (parent, args) => {
      try {
        const { postId } = args;

        if (!postId) {
          throw new Error(
            `Are you send postId? postId is required, postId value is ${postId}. please check postId value before send`
          );
        }

        const post = await NeodeObject?.findById("PositionPost", postId);

        if (!post) {
          throw new Error(`Post not found with postId: ${postId}`);
        }

        await NeodeObject?.delete(post);

        await backup.info(
          `MATCH (p:PositionPost) WHERE ID(p) = ${postId} DETACH DELETE p`
        );

        return true;
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => deletePost, ${error}`);
        throw new Error(`Error in deletePost: ${error.message}`);
      }
    },
    deleteUser: async (parent, args) => {
      try {
        const { userId } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const user = await NeodeObject?.first("User", "id", userId);

        if (!user) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        await user.update({
          ...user?.properties(),
          id: userId,
          IsActive: false,
        });

        await backup.info(
          `MATCH (user:User {id: "${userId}"})
          SET ${Object.keys(user)
            ?.map((key) => `${key}: "${user[key]}"`)
            .join(", ")}
          RETURN user`
        );

        return true;
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => deleteUser, ${error}`);
        throw new Error(`Error in deleteUser: ${error.message}`);
      }
    },
    deleteAIChat: async (parent, args) => {
      try {
        const { AIchatId } = args;

        if (!AIchatId) {
          throw new Error(
            `Are you send AIchatId? AIchatId is required, AIchatId value is ${AIchatId}. please check AIchatId value before send`
          );
        }

        const chat = await NeodeObject?.findById("AIChat", AIchatId);

        if (!chat) {
          throw new Error(
            `Are you send AIchatId? AIchatId is required, AIchatId value is ${AIchatId}. please check AIchatId value before send`
          );
        }

        await NeodeObject?.delete(chat);

        await backup.info(
          `MATCH (c:AIChat) WHERE ID(c) = ${AIchatId} DETACH DELETE c`
        );

        return true;
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => deleteAIChat, ${error}`
        );
        throw new Error(`Error in deleteAIChat: ${error.message}`);
      }
    },
    deleteTask: async (parent, args) => {
      try {
        const { taskId } = args;

        if (!taskId) {
          throw new Error(
            `Are you send taskId? taskId is required, taskId value is ${taskId}. please check taskId value before send`
          );
        }

        const task = await NeodeObject?.findById("Task", taskId);

        if (!task) {
          throw new Error(
            `Are you send taskId? taskId is required, taskId value is ${taskId}. please check taskId value before send`
          );
        }

        await NeodeObject?.delete(task);

        await backup.info(
          `MATCH (t:Task) WHERE ID(t) = ${taskId} DETACH DELETE t`
        );

        return true;
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => deleteTask, ${error}`);
        throw new Error(`Error in deleteTask: ${error.message}`);
      }
    },
    deleteTaskStep: async (parent, args) => {
      try {
        const { taskStepId } = args;

        if (!taskStepId) {
          throw new Error(
            `Are you send taskStepId? taskStepId is required, taskStepId value is ${taskStepId}. please check taskStepId value before send`
          );
        }

        const taskStep = await NeodeObject?.findById("TaskStep", taskStepId);

        if (!taskStep) {
          throw new Error(
            `Are you send taskStepId? taskStepId is required, taskStepId value is ${taskStepId}. please check taskStepId value before send`
          );
        }

        await NeodeObject?.delete(taskStep);

        await backup.info(
          `MATCH (ts:TaskStep) WHERE ID(ts) = ${taskStepId} DETACH DELETE ts`
        );

        return true;
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => deleteTaskStep, ${error}`
        );
        throw new Error(`Error in deleteTaskStep: ${error.message}`);
      }
    },
    deleteCompanyComment: async (parent, args) => {
      try {
        const { commentId } = args;

        if (!commentId) {
          throw new Error(
            `Are you send commentId? commentId is required, commentId value is ${commentId}. please check commentId value before send`
          );
        }

        const comment = await NeodeObject.findById("Comment", commentId);

        if (!comment) {
          throw new Error(
            `Are you send commentId? commentId is required, commentId value is ${commentId}. please check commentId value before send`
          );
        }

        await NeodeObject?.delete(comment);

        await backup.info(
          `MATCH (c:Comment) WHERE ID(c) = ${commentId} DETACH DELETE c`
        );

        return true;
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => deleteCompanyComment, ${error}`
        );
        throw new Error(`Error in deleteCompanyComment: ${error.message}`);
      }
    },
    deleteProjectRequirement: async (parent, args) => {
      try {
        const { projectRequirementId } = args;

        if (!projectRequirementId) {
          throw new Error(
            `Are you send projectRequirementId? projectRequirementId is required, projectRequirementId value is ${projectRequirementId}. please check projectRequirementId value before send`
          );
        }

        const projectRequirement = await NeodeObject?.findById(
          "ProjectRequirement",
          projectRequirementId
        );

        if (!projectRequirement) {
          throw new Error(
            `Are you send projectRequirementId? projectRequirementId is required, projectRequirementId value is ${projectRequirementId}. please check projectRequirementId value before send`
          );
        }

        await NeodeObject?.delete(projectRequirement);

        await backup.info(
          `MATCH (pr:ProjectRequirement) WHERE ID(pr) = ${projectRequirementId} DETACH DELETE pr`
        );

        return true;
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => deleteProjectRequirement, ${error}`
        );
        throw new Error(`Error in deleteProjectRequirement: ${error.message}`);
      }
    },
    deleteProjectNote: async (parent, args) => {
      try {
        const { projectNoteId } = args;

        if (!projectNoteId) {
          throw new Error(
            `Are you send projectNoteId? projectNoteId is required, projectNoteId value is ${projectNoteId}. please check projectNoteId value before send`
          );
        }

        const projectNote = await NeodeObject?.findById(
          "ProjectNote",
          projectNoteId
        );

        if (!projectNote) {
          throw new Error(
            `ProjectNote not found, projectNoteId value is ${projectNoteId}. please check projectNoteId value before send`
          );
        }

        await NeodeObject?.delete(projectNote);

        await backup.info(
          `MATCH (pn:ProjectNote) WHERE ID(pn) = ${projectNoteId} DETACH DELETE pn`
        );

        return true;
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => deleteProjectNote, ${error}`
        );
        throw new Error(`Error in deleteProjectNote: ${error.message}`);
      }
    },
    deleteProjectNoteTask: async (parent, args) => {
      try {
        const { projectNoteTaskId } = args;

        if (!projectNoteTaskId) {
          throw new Error(
            `Are you send projectNoteTaskId? projectNoteTaskId is required, projectNoteTaskId value is ${projectNoteTaskId}. please check projectNoteTaskId value before send`
          );
        }

        const projectNoteTask = await NeodeObject?.findById(
          "ProjectNoteTask",
          projectNoteTaskId
        );

        if (!projectNoteTask) {
          throw new Error(
            `ProjectNoteTask not found, projectNoteTaskId value is ${projectNoteTaskId}. please check projectNoteTaskId value before send`
          );
        }

        await NeodeObject?.delete(projectNoteTask);

        await backup.info(
          `MATCH (pnt:ProjectNoteTask) WHERE ID(pnt) = ${projectNoteTaskId} DETACH DELETE pnt`
        );

        return true;
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => deleteProjectNoteTask, ${error}`
        );
        throw new Error(`Error in deleteProjectNoteTask: ${error.message}`);
      }
    },
  },
  Mutation: {
    /* this to send message to AI module and get answer about a project from
    it file */
    sendAIMessage: async (parent, args) => {
      try {
        // this used to basic auth in python backend (AI model)
        const username = process.env.AI_USERNAME;
        const password = process.env.AI_PASSWORD;
        const credentials = `${username}:${password}`;

        // this string args from frontend as parameters to AI chat
        const { message } = args;

        // ########################################################
        // this will be change after create team object to Team ID so
        // we get company then project then file name from project
        const { fileName } = args;
        // ########################################################

        // this int args from to check if chat already exist or create new
        const { AIchatId } = args;

        if (!message) {
          throw new Error(
            `Are you send message? message is required, message value is ${message}. please check message value before send`
          );
        }

        if (!fileName) {
          throw new Error(
            `Are you send fileName? fileName is required, fileName value is ${fileName}. please check fileName value before send`
          );
        }

        // Base64 encode the credentials
        // this step required to send username & password to auth
        const encodedCredentials = base64.encode(credentials);

        // this to get answer from AI model about some question
        // return type is string
        const response = await axios.post(
          Variables.pythonLink,
          { query: message, filename: fileName },
          {
            headers: {
              Authorization: `Basic ${encodedCredentials}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Create AIChat and AIMessage nodes
        // I save it in database to get it when user need it from old chats
        const [chat, createdMessage] = await Promise.all([
          AIchatId
            ? NeodeObject.findById("AIChat", AIchatId)
            : NeodeObject.create("AIChat", {}),
          NeodeObject.create("AIMessage", {
            Question: message,
            Answer: response.data,
          }),
        ]);

        // Relate AIMessage to AIChat
        await chat.relateTo(createdMessage, "has_a");

        await backup.info(
          `MATCH (chat:AIChat) where ID(chat) = ${chat.identity().low}
          Create (chat)-[r:has_a]->(message:AIMessage {Question: "${message}", Answer: "${
            response.data
          }", CreatedDate: datetime()})
          RETURN message`
        );

        return {
          _id: createdMessage.identity().toString(),
          ...createdMessage.properties(),
        };
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => sendAIMessage, ${error}`
        );
        throw new Error("An error occurred while processing the request");
      }
    },
    /**
     * Creates a new AI chat.
     *
     * @param {Object} parent - The parent object.
     * @param {Object} args - The arguments object.
     * @param {string} args.userId - The ID of the user.
     * @return {Object} The newly created AI chat object.
     */
    createNewAIChat: async (parent, args) => {
      try {
        // this int args from client with user id value to create new AI chat.
        const { userId, Name, projectId } = args;

        if (userId === null) {
          throw new Error("UserID is null");
        }

        if (Name === null) {
          throw new Error("Name is null");
        }

        if (projectId === null) {
          throw new Error("ProjectID is null");
        }

        const AIChat = await NeodeObject?.create("AIChat", {
          Name,
        });
        const User = await NeodeObject?.first("User", "id", userId);

        if (!User) {
          NeodeObject?.delete(AIChat);
          throw new Error("User not found");
        }

        const Project = await NeodeObject?.findById("Project", projectId);

        if (!Project) {
          NeodeObject?.delete(AIChat);
          throw new Error("Project not found");
        }

        // Relate AIChat to Project
        await AIChat.relateTo(Project, "for_project");

        // Relate AIChat to User
        await User.relateTo(AIChat, "chat_with_AI");

        await backup.info(
          `CREATE (chat:AIChat {createdDate: datetime()}) - [:chat_with_AI]-> (user:User {id: "${userId}"}) 
          RETURN chat`
        );

        return await AIChat.toJson();
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => createNewAIChat, ${error}`
        );
        throw new Error(
          `An error occurred while processing the request${error}`
        );
      }
    },
    /**
     * Asynchronous function to create a new user.
     *
     * @param {Object} parent - The parent object.
     * @param {Object} args - The arguments object containing user information.
     * @return {Object} The newly created user object.
     */
    createNewUser: async (parent, args) => {
      try {
        const { user } = args;

        if (!user) {
          throw new Error(
            `Are you send user? user is required, user value is ${user}. please check user value before send`
          );
        }

        const existingUser = await NeodeObject?.first("User", "id", user?.id);

        if (existingUser) {
          return {
            ...existingUser.properties(),
            type: "old",
          };
        }

        user.IsActive = true;
        user.type = "new";

        redisClientSet(
          "users",
          JSON.stringify(user),
          60 * 60 * 24 * 7 // 7 days
        );

        return user;

        // let createdUser = await NeodeObject?.create("User", { ...user });

        // if (!createdUser) {
        //   createdUser = NeodeObject?.create("User", { ...user });

        //   if (createdUser === false) {
        //     throw new Error("something wrong in system please try again");
        //   }
        // }

        // await backup.info(
        //   `CREATE (user:User {createdDate: datetime(), ${Object.keys(user)
        //     ?.map((key) => `${key}: "${user[key]}"`)
        //     .join(", ")}})
        //   RETURN user`
        // );

        // return await createdUser?.toJson();
      } catch (error) {
        console.log(error);
        Logging.error(
          `${new Date()}, in resolvers.js => createNewUser, ${error}`
        );
        throw new Error(error.message);
      }
    },
    /**
     * This function handles the process of forgetting a user's password.
     *
     * @param {object} parent - The parent object
     * @param {object} args - The arguments object containing the user's email
     * @return {string} A message indicating the success of the password reset email sending process
     */
    forgetPassword: async (parent, args) => {
      try {
        const { email } = args;

        if (!email) {
          throw new Error("Email is required");
        }

        const [User] = await Promise.all([
          NeodeObject?.first("User", { Email: email }),
        ]);

        if (!User) {
          throw new Error("User not found, please register first");
        }

        // Generate a temporary password or a reset token (depending on your workflow)
        const temporaryPassword = "123456"; // Implement this function

        sendEmail({
          email,
          subject: "Password Reset",
          text: `Your code is: ${temporaryPassword}`,
        });

        return "Password reset email sent successfully";
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => forgetPassword, ${error}`
        );
        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Update user information.
     *
     * @param {Object} parent - the parent object
     * @param {Object} args - the arguments object with userId and user
     * @return {Promise} a Promise that resolves when the user is updated
     */
    updateUser: async (parent, args) => {
      try {
        const { userId, user } = args;

        if (!userId) {
          throw new Error("UserID is required");
        }

        const [User] = await Promise.all([
          NeodeObject?.first("User", "id", userId),
        ]);

        if (!User) {
          throw new Error("User not found");
        }

        const updateUser = await User.update({ ...user });

        await backup.info(
          `MATCH (user:User {id: "${userId}"})
          SET ${Object.keys(user)
            ?.map((key) => `${key}: "${user[key]}"`)
            .join(", ")}
          RETURN user`
        );

        return {
          ...updateUser?.properties(),
          id: userId,
        };
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => updateUser, ${error}`);
        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * A function to create a new project.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing the project
     * @return {Object} The newly created project
     */
    createNewProject: async (parent, args) => {
      try {
        const { project, page = 0, limit = 6 } = args;

        if (!project) {
          throw new Error(
            `Are you send project? project is required, project value is ${project}. please check project value before send`
          );
        }

        const newProject = await NeodeObject?.create("Project", {
          ...project,
        });

        await backup.info(
          `CREATE (project:Project {createdDate: datetime(), ${Object.keys(
            project
          )
            ?.map((key) => `${key}: "${project[key]}"`)
            .join(", ")}})
          RETURN project`
        );

        const result = await newProject?.toJson();

        return {
          ...result,
          page,
          limit,
        };
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => createNewProject, ${error}`
        );
        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Asynchronously creates a project requirement.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing projectId and requirement
     * @return {Object} The newly created project requirement
     */
    createProjectRequirement: async (parent, args) => {
      try {
        const { projectId, requirement } = args;

        if (!requirement) {
          throw new Error(
            `Are you send requirements? requirements is required, requirements value is ${requirement}. please check requirements value before send`
          );
        }

        if (!projectId) {
          throw new Error(
            `Are you send projectId? projectId is required, projectId value is ${projectId}. please check projectId value before send`
          );
        }

        const project = await NeodeObject?.findById("Project", projectId);

        if (!project) {
          throw new Error(
            `Are you send project? project is required, project value is ${project}. please check project value before send`
          );
        }

        const newProjectRequirement = await NeodeObject?.create(
          "ProjectRequirement",
          { ...requirement }
        );

        await project.relateTo(newProjectRequirement, "has_requirement");

        await backup.info(
          `CREATE (projectRequirement:ProjectRequirement {createdDate: datetime(), ${Object.keys(
            requirement
          )
            ?.map((key) => `${key}: "${requirement[key]}"`)
            .join(", ")}})
          CREATE (project:Project) -[has_requirement:HAS_REQUIREMENT]-> (projectRequirement)
          WHERE ID(project) = ${projectId}
          RETURN projectRequirement;`
        );

        return newProjectRequirement.toJson();
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => createProjectRequirement, ${error}`
        );
        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * A function to create a new team.
     *
     * @param {Object} parent - the parent object
     * @param {Object} args - the arguments object containing team and companyId
     * @return {Object} the newly created team object
     */
    createNewTeam: async (parent, args) => {
      try {
        const { team, companyId } = args;

        if (!team) {
          throw new Error(
            "Are you send team? team is required. please check team value before send"
          );
        }

        const company = await NeodeObject?.findById("Company", companyId);
        if (!company) {
          throw new Error("Company not found, please create one first");
        }
        const teamCreated = await NeodeObject?.create("Team", { ...team });
        await company.relateTo(teamCreated, "has_a_team");

        await backup.info(
          `CREATE (team:Team {createdDate: datetime(), ${Object.keys(team)
            ?.map((key) => `${key}: "${team[key]}"`)
            .join(", ")}})
          CREATE (company:Company) -[has_a_team:HAS_A_TEAM]-> (team)
          WHERE ID(company) = ${companyId}
          RETURN team`
        );

        return teamCreated.toJson();
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => createNewTeam, ${error}`
        );
        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Asynchronously creates a new company.
     *
     * @param {Object} parent - the parent object
     * @param {Object} args - the arguments containing company and userId
     * @return {Object} the newly created company object
     */
    createNewCompany: async (parent, args) => {
      try {
        const { company, userId } = args;

        if (!company) {
          throw new Error(
            "Are you send company? company is required. please check company value before send"
          );
        }

        const user = await NeodeObject?.first("User", "id", userId);

        if (!user) {
          throw new Error("User not found, please register first");
        }

        const companyCreated = await NeodeObject?.create("Company", {
          ...company,
        });

        await user.relateTo(companyCreated, "admin_of");

        await backup.info(
          `CREATE (company:Company {createdDate: datetime(), ${Object.keys(
            company
          )
            ?.map((key) => `${key}: "${company[key]}"`)
            .join(", ")}})
          CREATE (user:User) -[admin_of:ADMIN_OF]-> (company)
          WHERE ID(user) = ${userId}
          RETURN company`
        );

        return companyCreated.toJson();
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => createNewCompany, ${error}`
        );
        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Create a new skill for a user.
     *
     * @param {object} parent - The parent object
     * @param {object} args - The arguments containing the skill and userId
     * @return {object} The newly created skill
     */
    createNewSkill: async (parent, args) => {
      try {
        const { skill, userId } = args;

        if (!skill) {
          throw new Error(
            "Are you send skill? skill is required. please check skill value before send"
          );
        }

        const user = await NeodeObject?.first("User", "id", userId);

        if (!user) {
          throw new Error("User not found, please register first");
        }

        const skillCreated = await NeodeObject?.create("Skill", { ...skill });

        await user.relateTo(skillCreated, "has_a_skill");

        await backup.info(
          `CREATE (skill:Skill {createdDate: datetime(), ${Object.keys(skill)
            ?.map((key) => `${key}: "${skill[key]}"`)
            .join(", ")}})
          CREATE (user:User) -[has_a_skill:HAS_A_SKILL]-> (skill)
          WHERE ID(user) = ${userId}
          RETURN skill`
        );

        return skillCreated.toJson();
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => createNewSkill, ${error}`
        );
        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Asynchronous function for creating a new contact message.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing contactMessage and userId
     * @return {Object} The newly created contact message object
     */
    createNewContactMessage: async (parent, args) => {
      try {
        const { contactMessage, userId } = args;

        if (!contactMessage) {
          throw new Error(
            `Are you send contactMessage? contactMessage is required, contactMessage value is ${contactMessage}. please check contactMessage value before send`
          );
        }

        const user = await NeodeObject?.first("User", "id", userId);

        if (!user) {
          throw new Error("User not found, please register first");
        }

        const newContactMessage = await NeodeObject?.create("ContactMessage", {
          ...contactMessage,
        });

        await user.relateTo(newContactMessage, "contact_us");

        await backup.info(
          `CREATE (contactMessage:ContactMessage {createdDate: datetime(), ${Object.keys(
            contactMessage
          )
            ?.map((key) => `${key}: "${contactMessage[key]}"`)
            .join(", ")}})
          CREATE (user:User) -[contact_us:CONTACT_US]-> (contactMessage)
          WHERE ID(user) = ${userId}
          RETURN contactMessage`
        );

        return newContactMessage.toJson();
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => createNewContactMessage, ${error}`
        );
        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Asynchronously creates a position post.
     *
     * @param {Object} parent - the parent object
     * @param {Object} args - the arguments object containing post and companyId
     * @return {Object} the newly created position post as a JSON object
     */
    createPositionPost: async (parent, args) => {
      try {
        const { post, companyId } = args;

        if (!post) {
          throw new Error(
            `Are you send post? post is required, post value is ${post}. please check post value before send`
          );
        }

        const company = await NeodeObject?.findById("Company", companyId);

        if (!company) {
          throw new Error("Company not found, please create one first");
        }

        const newPost = await NeodeObject?.create("PositionPost", { ...post });

        await company.relateTo(newPost, "has_a_post");

        await backup.info(
          `CREATE (post:PositionPost {createdDate: datetime(), ${Object.keys(
            post
          )
            ?.map((key) => `${key}: "${post[key]}"`)
            .join(", ")}})
          CREATE (company:Company) -[has_a_post:HAS_A_POST]-> (post)
          WHERE ID(company) = ${companyId}
          RETURN post`
        );

        return newPost.toJson();
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => createPositionPost, ${error}`
        );

        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Add a user to a team with a specified role.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing userId, teamId, and role
     * @return {boolean} true if the user was successfully added to the team, false otherwise
     */
    addUserToTeam: async (parent, args) => {
      try {
        const { userId, teamId, role } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        if (!teamId) {
          throw new Error(
            `Are you send teamId? teamId is required, teamId value is ${teamId}. please check teamId value before send`
          );
        }

        await NeodeObject.writeCypher(
          `
          Match (t:Team) WHERE ID(t) = ${teamId}
          MATCH (c:Company)-[cr:HAS_A_TEAM]->(t)
          MATCH (c) -[tp:TAKE_A_PROJECT]-> (p:Project)
          MATCH (n:User {id: "${userId}"})
          CREATE (n) -[tr:IN_TEAM {role: "${role}"}] -> (t)
          CREATE (n) -[wr:WORK_ON] -> (p)
          RETURN p
          `
        );

        await backup.info(
          `
          Match (t:Team) WHERE ID(t) = ${teamId}
          MATCH (c:Company)-[cr:HAS_A_TEAM]->(t)
          CREATE (n:User {id: "${userId}"}) -[tr:IN_TEAM {role: "${role}"}] -> (t)
          MATCH (c) -[tp:TAKE_A_PROJECT]-> (p:Project)
          CREATE (n) -[wr:WORK_ON] -> (p)
          RETURN p
          `
        );

        return true;
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => addUserToTeam, ${error}`
        );
        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Asynchronous function to create a project note.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object with projectNote and projectId
     * @return {Object} The newly created project note in JSON format
     */
    createProjectNote: async (parent, args) => {
      try {
        const { projectNote, projectId } = args;

        if (!projectNote) {
          throw new Error(
            `Are you send projectNote? projectNote is required, projectNote value is ${projectNote}. please check projectNote value before send`
          );
        }

        if (!projectId) {
          throw new Error(
            `Are you send projectId? projectId is required, projectNote value is ${projectId}. please check projectId value before send`
          );
        }

        const project = await NeodeObject?.findById("Project", projectId);

        if (!project) {
          throw new Error("Project not found");
        }

        const newProjectNote = await NeodeObject?.create("ProjectNote", {
          ...projectNote,
        });

        await project.relateTo(newProjectNote, "has_note");

        await backup.info(
          `CREATE (note:ProjectNote {createdDate: datetime(), ${Object.keys(
            projectNote
          )
            ?.map((key) => `${key}: "${projectNote[key]}"`)
            .join(", ")}})
          CREATE (project:Project) -[has_note:HAS_NOTE]-> (note)
          WHERE ID(project) = ${projectId}
          RETURN note`
        );

        return newProjectNote.toJson();
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => createProjectNote, ${error}`
        );

        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Asynchronous function to create a project note task.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing projectNoteTask and projectNoteId
     * @return {Object} The newly created project note task
     */
    createProjectNoteTask: async (parent, args) => {
      try {
        const { projectNoteTask, projectNoteId } = args;

        if (!projectNoteTask) {
          throw new Error(
            `Are you send projectNoteTask? projectNoteTask is required, projectNoteTask value is ${projectNoteTask}. please check projectNoteTask value before send`
          );
        }

        if (!projectNoteId) {
          throw new Error(
            `Are you send projectNoteId? projectNoteId is required, projectNoteId value is ${projectNoteId}. please check projectNoteId value before send`
          );
        }

        const projectNote = await NeodeObject?.findById(
          "ProjectNote",
          projectNoteId
        );

        if (!projectNote) {
          throw new Error("ProjectNote not found");
        }

        const newProjectNoteTask = await NeodeObject?.create(
          "ProjectNoteTask",
          { ...projectNoteTask }
        );

        await projectNote.relateTo(newProjectNoteTask, "has_task");

        await backup.info(
          `CREATE (task:ProjectNoteTask {createdDate: datetime(), ${Object.keys(
            projectNoteTask
          )
            ?.map((key) => `${key}: "${projectNoteTask[key]}"`)
            .join(", ")}})
          CREATE (note:ProjectNote) -[has_task:HAS_TASK]-> (task)
          WHERE ID(note) = ${projectNoteId}
          RETURN task`
        );

        return newProjectNoteTask.toJson();
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => createProjectNoteTask, ${error}`
        );

        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Asynchronous function to create a new user account in his profile.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object with socialMediaAccount and userId
     * @return {Object} The newly created social media link in JSON format
     */
    createNewSocialMediaLink: async (parent, args) => {
      try {
        const { socialMediaAccount, userId } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const user = await NeodeObject?.first("User", "id", userId);

        if (!user) {
          throw new Error("User not found");
        }

        const newSocialMediaLink = await NeodeObject?.create(
          "SocialMediaLink",
          { ...socialMediaAccount }
        );

        await user.relateTo(newSocialMediaLink, "has_a_social_media");

        await backup.info(
          `CREATE (link:SocialMediaLink {createdDate: datetime(), ${Object.keys(
            socialMediaAccount
          )
            ?.map((key) => `${key}: "${socialMediaAccount[key]}"`)
            .join(", ")}})
          CREATE (user:User) -[has_a_social_media:HAS_A_SOCIAL_MEDIA]-> (link)
          WHERE ID(user) = ${userId}
          RETURN link`
        );

        return newSocialMediaLink.toJson();
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => createNewSocialMediaLink, ${error}`
        );

        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Asynchronous function to create a task for a user.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing task, userId,
     * userCreateTaskId, and companyId
     * @return {Object} The newly created task in JSON format
     */
    createTaskForUser: async (parent, args) => {
      try {
        // userCreateTaskId for user who need to create task for other user
        const { task, userId, userCreateTaskId, companyId, teamId } = args;

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const user = await NeodeObject?.first("User", "id", userId);

        if (!user) {
          throw new Error("User not found");
        }

        if (!companyId) {
          throw new Error(
            `Are you send companyId? companyId is required, companyId value is ${companyId}. please check companyId value before send`
          );
        }

        const company = await NeodeObject?.findById("Company", companyId);

        if (!company) {
          throw new Error("Company not found");
        }

        const newTask = await NeodeObject?.create("Task", { ...task });

        if (!userCreateTaskId) {
          throw new Error(
            `Are you send userCreateTaskId? userCreateTaskId is required, userCreateTaskId value is ${userCreateTaskId}. please check userCreateTaskId value before send`
          );
        }

        const userCreateTask = await NeodeObject?.first(
          "User",
          "id",
          userCreateTaskId
        );

        if (!userCreateTask) {
          throw new Error("User need to Create Task is not found");
        }

        if (!teamId) {
          throw new Error(
            `Are you send teamId? teamId is required, teamId value is ${teamId}. please check teamId value before send`
          );
        }

        const team = await NeodeObject?.findById("Team", teamId);

        await userCreateTask.relateTo(newTask, "create_task");

        await user.relateTo(newTask, "has_a_task");

        await newTask.relateTo(company, "in_company");

        await newTask.relateTo(team, "in_team");

        await backup.info(
          `CREATE (task:Task {createdDate: datetime(), ${Object.keys(task)
            ?.map((key) => `${key}: "${task[key]}"`)
            .join(", ")}})
          CREATE (user:User) -[has_a_task:HAS_A_TASK]-> (task)
          CREATE (userCreateTask:User) -[create_task:CREATE_TASK]-> (task)
          CREATE (company:Company) -[in_company:IN_COMPANY]-> (task)
          WHERE ID(user) = ${userId}
          AND ID(company) = ${companyId}
          AND ID(userCreateTask) = ${userCreateTaskId}
          RETURN task`
        );

        return newTask.toJson();
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => createTaskForUser, ${error}`
        );

        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Asynchronously creates a task for a team.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments containing task, teamId, and userId
     * @return {Object} The newly created task in JSON format
     */
    createTaskForTeam: async (parent, args) => {
      try {
        const { task, teamId, userId, companyId } = args;

        if (!teamId) {
          throw new Error(
            `Are you send teamId? teamId is required, teamId value is ${teamId}. please check teamId value before send`
          );
        }

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const team = await NeodeObject?.findById("Team", teamId);

        if (!team) {
          throw new Error("Team not found");
        }

        const user = await NeodeObject?.first("User", "id", userId);

        if (!user) {
          throw new Error("User not found");
        }

        if (!companyId) {
          throw new Error(
            `Are you send companyId? companyId is required, companyId value is ${companyId}. please check companyId value before send`
          );
        }

        const company = await NeodeObject?.findById("Company", companyId);

        const newTask = await NeodeObject?.create("Task", { ...task });

        await team.relateTo(newTask, "has_a_task");

        await user.relateTo(newTask, "create_task");

        await newTask.relateTo(company, "in_company");

        await newTask.relateTo(team, "in_team");

        await backup.info(
          `CREATE (task:Task {createdDate: datetime(), ${Object.keys(task)
            ?.map((key) => `${key}: "${task[key]}"`)
            .join(", ")}})
          CREATE (team:Team) -[has_a_task:HAS_A_TASK]-> (task)
          CREATE (user:User) -[create_task:CREATE_TASK]-> (task)
          WHERE ID(team) = ${teamId}
          AND ID(user) = ${userId}
          RETURN task`
        );

        return newTask.toJson();
      } catch (error) {
        console.log(error);
        Logging.error(
          `${new Date()}, in resolvers.js => createTaskForTeam, ${error}`
        );

        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Updates a task with the given task ID, task, and task steps.
     *
     * @param {object} parent - The parent object
     * @param {object} args - The arguments containing taskId, task, and taskSteps
     * @return {object} The updated task in JSON format
     */
    updateTask: async (parent, args) => {
      try {
        const { taskId, task } = args;

        if (!taskId) {
          throw new Error(
            `Are you send taskId? taskId is required, taskId value is ${taskId}. please check taskId value before send`
          );
        }
        const updatedTask = await NeodeObject?.findById("Task", taskId).then(
          (t) => t.update({ ...task })
        );

        if (!updatedTask) {
          throw new Error("Task not found");
        }

        await backup.info(
          `MATCH (t:Task) WHERE ID(t) = ${taskId}
          SET t = {${Object.keys(task)
            ?.map((key) => `${key}: "${task[key]}"`)
            .join(", ")}} RETURN t`
        );

        return {
          ...updatedTask.properties(),
          _id: `${updatedTask?.identity()?.low}`,
        };
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => updateTask, ${error}`);
        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Asynchronously updates a task step.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object with taskStepId and taskStep
     * @return {Object} The updated task step in JSON format
     */
    updateTaskStep: async (parent, args) => {
      try {
        const { taskStepId, taskStep } = args;

        if (!taskStepId) {
          throw new Error(
            `Are you send taskStepId? taskStepId is required, taskStepId value is ${taskStepId}. please check taskStepId value before send`
          );
        }

        const updatedTaskStep = await NeodeObject?.findById(
          "TaskStep",
          taskStepId
        ).then((t) => (t ? t.update({ ...taskStep }) : null));

        if (!updatedTaskStep) {
          throw new Error("TaskStep not found");
        }

        await backup.info(
          `MATCH (t:TaskStep) WHERE ID(t) = ${taskStepId}
          SET t = {${Object.keys(taskStep)
            ?.map((key) => `${key}: "${taskStep[key]}"`)
            .join(", ")}} RETURN t`
        );

        return {
          ...updatedTaskStep.properties(),
          _id: `${updatedTaskStep?.identity()?.low}`,
        };
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => updateTaskStep, ${error}`
        );

        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Asynchronously creates a comment for a company from company profile.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing comment and companyId
     * @return {Object} The newly created comment
     */
    createCompanyComment: async (parent, args) => {
      try {
        const { comment, companyId } = args;

        if (!companyId) {
          throw new Error(
            `Are you send companyId? companyId is required, companyId value is ${companyId}. please check companyId value before send`
          );
        }

        const company = await NeodeObject?.findById("Company", companyId);

        if (!company) {
          throw new Error("Company not found");
        }

        const newComment = await NeodeObject?.create("Comment", { ...comment });

        await company.relateTo(newComment, "has_a_comment");

        await backup.info(
          `CREATE (c:Comment { 
            createdDate: datetime(), 
            ${Object.keys(comment)
              ?.map((key) => `${key}: "${comment[key]}"`)
              .join(", ")} }) -[has_a_comment:HAS_A_COMMENT]-> (company:Company)
          WHERE ID(company) = ${companyId}
          RETURN c`
        );

        return newComment.toJson();
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => createCompanyComment, ${error}`
        );

        throw new Error(`An error occurred: ${error.message}`);
      }
    },
    /**
     * Asynchronous function to update a company.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing companyId and company
     * @return {Object} The updated company object
     */
    updateCompany: async (parent, args) => {
      try {
        const { companyId, company } = args;

        if (!companyId) {
          throw new Error(
            `Are you send companyId? companyId is required, companyId value is ${companyId}. please check companyId value before send`
          );
        }

        const updatedCompany = await NeodeObject?.findById(
          "Company",
          companyId
        ).then((c) => c.update({ ...company }));

        if (!updatedCompany) {
          throw new Error("Company not found");
        }

        await backup.info(
          `MATCH (c:Company) WHERE ID(c) = ${companyId}
          SET c = {${Object.keys(company)
            ?.map((key) => `${key}: "${company[key]}"`)
            .join(", ")}} RETURN c`
        );

        return {
          ...updatedCompany.properties(),
          _id: `${updatedCompany?.identity()?.low}`,
        };
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => updateCompany, ${error}`
        );
        throw error;
      }
    },
    /**
     * Update a project with the given ID and data.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object with projectId and project
     * @return {Object} The updated project object
     */
    updateProject: async (parent, args) => {
      try {
        const { projectId, project, page = 0, limit = 6 } = args;

        if (!projectId) {
          throw new Error(
            `Are you send projectId? projectId is required, projectId value is ${projectId}. please check projectId value before send`
          );
        }

        const updatedProject = await NeodeObject?.findById(
          "Project",
          projectId
        ).then((p) => p.update({ ...project }));

        if (!updatedProject) {
          throw new Error("Project not found");
        }

        await backup.info(
          `MATCH (p:Project) WHERE ID(p) = ${projectId}
          SET p = {${Object.keys(project)
            ?.map((key) => `${key}: "${project[key]}"`)
            .join(", ")}} RETURN p`
        );

        return {
          ...updatedProject.properties(),
          _id: `${updatedProject?.identity()?.low}`,
          page,
          limit,
        };
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => updateProject, ${error}`
        );
        throw error;
      }
    },
    /**
     * Asynchronous function to create a task step.
     *
     * @param {object} parent - The parent object
     * @param {object} args - The arguments object with taskId and taskStep
     * @return {object} The newly created task step in JSON format
     */
    createTaskStep: async (parent, args) => {
      try {
        const { taskId, taskStep } = args;

        if (!taskId) {
          throw new Error(
            `Are you send taskId? taskId is required, taskId value is ${taskId}. please check taskId value before send`
          );
        }

        const task = await NeodeObject?.findById("Task", taskId);

        if (!task) {
          throw new Error("Task not found");
        }

        const newTaskStep = await NeodeObject?.create("TaskStep", {
          ...taskStep,
        });

        await task.relateTo(newTaskStep, "has_a");

        await backup.info(
          `CREATE (ts:TaskStep {
            createdDate: datetime(),
            ${Object.keys(taskStep)
              ?.map((key) => `${key}: "${taskStep[key]}"`)
              .join(", ")} }) -[has_a:HAS_A]-> (task:Task)
          WHERE ID(task) = ${taskId}
          RETURN ts`
        );

        return newTaskStep.toJson();
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => createTaskStep, ${error}`
        );
        throw error;
      }
    },
    /**
     * Asynchronously replays a contact message.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing contactMessageId and message
     * @return {Promise} A Promise that resolves when the contact message is replayed
     */
    replayContactMessage: async (parent, args) => {
      try {
        const { contactMessageId, message } = args;

        if (!contactMessageId) {
          throw new Error(
            `Are you send contactMessageId? contactMessageId is required, contactMessageId value is ${contactMessageId}. please check contactMessageId value before send`
          );
        }

        const userEmail = await NeodeObject?.cypher(
          `MATCH (u:User) -[:CONTACT_US] -> (c:ContactMessage) 
           where ID(c) = $contactMessageId
           RETURN u.Email`,
          { contactMessageId }
        );

        if (!userEmail) {
          throw new Error("Contact message not found");
        }

        await sendEmail({
          email: userEmail,
          subject: "Replay contact message",
          text: message,
        });
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => replayContactMessage, ${error}`
        );
        throw new Error(`Error in replayContactMessage: ${error.message}`);
      }
    },
    /**
     * Asynchronously updates the position post.
     *
     * @param {object} parent - The parent object
     * @param {object} args - The arguments object containing postId and positionPost
     * @return {object} The updated position post in JSON format
     */
    updatePositionPost: async (parent, args) => {
      try {
        const { positionPostId, positionPost } = args;

        if (!positionPostId) {
          throw new Error(
            `Are you send postId? postId is required, postId value is ${positionPostId}. please check postId value before send`
          );
        }

        const updatedPositionPost = await NeodeObject?.findById(
          "PositionPost",
          positionPostId
        ).then((p) => p.update({ ...positionPost }));

        if (!updatedPositionPost) {
          throw new Error("Position post not found");
        }

        await backup.info(
          `MATCH (pp:PositionPost)
          WHERE ID(pp) = ${positionPostId}
          SET pp = {${Object.keys(positionPost)
            ?.map((key) => `${key}: "${positionPost[key]}"`)
            .join(", ")}} RETURN pp`
        );

        return {
          ...updatedPositionPost?.properties(),
          _id: `${updatedPositionPost?.identity()?.low}`,
        };
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => updatePositionPost, ${error}`
        );
        throw error;
      }
    },
    /**
     * A function to apply to a post.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing postId and userId
     * @return {boolean} true if the operation is successful
     */
    applyToPost: async (parent, args) => {
      try {
        const { postId, userId } = args;

        if (!postId) {
          throw new Error(
            `Are you send postId? postId is required, postId value is ${postId}. please check postId value before send`
          );
        }

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const user = await NeodeObject?.first("User", "id", userId);

        if (!user) {
          throw new Error("User not found");
        }

        const positionPost = await NeodeObject?.findById(
          "PositionPost",
          postId
        );

        if (!positionPost) {
          throw new Error("Position post not found");
        }

        await user.relateTo(positionPost, "apply_to");

        await backup.info(
          `MATCH (pp:PositionPost)
          WHERE ID(pp) = ${postId}
          SET pp = {isApplied: true} RETURN pp`
        );

        return true;
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => applyToPost, ${error}`
        );
        throw error;
      }
    },
    createEducation: async (parent, args) => {
      try {
        const { education, userId } = args;

        if (!education) {
          throw new Error(
            `Are you send education? education is required, education value is ${education}. please check education value before send`
          );
        }

        if (!userId) {
          throw new Error(
            `Are you send userId? userId is required, userId value is ${userId}. please check userId value before send`
          );
        }

        const educationNode = await NeodeObject?.create("Education", {
          ...education,
        });

        const user = await NeodeObject?.first("User", "id", userId);

        if (!user) {
          throw new Error("User not found");
        }

        await user.relateTo(educationNode, "learn_a");

        await backup.info(
          `CREATE (education:Education {
            createdDate: datetime(),
            ${Object.keys(education)
              ?.map((key) => `${key}: "${education[key]}"`)
              .join(", ")} })
          CREATE (user:User)-[:LEARN_A]->(education)
          WHERE ID(user) = ${userId}
          RETURN education`
        );

        return educationNode.toJson();
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => createEducation, ${error}`
        );
        throw error;
      }
    },
    /**
     * A function to user to apply for a project for a company.
     *
     * @param {Object} parent - The parent object
     * @param {Object} args - The arguments object containing projectId and companyId
     * @return {boolean} Whether the application was successful
     */
    applyForProject: async (parent, args) => {
      try {
        const { projectId, companyId } = args;

        if (!projectId) {
          throw new Error(
            `Are you send projectId? projectId is required, projectId value is ${projectId}. please check projectId value before send`
          );
        }

        if (!companyId) {
          throw new Error(
            `Are you send companyId? companyId is required, companyId value is ${companyId}. please check companyId value before send`
          );
        }

        const project = await NeodeObject?.findById("Project", projectId);

        if (!project) {
          Logging.warn(
            `${new Date()}, in resolvers.js => applyForProject, project not found`
          );
          throw new Error("Project not found");
        }

        const company = await NeodeObject?.findById("Company", companyId);

        if (!company) {
          throw new Error("Company not found");
        }

        await company.relateTo(project, "take_a_project");

        await backup.info(
          `MATCH (c:Company) WHERE ID(c) = ${companyId}
              MATCH (p:Project) WHERE ID(p) = ${projectId}
              Create (c)-[:TAKE_A_PROJECT]->(p)
              )}`
        );

        return true;
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => applyForProject, ${error}`
        );
        throw new Error(`Error in applyForProject: ${error.message}`);
      }
    },
    updateEducation: async (parent, args) => {
      try {
        const { educationId, education } = args;

        if (!educationId) {
          throw new Error(
            `Are you send educationId? educationId is required, educationId value is ${educationId}. please check educationId value before send`
          );
        }

        if (!education) {
          throw new Error(
            `Are you send education? education is required, education value is ${education}. please check education value before send`
          );
        }

        const educationNode = await NeodeObject?.findById(
          "Education",
          educationId
        );

        if (!educationNode) {
          throw new Error("Education not found");
        }

        await educationNode.update(education);

        await backup.info(
          `MATCH (education:Education) WHERE ID(education) = ${educationId}
          SET education = {${Object.keys(education)
            ?.map((key) => `${key}: "${education[key]}"`)
            .join(", ")} }
          RETURN education`
        );

        return {
          ...educationNode?.properties(),
          _id: `${educationNode?.identity()?.low}`,
        };
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => updateEducation, ${error}`
        );
        throw new Error(`Error in updateEducation: ${error.message}`);
      }
    },
    updateTeam: async (parent, args) => {
      try {
        const { teamId, team } = args;

        if (!teamId) {
          throw new Error(
            `Are you send teamId? teamId is required, teamId value is ${teamId}. please check teamId value before send`
          );
        }

        if (!team) {
          throw new Error(
            `Are you send team? team is required, team value is ${team}. please check team value before send`
          );
        }

        const teamNode = await NeodeObject?.findById("Team", teamId);

        if (!teamNode) {
          throw new Error("Team not found");
        }

        await teamNode.update(team);

        await backup.info(
          `MATCH (team:Team) WHERE ID(team) = ${teamId}
          SET team = {${Object.keys(team)
            ?.map((key) => `${key}: "${team[key]}"`)
            .join(", ")} }
          RETURN team`
        );

        return {
          ...teamNode?.properties(),
          _id: `${teamNode?.identity()?.low}`,
        };
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => updateTeam, ${error}`);
        throw new Error(`Error in updateTeam: ${error.message}`);
      }
    },
  },
  AIChat: {
    Messages: async (parent) => {
      try {
        const chatId = parent._id;
        const { page, limit } = parent;

        if (!chatId) {
          throw new Error("ChatID is null");
        }

        // this query get chat by chatId with all messages.
        const cypherQuery = `
           MATCH (chat:AIChat)-[:HAS_A]->(messages:AIMessage) 
           WHERE ID(chat) = $chatId 
           RETURN messages
           SKIP ${page} * ${limit} LIMIT ${limit}`;
        const result = await NeodeObject.cypher(cypherQuery, { chatId });

        if (!result) {
          return [];
        }

        return result?.records?.map((record) => ({
          ...record.get("messages").properties,
          _id: `${record.get("messages").identity().low}`,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Messages, ${error}`);
        throw error;
      }
    },
    FileName: async (parent) => {
      try {
        const chatId = parent._id;

        if (!chatId) {
          throw new Error("ChatID is null");
        }

        const cypherQuery = `
           MATCH (chat:AIChat)-[:FOR_PROJECT]-> (project:Project)
           WHERE ID(chat) = $chatId 
           RETURN project.FileName as fileName`;
        const result = await NeodeObject.cypher(cypherQuery, { chatId });

        if (result.records.length === 0) {
          throw new Error("Project not found");
        }

        return result?.records[0].get("fileName");
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => FileName, ${error}`);
        console.log(error);
      }
    },
  },
  User: {
    MyCompanies: async (parent) => {
      try {
        const userId = parent.id;
        const { page, limit } = parent;

        if (!userId) {
          throw new Error("UserID is null");
        }

        const cypherQuery = `
           MATCH (user:User {id: "${userId}"})-[:ADMIN_OF]->(companies:Company)
           RETURN companies
           SKIP ${page} * ${limit} LIMIT ${limit}`;

        const result = await NeodeObject.cypher(cypherQuery);

        if (!result) {
          return [];
        }

        return result?.records?.map((record) => ({
          ...record.get("companies").properties,
          _id: `${record.get("companies").identity}`,
        }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => MyCompanies, ${error}`
        );
        throw error;
      }
    },
    WorkCompanies: async (parent) => {
      try {
        const userId = parent.id;
        const { page, limit } = parent;

        if (!userId) {
          throw new Error("UserID is null");
        }

        const cypherQuery = `
           MATCH (user:User {id: "${userId}"})-[:IN_TEAM]-> (team:Team)
           Match (companies:Company)-[:HAS_A_TEAM]->(team)
           RETURN companies
           SKIP ${page} * ${limit} LIMIT ${limit}`;

        const result = await NeodeObject.cypher(cypherQuery);

        if (!result) {
          return [];
        }

        return result?.records?.map((record) => ({
          ...record.get("companies").properties,
          _id: `${record.get("companies").identity}`,
        }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => WorkCompanies, ${error}`
        );
        throw error;
      }
    },
    Skills: async (parent) => {
      try {
        const userId = parent.id;
        const { page, limit } = parent;

        if (!userId) {
          throw new Error("UserID is null");
        }

        const cypherQuery = `
           MATCH (user:User {id: "${userId}"})-[:HAS_A_SKILL]->(skills:Skill)
           RETURN skills
           SKIP ${page} * ${limit} LIMIT ${limit}`;

        const result = await NeodeObject.cypher(cypherQuery);

        if (!result) {
          return [];
        }

        return result?.records?.map((record) => ({
          ...record.get("skills").properties,
          _id: `${record.get("skills").identity}`,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Skills, ${error}`);
        throw error;
      }
    },
    Accounts: async (parent) => {
      try {
        const userId = parent.id;
        const { page, limit } = parent;

        if (!userId) {
          throw new Error("UserID is null");
        }

        const cypherQuery = `
           MATCH (user:User {id: "${userId}"})-[:HAS_A_SOCIAL_MEDIA]->(accounts:SocialMediaLink)
           RETURN accounts
           SKIP ${page} * ${limit} LIMIT ${limit}`;

        const result = await NeodeObject.cypher(cypherQuery);

        return result?.records?.map((record) => ({
          ...record.get("accounts").properties,
          _id: record.get("accounts").identity.low,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Accounts, ${error}`);
        throw error;
      }
    },
    Tasks: async (parent) => {
      try {
        const userId = parent.id;

        const { page, limit } = parent;

        if (!userId) {
          throw new Error("UserID is null");
        }

        const cypherQuery = `
           MATCH (user:User {id: "${userId}"})-[:HAS_A_TASK]->(tasks:Task)
           RETURN tasks
           SKIP ${page} * ${limit} LIMIT ${limit}`;

        const result = await NeodeObject.cypher(cypherQuery);

        return result?.records?.map((record) => ({
          ...record.get("tasks").properties,
          Priority: record.get("tasks")?.properties?.Priority.low,
          _id: record.get("tasks").identity.low,
          page,
          limit,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Tasks, ${error}`);
        throw error;
      }
    },
    Educations: async (parent) => {
      try {
        const userId = parent.id;

        if (!userId) {
          throw new Error("UserID is null");
        }

        const cypherQuery = `
           MATCH (user:User {id: "${userId}"})-[:LEARN_A]->(educations:Education)
           RETURN educations`;

        const result = await NeodeObject.cypher(cypherQuery);

        return result?.records?.map((record) => ({
          ...record.get("educations").properties,
          _id: record.get("educations").identity.low,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Educations, ${error}`);
        throw error;
      }
    },
    AIChats: async (parent) => {
      try {
        const userId = parent.id;
        const { page, limit } = parent;

        if (!userId) {
          throw new Error("UserID is null");
        }

        const cypherQuery = `
           MATCH (user:User {id: "${userId}"})-[:CHAT_WITH_AI]->(chats:AIChat)
           RETURN chats
           SKIP ${page} * ${limit} LIMIT ${limit}`;

        const result = await NeodeObject.cypher(cypherQuery);

        return result?.records?.map((record) => ({
          ...record.get("chats").properties,
          _id: record.get("chats").identity.low,
          page,
          limit,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => AIChats, ${error}`);
        throw error;
      }
    },
    CreatedTasks: async (parent) => {
      try {
        const userId = parent.id;
        const { page, limit } = parent;

        if (!userId) {
          throw new Error("UserID is null");
        }

        const cypherQuery = `
           MATCH (user:User {id: "${userId}"})-[:CREATE_TASK]->(tasks:Task)
           RETURN tasks
           SKIP ${page} * ${limit} LIMIT ${limit}`;

        const result = await NeodeObject.cypher(cypherQuery);

        return result?.records?.map((record) => ({
          ...record.get("tasks").properties,
          Priority: record.get("tasks")?.properties?.Priority,
          _id: record.get("tasks").identity.low,
        }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => CreatedTasks, ${error}`
        );
        throw error;
      }
    },
    Posts: async (parent) => {
      try {
        const userId = parent.id;
        const { page, limit } = parent;

        if (!userId) {
          throw new Error("UserID is null");
        }

        const cypherQuery = `
           MATCH (user:User {id: "${userId}"})-[:APPLY_TO]->(posts:PositionPost)
           RETURN posts
           SKIP ${page} * ${limit} LIMIT ${limit}`;

        const result = await NeodeObject.cypher(cypherQuery);

        return result?.records?.map((record) => ({
          ...record.get("posts").properties,
          _id: record.get("posts")?.identity.low,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Posts, ${error}`);
        throw error;
      }
    },
    Friends: async (parent) => {
      try {
        const userId = parent.id;

        if (!userId) {
          throw new Error("UserID is null");
        }

        const cypherQuery = `
           MATCH (user:User {id: "${userId}"})-[:ADMIN_OF]->(myCompany:Company)
           MATCH (user:User {id: "${userId}"})-[:WORK_ON]->(company:Company)
           MATCH (myCompany)-[:HAS_A_TEAM]->(myTeam:Team)
           MATCH (company)-[:HAS_A_TEAM]->(team)
           MATCH (myFriends:User)-[:IN_TEAM]->(myTeam)
           MATCH (friends:User)-[:IN_TEAM]->(team)
           WHERE ID(myFriends) <> ID(friends) 
           and ID(myTeam) <> ID(team) 
           and ID(myCompany) <> ID(company)
           and user.id <> friends.id
           and user.id <> myFriends.id
           RETURN friends, myFriends`;

        const result = await NeodeObject.cypher(cypherQuery);

        return result?.records?.map((record) => ({
          friends: {
            ...record.get("friends").properties,
            id: record.get("friends").identity.low,
          },
          myFriends: {
            ...record.get("myFriends").properties,
            id: record.get("myFriends").identity.low,
          },
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Friends, ${error}`);
        throw error;
      }
    },
  },
  Project: {
    Notes: async (parent) => {
      try {
        const projectId = parent._id;

        if (!projectId) {
          throw new Error("ProjectID is null");
        }

        const cypherQuery = `
           MATCH (project:Project)-[:HAS_NOTE]->(notes:ProjectNote)
           WHERE ID(project) = ${projectId}
           RETURN notes`;

        const result = await NeodeObject.cypher(cypherQuery);

        return result?.records?.map((record) => ({
          ...record.get("notes").properties,
          _id: record.get("notes").identity.low,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Notes, ${error}`);
        throw error;
      }
    },
    Requirements: async (parent) => {
      try {
        const projectId = parent._id;

        if (!projectId) {
          throw new Error("ProjectID is null");
        }

        const cypherQuery = `
           MATCH (project:Project)-[:HAS_REQUIREMENT]->(requirements:ProjectRequirement)
           WHERE ID(project) = ${projectId}
           RETURN requirements`;

        const result = await NeodeObject.cypher(cypherQuery);

        return result?.records?.map((record) => ({
          ...record.get("requirements").properties,
          _id: record.get("requirements").identity.low,
        }));
      } catch (error) {
        Logging.error(
          `${new Date()}, in resolvers.js => Requirements, ${error}`
        );
        throw error;
      }
    },
    Applies: async (parent) => {
      try {
        const projectId = parent._id;
        const { page, limit } = parent;

        if (!projectId) {
          throw new Error(`ProjectID is ${projectId}`);
        }

        const cypherQuery = `
           MATCH (companies:Company)-[:TAKE_A_PROJECT]->(project:Project)
           WHERE ID(project) = ${projectId}
           RETURN companies
           SKIP ${page} * ${limit} LIMIT ${limit}`;

        const result = await NeodeObject.cypher(cypherQuery);

        return result?.records?.map((record) => ({
          ...record.get("companies").properties,
          _id: record.get("companies").identity.low,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Applies, ${error}`);
        throw error;
      }
    },
  },
  Company: {
    Teams: async (parent) => {
      try {
        const companyId = parent._id;

        if (!companyId) {
          throw new Error("CompanyID is null");
        }

        const cypherQuery = `
           MATCH (company:Company)-[:HAS_A_TEAM]->(teams:Team)
           WHERE ID(company) = ${companyId}
           RETURN teams`;

        const result = await NeodeObject.cypher(cypherQuery);

        return result?.records?.map((record) => ({
          ...record.get("teams").properties,
          _id: record.get("teams").identity.low,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Teams, ${error}`);
        throw error;
      }
    },
    Comments: async (parent) => {
      try {
        const companyId = parent._id;

        if (!companyId) {
          throw new Error("CompanyID is null");
        }

        const cypherQuery = `
           MATCH (company:Company)-[:HAS_A_COMMENT]->(comments:Comment)
           WHERE ID(company) = ${companyId}
           RETURN comments`;

        const result = await NeodeObject.cypher(cypherQuery);

        return result?.records?.map((record) => ({
          ...record.get("comments").properties,
          _id: record.get("comments").identity.low,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Comments, ${error}`);
        throw error;
      }
    },
    Posts: async (parent) => {
      try {
        const companyId = parent._id;

        if (!companyId) {
          throw new Error("CompanyID is null");
        }

        const cypherQuery = `
           MATCH (company:Company)-[:HAS_A_POST]->(posts:PositionPost)
           WHERE ID(company) = ${companyId}
           RETURN posts`;

        const result = await NeodeObject.cypher(cypherQuery);

        return result?.records?.map((record) => ({
          ...record.get("posts").properties,
          _id: record.get("posts").identity.low,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Posts, ${error}`);
        throw error;
      }
    },
    Tasks: async (parent) => {
      try {
        const companyId = parent._id;

        if (!companyId) {
          throw new Error("CompanyID is null");
        }

        const cypherQuery = `
           MATCH (tasks:Task)-[:IN_COMPANY]->(company:Company)
           WHERE ID(company) = ${companyId}
           RETURN tasks`;

        const result = await NeodeObject.cypher(cypherQuery);

        return result?.records?.map((record) => ({
          ...record.get("tasks").properties,
          Priority: record.get("tasks")?.properties?.Priority?.low,
          _id: record.get("tasks").identity.low,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Tasks, ${error}`);
        throw error;
      }
    },
    Project: async (parent) => {
      try {
        const companyId = parent._id;

        if (!companyId) {
          throw new Error("CompanyID is null");
        }

        const cypherQuery = `
        MATCH (c:Company) -[:TAKE_A_PROJECT] -> (p:Project)
        WHERE ID(c) = ${companyId}
        RETURN p`;

        const result = await NeodeObject.cypher(cypherQuery);

        return {
          ...result?.records[0].get("p").properties,
          _id: result?.records[0].get("p").identity.low,
        };
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Project, ${error}`);
        throw error;
      }
    },
  },
  Chat: {
    Messages: async (parent) => {
      try {
        const chatId = parent._id;
        const { page, limit } = parent;

        if (!chatId) {
          throw new Error("ChatID is null");
        }

        const cypherQuery = `
           MATCH (chat:Chat)-[:HAS_A]->(messages:Message)
           WHERE ID(chat) = $chatId
           RETURN messages
           SKIP ${page} * ${limit} LIMIT ${limit}`;

        const result = await NeodeObject.cypher(cypherQuery, { chatId });

        return result?.records?.map((record) => ({
          ...record.get("messages").properties,
          userId: record.get("messages")?.properties?.userId?.low,
          _id: record.get("messages").identity().low,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Messages, ${error}`);
        throw error;
      }
    },
  },
  ProjectNote: {
    Tasks: async (parent) => {
      try {
        const noteId = parent._id;

        if (!noteId) {
          throw new Error("NoteID is null");
        }

        const cypherQuery = `
           MATCH (projectNote:ProjectNote)-[:HAS_TASK]->(tasks:ProjectNoteTask)
           WHERE ID(projectNote) = $noteId
           RETURN tasks`;

        const result = await NeodeObject.cypher(cypherQuery, { noteId });

        return result?.records?.map((record) => ({
          ...record.get("tasks").properties,
          id: record.get("tasks").identity.low,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Tasks, ${error}`);
        throw error;
      }
    },
  },
  Task: {
    Steps: async (parent) => {
      try {
        const taskId = parent._id;

        if (!taskId) {
          throw new Error("TaskID is null");
        }

        const cypherQuery = `
           MATCH (task:Task)-[:HAS_A]->(taskSteps:TaskStep)
           WHERE ID(task) = ${taskId}
           RETURN taskSteps`;

        const result = await NeodeObject.cypher(cypherQuery);

        return result?.records?.map((record) => ({
          ...record.get("taskSteps").properties,
          Number: record.get("taskSteps")?.properties?.Number?.low,
          _id: record.get("taskSteps").identity.low,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Steps, ${error}`);
        throw error;
      }
    },
    CompanyName: async (parent) => {
      try {
        const taskId = parent._id;

        if (!taskId) {
          throw new Error("TaskID is null");
        }

        const cypherQuery = `
           MATCH (task:Task)-[:IN_COMPANY]->(company:Company)
           WHERE ID(task) = ${taskId}
           RETURN company`;

        const result = await NeodeObject.cypher(cypherQuery);

        return result?.records[0].get("company").properties?.CompanyName;
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => company, ${error}`);
        throw error;
      }
    },
    TeamName: async (parent) => {
      try {
        const taskId = parent._id;

        if (!taskId) {
          throw new Error("TaskID is null");
        }

        const cypherQuery = `
           MATCH (task:Task)-[:IN_TEAM]->(team:Team)
           WHERE ID(task) = ${taskId}
           RETURN team`;

        const result = await NeodeObject.cypher(cypherQuery);

        return result?.records[0].get("team").properties?.TeamName;
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => team, ${error}`);
        throw error;
      }
    },
  },
  Team: {
    Tasks: async (parent) => {
      try {
        const teamId = parent._id;
        if (!teamId) {
          throw new Error("TeamID is null");
        }

        const cypherQuery = `
           MATCH (team:Team)-[:HAS_A_TASK]->(tasks:Task)
           WHERE ID(team) = ${teamId}
           RETURN tasks`;

        const result = await NeodeObject.cypher(cypherQuery);

        return result?.records?.map((record) => ({
          ...record.get("tasks").properties,
          Priority: record.get("tasks")?.properties?.Priority?.low,
          _id: record.get("tasks").identity.low,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Tasks, ${error}`);
        throw error;
      }
    },
    Members: async (parent) => {
      try {
        const teamId = parent._id;

        if (!teamId) {
          throw new Error("TeamID is null");
        }

        const cypherQuery = `
           MATCH (users:User)-[:IN_TEAM]->(team:Team)
           WHERE ID(team) = ${teamId}
           RETURN users`;

        const result = await NeodeObject.cypher(cypherQuery);

        return result?.records?.map((record) => ({
          ...record.get("users").properties,
          _id: record.get("users").identity.low,
        }));
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Members, ${error}`);
        throw error;
      }
    },
  },
  PositionPost: {
    User: async (parent) => {
      try {
        const postId = parent._id;

        if (!postId) {
          throw new Error("PostID is null");
        }

        const cypherQuery = `
           MATCH (company:Company)-[:HAS_A_POST]->(post:PositionPost)
           MATCH (user:User)-[:ADMIN_OF]->(company)
           WHERE ID(post) = ${postId}
           RETURN user`;

        const result = await NeodeObject.cypher(cypherQuery);

        return {
          ...result?.records[0].get("user").properties,
          _id: result?.records[0].get("user").identity.low,
        };
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => User, ${error}`);
        throw error;
      }
    },
    Company: async (parent) => {
      try {
        const postId = parent._id;

        if (!postId) {
          throw new Error("PostID is null");
        }

        const cypherQuery = `
           MATCH (company:Company)-[:HAS_A_POST]->(post:PositionPost)
           WHERE ID(post) = ${postId}
           RETURN company`;

        const result = await NeodeObject.cypher(cypherQuery);

        return {
          ...result?.records[0].get("company").properties,
          _id: result?.records[0].get("company").identity.low,
        };
      } catch (error) {
        Logging.error(`${new Date()}, in resolvers.js => Company, ${error}`);
        throw error;
      }
    },
  },
};

module.exports = { resolvers };
