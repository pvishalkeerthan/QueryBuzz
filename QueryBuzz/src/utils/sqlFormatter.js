import { format } from "sql-formatter";

const sqlFormatter = (query) => {
    try{
        return format(query,{
            indent: '    ',
            language:'sql',
            uppercase:true,
        });
    }
    catch(error){
        console.error("Error formatting SQL:",error);
        return query;
    }
}

export default sqlFormatter;
