export function isGeoJSONFile(file) {
    // Check file extension
    const allowedExtensions = ['.geojson', '.json'];
    const fileExtension = getFileExtension(file.name);
  
    if (!allowedExtensions.includes(fileExtension)) {
      return false;
    }
  
    // Read and parse the file content
    const reader = new FileReader();
  
    reader.onload = function(event) {
      try {
        const content = event.target.result;
        const parsedJSON = JSON.parse(content);
  
        // Check if it's a valid GeoJSON object
        if (parsedJSON.type === 'FeatureCollection' || parsedJSON.type === 'Feature') {
          return true;
        } else {
          // Uploaded JSON is not a valid GeoJSON.
          return false;
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return false;
      }
    };
  
    reader.readAsText(file);
  }
  
  function getFileExtension(filename) {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
  }