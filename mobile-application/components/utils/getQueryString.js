export default function getQueryString(params){
    const queries = params;
    for (var key in queries) {
      if (!queries[key] && queries[key] !== 0) {
        delete queries[key];
      }
    }
    return Object.keys(queries)
      .reduce((result, key) => {
        return [
          ...result,
          `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`,
        ];
      }, [])
      .join("&");
  };