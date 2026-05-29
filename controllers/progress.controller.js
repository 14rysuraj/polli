import Progress from "../models/progress.model.js";

export const getProgress = async (req, res) => {
    try {
        let progress = await Progress.findOne({ userId: req.user.id });

        if (!progress) {
            progress = await Progress.create({ userId: req.user.id });
        }

        return res.json({
            message: "progress fetched successfully",
            progress: {
                id: progress._id.toString(),
                userId: progress.userId.toString(),
                streak: progress.streak,
                hours: progress.hours,
                lessons: progress.lessons,
                accuracy: progress.accuracy,
                vocab: progress.vocab
            }
        });
    } catch (err) {
        console.log("db error ", err);
        return res.json({
            message: "database error"
        });
    }
};

export const updateProgress = async (req, res) => {
    const allowedFields = ["streak", "hours", "lessons", "accuracy", "vocab"];
    const updates = {};

    for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
            updates[field] = req.body[field];
        }
    }

    if (Object.keys(updates).length === 0) {
        return res.json({
            message: "at least one field is required"
        });
    }

    try {
        const progress = await Progress.findOneAndUpdate(
            { userId: req.user.id },
            { $set: updates, $setOnInsert: { userId: req.user.id } },
            { new: true, upsert: true, runValidators: true }
        );

        return res.json({
            message: "progress updated successfully",
            progress: {
                id: progress._id.toString(),
                userId: progress.userId.toString(),
                streak: progress.streak,
                hours: progress.hours,
                lessons: progress.lessons,
                accuracy: progress.accuracy,
                vocab: progress.vocab
            }
        });
    } catch (err) {
        console.log("db error ", err);
        return res.json({
            message: "database error"
        });
    }
};

