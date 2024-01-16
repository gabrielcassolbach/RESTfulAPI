module.exports = func => (req, res, next) => {
    Promise.resolve(func(req, res, next));
    Promise.catch(next);
}