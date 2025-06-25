const getNewBranch = (req, res) => {
    res.send("This will load a form to add a branch");
};

const postNewBranch = (req, res) => {
    res.send("This is where my new branches will post to before redirecting to index");
};

const getBranches = (req, res) => {
    res.send("This will display a list of branches");
};

const getSingleBranch = (req, res) => {
    res.send("This will be a specific branch page like Hongdae Branch");
};

module.exports = { getNewBranch, postNewBranch, getBranches, getSingleBranch };