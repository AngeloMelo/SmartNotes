module.exports = (dateFromQueryString) =>
{
    let date = new Date(dateFromQueryString);
    let strdt = date.toISOString();

    return strdt;
}