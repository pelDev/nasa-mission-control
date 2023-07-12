const request = require("supertest");

const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /launches", () => {
    it("should return with status code 200", async () => {
      await request(app)
        .get("/launches")
        .expect(200)
        .expect("Content-Type", /json/);
    });
  });

  describe("Test POST launches", () => {
    const completeLaunchData = {
      mission: "Earth Escape",
      rocket: "Rocket Sway",
      target: "Kepler-442 b",
      launchDate: "April 8, 2002",
    };

    const launchDataWithoutDate = {
      mission: "Earth Escape",
      rocket: "Rocket Sway",
      target: "Kepler-442 b",
    };

    it("should return with status code 201", async () => {
      const response = await request(app)
        .post("/launches")
        .send(completeLaunchData)
        .expect(201)
        .expect("Content-Type", /json/);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();

      expect(responseDate).toBe(requestDate);
      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    it("should catch missing required parameters", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDataWithoutDate)
        .expect(422)
        .expect("Content-Type", /json/);

      expect(response.body).toMatchObject({
        error: "Missing required launch property",
      });
    });

    it("should catch invalid dates", async () => {
      const response = await request(app)
        .post("/launches")
        .send({ ...completeLaunchData, launchDate: "xzt" })
        .expect(422)
        .expect("Content-Type", /json/);

      expect(response.body).toMatchObject({
        error: "Invalid launch date",
      });
    });
  });
});
