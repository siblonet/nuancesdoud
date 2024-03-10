function filterArrayByDateRange(dataArray, startDate, endDate) {
    // Convert start and end dates to Date objects
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);

    // Use the filter method to get items within the date range
    const filteredArray = dataArray.filter(item => {
        const itemDate = item.created.split("T")[0];
        const toFilerTime = new Date(itemDate);
        return toFilerTime >= startDateTime && toFilerTime <= endDateTime;
    });

    return filteredArray;
}