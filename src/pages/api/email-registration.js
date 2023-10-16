import fs from 'fs';
import path from 'path';

function buildpath(){
    return path.join( process.cwd(), 'data', 'data.json');

    // data\data.json
}

function extractData(filePath){
    const jsondata = fs.readFileSync(filePath);
    const data = JSON.parse(jsondata);
    return data;
}

export default function handler(req, res){
        const {method} = req;

        const filePath = buildpath();
        const { events_categories, allEvents} = extractData(filePath);

        if(!allEvents){
            return res.status(404).json({
                status: 404,
                message: 'Event data not found'
            })
        }
        if(method === 'POST'){
            const {email, eventId} = req.body;

            if( !email || !email.includes('@')){
                return res.status(409).json({message:'Email invalid'});
            }

            const newEvents = allEvents.map((ev)=>{
                if(ev.id === eventId){
                    if(ev.emails_registered.includes(email)){
                        res.status(409).json({message: 'Email Already Registered'});
                        return ev;
                    }
                    return {
                        ...ev,
                        emails_registered: [...ev.emails_registered, email]
                    }
                }
                return ev;
            })
            fs.writeFileSync(filePath, JSON.stringify({events_categories,allEvents:newEvents}))
            res.status(201).json({message: `Email added Succesfully with ${email} for event ${eventId}`})


        }
}