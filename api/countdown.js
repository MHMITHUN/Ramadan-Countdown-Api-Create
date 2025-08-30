
export default function handler(request, response) {

    const ramadanStartDates = [
        "2026-02-18T00:00:00.000Z",
        "2027-02-08T00:00:00.000Z",
        "2028-01-28T00:00:00.000Z",
        "2029-01-16T00:00:00.000Z",
        "2030-01-06T00:00:00.000Z",
    ];

    const currentDate = new Date();

    const nextRamadanDateStr = ramadanStartDates.find(dateStr => new Date(dateStr) > currentDate);

    if (!nextRamadanDateStr) {
        return response.status(404).json({
            error: "No upcoming Ramadan date could be found. Please update the list. — Mahamudul Hasan"
        });
    }

    const ramadanStartDate = new Date(nextRamadanDateStr);

    const differenceInMs = ramadanStartDate.getTime() - currentDate.getTime();

    const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((differenceInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((differenceInMs % (1000 * 60)) / 1000);

    const apiResponse = {
        ramadanStartDate: ramadanStartDate.toISOString(),
        currentDate: currentDate.toISOString(),
        countdown: {
            days,
            hours,
            minutes,
            seconds,
        },
        repository: "https://github.com/MHMITHUN/Ramadan-Countdown-Api-Create",
    };

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.status(200).json(apiResponse);
}