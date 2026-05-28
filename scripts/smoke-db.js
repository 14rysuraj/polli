import connectDB from "../config/db.config.js";
import User from "../models/user.model.js";

const run = async () => {
    try {
        await connectDB();

        const email = `smoke_${Date.now()}@example.com`;
        const user = await User.create({
            name: "Smoke",
            email,
            password: "hashed-placeholder",
        });

        const found = await User.findOne({ email });

        await User.deleteOne({ _id: user._id });

        if (!found) {
            throw new Error("Smoke test failed to find created user");
        }

        console.log("smoke-db: ok");
        process.exit(0);
    } catch (err) {
        console.log("smoke-db: failed", err);
        process.exit(1);
    }
};

run();

