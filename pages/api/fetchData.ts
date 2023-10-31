// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { writeFileSync } from "fs"

export default async function handler(req, res) {
    // let request = await fetch("https://nfs.faireconomy.media/ff_calendar_thisweek.json")
    // let result = await request.json()


    let url = "https://www.forexfactory.com/calendar/apply-settings/1?navigation=0"
    let headers: any = {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7,ar-EG;q=0.6,ar;q=0.5",
        "Content-Type": "application/json"
    }
    let request1 = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ "default_view": "this_week", "impacts": [3, 2, 1, 0], "event_types": [1, 2, 3, 4, 5, 7, 8, 9, 10, 11], "currencies": [1, 2, 3, 4, 5, 6, 7, 8, 9], "begin_date": req.body.startDate, "end_date": req.body.endDate })
    })

    /**
        {
        "title": "German Prelim CPI m/m",
        "country": "EUR",
        "date": "2023-10-30T02:29:00-04:00",
        "impact": "High",
        "forecast": "0.2%",
        "previous": "0.3%"
    },
     */
    let response1 = await request1.json()
    let events = []
    response1.days.map(item => {
        if (item.events) {
            for (const id in item.events) {
                if (Object.prototype.hasOwnProperty.call(item.events, id)) {
                    const event = item.events[id];
                    events.push({
                        title: event.name,
                        currency: event.currency,
                        date: new Date(event.dateline * 1000).toUTCString(),
                        impact: (event.impactTitle as string).split(" ")[0],
                        forecast: event.forecast,
                        previous: event.previous
                    })
                }
            }
        }
    })

    // writeFileSync("./result.json", JSON.stringify(events, null, 4))
    // console.log("events", events)


    res.json(events)
}
