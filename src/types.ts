/**
 * A type representing a record of string keys with optional string values.
 * This is commonly used for URL parameters where values can be undefined.
 */
export type StringRecord = Record<string, string | undefined>;