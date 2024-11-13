import express from "express";
import cors from "cors";
import { connectDB } from "./lib/db";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());


// Routes
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import adminRoutes from "./routes/admin.route";
import songRoutes from "./routes/song.route";
import albumRoutes from "./routes/album.route";
import statsRoutes from "./routes/stats.route";

const contextPath = "/api/v1";

app.use(`${contextPath}/auth`, authRoutes);
app.use(`${contextPath}/users`, userRoutes);
app.use(`${contextPath}/admin`, adminRoutes);
app.use(`${contextPath}/songs`, songRoutes);
app.use(`${contextPath}/albums`, albumRoutes);
app.use(`${contextPath}/stats`, statsRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
