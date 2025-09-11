import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'


cloudinary.config({
    cloud_name: 'dymnrefpr',
    api_key: '214554444282119',
    api_secret: 'nt7kZ5Bxs4juDmI9iIpgAMUG820'
});

export const imageHostToCloudinary = (imageName: string, imagePath: string) => {

    return new Promise((resole, reject) => {
        cloudinary.uploader.upload(
            imagePath,
            { public_id: imageName },
            (error, result: any) => {
                if (error) {
                    reject(error);
                }
                resole(result)

                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    } else {
                        console.log('File deleted successfully');
                    }
                });
            }
        )
    })



    //approch 2
    // const uploadResult = await cloudinary.uploader.upload(
    //     'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
    //     { public_id: 'shoes' }
    // )
    // .catch((error) => { console.log(error); });
    // console.log(uploadResult);
}