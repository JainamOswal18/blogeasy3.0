    import express from "express"
    import bodyParser from "body-parser"

    const app = express();
    const port = process.env.PORT || 3000;

    app.use(express.static("public"));
    app.use(bodyParser.urlencoded({ extended: true }));

    let blogs = [];

    app.get("/", (req, res) => {
        res.render("index.ejs");
    });

    app.get("/writeblog", (req, res) => {
        res.render("writeblog.ejs");
    });

    app.get("/viewblog", (req, res) => {
        res.render("viewblog.ejs", {
            blogs: blogs.length > 0 ? blogs : [] 
        });
    });

    app.get("/editblog/:index", (req, res) => {
        
        const blog = blogs[req.params.index];

        res.render("editblog.ejs", {
            blog,
            id: req.params.index
        });
    });


    app.post("/submit", (req, res) => {

        const blogTitle = req.body.blogTitle;
        const blogContent = req.body.blogContent;

        blogs.push({ title: blogTitle, content: blogContent });

        res.render("writeblog.ejs", {
            confirmation: true
        });
        
    });

    app.post("/update/:index", (req, res) => {
    
        const blogID = req.params.index;
        blogs[blogID].title = req.body["blogTitle"];
        blogs[blogID].content = req.body["blogContent"];
        

        res.redirect("/viewblog")
    });

    app.post("/delete/:index", (req, res) => {
        const blogIndex = req.params.index; 
        
        blogs.splice(blogIndex, 1);

        res.redirect("/viewblog");
    });

    app.listen(port, () => {
        console.log(`Server Listening On Port ${port}`);
    });