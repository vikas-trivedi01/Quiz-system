
const asyncErrorHandler = request => {
    return (req, res, next) => {
        Promise.resolve(request(req, res, next)).
        catch(err => {
            console.log(`Found error: ${JSON.stringify(err)}`); 
            next(err);
        });     
    }
}

export { asyncErrorHandler }