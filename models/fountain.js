const axios = require("axios");
const db = require("../modules/db");
const cache = require("./cache");

module.exports = class {
    static async getClosest(p) {

        this.populate();
        const dbConn = await db.getConnection();

        const rows = await dbConn.query("SELECT bn, feature_id, `long`, lat, ST_Distance_Sphere(g,PointFromText(?)) as dist FROM fountain ORDER BY dist ASC LIMIT 10;", [`POINT(${p.long} ${p.lat})`]);


        dbConn.end();
        return { fountains: rows };
    }

    static async populate() {
        let url = "https://services.arcgis.com/G6F8XLCl5KtAlZ2G/arcgis/rest/services/Public_Drinking_Water_Fountains/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";

        if (!await cache.isCached(url)) {
            let data = await cache.fetchUrl(url);
            let features = data.features;
            let dbConn = await db.getConnection();
            for (let i = 0; i < features.length; i++) {
                let feature = features[i];
                let coords = feature.geometry.coordinates;
                let bn = feature.properties.BN;
                let g = `POINT(${coords[0]} ${coords[1]})`; // POINT(-75.8862609863281 45.2954444885254)
                let fid = feature.properties.FID;
                // replace INTO fountain (bn, `long`, lat, g) VALUES ('Ottawa Public Library Hazeldean Branch',-75.8862609863281,45.2954444885254,PointFromText('POINT(-75.8862609863281 45.2954444885254)'));
                let row = await dbConn.query("replace INTO fountain (bn, feature_id, `long`, lat, g) VALUES (?,?, ?,?,PointFromText(?));", [bn, fid, coords[0], coords[1], g]);
            }
            dbConn.end();

        }
    }
};


