import express from "express";

const app = express();

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" }
];

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
    if(!courses) 
        res.status(404).send("There are no courses in the db.");
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send("The course with the given ID was not found!");
    res.send(course);
});



const port = process.env.port || 80;
app.listen(port, () => console.log(`Listening on port ${port}...`));