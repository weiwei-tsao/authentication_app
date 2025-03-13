import app from './app';
import connectDB from './config/db';
import config from './config';

const PORT: number = parseInt(config.port, 10);

async function startServer(): Promise<void> {
  try {
    // Connect to MongoDB first
    await connectDB();

    // Then start the server
    app.listen(PORT, () => {
      console.log(`App Listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}

startServer();
