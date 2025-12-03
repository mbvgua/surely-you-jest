import { pool } from "../config/db.config";

describe("[database]", () => {
  //PERF: make this work, so I only define the connection once
  //beforeEach(async () => {
  //const connection = await pool.getConnection();
  //});
  //
  //afterAll(async () => {
  //connection.release();
  //});

  it("should ensure successful database connection", async () => {
    // arrange
    // act
    const connection = await pool.getConnection();
    const [rows]: any = await connection.query(`SELECT 1+1 as results;`);
    connection.release();

    // assert
    expect(rows[0]).toHaveProperty("results", 2);
    expect(rows[0]).toMatchObject({ results: 2 });
  });

  it("should ensure 'jest' db is created", async () => {
    // arrange
    // act
    const connection = await pool.getConnection();
    const [rows]: any = await connection.query("USE jest;");
    connection.release();

    // assert
    expect(rows).toHaveProperty("serverStatus");
    expect(rows.serverStatus).toEqual(16386);
    expect(rows).toHaveProperty("warningStatus");
    expect(rows.warningStatus).toEqual(0);
    expect(rows).toHaveProperty("stateChanges.schema");
    expect(rows.stateChanges.schema).toMatch("jest");
  });

  it("should ensure users table is present", async () => {
    const connection = await pool.getConnection();
    await connection.query("USE jest;");
    const [rows]: any = await connection.query("SHOW TABLES;");
    connection.release();

    expect(rows).toBeDefined();
    expect(rows).toEqual(expect.any(Array));
    expect(rows).toHaveLength(1);
    expect(rows[0]).toHaveProperty("Tables_in_jest");
    expect(rows[0]).toMatchObject({ Tables_in_jest: "users" });
  });
});
