import mongoose from 'mongoose'

const ProgressSchema = new mongoose.Schema(
    {
       userId:{
           type: mongoose.Schema.Types.ObjectId,
           ref: 'User',
           required: true,
       },
        streak:{
           type: Number,
            required: true,
            default: 0
        },
        hours:{
           type: Number,
            required: true,
            default: 0
        },
        lessons:{
           type: Number,
            required: true,
            default: 0
        },
        accuracy: {
                type: Number,
                required: true,
                default: 0,
                min: 0,
                max: 1
            },

        vocab:{
           type: Number,
            required: true,
            default: 0
        }

    },
    { timestamps: true }
)

const Progress = mongoose.model('Progress', ProgressSchema)

export default Progress;
