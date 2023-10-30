import Link from 'next/link'
import Layout from '../components/Layout'
import { useState, useEffect } from 'react'

const IndexPage = () => {
    const [calendarData, setCalendarData] = useState([])
    const [calendarDataString, setCalendarDataString] = useState("")
    async function fetchData() {
        let req = await fetch("api/fetchData")
        let res = await req.json()
        // setCalendarData(res)
        // setCalendarDataString(JSON.stringify(res, null, 4))
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div style={{ padding: 20 }}>
            <textarea style={{ width: "100%", resize: "none" }} rows={40}
                value={calendarDataString}>
            </textarea>
            <textarea disabled style={{ width:"100%", marginTop: 20, resize: "none" }} rows={40}
                value={calendarData.map((item: any) => Date.parse(item.date)).join(", ")}>
                {/* value={calendarData.filter((item: any) => item.impact == "High").map((item: any) => Date.parse(item.date)).join(", ")}> */}
            </textarea>
        </div>
    )
}

export default IndexPage
