/**
 * Normalizes a path by ensuring it starts with a slash and does not end with a slash.
 * @param {string} path - The path to normalize.
 * @returns {string} The normalized path.
 */
export const normalizePath = (path: string): string => {
  if (path === '' || path === '/') {
    return '/';
  }

  // Handle multiple slashes first
  const normalizedPath = path.replace(/\/+/g, '/');

  // Add leading slash if missing
  const pathWithLeadingSlash = normalizedPath.startsWith('/')
    ? normalizedPath
    : `/${normalizedPath}`;

  // Remove trailing slash if present
  return pathWithLeadingSlash.endsWith('/')
    ? pathWithLeadingSlash.slice(0, -1)
    : pathWithLeadingSlash;
};
