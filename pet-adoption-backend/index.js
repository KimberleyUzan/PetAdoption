const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const port = process.env.PORT || 5002;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const uri = "mongodb+srv://petDB:I6GUYfHoN5F95Zdv@cluster0.p7getb8.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    const signUpUserCollection = client
      .db("petAdoption")
      .collection("signupUser");
    const petsCollection = client.db("petAdoption").collection("pet");
    const savedPetsCollection = client
      .db("petAdoption")
      .collection("savedPets");

    // Signup user
    app.post("/signup", async (req, res) => {
      const newUserInfo = req.body;
      const isNewUser = {
        email: req.body.email,
      };
      const newUserEmail = await signUpUserCollection.findOne(isNewUser);
      if (!newUserEmail) {
        bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
          if (err) {
            throw new Error("Error while hashing the password");
          }
          newUserInfo.password = hash;

          const allNewUsers = await signUpUserCollection.insertOne(newUserInfo);
          res.send(allNewUsers);
        });
      } else {
        res.status(404).send({ message: "User already exits" });
      }
    });
    // Login User
    app.post("/login", async (req, res) => {
      const login = {
        email: req.body.email,
      };
      const findUser = await signUpUserCollection.findOne(login);
      if (findUser) {
        const passwordIsCorrect = await bcrypt.compare(
          req.body.password,
          findUser?.password
        );

        if (passwordIsCorrect == true) {
          res.send(findUser);
        }
      }
      console.log("err");
    });
    app.get("/email", async (req, res) => {
      const email = req.query.email;
      const query = { email };
      const findUser = await signUpUserCollection.findOne(query);
      if (findUser) {
        res.send(findUser);
      }
      console.log("err");
    });
    // Get user all
    app.get("/allUsers", async (req, res) => {
      const query = {};
      const cursor = await signUpUserCollection.find(query).toArray();

      res.send(cursor);
    });
    // Get a single user
    app.get("/user", async (req, res) => {
      const findEmail = req.query.email;
      const filter = {
        email: findEmail,
      };
      const findSingleUser = await signUpUserCollection.findOne(filter);
      res.send(findSingleUser);
    });
    // Get All pets
    app.get("/pets", async (req, res) => {
      const query = {};
      const cursor = await petsCollection.find(query).sort({ _id: -1 });
      const allPets = await cursor.toArray();
      res.send(allPets);
    });
    // get pets by id
    app.get("/pets/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };
      const cursor = await petsCollection.find(query).toArray();
      res.send(cursor);
    });


    // pet saved
    app.post("/save/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = {
        _id: new ObjectId(id),
      };
      const cursor = await petsCollection.findOne(query);
      cursor.savedByEmail = req.body.parseGetItem

      const savedPet = await savedPetsCollection.insertOne(cursor);
      res.send(savedPet);
    });
    //Delete Item 
    app.delete('/save/:id', async (req, res) => {
      const id = req.params.id
      const query = {
        _id: new ObjectId(id)
      }
      const cursor = await savedPetsCollection.findOne(query)
      const deleteOne = await savedPetsCollection.deleteOne(cursor)
      res.send(deleteOne)
    })
    //get item 
    app.get('/save/:id', async (req, res) => {
      const id = req.params.id
      const query = {
        _id: new ObjectId(id)
      }
      const cursor = await savedPetsCollection.findOne(query)
      if (cursor) {
        return res.send(true)
      }
      return res.send(false)
    })
    // Saved item get
    app.get('/save', async (req, res) => {
      const email = req.query.email
      const query = {
        savedByEmail: email
      }
      const cursor = await savedPetsCollection.find(query).toArray()

      res.send(cursor)
    })

    // Updated pet by id
    app.put("/pet/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const value = req.body;
      const updateDocs = {
        $set: {
          value,
        },
      };
      const updatePets = await petsCollection.updateOne(query, updateDocs);
      res.send(updatePets);
    });
    // Update user profile
    app.put("/user", async (req, res) => {
      const email = req.query.email;
      const query = { email };
      const userFind = await signUpUserCollection.findOne(query);
      if (userFind) {
        const options = { upsert: true };
        const updateDocs = {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            title: req.body.title,
            phone: req.body.phone,
            address: req.body.address,
            nationality: req.body.nationality,
            bio: req.body.bio,
          },
        };
        const updateUsers = await signUpUserCollection.updateOne(
          query,
          updateDocs,
          options
        );
        res.send(updateUsers);
      }
    });

    app.post("/pet", async (req, res) => {
      const pet = req.body;
      const newPets = await petsCollection.insertOne(pet);
      res.send(newPets);
    });



    // Delete pets
    app.delete("/pet/:id/save", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: ObjectId(id),
      };
      const deletePets = await savedPetsCollection.deleteOne(query);
      res.send(deletePets);
    });
    // Search pets
    app.get("/search", async (req, res) => {
      if (req.query.hasOwnProperty('basic')) {
        const searchText = req.query.basic
        const query = { type: searchText }
        const petSearch = await petsCollection.find(query).toArray()
        return res.send(petSearch)
      }
      if (req.query.hasOwnProperty('advanced')) {
        const searchText = req.query.advanced
        const query = {
          $text: {
            $search: searchText
          }
        }
        const petSearch = await petsCollection.find({
          "$or": [
            { "name": { $regex: searchText } },
            { "height": { $regex: searchText } },
            { "weight": { $regex: searchText } },
            { "type": { $regex: searchText } },
            { "adoptionStatus": { $regex: searchText } }
          ]
        }).toArray()
        return res.send(petSearch)
      }
    })
    // User pets
    app.get("/pet/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: ObjectId(id),
      };
      const getPets = await savedPetsCollection.find(query).toArray();
      res.send(getPets);
    });

    app.get("/", (req, res) => {
      res.send("Your website is running in web");
    });
  } finally {
  }
}
run().catch((err) => console.log(err));

app.listen(port, () => {
  console.log("Your api is running", port);
});
