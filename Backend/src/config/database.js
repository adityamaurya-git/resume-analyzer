// const mongoose = require('mongoose');

// const connectDB = async () =>{
//     try{
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("Connect to DB");
//     }catch(err){
//         console.log(err);
//     }
// }


// module.exports = connectDB;



const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    };
}

const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const mongoUri = process.env.MONGO_URI;

        if (!mongoUri) {
            throw new Error('MONGO_URI is not configured');
        }

        cached.promise = mongoose.connect(mongoUri)
            .then((mongooseInstance) => mongooseInstance)
            .catch((error) => {
                cached.promise = null;
                throw error;
            });
    }

    cached.conn = await cached.promise;

    return cached.conn;
};

module.exports = connectDB;