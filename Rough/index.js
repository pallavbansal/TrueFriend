const handleStartRecording2 = async () => {
  try {
    const granted = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
    const readGranted = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    const writeGranted = await check(
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    );

    if (
      granted === RESULTS.GRANTED &&
      readGranted === RESULTS.GRANTED &&
      writeGranted === RESULTS.GRANTED
    ) {
      console.log('All permissions granted');
      await startBackgroundTask();
      setIsBackgroundServiceRunning(true);
    } else {
      console.log('One or more permissions denied');
      const requestedAudioPermission = await request(
        PERMISSIONS.ANDROID.RECORD_AUDIO,
      );
      const requestedReadPermission = await request(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      const requestedWritePermission = await request(
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      );

      if (
        requestedAudioPermission === RESULTS.GRANTED &&
        requestedReadPermission === RESULTS.GRANTED &&
        requestedWritePermission === RESULTS.GRANTED
      ) {
        console.log('All permissions granted after request');
        await startBackgroundTask();
        setIsBackgroundServiceRunning(true);
      } else if (
        requestedAudioPermission === RESULTS.DENIED ||
        requestedReadPermission === RESULTS.DENIED ||
        requestedWritePermission === RESULTS.DENIED
      ) {
        console.log('One or more permissions denied after request');
      } else if (
        requestedAudioPermission === RESULTS.BLOCKED ||
        requestedReadPermission === RESULTS.BLOCKED ||
        requestedWritePermission === RESULTS.BLOCKED
      ) {
        console.log('One or more permissions blocked, opening settings');
        openSettings().catch(() => console.warn('Cannot open settings'));
      }
    }
  } catch (error) {
    console.error('Error checking permissions:', error);
  }
};
