const data = () => {
  return {
    webserver: {
      host: "localhost",
      port: 3030,
    },
    dao: {
      source: "json",
      json: {
        file: "assets/data/member-data.json"
      },
      mongodb: {

      }
    }
  };
}
export default data;