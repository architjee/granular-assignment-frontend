function ConvertPlaceObject(new_location_object) {
    try {
        let createNewPolygon = []
    let bbox = new_location_object["boundingbox"]
    createNewPolygon = [[bbox[0], bbox[2]], [bbox[1], bbox[2]], [bbox[1], bbox[3]], [bbox[0], bbox[3]]]
    return {
        "polygon": createNewPolygon,
        "purpleOptions": { color: "purple" },
        "center": [parseFloat(new_location_object["lat"]), parseFloat(new_location_object["lon"])],
        "placeid": new_location_object["place_id"]
    };
    } catch (error) {
        let locationObject= {
            "polygon": [
              [
                "30.7811345",
                "-83.8026067"
              ],
              [
                "30.802999",
                "-83.8026067"
              ],
              [
                "30.802999",
                "-83.7774578"
              ],
              [
                "30.7811345",
                "-83.7774578"
              ]
            ],
            "purpleOptions": {
              "color": "purple"
            },
            "center": [
              30.7918613,
              -83.7898868
            ],
            "placeid": 297593859
          }
          return locationObject
    }
  
}

export {ConvertPlaceObject}