import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueProgress,
  OnQueueWaiting,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('audio')
export class AudioProcessor {
  private readonly logger = new Logger(AudioProcessor.name);

  @Process('transcode')
  handleabc(job: Job) {
    this.logger.debug('Start transcoding...');
    this.logger.debug(job.data);
    this.logger.debug('Transcoding completed');
  }

  @OnQueueActive()
  async onActive(job: Job) {
    const jobs = await job;
    this.logger.debug(
      `Active job ${jobs.id} of type ${jobs.name} with data ${jobs.data}...`,
    );
  }

  @OnQueueWaiting()
  async onWaiting(job: Job) {
    const jobs = await job;
    this.logger.debug(
      `Waiting job ${jobs.id} of type ${jobs.name} with data ${jobs.data}...`,
    );
  }

  @OnQueueProgress()
  async onProgress(job: Job) {
    const jobs = await job;
    this.logger.debug(
      `Processing job ${jobs.id} of type ${jobs.name} with data ${jobs.data}...`,
    );
  }

  @OnQueueCompleted()
  async onCompleted(job: Job) {
    const abc = await job.remove();
    this.logger.debug('completed', abc);
  }
}
