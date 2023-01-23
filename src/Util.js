function ConvertPlaceObject(new_location_object) {
    let createNewPolygon = []
    let bbox = new_location_object["boundingbox"]
    createNewPolygon = [[bbox[0], bbox[2]], [bbox[1], bbox[2]], [bbox[1], bbox[3]], [bbox[0], bbox[3]]]
    return {
        "polygon": createNewPolygon,
        "purpleOptions": { color: "purple" },
        "center": [parseFloat(new_location_object["lat"]), parseFloat(new_location_object["lon"])],
        "placeid": new_location_object["place_id"]
    };
}

export {ConvertPlaceObject}