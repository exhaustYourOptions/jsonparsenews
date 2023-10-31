import Link from 'next/link'
import Layout from '../components/Layout'
import { useState, useEffect } from 'react'

const IndexPage = () => {
    const [calendarData, setCalendarData] = useState([])
    const [calendarDataString, setCalendarDataString] = useState("")
    const [dataToShow, setDataToShow] = useState([])
    const [filterImpact, setFilterImpact] = useState("All")
    const [filterCurrency, setFilterCurrency] = useState("All")
    const [currencies, setCurrencies] = useState([])
    const [impacts, setImpacts] = useState([])
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
    const [endDate, setEndDate] = useState(new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString().split('T')[0])

    async function fetchData() {
        let req = await fetch("api/fetchData", {
            method: "POST",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify({
                startDate,
                endDate
            })
        })
        let res = await req.json()
        setCalendarData(res)
        setCalendarDataString(JSON.stringify(res, null, 4))
    }

    const filter = () => {
        try {
            let filtered = []
            let items = JSON.parse(calendarDataString)
            if (filterImpact != "All") {
                filtered = items.filter((item: any) => item.impact == filterImpact)
            } else {
                filtered = items
            }
            if (filterCurrency != "All") {
                filtered = filtered.filter((item: any) => item.currency == filterCurrency)
            }
            setDataToShow(filtered)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        try {
            setCalendarData(JSON.parse(calendarDataString))
            filter()
        } catch (error) {
        }
    }, [calendarDataString])

    useEffect(() => {
        try {
            const _currencies = ["All"]
            const _impacts = ["All"]

            for (let i = 0; i < calendarData.length; i++) {
                const item = calendarData[i];
                if (_currencies.includes(item.currency) == false) {
                    _currencies.push(item.currency)
                } else {
                    console.log(item)
                }
                if (_impacts.includes(item.impact) == false) {
                    _impacts.push(item.impact)
                }
            }
            console.log("_currencies", _currencies)
            console.log("_impacts", _impacts)
            setCurrencies(_currencies)
            setImpacts(_impacts)

        } catch (error) {

        }

    }, [calendarData])

    useEffect(() => {

        filter()
    }, [filterImpact, filterCurrency])

    useEffect(() => {
        if (startDate && endDate)
            fetchData()
    }, [startDate, endDate])



    return (
        <div style={{ padding: 20 }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ marginLeft: 50 }}>Start date: </div>
                <input type='date' value={startDate}  onChange={(e) => {
                    setStartDate(e.target.value)
                }} />
                <div style={{ marginLeft: 50 }}>Start date: </div>
                <input type='date' value={endDate} onChange={(e) => {
                    setEndDate(e.target.value)
                }} />

            </div>
            <textarea style={{ width: "100%", resize: "none" }} rows={30}
                defaultValue={calendarDataString}
                onChange={(e) => {
                    console.log(e.target.value)
                    setCalendarDataString(e.target.value)
                }}
            >
            </textarea>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div>Impact: </div>
                <select style={{ fontSize: 24, marginLeft: 10 }} onChange={(e) => {
                    setFilterImpact(e.target.value)
                }} value={filterImpact}>
                    <optgroup label="Impact ">
                        {impacts.map((item, index) => {
                            return <option key={item} value={item}>{item}</option>

                        })}
                    </optgroup>
                </select>
                <div style={{ marginLeft: 50 }}>Currency: </div>
                <select style={{ fontSize: 24, marginLeft: 10 }} onChange={(e) => {
                    setFilterCurrency(e.target.value)
                }} value={filterCurrency}>
                    <optgroup label="Currency ">
                        {currencies.map((item, index) => {
                            return <option key={item} value={item}>{item}</option>

                        })}
                    </optgroup>
                </select>

            </div>
            <textarea disabled style={{ width: "100%", marginTop: 20, resize: "none" }} rows={50}
                value={dataToShow.map((item: any) => Date.parse(item.date)).join(", ")}>
                {/* value={calendarData.filter((item: any) => item.impact == "High").map((item: any) => Date.parse(item.date)).join(", ")}> */}
            </textarea>
        </div>
    )
}

export default IndexPage
