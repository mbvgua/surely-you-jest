import app from "./app";
import supertest from "supertest";

const request = supertest(app);

describe("[app setup]", () => {
  test("the server is running", async () => {
    expect(request).toBeDefined();
    expect(request).toBeTruthy();
  });
});
