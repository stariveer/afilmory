import os from 'node:os'

import { defineBuilderConfig } from '@afilmory/builder'


export default defineBuilderConfig(() => ({
  storage: {
    provider: 'local',
    basePath: '../images/public/photos',
    baseUrl: 'https://images.trainspott.in/photos',
    // baseUrl: '/photos',  // 修改为本地相对路径
    // baseUrl: '/photos',  // 修改为本地相对路径
  },
  system: {
    processing: {
      defaultConcurrency: 10,
      enableLivePhotoDetection: true,
      digestSuffixLength: 0,
    },
    observability: {
      showProgress: true,
      showDetailedStats: true,
      logging: {
        verbose: false,
        level: 'info',
        outputToFile: false,
      },
      performance: {
        worker: {
          workerCount: os.cpus().length,
          timeout: 30_000,
          useClusterMode: true,
          workerConcurrency: 1,
        },
      },
    },
  },
  // plugins: [thumbnailStoragePlugin()],
  plugins: [],
}))
