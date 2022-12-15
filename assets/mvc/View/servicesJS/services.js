const ajax = (url, data) =>{
    let ajax = $.ajax({         
        "method": "POST",
        "url": url,
        "data": data
    })
    return ajax;
}


export const productosServices ={
    ajax
}

