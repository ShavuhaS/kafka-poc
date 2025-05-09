export const log = (str: any) => {
  if (typeof str === 'object') {
    str = JSON.stringify(str, undefined, '\t');
  } else if (typeof str !== 'string') {
    str = str.toString();
  }
  str.split('\n').forEach((line: string) => {
    console.log(`[${new Date().toLocaleTimeString()}]: ${line}`);
  });
};