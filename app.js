import Joi from "joi";
import express from "express";
const app = express();
app.use(express.json());

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" }
];
let size = 3;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
    if(!courses) return res.status(404).send("There are no courses in the db.");
    
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the given ID was not found!");
   
    res.send(course);
});

app.post("/api/courses", (req, res) => {
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: ++size,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the given ID was not found!");

    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});

const validateCourse = (course) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
};

app.delete("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the given ID was not found!");

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});



const port = process.env.port || 80;
app.listen(port, () => console.log(`Listening on port ${port}...`));