import express, { Application, json, Request } from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import { connectDB } from "./lib/db";
import { errorHandler } from "./handler/error.handler";

const app: Application = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(
  json({
    // to parse the body of the request
    verify: (req: Request, res, buf) => {
      req.rawBody = buf;
    },
  })
);

// Security middleware
app.use(cors());
app.use(clerkMiddleware()); // this will add auth info to the request object

// Routes
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
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

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
