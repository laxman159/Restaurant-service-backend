import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

const CLOUD_NAME = 'dp28jujzw';

@Controller('uploads')
export class UploadsController {
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    try {
      console.log(file);
      v2.config({
        cloud_name: CLOUD_NAME,
        api_key: '228499246712586',
        api_secret: 'REW6DJACfSz9LiNbZ006IQrnk1c',
      });

      // const streamFile = toStream(file.buffer);
      const fileName = `${Date.now()}`;
      const upload = await v2.uploader.upload_stream(
        { public_id: fileName },
        (err, result) => {
          console.log(result.url);
        },
      );
      toStream(file.buffer).pipe(upload);
      const fileurl = `http://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1629348810/${fileName}.webp`;
      return {
        url: fileurl,
      };
    } catch (error) {
      return null;
    }
  }
}
