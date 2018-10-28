class Helper {

   // returns the base url part
    static baseURL(){
        return "https://api.foursquare.com/v2";        
    }
  //authentication
  static auth(){
      const keys = {
        client_id:'UTVI3JAQJS1SMDAHARPWEFPQO3O33HX2KCMCHIT1JP4UYQQV',             
        client_secret:'ZQBMSWR03L4CVU4GD3PEXV4CA5MEP1SIHIOTUW0UUVA2BHYL',
        v:'20181025'
      };      
      return Object.keys(keys)
      .map(key => `${key}=${keys[key]}`)
      .join("&");      
  }
   //URL Builder
  static urlBuilder(urlParams){
      if(!urlParams){
          return "";
      }
      return Object.keys(urlParams)
      .map(key => `${key}=${urlParams[key]}`)
      .join("&");       
  }

  static headers(){
      return {
          Accept : "application/json"
             };
  }

static simpleFetch(endPoint,method,urlParams){
    let requestData = {
        method,
        headers: Helper.headers()
        };
        return fetch(
            `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(urlParams)}`,
               requestData 
        ).then(res => res.json());
   }
 }
export default class SquareAPI {
    static search(urlParams) {
        return Helper.simpleFetch("/venues/search", "GET",urlParams);
    }
    static venuedetails(VENUE_ID){
        return Helper.simpleFetch(`/venues/${VENUE_ID}`,"GET");
    }

    static getVenuePhotos(VENUE_ID){
        return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
    }

}