import Joi from "joi";
import express from "express";
const app = express();
app.use(express.json());

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" }
];

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
    if(!courses) {
        res.status(404).send("There are no courses in the db.");
        return;
    }
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) { 
        res.status(404).send("The course with the given ID was not found!");
        return;
    }
    res.send(course);
});

app.post("/api/courses", (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);
    if(result.error) {
        res.status(400).send(result.error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

const port = process.env.port || 80;
app.listen(port, () => console.log(`Listening on port ${port}...`));