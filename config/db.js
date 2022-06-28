require("dotenv").config()
const knex = require("knex")({
    client:"mysql",
    connection:{
        host:process.env.host,
        user:process.env.user,
        password:process.env.password,
        database:process.env.database
    }
})

knex.schema.createTable("Users",(t)=>{
    t.uuid("userId").primary().defaultTo(knex.raw("(UUID())"));
    t.string("name");
    t.string("email");
    t.string("password")
    t.date("dob");
    t.boolean("isAdmin");
    t.timestamp("createdAt").defaultTo(knex.fn.now());

}).then(()=>{
    console.log("table created....");
}).catch(err=>{
    console.log(err.message);
})

knex.schema.createTable("forgotPasswordRequest",(t)=>{
    t.uuid("requestId").primary().defaultTo(knex.raw("(UUID())"));
    t.string("otp");
    t.timestamp("createdAt")
}).then(()=>{
    console.log("forgotPasswordRequest created....");
}).catch((err)=>{
    console.log(err.message);
})


knex.schema.createTable("UserDocument",(t)=>{
    t.string("documentId")
    t.string("name")
    t.uuid("userId")
}).then(()=>{
    console.log("UserDocument created....");
}).catch((err)=>{
    console.log(err.message);
})

module.exports = knex