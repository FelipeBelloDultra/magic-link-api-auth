export interface CacheProvider {
  save: <SaveDataType = unknown>(
    key: string,
    value: SaveDataType
  ) => Promise<void>;
  getByKey: <SavedDataType = unknown>(
    key: string
  ) => Promise<SavedDataType | null>;
  invalidate: (key: string) => Promise<void>;
}
