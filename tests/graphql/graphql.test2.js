/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const assert = require("assert");
const request = require("supertest");
const { describe } = require("mocha");
const { app } = require("../../app");

let userId = 0;
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
  ImageUrl: "https://example.com/john-doe.jpg",
};

describe("Create User API Tests (create)", () => {
  it("Should create a new user with valid input data", (done) => {
    const mutation = `
    mutation{
      createNewUser(user: {
        Username: "${user.Username}",
        FirstName: "${user.FirstName}",
        LastName: "${user.LastName}",
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
        _id
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
          userId = data?.createNewUser?._id;
        }

        assert.notStrictEqual(data?.createNewUser, null || undefined);
        assert.notStrictEqual(data?.createNewUser?._id, null || undefined);
        assert.notStrictEqual(
          data?.createNewUser?.CreateDate,
          null || undefined
        );
        assert.strictEqual(data?.createNewUser?.Username, user.Username);
        assert.strictEqual(data?.createNewUser?.FirstName, user.FirstName);
        assert.strictEqual(data?.createNewUser?.LastName, user.LastName);
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
