const MONTHS =
    [`января`,`февраля`,`марта`,`апреля`,
     `мая`,`июня`,`июля`,`августа`,
     `сентября`,`октября`,`ноября`,`декабря`];

function getDateInterval(inpDate)
{
    let curDate = new Date();

    if (inpDate.getFullYear() < curDate.getFullYear())
        return `Not this year`;
    if (inpDate.getMonth() < curDate.getMonth()
        || inpDate.getDate() < curDate.getDate() - 1)
        return `Earlier than yesterday`;
    if (inpDate.getDate() === curDate.getDate() - 1)
        return `Yesterday`;
    else
        return `Today`;
}

function getTime(date)
{
    let resultTime = `${date.getHours()}`;
    if (date.getHours() < 10)
        resultTime = `0` + resultTime;
    if (date.getMinutes() < 10)
        resultTime += `:0${date.getMinutes()}`;
    else
        resultTime += `:${date.getMinutes()}`;
    return resultTime;
}

function formatDate(date)
{
    if (typeof date !== `string`)
        throw new Error(`The date must be passed as a string!`);
    let inpDate = new Date(date);
    if (inpDate > new Date())
        throw new Error(`Date can not be more than current!`);

    switch (getDateInterval(inpDate))
    {
        case `Not this year`:
            return `${inpDate.getDate()} ${MONTHS[inpDate.getMonth()]} `
                + `${inpDate.getFullYear()} года в ${getTime(inpDate)}`;
        case `Earlier than yesterday`:
            return `${inpDate.getDate()} ${MONTHS[inpDate.getMonth()]} в ${getTime(inpDate)}`;
        case `Yesterday`:
            return `вчера в ${getTime(inpDate)}`;
        default:
            return `${getTime(inpDate)}`;
    }
}

module.exports = formatDate;
