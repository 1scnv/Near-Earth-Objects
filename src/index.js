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
    renderNEOs(neos)
}



function renderNEOs(neos){
    neos.forEach( neo => {
        const isSentry = neo.isSentry ? "Perigo de colisão" : "Sem perigo de colisão"
        const text = `${neo.id} | ${neo.name} | ${neo.averageEstimatedDiameter} | ${isSentry}`
        console.log(text)
    })
}

loadNeos()