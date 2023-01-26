const ajax = (url, data) =>{
    let ajax = $.ajax({         
        "method": "POST",
        "url": url,
        "data": data,
        processData: false,
        contentType: false
    })
    return ajax;
}


export const services ={
    ajax
}

