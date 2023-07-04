export const toNormalizeDate = __d__ =>{
    const date = new Date(__d__)
    return date.toLocaleDateString()
}

export const imageResize =(originalUrl, width, height)=>{
    const portions = originalUrl.split('/upload/');
  
    if (portions.length === 2) {
      return `${portions[0]}/upload/w_${width},h_${height},c_thumb,g_face/${portions[1]}`;
    }
    
    return originalUrl;
}  