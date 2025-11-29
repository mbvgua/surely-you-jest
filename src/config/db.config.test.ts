import { pool } from "../config/db.config";

describe("[database]", () => {
  it("should ensure successful database connection", async () => {
    // arrange
    const connection = await pool.getConnection();
    const rows: any = await connection.query(`SELECT 1+1 as results;`);

    // act
    console.log(rows);
    // assert
  });
});
