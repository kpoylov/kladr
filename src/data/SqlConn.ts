const sql = require('mssql');

export class SqlConn {
    private connectionString : string = "connection string"
    
    //
    //return socr by level
    //
    private async getSocrBase(level: number) : Promise<Array<object>> {
        let socrBaseModel = [];
        try {
            await sql.connect(this.connectionString);
            const result = await sql.query`select * from SOCRBASE (NOLOCK) where LEVEL = ${level}`;

            result.recordset.map(value => {
                let scName = value.SCNAME.trim();
                socrBaseModel.push(scName);
            });
            return socrBaseModel;
        } catch (e) {
            console.log(e); 
            return [];
        }
    }

    //
    //return kladr by name
    //
    private async getKladrBase(name: string, socr: string = "", code: string = "", isCity: boolean = false) : Promise<Array<object>> {
        let kladr = [];
        try {
            let queryString : string;
            await sql.connect(this.connectionString);
            if(code === "") {
                queryString = "select * from KLADR (NOLOCK) where NAME LIKE '"+ name +"%' and SOCR= '"+ socr +"'";
            } else if(socr === "") {
                queryString = "select * from KLADR (NOLOCK) where NAME LIKE '%"+ name +"%' and CODE LIKE '"+ code +"%'";
            } else {
                queryString = "select * from KLADR (NOLOCK) where NAME LIKE '"+ name +"%' and SOCR= '"+ socr +"' and CODE LIKE '"+ code +"%'";
            }
            let result = await sql.query(queryString);
            result.recordset.map(value => {
                    let name = value.NAME.trim();
                    let socr = value.SOCR.trim();
                    let code = value.CODE.trim();
                    let index = value.INDEX.trim();
                    let gninmb = value.GNINMB.trim();
                    let uno = value.UNO.trim();
                    let ocatd = value.OCATD.trim();
                    let status = value.STATUS.trim();
    
                    kladr.push({
                        "name": name,
                        "socr": socr,
                        "code": code,
                        "index": index,
                        "gninmb": gninmb,
                        "uno": uno,
                        "ocatd": ocatd,
                        "status": status,
                    });
            });
            return kladr;
            
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    //
    // return street base
    //
    private async getStreetBase(code: string, query: string): Promise<Array<object>> { 
        let kladrStreet = [];
        try {
            await sql.connect(this.connectionString);
            let queryString = "select * from STREET (NOLOCK) where CODE LIKE '"+ code +"%' and NAME LIKE '%"+ query +"%'";
            let result = await sql.query(queryString);

            result.recordset.map(value => {
                let name = value.NAME.trim();
                let socr = value.SOCR.trim();
                let code = value.CODE.trim();
                let index = value.INDEX.trim();
                let gninmb = value.GNINMB.trim();
                let uno = value.UNO.trim();
                let ocatd = value.OCATD.trim();

                kladrStreet.push({
                    "name": name,
                    "socr": socr,
                    "code": code,
                    "index": index,
                    "gninmb": gninmb,
                    "uno": uno,
                    "ocatd": ocatd,
                });
            });
            return kladrStreet;
        } catch (e) {
            console.log(e);
            return [];
            
        }
    }

    //
    // return city for street
    //
    private async getcityForStreet(code: string) : Promise<Array<object>> {
        let streetCity = [];
        try {
            await sql.connect(this.connectionString);
            let queryString = "select * from KLADR (NOLOCK) where CODE LIKE '"+ code.slice(0, 12) +"%'";
            let result = await sql.query(queryString);
            result.recordset.map(value => {
                let name = value.NAME.trim();
                let socr = value.SOCR.trim();
                let code = value.CODE.trim();
                let index = value.INDEX.trim();
                let gninmb = value.GNINMB.trim();
                let uno = value.UNO.trim();
                let ocatd = value.OCATD.trim();

                streetCity.push({
                    "name": name,
                    "socr": socr,
                    "code": code,
                    "index": index,
                    "gninmb": gninmb,
                    "uno": uno,
                    "ocatd": ocatd,
                });
            });
            return streetCity;
        } catch (e) {
            console.log(e);
            return [];
            
        }
    }

    private async getBuildBase(streetCode: string): Promise<Array<object>> {
        try {
            let build = [];
            await sql.connect(this.connectionString);
            let queryString = "select * from DOMA (NOLOCK) where CODE LIKE '"+ streetCode.slice(0, 15) +"%'";
            let result = await sql.query(queryString);

            result.recordset.map(value => {
                let name = value.NAME.trim();
                let korp = value.KORP.trim();
                let socr = value.SOCR.trim();
                let code = value.CODE.trim();
                let index = value.INDEX.trim();
                let gninmb = value.GNINMB.trim();
                let uno = value.UNO.trim();
                let ocatd = value.OCATD.trim();

                build.push({
                    "name": name,
                    "korp": korp,
                    "socr": socr,
                    "code": code,
                    "index": index,
                    "gninmb": gninmb,
                    "uno": uno,
                    "ocatd": ocatd,
                });
            });
            return build;
        } catch (e) {
            console.log(e);
            return [];
        }
        return [];
    }

    // ----------------------------------------------------------------

    //
    //return region by query name
    //
    public async getRegionByKladr(name: string): Promise<Array<object>> {
        try {
            let scName = await this.getSocrBase(1);
            let retVal = [];
            await Promise.all(scName.map(async value => {
                    let kladr = await this.getKladrBase(name, value.toString());
                    if(kladr.length) {
                        kladr.map(value => {
                            retVal.push(value);
                        });
                    }
            }));
            return retVal.filter(x => x.socr !== "г" || x.name === "Москва" || x.name === "Санкт-Петербург" || x.name === "Севастополь");
        }catch (e) {
            console.log(e);
            return [];
            
        }
    }

    //
    //return district by query name and region code
    //
    public async getDistrictByKladr(name: string, regionId: string) : Promise<Array<object>>{
        try{
            let scName = await this.getSocrBase(2);
            let retVal = [];
            await Promise.all(scName.map(async value => {
                if(value.toString() !== "г" && value.toString() !== "п") {
                    let kladr = await this.getKladrBase(name, value.toString(), regionId.slice(0, 2));
                    if(kladr.length) {
                        kladr.map(value => {
                            retVal.push(value);
                        });
                    }
                }
            }));
            return retVal;
        }catch(e){
            console.log(e);
            return [];
        }
    }

    //
    // return city by query and code
    //
    public async getCityByKladr(query: string, regionId: string, parentId: string ) : Promise<Array<object>> {
        try {
            let scName = await this.getSocrBase(4);
            let retVal = [];
            let obj = [];
            let kladr = await this.getKladrBase(query, "", regionId.slice(0, 5), true);
            await Promise.all(kladr.map(async value => {
                retVal.push(value);
            }));
            scName.map(value => {
                retVal.map(item => {
                    if(item.socr === value) {
                        obj.push(item);
                    }
                });
            });
            return obj;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    //
    // return street by query and city code
    //
    public async getStreetByKladr(query: string, cityId: string) : Promise<Array<object>> {
        let obj = [];
        let kladrStreet = await this.getStreetBase(cityId.slice(0, 8), query);
        await Promise.all(kladrStreet.map(async value => {
            obj.push(value);
        }));

       let retVal = await Promise.all(obj.map(async value => {
            let cityForStreet = await this.getcityForStreet(value.code);
            value.parent = {...cityForStreet[0]};
            return value;
        }));
        return retVal.filter(x => Object.keys(x.parent).length);
    }

    //
    // return building by street
    //
    public async getBuildByKladr(query: string, streetId: string) : Promise<Array<object>> {
        let obj = [];
        let buildingString = [];
        let retVal = [];
        let build = await this.getBuildBase(streetId);
        await Promise.all(build.map(async value => {
            obj.push(value);
        }));

        obj.map(value => {
            if(value.name.includes(query)) {
                buildingString.push({"name": value.name, "korp": value.korp, "socr": value.socr.toLowerCase(), "index": value.index});
            }
        });

        buildingString.map(value => {
            let b = value.name.split(',').filter(x => x.includes(query));
            b.map(val => {
                retVal.push({"build": val, "korp": value.korp, "socr": value.socr, "index": value.index});
            });
        });
        return retVal;
    }
}