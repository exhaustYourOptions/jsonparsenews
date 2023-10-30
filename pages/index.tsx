import Link from 'next/link'
import Layout from '../components/Layout'
import { useState, useEffect } from 'react'

const IndexPage = () => {
    const [calendarData, setCalendarData] = useState([])
    const [calendarDataString, setCalendarDataString] = useState("")
    const [dataToShow, setDataToShow] = useState([])
    const [filterImpact, setFilterImpact] = useState("All")
    async function fetchData() {
        let req = await fetch("api/fetchData")
        let res = await req.json()
        // setCalendarData(res)
        // setCalendarDataString(JSON.stringify(res, null, 4))
    }

    const filter = ()=>{
        console.log("filter", filterImpact)
        try {
            if(filterImpact == "All"){
                setDataToShow(JSON.parse(calendarDataString).map((item: any) => Date.parse(item.date)).join(", "))
            }else{
                setDataToShow(JSON.parse(calendarDataString).filter((item: any) => item.impact == filterImpact).map((item: any) => Date.parse(item.date)).join(", "))
            }
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
        fetchData()
    }, [])

    useEffect(()=>{
        
        filter()
    }, [filterImpact])
    const handleFilterChange = (e)=>{
        setFilterImpact(e.target.value)
    };

    return (
        <div style={{ padding: 20 }}>

            <textarea style={{ width: "100%", resize: "none" }} rows={40}
                defaultValue={calendarDataString}
                onChange={(e) => {
                    console.log(e.target.value)
                    setCalendarDataString(e.target.value)
                }}
            >
            </textarea>
            <select style={{fontSize:24}} onChange={handleFilterChange} value={filterImpact}>
            <optgroup label="Impact ">
              <option value="All">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </optgroup>
          </select>
            <textarea disabled style={{ width: "100%", marginTop: 20, resize: "none" }} rows={40}
                value={dataToShow}>
                {/* value={calendarData.filter((item: any) => item.impact == "High").map((item: any) => Date.parse(item.date)).join(", ")}> */}
            </textarea>
        </div>
    )
}

export default IndexPage
