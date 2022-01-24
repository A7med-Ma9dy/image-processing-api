import supertest from "supertest";
import app from "../index";

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe("EndPoint Test responses", (): void => {
  describe("endpoint: /", (): void => {
    it("gets /", async (): Promise<void> => {
      const response: supertest.Response = await request.get("/");

      expect(response.status).toBe(200);
    });
  });

  describe("/api/images", (): void => {
    it("gets /api/images?filename=fjord (valid args)", async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        "/api/images?filename=fjord"
      );

      expect(response.status).toBe(200);
    });

    it("gets /api/images?filename=fjord&width=199&height=199 (valid args)", async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        "/api/images?filename=fjord&width=199&height=199"
      );

      expect(response.status).toBe(200);
    });

    it("gets /api/images?filename=fjord&width=-200&height=200 (invalid args)", async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        "/api/images?filename=fjord&width=-200&height=200"
      );

      expect(response.status).toBe(200);
    });

    it("gets /api/images (no arguments)", async (): Promise<void> => {
      const response: supertest.Response = await request.get("/api/images");

      expect(response.status).toBe(200);
    });
  });

  describe("endpoint: /trivial", (): void => {
    it("Invalid Input 404", async (): Promise<void> => {
      const response: supertest.Response = await request.get("/foo");

      expect(response.status).toBe(404);
    });
  });
});
