import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('audio')
export class AudioController {
  constructor(@InjectQueue('audio') private readonly audioQueue: Queue) {}

  @Post('transcode')
  async transcode() {
    const no_of_task = 10;
    let count = 0;

    while (count < no_of_task) {
      const abc = await this.audioQueue.add('transcode', { file: 'audio.mp3' });
      console.log('what is this job do', abc);
      count++;
    }
  }
}
