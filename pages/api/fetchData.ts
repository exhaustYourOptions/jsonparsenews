// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  let request = await fetch ("https://nfs.faireconomy.media/ff_calendar_thisweek.json")
  let result = await request.json()
  res.json(result)
}
