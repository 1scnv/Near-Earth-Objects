import "core-js"

import { getNeos } from "./neo_services.js";
import Neo from "./neo.js";

async function loadNeos(){
    let neos = []
    let neosJSON = await getNeos()
    neosJSON.forEach(neo => {
        const minDiameter = neo["estimated_diameter"]["kilometers"]["estimated_diameter_min"]
        const maxDiameter = neo["estimated_diameter"]["kilometers"]["estimated_diameter_max"]
        const averageDiamenter = (minDiameter + maxDiameter)/2
        const newNeo = new Neo(neo["id"],neo["name"],averageDiamenter, neo["is_sentry_object"])
        neos.push(newNeo)
    })
    console.log(neos)
}

loadNeos()