// fs.cp supplies native paths: accept both Windows and POSIX separators.
export function includePublicFile(source) {
  return source.split(/[\\/]/).pop() !== 'README.md';
}
