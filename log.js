const logStyles = {
  info: 'color: white; background: #007BFF; padding: 2px 4px; border-radius: 3px;', // 蓝色背景
  error: 'color: white; background: #FF4C4C; padding: 2px 4px; border-radius: 3px;', // 红色背景
  warning: 'color: black; background: #FFC107; padding: 2px 4px; border-radius: 3px;', // 黄色背景
  debug: 'color: white; background: #28A745; padding: 2px 4px; border-radius: 3px;', // 绿色背景
  message: 'color: #444; background: #F4F4F4; padding: 2px 4px; border-radius: 3px;', // 灰色背景
  trace: 'color: #555; font-style: italic;', // 调试追踪信息
};

function getCallerInfo() {
  try {
    throw new Error();
  } catch (err) {
    if (err.stack) {
      const stackLines = err.stack.split('\n');
      const callerLine = stackLines[3]; // 获取调用 log 的那一行

      const match = callerLine.match(/at\s+(.*)\s+\((.*):(\d+):(\d+)\)/) ||
        callerLine.match(/at\s+(.*):(\d+):(\d+)/);

      if (match) {
        const functionName = match[1] || '匿名函数';
        const filePath = match[2] || match[1];
        const lineNumber = match[3];
        return { functionName, filePath, lineNumber };
      }
    }
    return { functionName: '未知', filePath: '未知', lineNumber: '未知' };
  }
}

function log(type, message) {
  const callerInfo = getCallerInfo();
  const { functionName, filePath, lineNumber } = callerInfo;

  console.log(
    `%c ${type.toUpperCase()} %c${message} %c 调试信息：${filePath} -> ${functionName} -> ${lineNumber}行`,
    logStyles[type],
    logStyles.message,
    logStyles.trace
  );
}

const logger = {
  info: (message) => log('info', message),
  error: (message) => log('error', message),
  warning: (message) => log('warning', message),
  debug: (message) => log('debug', message),
};

// 使用示例
logger.info('这是一个信息提示');
logger.warning('这是一个警告提示');
logger.error('这是一个错误提示');
logger.debug('这是一个调试信息');
