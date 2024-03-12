export interface CacheProvider {
  save: <SaveDataType>(key: string, value: SaveDataType) => Promise<void>;
  getByKey: <SavedDataType>(key: string) => Promise<SavedDataType | null>;
  invalidate: (key: string) => Promise<void>;
}
