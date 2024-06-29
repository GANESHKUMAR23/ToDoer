

export const apiRequest = async (url = '',OptionObj = null,errMsg = null) => {
  
    try{


        const response = await fetch(url,OptionObj);

        if(!response.ok) throw Error("Please Reload the Page");


    }
    catch(err){
        errMsg = "Please Reload the Page";
        console.log("Error Occured "+err.stack());
    }
    finally{
        return errMsg;
    }

}
