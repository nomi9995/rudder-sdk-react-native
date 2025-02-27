import { Configuration } from "./NativeBridge";
import {
  DATA_PLANE_URL,
  CONTROL_PLANE_URL,
  FLUSH_QUEUE_SIZE,
  DB_COUNT_THRESHOLD,
  SLEEP_TIMEOUT,
  CONFIG_REFRESH_INTERVAL,
  AUTO_COLLECT_ADVERT_ID,
  TRACK_LIFECYCLE_EVENTS,
  RECORD_SCREEN_VIEWS,
  LOG_LEVEL,
} from "./Constants";

export const configure = async (
  writeKey: string,
  {
    dataPlaneUrl = DATA_PLANE_URL,
    controlPlaneUrl = CONTROL_PLANE_URL,
    flushQueueSize = FLUSH_QUEUE_SIZE,
    dbCountThreshold = DB_COUNT_THRESHOLD,
    sleepTimeOut = SLEEP_TIMEOUT,
    logLevel = LOG_LEVEL,
    configRefreshInterval = CONFIG_REFRESH_INTERVAL,
    autoCollectAdvertId = AUTO_COLLECT_ADVERT_ID,
    trackAppLifecycleEvents = TRACK_LIFECYCLE_EVENTS,
    recordScreenViews = RECORD_SCREEN_VIEWS,
    withFactories = [],
  }: Configuration
): Promise<Configuration> => {
  // setup device mode integrations
  let integrations = withFactories;
  if (integrations && integrations.length != 0) {
    // ask about await
    await Promise.all(
      integrations.map(async integration =>
        typeof integration === "function" ? integration() : null
      )
    );
  }

  const config = {
    writeKey,
    dataPlaneUrl,
    controlPlaneUrl,
    flushQueueSize,
    dbCountThreshold,
    sleepTimeOut,
    logLevel,
    configRefreshInterval,
    autoCollectAdvertId,
    trackAppLifecycleEvents,
    recordScreenViews,
  };

  return { ...config };
};
