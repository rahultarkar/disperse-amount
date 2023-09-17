export default (input: string) => {
  if (input.indexOf('=') !== -1) return '=';

  return input.indexOf(',') !== -1 ? ',' : ' ';
}
