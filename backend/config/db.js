import mongoose from 'mongoose';

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB ansluten');
  } catch (error) {
    console.error('❌ MongoDB-anslutning misslyckades', error);
    process.exit(1);
  }
};

export default connectDB;