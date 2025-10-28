import { v4  as uuid4 } from "uuid";
import supabase from "./supabase";
export const uploadImage = async (file, userId, bucket = "featured_image") => {

    try {
                // file extension
        const fileEx = file.name.split('.').pop().toLowerCase();

            //    create a unique file path  dffdj8jhdfj43894784p.jpeg

            const filename = `${uuid4()}.${fileEx}`

            const filePath = `${userId}/${filename}`
            
            // upload the file supabase

            const {data, error} = await supabase.storage
            .from(bucket)
            .upload(filePath, file, {
                contentType: file.type,
                cacheControl: "3600",
                upsert: true,
            })

            if(error)  throw error;
                
                    // get the public  url for the uploaded file
         const {data: urlData} = supabase.storage.from(bucket).getPublicUrl(filePath)

         return {
            path: filePath,
            url: urlData.publicUrl
         }
            

    } catch (error) {
        console.error("error uploading error", error)
        throw error
    }

}