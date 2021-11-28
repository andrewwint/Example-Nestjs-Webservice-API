import { Injectable } from '@nestjs/common';

@Injectable()
export class AssetsService {
  //find dist/ -type f -print0 | sort -z | xargs -0 sha1sum | sha1sum
}
